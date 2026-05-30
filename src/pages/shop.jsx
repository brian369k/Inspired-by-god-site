import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import printProducts from '../data/printProducts'

const S = {
  page:  { minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: "'Arial Black', Arial, sans-serif" },
  header:{ height: 64, borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', padding: '0 36px', gap: 16 },
  body:  { maxWidth: 1100, margin: '0 auto', padding: '44px 36px' },
  label: { fontSize: 11, letterSpacing: 3, color: '#555', fontWeight: 700, marginBottom: 20, textTransform: 'uppercase' },
  grid:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 },
  pgrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 16 },
}

function Back({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: 1, padding: 0 }}>
      ← BACK
    </button>
  )
}

function Crumb({ items }) {
  return (
    <div style={{ display: 'flex', gap: 6, fontSize: 11, letterSpacing: 1, color: '#555', flexWrap: 'wrap' }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span>›</span>}
          <span style={{ color: i === items.length - 1 ? '#f5c518' : '#555', fontWeight: i === items.length - 1 ? 900 : 400 }}>
            {item.toUpperCase()}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

function CategoryTile({ emoji, title, count, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#111' : '#0d0d0d',
        border: `2px solid ${hov ? '#f5c518' : '#1e1e1e'}`,
        borderRadius: 14, padding: '30px 22px', cursor: 'pointer',
        textAlign: 'left', transition: 'all 0.18s',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ fontSize: 34, marginBottom: 10 }}>{emoji}</div>
      <div style={{ color: '#fff', fontWeight: 900, fontSize: 17, letterSpacing: 0.5, marginBottom: 4 }}>{title}</div>
      <div style={{ color: '#555', fontSize: 11, marginBottom: 14 }}>{count} styles</div>
      <div style={{ color: '#f5c518', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>EXPLORE →</div>
    </button>
  )
}

function SubTile({ emoji, title, subtitle, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#111' : '#0d0d0d',
        border: `2px solid ${hov ? '#f5c518' : '#1e1e1e'}`,
        borderRadius: 14, padding: '28px 22px', cursor: 'pointer',
        textAlign: 'left', transition: 'all 0.18s',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ fontSize: 30, marginBottom: 10 }}>{emoji}</div>
      <div style={{ color: '#fff', fontWeight: 900, fontSize: 16, marginBottom: 4 }}>{title}</div>
      <div style={{ color: '#555', fontSize: 11, marginBottom: 14 }}>{subtitle}</div>
      <div style={{ color: '#f5c518', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>SELECT →</div>
    </button>
  )
}

function ProductCard({ product, onCustomize }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#0d0d0d',
        border: `2px solid ${hov ? '#f5c518' : '#1e1e1e'}`,
        borderRadius: 14, overflow: 'hidden',
        transition: 'all 0.18s', transform: hov ? 'translateY(-2px)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ background: '#e0e0e0', aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 56, opacity: 0.25 }}>
          {product.category === 'tshirts' ? '👕' : product.category === 'hoodies' ? '🧥' : '🧢'}
        </span>
      </div>
      <div style={{ padding: '18px 18px 22px' }}>
        <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 2 }}>{product.name}</div>
        {product.sku && <div style={{ color: '#555', fontSize: 11, marginBottom: 8 }}>{product.sku}</div>}
        <div style={{ color: '#888', fontSize: 11, marginBottom: 12, lineHeight: 1.5 }}>{product.description}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
          {product.colors.slice(0, 12).map((c) => (
            <span key={c.name} title={c.name} style={{
              width: 12, height: 12, borderRadius: '50%',
              background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid #555' : '1px solid transparent',
              display: 'inline-block', flexShrink: 0,
            }} />
          ))}
          {product.colors.length > 12 && (
            <span style={{ color: '#555', fontSize: 10, alignSelf: 'center' }}>+{product.colors.length - 12}</span>
          )}
        </div>
        <button
          onClick={() => onCustomize(product.id)}
          style={{
            width: '100%', padding: '11px', borderRadius: 9,
            background: '#f5c518', color: '#000', border: 'none',
            fontWeight: 900, fontSize: 12, cursor: 'pointer', letterSpacing: 1,
          }}
        >
          CUSTOMIZE →
        </button>
      </div>
    </div>
  )
}

const CATS = {
  tshirts: {
    label: 'T-Shirts', emoji: '👕',
    subs: {
      'short-sleeve': { label: 'Short-Sleeve', emoji: '☀️', subtitle: 'M&O 4800 · 52 colors' },
      'long-sleeve':  { label: 'Long-Sleeve',  emoji: '🌙', subtitle: 'M&O 4820 · 19 colors' },
    },
  },
  hoodies: {
    label: 'Hoodies', emoji: '🧥',
    subs: {
      'pullover': { label: 'Pullover Hoodie', emoji: '🔵', subtitle: 'Classic pullover' },
      'zip-up':   { label: 'Zip-Up Hoodie',  emoji: '🔒', subtitle: 'Full zip front' },
    },
  },
  hats: {
    label: 'Hats', emoji: '🧢',
    subs: {
      'trucker': { label: 'Trucker Hat', emoji: '🚚', subtitle: 'Mesh back · snapback' },
      '5-panel': { label: '5-Panel Hat', emoji: '⭐', subtitle: 'Structured fit' },
    },
  },
}

export default function Shop() {
  const navigate = useNavigate()
  const [cat, setCat] = useState(null)
  const [sub, setSub] = useState(null)

  const crumbs = ['Shop']
  if (cat) crumbs.push(CATS[cat].label)
  if (sub) crumbs.push(CATS[cat].subs[sub].label)

  const products = cat && sub
    ? printProducts.filter(p => p.category === cat && p.subcategory === sub)
    : []

  return (
    <div style={S.page}>
      <div style={S.header}>
        {(cat || sub) && <Back onClick={() => { if (sub) setSub(null); else setCat(null) }} />}
        <Crumb items={crumbs} />
      </div>
      <div style={S.body}>
        {!cat && (
          <>
            <div style={S.label}>What are you making today?</div>
            <div style={S.grid}>
              {Object.entries(CATS).map(([key, meta]) => (
                <CategoryTile key={key} emoji={meta.emoji} title={meta.label} count={Object.keys(meta.subs).length} onClick={() => setCat(key)} />
              ))}
            </div>
          </>
        )}
        {cat && !sub && (
          <>
            <div style={S.label}>{CATS[cat].label}</div>
            <div style={S.grid}>
              {Object.entries(CATS[cat].subs).map(([key, meta]) => (
                <SubTile key={key} emoji={meta.emoji} title={meta.label} subtitle={meta.subtitle} onClick={() => setSub(key)} />
              ))}
            </div>
          </>
        )}
        {cat && sub && (
          <>
            <div style={S.label}>{CATS[cat].subs[sub].label}</div>
            {products.length === 0
              ? <div style={{ color: '#333', marginTop: 60, textAlign: 'center' }}>No products found.</div>
              : (
                <div style={S.pgrid}>
                  {products.map(p => (
                    <ProductCard key={p.id} product={p} onCustomize={id => navigate(`/customize/${id}`)} />
                  ))}
                </div>
              )
            }
          </>
        )}
      </div>
    </div>
  )
}