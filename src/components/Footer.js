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

      {/* Main footer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>

        {/* Brand section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'block', marginBottom: '0.75rem' }}>
            <span style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '2rem', color: '#ffffff',
              letterSpacing: '0.2em', display: 'block',
            }}>INSPIRED</span>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', color: '#c9a84c',
              letterSpacing: '0.4em',
            }}>BY GOD</span>
          </Link>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px', color: '#ffffff',
            lineHeight: 1.7, maxWidth: '260px',
          }}>
            Luxury streetwear for the chosen. Elevated essentials worn by those who move with purpose.
          </p>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px', letterSpacing: '0.15em',
            color: '#ffffff', marginTop: '1rem',
          }}>
            © {year} INSPIRED BY GOD. ALL RIGHTS RESERVED.
          </p>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            {[
              { name: 'IG', href: 'https://instagram.com' },
              { name: 'TK', href: 'https://tiktok.com' },
              { name: 'TW', href: 'https://twitter.com' },
              { name: 'PT', href: 'https://pinterest.com' },
            ].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{
                  width: '36px', height: '36px',
                  border: '1px solid rgba(201,168,76,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px', color: '#ffffff', textDecoration: 'none',
                }}
              >{s.name}</a>
            ))}
          </div>
        </div>

        {/* Links — side by side on ALL screens */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* Shop */}
          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', letterSpacing: '0.25em',
              color: '#c9a84c', marginBottom: '1rem',
            }}>SHOP</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Shop All', to: '/shop' },
                { label: 'About', to: '/about' },
                { label: 'FAQ', to: '/faq' },
                { label: 'Contact', to: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px', color: '#ffffff', textDecoration: 'none',
                  }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', letterSpacing: '0.25em',
              color: '#c9a84c', marginBottom: '1rem',
            }}>LEGAL</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Return Policy', to: '/return-policy' },
                { label: 'Terms & Conditions', to: '/terms' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px', color: '#ffffff', textDecoration: 'none',
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
