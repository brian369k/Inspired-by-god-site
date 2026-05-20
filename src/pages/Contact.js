import React, { useState, useRef, useEffect } from 'react';

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
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(32px)', transition: `all 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const inputClass = "w-full bg-transparent border border-grey-dark px-5 py-4 font-mono text-xs text-ivory placeholder-grey-mid hover-gold-border focus:border-gold/50 transition-all";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-black pt-16 md:pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 border-b border-gold/10">
        <FadeUp>
          <p className="font-mono text-xs tracking-widest text-gold mb-4">— GET IN TOUCH</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-ivory tracking-wide leading-none">CONTACT</h1>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info */}
          <FadeUp>
            <div className="space-y-12">
              <div>
                <p className="font-body text-sm text-grey-light leading-relaxed max-w-md">
                  Questions about your order, sizing, or a wholesale inquiry? We aim to respond within 24–48 hours. For the quickest response, check our <span className="text-gold">FAQ</span> page first.
                </p>
              </div>

              {[
                {
                  title: 'CUSTOMER SERVICE',
                  lines: ['support@inspiredbygod.com', 'Response within 24–48 hours', 'Mon–Fri, 9AM–6PM EST'],
                },
                {
                  title: 'PRESS & MEDIA',
                  lines: ['press@inspiredbygod.com', 'Editorial inquiries welcome', 'Please include your publication'],
                },
                {
                  title: 'WHOLESALE',
                  lines: ['wholesale@inspiredbygod.com', 'Minimum order quantities apply', 'Brand-aligned retailers only'],
                },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-gold/30 pl-6">
                  <p className="font-mono text-xs tracking-widest text-gold mb-3">{item.title}</p>
                  <div className="space-y-1">
                    {item.lines.map((line) => (
                      <p key={line} className="font-body text-sm text-grey-light">{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div>
                <p className="font-mono text-xs tracking-widest text-gold mb-4">FOLLOW US</p>
                <div className="flex gap-4">
                  {['INSTAGRAM', 'TIKTOK', 'TWITTER'].map((s) => (
                    <a
                      key={s}
                      href={`https://${s.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-grey-light hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-0.5"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.2}>
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full min-h-96 gap-6">
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-display text-3xl text-ivory tracking-widest mb-2">MESSAGE RECEIVED</p>
                  <p className="font-body text-sm text-grey-light">We'll be in touch within 24–48 hours.</p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="font-mono text-xs tracking-widest text-gold border border-gold/30 px-6 py-3 hover:border-gold transition-colors"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-gold block mb-2">NAME *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="YOUR NAME"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-gold block mb-2">EMAIL *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="YOUR EMAIL"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-gold block mb-2">SUBJECT</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass + ' appearance-none'}
                  >
                    <option value="" className="bg-black">SELECT A TOPIC</option>
                    <option value="order" className="bg-black">ORDER INQUIRY</option>
                    <option value="returns" className="bg-black">RETURNS & EXCHANGES</option>
                    <option value="sizing" className="bg-black">SIZING HELP</option>
                    <option value="wholesale" className="bg-black">WHOLESALE</option>
                    <option value="press" className="bg-black">PRESS & MEDIA</option>
                    <option value="other" className="bg-black">OTHER</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-gold block mb-2">MESSAGE *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    placeholder="HOW CAN WE HELP?"
                    className={inputClass + ' resize-none'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-black font-mono text-xs tracking-widest py-4 hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'SENDING...' : 'SEND MESSAGE →'}
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
