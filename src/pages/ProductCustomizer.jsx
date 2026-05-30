import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import printProducts from '../data/printProducts'

const ZONES = {
  front:     { x: 0.30, y: 0.18, w: 0.40, h: 0.44 },
  back:      { x: 0.30, y: 0.18, w: 0.40, h: 0.44 },
  leftChest: { x: 0.28, y: 0.18, w: 0.18, h: 0.16 },
}

const PLACEMENTS = [
  { key: 'front',     label: 'FRONT' },
  { key: 'back',      label: 'BACK' },
  { key: 'leftChest', label: 'LEFT CHEST' },
]

const WATERMARK = 'PROOF ONLY — NOT FOR PRODUCTION'

function removeWhiteBg(img, tolerance = 40) {
  const off = document.createElement('canvas')
  off.width  = img.naturalWidth  || img.width
  off.height = img.naturalHeight || img.height
  const ctx = off.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const data = ctx.getImageData(0, 0, off.width, off.height)
  const d = data.data
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i+1], b = d[i+2]
    if (r > 255 - tolerance && g > 255 - tolerance && b > 255 - tolerance) {
      d[i+3] = 0
    }
  }
  ctx.putImageData(data, 0, 0)
  return off
}

const S = {
  page:    { minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: "'Arial Black', Arial, sans-serif" },
  header:  { height: 64, borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' },
  sidebar: { width: 300, borderLeft: '1px solid #1a1a1a', overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 28 },
  label:   { fontSize: 10, letterSpacing: 2, color: '#555', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase' },
}

function Btn({ children, active, onClick, danger, disabled, full }) {
  const [hov, setHov] = useState(false)
  const bg = disabled ? '#111' : danger ? (hov ? '#ff2222' : '#1a0000') : active ? '#f5c518' : hov ? '#1c1c1c' : '#111'
  const col = disabled ? '#333' : danger ? (hov ? '#fff' : '#ff4444') : active ? '#000' : '#fff'
  const bord = disabled ? '#1a1a1a' : danger ? '#ff4444' : active ? '#f5c518' : '#2a2a2a'
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: full ? '100%' : undefined,
        padding: '10px 14px', borderRadius: 9, cursor: disabled ? 'not-allowed' : 'pointer',
        background: bg, color: col, border: `1.5px solid ${bord}`,
        fontWeight: 900, fontSize: 11, letterSpacing: 1, transition: 'all 0.15s',
        fontFamily: "'Arial Black', Arial, sans-serif",
      }}
    >
      {children}
    </button>
  )
}

export default function ProductCustomizer() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = printProducts.find(p => p.id === productId)

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null)
  const [activePlacement, setActivePlacement] = useState('front')
  const [designs, setDesigns] = useState({ front: null, back: null, leftChest: null })
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState(null)
  const [showQuote, setShowQuote] = useState(false)
  const [qty, setQty] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const canvasRef   = useRef(null)
  const shirtImgRef = useRef(null)
  const fileRef     = useRef(null)
  const rafRef      = useRef(null)

  useEffect(() => {
    if (!selectedColor || !product) return
    const slug = selectedColor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const src = activePlacement === 'back'
      ? `/mockups/${product.id}/${slug}-back.png`
      : `/mockups/${product.id}/${slug}-front.png`
    const img = new Image()
    img.src = src
    img.onload = () => {
      shirtImgRef.current = img
      const c = canvasRef.current
      if (c) { c.width = img.naturalWidth || 700; c.height = img.naturalHeight || 800 }
    }
    img.onerror = () => {
      shirtImgRef.current = null
      const c = canvasRef.current
      if (c) { c.width = 700; c.height = 840 }
    }
  }, [selectedColor, activePlacement, product])

  const draw = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    const W = c.width, H = c.height
    ctx.clearRect(0, 0, W, H)

    if (shirtImgRef.current) {
      ctx.drawImage(shirtImgRef.current, 0, 0, W, H)
    } else {
      ctx.fillStyle = selectedColor?.hex || '#888'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.font = 'bold 14px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Add mockup images to /public/mockups/', W / 2, H / 2)
    }

    const zone = ZONES[activePlacement]
    ctx.save()
    ctx.strokeStyle = 'rgba(245,197,24,0.2)'
    ctx.lineWidth = 1.5
    ctx.setLineDash([6, 4])
    ctx.strokeRect(zone.x * W, zone.y * H, zone.w * W, zone.h * H)
    ctx.restore()

    const d = designs[activePlacement]
    if (d) {
      ctx.drawImage(d.canvas, d.x, d.y, d.w, d.h)
      ctx.save()
      ctx.strokeStyle = '#f5c518'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 3])
      ctx.strokeRect(d.x, d.y, d.w, d.h)
      ctx.restore()
      ctx.save()
      ctx.fillStyle = '#f5c518'
      ctx.beginPath()
      ctx.arc(d.x + d.w, d.y + d.h, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    ctx.save()
    ctx.globalAlpha = 0.18
    ctx.fillStyle = '#fff'
    ctx.font = `bold ${Math.round(W * 0.032)}px Arial`
    ctx.textAlign = 'center'
    ctx.translate(W / 2, H / 2)
    ctx.rotate(-Math.PI / 8)
    for (let row = -2; row <= 2; row++) {
      ctx.fillText(WATERMARK, 0, row * W * 0.18)
    }
    ctx.restore()
  }, [designs, activePlacement, selectedColor])

  useEffect(() => {
    const loop = () => { draw(); rafRef.current = requestAnimationFrame(loop) }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw])

  const handleUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const img = new Image()
      img.src = ev.target.result
      img.onload = () => {
        const cleaned = removeWhiteBg(img)
        const c = canvasRef.current
        if (!c) return
        const W = c.width, H = c.height
        const zone = ZONES[activePlacement]
        const ratio = cleaned.width / cleaned.height
        let dw = zone.w * W * 0.72
        let dh = dw / ratio
        if (dh > zone.h * H * 0.72) { dh = zone.h * H * 0.72; dw = dh * ratio }
        const dx = zone.x * W + (zone.w * W - dw) / 2
        const dy = zone.y * H + (zone.h * H - dh) / 2
        setDesigns(prev => ({ ...prev, [activePlacement]: { canvas: cleaned, x: dx, y: dy, w: dw, h: dh } }))
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const getPos = (e) => {
    const c = canvasRef.current
    const r = c.getBoundingClientRect()
    const sx = c.width / r.width, sy = c.height / r.height
    const cx = e.touches ? e.touches[0].clientX : e.clientX
    const cy = e.touches ? e.touches[0].clientY : e.clientY
    return { x: (cx - r.left) * sx, y: (cy - r.top) * sy }
  }

  const onHandle = (pos, d) => d && Math.hypot(pos.x - (d.x + d.w), pos.y - (d.y + d.h)) <= 12
  const onDesign = (pos, d) => d && pos.x >= d.x && pos.x <= d.x + d.w && pos.y >= d.y && pos.y <= d.y + d.h

  const handleDown = (e) => {
    const d = designs[activePlacement]
    if (!d) return
    const pos = getPos(e)
    if (onHandle(pos, d)) {
      setResizing(true)
      setResizeStart({ mx: pos.x, my: pos.y, ow: d.w, oh: d.h, ratio: d.w / d.h })
    } else if (onDesign(pos, d)) {
      setDragging(true)
      setDragOffset({ x: pos.x - d.x, y: pos.y - d.y })
    }
  }

  const handleMove = (e) => {
    const d = designs[activePlacement]
    const pos = getPos(e)
    if (dragging && d) {
      setDesigns(prev => ({ ...prev, [activePlacement]: { ...d, x: pos.x - dragOffset.x, y: pos.y - dragOffset.y } }))
    } else if (resizing && d && resizeStart) {
      const dx = pos.x - resizeStart.mx
      const nw = Math.max(20, resizeStart.ow + dx)
      setDesigns(prev => ({ ...prev, [activePlacement]: { ...d, w: nw, h: nw / resizeStart.ratio } }))
    }
    const c = canvasRef.current
    if (c) c.style.cursor = onHandle(pos, d) ? 'nwse-resize' : onDesign(pos, d) ? 'move' : 'default'
  }

  const handleUp = () => { setDragging(false); setResizing(false); setResizeStart(null) }

  const exportClean = () => {
    const c = canvasRef.current
    if (!c) return
    const off = document.createElement('canvas')
    off.width = c.width; off.height = c.height
    const ctx = off.getContext('2d')
    if (shirtImgRef.current) ctx.drawImage(shirtImgRef.current, 0, 0, off.width, off.height)
    else { ctx.fillStyle = selectedColor?.hex || '#888'; ctx.fillRect(0, 0, off.width, off.height) }
    const d = designs[activePlacement]
    if (d) ctx.drawImage(d.canvas, d.x, d.y, d.w, d.h)
    ctx.save()
    ctx.globalAlpha = 0.22
    ctx.fillStyle = '#fff'
    ctx.font = `bold ${Math.round(off.width * 0.032)}px Arial`
    ctx.textAlign = 'center'
    ctx.translate(off.width / 2, off.height / 2)
    ctx.rotate(-Math.PI / 8)
    for (let row = -2; row <= 2; row++) ctx.fillText(WATERMARK, 0, row * off.width * 0.18)
    ctx.restore()
    const link = document.createElement('a')
    link.download = `mockup-${activePlacement}-${selectedColor?.name?.toLowerCase().replace(/\s/g, '-')}.png`
    link.href = off.toDataURL('image/png')
    link.click()
  }

  const hasAnyDesign = Object.values(designs).some(Boolean)

  if (!product || !selectedColor) {
    return (
      <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900 }}>
        PRODUCT NOT FOUND —
        <button onClick={() => navigate('/shop')} style={{ marginLeft: 16, background: '#f5c518', border: 'none', color: '#000', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 900 }}>
          BACK TO SHOP
        </button>
      </div>
    )
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => navigate('/shop')} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>← SHOP</button>
          <span style={{ color: '#2a2a2a' }}>|</span>
          <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: 1 }}>{product.name.toUpperCase()}</span>
          {product.sku && <span style={{ color: '#555', fontSize: 12 }}>{product.sku}</span>}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn onClick={exportClean} disabled={!hasAnyDesign}>⬇ DOWNLOAD PROOF</Btn>
          <Btn active onClick={() => setShowQuote(true)}>REQUEST QUOTE</Btn>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>

        <div style={{ flex: 1, background: '#e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 14, position: 'relative', overflow: 'hidden' }}>

          <div style={{ display: 'flex', gap: 8, position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            {PLACEMENTS.map(p => (
              <button
                key={p.key}
                onClick={() => setActivePlacement(p.key)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 10, fontWeight: 900, letterSpacing: 1, cursor: 'pointer', border: 'none',
                  background: activePlacement === p.key ? '#f5c518' : 'rgba(0,0,0,0.55)',
                  color: activePlacement === p.key ? '#000' : '#fff',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {p.label}{designs[p.key] ? ' ✓' : ''}
              </button>
            ))}
          </div>

          {!designs[activePlacement] && (
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                position: 'absolute', zIndex: 5, cursor: 'pointer',
                background: 'rgba(0,0,0,0.6)', borderRadius: 14,
                padding: '16px 28px', textAlign: 'center',
                border: '2px dashed #f5c518', backdropFilter: 'blur(6px)',
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 6 }}>⬆</div>
              <div style={{ color: '#f5c518', fontWeight: 900, fontSize: 12, letterSpacing: 1 }}>
                UPLOAD {PLACEMENTS.find(p => p.key === activePlacement)?.label} DESIGN
              </div>
              <div style={{ color: '#888', fontSize: 10, marginTop: 3 }}>PNG · JPG · White background auto-removed</div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 160px)', objectFit: 'contain', borderRadius: 6, display: 'block' }}
            onMouseDown={handleDown} onMouseMove={handleMove} onMouseUp={handleUp} onMouseLeave={handleUp}
            onTouchStart={handleDown} onTouchMove={handleMove} onTouchEnd={handleUp}
          />
        </div>

        <div style={S.sidebar}>

          <div>
            <div style={S.label}>Design — {PLACEMENTS.find(p => p.key === activePlacement)?.label}</div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Btn onClick={() => fileRef.current?.click()} full>
                {designs[activePlacement] ? '↺ REPLACE IMAGE' : '+ UPLOAD IMAGE'}
              </Btn>
              {designs[activePlacement] && (
                <Btn danger onClick={() => setDesigns(prev => ({ ...prev, [activePlacement]: null }))} full>
                  ✕ REMOVE ARTWORK
                </Btn>
              )}
            </div>
            {designs[activePlacement] && (
              <p style={{ color: '#444', fontSize: 10, marginTop: 8, lineHeight: 1.6 }}>
                Drag to move · Pull ● handle to resize
              </p>
            )}
          </div>

          <div>
            <div style={S.label}>Placements</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PLACEMENTS.map(p => (
                <button
                  key={p.key}
                  onClick={() => setActivePlacement(p.key)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 12px', borderRadius: 8, cursor: 'pointer', border: 'none',
                    background: activePlacement === p.key ? '#1a1a1a' : '#0d0d0d',
                    borderLeft: activePlacement === p.key ? '3px solid #f5c518' : '3px solid transparent',
                    color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: 1,
                  }}
                >
                  <span>{p.label}</span>
                  <span style={{ color: designs[p.key] ? '#f5c518' : '#333', fontSize: 13 }}>
                    {designs[p.key] ? '✓' : '○'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={S.label}>Color — {selectedColor.name}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {product.colors.map(c => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => setSelectedColor(c)}
                  style={{
                    width: 26, height: 26, borderRadius: '50%', cursor: 'pointer',
                    background: c.hex,
                    border: selectedColor.name === c.name ? '3px solid #f5c518' : c.hex === '#FFFFFF' ? '2px solid #444' : '2px solid transparent',
                    outline: 'none',
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <Btn full onClick={exportClean} disabled={!hasAnyDesign}>
              ⬇ DOWNLOAD PROOF
            </Btn>
            {!hasAnyDesign && <p style={{ color: '#333', fontSize: 10, textAlign: 'center', marginTop: 6 }}>Upload a design first</p>}
          </div>

        </div>
      </div>

      {showQuote && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) setShowQuote(false) }}
        >
          <div style={{ background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: 18, padding: '36px 32px', width: '100%', maxWidth: 420 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>QUOTE REQUEST SENT</div>
                <div style={{ color: '#888', fontSize: 12 }}>We'll be in touch shortly.</div>
                <button onClick={() => { setShowQuote(false); setSent(false) }} style={{ marginTop: 24, background: '#f5c518', border: 'none', color: '#000', padding: '12px 28px', borderRadius: 9, fontWeight: 900, cursor: 'pointer' }}>CLOSE</button>
              </div>
            ) : (
              <>
                <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 4 }}>REQUEST A QUOTE</div>
                <div style={{ color: '#555', fontSize: 11, marginBottom: 28 }}>{product.name} · {selectedColor.name}</div>
                {[
                  { label: 'Quantity',      value: qty,   set: setQty,   type: 'number', placeholder: 'e.g. 24' },
                  { label: 'Your Name',     value: name,  set: setName,  type: 'text',   placeholder: 'Full name' },
                  { label: 'Phone Number',  value: phone, set: setPhone, type: 'tel',    placeholder: '(555) 000-0000' },
                  { label: 'Email Address', value: email, set: setEmail, type: 'email',  placeholder: 'you@email.com' },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: 14 }}>
                    <div style={{ ...S.label, marginBottom: 6 }}>{f.label}</div>
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={e => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 8, fontSize: 13, background: '#161616', border: '1px solid #2a2a2a', color: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => { if (!qty || !name || !email) return; console.log('Quote:', { product: product.id, color: selectedColor.name, qty, name, phone, email }); setSent(true) }}
                  style={{ width: '100%', marginTop: 8, padding: '14px', borderRadius: 10, background: '#f5c518', color: '#000', border: 'none', fontWeight: 900, fontSize: 13, cursor: 'pointer', letterSpacing: 1 }}
                >
                  SEND QUOTE REQUEST
                </button>
                <button onClick={() => setShowQuote(false)} style={{ width: '100%', marginTop: 10, padding: '10px', borderRadius: 10, background: 'none', border: '1px solid #2a2a2a', color: '#555', fontWeight: 700, fontSize: 11, cursor: 'pointer', letterSpacing: 1 }}>
                  CANCEL
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}