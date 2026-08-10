import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_nra7ohe';
const TEMPLATE_ID = 'template_8wd511b';
const PUBLIC_KEY = '-0yyp_dysPGeaCMqE';

// Maps the dropdown's value attribute to a human-readable label for the email.
const SUBJECT_LABELS = {
  '': 'No subject selected',
  order: 'Order Inquiry',
  returns: 'Returns & Exchanges',
  sizing: 'Sizing Help',
  wholesale: 'Wholesale',
  press: 'Press & Media',
  other: 'Other',
};

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

const inputClass = "w-full bg-transparent border border-white px-5 py-4 font-mono text-white placeholder-white hover:border-gold focus:border-gold transition-all";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const prettySubject = SUBJECT_LABELS[form.subject] || form.subject;

    // The entire email is pre-formatted here and passed as {{message}}.
    // As long as the EmailJS template body contains {{message}}, this renders
    // in full — no need to edit the template in the EmailJS dashboard.
    const params = {
      name: form.name,
      email: form.email,
      subject: prettySubject,
      reply_to: form.email,
      message:
        `New message from the Inspired by God contact form\n\n` +
        `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Subject: ${prettySubject}\n\n` +
        `Message:\n${form.message}`,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      // Surface the real EmailJS reason so we can diagnose without the console.
      const detail =
        (err && err.text) ||
        (err && err.message) ||
        (err && err.status ? `HTTP ${err.status}` : 'Unknown error');
      setError(`Send failed → ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-2.5 border-b border-gold">
        <FadeUp>
          <p className="font-mono tracking-widest text-gold" style={{ fontSize: '30px' }}>— GET IN TOUCH</p>
          <h1 className="font-display text-ivory tracking-wide leading-none" style={{ fontSize: '60px' }}>CONTACT</h1>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-2.5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info */}
          <FadeUp>
            <div className="space-y-12">
              <div>
                <p className="font-body text-white leading-relaxed max-w-md" style={{ fontSize: '30px', fontWeight: 'bold' }}>
                  Questions about your order, sizing, or a wholesale inquiry? We aim to respond within 24–48 hours. For the quickest response, check our <span className="text-gold">FAQ</span> page first.
                </p>
              </div>

              {[
                {
                  title: 'CUSTOMER SERVICE',
                  lines: ['support@inspiredbygod.us', 'Response within 24–48 hours', 'Mon–Fri, 9AM–6PM EST'],
                },
                {
                  title: 'PRESS & MEDIA',
                  lines: ['press@inspiredbygod.us', 'Editorial inquiries welcome', 'Please include your publication'],
                },
                {
                  title: 'WHOLESALE',
                  lines: ['wholesale@inspiredbygod.us', 'Minimum order quantities apply', 'Brand-aligned retailers only'],
                },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-gold pl-6">
                  <p className="font-mono tracking-widest text-gold mb-3" style={{ fontSize: '30px' }}>{item.title}</p>
                  <div className="space-y-1">
                    {item.lines.map((line) => (
                      <p key={line} className="font-body text-white" style={{ fontSize: '30px', fontWeight: 'bold' }}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div>
                <p className="font-mono tracking-widest text-gold mb-4" style={{ fontSize: '30px' }}>FOLLOW US</p>
                <div className="flex gap-4">
                  {['INSTAGRAM', 'TIKTOK', 'TWITTER'].map((s) => (
                    <a
                      key={s}
                      href={`https://${s.toLowerCase()}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-white hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-0.5"
                      style={{ fontSize: '30px', fontWeight: 'bold' }}
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
                <div className="w-16 h-16 border border-gold flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-display text-white tracking-widest mb-2" style={{ fontSize: '30px', fontWeight: 'bold' }}>MESSAGE RECEIVED</p>
                  <p className="font-body text-white" style={{ fontSize: '30px', fontWeight: 'bold' }}>We'll be in touch within 24–48 hours.</p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="font-mono tracking-widest text-gold border border-gold px-6 py-3 hover:border-gold transition-colors"
                  style={{ fontSize: '30px' }}
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="border border-red-500 text-red-500 px-4 py-3" style={{ fontSize: '20px' }}>
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono tracking-widest text-gold block mb-2" style={{ fontSize: '30px' }}>NAME *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="YOUR NAME"
                      className={inputClass}
                      style={{ fontSize: '30px', fontWeight: 'bold' }}
                    />
                  </div>
                  <div>
                    <label className="font-mono tracking-widest text-gold block mb-2" style={{ fontSize: '30px' }}>EMAIL *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="YOUR EMAIL"
                      className={inputClass}
                      style={{ fontSize: '30px', fontWeight: 'bold' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono tracking-widest text-gold block mb-2" style={{ fontSize: '30px' }}>SUBJECT</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass + ' appearance-none'}
                    style={{ fontSize: '30px', fontWeight: 'bold' }}
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
                  <label className="font-mono tracking-widest text-gold block mb-2" style={{ fontSize: '30px' }}>MESSAGE *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    placeholder="HOW CAN WE HELP?"
                    className={inputClass + ' resize-none'}
                    style={{ fontSize: '30px', fontWeight: 'bold' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-black font-mono tracking-widest py-4 hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontSize: '30px', fontWeight: 'bold' }}
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
