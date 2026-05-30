import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Arial Black', Arial, sans-serif" }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>👕</div>
        <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: 4, marginBottom: 8 }}>CUSTOM MERCH</h1>
        <p style={{ color: '#555', fontSize: 13, letterSpacing: 2, marginBottom: 40 }}>DESIGN YOUR OWN · GET A QUOTE</p>
        <button
          onClick={() => navigate('/shop')}
          style={{ background: '#f5c518', color: '#000', border: 'none', padding: '18px 44px', fontSize: 16, fontWeight: 900, borderRadius: 12, cursor: 'pointer', letterSpacing: 2 }}
        >
          START DESIGNING →
        </button>
      </div>
    </div>
  )
}