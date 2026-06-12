import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  // On homepage: transparent over black hero, then white after scroll
  // On other pages: always white
  const isTransparent = isHome && !scrolled;
  const bgColor = isTransparent ? 'transparent' : '#ffffff';
  const borderColor = isTransparent ? 'transparent' : '#e0e0e0';
  const textColor = isTransparent ? '#ffffff' : '#000000';
  const logoSubColor = '#c9a84c';

  const navLinks = [
    { to: '/shop', label: 'SHOP' },
    { to: '/about', label: 'ABOUT' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: bgColor,
        borderBottom: `1px solid ${borderColor}`,
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '72px',
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '1.4rem', color: textColor,
              letterSpacing: '0.2em', display: 'block',
              transition: 'color 0.3s',
            }}>INSPIRED</span>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '8px', color: logoSubColor,
              letterSpacing: '0.4em', display: 'block',
              marginTop: '-2px',
            }}>BY GOD</span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px', letterSpacing: '0.2em',
                color: location.pathname === link.to ? '#c9a84c' : textColor,
                textDecoration: 'none',
                transition: 'color 0.2s',
                borderBottom: location.pathname === link.to ? '1px solid #c9a84c' : 'none',
                paddingBottom: '2px',
              }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button onClick={toggleCart} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px', letterSpacing: '0.2em',
              color: textColor, transition: 'color 0.3s',
            }}>
              CART
              {totalItems > 0 && (
                <span style={{
                  width: '20px', height: '20px',
                  background: '#c9a84c', color: '#000000',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px', fontWeight: 'bold',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{totalItems}</span>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
              className="show-mobile"
            >
              <span style={{ display: 'block', width: '24px', height: '1px', background: textColor, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
              <span style={{ display: 'block', width: '24px', height: '1px', background: textColor, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '24px', height: '1px', background: textColor, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
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
        gap: '2rem', paddingTop: '72px',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: '3rem', color: '#000000',
            textDecoration: 'none', letterSpacing: '0.1em',
          }}>{link.label}</Link>
        ))}
        <button onClick={() => { toggleCart(); setMenuOpen(false); }} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Bebas Neue', cursive",
          fontSize: '3rem', color: '#000000', letterSpacing: '0.1em',
        }}>
          CART {totalItems > 0 && `(${totalItems})`}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
