import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navLinks = [
  { to: '/shop', label: 'SHOP' },
  { to: '/about', label: 'ABOUT' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'CONTACT' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
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
  }, [open]);

  useEffect(() => { setOpen(false); }, [location]);

  const isTransparent = isHome && !scrolled && !open;

  // Mobile sizes — sized to fit small screens without overflow
  const hamburgerSize = isMobile ? 26 : 24;
  const menuTextSize = isMobile ? '16px' : '25px';
  const cartTextSize = isMobile ? '16px' : '25px';
  const cartIconSize = isMobile ? 22 : 25;
  const navHeight = isMobile ? '60px' : '72px';
  const menuLinkSize = isMobile ? '38px' : '2.5rem';
  const annBarSize = isMobile ? '13px' : '25px';

  const textColor = open ? '#ffffff' : isTransparent ? '#ffffff' : '#000000';
  const bgColor = open ? '#000000' : isTransparent ? 'transparent' : '#ffffff';

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && !open && (
        <div style={{
          background: '#000000', color: '#ffffff',
          textAlign: 'center',
          padding: isMobile ? '0.55rem 2rem' : '0.7rem 3rem',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: annBarSize,
          letterSpacing: isMobile ? '0.02em' : '0.06em',
          position: 'relative',
          zIndex: 60,
          lineHeight: 1.4,
        }}>
          FREE SHIPPING ON ORDERS OVER $150<br />USE CODE: <span style={{ color: '#c9a84c' }}>CHOSEN</span> FOR 10% OFF
          <button onClick={() => setAnnouncementVisible(false)} style={{
            position: 'absolute', right: isMobile ? '0.5rem' : '1rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'none', border: 'none',
            color: '#ffffff', cursor: 'pointer',
            fontSize: isMobile ? '16px' : '20px', lineHeight: 1,
          }}>×</button>
        </div>
      )}

      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: bgColor,
        borderBottom: scrolled && !open ? '1px solid #e0e0e0' : 'none',
        transition: 'background 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
          alignItems: 'center',
          height: navHeight,
        }}>

          {/* Left — Hamburger + MENU/CLOSE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '14px', minWidth: 0 }}>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              {open ? (
                <svg width={hamburgerSize} height={hamburgerSize} viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width={hamburgerSize} height={hamburgerSize} viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2.5">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>

            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: menuTextSize,
              letterSpacing: '0.2em',
              color: textColor,
              transition: 'color 0.3s',
              userSelect: 'none',
            }}>
              {open ? 'CLOSE' : 'MENU'}
            </span>
          </div>

          {/* Center — Logo */}
          <Link to="/" onClick={() => setOpen(false)} style={{ textDecoration: 'none', textAlign: 'center', lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: isMobile ? '1.3rem' : '1.75rem', color: textColor,
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', minWidth: 0 }}>
            <button onClick={toggleCart} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px',
            }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: cartTextSize,
                letterSpacing: '0.2em',
                color: textColor,
                transition: 'color 0.3s',
              }}>CART</span>

              <svg width={cartIconSize} height={cartIconSize} viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" style={{ transition: 'stroke 0.3s', minWidth: cartIconSize }}>
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
      {open && (
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
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                  fontSize: menuLinkSize,
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
              onClick={() => { toggleCart(); setOpen(false); }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: menuLinkSize,
                color: '#ffffff',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                textAlign: 'left',
                padding: '0.4rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                width: '100%',
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
              {['FACEBOOK', 'INSTAGRAM', 'TIKTOK', 'PINTEREST'].map((s) => (
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
            }}>© {new Date().getFullYear()} INSPIRED BY GOD</p>
          </div>
        </div>
      )}
    </>
  );
}
