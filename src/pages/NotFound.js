import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      background: '#000000', minHeight: '70vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '4rem 1.5rem',
    }}>
      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '25px',
        color: '#c9a84c', letterSpacing: '0.15em', marginBottom: '12px',
      }}>— 404</p>

      <h1 style={{
        fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(48px, 8vw, 90px)',
        color: '#ffffff', letterSpacing: '0.03em', lineHeight: 1, marginBottom: '20px',
      }}>PAGE NOT FOUND</h1>

      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '25px',
        color: 'rgba(255,255,255,0.8)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '2.5rem',
      }}>
        This page doesn't exist. Let's get you back on the path.
      </p>

      <Link to="/" style={{
        background: '#c9a84c', color: '#000000',
        fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '25px',
        letterSpacing: '0.2em', padding: '1.1rem 2.5rem', textDecoration: 'none',
      }}>BACK TO HOME →</Link>
    </div>
  );
}
