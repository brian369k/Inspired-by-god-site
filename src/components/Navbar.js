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
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isTransparent = isHome && !scrolled && !menuOpen;
  const bgColor = menuOpen ? '#000000' : isTransparent ? 'transparent' : '#ffffff';
  const textColor = menuOpen ? '#ffffff' : isTransparent ? '#ffffff' : '#000000';

  const navLinks = [
    { to: '/shop', label: 'SHOP' },
    { to: '/about', label: 'ABOUT' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && !menuOpen && (
        <div style={{
          background: '#000000', color: '#ffffff',
          textAlign: 'center', padding: '0.6rem 2.5rem',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700, fontSize: '12px',
          letterSpacing: '0.12em', position: 'relative',
          zIndex: 60,
        }}>
          FREE SHIPPING ON ORDERS OVER $150 · USE CODE: <span style={{ color: '#c9a84c' }}>CHOSEN</span> FOR 10% OFF
          <button onClick={() => setAnnouncementVisible(false)} style={{
            position: 'absolute', right: '1rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'none', border: 'none',
            color: '#ffffff', cursor: 'pointer', fontSize: '18px',
          }}>×</button>
        </div>
      )}

      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: bgColor,
        borderBottom: menuOpen ? 'none' : scrolled ? '1px solid #e0e0e0' : 'none',
        transition: 'background 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: '64px',
        }}>
          {/* Left — Hamburger + MENU/CLOSE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px',
                display: 'flex', flexDirection: 'column', gap: '5px',
              }}
            >
              <span style={{
                display: 'block', width: '28px', height: '3px',
                background: textColor, transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
              }} />
              <span style={{
                display: 'block', width: '28px', height: '3px',
                background: textColor, transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: '28px', height: '3px',
                background: textColor, transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
              }} />
            </button>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: '13px',
              letterSpacing: '0.2em', color: textColor,
              transition: 'color 0.3s',
            }}>
              {menuOpen ? 'CLOSE' : 'MENU'}
            </span>
          </div>

          {/* Center — Logo */}
          <Link to="/" style={{ textDecoration: 'none', textAlign: 'center', lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '1.6rem', color: textColor,
              letterSpacing: '0.2em', display: 'block',
              transition: 'color 0.3s',
            }}>INSPIRED</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700, fontSize: '8px',
              color: '#c9a84c', letterSpacing: '0.4em',
              display: 'block', marginTop: '-2px',
            }}>BY GOD</span>
          </Link>

          {/* Right — Cart */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={toggleCart} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: '13px',
              letterSpacing: '0.15em', color: textColor,
              transition: 'color 0.3s',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2.5" style={{ transition: 'stroke 0.3s' }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span style={{
                  width: '22px', height: '22px',
                  background: '#c9a84c', color: '#000000',
                  fontSize: '11px', fontWeight: 800,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Montserrat', sans-serif",
                }}>{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: '#000000',
        display: 'flex', flexDirection: 'column',
        padding: '80px 2rem 2rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        overflowY: 'auto',
      }}>
        {/* BIG nav links */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0' }}>
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 14vw, 7rem)',
                color: location.pathname === link.to ? '#c9a84c' : '#ffffff',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                display: 'block',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                paddingBottom: '0.25rem',
                marginBottom: '0.25rem',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
                transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s, color 0.2s`,
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Cart in menu */}
          <button
            onClick={() => { toggleCart(); setMenuOpen(false); }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 14vw, 7rem)',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              textAlign: 'left', padding: '0',
              paddingBottom: '0.25rem',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(-30px)',
              transition: `opacity 0.4s ease ${navLinks.length * 0.07}s, transform 0.4s ease ${navLinks.length * 0.07}s`,
            }}
          >
            CART {totalItems > 0 && <span style={{ color: '#c9a84c' }}>({totalItems})</span>}
          </button>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['INSTAGRAM', 'TIKTOK', 'TWITTER'].map((s) => (
              <a key={s} href={`https://${s.toLowerCase()}.com`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700, fontSize: '11px',
                  letterSpacing: '0.15em', color: '#777777',
                  textDecoration: 'none',
                }}
              >{s}</a>
            ))}
          </div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500, fontSize: '11px',
            color: '#555555', letterSpacing: '0.1em',
          }}>© 2024 INSPIRED BY GOD</p>
        </div>
      </div>
    </>
  );
}
