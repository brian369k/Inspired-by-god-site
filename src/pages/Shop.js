import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const sortOptions = ['PRICE: LOW', 'PRICE: HIGH', 'NEWEST'];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState('NEWEST');
  const [filtered, setFiltered] = useState(products);
  const [heroRef, heroIn] = useInView();

  useEffect(() => {
    let result = activeCategory === 'all' ? [...products] : products.filter(p => p.category === activeCategory);
    if (sort === 'PRICE: LOW') result.sort((a, b) => a.price - b.price);
    else if (sort === 'PRICE: HIGH') result.sort((a, b) => b.price - a.price);
    else if (sort === 'NEWEST') result.sort((a, b) => b.id - a.id);
    setFiltered(result);
  }, [activeCategory, sort]);

  return (
    <div className="bg-black pt-16 md:pt-20">
      {/* Header */}
      <div
        ref={heroRef}
        className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 border-b border-gold/10"
        style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease' }}
      >
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#c9a84c', letterSpacing: '0.15em', marginBottom: '16px' }}>— ALL PIECES</p>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '30px', color: '#ffffff', letterSpacing: '0.05em', lineHeight: 1 }}>SHOP</h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', marginTop: '16px' }}>{products.length} sacred pieces. All intentional.</p>
      </div>

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-black/95 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: '30px',
                  letterSpacing: '0.15em',
                  padding: '8px 16px',
                  border: activeCategory === cat ? '1px solid #c9a84c' : '1px solid #333333',
                  background: activeCategory === cat ? '#c9a84c' : 'transparent',
                  color: activeCategory === cat ? '#000000' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSort(opt)}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: '30px',
                  letterSpacing: '0.15em',
                  padding: '6px 10px',
                  color: sort === opt ? '#c9a84c' : '#ffffff',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', letterSpacing: '0.15em' }}>NO PIECES FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                style={{ opacity: 1, animation: `fadeUp 0.6s ease ${i * 0.05}s both` }}
              >
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* Count */}
        <div className="mt-16 text-center">
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '30px', color: '#ffffff', letterSpacing: '0.15em' }}>
            SHOWING {filtered.length} OF {products.length} PIECES
          </p>
          <div className="gold-line w-24 mx-auto mt-4" />
        </div>
      </div>
    </div>
  );
}