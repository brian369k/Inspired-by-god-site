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

const FadeUp = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
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

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ============ HERO — BLACK ============ */}
      <section style={{
        minHeight: '80vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        background: '#000000', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.15,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '1280px',
          margin: '0 auto', padding: '6rem 2.5rem',
          textAlign: 'center',
          opacity: heroLoaded ? 1 : 0,
          transform: heroLoaded ? 'none' : 'translateY(30px)',
          transition: 'opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s',
        }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', letterSpacing: '0.4em',
            color: '#c9a84c', marginBottom: '2rem',
          }}>SS 2024 — DROP 01</p>

          <h1 style={{ margin: 0, padding: 0, lineHeight: 1 }}>
            <span style={{
              display: 'block',
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 'clamp(80px, 14vw, 160px)',
              color: '#ffffff',
              WebkitTextFillColor: '#ffffff',
              letterSpacing: '0.05em', lineHeight: 1,
            }}>INSPIRED</span>
            <span style={{
              display: 'block',
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 'clamp(80px, 14vw, 160px)',
              background: 'linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.05em', lineHeight: 1,
              marginTop: '-0.1em',
            }}>BY GOD</span>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'rgba(255,255,255,0.85)',
            fontStyle: 'italic',
            marginTop: '1.5rem', maxWidth: '500px',
            marginLeft: 'auto', marginRight: 'auto',
            opacity: heroLoaded ? 1 : 0,
            transition: 'opacity 1s ease 0.8s',
          }}>
            "Elevated essentials for those who move with divine purpose."
          </p>

          <div style={{
            display: 'flex', gap: '1rem',
            justifyContent: 'center', flexWrap: 'wrap',
            marginTop: '2.5rem',
            opacity: heroLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease 1s',
          }}>
            <Link to="/shop" style={{
              background: '#c9a84c', color: '#000000',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px', letterSpacing: '0.25em',
              padding: '1rem 2.5rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            }}>SHOP THE DROP →</Link>
            <Link to="/about" style={{
              border: '1px solid rgba(255,255,255,0.4)', color: '#ffffff',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px', letterSpacing: '0.25em',
              padding: '1rem 2.5rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
            }}>OUR STORY</Link>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div style={{ background: '#c9a84c', padding: '0.75rem 0', overflow: 'hidden' }}>
        <div className="marquee-content" style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px', letterSpacing: '0.25em',
          color: '#000000', whiteSpace: 'nowrap',
        }}>
          {Array(8).fill('INSPIRED BY GOD · LUXURY STREETWEAR · FREE SHIPPING OVER $150 · NEW ARRIVALS NOW LIVE · CHOSEN ONES ONLY · ').join('')}
        </div>
      </div>

      {/* ============ PRODUCTS — WHITE BACKGROUND ============ */}
      <section style={{ background: '#ffffff', maxWidth: '1280px', margin: '0 auto', padding: '5rem 2.5rem' }}>
        <FadeUp>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.25em', color: '#c9a84c', marginBottom: '0.75rem' }}>— FEATURED PIECES</p>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 7vw, 80px)', color: '#000000', letterSpacing: '0.05em', lineHeight: 1 }}>
                THE COLLECTION
              </h2>
            </div>
            <Link to="/shop" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.25em', color: '#000000', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: '2px' }}>
              VIEW ALL →
            </Link>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {products.slice(0, 3).map((product, i) => (
            <FadeUp key={product.id} delay={i * 0.1}>
              <ProductCard product={product} index={i} />
            </FadeUp>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '1.5rem', maxWidth: '66%', marginLeft: 'auto', marginRight: 'auto' }}>
          {products.slice(3, 5).map((product, i) => (
            <FadeUp key={product.id} delay={i * 0.1}>
              <ProductCard product={product} index={i + 3} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ============ BRAND STATEMENT — LIGHT GREY ============ */}
      <section style={{ background: '#f5f5f5', padding: '6rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.4em', color: '#c9a84c', marginBottom: '2rem' }}>— THE ETHOS</p>
            <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 4vw, 48px)', color: '#000000', fontStyle: 'italic', lineHeight: 1.3, margin: 0 }}>
              "We don't make clothes.<br />We make armor for the anointed."
            </blockquote>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#444444', marginTop: '2rem', lineHeight: 1.7, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
              Every piece is crafted with intention. Sacred materials. Deliberate silhouettes. For those who know their purpose and dress accordingly.
            </p>
            <Link to="/about" style={{
              display: 'inline-block', marginTop: '2.5rem',
              fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.25em',
              color: '#000000', border: '1px solid #000000',
              padding: '0.75rem 2rem', textDecoration: 'none',
            }}>LEARN MORE</Link>
          </FadeUp>
        </div>
      </section>

      {/* ============ CATALOG PANELS ============ */}
      <section style={{ background: '#ffffff', maxWidth: '1280px', margin: '0 auto', padding: '5rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <FadeUp>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
              <img src={products[0].images[0]} alt="New Arrivals" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.25em', color: '#c9a84c', marginBottom: '0.5rem' }}>NEW IN</p>
                <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '48px', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1rem' }}>ARRIVALS</h3>
                <Link to="/shop" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.25em', color: '#ffffff', border: '1px solid rgba(255,255,255,0.5)', padding: '0.625rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>SHOP NOW</Link>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
              <img src={products[1].images[0]} alt="Bestsellers" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.25em', color: '#c9a84c', marginBottom: '0.5rem' }}>FAN FAVOURITES</p>
                <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '48px', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1rem' }}>BESTSELLERS</h3>
                <Link to="/shop" style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.25em', color: '#ffffff', border: '1px solid rgba(255,255,255,0.5)', padding: '0.625rem 1.5rem', textDecoration: 'none', display: 'inline-block' }}>EXPLORE</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============ NEWSLETTER — LIGHT GREY ============ */}
      <section style={{ background: '#f5f5f5', padding: '5rem 2.5rem', textAlign: 'center' }}>
        <FadeUp>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.25em', color: '#c9a84c', marginBottom: '1rem' }}>— INNER CIRCLE</p>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(40px, 6vw, 72px)', color: '#000000', letterSpacing: '0.05em', marginBottom: '1rem' }}>JOIN THE CHOSEN</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#444444', marginBottom: '2.5rem' }}>
            First access to limited drops, sacred announcements, and exclusive offers.
          </p>
          <div style={{ display: 'flex', maxWidth: '420px', margin: '0 auto' }}>
            <input type="email" placeholder="YOUR EMAIL ADDRESS" style={{
              flex: 1, background: '#ffffff',
              border: '1px solid #cccccc', borderRight: 'none',
              padding: '1rem 1.25rem',
              fontFamily: "'Space Mono', monospace", fontSize: '11px',
              color: '#000000', outline: 'none',
            }} />
            <button style={{
              background: '#000000', color: '#ffffff', border: 'none',
              fontFamily: "'Space Mono', monospace", fontSize: '11px',
              letterSpacing: '0.25em', padding: '1rem 1.5rem', cursor: 'pointer',
            }}>JOIN</button>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
