import { useState, useEffect, useRef, ReactNode, useCallback, useMemo } from 'react'
import Globe from 'react-globe.gl'
import IMG from './images'

// ─── CINEMATIC PRELOADER ─────────────────────────────────
function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'count' | 'logo' | 'tagline' | 'expand' | 'done'>('count')
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    // Counter 0→100
    let v = 0; const t = setInterval(() => { v += 2; if (v > 100) v = 100; setCounter(v); if (v >= 100) clearInterval(t) }, 30)
    const t1 = setTimeout(() => setPhase('logo'), 1600)
    const t2 = setTimeout(() => setPhase('tagline'), 2200)
    const t3 = setTimeout(() => setPhase('expand'), 3200)
    const t4 = setTimeout(() => { setPhase('done'); onDone() }, 3800)
    return () => { clearInterval(t); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onDone])
  if (phase === 'done') return null
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0c1a30]"
      style={{ opacity: phase === 'expand' ? 0 : 1, transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div className="relative flex flex-col items-center">
        {/* Counter */}
        <div className="absolute -top-20 text-[72px] font-display font-bold text-white/[0.04] tabular-nums tracking-tighter"
          style={{ opacity: phase === 'count' ? 1 : 0, transition: 'opacity 0.4s ease' }}>{counter}</div>
        {/* Logo */}
        <img src={IMG.logoWhite} alt="Airmont" className="h-10 mb-4"
          style={{ opacity: phase === 'count' ? 0 : phase === 'expand' ? 0 : 1, transform: phase === 'count' ? 'translateY(10px)' : 'translateY(0)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        {/* Tagline */}
        <p className="text-[12px] tracking-[0.25em] uppercase text-white/20 mb-6"
          style={{ opacity: phase === 'tagline' ? 1 : 0, transform: phase === 'tagline' ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          Land &middot; Sea &middot; Air
        </p>
        {/* Progress bar */}
        <div className="w-[140px] h-[1.5px] bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${counter}%`, background: 'linear-gradient(90deg, rgba(59,130,246,0.5), rgba(255,255,255,0.4))' }} />
        </div>
      </div>
    </div>
  )
}

// ─── SVG STREAMING FLOW DIAGRAM ─────────────────────────
// Illustrates how Airmont optimizes video over EXISTING satellite infrastructure
function StreamingFlowDiagram({ lang }: { lang: Lang }) {
  return (
    <svg viewBox="0 0 600 155" className="w-full max-w-[700px] mx-auto">
      {/* LEFT: Satellite infrastructure (not owned by Airmont) */}
      <text x="60" y="16" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle" letterSpacing="0.12em">SATELLITE</text>
      <circle cx="60" cy="55" r="18" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
      <circle cx="60" cy="55" r="6" fill="rgba(59,130,246,0.3)" />
      <circle cx="60" cy="55" r="6" fill="rgba(59,130,246,0.15)"><animate attributeName="r" values="6;28;6" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" /></circle>
      <text x="60" y="90" fill="rgba(255,255,255,0.12)" fontSize="6.5" fontFamily="Inter, sans-serif" textAnchor="middle">VSAT · HTS · LEO</text>

      {/* ARROW 1: Raw video stream */}
      <line x1="100" y1="55" x2="210" y2="55" stroke="rgba(239,68,68,0.2)" strokeWidth="1.5" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite" /></line>
      <text x="155" y="45" fill="rgba(239,68,68,0.25)" fontSize="6" fontFamily="Inter, sans-serif" textAnchor="middle">{lang === 'fr' ? 'Flux vidéo brut' : 'Raw video stream'}</text>
      <text x="155" y="70" fill="rgba(239,68,68,0.15)" fontSize="6" fontFamily="Inter, sans-serif" textAnchor="middle">100% BP</text>

      {/* CENTER: Airmont Streamtime box */}
      <rect x="215" y="28" width="170" height="54" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
      <text x="300" y="50" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">STREAMTIME</text>
      <text x="300" y="65" fill="rgba(52,211,153,0.35)" fontSize="6.5" fontFamily="Inter, sans-serif" textAnchor="middle">{lang === 'fr' ? 'Isolation · Compression · Optimisation' : 'Isolation · Compression · Optimization'}</text>
      <rect x="215" y="28" width="170" height="54" rx="12" fill="rgba(59,130,246,0.03)" stroke="none"><animate attributeName="opacity" values="0;0.08;0" dur="2s" repeatCount="indefinite" /></rect>

      {/* ARROW 2: Optimized stream */}
      <line x1="390" y1="55" x2="490" y2="55" stroke="rgba(52,211,153,0.3)" strokeWidth="1.5" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite" /></line>
      <text x="440" y="45" fill="rgba(52,211,153,0.3)" fontSize="6" fontFamily="Inter, sans-serif" textAnchor="middle">{lang === 'fr' ? 'Flux optimisé' : 'Optimized stream'}</text>
      <text x="440" y="70" fill="rgba(52,211,153,0.2)" fontSize="6" fontFamily="Inter, sans-serif" textAnchor="middle">60% BP (-40%)</text>

      {/* RIGHT: Onboard screens */}
      <text x="540" y="16" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle" letterSpacing="0.12em">{lang === 'fr' ? 'ÉCRANS' : 'SCREENS'}</text>
      <rect x="520" y="35" width="40" height="28" rx="4" fill="none" stroke="rgba(52,211,153,0.25)" strokeWidth="1" />
      <rect x="524" y="39" width="32" height="20" rx="2" fill="rgba(52,211,153,0.06)" />
      <line x1="535" y1="67" x2="545" y2="67" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />
      <text x="540" y="90" fill="rgba(255,255,255,0.12)" fontSize="6.5" fontFamily="Inter, sans-serif" textAnchor="middle">{lang === 'fr' ? 'Qualité HD · 0 buffering' : 'HD quality · 0 buffering'}</text>

      {/* BOTTOM: Explanation */}
      <text x="300" y="120" fill="rgba(255,255,255,0.1)" fontSize="7" fontFamily="Inter, sans-serif" textAnchor="middle" letterSpacing="0.08em">{lang === 'fr' ? 'Le trafic vidéo est isolé du reste de l\'internet à bord' : 'Video traffic is isolated from the rest of onboard internet'}</text>
      <line x1="120" y1="132" x2="480" y2="132" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <text x="300" y="148" fill="rgba(255,255,255,0.07)" fontSize="6" fontFamily="Inter, sans-serif" textAnchor="middle">{lang === 'fr' ? 'Navigation · Communications · Services — bande passante préservée' : 'Navigation · Communications · Services — bandwidth preserved'}</text>
    </svg>
  )
}

// ─── MUTUALISATION VISUAL ────────────────────────────────
// Shows the key advantage: 1 satellite stream → shared onboard to multiple screens
function MutualisationViz({ lang }: { lang: Lang }) {
  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-10 overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30">{lang === 'fr' ? 'Technologie Multi-User — La clé' : 'Multi-User Technology — The Key'}</span>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0 justify-center">
        {/* Satellite: 1 single stream */}
        <div className="flex flex-col items-center shrink-0">
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="20" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
            <circle cx="28" cy="28" r="8" fill="rgba(59,130,246,0.25)" />
            <circle cx="28" cy="28" r="8" fill="rgba(59,130,246,0.1)"><animate attributeName="r" values="8;24;8" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.1;0;0.1" dur="3s" repeatCount="indefinite" /></circle>
          </svg>
          <span className="text-[10px] text-white/25 mt-2 font-semibold tracking-wider uppercase">{lang === 'fr' ? '1 flux satellite' : '1 satellite stream'}</span>
        </div>

        {/* Arrow */}
        <div className="hidden lg:block flex-1 max-w-[120px] relative h-[2px] mx-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-emerald-500/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 to-emerald-500/60" style={{ animation: 'shimmer 2s ease-in-out infinite' }} />
        </div>
        <div className="lg:hidden w-[2px] h-8 bg-gradient-to-b from-blue-500/30 to-emerald-500/30" />

        {/* STREAMTIME box */}
        <div className="shrink-0 px-6 py-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] text-center">
          <div className="text-[13px] font-bold text-emerald-400/70 tracking-tight">STREAMTIME</div>
          <div className="text-[10px] text-white/20 mt-1">{lang === 'fr' ? 'Multi-User activé' : 'Multi-User enabled'}</div>
        </div>

        {/* Arrow */}
        <div className="hidden lg:block flex-1 max-w-[120px] relative h-[2px] mx-4">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-emerald-500/10" />
        </div>
        <div className="lg:hidden w-[2px] h-8 bg-gradient-to-b from-emerald-500/30 to-emerald-500/10" />

        {/* Multiple screens */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="relative">
                <svg width="36" height="30" viewBox="0 0 36 30">
                  <rect x="2" y="2" width="32" height="20" rx="3" fill="none" stroke="rgba(52,211,153,0.25)" strokeWidth="1" />
                  <rect x="5" y="5" width="26" height="14" rx="1.5" fill="rgba(52,211,153,0.06)">
                    <animate attributeName="opacity" values="0.06;0.15;0.06" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                  </rect>
                  <line x1="14" y1="24" x2="22" y2="24" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />
                </svg>
              </div>
            ))}
          </div>
          <span className="text-[10px] text-white/25 mt-3 font-semibold tracking-wider uppercase">{lang === 'fr' ? '10 écrans simultanés' : '10 simultaneous screens'}</span>
        </div>
      </div>

      {/* Bottom explanation */}
      <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
        <p className="text-[13px] text-white/25 max-w-[500px] mx-auto leading-relaxed">
          {lang === 'fr'
            ? "Quand 10 passagers regardent la même chaîne, un seul flux transite par satellite. Résultat : la bande passante est préservée pour le Wi-Fi, les communications et les services à bord."
            : "When 10 passengers watch the same channel, only one stream transits via satellite. Result: bandwidth is preserved for Wi-Fi, communications and onboard services."}
        </p>
      </div>

      {/* Key stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-[24px] font-display font-bold text-blue-400/60">1</div>
          <div className="text-[10px] text-white/20 mt-1">{lang === 'fr' ? 'Flux satellite' : 'Satellite stream'}</div>
        </div>
        <div className="text-center">
          <div className="text-[24px] font-display font-bold text-emerald-400/60">50+</div>
          <div className="text-[10px] text-white/20 mt-1">{lang === 'fr' ? 'Écrans servis' : 'Screens served'}</div>
        </div>
        <div className="text-center">
          <div className="text-[24px] font-display font-bold text-purple-400/60">550</div>
          <div className="text-[10px] text-white/20 mt-1">Kbps / flux</div>
        </div>
      </div>
    </div>
  )
}

// ─── BEFORE/AFTER BANDWIDTH SLIDER ──────────────────────
function BandwidthSlider({ lang }: { lang: Lang }) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = useCallback((clientX: number) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const p = Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100))
    setPos(p)
  }, [])

  useEffect(() => {
    const up = () => { dragging.current = false }
    const move = (e: MouseEvent) => { if (dragging.current) update(e.clientX) }
    const touchMove = (e: TouchEvent) => { if (dragging.current) update(e.touches[0].clientX) }
    window.addEventListener('mouseup', up)
    window.addEventListener('mousemove', move)
    window.addEventListener('touchend', up)
    window.addEventListener('touchmove', touchMove)
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('mousemove', move); window.removeEventListener('touchend', up); window.removeEventListener('touchmove', touchMove) }
  }, [update])

  return (
    <div ref={ref} className="relative select-none cursor-col-resize rounded-2xl overflow-hidden h-[280px] lg:h-[360px] border border-white/[0.06]"
      onMouseDown={(e) => { dragging.current = true; update(e.clientX) }}
      onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX) }}>
      {/* Without Airmont (left) */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 to-red-900/20"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[11px] tracking-[0.2em] uppercase font-semibold text-red-400/60 mb-3">{lang === 'fr' ? 'Sans Airmont' : 'Without Airmont'}</div>
          <div className="text-[64px] lg:text-[80px] font-display font-bold text-red-400/30 leading-none">100%</div>
          <div className="text-[13px] text-red-400/30 mt-2">{lang === 'fr' ? 'Bande passante consommée' : 'Bandwidth consumed'}</div>
          <div className="flex gap-1 mt-4">{[1,2,3,4,5].map(i => <div key={i} className="w-8 h-1 rounded-full bg-red-500/20" />)}</div>
          <div className="text-[11px] text-red-400/20 mt-2">{lang === 'fr' ? 'Buffering fréquent' : 'Frequent buffering'}</div>
        </div>
      </div>
      {/* With Airmont (right) — clips at slider position */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 to-blue-900/20"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[11px] tracking-[0.2em] uppercase font-semibold text-emerald-400/60 mb-3">{lang === 'fr' ? 'Avec Airmont' : 'With Airmont'}</div>
          <div className="text-[64px] lg:text-[80px] font-display font-bold text-emerald-400/40 leading-none">60%</div>
          <div className="text-[13px] text-emerald-400/30 mt-2">{lang === 'fr' ? 'Bande passante consommée' : 'Bandwidth consumed'}</div>
          <div className="flex gap-1 mt-4">{[1,2,3].map(i => <div key={i} className="w-8 h-1 rounded-full bg-emerald-500/30" />)}<div className="w-8 h-1 rounded-full bg-emerald-500/10" /><div className="w-8 h-1 rounded-full bg-emerald-500/10" /></div>
          <div className="text-[11px] text-emerald-400/30 mt-2">{lang === 'fr' ? 'Qualité cristalline' : 'Crystal-clear quality'}</div>
        </div>
      </div>
      {/* Slider handle */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/40 z-10" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M8 3l-5 9 5 9M16 3l5 9-5 9"/></svg>
        </div>
      </div>
    </div>
  )
}

// ─── LIVE TOAST NOTIFICATIONS ───────────────────────────
function LiveToasts({ lang }: { lang: Lang }) {
  const msgs = lang === 'fr'
    ? ['Navire connecté — Méditerranée', 'Jet VIP en service — Atlantique Nord', 'Streaming actif — Yacht M/Y Eclipse', 'Chaîne nationale diffusée — Vol officiel', 'Compression optimisée — Croisière Pacifique', 'Cast activé — Suite propriétaire']
    : ['Vessel connected — Mediterranean', 'VIP Jet in service — North Atlantic', 'Active streaming — Yacht M/Y Eclipse', 'National channel broadcast — Official flight', 'Compression optimized — Pacific cruise', 'Cast activated — Owner suite']
  const [visible, setVisible] = useState<string[]>([])
  const idx = useRef(0)

  useEffect(() => {
    const show = () => {
      const msg = msgs[idx.current % msgs.length]
      idx.current++
      setVisible(prev => [...prev.slice(-2), msg])
      setTimeout(() => setVisible(prev => prev.filter(m => m !== msg)), 4000)
    }
    show()
    const interval = setInterval(show, 5000)
    return () => clearInterval(interval)
  }, [lang])

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 pointer-events-none">
      {visible.map((msg, i) => (
        <div key={msg + i} className="flex items-center gap-3 px-5 py-3 rounded-xl glass-dark shadow-xl shadow-black/20 pointer-events-auto"
          style={{ animation: 'toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          <span className="text-[12px] font-medium text-white/60 whitespace-nowrap">{msg}</span>
        </div>
      ))}
    </div>
  )
}

// ─── BANDWIDTH DATA VIZ ─────────────────────────────────
function BandwidthViz({ lang }: { lang: Lang }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvasRef.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    let id: number, frame = 0
    c.width = c.offsetWidth * 2; c.height = c.offsetHeight * 2
    ctx.scale(2, 2)
    const w = c.offsetWidth, h = c.offsetHeight

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      frame++

      // "Without" line (red, higher)
      ctx!.beginPath()
      ctx!.strokeStyle = 'rgba(239,68,68,0.25)'
      ctx!.lineWidth = 2
      for (let x = 0; x < w; x++) {
        const y = h * 0.3 + Math.sin((x + frame) * 0.02) * 20 + Math.sin((x + frame) * 0.05) * 10 + (Math.random() - 0.5) * 4
        x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y)
      }
      ctx!.stroke()

      // "With Airmont" line (green, lower, smoother)
      ctx!.beginPath()
      ctx!.strokeStyle = 'rgba(52,211,153,0.4)'
      ctx!.lineWidth = 2.5
      for (let x = 0; x < w; x++) {
        const y = h * 0.65 + Math.sin((x + frame) * 0.015) * 12 + Math.sin((x + frame * 0.8) * 0.03) * 6
        x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y)
      }
      ctx!.stroke()

      // Fill area between
      ctx!.beginPath()
      ctx!.fillStyle = 'rgba(52,211,153,0.03)'
      for (let x = 0; x < w; x++) {
        const y1 = h * 0.3 + Math.sin((x + frame) * 0.02) * 20 + Math.sin((x + frame) * 0.05) * 10
        x === 0 ? ctx!.moveTo(x, y1) : ctx!.lineTo(x, y1)
      }
      for (let x = w - 1; x >= 0; x--) {
        const y2 = h * 0.65 + Math.sin((x + frame) * 0.015) * 12 + Math.sin((x + frame * 0.8) * 0.03) * 6
        ctx!.lineTo(x, y2)
      }
      ctx!.fill()

      id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-[180px] lg:h-[220px] rounded-xl" />
      <div className="absolute top-4 left-5 flex items-center gap-2"><div className="w-3 h-[2px] bg-red-400/40 rounded" /><span className="text-[10px] text-white/25 font-medium">{lang === 'fr' ? 'Sans optimisation' : 'Without optimization'}</span></div>
      <div className="absolute top-10 left-5 flex items-center gap-2"><div className="w-3 h-[2px] bg-emerald-400/60 rounded" /><span className="text-[10px] text-white/25 font-medium">{lang === 'fr' ? 'Avec Streamtime' : 'With Streamtime'}</span></div>
      <div className="absolute bottom-4 right-5 text-[10px] text-white/15 font-medium">{lang === 'fr' ? 'Illustration' : 'Illustration'}</div>
    </div>
  )
}

// ─── SCROLL PROGRESS ────────────────────────────────────
function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const h = () => { const d = document.documentElement.scrollHeight - window.innerHeight; setP(d > 0 ? (window.scrollY / d) * 100 : 0) }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]"><div className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400" style={{ width: `${p}%`, transition: 'width 0.15s ease-out' }} /></div>
}

// ─── PARALLAX IMAGE ─────────────────────────────────────
function ParallaxImage({ src, alt = '', speed = 0.3, className = '' }: { src: string; alt?: string; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const h = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      const center = r.top + r.height / 2 - window.innerHeight / 2
      setOffset(center * speed * -1)
    }
    window.addEventListener('scroll', h, { passive: true })
    h()
    return () => window.removeEventListener('scroll', h)
  }, [speed])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-[120%] object-cover" style={{ transform: `translateY(${offset}px)`, willChange: 'transform' }} />
    </div>
  )
}

// ─── SCROLL DOWN INDICATOR ──────────────────────────────
function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40 animate-bounce">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#0c1a30]"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    </div>
  )
}

// ─── ANIMATED NUMBER HIGHLIGHT ──────────────────────────
function ImpactStats({ lang }: { lang: Lang }) {
  return (
    <section className="relative py-20 lg:py-28 bg-[#0c1a30] overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.4), transparent 40%), radial-gradient(circle at 80% 50%, rgba(52,211,153,0.3), transparent 40%)' }} />
      <ParticleField color="rgba(255,255,255,0.06)" count={30} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/20 mb-4">{lang === 'fr' ? 'Airmont en chiffres' : 'Airmont by the Numbers'}</p>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-white leading-[1.1]">
            {lang === 'fr' ? 'Performance prouvée.' : 'Proven Performance.'}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {[
            { value: 10000, suffix: '+', label: { fr: 'Heures de vol', en: 'Flight Hours' }, icon: '✈' },
            { value: 5, suffix: '', label: { fr: 'Brevets', en: 'Patents' }, icon: '⚡' },
            { value: 40, suffix: '%', label: { fr: 'BP économisée', en: 'BW Saved' }, icon: '📉' },
            { value: 50, suffix: '+', label: { fr: 'Flux simultanés', en: 'Simultaneous Streams' }, icon: '📺' },
            { value: 550, suffix: '', label: { fr: 'Kbps / flux', en: 'Kbps / Stream' }, icon: '⚙' },
          ].map((s, i) => (
            <Reveal key={s.label.fr} delay={i * 100}>
              <div className="text-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-500 group">
                <div className="text-[24px] mb-3 opacity-40 group-hover:opacity-70 transition-opacity">{s.icon}</div>
                <div className="text-[clamp(32px,4vw,48px)] font-display font-bold text-white leading-none mb-2">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] font-medium tracking-wider uppercase text-white/30">{s.label[lang]}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PARTNERS / TRUST LOGOS ─────────────────────────────
function PartnerLogos({ lang }: { lang: Lang }) {
  const partners = [
    { name: 'DIRECTV', sub: 'JetVision' },
    { name: 'Honeywell', sub: 'Satcom1' },
    { name: 'Thrane&Thrane', sub: 'Cobham' },
    { name: 'Starlink', sub: 'SpaceX' },
    { name: 'OneWeb', sub: 'Eutelsat' },
    { name: 'Intelsat', sub: 'GEO Fleet' },
  ]
  return (
    <section className="py-12 bg-white border-y border-[#0c1a30]/[0.03] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-8">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#0c1a30]/20">{lang === 'fr' ? 'Écosystème & Partenaires' : 'Ecosystem & Partners'}</p>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {partners.map(p => (
            <div key={p.name} className="flex flex-col items-center gap-1 opacity-25 hover:opacity-50 transition-all duration-500 cursor-default">
              <span className="text-[16px] font-bold tracking-tight text-[#0c1a30]">{p.name}</span>
              <span className="text-[9px] text-[#0c1a30]/50 tracking-wider uppercase">{p.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SATELLITE GLOBE (react-globe.gl) ─────────────────────
function SatelliteCoverageMap({ lang }: { lang: Lang }) {
  const globeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [stats, setStats] = useState({ sats: 0, coverage: 0 })
  const [globeReady, setGlobeReady] = useState(false)
  const [globeSize, setGlobeSize] = useState(550)

  // Responsive sizing
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setGlobeSize(w < 640 ? Math.min(w - 40, 380) : w < 1024 ? 480 : 600)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Animated counter
  useEffect(() => {
    let f = 0
    const t = setInterval(() => {
      f++
      setStats({ sats: Math.min(Math.round(f * 36), 7200), coverage: Math.min(Math.round(f * 0.5), 98) })
      if (f >= 200) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [])

  // Airport hub data
  const hubData = useMemo(() => [
    { lat: 48.86, lng: 2.35, city: 'Paris CDG', size: 0.6 },
    { lat: 40.64, lng: -73.78, city: 'New York JFK', size: 0.6 },
    { lat: 33.94, lng: -118.41, city: 'Los Angeles LAX', size: 0.5 },
    { lat: 25.25, lng: 55.36, city: 'Dubai DXB', size: 0.6 },
    { lat: 1.35, lng: 103.82, city: 'Singapore SIN', size: 0.5 },
    { lat: 35.68, lng: 139.77, city: 'Tokyo NRT', size: 0.5 },
    { lat: -33.87, lng: 151.21, city: 'Sydney SYD', size: 0.4 },
    { lat: 51.47, lng: -0.46, city: 'London LHR', size: 0.5 },
    { lat: 55.75, lng: 37.62, city: 'Moscow SVO', size: 0.4 },
    { lat: 22.30, lng: 114.17, city: 'Hong Kong HKG', size: 0.5 },
    { lat: 37.57, lng: 126.98, city: 'Seoul ICN', size: 0.4 },
    { lat: -23.55, lng: -46.63, city: 'São Paulo GRU', size: 0.4 },
    { lat: 19.43, lng: -99.13, city: 'Mexico City MEX', size: 0.4 },
    { lat: 28.61, lng: 77.21, city: 'Delhi DEL', size: 0.5 },
  ], [])

  // Animated flight arcs between hubs
  const arcsData = useMemo(() => [
    { startLat: 48.86, startLng: 2.35, endLat: 40.64, endLng: -73.78, color: ['rgba(0,210,255,0.6)', 'rgba(59,130,246,0.3)'] },
    { startLat: 48.86, startLng: 2.35, endLat: 25.25, endLng: 55.36, color: ['rgba(59,130,246,0.6)', 'rgba(139,92,246,0.3)'] },
    { startLat: 40.64, startLng: -73.78, endLat: 33.94, endLng: -118.41, color: ['rgba(0,210,255,0.5)', 'rgba(52,211,153,0.3)'] },
    { startLat: 25.25, startLng: 55.36, endLat: 1.35, endLng: 103.82, color: ['rgba(139,92,246,0.6)', 'rgba(245,158,11,0.3)'] },
    { startLat: 51.47, startLng: -0.46, endLat: 35.68, endLng: 139.77, color: ['rgba(59,130,246,0.5)', 'rgba(0,210,255,0.3)'] },
    { startLat: 1.35, startLng: 103.82, endLat: -33.87, endLng: 151.21, color: ['rgba(52,211,153,0.5)', 'rgba(59,130,246,0.3)'] },
    { startLat: 22.30, startLng: 114.17, endLat: 37.57, endLng: 126.98, color: ['rgba(245,158,11,0.5)', 'rgba(139,92,246,0.3)'] },
    { startLat: 40.64, startLng: -73.78, endLat: -23.55, endLng: -46.63, color: ['rgba(0,210,255,0.4)', 'rgba(52,211,153,0.3)'] },
    { startLat: 48.86, startLng: 2.35, endLat: 55.75, endLng: 37.62, color: ['rgba(59,130,246,0.5)', 'rgba(245,158,11,0.3)'] },
    { startLat: 25.25, startLng: 55.36, endLat: 28.61, endLng: 77.21, color: ['rgba(139,92,246,0.5)', 'rgba(52,211,153,0.3)'] },
    { startLat: 33.94, startLng: -118.41, endLat: 35.68, endLng: 139.77, color: ['rgba(0,210,255,0.5)', 'rgba(245,158,11,0.3)'] },
    { startLat: 51.47, startLng: -0.46, endLat: 25.25, endLng: 55.36, color: ['rgba(59,130,246,0.5)', 'rgba(139,92,246,0.3)'] },
  ], [])

  // Ring pulse data (same as hubs)
  const ringsData = useMemo(() => hubData.map(h => ({
    lat: h.lat, lng: h.lng, maxR: 3, propagationSpeed: 2, repeatPeriod: 1200
  })), [hubData])

  // Setup globe appearance on ready
  const onGlobeReady = useCallback(() => {
    setGlobeReady(true)
    if (globeRef.current) {
      const g = globeRef.current
      // Camera position - nice angle
      g.pointOfView({ lat: 30, lng: 10, altitude: 2.2 }, 0)
      // Auto-rotate
      const controls = g.controls()
      if (controls) {
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.4
        controls.enableZoom = true
        controls.minDistance = 200
        controls.maxDistance = 500
        controls.enableDamping = true
        controls.dampingFactor = 0.1
      }
      // Scene & renderer customization — fully transparent background
      const scene = g.scene()
      if (scene) {
        scene.background = null
      }
      const renderer = g.renderer()
      if (renderer) {
        renderer.setClearColor(0x000000, 0)
        renderer.setClearAlpha(0)
        // Access the canvas directly to remove any visible border
        const canvas = renderer.domElement
        if (canvas) {
          canvas.style.background = 'transparent'
        }
      }
    }
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-[#060d1b] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/[0.05] blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-6">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-blue-400/30 mb-4">
            {lang === 'fr' ? 'Couverture mondiale' : 'Global Coverage'}
          </p>
          <h2 className="font-display text-[clamp(28px,3.5vw,48px)] font-bold tracking-tight text-white leading-[1.1]">
            {lang === 'fr' ? 'Connecté partout. En temps réel.' : 'Connected everywhere. In real time.'}
          </h2>
          <p className="mt-4 text-[15px] text-white/25 max-w-[560px] mx-auto">
            {lang === 'fr'
              ? "Compatible avec toutes les constellations satellite majeures. Notre technologie s'adapte à chaque infrastructure."
              : 'Compatible with all major satellite constellations. Our technology adapts to every infrastructure.'}
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={200}>
          <div className="flex justify-center gap-10 lg:gap-16 mb-8">
            <div className="text-center">
              <div className="text-[28px] lg:text-[36px] font-bold text-white/90 tabular-nums">{stats.sats.toLocaleString()}+</div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/20 mt-1">{lang === 'fr' ? 'Satellites compatibles' : 'Compatible satellites'}</div>
            </div>
            <div className="w-px bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-[28px] lg:text-[36px] font-bold text-emerald-400/80 tabular-nums">{stats.coverage}%</div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/20 mt-1">{lang === 'fr' ? 'Couverture mondiale' : 'Global coverage'}</div>
            </div>
            <div className="w-px bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-[28px] lg:text-[36px] font-bold text-white/90">3</div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/20 mt-1">{lang === 'fr' ? "Types d'orbites" : 'Orbit types'}</div>
            </div>
          </div>
        </Reveal>

        {/* Globe */}
        <Reveal delay={300}>
          <div className="relative flex justify-center" ref={containerRef}>
            <div
              className="relative transition-opacity duration-1000"
              style={{ opacity: globeReady ? 1 : 0, width: globeSize, height: globeSize }}
            >
              <Globe
                ref={globeRef}
                width={globeSize}
                height={globeSize}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                atmosphereColor="#3b82f6"
                atmosphereAltitude={0.2}
                showAtmosphere={true}

                // Hub points
                pointsData={hubData}
                pointLat="lat"
                pointLng="lng"
                pointColor={() => 'rgba(52,211,153,0.9)'}
                pointAltitude={0.01}
                pointRadius="size"
                pointsMerge={true}

                // Flight arcs
                arcsData={arcsData}
                arcStartLat="startLat"
                arcStartLng="startLng"
                arcEndLat="endLat"
                arcEndLng="endLng"
                arcColor="color"
                arcDashLength={0.6}
                arcDashGap={0.3}
                arcDashAnimateTime={3000}
                arcStroke={0.4}
                arcAltitudeAutoScale={0.4}

                // Ring pulses
                ringsData={ringsData}
                ringLat="lat"
                ringLng="lng"
                ringMaxRadius="maxR"
                ringPropagationSpeed="propagationSpeed"
                ringRepeatPeriod="repeatPeriod"
                ringColor={() => (t: number) => `rgba(52,211,153,${1 - t})`}

                // Labels
                labelsData={hubData}
                labelLat="lat"
                labelLng="lng"
                labelText="city"
                labelSize={0.6}
                labelDotRadius={0.3}
                labelColor={() => 'rgba(255,255,255,0.5)'}
                labelResolution={2}
                labelAltitude={0.015}

                onGlobeReady={onGlobeReady}
              />
              {/* Multi-layer vignette to seamlessly blend globe into background */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(6,13,27,0.3) 42%, rgba(6,13,27,0.7) 52%, #060d1b 62%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #060d1b 0%, transparent 12%, transparent 88%, #060d1b 100%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #060d1b 0%, transparent 12%, transparent 88%, #060d1b 100%)' }} />
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-4 lg:left-8 flex flex-col gap-2 z-10">
              {[
                { name: 'Starlink · LEO 550km', color: '#3b82f6', count: '6 300+' },
                { name: 'OneWeb · LEO 1 200km', color: '#8b5cf6', count: '648' },
                { name: 'Intelsat · GEO 35 786km', color: '#f59e0b', count: '50+' },
              ].map(c => (
                <div key={c.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.06]">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                  <span className="text-[10px] text-white/50 font-medium">{c.name}</span>
                  <span className="text-[9px] text-white/25">{c.count}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 right-4 lg:right-8 flex flex-col gap-2 z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.06]">
                <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 8px rgba(52,211,153,0.6)' }} />
                <span className="text-[10px] text-white/40">{lang === 'fr' ? 'Hubs aéroportuaires' : 'Airport hubs'}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.06]">
                <div className="w-6 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                <span className="text-[10px] text-white/40">{lang === 'fr' ? 'Routes de données' : 'Data routes'}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="text-center text-[11px] text-white/15 mt-4 max-w-[600px] mx-auto">
            {lang === 'fr'
              ? "Airmont est agnostique : compatible Ku-band, Ka-band, L-band, LEO et GEO. Aucune dépendance opérateur."
              : 'Airmont is agnostic: Ku-band, Ka-band, L-band, LEO & GEO compatible. Zero operator lock-in.'}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ─── TEXT SCRAMBLE ───────────────────────────────────────
function TextScramble({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [display, setDisplay] = useState('')
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true; let it = 0; const max = text.length * 3
        const t = setInterval(() => {
          setDisplay(text.split('').map((c, i) => c === ' ' || c === '\n' ? c : i < it / 3 ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(''))
          if (++it >= max) { setDisplay(text); clearInterval(t) }
        }, 30)
      }
    }, { threshold: 0.3 })
    const t = setTimeout(() => obs.observe(el), delay)
    return () => { obs.disconnect(); clearTimeout(t) }
  }, [text, delay])
  return <span ref={ref} className={className}>{display || '\u00A0'}</span>
}

// ─── REVEAL ─────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fb = setTimeout(() => setV(true), 2000 + delay)
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.unobserve(el); clearTimeout(fb) } }, { threshold: 0.05, rootMargin: '50px' })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [delay])
  return <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(36px)', transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>{children}</div>
}

// ─── COUNT UP ───────────────────────────────────────────
function CountUp({ end, suffix, prefix = '' }: { end: number; suffix: string; prefix?: string }) {
  const [c, setC] = useState(0); const ref = useRef<HTMLSpanElement>(null); const s = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fb = setTimeout(() => { if (!s.current) { s.current = true; setC(end) } }, 3000)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !s.current) { s.current = true; clearTimeout(fb); let v = 0; const step = end / 80; const t = setInterval(() => { v += step; if (v >= end) { setC(end); clearInterval(t) } else setC(Math.floor(v)) }, 20) }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [end])
  return <span ref={ref}>{prefix}{c}{suffix}</span>
}

// ─── PARTICLE FIELD ─────────────────────────────────────
function ParticleField({ color = 'rgba(255,255,255,0.15)', count = 60 }: { color?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return
    let id: number, w = c.width = c.offsetWidth, h = c.height = c.offsetHeight
    const ps = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5 }))
    function draw() {
      ctx!.clearRect(0, 0, w, h)
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0; ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx!.fillStyle = color; ctx!.fill() })
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, d = Math.sqrt(dx * dx + dy * dy)
        if (d < 120) { ctx!.beginPath(); ctx!.moveTo(ps[i].x, ps[i].y); ctx!.lineTo(ps[j].x, ps[j].y); ctx!.strokeStyle = color.replace(/[\d.]+\)$/, `${0.08 * (1 - d / 120)})`); ctx!.lineWidth = 0.5; ctx!.stroke() }
      }
      id = requestAnimationFrame(draw)
    }
    draw()
    const rs = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight }
    window.addEventListener('resize', rs)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', rs) }
  }, [color, count])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
}

// ─── GRADIENT MESH (animated background) ────────────────
function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute w-[600px] h-[600px] -top-[200px] -right-[100px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', animation: 'meshFloat1 15s ease-in-out infinite' }} />
      <div className="absolute w-[500px] h-[500px] -bottom-[150px] -left-[100px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', animation: 'meshFloat2 20s ease-in-out infinite' }} />
      <div className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', animation: 'meshFloat3 18s ease-in-out infinite' }} />
    </div>
  )
}

// ─── CURSOR GLOW ────────────────────────────────────────
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const m = (e: MouseEvent) => { if (ref.current) ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)` }
    window.addEventListener('mousemove', m, { passive: true })
    return () => window.removeEventListener('mousemove', m)
  }, [])
  return <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}><div ref={ref} className="w-[400px] h-[400px] rounded-full opacity-[0.04] transition-transform duration-[1500ms] ease-out" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} /></div>
}

// ─── MARQUEE ────────────────────────────────────────────
function Marquee({ items }: { items: string[] }) {
  const d = [...items, ...items]
  return <div className="overflow-hidden whitespace-nowrap"><div className="inline-flex" style={{ animation: 'marquee 30s linear infinite' }}>{d.map((it, i) => <span key={i} className="mx-8 lg:mx-12 text-[13px] font-semibold tracking-[0.15em] uppercase text-white/15 select-none">{it}</span>)}</div></div>
}

// ─── TILT CARD ──────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const hm = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return; const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`
  }, [])
  const hl = useCallback(() => { if (ref.current) ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)' }, [])
  return <div ref={ref} className={className} onMouseMove={hm} onMouseLeave={hl} style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}>{children}</div>
}

// ─── MAGNETIC BUTTON ────────────────────────────────────
function MagneticButton({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const hm = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return; const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.15}px, ${(e.clientY - r.top - r.height / 2) * 0.15}px)`
  }, [])
  const hl = useCallback(() => { if (ref.current) ref.current.style.transform = 'translate(0,0)' }, [])
  return <button ref={ref} onClick={onClick} className={className} onMouseMove={hm} onMouseLeave={hl} style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>{children}</button>
}

// ─── MOUSE GRADIENT CARD ────────────────────────────────
function GlowCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const hm = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return; const r = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - r.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - r.top}px`)
  }, [])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} onMouseMove={hm}>
      <div className="absolute w-[300px] h-[300px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', left: 'var(--glow-x, 50%)', top: 'var(--glow-y, 50%)', transform: 'translate(-50%, -50%)' }} />
      {children}
    </div>
  )
}

// ─── LIVE BADGE ─────────────────────────────────────────
function LiveBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[12px] font-semibold text-[#0c1a30] tracking-wide">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{text}
    </div>
  )
}

// ─── HORIZONTAL GALLERY ─────────────────────────────────
function HorizontalGallery({ images }: { images: { src: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const startX = useRef(0)
  const scrollL = useRef(0)

  // Convert vertical wheel to horizontal scroll
  useEffect(() => {
    const el = ref.current; if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div
      ref={ref}
      className="flex gap-5 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing scroll-smooth"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      onMouseDown={(e) => { dragging.current = true; startX.current = e.pageX - (ref.current?.offsetLeft || 0); scrollL.current = ref.current?.scrollLeft || 0 }}
      onMouseLeave={() => { dragging.current = false }}
      onMouseUp={() => { dragging.current = false }}
      onMouseMove={(e) => { if (!dragging.current || !ref.current) return; e.preventDefault(); const x = e.pageX - (ref.current.offsetLeft || 0); ref.current.scrollLeft = scrollL.current - (x - startX.current) }}
    >
      {images.map((img, i) => (
        <div key={i} className="flex-shrink-0 w-[320px] lg:w-[440px] group select-none">
          <div className="h-[220px] lg:h-[300px] overflow-hidden rounded-2xl"><img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none" /></div>
          <p className="mt-3 text-[12px] font-medium tracking-wide text-[#0c1a30]/30">{img.label}</p>
        </div>
      ))}
    </div>
  )
}

// ─── PAGE TRANSITION WRAPPER ────────────────────────────
function PageTransition({ children, pageKey }: { children: ReactNode; pageKey: string }) {
  const [display, setDisplay] = useState(children)
  const [fading, setFading] = useState(false)
  const prevKey = useRef(pageKey)

  useEffect(() => {
    if (pageKey !== prevKey.current) {
      setFading(true)
      setTimeout(() => { setDisplay(children); setFading(false); prevKey.current = pageKey }, 300)
    } else {
      setDisplay(children)
    }
  }, [pageKey, children])

  return <div style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(12px)' : 'translateY(0)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>{display}</div>
}

// ─── CONTACT MODAL ──────────────────────────────────────
type ContactMode = 'demo' | 'contact' | 'expert' | 'newsletter'
function ContactModal({ open, onClose, lang, mode = 'demo' }: { open: boolean; onClose: () => void; lang: Lang; mode?: ContactMode }) {
  if (!open) return null

  const modalConfig: Record<ContactMode, { title: string; subtitle: string; fields: string[] }> = {
    demo: {
      title: lang === 'fr' ? 'Demander une démo' : 'Request a Demo',
      subtitle: lang === 'fr' ? 'Notre équipe vous contactera sous 24h.' : 'Our team will contact you within 24h.',
      fields: ['name', 'email', 'segment', 'message']
    },
    contact: {
      title: lang === 'fr' ? 'Nous contacter' : 'Contact Us',
      subtitle: lang === 'fr' ? 'Contactez-nous pour toute question.' : 'Contact us with any questions.',
      fields: ['name', 'email', 'message']
    },
    expert: {
      title: lang === 'fr' ? 'Parler à un expert' : 'Talk to an Expert',
      subtitle: lang === 'fr' ? 'Nos experts sont à votre écoute.' : 'Our experts are here to help.',
      fields: ['name', 'email', 'company', 'phone']
    },
    newsletter: {
      title: lang === 'fr' ? 'Newsletter' : 'Newsletter',
      subtitle: lang === 'fr' ? 'Restez informé des dernières actualités.' : 'Stay updated with the latest news.',
      fields: ['email']
    }
  }

  const config = modalConfig[mode]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl p-8 lg:p-12 max-w-[520px] w-full shadow-2xl" onClick={e => e.stopPropagation()} style={{ animation: 'modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <h3 className="font-display text-[28px] font-bold text-[#0c1a30] mb-2">{config.title}</h3>
        <p className="text-[14px] text-[#0c1a30]/40 mb-8">{config.subtitle}</p>
        <div className="space-y-4">
          {config.fields.includes('name') && (
            <div><label className="block text-[12px] font-semibold text-[#0c1a30]/50 mb-1.5 tracking-wide uppercase">{lang === 'fr' ? 'Nom complet' : 'Full name'}</label><input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-[#0c1a30]/30 focus:ring-2 focus:ring-[#0c1a30]/5 transition-all" placeholder="John Doe" /></div>
          )}
          {config.fields.includes('email') && (
            <div><label className="block text-[12px] font-semibold text-[#0c1a30]/50 mb-1.5 tracking-wide uppercase">Email</label><input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-[#0c1a30]/30 focus:ring-2 focus:ring-[#0c1a30]/5 transition-all" placeholder="john@company.com" /></div>
          )}
          {config.fields.includes('company') && (
            <div><label className="block text-[12px] font-semibold text-[#0c1a30]/50 mb-1.5 tracking-wide uppercase">{lang === 'fr' ? 'Entreprise' : 'Company'}</label><input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-[#0c1a30]/30 focus:ring-2 focus:ring-[#0c1a30]/5 transition-all" placeholder={lang === 'fr' ? 'Votre entreprise' : 'Your company'} /></div>
          )}
          {config.fields.includes('phone') && (
            <div><label className="block text-[12px] font-semibold text-[#0c1a30]/50 mb-1.5 tracking-wide uppercase">{lang === 'fr' ? 'Téléphone' : 'Phone'}</label><input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-[#0c1a30]/30 focus:ring-2 focus:ring-[#0c1a30]/5 transition-all" placeholder="+33 1 23 45 67 89" /></div>
          )}
          {config.fields.includes('segment') && (
            <div><label className="block text-[12px] font-semibold text-[#0c1a30]/50 mb-1.5 tracking-wide uppercase">{lang === 'fr' ? 'Secteur' : 'Segment'}</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] text-[#0c1a30]/60 focus:outline-none focus:border-[#0c1a30]/30 focus:ring-2 focus:ring-[#0c1a30]/5 transition-all bg-white">
                <option>Aviation (Jets / VIP)</option><option>{lang === 'fr' ? 'Méga-Yachts' : 'Mega-Yachts'}</option><option>{lang === 'fr' ? 'Croisières' : 'Cruise Lines'}</option><option>{lang === 'fr' ? 'Maritime Marchand' : 'Merchant Maritime'}</option><option>{lang === 'fr' ? 'Compagnies aériennes' : 'Airlines'}</option>
              </select>
            </div>
          )}
          {config.fields.includes('message') && (
            <div><label className="block text-[12px] font-semibold text-[#0c1a30]/50 mb-1.5 tracking-wide uppercase">{lang === 'fr' ? 'Message' : 'Message'}</label><textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:border-[#0c1a30]/30 focus:ring-2 focus:ring-[#0c1a30]/5 transition-all resize-none" rows={3} placeholder={lang === 'fr' ? 'Décrivez votre projet...' : 'Describe your project...'} /></div>
          )}
          <button className="w-full py-3.5 bg-[#0c1a30] text-white text-[14px] font-semibold rounded-xl hover:bg-[#162238] transition-all active:scale-[0.98] mt-2">{lang === 'fr' ? 'Envoyer' : 'Send'}</button>
        </div>
      </div>
    </div>
  )
}

// ─── I18N ───────────────────────────────────────────────
type Lang = 'fr' | 'en'
const T = {
  nav: { home: { fr: 'Accueil', en: 'Home' }, aviation: { fr: 'Aviation', en: 'Aviation' }, yachts: { fr: 'Yachts', en: 'Yachts' }, cruise: { fr: 'Croisières', en: 'Cruise' }, maritime: { fr: 'Maritime', en: 'Maritime' }, contact: { fr: 'Nous contacter', en: 'Contact Us' } },
  home: {
    label: { fr: 'TV & Streaming embarqué', en: 'Onboard TV & Streaming' },
    h1_1: { fr: 'TV & Streaming', en: 'TV & Streaming' }, h1_2: { fr: 'pour jets, yachts', en: 'for jets, yachts' }, h1_3: { fr: '& navires.', en: '& vessels.' },
    sub: { fr: "Airmont change la façon de regarder la TV à bord. Vos passagers reprennent leur série là où ils l'ont arrêtée, avec une qualité inégalée — le tout en consommant un minimum de bande passante satellite.", en: "Airmont is changing the way we watch TV on board. Passengers pick up their favourite series where they left off, with uncompromised quality — all while using minimal satellite bandwidth." },
    cta1: { fr: 'Découvrir nos solutions', en: 'Discover Solutions' }, cta2: { fr: 'Demander une démo', en: 'Request a Demo' },
  },
  seg: { demo: { fr: 'Demander une démo', en: 'Request a Demo' }, specs: { fr: 'Spécifications', en: 'Technical Specs' }, capLabel: { fr: 'Fonctionnalités', en: 'Capabilities' }, capH2: { fr: 'Tout ce qu\'il vous faut.', en: 'Everything you need.' }, ucLabel: { fr: 'Cas d\'usage', en: 'Use Cases' }, ucH2: { fr: 'Conçu pour votre univers.', en: 'Built for your world.' }, ctaH2: { fr: 'Équipons votre flotte.', en: 'Let\'s equip your fleet.' }, ctaSub: { fr: 'Obtenez une proposition sur mesure pour vos besoins en', en: 'Get a custom proposal for your' }, ctaBtn: { fr: 'Contacter notre équipe', en: 'Contact Our Team' } },
  footer: { desc: { fr: "Airmont développe des solutions logicielles innovantes pour des expériences digitales embarquées fiables et sécurisées.", en: 'Airmont develops innovative software solutions for reliable and secure onboard digital experiences.' }, solutions: { fr: 'Solutions', en: 'Solutions' }, company: { fr: 'Entreprise', en: 'Company' }, connect: { fr: 'Contact', en: 'Connect' }, rights: { fr: 'Tous droits réservés.', en: 'All rights reserved.' }, privacy: { fr: 'Confidentialité', en: 'Privacy' }, terms: { fr: 'Mentions légales', en: 'Legal Notice' } },
} as const

// ─── NAV ────────────────────────────────────────────────
const NAV_IDS = ['home', 'aviation', 'yachts', 'cruise', 'maritime'] as const
function Navbar({ currentPage, setPage, lang, setLang, onContact }: { currentPage: string; setPage: (p: string) => void; lang: Lang; setLang: (l: Lang) => void; onContact: (mode?: ContactMode) => void }) {
  const [scrolled, setScrolled] = useState(false); const [menuOpen, setMenuOpen] = useState(false); const isDark = currentPage !== 'home'
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? (isDark ? 'glass-dark shadow-lg shadow-black/10' : 'glass shadow-lg shadow-black/5') : 'bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[72px] px-6 lg:px-10">
        <button onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex items-center gap-3 hover:opacity-80 transition-opacity"><img src={isDark ? IMG.logoWhite : IMG.logo} alt="Airmont" className="h-7 object-contain" /></button>
        <div className="hidden md:flex items-center gap-1">
          {NAV_IDS.map(id => <button key={id} onClick={() => { setPage(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className={`px-4 py-2 text-[13px] font-medium tracking-wide rounded-full transition-all duration-300 ${currentPage === id ? (isDark ? 'text-white bg-white/12' : 'text-[#0c1a30] bg-[#0c1a30]/6') : (isDark ? 'text-white/60 hover:text-white hover:bg-white/6' : 'text-[#0c1a30]/50 hover:text-[#0c1a30] hover:bg-[#0c1a30]/4')}`}>{T.nav[id as keyof typeof T.nav][lang]}</button>)}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className={`px-3 py-1.5 text-[11px] font-bold tracking-wider rounded-full border transition-all ${isDark ? 'border-white/15 text-white/50 hover:text-white hover:border-white/30' : 'border-[#0c1a30]/10 text-[#0c1a30]/40 hover:text-[#0c1a30]'}`}>{lang === 'fr' ? 'EN' : 'FR'}</button>
          <button onClick={() => onContact('contact')} className={`px-5 py-2.5 text-[13px] font-semibold rounded-full transition-all duration-300 hover:shadow-lg active:scale-[0.97] ${isDark ? 'bg-white text-[#0c1a30] hover:shadow-white/10' : 'bg-[#0c1a30] text-white hover:shadow-[#0c1a30]/20'}`}>{T.nav.contact[lang]}</button>
        </div>
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className={`px-2 py-1 text-[11px] font-bold rounded-full border ${isDark ? 'border-white/15 text-white/50' : 'border-[#0c1a30]/10 text-[#0c1a30]/40'}`}>{lang === 'fr' ? 'EN' : 'FR'}</button>
          <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}><div className="space-y-1.5"><div className={`w-5 h-[1.5px] transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-[#0c1a30]'} ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} /><div className={`w-5 h-[1.5px] transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-[#0c1a30]'} ${menuOpen ? '-rotate-45 -translate-y-[1.5px]' : ''}`} /></div></button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`${isDark ? 'glass-dark' : 'glass'} border-t ${isDark ? 'border-white/10' : 'border-black/5'} px-6 py-4`}>
          {NAV_IDS.map(id => <button key={id} onClick={() => { setPage(id); setMenuOpen(false); window.scrollTo({ top: 0 }) }} className={`block w-full text-left py-3 text-[15px] font-medium transition-colors ${currentPage === id ? (isDark ? 'text-white' : 'text-[#0c1a30]') : (isDark ? 'text-white/50' : 'text-[#0c1a30]/40')}`}>{T.nav[id as keyof typeof T.nav][lang]}</button>)}
          <button onClick={() => { onContact('contact'); setMenuOpen(false) }} className="mt-2 w-full py-3 bg-[#0c1a30] text-white text-[14px] font-semibold rounded-xl">{T.nav.contact[lang]}</button>
        </div>
      </div>
    </nav>
  )
}

// ─── SHARED ─────────────────────────────────────────────
function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className="inline-flex items-center gap-2.5 mb-6"><div className={`w-8 h-[1.5px] ${light ? 'bg-white/30' : 'bg-[#0c1a30]/15'}`} /><span className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${light ? 'text-white/50' : 'text-[#0c1a30]/35'}`}>{children}</span></div>
}
function StatBlock({ value, suffix, label, light = false, prefix = '' }: { value: number; suffix: string; label: string; light?: boolean; prefix?: string }) {
  return <div className="text-center"><div className={`text-[40px] lg:text-[54px] font-display font-bold leading-none tracking-tight ${light ? 'text-white' : 'gradient-text'}`}><CountUp end={value} suffix={suffix} prefix={prefix} /></div><div className={`mt-2 text-[12px] font-medium tracking-wide ${light ? 'text-white/40' : 'text-[#0c1a30]/35'}`}>{label}</div></div>
}

// ─── HOW IT WORKS ───────────────────────────────────────
function HowItWorks({ lang }: { lang: Lang }) {
  const steps = lang === 'fr' ? [
    { num: '01', title: 'Connexion satellite', desc: 'Airmont se connecte à votre infrastructure VSAT, HTS ou LEO existante — aucune modification matérielle nécessaire.' },
    { num: '02', title: 'Compression & optimisation', desc: 'Notre technologie brevetée isole le flux vidéo, le compresse et l\'optimise en temps réel — économisant jusqu\'à 40% de bande passante.' },
    { num: '03', title: 'Diffusion à bord', desc: 'Vos passagers profitent de la TV en direct, du streaming et du casting sur tous les écrans — qualité cristalline, zéro buffering.' },
  ] : [
    { num: '01', title: 'Satellite connection', desc: 'Airmont connects to your existing VSAT, HTS or LEO infrastructure — no hardware modification needed.' },
    { num: '02', title: 'Compression & optimization', desc: 'Our patented technology isolates video streams, compresses and optimizes in real-time — saving up to 40% bandwidth.' },
    { num: '03', title: 'Onboard delivery', desc: 'Passengers enjoy live TV, streaming and casting on all screens — crystal-clear quality, zero buffering.' },
  ]
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <GradientMesh />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16 lg:mb-20">
          <SectionLabel>{lang === 'fr' ? 'Comment ça marche' : 'How It Works'}</SectionLabel>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-[#0c1a30] leading-[1.1]">
            {lang === 'fr' ? 'Simple. Puissant. Immédiat.' : 'Simple. Powerful. Immediate.'}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[52px] left-[16.6%] right-[16.6%] h-[1px]">
            <div className="w-full h-full bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
          </div>
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 200}>
              <div className="text-center px-6 lg:px-10 relative">
                <div className="relative z-10 w-[104px] h-[104px] rounded-full mx-auto mb-8 flex items-center justify-center bg-white border-2 border-[#0c1a30]/[0.04] shadow-xl shadow-black/[0.04]">
                  <span className="text-[32px] font-display font-bold gradient-text">{s.num}</span>
                </div>
                <h3 className="text-[20px] font-bold text-[#0c1a30] mb-3 tracking-tight">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#0c1a30]/40 max-w-[300px] mx-auto">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TRUST SECTION ──────────────────────────────────────
function TrustSection({ lang }: { lang: Lang }) {
  const techs = ['VSAT', 'HTS', 'Ku-Band', 'Ka-Band', 'LEO (Starlink)', 'LEO (OneWeb)', 'L-Band', 'GEO', 'DVB-S2', 'IP Multicast']
  return (
    <section className="py-16 bg-[#fafbfc] border-y border-[#0c1a30]/[0.03]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0c1a30]/25 mb-6">{lang === 'fr' ? 'Technologies compatibles' : 'Compatible Technologies'}</p>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map(t => (
              <span key={t} className="px-4 py-2 rounded-full border border-[#0c1a30]/[0.06] text-[12px] font-medium text-[#0c1a30]/35 hover:text-[#0c1a30]/60 hover:border-[#0c1a30]/15 transition-all cursor-default">{t}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FOOTER ─────────────────────────────────────────────
function Footer({ setPage, lang, onContact }: { setPage: (p: string) => void; lang: Lang; onContact: (mode?: ContactMode) => void }) {
  return (
    <footer className="bg-[#0c1a30] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[120px]" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-8">
        {/* Newsletter */}
        <div className="text-center mb-16 pb-16 border-b border-white/[0.06]">
          <h3 className="font-display text-[clamp(22px,3vw,32px)] font-bold text-white mb-3">{lang === 'fr' ? 'Restez informé' : 'Stay Updated'}</h3>
          <p className="text-[14px] text-white/30 mb-8 max-w-[400px] mx-auto">{lang === 'fr' ? 'Recevez nos actualités produit et innovations dans votre boîte mail.' : 'Get product news and innovations delivered to your inbox.'}</p>
          <div className="flex max-w-[440px] mx-auto gap-3">
            <input type="email" placeholder={lang === 'fr' ? 'Votre adresse email' : 'Your email address'} className="flex-1 px-5 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] text-white placeholder-white/25 focus:outline-none focus:border-white/20 transition-all" />
            <MagneticButton onClick={() => onContact('newsletter')} className="px-6 py-3 bg-white text-[#0c1a30] text-[13px] font-semibold rounded-xl hover:shadow-lg hover:shadow-white/10 transition-all active:scale-[0.97]">{lang === 'fr' ? "S'inscrire" : 'Subscribe'}</MagneticButton>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <img src={IMG.logoWhite} alt="Airmont" className="h-6 mb-6 opacity-80" />
            <p className="text-[13px] leading-relaxed text-white/30 max-w-[260px]">{T.footer.desc[lang]}</p>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/20 mb-5">{T.footer.solutions[lang]}</h4>
            <div className="space-y-3">{(['aviation', 'yachts', 'cruise', 'maritime'] as const).map(s => <button key={s} onClick={() => { setPage(s); window.scrollTo({ top: 0 }) }} className="block text-[14px] text-white/40 hover:text-white/80 transition-colors">{T.nav[s][lang]}</button>)}</div>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/20 mb-5">{T.footer.company[lang]}</h4>
            <div className="space-y-3">{[lang === 'fr' ? 'À propos' : 'About', 'Streamtime', lang === 'fr' ? 'Actualités' : 'News', 'Media Content'].map(k => <span key={k} className="block text-[14px] text-white/40 hover:text-white/80 transition-colors cursor-pointer">{k}</span>)}</div>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/20 mb-5">{T.footer.connect[lang]}</h4>
            <div className="space-y-3">{['LinkedIn', 'Twitter', 'Contact', lang === 'fr' ? 'Chat en direct' : 'Live Chat'].map(s => <span key={s} className="block text-[14px] text-white/40 hover:text-white/80 transition-colors cursor-pointer">{s}</span>)}</div>
          </div>
        </div>
        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/20">&copy; 2025 Airmont. {T.footer.rights[lang]}</p>
          <div className="flex gap-6"><span className="text-[12px] text-white/20 hover:text-white/40 transition-colors cursor-pointer">{T.footer.privacy[lang]}</span><span className="text-[12px] text-white/20 hover:text-white/40 transition-colors cursor-pointer">{T.footer.terms[lang]}</span><span className="text-[12px] text-white/20 hover:text-white/40 transition-colors cursor-pointer">Cookies</span></div>
        </div>
      </div>
    </footer>
  )
}

// ─── MEDIA PACKAGES ─────────────────────────────────────
const PKGS = [
  { t: { fr: 'Worldwide Starter TV', en: 'Worldwide Starter TV' }, d: { fr: "Meilleures chaînes internationales 24/7. Actualités, musique, mode et business en plusieurs langues.", en: 'Best international channels 24/7. News, music, fashion and business in multiple languages.' } },
  { t: { fr: 'JetVision by DIRECTV', en: 'JetVision by DIRECTV' }, d: { fr: "Sport, news, films et séries en direct sur les vols privés américains.", en: 'Live sports, news, movies and TV shows on US private flights.' } },
  { t: { fr: 'Worldwide Extended TV', en: 'Worldwide Extended TV' }, d: { fr: "Service TV inflight mondial avec droits de distribution sécurisés et optimisation des données.", en: 'Worldwide inflight TV with secured distribution rights and data optimization.' } },
  { t: { fr: 'Package Arabic TV', en: 'Arabic TV Package' }, d: { fr: "Divertissement arabe complet : films, séries, actualités, musique, programmes du Golfe et libanais.", en: 'Complete Arabic entertainment: movies, series, news, music, Gulf and Lebanese programming.' } },
  { t: { fr: 'Sports Highlights', en: 'Sports Highlights' }, d: { fr: "Couverture quotidienne football, tennis, basketball, NFL — analyses et temps forts.", en: 'Daily football, tennis, basketball, NFL — analysis and highlights.' } },
  { t: { fr: 'Package Régional Français', en: 'Regional French Package' }, d: { fr: "Actualités, séries, films, documentaires et contenus jeunesse. Droits Europe et zones maritimes.", en: 'News, series, movies, documentaries and children\'s content. Europe and maritime rights.' } },
]

// ─── HOME PAGE ──────────────────────────────────────────
function HomePage({ setPage, lang, onContact }: { setPage: (p: string) => void; lang: Lang; onContact: (mode?: ContactMode) => void }) {
  const segments = [
    { id: 'aviation', title: lang === 'fr' ? 'Jets & VIP' : 'Jets & VIP', sub: lang === 'fr' ? "Contenu favori en vol, coût internet réduit drastiquement." : 'Favourite content in-flight, internet cost drastically reduced.', img: IMG.vip },
    { id: 'yachts', title: lang === 'fr' ? 'Méga-Yachts' : 'Mega-Yachts', sub: lang === 'fr' ? "TV nationale fiable en pleine mer pour les décideurs." : 'Reliable national TV at sea for decision-makers.', img: IMG.yacht },
    { id: 'cruise', title: lang === 'fr' ? 'Croisières' : 'Cruise Lines', sub: lang === 'fr' ? "Streaming isolé, compressé et optimisé pour des milliers de passagers." : 'Isolated, compressed and optimized streaming for thousands.', img: IMG.cruise1 },
    { id: 'maritime', title: lang === 'fr' ? 'Maritime Marchand' : 'Merchant Maritime', sub: lang === 'fr' ? "Streaming fiable, qualité cristalline, bande passante minimale." : 'Reliable streaming, crystal-clear, minimal bandwidth.', img: IMG.cargo },
  ]
  const [activePkg, setActivePkg] = useState(0)

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0"><img src={IMG.home1} alt="" className="w-full h-full object-cover" style={{ animation: 'kenBurns 20s ease-in-out infinite alternate' }} /><div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/20" /><div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70" /></div>
        <ParticleField color="rgba(12,26,48,0.08)" count={40} />
        <GradientMesh />
        <ScrollIndicator />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
          <div className="max-w-[680px]">
            <Reveal><SectionLabel>{T.home.label[lang]}</SectionLabel></Reveal>
            <Reveal delay={120}>
              <h1 className="font-display text-[clamp(38px,5.5vw,74px)] font-bold leading-[0.95] tracking-[-0.02em] text-[#0c1a30] mb-8">
                <TextScramble text={T.home.h1_1[lang]} delay={400} /><br/><span className="gradient-text"><TextScramble text={T.home.h1_2[lang]} delay={700} /></span><br/><TextScramble text={T.home.h1_3[lang]} delay={1000} />
              </h1>
            </Reveal>
            <Reveal delay={240}><p className="text-[15px] lg:text-[17px] leading-relaxed text-[#0c1a30]/50 max-w-[540px] mb-10">{T.home.sub[lang]}</p></Reveal>
            <Reveal delay={360}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton onClick={() => document.getElementById('segments')?.scrollIntoView({ behavior: 'smooth' })} className="group px-8 py-3.5 bg-[#0c1a30] text-white text-[14px] font-semibold rounded-full hover:bg-[#162238] hover:shadow-xl hover:shadow-[#0c1a30]/15 transition-all active:scale-[0.97]">{T.home.cta1[lang]}<span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span></MagneticButton>
                <MagneticButton onClick={() => onContact('demo')} className="px-8 py-3.5 text-[14px] font-semibold text-[#0c1a30]/60 hover:text-[#0c1a30] rounded-full border border-[#0c1a30]/10 hover:border-[#0c1a30]/20 hover:bg-white/60 transition-all">{T.home.cta2[lang]}</MagneticButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={500}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-[#0c1a30]/[0.06]">
              <StatBlock value={10000} suffix="+" label={lang === 'fr' ? 'Heures de vol en service' : 'Flight Hours in Service'} />
              <StatBlock value={6} suffix="" label={lang === 'fr' ? 'Marchés desservis' : 'Markets Served'} />
              <StatBlock value={5} suffix="" label={lang === 'fr' ? 'Brevets déposés' : 'Patents Filed'} />
              <StatBlock value={40} suffix="%" label={lang === 'fr' ? 'Bande passante économisée' : 'Bandwidth Saved'} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="bg-[#0c1a30] py-5 overflow-hidden">
        <Marquee items={['Streamtime', 'Airmont Cast', 'Airmont TV', 'JetVision', 'Media Content', 'VSAT', 'HTS', 'LEO', 'GEO-LEO', 'DVB-S2']} />
      </div>

      {/* ═══ IMPACT STATS ═══ */}
      <ImpactStats lang={lang} />

      {/* ═══ HOW IT WORKS ═══ */}
      <HowItWorks lang={lang} />

      {/* ═══ TRUST SECTION ═══ */}
      <TrustSection lang={lang} />

      {/* ═══ PARTNER LOGOS ═══ */}
      <PartnerLogos lang={lang} />

      {/* ═══ SATELLITE COVERAGE MAP ═══ */}
      <SatelliteCoverageMap lang={lang} />

      {/* ═══ SEGMENTS ═══ */}
      <section id="segments" className="py-24 lg:py-32 relative overflow-hidden">
        <GradientMesh />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-16 lg:mb-20">
            <SectionLabel>{lang === 'fr' ? 'Nos marchés' : 'Our Markets'}</SectionLabel>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-[#0c1a30] leading-[1.1]">{lang === 'fr' ? 'Une technologie. Chaque environnement.' : 'One technology. Every environment.'}</h2>
            <p className="mt-5 text-[16px] text-[#0c1a30]/35 max-w-[520px] mx-auto">{lang === 'fr' ? "Des jets privés aux navires marchands, notre plateforme s'adapte." : 'From private jets to cargo ships, our platform adapts.'}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {segments.map((seg, i) => (
              <Reveal key={seg.id} delay={i * 100}>
                <TiltCard><div className="group relative overflow-hidden rounded-[20px] min-h-[380px] cursor-pointer" onClick={() => { setPage(seg.id); window.scrollTo({ top: 0 }) }}>
                  <img src={seg.img} alt={seg.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 group-hover:from-black/90 transition-all duration-500" />
                  <div className="relative z-10 flex flex-col justify-end h-full min-h-[380px] p-10 lg:p-12">
                    <h3 className="text-[26px] lg:text-[30px] font-display font-bold text-white mb-3 tracking-tight">{seg.title}</h3>
                    <p className="text-[14px] lg:text-[15px] leading-relaxed text-white/55 max-w-[380px] mb-6">{seg.sub}</p>
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-white/40 group-hover:text-white transition-colors duration-300">
                      {lang === 'fr' ? 'Explorer' : 'Explore'}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div></TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="py-24 lg:py-32 bg-[#fafbfc]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <SectionLabel>{lang === 'fr' ? 'Nos produits' : 'Our Products'}</SectionLabel>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-[#0c1a30] leading-[1.1]">Streamtime & Media Content</h2>
            <p className="mt-5 text-[16px] text-[#0c1a30]/35 max-w-[520px] mx-auto">{lang === 'fr' ? "TV en direct, streaming et contenus média pour l'embarqué." : 'Live TV, streaming, and media content for onboard.'}</p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Reveal>
              <div className="space-y-2">
                {PKGS.map((pkg, i) => (
                  <button key={i} onClick={() => setActivePkg(i)} className={`w-full text-left p-5 rounded-2xl border transition-all duration-400 ${activePkg === i ? 'bg-white border-[#0c1a30]/10 shadow-lg shadow-black/[0.04]' : 'bg-transparent border-transparent hover:bg-white/60'}`}>
                    <div className="flex items-start gap-4">
                      <span className={`text-[11px] font-bold tracking-wider mt-1 ${activePkg === i ? 'text-blue-600' : 'text-[#0c1a30]/20'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h4 className={`text-[16px] font-semibold tracking-tight transition-colors ${activePkg === i ? 'text-[#0c1a30]' : 'text-[#0c1a30]/50'}`}>{pkg.t[lang]}</h4>
                        <div className={`overflow-hidden transition-all duration-400 ${activePkg === i ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                          <p className="text-[14px] leading-relaxed text-[#0c1a30]/40">{pkg.d[lang]}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group">
                <img src={IMG.streaming} alt="Airmont" className="w-full h-[300px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a30]/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8"><LiveBadge text={lang === 'fr' ? 'Disponible 24/7 — Couverture mondiale' : 'Available 24/7 — Worldwide Coverage'} /></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ DIRECTV PARTNERSHIP HIGHLIGHT ═══ */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-r from-[#0c1a30] via-[#0f2341] to-[#0c1a30]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(59,130,246,0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(139,92,246,0.2), transparent 50%)' }} />
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="shrink-0 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center">
                  <img src={IMG.logo} alt="Airmont" className="w-10 h-10 object-contain brightness-0 invert opacity-60" />
                </div>
                <span className="text-[24px] text-white/15 font-light">&times;</span>
                <div className="w-16 h-16 rounded-2xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center">
                  <span className="text-[14px] font-bold text-white/60 tracking-tight">DIRECTV</span>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold tracking-[0.15em] uppercase text-purple-300/70 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />{lang === 'fr' ? 'Partenariat stratégique 2025' : 'Strategic Partnership 2025'}
                </div>
                <h3 className="font-display text-[clamp(20px,2.5vw,28px)] font-bold text-white tracking-tight leading-tight mb-2">
                  JetVision by DIRECTV
                </h3>
                <p className="text-[14px] text-white/30 max-w-[500px]">
                  {lang === 'fr'
                    ? "Sport en direct, actualités, films et séries sur les vols privés américains. La télévision premium arrive à bord des jets d'affaires."
                    : 'Live sports, news, movies and series on US private flights. Premium television arrives onboard business jets.'}
                </p>
              </div>
              <div className="shrink-0">
                <MagneticButton onClick={() => document.getElementById('tech-section')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 text-[13px] font-semibold text-white/60 hover:text-white rounded-full border border-white/15 hover:border-white/30 transition-all">
                  {lang === 'fr' ? 'Voir la technologie' : 'See Technology'}<span className="ml-2">&darr;</span>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TECHNOLOGY + SATELLITE + DATA VIZ ═══ */}
      <section id="tech-section" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0"><img src={IMG.tech} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-[#0c1a30]/[0.96]" /></div>
        <ParticleField color="rgba(255,255,255,0.1)" count={50} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <SectionLabel light>{lang === 'fr' ? 'Technologie' : 'Technology'}</SectionLabel>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-white leading-[1.1]">
              {lang === 'fr' ? 'Optimisation ' : 'Streaming '}<span className="gradient-text-light">{lang === 'fr' ? 'du streaming.' : 'optimization.'}</span>
            </h2>
            <p className="mt-5 text-[16px] text-white/30 max-w-[560px] mx-auto">{lang === 'fr' ? "Streamtime est un service d'optimisation du streaming vidéo en mode SaaS." : 'Streamtime is a video streaming optimization as-a-service solution.'}</p>
          </Reveal>

          {/* Streaming flow diagram — shows how Airmont optimizes data */}
          <Reveal className="mb-10"><StreamingFlowDiagram lang={lang} /></Reveal>

          {/* Mutualisation visual — the killer feature */}
          <Reveal className="mb-16"><MutualisationViz lang={lang} /></Reveal>

          {/* Streamtime tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { t: 'Streamtime Platinum', d: lang === 'fr' ? 'Compression maximale, qualité maximale, données minimales.' : 'Maximum compression, maximum quality, minimum data.', tier: 'PLATINUM', color: 'from-blue-500/20 to-purple-500/20 text-blue-300' },
              { t: 'Streamtime Silver', d: lang === 'fr' ? 'Meilleur équilibre qualité/données.' : 'Best balance between quality and data.', tier: 'SILVER', color: 'bg-white/10 text-white/50' },
              { t: 'Streamtime Bronze', d: lang === 'fr' ? 'Bonne compression à prix limité.' : 'Good compression at limited cost.', tier: 'BRONZE', color: 'bg-amber-500/15 text-amber-300/70' },
              { t: 'Airmont Cast', d: lang === 'fr' ? 'Wi-Fi + cast en 2 étapes.' : 'Wi-Fi + cast in 2 steps.', tier: 'CAST', color: 'bg-green-500/15 text-green-300/70' },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 120}>
                <TiltCard className="h-full">
                  <div className="h-full p-7 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-300 group cursor-default">
                    <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] mb-5 ${f.tier === 'PLATINUM' ? 'bg-gradient-to-r ' : ''}${f.color}`}>{f.tier}</div>
                    <h3 className="text-[17px] font-semibold text-white mb-3">{f.t}</h3>
                    <p className="text-[13px] leading-relaxed text-white/30">{f.d}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* Real-time bandwidth viz */}
          <Reveal>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30">{lang === 'fr' ? 'Principe d\'optimisation — Illustration' : 'Optimization Principle — Illustration'}</span>
              </div>
              <BandwidthViz lang={lang} />
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center"><div className="text-[28px] font-display font-bold text-emerald-400/60">-40%</div><div className="text-[10px] text-white/20 mt-1">{lang === 'fr' ? 'Bande passante' : 'Bandwidth'}</div></div>
                <div className="text-center"><div className="text-[28px] font-display font-bold text-white/40">HD</div><div className="text-[10px] text-white/20 mt-1">{lang === 'fr' ? 'Qualité maintenue' : 'Quality maintained'}</div></div>
                <div className="text-center"><div className="text-[28px] font-display font-bold text-blue-400/60">0</div><div className="text-[10px] text-white/20 mt-1">{lang === 'fr' ? 'Buffering' : 'Buffering'}</div></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ BEFORE/AFTER SLIDER ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0c1a30]">
        <ParticleField color="rgba(255,255,255,0.06)" count={25} />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <SectionLabel light>{lang === 'fr' ? 'Comparaison' : 'Comparison'}</SectionLabel>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-white leading-[1.1]">
              {lang === 'fr' ? 'Avant / Après Airmont' : 'Before / After Airmont'}
            </h2>
            <p className="mt-4 text-[14px] text-white/25">{lang === 'fr' ? 'Glissez pour comparer la consommation de bande passante.' : 'Slide to compare bandwidth consumption.'}</p>
          </Reveal>
          <Reveal><BandwidthSlider lang={lang} /></Reveal>
        </div>
      </section>

      {/* ═══ SATCOM LAB ═══ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <GradientMesh />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <SectionLabel>{lang === 'fr' ? 'Satcom Lab' : 'Satcom Lab'}</SectionLabel>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-[#0c1a30] leading-[1.1] mb-6">
                {lang === 'fr' ? "Testez avant de déployer." : 'Test before you deploy.'}
              </h2>
              <p className="text-[15px] leading-relaxed text-[#0c1a30]/45 mb-8 max-w-[460px]">
                {lang === 'fr'
                  ? "Notre laboratoire de démonstration permet d'évaluer les solutions avec des équipements réels — L-Band, VSAT, LEO, et simulateurs de liens satellite IP."
                  : 'Our demonstration laboratory supports solution evaluation using real equipment — L-Band, VSAT, LEO, and IP satellite link simulators.'}
              </p>
              <div className="space-y-4 mb-8">
                {(lang === 'fr'
                  ? ['Équipements L-Band et VSAT réels', 'Simulateurs de liens satellite IP', 'Constellations LEO (Starlink, OneWeb)', 'Test en conditions réelles de service']
                  : ['Real L-Band and VSAT equipment', 'IP satellite link simulators', 'LEO constellations (Starlink, OneWeb)', 'Real service condition testing']
                ).map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
                    </div>
                    <span className="text-[14px] text-[#0c1a30]/50">{item}</span>
                  </div>
                ))}
              </div>
              <MagneticButton onClick={() => {}} className="group px-8 py-3.5 bg-[#0c1a30] text-white text-[14px] font-semibold rounded-full hover:bg-[#162238] hover:shadow-xl hover:shadow-[#0c1a30]/15 transition-all active:scale-[0.97]">
                {lang === 'fr' ? 'Réserver une visite' : 'Book a Visit'}<span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </MagneticButton>
            </Reveal>
            <Reveal delay={200}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group">
                  <img src={IMG.tech} alt="Satcom Lab" className="w-full h-[340px] lg:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a30]/40 to-transparent" />
                </div>
                {/* Floating badges */}
                <div className="absolute -top-3 -right-3 px-4 py-2 rounded-xl glass shadow-lg text-[11px] font-semibold text-[#0c1a30]" style={{ animation: 'float 6s ease-in-out infinite' }}>
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse" />{lang === 'fr' ? 'Lab opérationnel' : 'Lab operational'}
                </div>
                <div className="absolute -bottom-3 -left-3 px-4 py-2 rounded-xl glass shadow-lg text-[11px] font-semibold text-[#0c1a30]" style={{ animation: 'float 6s ease-in-out infinite 2s' }}>
                  L-Band &middot; VSAT &middot; LEO
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ HORIZONTAL GALLERY ═══ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-8">
          <Reveal>
            <SectionLabel>{lang === 'fr' ? 'Galerie' : 'Gallery'}</SectionLabel>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-[#0c1a30] leading-[1.1]">{lang === 'fr' ? 'Découvrez nos environnements' : 'Discover our environments'}</h2>
          </Reveal>
        </div>
        <div className="px-6 lg:px-10">
          <HorizontalGallery images={[
            { src: IMG.home2, label: lang === 'fr' ? 'Cabine jet privé' : 'Private jet cabin' },
            { src: IMG.vip, label: lang === 'fr' ? 'Service VIP' : 'VIP service' },
            { src: IMG.cruise2, label: lang === 'fr' ? 'Croisière' : 'Cruise' },
            { src: IMG.yacht, label: lang === 'fr' ? 'Superyacht' : 'Superyacht' },
            { src: IMG.maritime1, label: lang === 'fr' ? 'Maritime' : 'Maritime' },
            { src: IMG.streaming, label: 'Streamtime' },
          ]} />
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-20 lg:py-28 bg-[#fafbfc]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal className="max-w-[800px] mx-auto text-center">
            <SectionLabel>{lang === 'fr' ? 'Notre promesse' : 'Our Promise'}</SectionLabel>
            <blockquote className="font-display text-[clamp(22px,3.2vw,38px)] font-medium text-[#0c1a30] leading-[1.3] tracking-tight italic">
              {lang === 'fr' ? '"Les passagers profitent d\'un temps d\'écran de qualité ininterrompu, tout en consommant beaucoup moins de bande passante."' : '"Passengers enjoy uninterrupted quality screen time, while using much less internet bandwidth."'}
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#0c1a30]/5 flex items-center justify-center bg-[#0c1a30]/5"><img src={IMG.logo} alt="" className="w-8 h-8 object-contain" /></div>
              <div className="text-left"><div className="text-[14px] font-semibold text-[#0c1a30]">Airmont</div><div className="text-[12px] text-[#0c1a30]/35">{lang === 'fr' ? 'Terre, Mer & Air' : 'Land, Sea & Air'}</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ LEADERSHIP ═══ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <SectionLabel>{lang === 'fr' ? 'Direction' : 'Leadership'}</SectionLabel>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-[#0c1a30] leading-[1.1]">{lang === 'fr' ? "L'expertise au sommet" : 'Expertise at the Top'}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {[
              { name: 'Jean-François Gault', role: { fr: 'Président Exécutif & Fondateur', en: 'Executive Chairman & Founder' }, focus: { fr: 'Ex-CTO Satcom1 (Honeywell) · 5 brevets', en: 'Former CTO Satcom1 (Honeywell) · 5 patents' }, bio: { fr: "Co-fondateur et CTO de Satcom1, racheté par Honeywell. Fondateur et CEO d'Altilink. Leader logiciel avionique chez Thrane&Thrane. Inventeur, titulaire de 5 brevets dans l'optimisation de données satellite.", en: 'Co-founder and CTO of Satcom1, acquired by Honeywell. Founder and CEO of Altilink. Avionics software leader at Thrane&Thrane. Inventor, holds 5 patents in satellite data optimization.' } },
              { name: 'Fabrice Laboulandine', role: { fr: 'Directeur Général', en: 'CEO' }, focus: { fr: 'Ex-officier télécoms Présidence de la République', en: 'Former telecom officer, French Presidency' }, bio: { fr: "Officier télécommunications sécurisées de la Présidence de la République française. Expert SATCOM forces armées et Marine nationale. Ex-CTO Groupe Daher, CIO Webhelp Europe, directeur IT Legrand.", en: 'Secure telecommunications officer for the French Republic Presidency. Armed forces & Navy SATCOM expert. Former Daher Group CTO, Webhelp Europe CIO, Legrand IT Director.' } },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 150}>
                <TiltCard>
                  <div className="p-8 lg:p-10 rounded-2xl bg-white border border-[#0c1a30]/[0.04] hover:shadow-xl hover:shadow-black/[0.05] transition-all duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0c1a30] to-blue-900 flex items-center justify-center mb-6"><span className="text-white text-[20px] font-display font-bold">{p.name.split(' ').map(n => n[0]).join('')}</span></div>
                    <h3 className="text-[20px] font-bold text-[#0c1a30] tracking-tight mb-1">{p.name}</h3>
                    <p className="text-[13px] font-semibold text-blue-600/70 mb-1">{p.role[lang]}</p>
                    <p className="text-[12px] text-[#0c1a30]/30 font-medium mb-4">{p.focus[lang]}</p>
                    <p className="text-[14px] leading-relaxed text-[#0c1a30]/45">{p.bio[lang]}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-[24px] min-h-[460px] flex items-center justify-center group">
              <img src={IMG.heroJet} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" style={{ animation: 'kenBurns 25s ease-in-out infinite alternate' }} />
              <div className="absolute inset-0 bg-[#0c1a30]/80 group-hover:bg-[#0c1a30]/85 transition-colors duration-500" />
              <ParticleField color="rgba(255,255,255,0.08)" count={30} />
              <div className="relative z-10 text-center px-6 py-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-8"><span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />{lang === 'fr' ? 'Terre, Mer & Air' : 'Land, Sea & Air'}</div>
                <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-white tracking-tight leading-[1.15] mb-5">{lang === 'fr' ? 'Prêt à transformer votre expérience à bord ?' : 'Ready to transform your onboard experience?'}</h2>
                <p className="text-[17px] text-white/40 max-w-[500px] mx-auto mb-10">{lang === 'fr' ? "Découvrez comment Airmont optimise le streaming pour les environnements les plus exigeants." : 'Discover how Airmont optimizes streaming for the most demanding environments.'}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <MagneticButton onClick={() => onContact('demo')} className="group/btn px-8 py-3.5 bg-white text-[#0c1a30] text-[14px] font-semibold rounded-full hover:shadow-xl hover:shadow-white/15 transition-all active:scale-[0.97]">{lang === 'fr' ? 'Demander une démo' : 'Request a Demo'}<span className="inline-block ml-2 group-hover/btn:translate-x-1 transition-transform">&rarr;</span></MagneticButton>
                  <MagneticButton onClick={() => onContact('expert')} className="px-8 py-3.5 text-[14px] font-semibold text-white/50 hover:text-white rounded-full border border-white/15 hover:border-white/30 transition-all">{lang === 'fr' ? 'Parler à un expert' : 'Talk to an Expert'}</MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

// ─── SEGMENT DATA ───────────────────────────────────────
type I18n = Record<Lang, string>
interface SegData { name: I18n; headline: I18n; sub: I18n; heroImg: string; features: { title: I18n; desc: I18n; icon: string }[]; stats: { value: number; suffix: string; label: I18n }[]; useCases: { title: I18n; desc: I18n; img: string }[]; ctaImg: string }

const SEGS: Record<string, SegData> = {
  aviation: {
    name: { fr: 'Aviation (Jets & VIP)', en: 'Aviation (Jets & VIP)' }, headline: { fr: 'TV & Streaming\npour jets.', en: 'TV & Streaming\nfor jets.' }, sub: { fr: "Les passagers profitent de leur contenu favori tout en réduisant drastiquement le coût du service internet.", en: 'Passengers enjoy their chosen content while drastically reducing internet service cost.' }, heroImg: IMG.heroJet,
    features: [
      { title: { fr: 'Airmont TV', en: 'Airmont TV' }, desc: { fr: "Accès aux chaînes nationales en vol, en service depuis 2019 avec plus de 10 000 heures. Fonctionne même avec connectivité limitée.", en: 'National TV channels in-flight, in service since 2019 with over 10,000 hours. Works with limited connectivity.' }, icon: '01' },
      { title: { fr: 'Airmont Cast', en: 'Airmont Cast' }, desc: { fr: "Wi-Fi local puis diffusion depuis mobile en 2 étapes. Fonctionne dans les airs, en mer, à l'hôtel.", en: 'Local Wi-Fi then cast from mobile in 2 steps. Works in air, at sea, in hotels.' }, icon: '02' },
      { title: { fr: 'JetVision by DIRECTV', en: 'JetVision by DIRECTV' }, desc: { fr: "Sport, news, films et séries en direct sur vols privés US. Sans installation supplémentaire.", en: 'Live sports, news, movies on US private flights. No additional installation.' }, icon: '03' },
      { title: { fr: 'Services d\'ingénierie', en: 'Engineering Services' }, desc: { fr: "Expertise streaming embarqué et connectivité. Routage satellite avancé, VoIP, cybersécurité.", en: 'Onboard streaming and connectivity expertise. Advanced satellite routing, VoIP, cybersecurity.' }, icon: '04' },
    ],
    stats: [{ value: 10000, suffix: '+', label: { fr: 'Heures de vol', en: 'Flight Hours' } }, { value: 5, suffix: '', label: { fr: 'Brevets', en: 'Patents' } }, { value: 2019, suffix: '', label: { fr: 'En service depuis', en: 'In Service Since' } }],
    useCases: [
      { title: { fr: 'Services dignitaires', en: 'Dignitary Services' }, desc: { fr: "Chaînes nationales lors de déplacements officiels. Fiable même en urgence.", en: 'National channels during official trips. Reliable even in emergencies.' }, img: IMG.vip },
      { title: { fr: 'Vols charter VIP', en: 'VIP Charter Flights' }, desc: { fr: "Reprenez votre série à 40 000 pieds. Qualité streaming sans compromis.", en: 'Resume your series at 40,000 feet. Uncompromised streaming quality.' }, img: IMG.home1 },
      { title: { fr: 'Aviation d\'affaires', en: 'Business Aviation' }, desc: { fr: "Actualités en direct et connectivité pendant vos vols long-courriers.", en: 'Live news and connectivity during long-haul flights.' }, img: IMG.home2 },
    ], ctaImg: IMG.vip,
  },
  yachts: {
    name: { fr: 'Méga-Yachts', en: 'Mega-Yachts' }, headline: { fr: 'TV fiable\nen pleine mer.', en: 'Reliable TV\nat sea.' }, sub: { fr: "TV haute qualité — les décideurs accèdent à leur télévision nationale, même au milieu de l'océan.", en: 'High-quality TV — decision-makers access national television, even mid-ocean.' }, heroImg: IMG.heroYacht,
    features: [
      { title: { fr: 'Optimisation VSAT', en: 'VSAT Optimization' }, desc: { fr: "HD sur écrans principaux et streaming personnel en cabine. Connexions VSAT maximisées.", en: 'HD on main screens and personal cabin streaming. Maximized VSAT connections.' }, icon: '01' },
      { title: { fr: 'Contrôle capitaine', en: 'Captain Control' }, desc: { fr: "Allocation de bande passante pour protéger les ressources internet critiques.", en: 'Bandwidth allocation to protect critical internet resources.' }, icon: '02' },
      { title: { fr: 'Casting personnel', en: 'Personal Casting' }, desc: { fr: "Airmont Cast — Wi-Fi + cast en 2 étapes depuis appareils personnels.", en: 'Airmont Cast — Wi-Fi + cast in 2 steps from personal devices.' }, icon: '03' },
      { title: { fr: 'Technologie GEO-LEO', en: 'GEO-LEO Technology' }, desc: { fr: "VSAT traditionnel et LEO (Starlink, OneWeb). Distribution multicast optimisée.", en: 'Traditional VSAT and LEO (Starlink, OneWeb). Optimized multicast distribution.' }, icon: '04' },
    ],
    stats: [{ value: 40, suffix: '%', label: { fr: 'BP économisée', en: 'BW Saved' } }, { value: 24, suffix: '/7', label: { fr: 'Disponibilité', en: 'Availability' } }, { value: 6, suffix: '', label: { fr: 'Packages TV', en: 'TV Packages' } }],
    useCases: [
      { title: { fr: 'Propriétaire privé', en: 'Owner Operated' }, desc: { fr: "TV nationale et contenus favoris partout dans le monde, directement à bord.", en: 'National TV and favourite content worldwide, directly on board.' }, img: IMG.yacht },
      { title: { fr: 'Flotte charter', en: 'Charter Fleet' }, desc: { fr: "Divertissement classe mondiale sans compromettre la navigation.", en: 'World-class entertainment without compromising navigation.' }, img: IMG.cruise2 },
      { title: { fr: 'Yachts d\'exploration', en: 'Explorer Yachts' }, desc: { fr: "Couverture satellite fiable via GEO et LEO, même en zones reculées.", en: 'Reliable satellite coverage via GEO and LEO, even in remote areas.' }, img: IMG.maritime1 },
    ], ctaImg: IMG.yacht,
  },
  cruise: {
    name: { fr: 'Croisières', en: 'Cruise Lines' }, headline: { fr: 'Streaming\noptimisé.', en: 'Optimized\nstreaming.' }, sub: { fr: "Airmont isole, compresse et optimise le trafic vidéo sur les navires de croisière.", en: 'Airmont isolates, compresses and optimizes video traffic on cruise ships.' }, heroImg: IMG.heroCruise,
    features: [
      { title: { fr: 'Isolation du streaming', en: 'Streaming Isolation' }, desc: { fr: "Le flux vidéo est isolé du reste du trafic internet pour une navigation fluide.", en: 'Video streams isolated from other internet traffic for smooth browsing.' }, icon: '01' },
      { title: { fr: 'Satellite HTS', en: 'HTS Satellite' }, desc: { fr: "Connexions High Throughput Satellite pour un streaming auparavant impossible en croisière.", en: 'HTS connections for streaming previously impossible on cruise ships.' }, icon: '02' },
      { title: { fr: 'Préservation BP', en: 'BW Preservation' }, desc: { fr: "Le streaming optimisé préserve la bande passante pour navigation et communications.", en: 'Optimized streaming preserves bandwidth for navigation and communications.' }, icon: '03' },
      { title: { fr: 'Multi-packages', en: 'Multi-Packages' }, desc: { fr: "6 packages TV : Starter, Extended, Arabic, Sports, Régional Français. Adaptez à votre clientèle.", en: '6 TV packages: Starter, Extended, Arabic, Sports, Regional French. Tailor to your clientele.' }, icon: '04' },
    ],
    stats: [{ value: 40, suffix: '%', label: { fr: 'BP économisée', en: 'BW Saved' } }, { value: 6, suffix: '', label: { fr: 'Packages', en: 'Packages' } }, { value: 24, suffix: '/7', label: { fr: 'Couverture mondiale', en: 'Global Coverage' } }],
    useCases: [
      { title: { fr: 'Croisières océaniques', en: 'Ocean Cruises' }, desc: { fr: "Streaming optimisé pour transatlantiques et Méditerranée.", en: 'Optimized streaming for transatlantic and Mediterranean.' }, img: IMG.cruise1 },
      { title: { fr: 'Croisières expédition', en: 'Expedition Cruises' }, desc: { fr: "Diffusion fiable via GEO et LEO pour destinations polaires.", en: 'Reliable delivery via GEO and LEO for polar destinations.' }, img: IMG.cruise2 },
      { title: { fr: 'Croisières fluviales', en: 'River Cruises' }, desc: { fr: "Solutions pour navires plus petits avec packages régionaux.", en: 'Solutions for smaller vessels with regional packages.' }, img: IMG.transport },
    ], ctaImg: IMG.cruise1,
  },
  maritime: {
    name: { fr: 'Maritime Marchand', en: 'Merchant Maritime' }, headline: { fr: 'Bien-être\ndes équipages.', en: 'Crew welfare,\nredefined.' }, sub: { fr: "Streaming vidéo fiable, qualité cristalline, bande passante minimale.", en: 'Reliable video streaming, crystal-clear quality, minimal bandwidth.' }, heroImg: IMG.heroMaritime,
    features: [
      { title: { fr: 'Sans géo-restriction', en: 'Geo-Restriction Free' }, desc: { fr: "Chaînes internationales sous licence, sans restrictions géographiques. TV nationale partout.", en: 'Licensed international channels without geo-restrictions. National TV everywhere.' }, icon: '01' },
      { title: { fr: 'Casting embarqué', en: 'Onboard Casting' }, desc: { fr: "Équipages diffusent depuis appareils personnels sur écrans communs via Airmont Cast.", en: 'Crew cast from personal devices to common screens via Airmont Cast.' }, icon: '02' },
      { title: { fr: 'Compression optimale', en: 'Optimal Compression' }, desc: { fr: "Minimise la bande passante tout en maintenant une qualité cristalline.", en: 'Minimizes bandwidth while maintaining crystal-clear quality.' }, icon: '03' },
      { title: { fr: 'Multi-satellite', en: 'Multi-Satellite' }, desc: { fr: "VSAT et constellations LEO émergentes. Distribution multicast optimisée.", en: 'VSAT and emerging LEO constellations. Optimized multicast distribution.' }, icon: '04' },
    ],
    stats: [{ value: 40, suffix: '%', label: { fr: 'BP économisée', en: 'BW Saved' } }, { value: 6, suffix: '', label: { fr: 'Packages TV', en: 'TV Packages' } }, { value: 24, suffix: '/7', label: { fr: 'Disponibilité', en: 'Availability' } }],
    useCases: [
      { title: { fr: 'Porte-conteneurs', en: 'Container Ships' }, desc: { fr: "Divertissement fiable pour équipages passant des mois en mer. TV nationale sans restriction.", en: 'Reliable entertainment for crews spending months at sea. Unrestricted national TV.' }, img: IMG.cargo },
      { title: { fr: 'Tankers', en: 'Tankers' }, desc: { fr: "Streaming optimisé pour tankers GNL, brut et chimiques. Qualité cristalline.", en: 'Optimized streaming for LNG, crude and chemical tankers.' }, img: IMG.maritime1 },
      { title: { fr: 'Plateformes offshore', en: 'Offshore Platforms' }, desc: { fr: "Divertissement et connectivité pour plateformes pétrole, gaz et éolien.", en: 'Entertainment for offshore oil, gas and wind platforms.' }, img: IMG.transport },
    ], ctaImg: IMG.cargo,
  },
}

// ─── SEGMENT PAGE ───────────────────────────────────────
function SegmentPage({ data, lang, onContact }: { data: SegData; lang: Lang; onContact: (mode?: ContactMode) => void }) {
  return (
    <div>
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <img src={data.heroImg} alt={data.name[lang]} className="absolute inset-0 w-full h-full object-cover" style={{ animation: 'kenBurns 20s ease-in-out infinite alternate' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15" /><div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <ParticleField color="rgba(255,255,255,0.08)" count={35} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 pt-32 w-full">
          <div className="max-w-[700px]">
            <Reveal><SectionLabel light>{data.name[lang]}</SectionLabel></Reveal>
            <Reveal delay={120}><h1 className="font-display text-[clamp(40px,6vw,76px)] font-bold text-white leading-[0.95] tracking-[-0.02em] whitespace-pre-line mb-8"><TextScramble text={data.headline[lang]} delay={400} /></h1></Reveal>
            <Reveal delay={240}><p className="text-[17px] lg:text-[19px] leading-relaxed text-white/50 max-w-[500px] mb-10">{data.sub[lang]}</p></Reveal>
            <Reveal delay={360}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton onClick={() => onContact('demo')} className="group px-8 py-3.5 bg-white text-[#0c1a30] text-[14px] font-semibold rounded-full hover:shadow-xl transition-all active:scale-[0.97]">{T.seg.demo[lang]}<span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span></MagneticButton>
                <MagneticButton onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 text-[14px] font-semibold text-white/50 hover:text-white rounded-full border border-white/12 hover:border-white/30 transition-all">{T.seg.specs[lang]}</MagneticButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={500}><div className="mt-16 grid grid-cols-3 gap-8 md:gap-12 pt-10 border-t border-white/[0.08] max-w-[700px]">{data.stats.map(s => <StatBlock key={s.label[lang]} value={s.value} suffix={s.suffix} label={s.label[lang]} light />)}</div></Reveal>
        </div>
      </section>
      <section id="features" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <GradientMesh />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal className="mb-16"><SectionLabel>{T.seg.capLabel[lang]}</SectionLabel><h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-[#0c1a30] leading-[1.1]">{T.seg.capH2[lang]}</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.features.map((f, i) => (
              <Reveal key={f.title[lang]} delay={i * 100}><TiltCard className="h-full"><GlowCard className="h-full group">
                <div className="h-full p-8 lg:p-10 rounded-2xl bg-white border border-[#0c1a30]/[0.04] transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.06] hover:border-[#0c1a30]/[0.08]">
                  <div className="w-14 h-14 rounded-2xl bg-[#0c1a30]/[0.03] flex items-center justify-center mb-6 text-[14px] font-bold text-[#0c1a30]/20 group-hover:bg-[#0c1a30]/[0.06] group-hover:text-[#0c1a30]/40 transition-all duration-300">{f.icon}</div>
                  <h3 className="text-[18px] font-semibold text-[#0c1a30] mb-3 tracking-tight">{f.title[lang]}</h3>
                  <p className="text-[14px] leading-[1.7] text-[#0c1a30]/45">{f.desc[lang]}</p>
                </div>
              </GlowCard></TiltCard></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 lg:py-32 bg-[#f8f9fb]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal className="mb-16"><SectionLabel>{T.seg.ucLabel[lang]}</SectionLabel><h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-[#0c1a30] leading-[1.1]">{T.seg.ucH2[lang]}</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.useCases.map((uc, i) => (
              <Reveal key={uc.title[lang]} delay={i * 120}><TiltCard className="h-full">
                <div className="h-full overflow-hidden rounded-2xl bg-white border border-[#0c1a30]/[0.04] transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.06] group">
                  <div className="h-[200px] overflow-hidden"><img src={uc.img} alt={uc.title[lang]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
                  <div className="p-7"><h3 className="text-[17px] font-semibold text-[#0c1a30] mb-3 tracking-tight">{uc.title[lang]}</h3><p className="text-[14px] leading-[1.7] text-[#0c1a30]/40">{uc.desc[lang]}</p></div>
                </div>
              </TiltCard></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal><div className="relative overflow-hidden rounded-[24px] min-h-[380px] flex items-center justify-center group">
            <img src={data.ctaImg} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#0c1a30]/80 group-hover:bg-[#0c1a30]/85 transition-colors duration-500" />
            <div className="relative z-10 text-center px-6 py-16">
              <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold text-white tracking-tight mb-5">{T.seg.ctaH2[lang]}</h2>
              <p className="text-[16px] text-white/35 mb-10">{T.seg.ctaSub[lang]} {data.name[lang].toLowerCase()}.</p>
              <MagneticButton onClick={() => onContact('contact')} className="group/b px-8 py-3.5 bg-white text-[#0c1a30] text-[14px] font-semibold rounded-full hover:shadow-xl hover:shadow-white/15 transition-all active:scale-[0.97]">{T.seg.ctaBtn[lang]}<span className="inline-block ml-2 group-hover/b:translate-x-1 transition-transform">&rarr;</span></MagneticButton>
            </div>
          </div></Reveal>
        </div>
      </section>
    </div>
  )
}

// ─── APP ────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState('home')
  const [lang, setLang] = useState<Lang>('fr')
  const [contactOpen, setContactOpen] = useState(false)
  const [contactMode, setContactMode] = useState<ContactMode>('demo')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [page])

  const openContact = (mode: ContactMode = 'demo') => {
    setContactMode(mode)
    setContactOpen(true)
  }

  const content = page === 'home'
    ? <HomePage setPage={setPage} lang={lang} onContact={openContact} />
    : SEGS[page]
      ? <SegmentPage data={SEGS[page]} lang={lang} onContact={openContact} />
      : <HomePage setPage={setPage} lang={lang} onContact={openContact} />

  return (
    <div className="min-h-screen">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <ScrollProgress />
      <CursorGlow />
      <Navbar currentPage={page} setPage={setPage} lang={lang} setLang={setLang} onContact={openContact} />
      <main><PageTransition pageKey={page}>{content}</PageTransition></main>
      <Footer setPage={setPage} lang={lang} onContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} lang={lang} mode={contactMode} />
      {loaded && <LiveToasts lang={lang} />}
    </div>
  )
}

export default App
