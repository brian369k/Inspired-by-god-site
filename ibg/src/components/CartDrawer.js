import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart();

  const handleStripeCheckout = async () => {
    // Replace with your actual Stripe integration
    alert('Stripe checkout integration: Replace this with your Stripe publishable key and price IDs from your products.js data file. See README for setup instructions.');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-deep border-l border-gold/10 flex flex-col cart-drawer ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gold/10">
          <div>
            <h2 className="font-display text-2xl tracking-widest text-ivory">YOUR BAG</h2>
            <p className="font-mono text-xs text-grey-light mt-0.5">{totalItems} ITEM{totalItems !== 1 ? 'S' : ''}</p>
          </div>
          <button
            onClick={closeCart}
            className="w-10 h-10 flex items-center justify-center border border-gold/20 hover:border-gold/60 transition-colors"
            aria-label="Close cart"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="#f5f0e8" strokeWidth="1.5" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="#f5f0e8" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <div className="w-16 h-16 border border-gold/20 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <div>
                <p className="font-heading text-xl text-ivory">Your bag is empty</p>
                <p className="font-body text-sm text-grey-light mt-1">Add something sacred.</p>
              </div>
              <button
                onClick={closeCart}
                className="font-mono text-xs tracking-widest text-gold border border-gold/30 px-6 py-3 hover:border-gold hover:bg-gold/5 transition-all"
              >
                <Link to="/shop">SHOP NOW</Link>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartKey} className="flex gap-4 pb-6 border-b border-grey-dark">
                <div className="w-20 h-24 bg-grey-dark flex-shrink-0 overflow-hidden">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-display text-base tracking-widest text-ivory">{item.name}</h3>
                      <p className="font-mono text-xs text-grey-light mt-0.5">{item.size} · {item.color}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartKey)}
                      className="text-grey-light hover:text-ivory transition-colors flex-shrink-0 mt-0.5"
                      aria-label="Remove item"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-grey-dark">
                      <button
                        onClick={() => updateQty(item.cartKey, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-grey-light hover:text-ivory transition-colors font-mono"
                      >−</button>
                      <span className="w-8 text-center font-mono text-xs text-ivory">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.cartKey, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-grey-light hover:text-ivory transition-colors font-mono"
                      >+</button>
                    </div>
                    <span className="font-mono text-sm text-gold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-gold/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-grey-light tracking-widest">SUBTOTAL</span>
              <span className="font-mono text-lg text-ivory">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="font-body text-xs text-grey-light">Shipping and taxes calculated at checkout.</p>
            <button
              onClick={handleStripeCheckout}
              className="w-full bg-gold text-black font-mono text-xs tracking-widest py-4 hover:bg-gold-light transition-colors duration-200 animate-pulse-gold"
            >
              PROCEED TO CHECKOUT
            </button>
            <button
              onClick={closeCart}
              className="w-full border border-gold/20 text-ivory font-mono text-xs tracking-widest py-3 hover:border-gold/60 transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </>
  );
}
