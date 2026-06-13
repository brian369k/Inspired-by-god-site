import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#f5f5f5', borderTop: '1px solid #e0e0e0', overflow: 'hidden' }}>

      {/* Marquee */}
      <div style={{ background: '#c9a84c', padding: '0.6rem 0', overflow: 'hidden' }}>
        <div className="marquee-content" style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700, fontSize: '11px',
          letterSpacing: '0.25em', color: '#000000', whiteSpace: 'nowrap',
        }}>
          {Array(10).fill('INSPIRED BY GOD · LUXURY STREETWEAR · ELEVATED ESSENTIALS · CHOSEN · ').join('')}
        </div>
      </div>

      {/* Main footer — equal 3 columns */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}>

          {/* Column 1 — Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
              <span style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '1.8rem', color: '#000000',
                letterSpacing: '0.2em', display: 'block',
              }}>INSPIRED</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700, fontSize: '9px',
                color: '#c9a84c', letterSpacing: '0.4em',
              }}>BY GOD</span>
            </Link>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500, fontSize: '13px',
              color: '#444444', lineHeight: 1.7,
              marginBottom: '1rem',
            }}>
              Luxury streetwear for the chosen. Elevated essentials worn by those who move with purpose.
            </p>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700, fontSize: '11px',
              letterSpacing: '0.1em', color: '#000000',
              marginBottom: '1rem',
            }}>
              © {year} INSPIRED BY GOD. ALL RIGHTS RESERVED.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { name: 'IG', href: 'https://instagram.com' },
                { name: 'TK', href: 'https://tiktok.com' },
                { name: 'TW', href: 'https://twitter.com' },
                { name: 'PT', href: 'https://pinterest.com' },
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: '36px', height: '36px',
                    border: '1px solid #cccccc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700, fontSize: '9px',
                    color: '#333333', textDecoration: 'none',
                    background: '#ffffff',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#cccccc'; e.currentTarget.style.color = '#333333'; }}
                >{s.name}</a>
              ))}
            </div>
          </div>

          {/* Column 2 — Shop */}
          <div>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: '12px',
              letterSpacing: '0.2em', color: '#000000',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '2px solid #000000',
            }}>SHOP</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: 'Shop All', to: '/shop' },
                { label: 'About', to: '/about' },
                { label: 'FAQ', to: '/faq' },
                { label: 'Contact', to: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500, fontSize: '14px',
                    color: '#333333', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                    onMouseLeave={e => e.currentTarget.style.color = '#333333'}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: '12px',
              letterSpacing: '0.2em', color: '#000000',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '2px solid #000000',
            }}>LEGAL</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Return Policy', to: '/return-policy' },
                { label: 'Terms & Conditions', to: '/terms' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500, fontSize: '14px',
                    color: '#333333', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                    onMouseLeave={e => e.currentTarget.style.color = '#333333'}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
