import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: `all 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const faqSections = [
  {
    category: 'ORDERS & SHIPPING',
    faqs: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 5–7 business days within the US. Express shipping (2–3 business days) is available at checkout. International orders typically arrive in 10–15 business days.' },
      { q: 'Do you offer free shipping?', a: 'Yes — all US orders over $150 qualify for free standard shipping. This is applied automatically at checkout.' },
      { q: 'Can I track my order?', a: "Absolutely. Once your order ships, you'll receive a tracking email with a link to monitor your package in real-time." },
      { q: 'Do you ship internationally?', a: 'We currently ship to the US, Canada, UK, EU, and Australia. Customs duties and taxes may apply — these are the responsibility of the customer.' },
      { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, they enter our fulfillment queue and cannot be changed. Contact us immediately at inspiredscentsatl@gmail.com.' },
    ],
  },
  {
    category: 'RETURNS & EXCHANGES',
    faqs: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery on unworn, unwashed items with all original tags attached. Items marked as "FINAL SALE" cannot be returned.' },
      { q: 'How do I initiate a return?', a: "Email inspiredscentsatl@gmail.com with your order number and reason for return. We'll provide a prepaid return label within 24 hours." },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 5–7 business days of receiving your return. The credit will appear on your original payment method within 3–5 additional days.' },
      { q: 'Can I exchange for a different size?', a: 'Yes. We recommend initiating a return for a full refund and placing a new order for the correct size to ensure availability. Exchanges are subject to stock.' },
    ],
  },
  {
    category: 'SIZING & FIT',
    faqs: [
      { q: 'How do INSPIRED BY GOD pieces fit?', a: 'All INSPIRED BY GOD pieces are designed with an intentionally oversized, relaxed silhouette. If you prefer a closer fit, we recommend sizing down one size. See our size guide for measurements.' },
      { q: 'Are your pieces true to size?', a: 'Our hoodies and tops run oversized by design. Bottoms fit true to size. We provide a detailed size chart on each product page.' },
      { q: 'Will my items shrink after washing?', a: 'All of our pieces are garment-washed pre-production to minimize further shrinkage. Cold wash and hang dry recommended to maintain size and quality.' },
    ],
  },
  {
    category: 'PRODUCT & CARE',
    faqs: [
      { q: 'What materials do you use?', a: 'We use premium heavyweight cottons (240–500gsm), technical nylons, and French terry fabrics. Full material breakdowns are listed on each product page.' },
      { q: 'How should I care for my INSPIRED BY GOD pieces?', a: 'Turn garments inside out. Machine wash cold with like colors. Do not bleach. Tumble dry low or hang dry. Do not iron printed areas directly.' },
      { q: 'Are your products ethically made?', a: 'Yes. We work exclusively with certified factories that uphold fair labor practices and safe working conditions. We are committed to responsible manufacturing.' },
      { q: 'Do you restock sold-out items?', a: 'Occasionally. Limited restocks are announced via our newsletter and social channels. Sign up to the Inner Circle to be notified first.' },
    ],
  },
  {
    category: 'PAYMENTS & SECURITY',
    faqs: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and Shop Pay. All transactions are processed securely via Stripe.' },
      { q: 'Is my payment information secure?', a: 'Completely. We use Stripe for payment processing — a PCI DSS Level 1 certified platform. We never store your card details on our servers.' },
      { q: 'Do you offer payment plans?', a: 'Shop Pay Installments is available at checkout for qualifying orders, allowing you to split your purchase into 4 interest-free payments.' },
    ],
  },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-gold/10"
      style={{ animation: `fadeUp 0.5s ease ${index * 0.04}s both` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-6 group"
      >
        <span className={`font-body leading-relaxed transition-colors ${open ? 'text-gold' : 'text-white group-hover:text-gold/80'}`} style={{ fontSize: '30px' }}>
          {q}
        </span>
        <span
          className="text-gold font-mono flex-shrink-0 mt-0.5 transition-transform duration-300"
          style={{ fontSize: '30px', transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? '500px' : '0' }}
      >
        <p className="font-body text-white leading-relaxed pb-5" style={{ fontSize: '30px' }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeSection, setActiveSection] = useState(faqSections[0].category);

  const scrollToSection = (category) => {
    setActiveSection(category);
    const el = document.getElementById(category);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeUp>
          <p className="font-mono tracking-widest text-gold mb-4" style={{ fontSize: '30px' }}>— HELP CENTER</p>
          <h1 className="font-display text-white tracking-wide leading-none" style={{ fontSize: '60px' }}>FAQ</h1>
          <p className="font-heading italic text-white mt-4 max-w-xl" style={{ fontSize: '30px' }}>
            Answers to the questions we hear most. Still need help?{' '}
            <Link to="/contact" className="text-gold hover:underline" style={{ fontSize: '30px' }}>Contact us.</Link>
          </p>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Section nav */}
          <FadeUp className="lg:col-span-1">
            <div className="sticky top-28 space-y-1">
              <p className="font-mono tracking-widest text-gold mb-5" style={{ fontSize: '30px' }}>CATEGORIES</p>
              {faqSections.map((section) => (
                <button
                  key={section.category}
                  onClick={() => scrollToSection(section.category)}
                  className={`block w-full text-left font-mono tracking-widest py-2.5 px-4 transition-all border-l-2 ${
                    activeSection === section.category
                      ? 'text-gold border-gold bg-gold/5'
                      : 'text-white border-transparent hover:text-white hover:border-gold/30'
                  }`}
                  style={{ fontSize: '30px' }}
                >
                  {section.category}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* FAQ content */}
          <div className="lg:col-span-3">
            {faqSections.map((section) => (
              <div key={section.category} id={section.category} className="mb-14">
                <FadeUp>
                  <h2 className="font-display text-gold tracking-widest mb-8" style={{ fontSize: '30px' }}>{section.category}</h2>
                </FadeUp>
                <div>
                  {section.faqs.map((faq, i) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
                  ))}
                </div>
              </div>
            ))}

            {/* Still need help */}
            <FadeUp>
              <div className="mt-12 p-8 border border-gold/20 bg-gold/5">
                <p className="font-mono tracking-widest text-gold mb-2" style={{ fontSize: '30px' }}>STILL HAVE QUESTIONS?</p>
                <h3 className="font-display text-gold tracking-widest mb-4" style={{ fontSize: '30px' }}>WE'RE HERE TO HELP</h3>
                <p className="font-body text-white mb-6" style={{ fontSize: '30px' }}>
                  Our team responds within 24–48 hours. We'll get you sorted.
                </p>
                <Link
                  to="/contact"
                  className="inline-block bg-gold text-black font-mono tracking-widest px-8 py-3 hover:bg-gold-light transition-colors"
                  style={{ fontSize: '30px', fontWeight: 'bold' }}
                >
                  CONTACT US →
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
