import React from 'react';
import { Link } from 'react-router-dom';

const socials = [
  { name: 'INSTAGRAM', href: 'https://instagram.com', icon: 'IG' },
  { name: 'TIKTOK', href: 'https://tiktok.com', icon: 'TK' },
  { name: 'TWITTER', href: 'https://twitter.com', icon: 'TW' },
  { name: 'PINTEREST', href: 'https://pinterest.com', icon: 'PT' },
];

export default function Footer() {
  return (
    <footer className="bg-off-black border-t border-gold/10">
      {/* Marquee */}
      <div className="border-b border-gold/10 py-4 overflow-hidden">
        <div className="marquee-content font-display text-5xl md:text-7xl text-gold/10 tracking-widest whitespace-nowrap">
          {Array(6).fill('INSPIRED BY GOD · ELEVATED ESSENTIALS · CHOSEN · ').join('')}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="block mb-4">
              <span className="font-display text-3xl text-ivory block tracking-widest">INSPIRED</span>
              <span className="font-mono text-xs text-gold tracking-ultra-wide">BY GOD</span>
            </Link>
            <p className="font-body text-sm text-grey-light leading-relaxed max-w-xs">
              Luxury streetwear for the chosen. Elevated essentials worn by those who move with purpose.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-gold mb-6">SHOP</h4>
            <ul className="space-y-3">
              {['New Arrivals', 'Hoodies', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="font-body text-sm text-grey-light hover:text-ivory transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-gold mb-6">INFO</h4>
            <ul className="space-y-3">
              {[
                { label: 'About', to: '/about' },
                { label: 'FAQ', to: '/faq' },
                { label: 'Contact', to: '/contact' },
                { label: 'Shipping', to: '/faq' },
                { label: 'Returns', to: '/return-policy' },
                { label: 'Size Guide', to: '/faq' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="font-body text-sm text-grey-light hover:text-ivory transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-gold mb-6">THE INNER CIRCLE</h4>
            <p className="font-body text-sm text-grey-light mb-4">
              First access to drops. Sacred announcements only.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 bg-black border border-gold/20 px-4 py-3 font-mono text-xs text-ivory placeholder-grey-mid focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button className="bg-gold text-black font-mono text-xs px-4 py-3 hover:bg-gold-light transition-colors flex-shrink-0">
                →
              </button>
            </div>

            {/* Socials */}
            <div className="mt-8">
              <h4 className="font-mono text-xs tracking-widest text-gold mb-4">FOLLOW</h4>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-gold/20 flex items-center justify-center font-mono text-[9px] text-grey-light hover:border-gold hover:text-gold transition-all"
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-line my-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-grey-mid tracking-widest">
            © 2024 INSPIRED BY GOD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'Privacy Policy', to: '/privacy-policy' },
              { label: 'Return Policy', to: '/return-policy' },
              { label: 'Terms & Conditions', to: '/terms' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="font-mono text-xs text-grey-mid hover:text-grey-light transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
