import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

          {/* Color dots */}
          <div className="flex gap-1.5 mt-3">
            {product.colors.map((color) => (
              <div
                key={color}
                className="w-3 h-3 rounded-full border border-grey-mid"
                style={{
                  background: color.toLowerCase().includes('black') || color.toLowerCase().includes('onyx') || color.toLowerCase().includes('jet')
                    ? '#1a1a1a'
                    : color.toLowerCase().includes('white') || color.toLowerCase().includes('ivory') || color.toLowerCase().includes('bone')
                    ? '#f5f0e8'
                    : color.toLowerCase().includes('grey') || color.toLowerCase().includes('stone') || color.toLowerCase().includes('heather')
                    ? '#888'
                    : color.toLowerCase().includes('olive') || color.toLowerCase().includes('military')
                    ? '#556b2f'
                    : color.toLowerCase().includes('navy')
                    ? '#1a2744'
                    : '#c9a84c',
                }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
