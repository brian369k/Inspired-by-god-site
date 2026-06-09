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

  const currentPrice = selectedSize
    ? getPriceBySize(product, selectedSize)
    : product?.price;

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize('');
      setActiveImg(0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20">
        <p className="font-display text-4xl text-grey-light">PIECE NOT FOUND</p>
        <Link to="/shop" className="font-mono text-xs text-gold border border-gold/30 px-6 py-3 hover:border-gold">
          BACK TO SHOP
        </Link>
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

  // Direct Stripe checkout — opens payment link in new tab
  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return; }
    if (!selectedColor) return;
    setSizeError(false);
    // Open Stripe payment link directly
    window.open(product.stripeLink, '_blank');
  };

  const related = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="bg-black pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
        <nav className="flex items-center gap-2 font-mono text-xs text-grey-light">
          <Link to="/" className="hover:text-ivory transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-ivory transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-gold">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-20 overflow-hidden border transition-all ${
                    activeImg === i ? 'border-gold' : 'border-grey-dark hover:border-gold/40'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 aspect-[3/4] bg-grey-dark overflow-hidden relative">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.tag && (
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[10px] tracking-widest px-3 py-1 bg-gold text-black">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-mono text-xs text-gold tracking-widest capitalize mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-ivory tracking-widest leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mt-3">
                <p className="font-mono text-2xl text-gold">
                  ${currentPrice.toFixed(2)}
                </p>
                {selectedSize && ['2X', '3X'].includes(selectedSize) && (
                  <span className="font-mono text-xs text-gold/60 tracking-widest">
                    EXTENDED SIZE
                  </span>
                )}
              </div>
              <div className="mt-2 flex gap-4">
                <span className="font-mono text-[10px] text-grey-light">S–XL: ${product.price.toFixed(2)}</span>
                <span className="font-mono text-[10px] text-grey-light">2X: ${product.price2x.toFixed(2)}</span>
                <span className="font-mono text-[10px] text-grey-light">3X: ${product.price3x.toFixed(2)}</span>
              </div>
            </div>

            <div className="gold-line" />

            <p className="font-body text-sm text-grey-light leading-relaxed">
              {product.description}
            </p>

            {/* Color selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs tracking-widest text-ivory">COLOR</span>
                <span className="font-mono text-xs text-gold">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => {
                  const bg =
                    color.toLowerCase() === 'black' ? '#1a1a1a' :
                    color.toLowerCase() === 'white' ? '#f5f0e8' :
                    color.toLowerCase() === 'sand' ? '#c2b280' :
                    color.toLowerCase() === 'azalea' ? '#f4a7b9' :
                    color.toLowerCase() === 'cardinal blue' ? '#1a3a6b' :
                    '#c9a84c';
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? 'border-gold scale-110'
                          : 'border-grey-dark hover:border-gold/50'
                      }`}
                      style={{ background: bg }}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs tracking-widest text-ivory">SIZE</span>
                {sizeError && (
                  <span className="font-mono text-xs text-red-400">Please select a size</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isUpcharge = ['2X', '3X'].includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`relative min-w-[52px] h-12 px-3 font-mono text-xs tracking-widest border transition-all ${
                        selectedSize === size
                          ? 'bg-gold text-black border-gold'
                          : 'text-grey-light border-grey-dark hover:border-gold/60 hover:text-ivory'
                      }`}
                    >
                      {size}
                      {isUpcharge && (
                        <span className={`absolute -top-2 -right-1 text-[8px] font-mono px-1 rounded ${
                          selectedSize === size ? 'bg-black text-gold' : 'bg-grey-dark text-gold'
                        }`}>
                          +
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="font-mono text-[10px] text-grey-light mt-2">
                + indicates extended size upcharge
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Buy Now — goes straight to Stripe */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-gold text-black font-mono text-xs tracking-widest py-4 hover:bg-gold-light transition-colors duration-200 animate-pulse-gold"
              >
                {selectedSize
                  ? `BUY NOW — $${currentPrice.toFixed(2)}`
                  : 'SELECT A SIZE TO BUY'}
              </button>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`w-full font-mono text-xs tracking-widest py-4 border transition-all duration-200 ${
                  added
                    ? 'bg-green-900/50 text-green-400 border-green-700'
                    : 'border-gold/30 text-ivory hover:border-gold hover:bg-gold/5'
                }`}
              >
                {added ? '✓ ADDED TO BAG' : 'ADD TO BAG'}
              </button>
            </div>

            {/* Note about Stripe */}
            <p className="font-mono text-[10px] text-grey-light">
              🔒 Secure checkout powered by Stripe. Size & color confirmed at checkout.
            </p>

            {/* Accordions */}
            <div className="space-y-0 pt-4 border-t border-gold/10">
              <ProductAccordion title="DETAILS">
                <ul className="space-y-1.5">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm text-grey-light">
                      <span className="text-gold mt-1">—</span> {d}
                    </li>
                  ))}
                </ul>
              </ProductAccordion>
              <ProductAccordion title="SHIPPING & RETURNS">
                <div className="space-y-2 font-body text-sm text-grey-light">
                  <p>Free standard shipping on orders over $150.</p>
                  <p>Express shipping available at checkout.</p>
                  <p>30-day returns on unworn, tagged items.</p>
                  <p>Final sale items cannot be returned.</p>
                </div>
              </ProductAccordion>
              <ProductAccordion title="SIZE GUIDE">
                <div className="overflow-x-auto">
                  <table className="w-full font-mono text-xs text-grey-light border-collapse">
                    <thead>
                      <tr>
                        {['SIZE', 'CHEST', 'WAIST', 'HIP', 'PRICE'].map(h => (
                          <th key={h} className="text-left py-2 pr-6 text-gold border-b border-grey-dark">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['S',  '34"', '28"', '36"', `$${product.price.toFixed(2)}`],
                        ['M',  '36"', '30"', '38"', `$${product.price.toFixed(2)}`],
                        ['L',  '38"', '32"', '40"', `$${product.price.toFixed(2)}`],
                        ['XL', '40"', '34"', '42"', `$${product.price.toFixed(2)}`],
                        ['2X', '44"', '38"', '46"', `$${product.price2x.toFixed(2)}`],
                        ['3X', '48"', '42"', '50"', `$${product.price3x.toFixed(2)}`],
                      ].map(row => (
                        <tr key={row[0]}>
                          {row.map((cell, i) => (
                            <td key={i} className={`py-2 pr-6 border-b border-grey-dark/50 ${i === 4 ? 'text-gold' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ProductAccordion>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gold/10">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-mono text-xs tracking-widest text-gold mb-2">— YOU MAY ALSO LIKE</p>
                <h2 className="font-display text-4xl md:text-5xl text-ivory tracking-wide">RELATED PIECES</h2>
              </div>
              <Link to="/shop" className="font-mono text-xs text-grey-light hover:text-gold transition-colors border-b border-grey-dark pb-0.5">
                VIEW ALL →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductAccordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gold/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 font-mono text-xs tracking-widest text-ivory hover:text-gold transition-colors"
      >
        {title}
        <span className="text-gold transition-transform duration-200" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '400px' : '0' }}>
        <div className="pb-5">{children}</div>
      </div>
    </div>
  );
}
