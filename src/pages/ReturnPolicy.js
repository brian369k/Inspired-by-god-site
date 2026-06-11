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

export default function ReturnPolicy() {
  return (
    <div className="bg-black pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 border-b border-gold/10">
        <FadeUp>
          <p className="font-mono text-xs tracking-widest text-gold mb-4">— LEGAL</p>
          <h1 className="font-display text-6xl md:text-8xl text-ivory tracking-wide leading-none">RETURN<br />POLICY</h1>
          <p className="font-mono text-xs text-grey-light mt-4">Last updated: June 2024</p>
        </FadeUp>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <FadeUp>
          <Section title="RETURN WINDOW">
            <p>We accept returns within <span className="text-ivory">30 days</span> of delivery. Items must meet ALL of the following conditions to be eligible:</p>
            <ul className="space-y-2 mt-2">
              {[
                'Item is unworn and unwashed',
                'All original tags are still attached',
                'Item is in original packaging',
                'Item shows no signs of wear, odor, or damage',
                'Return is requested within 30 days of delivery confirmation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="NON-RETURNABLE ITEMS">
            <p>The following items are <span className="text-ivory font-medium">final sale and cannot be returned:</span></p>
            <ul className="space-y-2 mt-2">
              {[
                'Items with removed or missing tags',
                'Worn, washed, or altered items',
                'Items marked as Final Sale at time of purchase',
                'Items showing signs of damage caused after delivery',
                'Items returned without prior authorization',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="PHOTO EVIDENCE REQUIRED">
            <p>To protect both parties, all return requests must include the following photos submitted within <span className="text-ivory">48 hours of delivery:</span></p>
            <ul className="space-y-2 mt-2">
              {[
                'Clear photo of the item received',
                'Photo showing tags still attached',
                'Photo of any defect or issue being claimed',
                'Photo of the shipping packaging',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-ivory/60">Return requests submitted without photo evidence will not be processed.</p>
          </Section>

          <Section title="MOCKUP & COLOR DISCLAIMER">
            <p>Product mockup images on our website are for visualization purposes only. Due to differences in monitor calibration and screen settings, colors may appear slightly different in person. This is <span className="text-ivory">not considered a defect</span> and is not grounds for a return.</p>
            <p>Slight variations in print placement (up to 0.5 inches) are normal in garment printing and are not considered defects.</p>
          </Section>

          <Section title="SIZING">
            <p>We provide a detailed size guide on every product page. Ordering an incorrect size is the customer's responsibility. Size-related returns are accepted within our 30-day window but <span className="text-ivory">return shipping is paid by the customer.</span></p>
            <p>We strongly recommend consulting our size guide before ordering.</p>
          </Section>

          <Section title="RETURN SHIPPING">
            <p><span className="text-ivory">Customer pays return shipping</span> for the following reasons:</p>
            <ul className="space-y-2 mt-2">
              {[
                'Change of mind',
                'Ordered wrong size',
                'Item not as expected (within normal variation)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-3"><span className="text-ivory">We cover return shipping</span> for:</p>
            <ul className="space-y-2 mt-2">
              {[
                'Item arrived damaged or defective',
                'Wrong item was sent',
                'Manufacturing defect',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="HOW TO INITIATE A RETURN">
            <p>To start a return, email us at <span className="text-gold">inspiredscentsatl@gmail.com</span> with:</p>
            <ul className="space-y-2 mt-2">
              {[
                'Your order number',
                'Reason for return',
                'Required photos (see Photo Evidence section)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold mt-1">—</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">We will respond within 24–48 hours with your return authorization and shipping address. Do not send items back without prior authorization — unauthorized returns will not be accepted.</p>
          </Section>

          <Section title="REFUND PROCESSING">
            <p>Once your return is received and inspected, we will notify you of approval or rejection. Approved refunds are processed within <span className="text-ivory">5–7 business days</span> to your original payment method. Please allow additional time for your bank to process the credit.</p>
          </Section>

          <Section title="CHARGEBACKS & DISPUTES">
            <p>We take chargebacks seriously. Before disputing a charge with your bank or credit card company, please contact us directly at <span className="text-gold">inspiredscentsatl@gmail.com</span> — we will work to resolve any issue quickly.</p>
            <p>Fraudulent chargebacks on delivered orders will be disputed with full documentation including order confirmation, tracking, and delivery proof.</p>
          </Section>

          <Section title="CONTACT US">
            <p>Questions about your return? Contact us at:</p>
            <p className="text-gold mt-2">inspiredscentsatl@gmail.com</p>
            <p className="mt-1">Inspired By God — Dallas, Texas</p>
          </Section>
        </FadeUp>
      </div>
    </div>
  );
}
