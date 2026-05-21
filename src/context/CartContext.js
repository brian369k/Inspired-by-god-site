import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size && i.color === action.payload.color
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id && i.size === action.payload.size && i.color === action.payload.color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.cartKey !== action.payload) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartKey === action.payload.cartKey ? { ...i, quantity: action.payload.qty } : i
        ).filter((i) => i.quantity > 0),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

const initState = () => {
  try {
    const saved = localStorage.getItem('ibg_cart');
    return saved ? { items: JSON.parse(saved), isOpen: false } : { items: [], isOpen: false };
  } catch {
    return { items: [], isOpen: false };
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, initState);

  useEffect(() => {
    localStorage.setItem('ibg_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product, size, color) => {
    const cartKey = `${product.id}-${size}-${color}`;
    dispatch({ type: 'ADD_ITEM', payload: { ...product, size, color, cartKey } });
    dispatch({ type: 'OPEN_CART' });
  };

  const removeItem = (cartKey) => dispatch({ type: 'REMOVE_ITEM', payload: cartKey });
  const updateQty = (cartKey, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartKey, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQty, clearCart, toggleCart, closeCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
