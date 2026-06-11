import React, { useRef, useEffect, useState } from 'react';

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: `all 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-display text-2xl text-gold tracking-widest mb-4">{title}</h2>
    <div className="font-body text-sm text-grey-light leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <div className="bg-black pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 border-b border-gold/10">
        <FadeUp>
          <p className="font-mono text-xs tracking-widest text-gold mb-4">— LEGAL</p>
          <h1 className="font-display text-6xl md:text-8xl text-ivory tracking-wide leading-none">PRIVACY<br />POLICY</h1>
          <p className="font-mono text-xs text-grey-light mt-4">Last updated: June 2024</p>
        </FadeUp>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <FadeUp>
          <Section title="OVERVIEW">
            <p>Inspired By God ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit inspiredbygod.us and make a purchase.</p>
            <p>By using our site, you agree to the collection and use of information in accordance with this policy.</p>
          </Section>

          <Section title="INFORMATION WE COLLECT">
            <p>We collect the following information when you place an order or contact us:</p>
            <ul className="space-y-2 mt-2">
              {[
                'Full name and email address',
                'Shipping and billing address',
                'Phone number (if provided)',
                'Payment information (processed securely by Stripe — we never store card details)',
                'Order history and purchase details',
                'Communications you send us',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="HOW WE USE YOUR INFORMATION">
            <p>We use your information solely to:</p>
            <ul className="space-y-2 mt-2">
              {[
                'Process and fulfill your orders',
                'Send order confirmations and shipping updates',
                'Respond to customer service inquiries',
                'Improve our products and website experience',
                'Comply with legal obligations',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">We do NOT sell, trade, or rent your personal information to third parties.</p>
          </Section>

          <Section title="SHIPPING & ADDRESS INFORMATION">
            <p>Your shipping address is shared with our shipping carrier(s) solely for the purpose of delivering your order. We do not share your address with any other third parties.</p>
          </Section>

          <Section title="PAYMENT PROCESSING">
            <p>All payments are processed securely through Stripe, a PCI DSS Level 1 certified payment processor. We never store your credit card details on our servers. By making a purchase, you also agree to Stripe's Privacy Policy.</p>
          </Section>

          <Section title="COOKIES">
            <p>Our website uses cookies to enhance your browsing experience, remember your cart contents, and analyze site traffic. You can disable cookies in your browser settings, but this may affect site functionality.</p>
          </Section>

          <Section title="DATA RETENTION">
            <p>We retain your order information for up to 3 years for accounting and legal purposes. You may request deletion of your personal data at any time by contacting us at the email below.</p>
          </Section>

          <Section title="YOUR RIGHTS">
            <p>You have the right to:</p>
            <ul className="space-y-2 mt-2">
              {[
                'Access the personal data we hold about you',
                'Request correction of inaccurate data',
                'Request deletion of your data',
                'Opt out of marketing communications at any time',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="CONTACT US">
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="text-gold mt-2">inspiredscentsatl@gmail.com</p>
            <p className="mt-1">Inspired By God — Dallas, Texas</p>
          </Section>
        </FadeUp>
      </div>
    </div>
  );
}
