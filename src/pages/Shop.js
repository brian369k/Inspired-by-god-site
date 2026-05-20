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

const sortOptions = ['FEATURED', 'PRICE: LOW', 'PRICE: HIGH', 'NEWEST'];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState('FEATURED');
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
        <p className="font-mono text-xs tracking-widest text-gold mb-4">— ALL PIECES</p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-ivory tracking-wide leading-none">SHOP</h1>
        <p className="font-heading italic text-lg text-grey-light mt-4">{products.length} sacred pieces. All intentional.</p>
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
                className={`font-mono text-[10px] tracking-widest px-4 py-2 transition-all border ${
                  activeCategory === cat
                    ? 'bg-gold text-black border-gold'
                    : 'text-grey-light border-grey-dark hover:border-gold/40 hover:text-ivory'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest text-grey-light">SORT:</span>
            <div className="flex gap-1">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSort(opt)}
                  className={`font-mono text-[10px] tracking-widest px-3 py-1.5 transition-colors ${
                    sort === opt ? 'text-gold' : 'text-grey-light hover:text-ivory'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-grey-light tracking-widest">NO PIECES FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
          <p className="font-mono text-xs text-grey-light tracking-widest">
            SHOWING {filtered.length} OF {products.length} PIECES
          </p>
          <div className="gold-line w-24 mx-auto mt-4" />
        </div>
      </div>
    </div>
  );
}
