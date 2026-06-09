# INSPIRED BY GOD — Luxury Streetwear Website

A complete luxury streetwear ecommerce site built with React + Tailwind CSS. Dark aesthetic, gold accents, oversized typography, animated transitions, cart system, and Stripe-ready checkout.

---

## 🗂 File Structure

```
inspired-by-god/
├── public/
│   └── index.html              # HTML shell + Google Fonts
├── src/
│   ├── components/
│   │   ├── Navbar.js           # Responsive nav + mobile hamburger
│   │   ├── Footer.js           # Footer with social links + newsletter
│   │   ├── CartDrawer.js       # Slide-out cart with Stripe checkout button
│   │   ├── ProductCard.js      # Product grid card with hover effects
│   │   └── Cursor.js           # Custom gold cursor (desktop)
│   ├── context/
│   │   └── CartContext.js      # Global cart state (localStorage persisted)
│   ├── data/
│   │   └── products.js         # Product catalog + Stripe price IDs
│   ├── pages/
│   │   ├── Home.js             # Hero + featured products + brand statement
│   │   ├── Shop.js             # Full product grid with category filters
│   │   ├── ProductDetail.js    # Product page with size/color selector
│   │   ├── About.js            # Brand story + values
│   │   ├── Contact.js          # Contact form
│   │   └── FAQ.js              # Accordion FAQ with categories
│   ├── App.js                  # Router + layout
│   ├── index.js                # React entry point
│   └── index.css               # Tailwind + custom CSS utilities
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                 # Vercel SPA routing config
├── .gitignore
└── package.json
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- npm or yarn

### Install & Run

```bash
# 1. Clone or download this project
cd inspired-by-god

# 2. Install dependencies
npm install

# 3. Start development server
npm start
# → Opens at http://localhost:3000
```

---

## 💳 Stripe Integration

### Step 1: Create a Stripe Account
1. Go to https://dashboard.stripe.com/register
2. Create your account and verify your business

### Step 2: Add Your Products in Stripe
1. In Stripe Dashboard → Products → Add Product
2. Create each product (name, price, images)
3. Copy the **Price ID** (starts with `price_...`)

### Step 3: Update Product IDs
Open `src/data/products.js` and replace each `stripeId` value:

```js
{
  id: 1,
  name: "COVENANT HOODIE",
  stripeId: "price_1ABC123xyz",  // ← Replace with your real Stripe Price ID
  ...
}
```

### Step 4: Install Stripe + Add Your Key
```bash
npm install @stripe/stripe-js
```

In `src/components/CartDrawer.js`, replace the `handleStripeCheckout` function:

```js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_YOUR_PUBLISHABLE_KEY');

const handleStripeCheckout = async () => {
  const stripe = await stripePromise;
  const lineItems = items.map(item => ({
    price: item.stripeId,
    quantity: item.quantity,
  }));
  
  await stripe.redirectToCheckout({
    lineItems,
    mode: 'payment',
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/shop`,
  });
};
```

---

## 📤 Upload to GitHub

### Option A: GitHub.com (No terminal needed)
1. Go to https://github.com/new
2. Create a new repository named `inspired-by-god`
3. Click **"uploading an existing file"**
4. Drag and drop your entire project folder
5. Click **Commit changes**

### Option B: Git CLI
```bash
# Initialize git in your project folder
cd inspired-by-god
git init
git add .
git commit -m "Initial commit: IBG storefront"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/inspired-by-god.git
git branch -M main
git push -u origin main
```

---

## ▲ Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)
1. Go to https://vercel.com and sign up/log in with GitHub
2. Click **"Add New Project"**
3. Import your `inspired-by-god` GitHub repository
4. Vercel auto-detects Create React App — no config needed
5. Click **Deploy** → Your site is live in ~2 minutes!

### Method 2: Vercel CLI
```bash
npm install -g vercel
vercel login
cd inspired-by-god
vercel
# Follow prompts — accepts all defaults for CRA
vercel --prod  # Deploy to production
```

### Custom Domain
1. In Vercel Dashboard → your project → Settings → Domains
2. Add your domain (e.g., `inspiredbygod.com`)
3. Update your DNS records as instructed by Vercel

---

## 🎨 Customization Guide

### Change Brand Colors
Edit `tailwind.config.js`:
```js
colors: {
  gold: "#c9a84c",        // Primary accent → change to your brand color
  "gold-light": "#e8c97a", // Hover state
  ivory: "#f5f0e8",        // Primary text
}
```

### Add Products
In `src/data/products.js`, add a new object to the `products` array:
```js
{
  id: 7,
  name: "YOUR PRODUCT",
  price: 150,
  category: "tops",   // hoodies | tops | bottoms | outerwear | accessories
  tag: "NEW",         // or null
  description: "...",
  details: ["Detail 1", "Detail 2"],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Onyx Black"],
  images: ["https://your-image-url.com/image.jpg"],
  stripeId: "price_YOUR_STRIPE_ID",
}
```

### Replace Placeholder Images
- Use your own product photos hosted on your CDN or Cloudinary
- PNG with transparent backgrounds are fully supported
- Recommended: 800×1067px (3:4 ratio) for product images

### Update Social Links
In `src/components/Footer.js`, update the `socials` array with your actual URLs.

---

## 📱 Features Included

- ✅ Responsive mobile-first design
- ✅ Custom gold cursor (desktop)
- ✅ Animated hero with oversized typography
- ✅ Gold marquee announcement bar
- ✅ Product grid with category filters + sorting
- ✅ Product detail page with size/color selector
- ✅ Slide-out cart drawer (localStorage persisted)
- ✅ Stripe-ready checkout button
- ✅ About page with brand story + values
- ✅ Contact form with validation
- ✅ FAQ with accordion sections
- ✅ Newsletter signup
- ✅ Smooth page transitions
- ✅ Scroll-triggered fade animations
- ✅ Transparent PNG product image support
- ✅ SEO meta tags
- ✅ Vercel optimized (SPA routing configured)

---

## 🔧 Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router 6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Framer Motion | (Optional: installed, available to use) |
| Stripe.js | Payment processing |
| Google Fonts | Bebas Neue + Cormorant Garamond + DM Sans |

---

Built for **INSPIRED BY GOD** — Luxury Streetwear.
