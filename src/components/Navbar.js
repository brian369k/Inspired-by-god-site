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
  const borderColor = menuOpen ? 'none' : scrolled ? '1px solid #e0e0e0' : 'none';

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
          textAlign: 'center', padding: '0.7rem 3rem',
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
            color: '#ffffff', cursor: 'pointer', fontSize: '20px', lineHeight: 1,
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
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: '72px',
        }}>

          {/* Left — Big Hamburger + MENU text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', padding: '4px',
                display: 'flex', flexDirection: 'column',
                gap: '7px',
              }}
            >
              {/* Thick hamburger lines */}
              <span style={{
                display: 'block', width: '32px', height: '3px',
                background: textColor, transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translateY(10px)' : 'none',
                borderRadius: '2px',
              }} />
              <span style={{
                display: 'block', width: '32px', height: '3px',
                background: textColor, transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
                borderRadius: '2px',
              }} />
              <span style={{
                display: 'block', width: '32px', height: '3px',
                background: textColor, transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none',
                borderRadius: '2px',
              }} />
            </button>

            {/* MENU / CLOSE — bigger text */}
            <span style={{
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
              fontSize: '1.75rem',
              color: textColor,
              letterSpacing: '0.2em',
              display: 'block',
              transition: 'color 0.3s',
            }}>INSPIRED</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '9px',
              color: '#c9a84c',
              letterSpacing: '0.4em',
              display: 'block',
              marginTop: '-2px',
            }}>BY GOD</span>
          </Link>

          {/* Right — Cart */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button onClick={toggleCart} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: '14px',
              letterSpacing: '0.15em', color: textColor,
              transition: 'color 0.3s',
            }}>
              {/* Cart icon */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" style={{ transition: 'stroke 0.3s' }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span style={{
                  minWidth: '22px', height: '22px', padding: '0 4px',
                  background: '#c9a84c', color: '#000000',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px', fontWeight: 800,
                  borderRadius: '11px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
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
        padding: '90px 2.5rem 2.5rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        overflowY: 'auto',
      }}>
        {/* Nav links — large but not insane, like God Is Dope */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.25rem' }}>
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: location.pathname === link.to ? '#c9a84c' : '#ffffff',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                display: 'block',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: '0.4rem 0',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.35s ease ${i * 0.06}s, transform 0.35s ease ${i * 0.06}s, color 0.2s`,
              }}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => { toggleCart(); setMenuOpen(false); }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              textAlign: 'left',
              padding: '0.4rem 0',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
              transition: `opacity 0.35s ease ${navLinks.length * 0.06}s, transform 0.35s ease ${navLinks.length * 0.06}s`,
            }}
          >
            CART {totalItems > 0 && <span style={{ color: '#c9a84c' }}>({totalItems})</span>}
          </button>
        </div>

        {/* Bottom of menu */}
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
                  fontWeight: 700, fontSize: '12px',
                  letterSpacing: '0.15em', color: '#888888',
                  textDecoration: 'none',
                }}
              >{s}</a>
            ))}
          </div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500, fontSize: '11px',
            color: '#555555',
          }}>© 2024 INSPIRED BY GOD</p>
        </div>
      </div>
    </>
  );
}
