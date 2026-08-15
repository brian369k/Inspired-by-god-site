import React from 'react';
import { Link } from 'react-router-dom';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 320 512" fill="currentColor" {...props}>
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 448 512" fill="currentColor" {...props}>
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.3 0-74.7-33.4-74.7-74.7s33.4-74.7 74.7-74.7 74.7 33.4 74.7 74.7-33.4 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
  </svg>
);

const TikTokIcon = (props) => (
  <svg viewBox="0 0 448 512" fill="currentColor" {...props}>
    <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.2v178.7A133.4 133.4 0 1 1 191.8 216V294a55.2 55.2 0 1 0 38.6 52.7V0h76.8a133.3 133.3 0 0 0 140.8 133.3z"/>
  </svg>
);

const PinterestIcon = (props) => (
  <svg viewBox="0 0 384 512" fill="currentColor" {...props}>
    <path d="M204 6.7C93.1 6.7 0 99.8 0 210.7c0 70.8 36.8 133 92.4 168.5-1.3-12.7-2.5-32.1.5-45.9 2.7-11.9 17.4-73.8 17.4-73.8s-4.4-8.8-4.4-21.8c0-20.4 11.8-35.6 26.5-35.6 12.5 0 18.5 9.4 18.5 20.6 0 12.5-8 31.2-12.1 48.6-3.5 14.7 7.4 26.7 22 26.7 26.4 0 44.1-33.9 44.1-74.1 0-30.6-20.6-53.5-58.2-53.5-42.4 0-68.8 31.6-68.8 66.9 0 12.2 3.6 20.8 9.2 27.5 2.6 3.1 3 4.3 2 7.8-.7 2.6-2.2 8.8-2.9 11.3-.9 3.5-3.8 4.8-7 3.5-19.5-8-28.6-29.5-28.6-53.4 0-39.8 33.5-87.5 99.8-87.5 53.3 0 88.4 38.6 88.4 80.1 0 54.9-30.5 95.8-75.5 95.8-15.1 0-29.2-8.1-34-17.2l-9.3 35.7c-3.4 13.1-10.1 29.4-15.2 39.4 13.6 4.2 28.1 6.5 43.1 6.5 110.9 0 204-93.1 204-204S314.9 6.7 204 6.7z"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
    { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://tiktok.com', label: 'TikTok' },
    { icon: PinterestIcon, href: 'https://pinterest.com', label: 'Pinterest' },
  ];

  return (
    <footer style={{ background: '#f5f5f5', borderTop: '1px solid #e0e0e0', overflow: 'hidden' }}>

      {/* Marquee */}
      <div style={{ background: '#c9a84c', padding: '0.8rem 0', overflow: 'hidden' }}>
        <div className="marquee-content footer-marquee" style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          letterSpacing: '0.2em', color: '#000000', whiteSpace: 'nowrap',
        }}>
          {Array(10).fill('INSPIRED BY GOD · LUXURY STREETWEAR · ELEVATED ESSENTIALS · CHOSEN · ').join('')}
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 2.5rem' }}>

        {/* 3 columns (stacks to 1 on mobile) */}
        <div className="footer-cols" style={{
          alignItems: 'start',
          justifyItems: 'center',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>

          {/* Column 1 — Brand */}
          <div style={{ width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
              <span style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '1.8rem', color: '#000000',
                letterSpacing: '0.2em', display: 'block', lineHeight: 1,
              }}>INSPIRED</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800, fontSize: '9px',
                color: '#c9a84c', letterSpacing: '0.4em',
              }}>BY GOD</span>
            </Link>
            <p className="footer-body" style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              color: '#333333', lineHeight: 1.7, margin: 0,
            }}>
              Luxury streetwear for the chosen. Elevated essentials worn by those who move with purpose.
            </p>
          </div>

          {/* Column 2 — Shop */}
          <div style={{ width: '100%' }}>
            <p className="footer-heading" style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              letterSpacing: '0.2em', color: '#000000', marginBottom: '1.25rem',
            }}>SHOP</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: 'Shop All', to: '/shop' },
                { label: 'About', to: '/about' },
                { label: 'FAQ', to: '/faq' },
                { label: 'Contact', to: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="footer-link" style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800,
                    color: '#333333', textDecoration: 'none',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                    onMouseLeave={e => e.currentTarget.style.color = '#333333'}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div style={{ width: '100%' }}>
            <p className="footer-heading" style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              letterSpacing: '0.2em', color: '#000000', marginBottom: '1.25rem',
            }}>LEGAL</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Return Policy', to: '/return-policy' },
                { label: 'Terms & Conditions', to: '/terms' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="footer-link" style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800,
                    color: '#333333', textDecoration: 'none',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                    onMouseLeave={e => e.currentTarget.style.color = '#333333'}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Full width bottom row — icons + copyright */}
        <div style={{
          borderTop: '1px solid #e0e0e0',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
        }}>
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label}
              style={{ color: '#000000', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.color = '#000000'}
            >
              <Icon style={{ width: '25px', height: '25px' }} />
            </a>
          ))}
          <span className="footer-copyright" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            color: '#000000',
            textAlign: 'center',
          }}>© {year} INSPIRED BY GOD. ALL RIGHTS RESERVED.</span>
        </div>

      </div>
    </footer>
  );
}
