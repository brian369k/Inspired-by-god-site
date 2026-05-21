import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { to: '/shop', label: 'SHOP' },
    { to: '/about', label: 'ABOUT' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/95 backdrop-blur-md border-b border-gold/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-display text-xl md:text-2xl text-ivory tracking-widest group-hover:text-gold transition-colors duration-300">
              INSPIRED
            </span>
            <span className="font-mono text-[9px] md:text-[10px] text-gold tracking-ultra-wide -mt-0.5">
              BY GOD
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-mono text-xs tracking-widest transition-colors duration-200 relative group ${
                  location.pathname === link.to ? 'text-gold' : 'text-grey-light hover:text-ivory'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Right: Cart + Hamburger */}
          <div className="flex items-center gap-5">
            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative group flex items-center gap-2"
              aria-label="Open cart"
            >
              <span className="font-mono text-xs tracking-widest text-grey-light group-hover:text-ivory transition-colors">
                CART
              </span>
              {totalItems > 0 && (
                <span className="w-5 h-5 bg-gold text-black font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
            >
              <span className={`block h-px w-6 bg-ivory transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px w-6 bg-ivory transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-6 bg-ivory transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-10 pt-16">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-display text-5xl text-ivory hover:text-gold transition-colors duration-200"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { toggleCart(); setMenuOpen(false); }}
            className="font-display text-5xl text-ivory hover:text-gold transition-colors duration-200"
          >
            CART {totalItems > 0 && `(${totalItems})`}
          </button>
        </div>
        <div className="p-8 text-center">
          <p className="font-mono text-xs text-grey-light tracking-widest">© 2024 INSPIRED BY GOD</p>
        </div>
      </div>
    </>
  );
}
