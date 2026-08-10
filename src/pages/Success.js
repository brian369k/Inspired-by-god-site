import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      background: '#000000', minHeight: '70vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '4rem 1.5rem',
    }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        border: '1px solid #c9a84c',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '2rem',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <polyline points="20 6 9 17 4 12" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '25px',
        color: '#c9a84c', letterSpacing: '0.15em', marginBottom: '12px',
      }}>— ORDER CONFIRMED</p>

      <h1 style={{
        fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 8vw, 90px)',
        color: '#ffffff', letterSpacing: '0.03em', lineHeight: 1, marginBottom: '20px',
      }}>YOU'VE BEEN CHOSEN</h1>

      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '25px',
        color: 'rgba(255,255,255,0.8)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '2.5rem',
      }}>
        Thank you for your order. A confirmation email is on its way. We'll notify you as soon as your pieces ship.
      </p>

      <Link to="/shop" style={{
        background: '#c9a84c', color: '#000000',
        fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '25px',
        letterSpacing: '0.2em', padding: '1.1rem 2.5rem', textDecoration: 'none',
      }}>CONTINUE SHOPPING →</Link>
    </div>
  );
}
