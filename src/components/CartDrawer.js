import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart();
  const [loading, setLoading] = useState(false);

  // Reset the button if the shopper comes back from Stripe with the browser's back button.
  useEffect(() => {
    const reset = () => setLoading(false);
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('Checkout error: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      <div
        className={`fixed right-0 top-0 bottom-0 z-50 bg-deep border-l border-gold/10 flex flex-col cart-drawer ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '500px', maxWidth: '100%' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gold/10">
          <div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', letterSpacing: '0.15em' }}>YOUR BAG</h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', marginTop: '2px' }}>
              {totalItems} ITEM{totalItems !== 1 ? 'S' : ''}
            </p>
          </div>
          <button
            onClick={closeCart}
            style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,168,76,0.2)', cursor: 'pointer', background: 'none' }}
            aria-label="Close cart"
          >
            <svg width="30" height="30" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {items.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '24px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff' }}>Your bag is empty</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', marginTop: '4px' }}>Add something sacred.</p>
              </div>
              <Link
                to="/shop"
                onClick={closeCart}
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)', padding: '12px 24px', textDecoration: 'none', display: 'inline-block', letterSpacing: '0.15em' }}
              >
                SHOP NOW
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartKey} style={{ display: 'flex', gap: '16px', paddingBottom: '24px', borderBottom: '1px solid #333333' }}>
                <div style={{ width: '90px', height: '120px', flexShrink: 0, overflow: 'hidden', background: '#333333' }}>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div>
                      <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', letterSpacing: '0.15em' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', marginTop: '2px' }}>
                        {item.size} · {item.color}
                      </p>
                      {['2X', '3X'].includes(item.size) && (
                        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', marginTop: '2px' }}>
                          Extended size pricing
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.cartKey)}
                      style={{ color: '#ffffff', cursor: 'pointer', background: 'none', border: 'none', flexShrink: 0, marginTop: '2px' }}
                      aria-label="Remove item"
                    >
                      <svg width="30" height="30" viewBox="0 0 12 12" fill="none">
                        <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #333333' }}>
                      <button
                        onClick={() => updateQty(item.cartKey, item.quantity - 1)}
                        style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', cursor: 'pointer', background: 'none', border: 'none' }}
                      >−</button>
                      <span style={{ width: '48px', textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.cartKey, item.quantity + 1)}
                        style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', cursor: 'pointer', background: 'none', border: 'none' }}
                      >+</button>
                    </div>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', letterSpacing: '0.15em' }}>SUBTOTAL</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff' }}>${totalPrice.toFixed(2)}</span>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', marginBottom: '16px' }}>
              Shipping and taxes calculated at checkout.
            </p>
            <button
              onClick={handleStripeCheckout}
              disabled={loading}
              style={{ width: '100%', padding: '16px', background: loading ? '#888888' : '#c9a84c', color: '#000000', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', letterSpacing: '0.15em', cursor: loading ? 'not-allowed' : 'pointer', border: 'none', marginBottom: '12px' }}
            >
              {loading ? 'LOADING...' : `CHECKOUT — $${totalPrice.toFixed(2)}`}
            </button>
            <Link
              to="/shop"
              onClick={closeCart}
              style={{ width: '100%', display: 'block', textAlign: 'center', padding: '12px', border: '2px solid #ffffff', color: '#ffffff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', letterSpacing: '0.15em', textDecoration: 'none' }}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        )}
      </div>
    </>
  );
}