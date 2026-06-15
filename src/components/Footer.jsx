import { Link } from 'react-router-dom'
import { Pencil, Instagram, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-900 border-t border-chalk/10 overflow-hidden">
      {/* Marquee strip */}
      <div className="bg-neon-yellow py-2 w-full" style={{ overflow: 'hidden', maxWidth: '100vw' }}>
        <div className="flex animate-marquee whitespace-nowrap w-max">
          {Array(12).fill('★ CUSTOM CARICATURES · HAND DRAWN · SHIPS DIGITALLY · ').map((t, i) => (
            <span key={i} className="font-display text-ink-950 tracking-widest px-4" style={{ fontSize: 'clamp(14px, 4vw, 25px)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 bg-neon-yellow flex items-center justify-center">
                <Pencil size={16} className="text-ink-950" strokeWidth={2.5} />
              </div>
              <span className="font-display text-2xl text-white tracking-widest">
                KARIC<span className="text-neon-yellow">ART</span>
              </span>
            </Link>
            <p className="text-white leading-relaxed max-w-xs font-body" style={{ fontSize: 'clamp(16px, 4vw, 25px)' }}>
              Hand-drawn caricatures that celebrate what makes each face wonderfully unique.
              Upload, order, receive your art — digitally, fast.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-white hover:text-neon-yellow transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-white hover:text-neon-yellow transition-colors">
                <Twitter size={18} />
              </a>
              <a href="mailto:hello@caricature.inspiredbygod.us"
                className="text-white hover:text-neon-yellow transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="section-label mb-4">Navigate</p>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/order', label: 'Order' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white hover:text-white transition-colors font-body" style={{ fontSize: 'clamp(16px, 4vw, 25px)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="section-label mb-4">Legal</p>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Terms of Service', to: '/terms' },
                { label: 'Refund Policy', to: '/refund-policy' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white hover:text-neon-yellow font-bold transition-colors font-body" style={{ fontSize: 'clamp(16px, 4vw, 25px)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-white font-mono font-bold" style={{ fontSize: 'clamp(14px, 4vw, 25px)' }}>
              © {year} KaricArt.<br />All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
