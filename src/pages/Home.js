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
    }, { threshold: 0.1, ...options });
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
      transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
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

      {/* HERO */}
      <section style={{
        minHeight: '85vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        background: '#000000', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.12,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '1280px',
          margin: '0 auto', padding: '4rem 1.5rem',
          textAlign: 'center',
          opacity: heroLoaded ? 1 : 0,
          transform: heroLoaded ? 'none' : 'translateY(30px)',
          transition: 'opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s',
        }}>

          {/* No SS 2024 text - removed */}

          <h1 style={{ margin: 0, padding: 0, lineHeight: 0.95 }}>
            <span style={{
              display: 'block',
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 'clamp(70px, 18vw, 180px)',
              color: '#ffffff',
              WebkitTextFillColor: '#ffffff',
              letterSpacing: '0.03em',
            }}>INSPIRED</span>
            <span style={{
              display: 'block',
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 'clamp(70px, 18vw, 180px)',
              background: 'linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.03em',
            }}>BY GOD</span>
          </h1>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500, fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.8)',
            marginTop: '1.5rem', maxWidth: '480px',
            marginLeft: 'auto', marginRight: 'auto',
            fontStyle: 'italic',
            opacity: heroLoaded ? 1 : 0,
            transition: 'opacity 1s ease 0.8s',
          }}>
            "Elevated essentials for those who move with divine purpose."
          </p>

          <div style={{
            display: 'flex', gap: '1rem',
            justifyContent: 'center', flexWrap: 'wrap',
            marginTop: '2rem',
            opacity: heroLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease 1s',
          }}>
            <Link to="/shop" style={{
              background: '#c9a84c', color: '#000000',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: '12px',
              letterSpacing: '0.2em',
              padding: '1rem 2.5rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            }}>SHOP THE DROP →</Link>
            <Link to="/about" style={{
              border: '2px solid rgba(255,255,255,0.5)', color: '#ffffff',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700, fontSize: '12px',
              letterSpacing: '0.2em',
              padding: '1rem 2.5rem', textDecoration: 'none',
            }}>OUR STORY</Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: '#c9a84c', padding: '0.7rem 0', overflow: 'hidden' }}>
        <div className="marquee-content" style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700, fontSize: '11px',
          letterSpacing: '0.2em', color: '#000000', whiteSpace: 'nowrap',
        }}>
          {Array(8).fill('INSPIRED BY GOD · LUXURY STREETWEAR · FREE SHIPPING OVER $150 · NEW ARRIVALS NOW LIVE · CHOSEN ONES ONLY · ').join('')}
        </div>
      </div>

      {/* PRODUCTS */}
      <section style={{ background: '#ffffff', maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <FadeUp>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            {/* No "— FEATURED PIECES" label */}
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)',
              color: '#000000', letterSpacing: '-0.01em', lineHeight: 1,
            }}>
              THE COLLECTION
            </h2>
            <Link to="/shop" style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700, fontSize: '12px',
              letterSpacing: '0.15em', color: '#000000',
              textDecoration: 'none', borderBottom: '2px solid #000',
              paddingBottom: '2px',
            }}>
              VIEW ALL →
            </Link>
          </div>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {products.map((product, i) => (
            <FadeUp key={product.id} delay={i * 0.05}>
              <ProductCard product={product} index={i} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section style={{ background: '#f5f5f5', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <FadeUp>
            <blockquote style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: 'clamp(22px, 4vw, 36px)',
              color: '#000000', lineHeight: 1.3, margin: 0,
            }}>
              "We don't make clothes. We make armor for the anointed."
            </blockquote>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500, fontSize: '15px',
              color: '#444444', marginTop: '1.5rem', lineHeight: 1.8,
            }}>
              Every piece is crafted with intention. Sacred materials. Deliberate silhouettes. For those who know their purpose and dress accordingly.
            </p>
            <Link to="/about" style={{
              display: 'inline-block', marginTop: '2rem',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
              fontSize: '12px', letterSpacing: '0.2em',
              color: '#000000', border: '2px solid #000000',
              padding: '0.75rem 2rem', textDecoration: 'none',
            }}>LEARN MORE</Link>
          </FadeUp>
        </div>
      </section>

      {/* PANELS — No NEW IN or FAN FAVORITES labels */}
      <section style={{ background: '#ffffff', maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: 'ARRIVALS', btn: 'SHOP NOW', img: products[0].images[0] },
            { title: 'BESTSELLERS', btn: 'EXPLORE', img: products[1].images[0] },
          ].map((panel, i) => (
            <FadeUp key={panel.title} delay={i * 0.1}>
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                <img src={panel.img} alt={panel.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', right: '1.5rem' }}>
                  <h3 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800, fontSize: '2.2rem',
                    color: '#ffffff', marginBottom: '1rem', lineHeight: 1,
                  }}>{panel.title}</h3>
                  <Link to="/shop" style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700, fontSize: '11px',
                    letterSpacing: '0.2em', color: '#ffffff',
                    border: '2px solid rgba(255,255,255,0.7)',
                    padding: '0.6rem 1.5rem', textDecoration: 'none',
                    display: 'inline-block',
                  }}>{panel.btn}</Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* NEWSLETTER — renamed from INNER CIRCLE */}
      <section style={{ background: '#f5f5f5', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <FadeUp>
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800, fontSize: 'clamp(28px, 6vw, 52px)',
            color: '#000000', marginBottom: '0.75rem',
          }}>JOIN THE CHOSEN</h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500, fontSize: '15px',
            color: '#444444', marginBottom: '2rem',
          }}>
            Sign up to get the latest on drops, sales, new releases and more.
          </p>
          <div style={{ display: 'flex', maxWidth: '440px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email address..."
              style={{
                flex: 1, background: '#ffffff',
                border: '2px solid #000000', borderRight: 'none',
                padding: '1rem 1.25rem',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500, fontSize: '13px',
                color: '#000000', outline: 'none',
              }}
            />
            <button style={{
              background: '#000000', color: '#ffffff', border: 'none',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: '12px',
              letterSpacing: '0.15em', padding: '1rem 1.5rem', cursor: 'pointer',
            }}>SIGN UP</button>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
