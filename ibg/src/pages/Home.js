import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

// Intersection observer hook
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
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85"
            alt="Hero"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.35)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full">
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

            {/* Hero title */}
           <h1 className="font-display leading-none flex flex-col items-center">
  <span className="text-[14vw] md:text-[11vw] lg:text-[9vw] text-ivory tracking-wide text-center">
    INSPIRED
  </span>

  <span className="text-[14vw] md:text-[11vw] lg:text-[9vw] text-gradient-gold tracking-wide text-center self-center">
    BY GOD
  </span>
</h1>
</div>
            {/* Subheadline */}
            <p
              className="font-heading text-lg md:text-2xl text-ivory/70 italic mt-6 md:mt-8 max-w-lg"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transition: 'opacity 1s ease 0.8s',
              }}
            >
              "Elevated essentials for those who move with divine purpose."
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12"
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

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-3"
          style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 1s ease 1.5s' }}
        >
          <span className="font-mono text-[10px] tracking-widest text-grey-light rotate-90 mb-2">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent" />
        </div>
      </section>

      {/* MARQUEE BAND */}
      <div className="bg-gold py-3 overflow-hidden">
        <div className="marquee-content font-mono text-[11px] tracking-widest text-black whitespace-nowrap">
          {Array(8).fill('TEST MODE ACTIVE · LUXURY STREETWEAR · FREE SHIPPING OVER $150 · NEW ARRIVALS NOW LIVE · CHOSEN ONES ONLY · ').join('')}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <FadeUp className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-gold mb-3">— FEATURED PIECES</p>
            <h2 className="font-display text-5xl md:text-7xl text-ivory tracking-wide leading-none">
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

      {/* BRAND STATEMENT — FULL WIDTH */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80"
            alt="Brand"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2)' }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
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

      {/* FULL CATALOG TEASER */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Arrivals */}
          <FadeUp>
            <div className="relative overflow-hidden group aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80"
                alt="New Arrivals"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.5)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-mono text-xs tracking-widest text-gold mb-2">NEW IN</p>
                <h3 className="font-display text-4xl md:text-5xl text-ivory tracking-wide mb-4">ARRIVALS</h3>
                <Link
                  to="/shop"
                  className="font-mono text-xs tracking-widest text-ivory border border-ivory/30 px-6 py-2.5 inline-block hover:border-gold hover:text-gold transition-all"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Bestsellers */}
          <FadeUp delay={0.15}>
            <div className="relative overflow-hidden group aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80"
                alt="Bestsellers"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.5)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-mono text-xs tracking-widest text-gold mb-2">FAN FAVOURITES</p>
                <h3 className="font-display text-4xl md:text-5xl text-ivory tracking-wide mb-4">BESTSELLERS</h3>
                <Link
                  to="/shop"
                  className="font-mono text-xs tracking-widest text-ivory border border-ivory/30 px-6 py-2.5 inline-block hover:border-gold hover:text-gold transition-all"
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
            <h2 className="font-display text-4xl md:text-6xl text-ivory tracking-wide mb-4">JOIN THE CHOSEN</h2>
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
