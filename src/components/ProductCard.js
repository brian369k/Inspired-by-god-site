import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const getColorHex = (color) => {
  const c = color.toLowerCase();
  if (c.includes('black')) return '#1a1a1a';
  if (c.includes('white')) return '#f5f0e8';
  if (c.includes('sand')) return '#c2b280';
  if (c.includes('azalea')) return '#f4a7b9';
  if (c.includes('cardinal blue')) return '#1a3a6b';
  if (c.includes('grey') || c.includes('gray') || c.includes('stone')) return '#888';
  if (c.includes('olive') || c.includes('military')) return '#556b2f';
  if (c.includes('navy')) return '#1a2744';
  return '#888888';
};

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ display: 'block', textDecoration: 'none' }}
      onMouseEnter={() => { setHovered(true); if (product.images.length > 1) setImgIdx(1); }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
    >
      <div style={{
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : 'none',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#f5f5f5' }}>
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s ease',
            }}
          />

          {/* Tag */}
          {product.tag && (
            <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px', letterSpacing: '0.15em',
                background: '#c9a84c', color: '#000000',
                padding: '4px 10px',
              }}>{product.tag}</span>
            </div>
          )}

          {/* Quick view */}
          <div style={{
            position: 'absolute', bottom: '12px', left: '12px', right: '12px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.3s ease',
          }}>
            <span style={{
              display: 'block', textAlign: 'center',
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', letterSpacing: '0.15em',
              color: '#ffffff', background: 'rgba(0,0,0,0.7)',
              padding: '8px',
            }}>VIEW PRODUCT</span>
          </div>
        </div>

        {/* Info */}
        <div style={{ paddingTop: '12px', paddingBottom: '8px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
            <div>
              <h3 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '1.1rem', letterSpacing: '0.1em',
                color: '#000000',
              }}>{product.name}</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px', color: '#888888',
                textTransform: 'capitalize', marginTop: '2px',
              }}>{product.category}</p>
            </div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '13px', color: '#c9a84c', flexShrink: 0,
            }}>${product.price}</span>
          </div>

          {/* Color dots */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
            {product.colors.map((color) => (
              <div key={color}
                style={{
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: getColorHex(color),
                  border: '1px solid #dddddd',
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
