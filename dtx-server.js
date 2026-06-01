require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto  = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const app = express();

const supabase = createClient(
  'https://pqcjblwnhxwdoikottxa.supabase.co',
  process.env.SUPABASE_SERVICE_KEY
);

// Webhook needs raw body FIRST
app.post('/api/webhook', express.raw({ type: 'application/json' }), handleWebhook);

app.use(cors({ origin: ['https://www.inspiredbygod.us', 'https://inspiredbygod.us', process.env.FRONTEND_URL] }));
app.use(express.json());

// ── Create Checkout Session ──
app.post('/api/create-checkout-session', async (req, res) => {
  const { priceId, plan, billing, successUrl, cancelUrl } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 7,
        metadata: { plan, billing },
      },
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url:  cancelUrl,
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Verify Session ──
app.get('/api/verify-session', async (req, res) => {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription', 'customer'],
    });
    res.json({
      status:     session.payment_status,
      email:      session.customer_details?.email,
      plan:       session.subscription?.metadata?.plan,
      customerId: session.customer?.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Magic Link Login ──
app.post('/api/login', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  // Check if subscriber exists
  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('*')
    .eq('email', email)
    .eq('status', 'active')
    .single();

  if (!subscriber) {
    return res.status(403).json({ error: 'No active subscription found for this email.' });
  }

  // Generate magic token
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await supabase.from('magic_links').insert({
    email,
    token,
    expires_at: expires.toISOString(),
  });

  const magicLink = `${process.env.FRONTEND_URL}/app.html?token=${token}`;

  // Send email via Resend (free email service)
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DTX Live <noreply@inspiredbygod.us>',
        to: email,
        subject: 'Your DTX Live login link',
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
            <h2 style="color:#3ecfef">Your DTX Live Access Link</h2>
            <p>Click the button below to log in. This link expires in 24 hours.</p>
            <a href="${magicLink}" style="display:inline-block;margin:24px 0;padding:14px 28px;background:#3ecfef;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">
              Open DTX Live Studio →
            </a>
            <p style="color:#999;font-size:13px">If you didn't request this, ignore this email.</p>
          </div>
        `,
      }),
    });
  } catch (err) {
    console.error('Email error:', err);
  }

  res.json({ success: true, message: 'Magic link sent!' });
});

// ── Verify Magic Token ──
app.get('/api/verify-token', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: 'Token required' });

  const { data: link } = await supabase
    .from('magic_links')
    .select('*')
    .eq('token', token)
    .single();

  if (!link) return res.status(403).json({ error: 'Invalid token' });
  if (new Date(link.expires_at) < new Date()) return res.status(403).json({ error: 'Token expired' });

  // Check subscriber still active
  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('*')
    .eq('email', link.email)
    .eq('status', 'active')
    .single();

  if (!subscriber) return res.status(403).json({ error: 'No active subscription' });

  res.json({ valid: true, email: link.email, plan: subscriber.plan });
});

// ── Webhook Handler ──
async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const email = session.customer_details?.email;
      const plan = session.subscription_data?.metadata?.plan || 'starter';

      if (email) {
        // Save subscriber to Supabase
        await supabase.from('subscribers').upsert({
          email,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          plan,
          status: 'active',
          created_at: new Date().toISOString(),
        }, { onConflict: 'email' });

        // Send welcome email with magic link
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await supabase.from('magic_links').insert({ email, token, expires_at: expires.toISOString() });

        const magicLink = `${process.env.FRONTEND_URL}/app.html?token=${token}`;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'DTX Live <noreply@inspiredbygod.us>',
            to: email,
            subject: '🎉 Welcome to DTX Live — Your Access Link Inside',
            html: `
              <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#12151f;color:#fff">
                <h1 style="color:#3ecfef">Welcome to DTX Live!</h1>
                <p style="color:#aaa">Your subscription is active. Click below to access the studio:</p>
                <a href="${magicLink}" style="display:inline-block;margin:24px 0;padding:16px 32px;background:linear-gradient(135deg,#3ecfef,#5b8df5);color:#fff;text-decoration:none;border-radius:10px;font-weight:bold;font-size:16px">
                  Open DTX Live Studio →
                </a>
                <p style="color:#666;font-size:13px">This link is valid for 7 days. You can always request a new one at inspiredbygod.us/login.html</p>
              </div>
            `,
          }),
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object;
      await supabase
        .from('subscribers')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', sub.id);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      await supabase
        .from('subscribers')
        .update({ status: 'past_due' })
        .eq('stripe_customer_id', invoice.customer);
      break;
    }
  }

  res.json({ received: true });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`DTX Live server running on port ${PORT}`));
