import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const getColorHex = (color) => {
  const c = color.toLowerCase();
  if (c.includes('black')) return '#252525';
  if (c.includes('white')) return '#FFFFFF';
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
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#f0f0f0' }}>
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
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

        {/* Info — fixed height container */}
        <div style={{ padding: '16px 4px 12px', background: '#ffffff', height: '220px', display: 'flex', flexDirection: 'column' }}>
          {/* Name — forced 2 lines height */}
          <h3 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: '28px',
            color: '#000000', margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            lineHeight: 1.2,
            height: '67px',
            overflow: 'hidden',
          }}>{product.name}</h3>

          {/* Category */}
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: '22px',
            color: '#000000', margin: '6px 0 0',
            textTransform: 'capitalize',
            height: '30px',
          }}>{product.category}</p>

          {/* Spacer to push price down */}
          <div style={{ flex: 1 }} />

          {/* Price */}
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: '28px',
            color: '#000000',
          }}>${product.price}</span>

          {/* Gold bar behind color dots */}
          <div style={{
            background: '#c9a84c',
            padding: '8px 6px',
            margin: '8px -4px 0',
            borderRadius: '2px',
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {product.colors.map((color) => (
                <div key={color}
                  style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: getColorHex(color),
                    border: '2px solid #ffffff',
                    boxShadow: color.toLowerCase().includes('white') ? 'inset 0 0 0 1px #cccccc' : 'none',
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}