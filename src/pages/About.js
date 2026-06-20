import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(32px)', transition: `all 0.9s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const values = [
  { num: '01', title: 'INTENTION', body: 'Every silhouette, every stitch is deliberate. We reject the throwaway culture. Each piece is built to last a generation.' },
  { num: '02', title: 'ELEVATION', body: 'We exist at the intersection of the sacred and the street. Inspired by divine architecture. Built for the concrete world.' },
  { num: '03', title: 'AUTHENTICITY', body: 'No trend chasing. No hollow collaborations. Just pure expression from a brand that knows exactly what it stands for.' },
  { num: '04', title: 'COMMUNITY', body: 'IBG is not just clothing. It is a covenant. A tribe of individuals who choose to move through life with purpose and grace.' },
];

export default function About() {
  return (
    <div className="bg-black pt-16 md:pt-20">
      {/* Hero — no empty space */}
      <div className="relative overflow-hidden bg-black border-b border-gold/10">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-6 w-full">
          <FadeUp>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#c9a84c', letterSpacing: '0.15em', marginBottom: '8px' }}>— OUR STORY</p>
            <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '60px', color: '#ffffff', letterSpacing: '0.05em', lineHeight: 1, textAlign: 'center' }}>
              ABOUT
            </h1>
          </FadeUp>
        </div>
      </div>

      {/* Mission statement */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <FadeUp>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#c9a84c', letterSpacing: '0.15em', marginBottom: '16px' }}>
            In 2020, we set out to create something that transcended fashion. Not trends — but timelessness. Not hype — but heritage. Inspired by God is a luxury streetwear label born from a deep conviction that clothing should mean something.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '60px', color: '#ffffff', letterSpacing: '0.15em', marginBottom: '16px', textAlign: 'center' }}>
            FOUNDED WITH PURPOSE
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#c9a84c', lineHeight: 1.6 }}>
            "Inspired by God was born from the belief that what you wear is a declaration. A statement of identity, faith, and intention."
          </p>
        </FadeUp>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <FadeUp className="mb-8">
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#c9a84c', letterSpacing: '0.15em', marginBottom: '8px' }}>— OUR PILLARS</p>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '60px', color: '#ffffff', letterSpacing: '0.05em', lineHeight: 1, textAlign: 'center' }}>WHAT WE<br />STAND FOR</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <FadeUp key={v.num} delay={i * 0.1}>
              <div className="border border-gold/10 p-6 hover:border-gold/30 transition-colors">
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', letterSpacing: '0.15em' }}>{v.num}</span>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '30px', color: '#ffffff', letterSpacing: '0.15em', marginTop: '8px', marginBottom: '12px' }}>{v.title}</h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#c9a84c', lineHeight: 1.6 }}>{v.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-b border-gold/10 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '2020', label: 'FOUNDED' },
              { num: '50K+', label: 'COMMUNITY MEMBERS' },
              { num: '24', label: 'DROPS TO DATE' },
              { num: '100%', label: 'INTENTIONAL' },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1} className="text-center">
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '60px', background: 'linear-gradient(135deg, #c9a84c 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.num}</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '25px', color: '#ffffff', letterSpacing: '0.15em', marginTop: '8px' }}>{stat.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <FadeUp>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#c9a84c', letterSpacing: '0.15em', marginBottom: '16px' }}>— JOIN US</p>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '60px', color: '#ffffff', letterSpacing: '0.05em', lineHeight: 1, marginBottom: '24px' }}>READY TO<br />BE CHOSEN?</h2>
          <Link
            to="/shop"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#000000', background: '#c9a84c', letterSpacing: '0.15em', padding: '16px 48px', textDecoration: 'none', display: 'inline-block' }}
          >
            SHOP THE COLLECTION
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}