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

export default function TermsConditions() {
  return (
    <div className="bg-black pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 border-b border-gold/10">
        <FadeUp>
          <p className="font-mono text-xs tracking-widest text-gold mb-4">— LEGAL</p>
          <h1 className="font-display text-6xl md:text-8xl text-ivory tracking-wide leading-none">TERMS &<br />CONDITIONS</h1>
          <p className="font-mono text-xs text-grey-light mt-4">Last updated: June 2024</p>
        </FadeUp>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <FadeUp>
          <Section title="AGREEMENT">
            <p>By accessing and using inspiredbygod.us, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website or services.</p>
          </Section>

          <Section title="USE OF WEBSITE">
            <p>You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="space-y-2 mt-2">
              {[
                'Use the site in any way that violates applicable laws or regulations',
                'Attempt to gain unauthorized access to any part of the website',
                'Transmit any unsolicited or unauthorized advertising or spam',
                'Use the site to harm, threaten, or harass others',
                'Copy, reproduce, or resell any content without written permission',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="PRODUCTS & PRICING">
            <p>We reserve the right to modify product descriptions, prices, and availability at any time without notice. All prices are listed in USD. We are not responsible for typographical errors in pricing.</p>
            <p>Product images, including mockups, are for visualization purposes only. Colors and print placement may vary slightly from what is displayed on screen due to monitor settings and garment printing variation.</p>
          </Section>

          <Section title="ORDERS & PAYMENT">
            <p>By placing an order, you represent that you are authorized to use the payment method provided. All payments are processed securely through Stripe.</p>
            <p>We reserve the right to cancel or refuse any order at our discretion, including orders that appear fraudulent or in violation of these terms. In the event of cancellation, a full refund will be issued.</p>
          </Section>

          <Section title="SHIPPING">
            <p>We ship within the United States only. Estimated shipping times are provided at checkout but are not guaranteed. We are not responsible for delays caused by shipping carriers, weather, or other circumstances beyond our control.</p>
            <p>Risk of loss and title for items pass to you upon delivery to the carrier. We are not responsible for lost or stolen packages after confirmed delivery.</p>
          </Section>

          <Section title="RETURNS & REFUNDS">
            <p>Returns and refunds are governed by our Return Policy, which is incorporated into these Terms by reference. Please review our Return Policy before making a purchase.</p>
          </Section>

          <Section title="INTELLECTUAL PROPERTY">
            <p>All content on this website including logos, designs, graphics, text, and product images are the property of Inspired By God and are protected by applicable intellectual property laws.</p>
            <p>You may not reproduce, distribute, or create derivative works from any content on this site without our express written permission.</p>
          </Section>

          <Section title="SIZE GUIDE ACKNOWLEDGMENT">
            <p>By completing a purchase, you confirm that you have reviewed our size guide. Inspired By God is not responsible for items ordered in incorrect sizes. Size-related returns are accepted per our Return Policy but return shipping is the customer's responsibility.</p>
          </Section>

          <Section title="LIMITATION OF LIABILITY">
            <p>To the fullest extent permitted by law, Inspired By God shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or purchase of our products.</p>
            <p>Our total liability to you for any claim arising from these Terms shall not exceed the amount you paid for the specific order in question.</p>
          </Section>

          <Section title="DISCLAIMER">
            <p>This website and its contents are provided "as is" without warranty of any kind. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
          </Section>

          <Section title="GOVERNING LAW">
            <p>These Terms and Conditions are governed by the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of Texas.</p>
          </Section>

          <Section title="CHANGES TO TERMS">
            <p>We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated date. Your continued use of the website after changes constitutes acceptance of the new Terms.</p>
          </Section>

          <Section title="CONTACT US">
            <p>Questions about these Terms? Contact us at:</p>
            <p className="text-gold mt-2">inspiredscentsatl@gmail.com</p>
            <p className="mt-1">Inspired By God — Dallas, Texas</p>
          </Section>
        </FadeUp>
      </div>
    </div>
  );
}
