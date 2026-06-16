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
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

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

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const isTransparent = isHome && !scrolled && !open;

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && !open && (
        <div className={`relative z-50 text-center font-bold tracking-wider ${isTransparent ? 'bg-black' : 'bg-black'}`}
          style={{ padding: '0.7rem 3rem', fontSize: '25px', fontFamily: "'Montserrat', sans-serif", color: '#ffffff', letterSpacing: '0.06em', lineHeight: 1.5 }}
        >
          FREE SHIPPING ON ORDERS OVER $150 · USE CODE: <span style={{ color: '#c9a84c' }}>CHOSEN</span> FOR 10% OFF
          <button onClick={() => setAnnouncementVisible(false)}
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '20px' }}
          >×</button>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b' : ''}`}
        style={{
          background: open ? '#000000' : isTransparent ? 'transparent' : '#ffffff',
          borderColor: scrolled && !open ? '#e0e0e0' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" onClick={() => setOpen(false)} style={{ textDecoration: 'none', textAlign: 'center', lineHeight: 1 }}>
              <span style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '1.75rem',
                color: open ? '#ffffff' : isTransparent ? '#ffffff' : '#000000',
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

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700, fontSize: '25px',
                  letterSpacing: '0.15em',
                  color: location.pathname === l.to ? '#c9a84c' : isTransparent ? '#ffffff' : '#000000',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}>
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Cart */}
            <div className="hidden lg:flex items-center gap-3">
              <button onClick={toggleCart} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800, fontSize: '25px',
                letterSpacing: '0.15em',
                color: isTransparent ? '#ffffff' : '#000000',
              }}>
                CART
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {totalItems > 0 && (
                  <span style={{
                    minWidth: '20px', height: '20px',
                    background: '#c9a84c', color: '#000000',
                    fontSize: '10px', fontWeight: 800,
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 4px',
                  }}>{totalItems}</span>
                )}
              </button>
            </div>

            {/* Mobile: Cart + Hamburger — matching caricature exactly */}
            <div className="flex lg:hidden items-center gap-2">
              <button onClick={toggleCart} className="text-white p-2" style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800, fontSize: '30px',
                letterSpacing: '0.15em',
                color: open ? '#ffffff' : isTransparent ? '#ffffff' : '#000000',
              }}>
                CART
                {totalItems > 0 && (
                  <span style={{
                    minWidth: '26px', height: '26px',
                    background: '#c9a84c', color: '#000000',
                    fontSize: '25px', fontWeight: 800,
                    borderRadius: '13px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 4px',
                  }}>{totalItems}</span>
                )}
              </button>

              <button
                onClick={() => setOpen(!open)}
                className="p-2"
                aria-label="Toggle menu"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: open ? '#ffffff' : isTransparent ? '#ffffff' : '#000000',
                }}
              >
                {open ? (
                  /* X icon — size 55 like caricature */
                  <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  /* Hamburger — size 55 like caricature */
                  <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — full screen solid overlay — matching caricature exactly */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40" style={{ backgroundColor: '#000000' }}>
          <nav className="px-6 pt-24 flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-white py-5 border-b border-white/10 tracking-widest"
                style={{
                  fontSize: '55px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                  textDecoration: 'none',
                  color: location.pathname === l.to ? '#c9a84c' : '#ffffff',
                  lineHeight: 1.1,
                }}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { toggleCart(); setOpen(false); }}
              className="mt-2 py-5 border-b border-white/10 text-left"
              style={{
                fontSize: '55px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                color: '#ffffff',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                padding: '1.25rem 0',
              }}
            >
              CART {totalItems > 0 && <span style={{ color: '#c9a84c' }}>({totalItems})</span>}
            </button>
          </nav>

          {/* Bottom social */}
          <div style={{
            position: 'absolute', bottom: '2rem', left: '1.5rem', right: '1.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
          }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['INSTAGRAM', 'TIKTOK', 'TWITTER'].map((s) => (
                <a key={s} href={`https://${s.toLowerCase()}.com`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '14px', letterSpacing: '0.15em', color: '#888888', textDecoration: 'none' }}
                >{s}</a>
              ))}
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '25px', color: '#555555' }}>© 2026 IBG</p>
          </div>
        </div>
      )}
    </>
  );
}
