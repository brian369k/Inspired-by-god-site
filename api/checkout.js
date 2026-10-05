const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Server-side source of truth for prices. Never trust prices sent by the browser.
// Keep in sync with src/data/products.js.
const SIZES = ['S', 'M', 'L', 'XL', '2X', '3X'];
const COLORS = ['Black', 'White', 'Sand', 'Azalea', 'Cardinal Blue'];
const BASE = { price: 17.99, price2x: 19.49, price3x: 20.49 };
const CATALOG = {
  1: { name: 'ALL BLOCKED UP', ...BASE },
  2: { name: "THE KING'S HOUSE", ...BASE },
  3: { name: 'OVERLAPPED', ...BASE },
  4: { name: "I'M SOO RAZZ", ...BASE },
  5: { name: 'MAKE A WORD', ...BASE },
};

const priceFor = (product, size) => {
  if (size === '3X') return product.price3x;
  if (size === '2X') return product.price2x;
  return product.price;
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const items = req.body && Array.isArray(req.body.items) ? req.body.items : [];
    if (items.length === 0) {
      return res.status(400).json({ error: 'Your bag is empty.' });
    }

    const line_items = [];
    for (const item of items) {
      const product = CATALOG[Number(item.id)];
      const quantity = Math.floor(Number(item.quantity));
      if (!product || !SIZES.includes(item.size) || !COLORS.includes(item.color) || !(quantity >= 1 && quantity <= 50)) {
        return res.status(400).json({ error: 'One of the items in your bag is no longer available. Please remove it and try again.' });
      }
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${product.name} — ${item.size} / ${item.color}`,
            description: `Size: ${item.size} | Color: ${item.color}`,
          },
          unit_amount: Math.round(priceFor(product, item.size) * 100),
        },
        quantity,
      });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/shop`,
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      billing_address_collection: 'required',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Checkout is temporarily unavailable. Please try again.' });
  }
};
