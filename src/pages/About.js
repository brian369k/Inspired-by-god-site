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
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="About"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.25)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full">
          <FadeUp>
            <p className="font-mono text-xs tracking-ultra-wide text-gold mb-4">— OUR STORY</p>
            <h1 className="font-display text-[15vw] md:text-[10vw] text-ivory tracking-wide leading-none">
              ABOUT
            </h1>
          </FadeUp>
        </div>
      </div>

      {/* Mission statement */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeUp>
            <div className="gold-line w-16 mb-8" />
            <p className="font-mono text-xs tracking-widest text-gold mb-6">FOUNDED WITH PURPOSE</p>
            <p className="font-heading text-2xl md:text-3xl text-ivory leading-relaxed italic">
              "Inspired by God was born from the belief that what you wear is a declaration. A statement of identity, faith, and intention."
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="space-y-5 font-body text-sm text-grey-light leading-relaxed">
              <p>
                In 2020, we set out to create something that transcended fashion. Not trends — but timelessness. Not hype — but heritage. Inspired by God is a luxury streetwear label born from a deep conviction that clothing should mean something.
              </p>
              <p>
                Every drop is curated with restraint. We release limited quantities, using premium materials and artisan construction techniques. Each piece is a considered investment — in craftsmanship, in self-expression, in the belief that how you present yourself matters.
              </p>
              <p>
                The name is not religious doctrine. It is an acknowledgment: that creativity, purpose, and the drive to build something meaningful comes from a place higher than commerce. We make clothes for people who feel that.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Full-width image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Brand lifestyle"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.4)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeUp>
            <p className="font-display text-[8vw] text-ivory tracking-widest text-center opacity-80">
              CHOSEN ONES
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <FadeUp className="mb-14">
          <p className="font-mono text-xs tracking-widest text-gold mb-3">— OUR PILLARS</p>
          <h2 className="font-display text-5xl md:text-7xl text-ivory tracking-wide">WHAT WE<br />STAND FOR</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <FadeUp key={v.num} delay={i * 0.1}>
              <div className="border border-gold/10 p-8 hover:border-gold/30 transition-colors">
                <span className="font-mono text-xs text-gold/50 tracking-widest">{v.num}</span>
                <h3 className="font-display text-2xl text-ivory tracking-widest mt-3 mb-4">{v.title}</h3>
                <p className="font-body text-sm text-grey-light leading-relaxed">{v.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-b border-gold/10 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '2020', label: 'FOUNDED' },
              { num: '50K+', label: 'COMMUNITY MEMBERS' },
              { num: '24', label: 'DROPS TO DATE' },
              { num: '100%', label: 'INTENTIONAL' },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1} className="text-center">
                <p className="font-display text-5xl md:text-6xl text-gradient-gold">{stat.num}</p>
                <p className="font-mono text-xs tracking-widest text-grey-light mt-2">{stat.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 py-24 text-center">
        <FadeUp>
          <p className="font-mono text-xs tracking-widest text-gold mb-4">— JOIN US</p>
          <h2 className="font-display text-5xl md:text-6xl text-ivory tracking-wide mb-8">READY TO<br />BE CHOSEN?</h2>
          <Link
            to="/shop"
            className="inline-block bg-gold text-black font-mono text-xs tracking-widest px-12 py-4 hover:bg-gold-light transition-colors"
          >
            SHOP THE COLLECTION
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}
