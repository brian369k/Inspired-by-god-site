import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, products, getPriceBySize } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const currentPrice = selectedSize ? getPriceBySize(product, selectedSize) : product?.price;

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize('');
      setActiveImg(0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '1.5rem' }}>PRODUCT NOT FOUND</p>
        <Link to="/shop" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#c9a84c' }}>← BACK TO SHOP</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    const priceForSize = getPriceBySize(product, selectedSize);
    addItem({ ...product, price: priceForSize }, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    window.open(product.stripeLink, '_blank');
  };

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const getColorHex = (color) => {
    const c = color.toLowerCase();
    if (c.includes('black')) return '#1a1a1a';
    if (c.includes('white')) return '#f5f0e8';
    if (c.includes('sand')) return '#c2b280';
    if (c.includes('azalea')) return '#f4a7b9';
    if (c.includes('cardinal blue')) return '#1a3a6b';
    return '#888888';
  };

  return (
    <div style={{ background: '#ffffff', paddingTop: '0' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem', borderBottom: '1px solid #eeeeee' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '12px', color: '#888888' }}>
          <Link to="/" style={{ color: '#888888', textDecoration: 'none' }}>HOME</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: '#888888', textDecoration: 'none' }}>SHOP</Link>
          <span>/</span>
          <span style={{ color: '#000000', fontWeight: 700 }}>{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

          {/* Images */}
          <div>
            {/* Main image */}
            <div style={{ position: 'relative', background: '#f5f5f5', aspectRatio: '1/1', overflow: 'hidden', marginBottom: '0.75rem' }}>
              <img src={product.images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {product.tag && (
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '10px', letterSpacing: '0.1em', background: '#c9a84c', color: '#000000', padding: '4px 10px' }}>{product.tag}</span>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{
                  width: '70px', height: '70px', padding: 0,
                  border: `2px solid ${activeImg === i ? '#000000' : '#dddddd'}`,
                  cursor: 'pointer', background: 'none', overflow: 'hidden',
                }}>
                  <img src={img} alt={`${product.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '0.15em', color: '#888888', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{product.category}</p>
            <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 4vw, 32px)', color: '#000000', marginBottom: '0.75rem', lineHeight: 1.2 }}>{product.name}</h1>

            {/* Price */}
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '1.75rem', color: '#000000' }}>
                ${currentPrice.toFixed(2)}
              </span>
              {selectedSize && ['2X', '3X'].includes(selectedSize) && (
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '12px', color: '#888888', marginLeft: '0.5rem' }}>Extended size</span>
              )}
            </div>

            {/* Size pricing info */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', padding: '0.75rem', background: '#f5f5f5' }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '12px', color: '#444' }}>S–XL: ${product.price.toFixed(2)}</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '12px', color: '#444' }}>2X: ${product.price2x.toFixed(2)}</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '12px', color: '#444' }}>3X: ${product.price3x.toFixed(2)}</span>
            </div>

            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '14px', color: '#444444', lineHeight: 1.8, marginBottom: '1.5rem' }}>{product.description}</p>

            <div style={{ height: '1px', background: '#eeeeee', marginBottom: '1.5rem' }} />

            {/* Color */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '13px', color: '#000000' }}>COLOR</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '13px', color: '#c9a84c' }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.colors.map((color) => (
                  <button key={color} onClick={() => setSelectedColor(color)} title={color}
                    style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: getColorHex(color),
                      border: selectedColor === color ? '3px solid #000000' : '2px solid #dddddd',
                      cursor: 'pointer', padding: 0,
                      transform: selectedColor === color ? 'scale(1.15)' : 'scale(1)',
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size — DROPDOWN like God Is Dope */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '13px', color: '#000000' }}>SIZE</span>
                {sizeError && <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '12px', color: '#cc0000' }}>Please select a size</span>}
              </div>
              <select
                value={selectedSize}
                onChange={(e) => { setSelectedSize(e.target.value); setSizeError(false); }}
                style={{
                  width: '100%', padding: '1rem 1.25rem',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600, fontSize: '14px',
                  color: '#000000', background: '#ffffff',
                  border: `2px solid ${sizeError ? '#cc0000' : '#000000'}`,
                  borderRadius: 0, cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000000' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                }}
              >
                <option value="">Select a size</option>
                {product.sizes.map((size) => {
                  const price = getPriceBySize(product, size);
                  const isUpcharge = ['2X', '3X'].includes(size);
                  return (
                    <option key={size} value={size}>
                      {size}{isUpcharge ? ` — $${price.toFixed(2)}` : ''}
                    </option>
                  );
                })}
              </select>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '12px', color: '#888888', marginTop: '0.5rem' }}>
                2X and 3X sizes have a small upcharge
              </p>
            </div>

            {/* Buttons — full width like reference sites */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={handleBuyNow} style={{
                width: '100%', padding: '1.1rem',
                background: added ? '#2d6a2d' : '#000000',
                color: '#ffffff', border: 'none', cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800, fontSize: '13px',
                letterSpacing: '0.15em', transition: 'background 0.2s',
              }}>
                {selectedSize ? `BUY NOW — $${currentPrice.toFixed(2)}` : 'SELECT SIZE TO BUY'}
              </button>

              <button onClick={handleAddToCart} style={{
                width: '100%', padding: '1.1rem',
                background: added ? '#f0f9f0' : '#ffffff',
                color: added ? '#2d6a2d' : '#000000',
                border: `2px solid ${added ? '#2d6a2d' : '#000000'}`,
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800, fontSize: '13px',
                letterSpacing: '0.15em', transition: 'all 0.2s',
              }}>
                {added ? '✓ ADDED TO BAG' : 'ADD TO BAG'}
              </button>
            </div>

            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '12px', color: '#888888', textAlign: 'center', marginTop: '1rem' }}>
              🔒 Secure checkout · Free shipping over $150
            </p>

            {/* Details accordion */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid #eeeeee' }}>
              {[
                { title: 'PRODUCT DETAILS', content: product.details },
                { title: 'SHIPPING & RETURNS', content: ['Free shipping on orders over $150', 'Standard 5–7 business days', '30-day returns on unworn items', 'Photo evidence required for returns'] },
                { title: 'SIZE GUIDE', content: ['S: Chest 34"', 'M: Chest 36"', 'L: Chest 38"', 'XL: Chest 40"', '2X: Chest 44" (+$1.50)', '3X: Chest 48" (+$2.50)'] },
              ].map((section) => <Accordion key={section.title} title={section.title} items={section.content} />)}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #eeeeee' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#000000', marginBottom: '1.5rem' }}>YOU MAY ALSO LIKE</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Accordion({ title, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #eeeeee' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 0', background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '12px',
        letterSpacing: '0.15em', color: '#000000',
      }}>
        {title}
        <span style={{ fontSize: '1.25rem', fontWeight: 300, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
      </button>
      <div style={{ maxHeight: open ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <ul style={{ listStyle: 'none', padding: '0 0 1rem', margin: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '14px', color: '#444444', padding: '0.3rem 0', display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#c9a84c' }}>—</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
