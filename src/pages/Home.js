import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const featured = products.slice(0, 4);

  return (
    <div className="bg-black">
      {/* HERO — centered, clean dark */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center overflow-hidden bg-black">
        {/* Subtle gold gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Radial gold glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Hero content — fully centered */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <div
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'none' : 'translateY(30px)',
              transition: 'opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s',
            }}
          >
            {/* Eyebrow */}
            <p className="font-mono text-xs tracking-ultra-wide text-gold mb-6 md:mb-8">
              SS 2024 — DROP 01
            </p>

            {/* Hero title — centered */}
            <h1 className="font-display leading-none">
              <span className="block text-[14vw] md:text-[11vw] lg:text-[9vw] text-white tracking-wide">
                INSPIRED
              </span>
              <span className="block text-[14vw] md:text-[11vw] lg:text-[9vw] text-gradient-gold tracking-wide -mt-2 md:-mt-4">
                BY GOD
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="font-heading text-lg md:text-2xl text-white/80 italic mt-6 md:mt-8 max-w-lg mx-auto"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transition: 'opacity 1s ease 0.8s',
              }}
            >
              "Elevated essentials for those who move with divine purpose."
            </p>

            {/* CTAs — centered */}
            <div
              className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12 justify-center"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.8s ease 1s, transform 0.8s ease 1s',
              }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-3 bg-gold text-black font-mono text-xs tracking-widest px-10 py-4 hover:bg-gold-light transition-colors duration-200 animate-pulse-gold"
              >
                SHOP THE DROP
                <span className="text-base">→</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 border border-ivory/30 text-ivory font-mono text-xs tracking-widest px-10 py-4 hover:border-gold hover:text-gold transition-colors duration-200"
              >
                OUR STORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE BAND */}
      <div className="bg-gold py-3 overflow-hidden">
        <div className="marquee-content font-mono text-[11px] tracking-widest text-black whitespace-nowrap">
          {Array(8).fill('INSPIRED BY GOD · LUXURY STREETWEAR · FREE SHIPPING OVER $150 · NEW ARRIVALS NOW LIVE · CHOSEN ONES ONLY · ').join('')}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <FadeUp className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-gold mb-3">— FEATURED PIECES</p>
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-wide leading-none">
              THE<br />COLLECTION
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-mono text-xs tracking-widest text-grey-light hover:text-gold transition-colors border-b border-grey-mid hover:border-gold pb-1"
          >
            VIEW ALL →
          </Link>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <FadeUp key={product.id} delay={i * 0.1}>
              <ProductCard product={product} index={i} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="relative py-28 md:py-40 overflow-hidden bg-off-black">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <p className="font-mono text-xs tracking-ultra-wide text-gold mb-8">— THE ETHOS</p>
            <blockquote className="font-heading text-3xl md:text-5xl lg:text-6xl text-ivory leading-tight italic">
              "We don't make clothes.<br />We make armor for the anointed."
            </blockquote>
            <p className="font-body text-sm text-grey-light mt-8 max-w-lg mx-auto leading-relaxed">
              Every piece is crafted with intention. Sacred materials. Deliberate silhouettes. For those who know their purpose and dress accordingly.
            </p>
            <Link
              to="/about"
              className="inline-block mt-10 font-mono text-xs tracking-widest text-gold border border-gold/30 px-8 py-3 hover:border-gold hover:bg-gold/5 transition-all"
            >
              LEARN MORE
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* CATALOG TEASER */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeUp>
            <div className="relative overflow-hidden group aspect-[4/5] bg-grey-dark">
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)' }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="font-mono text-xs tracking-widest text-gold mb-2">NEW IN</p>
                <h3 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-4">ARRIVALS</h3>
                <Link
                  to="/shop"
                  className="font-mono text-xs tracking-widest text-ivory border border-ivory/30 px-6 py-2.5 inline-block hover:border-gold hover:text-gold transition-all w-fit"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="relative overflow-hidden group aspect-[4/5] bg-grey-dark">
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a0a 100%)' }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="font-mono text-xs tracking-widest text-gold mb-2">FAN FAVOURITES</p>
                <h3 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-4">BESTSELLERS</h3>
                <Link
                  to="/shop"
                  className="font-mono text-xs tracking-widest text-ivory border border-ivory/30 px-6 py-2.5 inline-block hover:border-gold hover:text-gold transition-all w-fit"
                >
                  EXPLORE
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-gold/10 py-20 md:py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="font-mono text-xs tracking-widest text-gold mb-4">— INNER CIRCLE</p>
            <h2 className="font-display text-4xl md:text-6xl text-white tracking-wide mb-4">JOIN THE CHOSEN</h2>
            <p className="font-body text-sm text-grey-light mb-10">
              First access to limited drops, sacred announcements, and exclusive offers.
            </p>
            <div className="flex gap-0 max-w-md mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 bg-grey-dark border border-gold/20 px-5 py-4 font-mono text-xs text-ivory placeholder-grey-mid focus:outline-none focus:border-gold/50"
              />
              <button className="bg-gold text-black font-mono text-xs tracking-widest px-6 py-4 hover:bg-gold-light transition-colors whitespace-nowrap">
                JOIN
              </button>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
