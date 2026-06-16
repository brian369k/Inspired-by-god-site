import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [menuOpen]);

  const isTransparent = isHome && !scrolled && !menuOpen;
  const bgColor = menuOpen ? '#000000' : isTransparent ? 'transparent' : '#ffffff';
  const textColor = menuOpen ? '#ffffff' : isTransparent ? '#ffffff' : '#000000';
  const borderColor = menuOpen ? 'none' : scrolled ? '1px solid #e0e0e0' : 'none';

  const navLinks = [
    { to: '/shop', label: 'SHOP' },
    { to: '/about', label: 'ABOUT' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <style>{`
        /* MOBILE ONLY — max 768px */
        @media (max-width: 768px) {
          .ibg-ann-bar { font-size: 13px !important; }
          .ibg-menu-text { font-size: 22px !important; }
          .ibg-cart-text { font-size: 22px !important; }
          .ibg-hamburger-icon { width: 40px !important; height: 40px !important; }
          .ibg-cart-icon { width: 28px !important; height: 28px !important; }
          .ibg-nav-height { height: 80px !important; }
          .ibg-fullmenu-link { font-size: 55px !important; }
          .ibg-fullmenu-cart { font-size: 55px !important; }
        }
      `}</style>

      {/* Announcement Bar */}
      {announcementVisible && !menuOpen && (
        <div className="ibg-ann-bar" style={{
          background: '#000000', color: '#ffffff',
          textAlign: 'center',
          padding: '0.7rem 3rem',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.06em',
          position: 'relative',
          zIndex: 60,
          lineHeight: 1.5,
        }}>
          FREE SHIPPING ON ORDERS OVER $150 · USE CODE: <span style={{ color: '#c9a84c' }}>CHOSEN</span> FOR 10% OFF
          <button onClick={() => setAnnouncementVisible(false)} style={{
            position: 'absolute', right: '1rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'none', border: 'none',
            color: '#ffffff', cursor: 'pointer',
            fontSize: '20px', lineHeight: 1,
          }}>×</button>
        </div>
      )}

      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: bgColor,
        borderBottom: borderColor,
        transition: 'background 0.3s ease',
      }}>
        <div className="ibg-nav-height" style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: '72px',
        }}>

          {/* Left — Hamburger + MENU/CLOSE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              {menuOpen ? (
                <svg className="ibg-hamburger-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg className="ibg-hamburger-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2.5">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>

            <span className="ibg-menu-text" style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: '16px',
              letterSpacing: '0.2em',
              color: textColor,
              transition: 'color 0.3s',
              userSelect: 'none',
            }}>
              {menuOpen ? 'CLOSE' : 'MENU'}
            </span>
          </div>

          {/* Center — Logo */}
          <Link to="/" style={{ textDecoration: 'none', textAlign: 'center', lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '1.75rem', color: textColor,
              letterSpacing: '0.2em', display: 'block',
              transition: 'color 0.3s',
            }}>INSPIRED</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700, fontSize: '9px',
              color: '#c9a84c', letterSpacing: '0.4em',
              display: 'block', marginTop: '-2px',
            }}>BY GOD</span>
          </Link>

          {/* Right — CART */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button onClick={toggleCart} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span className="ibg-cart-text" style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: '13px',
                letterSpacing: '0.2em',
                color: textColor,
                transition: 'color 0.3s',
              }}>CART</span>

              <svg className="ibg-cart-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" style={{ transition: 'stroke 0.3s', minWidth: '22px' }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>

              {totalItems > 0 && (
                <span style={{
                  minWidth: '24px', height: '24px', padding: '0 4px',
                  background: '#c9a84c', color: '#000000',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '12px', fontWeight: 800,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 40,
          backgroundColor: '#000000',
          display: 'flex', flexDirection: 'column',
          padding: '100px 1.5rem 2.5rem',
          overflowY: 'auto',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="ibg-fullmenu-link"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  color: location.pathname === link.to ? '#c9a84c' : '#ffffff',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  lineHeight: 1.1,
                  display: 'block',
                  padding: '0.4rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { toggleCart(); setMenuOpen(false); }}
              className="ibg-fullmenu-cart"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: '2.5rem',
                color: '#ffffff',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                textAlign: 'left',
                padding: '0.4rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              CART {totalItems > 0 && <span style={{ color: '#c9a84c' }}>({totalItems})</span>}
            </button>
          </nav>

          <div style={{
            marginTop: 'auto',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
          }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['INSTAGRAM', 'TIKTOK', 'TWITTER'].map((s) => (
                <a key={s} href={`https://${s.toLowerCase()}.com`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700, fontSize: '14px',
                    letterSpacing: '0.15em', color: '#888888',
                    textDecoration: 'none',
                  }}>{s}</a>
              ))}
            </div>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500, fontSize: '13px', color: '#555555',
            }}>© 2026 INSPIRED BY GOD</p>
          </div>
        </div>
      )}
    </>
  );
}
