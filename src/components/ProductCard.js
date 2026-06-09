import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const getColorHex = (color) => {
  const c = color.toLowerCase();
  if (c.includes('black')) return '#1a1a1a';
  if (c.includes('white')) return '#f5f0e8';
  if (c.includes('sand')) return '#c2b280';
  if (c.includes('azalea')) return '#f4a7b9';
  if (c.includes('cardinal blue')) return '#1a3a6b';
  if (c.includes('grey') || c.includes('gray') || c.includes('stone') || c.includes('heather')) return '#888';
  if (c.includes('olive') || c.includes('military')) return '#556b2f';
  if (c.includes('navy')) return '#1a2744';
  if (c.includes('red')) return '#c0392b';
  if (c.includes('green')) return '#2ecc71';
  if (c.includes('blue')) return '#2980b9';
  if (c.includes('purple')) return '#8e44ad';
  if (c.includes('orange')) return '#e67e22';
  if (c.includes('yellow')) return '#f1c40f';
  if (c.includes('pink')) return '#ff69b4';
  if (c.includes('brown')) return '#795548';
  if (c.includes('cream') || c.includes('bone') || c.includes('ivory')) return '#f5f0e8';
  return '#888888';
};

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const handleMouseEnter = () => {
    setHovered(true);
    if (product.images.length > 1) setImgIdx(1);
  };
  const handleMouseLeave = () => {
    setHovered(false);
    setImgIdx(0);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="product-card-hover">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-grey-dark aspect-[3/4]">
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0.4 }}
          />

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4">
              <span className="font-mono text-[10px] tracking-widest px-3 py-1 bg-gold text-black">
                {product.tag}
              </span>
            </div>
          )}

          {/* Quick View */}
          <div
            className="absolute bottom-4 left-4 right-4 transition-all duration-300"
            style={{ transform: hovered ? 'translateY(0)' : 'translateY(10px)', opacity: hovered ? 1 : 0 }}
          >
            <span className="font-mono text-xs tracking-widest text-ivory border border-ivory/40 px-4 py-2 block text-center hover:border-gold hover:text-gold transition-colors">
              VIEW PRODUCT
            </span>
          </div>

          {/* Image dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full transition-colors duration-200"
                  style={{ background: i === imgIdx ? '#c9a84c' : 'rgba(245,240,232,0.4)' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg tracking-widest text-ivory group-hover:text-gold transition-colors duration-200">
                {product.name}
              </h3>
              <p className="font-body text-xs text-grey-light mt-0.5 capitalize">{product.category}</p>
            </div>
            <span className="font-mono text-sm text-gold flex-shrink-0">${product.price}</span>
          </div>

          {/* Color dots — correctly mapped */}
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {product.colors.map((color) => (
              <div
                key={color}
                className="w-3.5 h-3.5 rounded-full border border-grey-mid flex-shrink-0"
                style={{ background: getColorHex(color) }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
