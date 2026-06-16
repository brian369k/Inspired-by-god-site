import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const getColorHex = (color) => {
  const c = color.toLowerCase();
  if (c.includes('black')) return '#252525';
  if (c.includes('white')) return 'EFEEF4';
  if (c.includes('sand')) return '#B6A384';
  if (c.includes('azalea')) return '#F284A5';
  if (c.includes('cardinal blue')) return '#779BD5';
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
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 30px rgba(0,0,0,0.1)' : 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', background: '#f0f0f0' }}>
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
          {product.tag && (
            <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800, fontSize: '13px',
                letterSpacing: '0.1em',
                background: '#c9a84c', color: '#000000',
                padding: '5px 12px',
              }}>{product.tag}</span>
            </div>
          )}
          <div style={{
            position: 'absolute', bottom: '10px', left: '10px', right: '10px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'all 0.3s ease',
          }}>
            <span style={{
              display: 'block', textAlign: 'center',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700, fontSize: '15px',
              letterSpacing: '0.1em', color: '#ffffff',
              background: 'rgba(0,0,0,0.8)',
              padding: '12px',
            }}>QUICK VIEW</span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '16px 4px 12px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              {/* Product name — 28px */}
              <h3 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: '28px',
                color: '#000000', margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                lineHeight: 1.2,
              }}>{product.name}</h3>
              {/* Category — 22px */}
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: '22px',
                color: '#888888', margin: '6px 0 0',
                textTransform: 'capitalize',
              }}>{product.category}</p>
            </div>
            {/* Price — 28px */}
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: '28px',
              color: '#000000', flexShrink: 0,
            }}>${product.price}</span>
          </div>

          {/* Color dots — bigger */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            {product.colors.map((color) => (
              <div key={color}
                style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: getColorHex(color),
                  border: '2px solid #dddddd',
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
