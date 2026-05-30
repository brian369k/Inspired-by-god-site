// ============================================================
// DTX Live — Stripe Subscription Backend
// Node.js + Express
//
// Setup:
//   npm install express stripe cors dotenv
//   node server.js
//
// .env file:
//   STRIPE_SECRET_KEY=sk_live_...
//   STRIPE_WEBHOOK_SECRET=whsec_...
//   FRONTEND_URL=https://yourdomain.com
// ============================================================

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// ── Webhook needs raw body, MUST come before express.json() ──
app.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhook
);

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// ────────────────────────────────────────────────────────────
// POST /api/create-checkout-session
// Called by the frontend when user clicks Subscribe
// ────────────────────────────────────────────────────────────
app.post('/api/create-checkout-session', async (req, res) => {
  const { priceId, plan, billing, successUrl, cancelUrl } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],

      // 7-day free trial on all plans
      subscription_data: {
        trial_period_days: 7,
        metadata: { plan, billing },
      },

      // Collect email so we can send access link
      customer_email: req.body.email || undefined,

      success_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url:  cancelUrl,

      // Optional: allow promo codes
      allow_promotion_codes: true,
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error('Checkout session error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// POST /api/create-portal-session
// Let subscribers manage/cancel their subscription
// ────────────────────────────────────────────────────────────
app.post('/api/create-portal-session', async (req, res) => {
  const { customerId } = req.body;

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer:   customerId,
      return_url: process.env.FRONTEND_URL,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/verify-session
// Called on /success page to confirm payment & get plan info
// ────────────────────────────────────────────────────────────
app.get('/api/verify-session', async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription', 'customer'],
    });

    res.json({
      status:     session.payment_status,
      plan:       session.subscription?.metadata?.plan,
      billing:    session.subscription?.metadata?.billing,
      customerId: session.customer?.id,
      email:      session.customer?.email,
      trialEnd:   session.subscription?.trial_end,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// Webhook Handler
// Stripe sends events here — activate/deactivate accounts
//
// To test locally: stripe listen --forward-to localhost:3001/api/webhook
// ────────────────────────────────────────────────────────────
async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ── Handle events ──
  switch (event.type) {

    case 'checkout.session.completed': {
      const session = event.data.object;
      // Payment successful — activate the user's account
      await activateAccount({
        customerId:     session.customer,
        email:          session.customer_details?.email,
        subscriptionId: session.subscription,
        plan:           session.metadata?.plan,
      });
      break;
    }

    case 'customer.subscription.trial_will_end': {
      // Trial ends in 3 days — send reminder email
      const sub = event.data.object;
      console.log(`Trial ending soon for customer: ${sub.customer}`);
      // await sendTrialEndingEmail(sub.customer);
      break;
    }

    case 'invoice.payment_succeeded': {
      // Recurring payment succeeded — keep access active
      const invoice = event.data.object;
      console.log(`Payment succeeded for: ${invoice.customer}`);
      // await renewAccess(invoice.customer);
      break;
    }

    case 'invoice.payment_failed': {
      // Payment failed — notify user, optionally restrict access
      const invoice = event.data.object;
      console.log(`Payment failed for: ${invoice.customer}`);
      // await notifyPaymentFailed(invoice.customer);
      break;
    }

    case 'customer.subscription.deleted': {
      // Subscription cancelled — revoke access
      const sub = event.data.object;
      await revokeAccess(sub.customer);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
}

// ────────────────────────────────────────────────────────────
// Account management helpers
// Replace these with your actual database calls
// (MongoDB, PostgreSQL, Firebase, Supabase, etc.)
// ────────────────────────────────────────────────────────────

async function activateAccount({ customerId, email, subscriptionId, plan }) {
  console.log(`✅ Activating account: ${email} — Plan: ${plan}`);

  // Example with a database:
  // await db.users.upsert({
  //   stripeCustomerId: customerId,
  //   email,
  //   subscriptionId,
  //   plan,
  //   status: 'active',
  //   activatedAt: new Date(),
  // });

  // Then send a magic login link or welcome email:
  // await sendWelcomeEmail(email, plan);
}

async function revokeAccess(customerId) {
  console.log(`❌ Revoking access for customer: ${customerId}`);

  // await db.users.update(
  //   { stripeCustomerId: customerId },
  //   { status: 'cancelled' }
  // );
}

// ────────────────────────────────────────────────────────────
// Start server
// ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 DTX Live backend running on port ${PORT}`);
  console.log(`   Webhook endpoint: POST /api/webhook`);
  console.log(`   Checkout:         POST /api/create-checkout-session`);
  console.log(`   Portal:           POST /api/create-portal-session\n`);
});
