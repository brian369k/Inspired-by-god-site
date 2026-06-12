import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(201,168,76,0.1)', overflow: 'hidden' }}>

      {/* Marquee */}
      <div style={{ background: '#c9a84c', padding: '0.6rem 0', overflow: 'hidden' }}>
        <div className="marquee-content" style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px', letterSpacing: '0.25em',
          color: '#000000', whiteSpace: 'nowrap',
        }}>
          {Array(10).fill('INSPIRED BY GOD · LUXURY STREETWEAR · ELEVATED ESSENTIALS · CHOSEN · ').join('')}
        </div>
      </div>

      {/* All 3 columns in one row always */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '2rem',
        }}>

          {/* Column 1 — Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'block', marginBottom: '0.75rem' }}>
              <span style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '1.8rem', color: '#ffffff',
                letterSpacing: '0.2em', display: 'block',
              }}>INSPIRED</span>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px', color: '#c9a84c',
                letterSpacing: '0.4em',
              }}>BY GOD</span>
            </Link>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px', color: '#ffffff',
              lineHeight: 1.6, maxWidth: '220px',
            }}>
              Luxury streetwear for the chosen. Elevated essentials worn by those who move with purpose.
            </p>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px', letterSpacing: '0.1em',
              color: '#ffffff', marginTop: '1rem',
            }}>
              © {year} INSPIRED BY GOD.<br />ALL RIGHTS RESERVED.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {[
                { name: 'IG', href: 'https://instagram.com' },
                { name: 'TK', href: 'https://tiktok.com' },
                { name: 'TW', href: 'https://twitter.com' },
                { name: 'PT', href: 'https://pinterest.com' },
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: '32px', height: '32px',
                    border: '1px solid rgba(201,168,76,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '8px', color: '#ffffff', textDecoration: 'none',
                  }}
                >{s.name}</a>
              ))}
            </div>
          </div>

          {/* Column 2 — Shop */}
          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px', letterSpacing: '0.25em',
              color: '#c9a84c', marginBottom: '1rem',
            }}>SHOP</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Shop All', to: '/shop' },
                { label: 'About', to: '/about' },
                { label: 'FAQ', to: '/faq' },
                { label: 'Contact', to: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px', color: '#ffffff', textDecoration: 'none',
                  }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px', letterSpacing: '0.25em',
              color: '#c9a84c', marginBottom: '1rem',
            }}>LEGAL</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Return Policy', to: '/return-policy' },
                { label: 'Terms & Conditions', to: '/terms' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px', color: '#ffffff', textDecoration: 'none',
                  }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
