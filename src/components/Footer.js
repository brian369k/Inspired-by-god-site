import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-marquee {
          background: #c9a84c;
          color: #000;
          font-size: 30px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 10px 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .footer-marquee span {
          display: inline-block;
          animation: footerScroll 15s linear infinite;
        }
        @keyframes footerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .site-footer {
          background: #f8f8f8;
          padding: 30px 30px 40px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .footer-col.brand {
          text-align: left;
          padding-left: 5px;
        }
        .footer-col.brand h2 {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 4px;
          color: #000;
        }
        .footer-col.brand .tagline {
          font-size: 30px;
          letter-spacing: 2px;
          color: #000;
          text-transform: uppercase;
          margin-bottom: 12px;
          font-weight: 700;
        }
        .footer-col.brand p {
          font-size: 30px;
          color: #000;
          line-height: 1.6;
          font-weight: 700;
        }

        .footer-col.shop {
          text-align: center;
        }

        .footer-col.legal {
          text-align: right;
          padding-right: 5px;
        }

        .footer-col h3 {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 14px;
          color: #000;
        }
        .footer-col a {
          display: block;
          font-size: 30px;
          color: #000;
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s;
          font-weight: 700;
        }
        .footer-col a:hover { color: #c9a84c; }

        .footer-bottom {
          border-top: 1px solid #e0e0e0;
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .footer-socials {
          display: flex;
          gap: 16px;
        }
        .footer-socials a {
          color: #000;
          text-decoration: none;
          font-weight: 700;
        }
        .footer-socials a svg {
          width: 30px;
          height: 30px;
          fill: currentColor;
        }
        .footer-copyright {
          font-size: 30px;
          color: #000;
          text-align: center;
          letter-spacing: 0.5px;
          font-weight: 700;
        }

        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .site-footer { padding-bottom: calc(40px + env(safe-area-inset-bottom)); }
        }
      `}</style>

      <div className="footer-marquee">
        <span>INSPIRED BY GOD • LUXURY STREETWEAR • ELEVATED ESSENTIALS • INSPIRED BY GOD • LUXURY STREETWEAR • ELEVATED ESSENTIALS • </span>
      </div>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-col brand">
            <h2>INSPIRED</h2>
            <div className="tagline">by God</div>
            <p>Luxury streetwear<br/>for the chosen.<br/>Elevated essentials<br/>worn by those<br/>who move with<br/>purpose.</p>
          </div>
          <div className="footer-col shop">
            <h3>Shop</h3>
            <Link to="/shop">Shop All</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col legal">
            <h3>Legal</h3>
            <Link to="/privacy">Privacy</Link>
            <Link to="/returns">Returns</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            </a>
          </div>
          <div className="footer-copyright">© 2026 INSPIRED BY GOD. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;