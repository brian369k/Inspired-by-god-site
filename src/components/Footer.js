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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2.5rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
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
              fontSize: '13px', color: '#888',
              lineHeight: 1.7, maxWidth: '260px',
            }}>
              Luxury streetwear for the chosen. Elevated essentials worn by those who move with purpose.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {[
                { name: 'IG', href: 'https://instagram.com' },
                { name: 'TK', href: 'https://tiktok.com' },
                { name: 'TW', href: 'https://twitter.com' },
                { name: 'PT', href: 'https://pinterest.com' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px', height: '36px',
                    border: '1px solid rgba(201,168,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px', color: '#888',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.color = '#888'; }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', letterSpacing: '0.25em',
              color: '#c9a84c', marginBottom: '1.25rem',
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
                    fontSize: '13px', color: '#888',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', letterSpacing: '0.25em',
              color: '#c9a84c', marginBottom: '1.25rem',
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
                    fontSize: '13px', color: '#888',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px', letterSpacing: '0.2em',
            color: '#444',
          }}>
            © {year} INSPIRED BY GOD. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
