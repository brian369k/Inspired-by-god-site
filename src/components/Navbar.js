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

  const isTransparent = isHome && !scrolled;
  const bgColor = isTransparent ? 'transparent' : '#ffffff';
  const borderColor = isTransparent ? 'transparent' : '#e0e0e0';
  const textColor = isTransparent ? '#ffffff' : '#000000';

  const navLinks = [
    { to: '/shop', label: 'SHOP' },
    { to: '/about', label: 'ABOUT' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && (
        <div style={{
          background: '#000000', color: '#ffffff',
          textAlign: 'center', padding: '0.6rem 2rem',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600, fontSize: '12px',
          letterSpacing: '0.1em',
          position: 'relative', zIndex: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span>FREE SHIPPING ON ORDERS OVER $150 · USE CODE: <span style={{ color: '#c9a84c' }}>CHOSEN</span> FOR 10% OFF</span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            style={{
              position: 'absolute', right: '1rem',
              background: 'none', border: 'none',
              color: '#ffffff', cursor: 'pointer',
              fontSize: '16px', lineHeight: 1,
            }}
          >×</button>
        </div>
      )}

      {/* Main Navbar */}
      <nav style={{
        position: 'sticky', top: 0, left: 0, right: 0, zIndex: 50,
        background: bgColor,
        borderBottom: `1px solid ${borderColor}`,
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: '64px',
        }}>

          {/* Left — Desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
            {navLinks.slice(0, 2).map((link) => (
              <Link key={link.to} to={link.to} style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700, fontSize: '11px',
                letterSpacing: '0.15em',
                color: location.pathname === link.to ? '#c9a84c' : textColor,
                textDecoration: 'none', transition: 'color 0.2s',
              }}>{link.label}</Link>
            ))}
          </div>

          {/* Mobile left — hamburger */}
          <div className="show-mobile" style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            >
              <span style={{ display: 'block', width: '22px', height: '2px', background: textColor, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ display: 'block', width: '22px', height: '2px', background: textColor, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '22px', height: '2px', background: textColor, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>

          {/* Center — Logo */}
          <Link to="/" style={{ textDecoration: 'none', textAlign: 'center', lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '1.5rem', color: textColor,
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

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2rem' }}>
            {/* Desktop right links */}
            <div style={{ display: 'flex', gap: '2rem' }} className="hidden-mobile">
              {navLinks.slice(2).map((link) => (
                <Link key={link.to} to={link.to} style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700, fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: location.pathname === link.to ? '#c9a84c' : textColor,
                  textDecoration: 'none', transition: 'color 0.2s',
                }}>{link.label}</Link>
              ))}
            </div>

            {/* Cart */}
            <button onClick={toggleCart} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700, fontSize: '11px',
              letterSpacing: '0.15em', color: textColor,
            }}>
              CART
              {totalItems > 0 && (
                <span style={{
                  width: '20px', height: '20px',
                  background: '#c9a84c', color: '#000000',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '10px', fontWeight: 700,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: '#ffffff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '2rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800, fontSize: '2rem',
            color: '#000000', textDecoration: 'none',
            letterSpacing: '0.1em',
          }}>{link.label}</Link>
        ))}
        <button onClick={() => { toggleCart(); setMenuOpen(false); }} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800, fontSize: '2rem',
          color: '#000000', letterSpacing: '0.1em',
        }}>
          CART {totalItems > 0 && `(${totalItems})`}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
