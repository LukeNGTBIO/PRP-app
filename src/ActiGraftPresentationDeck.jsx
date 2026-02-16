import { useState, useEffect, useCallback, useRef } from 'react'
import { NIGHTINGALE } from './brandTheme'
import nbLogoWhite from './assets/nb-logo-white.png'

// ========== LEGACY MEDICAL CONSULTANTS BRAND TOKENS ==========
const B = {
  // Purple/Magenta to Teal/Cyan Gradient Backgrounds
  bg: "#1D0B1F",           // Dark purple/magenta base
  surface: "#2B1435",      // Rich purple
  card: "#3A1D4B",         // Purple-magenta
  cardHover: "#4A2A5F",    // Lighter purple-magenta
  border: "#6B2E7D",       // Rich purple border
  borderLight: "#9D4BB8",  // Bright magenta border

  // Teal/Cyan Accents (enhanced - brighter, more electric)
  teal: "#00D4D4",         // Bright teal/cyan core
  tealBright: "#1BFFFF",   // Electric cyan highlight
  tealDark: "#008C9E",     // Deep teal
  tealGlow: "rgba(27,255,255,0.25)",

  // Purple/Magenta Accents (enhanced - more vibrant)
  purple: "#6B2E7D",       // Rich purple
  purpleBright: "#9D4BB8", // Bright magenta
  magenta: "#B84BB8",      // Vibrant magenta
  magentaGlow: "rgba(184,75,184,0.25)",

  // Secondary Colors
  gold: "#FFB547",
  goldDark: "#E5972E",
  goldGlow: "rgba(255,181,71,0.25)",
  red: "#FF4D6A",
  redDark: "#CC3D55",
  blue: "#5BB8FF",

  // Text Colors
  text: "#F0E6F0",         // Warm white with slight purple tint
  textSecondary: "#C8A8D8", // Purple-tinted secondary
  textMuted: "#8B6A9E",    // Purple-tinted muted
  white: "#FFFFFF",

  // Gradients
  gradientPurpleTeal: "linear-gradient(135deg, #6B2E7D, #B84BB8, #00D4D4)",
  gradientTealMagenta: "linear-gradient(135deg, #00D4D4, #1BFFFF, #B84BB8)",
}

// ========== CHART COMPONENTS ==========
const DonutChart = ({ pct, size = 120, stroke = 10, color = B.teal, label, sublabel, bgColor = B.border, isMobile }) => {
  const responsiveSize = isMobile ? Math.min(size * 0.75, 90) : size
  const responsiveStroke = isMobile ? Math.max(stroke * 0.8, 8) : stroke
  const r = (responsiveSize - responsiveStroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <div style={{ textAlign: "center", display: "inline-block" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <svg width={responsiveSize} height={responsiveSize} style={{ transform: "rotate(-90deg)" }}>
          <defs>
            <linearGradient id={`donutGrad-${pct}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={B.purple} />
              <stop offset="50%" stopColor={B.magenta} />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          <circle cx={responsiveSize/2} cy={responsiveSize/2} r={r} fill="none" stroke={bgColor} strokeWidth={responsiveStroke} />
          <circle
            cx={responsiveSize/2} cy={responsiveSize/2} r={r} fill="none" stroke={`url(#donutGrad-${pct})`} strokeWidth={responsiveStroke}
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(.22,1,.36,1)",
              filter: `drop-shadow(0 0 8px ${color}60)`
            }}
          />
        </svg>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontSize: responsiveSize * 0.22, fontWeight: 800, color,
          textShadow: `0 0 12px ${color}80`
        }}>
          {pct}%
        </div>
      </div>
      {label && <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, color: B.text, marginTop: isMobile ? 6 : 8 }}>{label}</div>}
      {sublabel && <div style={{ fontSize: isMobile ? 10 : 11, color: B.textMuted, marginTop: 2 }}>{sublabel}</div>}
    </div>
  )
}

const HBar = ({ label, value, pct, color = B.teal, maxW = "100%", highlight }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
      <span style={{ color: highlight ? color : B.textSecondary }}>{label}</span>
      <span style={{ color, fontWeight: 700, textShadow: highlight ? `0 0 8px ${color}80` : "none" }}>{value}</span>
    </div>
    <div style={{ height: 8, background: B.surface, borderRadius: 4, overflow: "hidden", maxWidth: maxW }}>
      <div style={{
        height: "100%", width: `${pct}%`,
        background: `linear-gradient(90deg, ${B.purple}, ${B.magenta}, ${color})`,
        transition: "width 1.2s cubic-bezier(.22,1,.36,1)",
        boxShadow: `0 0 12px ${color}40`
      }} />
    </div>
  </div>
)

const VBar = ({ label, value, pct, color = B.teal, maxH = 160 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    <div style={{ fontSize: 13, fontWeight: 700, color, textShadow: `0 0 8px ${color}80` }}>{value}</div>
    <div style={{
      width: "100%", maxWidth: 44, height: maxH, background: B.surface, borderRadius: 6,
      display: "flex", alignItems: "flex-end", overflow: "hidden"
    }}>
      <div style={{
        width: "100%", height: `${pct}%`,
        background: `linear-gradient(180deg, ${color}, ${B.magenta}, ${B.purple}88)`,
        borderRadius: "6px 6px 0 0",
        transition: "height 1.2s cubic-bezier(.22,1,.36,1)",
        boxShadow: `0 0 16px ${color}40`
      }} />
    </div>
    <div style={{ fontSize: 10, color: B.textMuted, textAlign: "center" }}>{label}</div>
  </div>
)

const MetricCard = ({ icon, value, label, sublabel, accent = B.teal, isMobile }) => (
  <div style={{
    background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
    borderRadius: isMobile ? 10 : 14,
    padding: isMobile ? "14px 12px" : "18px 16px",
    border: `1px solid ${B.borderLight}`,
    textAlign: "center",
    boxShadow: `0 4px 16px ${accent}20, 0 0 24px ${B.magentaGlow}`
  }}>
    <div style={{ fontSize: isMobile ? 18 : 20, marginBottom: isMobile ? 6 : 8 }}>{icon}</div>
    <div style={{
      fontSize: isMobile ? 22 : 28,
      fontWeight: 800,
      background: `linear-gradient(135deg, ${accent}, ${B.magenta})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: 1.1
    }}>
      {value}
    </div>
    <div style={{ fontSize: isMobile ? 11 : 12, color: B.textSecondary, marginTop: 4 }}>{label}</div>
    {sublabel && <div style={{ fontSize: isMobile ? 9 : 10, color: B.textMuted, marginTop: 2 }}>{sublabel}</div>}
  </div>
)

const GlowBox = ({ color = B.teal, children, style = {}, isMobile }) => (
  <div style={{
    position: "relative",
    background: `linear-gradient(135deg, ${B.purple}20, ${B.magenta}15, ${color}10)`,
    borderRadius: isMobile ? 10 : 14,
    padding: isMobile ? "14px 16px" : "18px 22px",
    border: `1px solid ${color}40`,
    boxShadow: `0 4px 20px ${color}20, 0 0 30px ${B.magentaGlow}`,
    ...style
  }}>
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 2,
      background: `linear-gradient(90deg, transparent, ${color}80, ${B.magenta}60, transparent)`
    }} />
    {children}
  </div>
)

const SectionTag = ({ text, color = B.teal }) => (
  <div style={{
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: 6,
    background: `linear-gradient(135deg, ${B.purple}30, ${B.magenta}20, ${color}15)`,
    border: `1px solid ${color}50`,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color,
    marginBottom: 12,
    boxShadow: `0 2px 8px ${color}30, 0 0 16px ${B.magentaGlow}`
  }}>
    {text}
  </div>
)

// ========== MAIN COMPONENT ==========
const ActiGraftPresentationDeck = () => {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const animKey = useRef(0)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ========== SLIDE DEFINITIONS ==========
  const SLIDE_ORDER = [
    { id: "title", label: "Overview", section: "INTRO", color: B.teal },
    { id: "crisis", label: "Market Crisis", section: "MARKET", color: B.red },
    { id: "methodist", label: "Methodist North", section: "CUSTOMER", color: B.blue },
    { id: "memphis", label: "Memphis Market", section: "MARKET", color: B.gold },
    { id: "product", label: "ActiGraft Product", section: "PRODUCT", color: B.teal },
    { id: "clinical", label: "Clinical Evidence", section: "EVIDENCE", color: B.tealBright },
    { id: "financial", label: "Financial Benefits", section: "ECONOMICS", color: B.gold },
    { id: "revenue", label: "Revenue Projections", section: "ECONOMICS", color: B.teal },
    { id: "competitive", label: "Competitive Intel", section: "MARKET", color: B.magenta },
    { id: "gpo", label: "Market Access", section: "ACCESS", color: B.blue },
    { id: "reimbursement", label: "Reimbursement", section: "ECONOMICS", color: B.gold },
    { id: "implementation", label: "Implementation", section: "ACTION", color: B.tealBright },
    { id: "training", label: "Training & Support", section: "SUPPORT", color: B.teal },
    { id: "advantages", label: "Key Advantages", section: "VALUE", color: B.tealBright },
    { id: "action", label: "Next Steps", section: "ACTION", color: B.gold },
  ]

  const slide = SLIDE_ORDER[idx]

  // ========== NAVIGATION ==========
  const go = useCallback((n) => {
    if (n < 0 || n >= SLIDE_ORDER.length || n === idx) return
    setDir(n > idx ? 1 : -1)
    animKey.current++
    setIdx(n)
  }, [idx])

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(idx + 1) }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1) }
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [idx, go])

  // ========== SLIDE ANIMATIONS ==========
  const slideStyle = {
    animation: `slideIn 0.5s cubic-bezier(.22,1,.36,1)`,
    transform: dir === 1 ? "translateX(0)" : "translateX(0)",
  }

  const slideInKeyframes = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(${dir === 1 ? "40px" : "-40px"});
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `

  // ========== SLIDE CONTENT RENDERERS ==========
  const renderTitle = () => (
    <div style={{ textAlign: "center", padding: "60px 40px" }}>
      <img src={nbLogoWhite} alt="Nightingale BioTech" style={{ height: 48, marginBottom: 32, opacity: 0.9 }} />
      <h1 style={{
        fontSize: 56,
        fontWeight: 800,
        background: B.gradientTealMagenta,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: "0 0 16px 0",
        lineHeight: 1.1,
        textShadow: `0 0 40px ${B.tealGlow}`
      }}>
        ActiGraft<span style={{ fontSize: 32, verticalAlign: "super", opacity: 0.7 }}>®</span> PRO
      </h1>
      <div style={{
        fontSize: 24,
        color: B.tealBright,
        fontWeight: 600,
        marginBottom: 48,
        textShadow: `0 0 16px ${B.tealGlow}`
      }}>
        Revolutionizing Wound Care Revenue at Methodist North
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 900, margin: "0 auto" }}>
        <MetricCard isMobile={isMobile} icon="🔬" value="2.7×" label="RCT Healing" sublabel="vs Standard Care" accent={B.tealBright} />
        <MetricCard isMobile={isMobile} icon="💰" value="$25K" label="Per Patient" sublabel="12-Week Course" accent={B.gold} />
        <MetricCard isMobile={isMobile} icon="🏥" value="$0" label="Capital Req." sublabel="No Equipment" accent={B.teal} />
        <MetricCard isMobile={isMobile} icon="🤝" value="5" label="GPO Contracts" sublabel="Access Secured" accent={B.magenta} />
      </div>

      <div style={{ marginTop: 48, fontSize: 13, color: B.textMuted }}>
        Methodist North Hospital • Wound Care Excellence • February 2026
      </div>
    </div>
  )

  const renderCrisis = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="MARKET CRISIS" color={B.red} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        The 2026 CMS Payment Collapse
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        <GlowBox isMobile={isMobile} color={B.red}>
          <div style={{ fontSize: 48, fontWeight: 900, color: B.red, marginBottom: 8, textShadow: `0 0 16px ${B.red}60` }}>$19.6B</div>
          <div style={{ fontSize: 16, color: B.text, fontWeight: 600 }}>Annual CTP Market</div>
          <div style={{ fontSize: 13, color: B.textSecondary, marginTop: 4 }}>Pre-2026 Reform</div>
        </GlowBox>
        <GlowBox isMobile={isMobile} color={B.red}>
          <div style={{ fontSize: 48, fontWeight: 900, color: B.red, marginBottom: 8, textShadow: `0 0 16px ${B.red}60` }}>90%</div>
          <div style={{ fontSize: 16, color: B.text, fontWeight: 600 }}>Payment Reduction</div>
          <div style={{ fontSize: 13, color: B.textSecondary, marginTop: 4 }}>Traditional CTPs</div>
        </GlowBox>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 24,
        border: `1px solid ${B.border}`,
        boxShadow: `0 4px 20px ${B.purple}30`
      }}>
        <h3 style={{ fontSize: 18, color: B.text, marginBottom: 16 }}>Traditional CTP Revenue Impact</h3>
        <HBar label="Pre-Reform Revenue" value="$15,000-46,000" pct={100} color={B.textMuted} />
        <HBar label="Post-Reform Revenue" value="$5,091" pct={11} color={B.red} highlight />
        <div style={{
          marginTop: 16,
          padding: 12,
          background: B.surface,
          borderRadius: 8,
          border: `1px solid ${B.borderLight}30`
        }}>
          <div style={{ fontSize: 13, color: B.gold, fontWeight: 700, marginBottom: 6 }}>⚠️ Critical Insight</div>
          <div style={{ fontSize: 12, color: B.textSecondary }}>
            CMS reformed skin substitute pricing through CPT code consolidation. Products billing under Q-codes saw 89-90% payment reductions, creating an unprecedented market disruption.
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 24,
        fontSize: 14,
        color: B.tealBright,
        fontWeight: 600,
        textShadow: `0 0 12px ${B.tealGlow}`
      }}>
        → ActiGraft bills under G0465 (NCD 270.3) — completely exempt from CMS cuts
      </div>
    </div>
  )

  const renderMethodist = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="CUSTOMER PROFILE" color={B.blue} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        Methodist North Hospital
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div>
          <div style={{
            background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
            borderRadius: 14,
            padding: 20,
            border: `1px solid ${B.border}`,
            marginBottom: 16,
            boxShadow: `0 4px 16px ${B.purple}20`
          }}>
            <h3 style={{ fontSize: 16, color: B.text, marginBottom: 12 }}>Facility Overview</h3>
            <div style={{ fontSize: 13, color: B.textSecondary, lineHeight: 1.6 }}>
              <div style={{ marginBottom: 8 }}><strong style={{ color: B.text }}>Location:</strong> 3960 New Covington Pike, Memphis, TN 38128</div>
              <div style={{ marginBottom: 8 }}><strong style={{ color: B.text }}>Beds:</strong> 231 licensed beds</div>
              <div style={{ marginBottom: 8 }}><strong style={{ color: B.text }}>System:</strong> Methodist Le Bonheur Healthcare (MLH)</div>
              <div style={{ marginBottom: 8 }}><strong style={{ color: B.text }}>GPO:</strong> Premier (Confirmed Q4 2024)</div>
              <div><strong style={{ color: B.text }}>Wound Center:</strong> Self-operated (not Healogics-managed)</div>
            </div>
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
            borderRadius: 14,
            padding: 20,
            border: `1px solid ${B.border}`,
            boxShadow: `0 4px 16px ${B.purple}20`
          }}>
            <h3 style={{ fontSize: 16, color: B.text, marginBottom: 12 }}>Sandy Deimund, CWCN</h3>
            <div style={{ fontSize: 13, color: B.textSecondary, lineHeight: 1.6 }}>
              <div style={{ marginBottom: 8 }}><strong style={{ color: B.text }}>Role:</strong> Wound Care Program Manager</div>
              <div style={{ marginBottom: 8 }}><strong style={{ color: B.text }}>Experience:</strong> Built Limb Preservation Center from scratch</div>
              <div style={{ marginBottom: 8 }}><strong style={{ color: B.text }}>Leadership:</strong> Publicly advocates for reducing Memphis amputation rates</div>
              <div><strong style={{ color: B.text }}>Expertise:</strong> EMR development, billing process navigation</div>
            </div>
          </div>
        </div>

        <div>
          <GlowBox isMobile={isMobile} color={B.blue} style={{ marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: B.blue, marginBottom: 8, textShadow: `0 0 12px ${B.blue}60` }}>14%</div>
            <div style={{ fontSize: 14, color: B.text, fontWeight: 600 }}>Diabetes Prevalence</div>
            <div style={{ fontSize: 12, color: B.textSecondary, marginTop: 4 }}>2× National Average</div>
          </GlowBox>

          <GlowBox isMobile={isMobile} color={B.teal} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: B.teal, marginBottom: 8, textShadow: `0 0 12px ${B.tealGlow}` }}>110K</div>
            <div style={{ fontSize: 14, color: B.text, fontWeight: 600 }}>Adults with Diabetes</div>
            <div style={{ fontSize: 12, color: B.textSecondary, marginTop: 4 }}>Shelby County</div>
          </GlowBox>
        </div>
      </div>

      <div style={{
        marginTop: 24,
        padding: 16,
        background: `linear-gradient(135deg, ${B.purple}15, ${B.teal}10)`,
        border: `1px solid ${B.tealBright}40`,
        borderRadius: 12,
        boxShadow: `0 4px 16px ${B.tealGlow}`
      }}>
        <div style={{ fontSize: 13, color: B.tealBright, fontWeight: 700, marginBottom: 6 }}>🎯 Unique Advantage</div>
        <div style={{ fontSize: 12, color: B.text }}>
          Self-operated wound center = internal formulary decisions. No Healogics gatekeeper. Direct pathway to MLH leadership approval.
        </div>
      </div>
    </div>
  )

  const renderMemphis = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="MARKET ANALYSIS" color={B.gold} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        Memphis Diabetes Crisis
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
        <div style={{ textAlign: "center" }}>
          <DonutChart isMobile={isMobile} pct={14} size={110} color={B.red} label="Diabetes Rate" sublabel="Shelby County" />
        </div>
        <div style={{ textAlign: "center" }}>
          <DonutChart isMobile={isMobile} pct={7} size={110} color={B.textMuted} label="National Avg" sublabel="US Baseline" bgColor={B.surface} />
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
          borderRadius: 12,
          padding: 16,
          border: `1px solid ${B.border}`,
          boxShadow: `0 4px 16px ${B.purple}20`
        }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: B.gold, textShadow: `0 0 12px ${B.goldGlow}` }}>5.5-11K</div>
          <div style={{ fontSize: 12, color: B.textSecondary, marginTop: 4 }}>Annual DFUs</div>
          <div style={{ fontSize: 11, color: B.textMuted, marginTop: 6 }}>Estimated service area incidence</div>
        </div>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 24,
        border: `1px solid ${B.border}`,
        marginBottom: 20,
        boxShadow: `0 4px 16px ${B.purple}20`
      }}>
        <h3 style={{ fontSize: 16, color: B.text, marginBottom: 16 }}>Payer Mix Intelligence</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div>
            <HBar label="Medicare" value="43%" pct={43} color={B.blue} />
          </div>
          <div>
            <HBar label="Medicaid/TennCare" value="28%" pct={28} color={B.teal} />
          </div>
          <div>
            <HBar label="Commercial" value="29%" pct={29} color={B.gold} />
          </div>
        </div>
      </div>

      <div style={{
        background: B.surface,
        borderRadius: 12,
        padding: 20,
        border: `1px solid ${B.border}30`,
        boxShadow: `0 2px 12px ${B.purple}15`
      }}>
        <h3 style={{ fontSize: 15, color: B.text, marginBottom: 12 }}>Competitive Landscape</h3>
        <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>
            <strong style={{ color: B.text }}>Regional Medical Center:</strong> Healogics-managed wound center
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong style={{ color: B.text }}>Baptist Memorial:</strong> Multiple locations, MiMedx relationship
          </div>
          <div>
            <strong style={{ color: B.text }}>Methodist North Position:</strong> Self-operated advantage enables faster ActiGraft adoption
          </div>
        </div>
      </div>
    </div>
  )

  const renderProduct = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="PRODUCT OVERVIEW" color={B.teal} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        ActiGraft<span style={{ fontSize: 28, verticalAlign: "super", opacity: 0.7 }}>®</span> PRO System
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 24 }}>
        <div style={{
          background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
          borderRadius: 14,
          padding: 24,
          border: `1px solid ${B.border}`,
          boxShadow: `0 4px 20px ${B.purple}30`
        }}>
          <h3 style={{ fontSize: 18, color: B.text, marginBottom: 20 }}>4-Step Clinical Process</h3>

          {[
            { num: 1, title: "DRAW", desc: "18mL patient blood via standard venipuncture", time: "2 min", icon: "💉" },
            { num: 2, title: "MIX", desc: "Transfer to ActiGraft cartridge, no centrifuge needed", time: "1 min", icon: "🔄" },
            { num: 3, title: "CLOT", desc: "Natural clotting activates healing cascade", time: "5 min", icon: "⏱️" },
            { num: 4, title: "APPLY", desc: "Place autologous whole blood clot on wound", time: "2 min", icon: "🩹" },
          ].map((step) => (
            <div key={step.num} style={{
              display: "flex", alignItems: "center", gap: 16, marginBottom: 16,
              padding: 12,
              background: B.surface,
              borderRadius: 10,
              border: `1px solid ${B.border}30`
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: `linear-gradient(135deg, ${B.purple}30, ${B.teal}20)`,
                border: `2px solid ${B.teal}`,
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 18, fontWeight: 800, color: B.teal,
                boxShadow: `0 2px 12px ${B.tealGlow}`
              }}>
                {step.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: B.text, marginBottom: 2 }}>
                  {step.icon} {step.title}
                </div>
                <div style={{ fontSize: 12, color: B.textSecondary }}>{step.desc}</div>
              </div>
              <div style={{ fontSize: 11, color: B.teal, fontWeight: 700 }}>{step.time}</div>
            </div>
          ))}

          <div style={{
            marginTop: 20,
            padding: 14,
            background: `linear-gradient(135deg, ${B.purple}15, ${B.teal}10)`,
            border: `1px solid ${B.tealBright}40`,
            borderRadius: 10,
            textAlign: "center",
            boxShadow: `0 4px 16px ${B.tealGlow}`
          }}>
            <div style={{ fontSize: 13, color: B.tealBright, fontWeight: 700, textShadow: `0 0 8px ${B.tealGlow}` }}>
              ⚡ Total Prep Time: ~10 minutes bedside
            </div>
          </div>
        </div>

        <div>
          <GlowBox isMobile={isMobile} color={B.tealBright} style={{ marginBottom: 16 }}>
            <h4 style={{ fontSize: 14, color: B.text, marginBottom: 12 }}>Whole Blood Components</h4>
            <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
              ✓ Platelets (growth factors)<br />
              ✓ Plasma proteins<br />
              ✓ White blood cells<br />
              ✓ Red blood cells<br />
              ✓ Fibrin scaffold<br />
              ✓ Stem cells
            </div>
          </GlowBox>

          <div style={{
            background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
            borderRadius: 14,
            padding: 16,
            border: `1px solid ${B.border}`,
            boxShadow: `0 4px 16px ${B.purple}20`
          }}>
            <h4 style={{ fontSize: 14, color: B.text, marginBottom: 12 }}>Key Differentiators</h4>
            <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
              <div style={{ marginBottom: 8 }}>🚫 <strong style={{ color: B.text }}>No centrifuge</strong></div>
              <div style={{ marginBottom: 8 }}>🚫 <strong style={{ color: B.text }}>No bovine thrombin</strong></div>
              <div style={{ marginBottom: 8 }}>✅ <strong style={{ color: B.teal }}>Largest coverage</strong> (28-56 cm²)</div>
              <div>✅ <strong style={{ color: B.teal }}>5 GPO contracts</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: B.surface,
        borderRadius: 12,
        padding: 16,
        border: `1px solid ${B.border}30`,
        boxShadow: `0 2px 12px ${B.purple}15`
      }}>
        <div style={{ fontSize: 12, color: B.gold, fontWeight: 700, marginBottom: 6 }}>📋 FDA Clearance</div>
        <div style={{ fontSize: 11, color: B.textSecondary }}>
          510(k) K170695 • Product Code: PMQ (Wound/Burn Dressing with Biologic Activity) • Autologous Platelet-Rich Plasma
        </div>
      </div>
    </div>
  )

  const renderClinical = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="CLINICAL EVIDENCE" color={B.tealBright} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        Level 1 RCT Evidence
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        <GlowBox isMobile={isMobile} color={B.tealBright}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 56,
              fontWeight: 900,
              color: B.tealBright,
              marginBottom: 8,
              textShadow: `0 0 20px ${B.tealGlow}`
            }}>
              51%
            </div>
            <div style={{ fontSize: 16, color: B.text, fontWeight: 600, marginBottom: 4 }}>ActiGraft Healing Rate</div>
            <div style={{ fontSize: 13, color: B.textSecondary }}>Per-Protocol Analysis at 12 Weeks</div>
          </div>
        </GlowBox>
        <GlowBox isMobile={isMobile} color={B.textMuted}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 56, fontWeight: 900, color: B.textMuted, marginBottom: 8 }}>18%</div>
            <div style={{ fontSize: 16, color: B.text, fontWeight: 600, marginBottom: 4 }}>Standard Care</div>
            <div style={{ fontSize: 13, color: B.textSecondary }}>Control Group (Collagen + Alginate)</div>
          </div>
        </GlowBox>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 24,
        border: `1px solid ${B.border}`,
        marginBottom: 20,
        boxShadow: `0 4px 20px ${B.purple}30`
      }}>
        <h3 style={{ fontSize: 18, color: B.text, marginBottom: 16 }}>Study Design</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: B.tealBright, textShadow: `0 0 12px ${B.tealGlow}` }}>119</div>
            <div style={{ fontSize: 11, color: B.textSecondary }}>Patients Enrolled</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: B.tealBright, textShadow: `0 0 12px ${B.tealGlow}` }}>16</div>
            <div style={{ fontSize: 11, color: B.textSecondary }}>US Wound Centers</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: B.tealBright, textShadow: `0 0 12px ${B.tealGlow}` }}>2.7×</div>
            <div style={{ fontSize: 11, color: B.textSecondary }}>Likelihood to Heal</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: B.tealBright, textShadow: `0 0 12px ${B.tealGlow}` }}>71%</div>
            <div style={{ fontSize: 11, color: B.textSecondary }}>Wound Durability</div>
          </div>
        </div>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 24,
        border: `1px solid ${B.border}`,
        boxShadow: `0 4px 20px ${B.purple}30`
      }}>
        <h3 style={{ fontSize: 16, color: B.text, marginBottom: 16 }}>Performance vs All Advanced Therapies</h3>
        <HBar label="ActiGraft PRO" value="51%" pct={100} color={B.tealBright} highlight />
        <HBar label="MiMedx EpiFix" value="48%" pct={94} color={B.textSecondary} />
        <HBar label="Organogenesis Apligraf" value="46%" pct={90} color={B.textSecondary} />
        <HBar label="Amnio Products (avg)" value="42%" pct={82} color={B.textSecondary} />
        <HBar label="Standard Care (collagen)" value="18%" pct={35} color={B.textMuted} />
      </div>

      <div style={{
        marginTop: 20,
        padding: 14,
        background: B.surface,
        borderRadius: 10,
        border: `1px solid ${B.border}30`,
        boxShadow: `0 2px 12px ${B.purple}15`
      }}>
        <div style={{ fontSize: 11, color: B.textMuted }}>
          <strong style={{ color: B.text }}>Source:</strong> Snyder, R.J., et al. (2024). "Efficacy and safety of autologous whole blood clot in diabetic foot ulcers: A multicentre, randomised controlled trial." <em>Journal of Wound Care</em>, 33(9), 634-645.
        </div>
      </div>
    </div>
  )

  const renderFinancial = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="FINANCIAL BENEFITS" color={B.gold} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        5× Revenue Advantage Over Reformed CTPs
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        <GlowBox isMobile={isMobile} color={B.gold}>
          <h3 style={{ fontSize: 16, color: B.text, marginBottom: 16 }}>ActiGraft PRO</h3>
          <div style={{
            fontSize: 48,
            fontWeight: 900,
            color: B.gold,
            marginBottom: 8,
            textShadow: `0 0 16px ${B.goldGlow}`
          }}>
            $25,296
          </div>
          <div style={{ fontSize: 14, color: B.textSecondary, marginBottom: 16 }}>Per Patient (12-Week Standard Course)</div>
          <div style={{ fontSize: 12, color: B.text, lineHeight: 1.6 }}>
            • G0465 @ $2,107.97 per treatment<br />
            • 12 weekly applications<br />
            • Hospital Outpatient APC 5054<br />
            • <strong style={{ color: B.gold }}>Protected by NCD 270.3</strong>
          </div>
        </GlowBox>

        <GlowBox isMobile={isMobile} color={B.red}>
          <h3 style={{ fontSize: 16, color: B.text, marginBottom: 16 }}>Traditional CTPs (Post-Reform)</h3>
          <div style={{
            fontSize: 48,
            fontWeight: 900,
            color: B.red,
            marginBottom: 8,
            textShadow: `0 0 16px ${B.red}60`
          }}>
            $5,091
          </div>
          <div style={{ fontSize: 14, color: B.textSecondary, marginBottom: 16 }}>Per Patient (8 Applications Max)</div>
          <div style={{ fontSize: 12, color: B.text, lineHeight: 1.6 }}>
            • Reformed CPT codes<br />
            • 90% payment reduction<br />
            • Limited application frequency<br />
            • <strong style={{ color: B.red }}>Devastated by 2026 cuts</strong>
          </div>
        </GlowBox>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 24,
        border: `1px solid ${B.border}`,
        marginBottom: 20,
        boxShadow: `0 4px 20px ${B.purple}30`
      }}>
        <h3 style={{ fontSize: 18, color: B.text, marginBottom: 16 }}>Cost-Effectiveness Breakdown</h3>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: B.gold, fontWeight: 700, marginBottom: 4 }}>Per-Patient Advantage</div>
          <div style={{ fontSize: 12, color: B.textSecondary }}>
            ActiGraft: $25,296 - Reformed CTPs: $5,091 = <strong style={{ color: B.gold }}>$20,205 more revenue</strong> per patient
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: B.gold, fontWeight: 700, marginBottom: 4 }}>Cost vs Traditional CTPs (Pre-Reform)</div>
          <div style={{ fontSize: 12, color: B.textSecondary }}>
            $2,504 - $6,278 cost advantage per patient compared to premium skin substitutes (Snyder & Ead, 2020)
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: B.gold, fontWeight: 700, marginBottom: 4 }}>Zero Capital Investment</div>
          <div style={{ fontSize: 12, color: B.textSecondary }}>
            No tissue banking • No product inventory • No HCTP regulatory requirements • No centrifuge equipment
          </div>
        </div>
      </div>

      <div style={{
        padding: 16,
        background: `linear-gradient(135deg, ${B.purple}15, ${B.teal}10)`,
        border: `1px solid ${B.tealBright}40`,
        borderRadius: 12,
        boxShadow: `0 4px 16px ${B.tealGlow}`
      }}>
        <div style={{ fontSize: 13, color: B.tealBright, fontWeight: 700, marginBottom: 6 }}>🎯 Key Insight</div>
        <div style={{ fontSize: 12, color: B.text }}>
          Same patient. Same 12-week treatment protocol. <strong style={{ color: B.gold }}>5× more revenue</strong> than competitors devastated by CMS reform.
        </div>
      </div>
    </div>
  )

  const renderRevenue = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="REVENUE PROJECTIONS" color={B.teal} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        $1M+ Annual Revenue Potential
      </h1>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 28,
        border: `1px solid ${B.border}`,
        marginBottom: 28,
        boxShadow: `0 4px 24px ${B.purple}30`
      }}>
        <h3 style={{ fontSize: 18, color: B.text, marginBottom: 24, textAlign: "center" }}>
          Methodist North Wound Care Revenue Scenarios
        </h3>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end" }}>
          <VBar label="5 pts/wk" value="$506K" pct={25} color={B.blue} maxH={180} />
          <VBar label="10 pts/wk" value="$1.01M" pct={50} color={B.teal} maxH={180} />
          <VBar label="15 pts/wk" value="$1.52M" pct={75} color={B.gold} maxH={180} />
          <VBar label="20 pts/wk" value="$2.02M" pct={100} color={B.tealBright} maxH={180} />
        </div>
        <div style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: B.textMuted }}>
          Based on 12-week treatment course @ $2,107.97 per application × 12 treatments = $25,296 per patient
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{
          background: B.surface,
          borderRadius: 12,
          padding: 20,
          border: `1px solid ${B.border}30`,
          boxShadow: `0 2px 12px ${B.teal}20`
        }}>
          <h4 style={{ fontSize: 14, color: B.teal, marginBottom: 12 }}>Conservative Scenario (10 patients/week)</h4>
          <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
            • <strong style={{ color: B.text }}>Weekly Revenue:</strong> $19,458<br />
            • <strong style={{ color: B.text }}>Monthly Revenue:</strong> $84,317<br />
            • <strong style={{ color: B.text }}>Annual Revenue:</strong> $1,011,829<br />
            • <strong style={{ color: B.text }}>Patients Treated:</strong> 520 annually
          </div>
        </div>

        <div style={{
          background: B.surface,
          borderRadius: 12,
          padding: 20,
          border: `1px solid ${B.borderLight}40`,
          boxShadow: `0 2px 12px ${B.tealBright}20`
        }}>
          <h4 style={{ fontSize: 14, color: B.tealBright, marginBottom: 12 }}>Aggressive Scenario (20 patients/week)</h4>
          <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
            • <strong style={{ color: B.text }}>Weekly Revenue:</strong> $38,916<br />
            • <strong style={{ color: B.text }}>Monthly Revenue:</strong> $168,634<br />
            • <strong style={{ color: B.text }}>Annual Revenue:</strong> $2,023,658<br />
            • <strong style={{ color: B.text }}>Patients Treated:</strong> 1,040 annually
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 24,
        padding: 18,
        background: `linear-gradient(135deg, ${B.purple}10, ${B.gold}08)`,
        border: `1px solid ${B.gold}40`,
        borderRadius: 12,
        boxShadow: `0 4px 16px ${B.goldGlow}`
      }}>
        <div style={{ fontSize: 13, color: B.gold, fontWeight: 700, marginBottom: 8 }}>💡 Market Feasibility</div>
        <div style={{ fontSize: 12, color: B.text, lineHeight: 1.6 }}>
          Memphis diabetes prevalence (14%) creates estimated 5,500-11,000 annual DFUs in Methodist North service area.
          Conservative 10 patients/week = <strong style={{ color: B.gold }}>520 annual patients (9.5% market capture)</strong> from lower-bound estimate.
        </div>
      </div>
    </div>
  )

  const renderCompetitive = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="COMPETITIVE INTELLIGENCE" color={B.magenta} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        NCD 270.3 Competitive Landscape
      </h1>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 24,
        border: `1px solid ${B.border}`,
        marginBottom: 20,
        boxShadow: `0 4px 24px ${B.purple}30`
      }}>
        <h3 style={{ fontSize: 16, color: B.text, marginBottom: 16 }}>Primary PRP Competitors (G0465 Pathway)</h3>
        <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${B.border}` }}>
              <th style={{ textAlign: "left", padding: "8px 0", color: B.textSecondary, fontWeight: 600 }}>Product</th>
              <th style={{ textAlign: "left", padding: "8px 0", color: B.textSecondary, fontWeight: 600 }}>Company</th>
              <th style={{ textAlign: "center", padding: "8px 0", color: B.textSecondary, fontWeight: 600 }}>Centrifuge</th>
              <th style={{ textAlign: "center", padding: "8px 0", color: B.textSecondary, fontWeight: 600 }}>Thrombin</th>
              <th style={{ textAlign: "center", padding: "8px 0", color: B.textSecondary, fontWeight: 600 }}>Prep Time</th>
              <th style={{ textAlign: "center", padding: "8px 0", color: B.textSecondary, fontWeight: 600 }}>GPO</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${B.surface}` }}>
              <td style={{ padding: "10px 0", color: B.tealBright, fontWeight: 700, textShadow: `0 0 8px ${B.tealGlow}` }}>ActiGraft PRO</td>
              <td style={{ padding: "10px 0", color: B.text }}>RedDress/LMC</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.teal }}>✗ No</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.teal }}>✗ No</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.text }}>~5 min</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.gold }}>5 GPOs</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${B.surface}` }}>
              <td style={{ padding: "10px 0", color: B.text }}>Aurix/CENTRIO</td>
              <td style={{ padding: "10px 0", color: B.text }}>Nuo/Smith+Nephew</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.red }}>✓ Yes</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.red }}>✓ Yes</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.text }}>~15 min</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.textMuted }}>2 GPOs</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${B.surface}` }}>
              <td style={{ padding: "10px 0", color: B.text }}>CASCADE</td>
              <td style={{ padding: "10px 0", color: B.text }}>PRP Concepts</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.red }}>✓ Yes</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.red }}>✓ Yes</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.text }}>~20 min</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.textMuted }}>1 GPO</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0", color: B.text }}>FastSkin Patch</td>
              <td style={{ padding: "10px 0", color: B.text }}>MimiX Biotherapeutics</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.red }}>✓ Yes</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.teal }}>✗ No</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.text }}>~15 min</td>
              <td style={{ textAlign: "center", padding: "10px 0", color: B.textMuted }}>None</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <GlowBox isMobile={isMobile} color={B.teal}>
          <h4 style={{ fontSize: 14, color: B.text, marginBottom: 12 }}>✅ ActiGraft Advantages</h4>
          <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
            • Simplest workflow (no centrifuge)<br />
            • Broadest patient eligibility (no thrombin)<br />
            • Largest coverage area (28-56 cm²)<br />
            • Strongest GPO portfolio<br />
            • Highest RCT healing rate (51%)<br />
            • VA GLA access (Jul 2022)
          </div>
        </GlowBox>

        <GlowBox isMobile={isMobile} color={B.red}>
          <h4 style={{ fontSize: 14, color: B.text, marginBottom: 12 }}>⚠️ Competitive Threats</h4>
          <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
            • <strong style={{ color: B.text }}>MiMedx RegenKit:</strong> New whole blood product (Nov 2024)<br />
            • <strong style={{ color: B.text }}>Smith+Nephew:</strong> Large sales force, CENTRIO relaunch<br />
            • <strong style={{ color: B.text }}>Market education:</strong> G0465 pathway still unfamiliar
          </div>
        </GlowBox>
      </div>
    </div>
  )

  const renderGPO = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="MARKET ACCESS" color={B.blue} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        GPO Contracts & Coverage
      </h1>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 24,
        border: `1px solid ${B.border}`,
        marginBottom: 24,
        boxShadow: `0 4px 24px ${B.purple}30`
      }}>
        <h3 style={{ fontSize: 18, color: B.text, marginBottom: 16 }}>ActiGraft GPO Portfolio</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          <div style={{
            textAlign: "center",
            padding: 16,
            background: B.surface,
            borderRadius: 10,
            border: `1px solid ${B.border}30`
          }}>
            <div style={{ fontSize: 24 }}>✓</div>
            <div style={{ fontSize: 13, color: B.teal, fontWeight: 700, marginTop: 8 }}>Vizient</div>
            <div style={{ fontSize: 10, color: B.textMuted, marginTop: 4 }}>Wound Care</div>
          </div>
          <div style={{
            textAlign: "center",
            padding: 16,
            background: B.surface,
            borderRadius: 10,
            border: `1px solid ${B.border}30`
          }}>
            <div style={{ fontSize: 24 }}>✓</div>
            <div style={{ fontSize: 13, color: B.teal, fontWeight: 700, marginTop: 8 }}>Healogics</div>
            <div style={{ fontSize: 10, color: B.textMuted, marginTop: 4 }}>WCA Formulary</div>
          </div>
          <div style={{
            textAlign: "center",
            padding: 16,
            background: B.surface,
            borderRadius: 10,
            border: `1px solid ${B.border}30`
          }}>
            <div style={{ fontSize: 24 }}>✓</div>
            <div style={{ fontSize: 13, color: B.teal, fontWeight: 700, marginTop: 8 }}>WCA</div>
            <div style={{ fontSize: 10, color: B.textMuted, marginTop: 4 }}>Oct 2024</div>
          </div>
          <div style={{
            textAlign: "center",
            padding: 16,
            background: `linear-gradient(135deg, ${B.purple}20, ${B.teal}15)`,
            border: `1px solid ${B.tealBright}50`,
            borderRadius: 10,
            boxShadow: `0 4px 16px ${B.tealGlow}`
          }}>
            <div style={{ fontSize: 24 }}>✓</div>
            <div style={{ fontSize: 13, color: B.tealBright, fontWeight: 700, marginTop: 8, textShadow: `0 0 8px ${B.tealGlow}` }}>Premier</div>
            <div style={{ fontSize: 10, color: B.textSecondary, marginTop: 4 }}>MLH GPO</div>
          </div>
          <div style={{
            textAlign: "center",
            padding: 16,
            background: B.surface,
            borderRadius: 10,
            border: `1px solid ${B.border}30`
          }}>
            <div style={{ fontSize: 24 }}>✓</div>
            <div style={{ fontSize: 13, color: B.teal, fontWeight: 700, marginTop: 8 }}>HealthTrust</div>
            <div style={{ fontSize: 10, color: B.textMuted, marginTop: 4 }}>Access</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{
          background: B.surface,
          borderRadius: 12,
          padding: 20,
          border: `1px solid ${B.border}30`,
          boxShadow: `0 2px 12px ${B.purple}15`
        }}>
          <h4 style={{ fontSize: 14, color: B.text, marginBottom: 12 }}>VA/Federal Access</h4>
          <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: B.teal }}>✓ VA Generic Line Award (GLA)</strong>
            </div>
            <div style={{ marginBottom: 8 }}>Effective: July 2022</div>
            <div>Status: Active nationwide VA access</div>
          </div>
        </div>

        <div style={{
          background: B.surface,
          borderRadius: 12,
          padding: 20,
          border: `1px solid ${B.border}30`,
          boxShadow: `0 2px 12px ${B.purple}15`
        }}>
          <h4 style={{ fontSize: 14, color: B.text, marginBottom: 12 }}>Medicare Coverage</h4>
          <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: B.tealBright }}>National Coverage Determination</strong>
            </div>
            <div style={{ marginBottom: 8 }}>NCD 270.3 (Autologous PRP)</div>
            <div>Nationwide coverage, no MAC discretion</div>
          </div>
        </div>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 20,
        border: `1px solid ${B.border}`,
        boxShadow: `0 4px 16px ${B.purple}20`
      }}>
        <h4 style={{ fontSize: 14, color: B.text, marginBottom: 12 }}>Commercial Payer Status</h4>
        <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.6 }}>
          Most major commercial payers provide coverage for G0465 with appropriate medical necessity documentation.
          Key payers: <strong style={{ color: B.text }}>Aetna</strong> (covered), <strong style={{ color: B.text }}>UnitedHealthcare</strong> (covered),
          <strong style={{ color: B.text }}>Cigna</strong> (covered with criteria), <strong style={{ color: B.text }}>Blue Cross Blue Shield</strong> (varies by plan).
        </div>
      </div>

      <div style={{
        marginTop: 20,
        padding: 14,
        background: `linear-gradient(135deg, ${B.purple}15, ${B.blue}10)`,
        border: `1px solid ${B.blue}50`,
        borderRadius: 12,
        boxShadow: `0 4px 16px ${B.blue}30`
      }}>
        <div style={{ fontSize: 13, color: B.blue, fontWeight: 700, marginBottom: 6 }}>🎯 Methodist North Confirmation</div>
        <div style={{ fontSize: 12, color: B.text }}>
          Premier GPO member confirmed Q4 2024. ActiGraft is on-contract with Premier, providing immediate access for formulary review.
        </div>
      </div>
    </div>
  )

  const renderReimbursement = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="REIMBURSEMENT DETAILS" color={B.gold} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        G0465 Billing & Coverage
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 24 }}>
        <div style={{
          background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
          borderRadius: 14,
          padding: 24,
          border: `1px solid ${B.border}`,
          boxShadow: `0 4px 24px ${B.purple}30`
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{
              padding: "12px 20px",
              background: `linear-gradient(135deg, ${B.purple}30, ${B.gold}20)`,
              border: `1px solid ${B.gold}50`,
              borderRadius: 10,
              fontSize: 24,
              fontWeight: 800,
              color: B.gold,
              boxShadow: `0 4px 16px ${B.goldGlow}`
            }}>
              G0465
            </div>
            <div>
              <div style={{ fontSize: 14, color: B.text, fontWeight: 700 }}>HCPCS Code</div>
              <div style={{ fontSize: 11, color: B.textSecondary }}>Autologous Platelet Rich Plasma for Diabetic Chronic Wounds/Ulcers</div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <h4 style={{ fontSize: 13, color: B.gold, marginBottom: 8 }}>2026 Reimbursement Rates</h4>
            <div style={{
              background: B.surface,
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
              border: `1px solid ${B.border}30`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 12, color: B.textSecondary }}>Hospital Outpatient (APC 5054):</div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: B.gold,
                  textShadow: `0 0 12px ${B.goldGlow}`
                }}>
                  $2,107.97
                </div>
              </div>
            </div>
            <div style={{
              background: B.surface,
              borderRadius: 8,
              padding: 12,
              border: `1px solid ${B.border}30`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 12, color: B.textSecondary }}>Physician Office/Non-Facility:</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: B.text }}>$1,064.49</div>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, color: B.gold, marginBottom: 8 }}>Code Includes</h4>
            <div style={{ fontSize: 11, color: B.textSecondary, lineHeight: 1.7 }}>
              ✓ Phlebotomy (blood draw)<br />
              ✓ Device and preparation<br />
              ✓ Application to wound<br />
              ✓ Wound assessment<br />
              ✓ Dressings and supplies
            </div>
          </div>
        </div>

        <div>
          <GlowBox isMobile={isMobile} color={B.tealBright} style={{ marginBottom: 16, textAlign: "center" }}>
            <div style={{
              fontSize: 36,
              fontWeight: 900,
              color: B.tealBright,
              marginBottom: 8,
              textShadow: `0 0 16px ${B.tealGlow}`
            }}>
              20
            </div>
            <div style={{ fontSize: 14, color: B.text, fontWeight: 600 }}>Max Applications</div>
            <div style={{ fontSize: 11, color: B.textSecondary, marginTop: 4 }}>Per Patient</div>
          </GlowBox>

          <div style={{
            background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
            borderRadius: 14,
            padding: 16,
            border: `1px solid ${B.border}`,
            boxShadow: `0 4px 16px ${B.purple}20`
          }}>
            <h4 style={{ fontSize: 13, color: B.text, marginBottom: 10 }}>Coverage Criteria</h4>
            <div style={{ fontSize: 11, color: B.textSecondary, lineHeight: 1.7 }}>
              ✓ Diabetic chronic wounds<br />
              ✓ Duration >30 days<br />
              ✓ Failed conventional therapy<br />
              ✓ Adequate perfusion documented
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: B.surface,
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        border: `1px solid ${B.border}30`,
        boxShadow: `0 2px 12px ${B.purple}15`
      }}>
        <h3 style={{ fontSize: 16, color: B.text, marginBottom: 12 }}>National Coverage Determination (NCD) 270.3</h3>
        <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>
            <strong style={{ color: B.text }}>Scope:</strong> Applies nationwide to all Medicare Administrative Contractors (MACs)
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong style={{ color: B.text }}>Authority:</strong> CMS national policy — not subject to local contractor discretion
          </div>
          <div>
            <strong style={{ color: B.text }}>Significance:</strong> Unlike Q-code CTPs that were reformed, G0465 protected by NCD
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{
          padding: 16,
          background: `linear-gradient(135deg, ${B.purple}15, ${B.teal}10)`,
          border: `1px solid ${B.tealBright}40`,
          borderRadius: 12,
          boxShadow: `0 4px 16px ${B.tealGlow}`
        }}>
          <div style={{ fontSize: 13, color: B.tealBright, fontWeight: 700, marginBottom: 6 }}>✅ Billing Advantage</div>
          <div style={{ fontSize: 12, color: B.text }}>
            Weekly applications typical (up to 20 total). Most patients complete 8-12 treatments. No application frequency restrictions like reformed CTPs.
          </div>
        </div>

        <div style={{
          padding: 16,
          background: `linear-gradient(135deg, ${B.purple}15, ${B.teal}10)`,
          border: `1px solid ${B.tealBright}40`,
          borderRadius: 12,
          boxShadow: `0 4px 16px ${B.tealGlow}`
        }}>
          <div style={{ fontSize: 13, color: B.tealBright, fontWeight: 700, marginBottom: 6 }}>💡 Revenue Stability</div>
          <div style={{ fontSize: 12, color: B.text }}>
            G0465 reimbursement unchanged by 2026 CMS reform. ActiGraft maintains full revenue while competitors lost 90% of payment.
          </div>
        </div>
      </div>
    </div>
  )

  const renderImplementation = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="IMPLEMENTATION PLAN" color={B.tealBright} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        90-Day Action Plan
      </h1>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 24,
        border: `1px solid ${B.border}`,
        boxShadow: `0 4px 24px ${B.purple}30`
      }}>
        {[
          {
            phase: "Phase 1", weeks: "Weeks 1-2", title: "Team Alignment & VAC Prep",
            tasks: [
              "In-service training for wound care team",
              "Q&A session with clinical staff",
              "VAC presentation materials preparation",
              "Stakeholder identification (finance, admin, supply chain)"
            ],
            color: B.tealBright
          },
          {
            phase: "Phase 2", weeks: "Weeks 3-4", title: "Value Analysis Committee",
            tasks: [
              "Submit VAC application with clinical evidence",
              "Present financial analysis and revenue projections",
              "Address committee questions and concerns",
              "Obtain formulary approval"
            ],
            color: B.blue
          },
          {
            phase: "Phase 3", weeks: "Weeks 5-6", title: "Clinical Training",
            tasks: [
              "Hands-on training for providers and nurses",
              "Device familiarization and workflow integration",
              "Documentation and billing education",
              "Patient selection criteria review"
            ],
            color: B.teal
          },
          {
            phase: "Phase 4", weeks: "Weeks 7-8", title: "First Patient Cohort",
            tasks: [
              "Identify 3-5 appropriate candidates",
              "Complete first treatments with support",
              "Document outcomes and workflow efficiency",
              "Address any operational challenges"
            ],
            color: B.gold
          },
          {
            phase: "Phase 5", weeks: "Weeks 9-12", title: "Scale & Optimize",
            tasks: [
              "Expand to 8-10 patients per week",
              "Track clinical and financial outcomes",
              "Optimize workflow and supply chain",
              "Plan for sustained growth"
            ],
            color: B.magenta
          }
        ].map((phase, i) => (
          <div key={i} style={{ marginBottom: i === 4 ? 0 : 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `linear-gradient(135deg, ${phase.color}30, ${phase.color}20)`,
                border: `2px solid ${phase.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: phase.color,
                boxShadow: `0 2px 12px ${phase.color}40`
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: phase.color }}>{phase.phase}</div>
                <div style={{ fontSize: 11, color: B.textMuted }}>{phase.weeks}</div>
              </div>
              <div style={{ flex: 1, height: 1, background: B.border }} />
              <div style={{ fontSize: 13, color: B.text, fontWeight: 600 }}>{phase.title}</div>
            </div>
            <div style={{
              marginLeft: 48,
              padding: 12,
              background: B.surface,
              borderRadius: 8,
              borderLeft: `3px solid ${phase.color}`,
              border: `1px solid ${B.border}30`
            }}>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 11, color: B.textSecondary, lineHeight: 1.7 }}>
                {phase.tasks.map((task, j) => (
                  <li key={j}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{
          padding: 16,
          background: `linear-gradient(135deg, ${B.purple}15, ${B.teal}10)`,
          border: `1px solid ${B.tealBright}40`,
          borderRadius: 12,
          boxShadow: `0 4px 16px ${B.tealGlow}`
        }}>
          <div style={{ fontSize: 13, color: B.tealBright, fontWeight: 700, marginBottom: 6 }}>🎯 Success Metrics</div>
          <div style={{ fontSize: 12, color: B.text, lineHeight: 1.6 }}>
            • VAC approval within 30 days<br />
            • First patient treated by Week 7<br />
            • 10+ patients/week by Week 12<br />
            • >70% wound closure rates
          </div>
        </div>

        <div style={{
          padding: 16,
          background: `linear-gradient(135deg, ${B.purple}15, ${B.teal}10)`,
          border: `1px solid ${B.tealBright}40`,
          borderRadius: 12,
          boxShadow: `0 4px 16px ${B.tealGlow}`
        }}>
          <div style={{ fontSize: 13, color: B.tealBright, fontWeight: 700, marginBottom: 6 }}>🤝 Nightingale Support</div>
          <div style={{ fontSize: 12, color: B.text, lineHeight: 1.6 }}>
            • Dedicated VAC presentation assistance<br />
            • On-site clinical training<br />
            • Reimbursement guidance<br />
            • 24/7 ongoing support
          </div>
        </div>
      </div>
    </div>
  )

  const renderTraining = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="TRAINING & SUPPORT" color={B.teal} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        Comprehensive Training & Resources
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 24 }}>
        {[
          {
            icon: "📚", title: "Clinical Training", color: B.tealBright,
            items: [
              "In-person hands-on training sessions",
              "Virtual webinar training (CE credits available)",
              "Step-by-step procedure videos",
              "Clinical protocol guides"
            ]
          },
          {
            icon: "📖", title: "Educational Materials", color: B.teal,
            items: [
              "Patient education handouts",
              "Provider quick reference guides",
              "Evidence-based literature reviews",
              "Case study library"
            ]
          },
          {
            icon: "💬", title: "Ongoing Support", color: B.blue,
            items: [
              "24/7 clinical support hotline",
              "Dedicated territory representatives",
              "Quarterly best practice webinars",
              "Peer network and case consultations"
            ]
          },
          {
            icon: "💳", title: "Reimbursement Support", color: B.gold,
            items: [
              "G0465 code guidance and billing resources",
              "Insurance verification assistance",
              "Prior authorization support",
              "Documentation templates"
            ]
          }
        ].map((resource, i) => (
          <div key={i} style={{
            background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
            borderRadius: 14,
            padding: 20,
            border: `1px solid ${B.border}`,
            boxShadow: `0 4px 16px ${B.purple}20`
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{resource.icon}</div>
            <h3 style={{ fontSize: 16, color: resource.color, marginBottom: 12, fontWeight: 700 }}>
              {resource.title}
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
              {resource.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 24,
        border: `1px solid ${B.border}`,
        boxShadow: `0 4px 24px ${B.purple}30`
      }}>
        <h3 style={{ fontSize: 18, color: B.text, marginBottom: 16 }}>Nightingale BioTech Partnership Value</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <h4 style={{ fontSize: 14, color: B.teal, marginBottom: 10 }}>Boutique Distribution Model</h4>
            <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
              • <strong style={{ color: B.text }}>Memphis-based:</strong> Deep understanding of local market and patient population<br />
              • <strong style={{ color: B.text }}>Clinical depth:</strong> MiMedx and ConvaTec backgrounds<br />
              • <strong style={{ color: B.text }}>Focused portfolio:</strong> Quality over quantity approach
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 14, color: B.tealBright, marginBottom: 10 }}>Value-Based Philosophy</h4>
            <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
              • <strong style={{ color: B.text }}>Limb preservation:</strong> Preventing amputations, not just closing wounds<br />
              • <strong style={{ color: B.text }}>Long-term partnership:</strong> Success measured by your outcomes<br />
              • <strong style={{ color: B.text }}>Education focus:</strong> Clinical excellence through continuous learning
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 24,
        padding: 18,
        background: B.surface,
        borderRadius: 12,
        border: `1px solid ${B.border}30`,
        boxShadow: `0 2px 12px ${B.purple}15`
      }}>
        <h4 style={{ fontSize: 14, color: B.text, marginBottom: 10 }}>Getting Started</h4>
        <div style={{ fontSize: 12, color: B.textSecondary, lineHeight: 1.7 }}>
          <strong style={{ color: B.text }}>Step 1:</strong> Schedule VAC prep call to align on presentation strategy<br />
          <strong style={{ color: B.text }}>Step 2:</strong> Complete in-service training for wound care team<br />
          <strong style={{ color: B.text }}>Step 3:</strong> Submit VAC application with Nightingale support<br />
          <strong style={{ color: B.text }}>Step 4:</strong> Begin treating patients with ongoing clinical guidance
        </div>
      </div>
    </div>
  )

  const renderAdvantages = () => (
    <div style={{ padding: "40px" }}>
      <SectionTag text="KEY ADVANTAGES" color={B.tealBright} />
      <h1 style={{ fontSize: 42, fontWeight: 800, color: B.text, margin: "0 0 24px 0" }}>
        Why ActiGraft + Nightingale BioTech?
      </h1>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 20, color: B.tealBright, marginBottom: 16, textShadow: `0 0 12px ${B.tealGlow}` }}>
          ActiGraft PRO Advantages
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { icon: "🛡️", title: "Immune to CMS Cuts", desc: "G0465 protected by NCD 270.3 — completely exempt from 90% CTP payment reductions" },
            { icon: "💰", title: "Superior Economics", desc: "$25,296 per patient vs $5,091 for reformed CTPs — 5× revenue advantage" },
            { icon: "🔬", title: "Level 1 RCT Evidence", desc: "51% healing rate vs 18% standard care — 2.7× likelihood to heal" },
            { icon: "⚡", title: "Point-of-Care Simplicity", desc: "5-minute clotting time, no centrifuge, no bovine thrombin required" },
            { icon: "🤝", title: "Strong GPO Access", desc: "5 GPO contracts including Premier (MLH), Vizient, Healogics WCA" },
            { icon: "📊", title: "Healogics Formulary", desc: "Added to WCA formulary Oct 2024 — validation by nation's largest wound care company" },
          ].map((adv, i) => (
            <div key={i} style={{
              padding: 16,
              background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
              borderRadius: 12,
              border: `1px solid ${B.border}`,
              display: "flex",
              gap: 12,
              boxShadow: `0 4px 16px ${B.purple}20`
            }}>
              <div style={{ fontSize: 24 }}>{adv.icon}</div>
              <div>
                <div style={{ fontSize: 13, color: B.text, fontWeight: 700, marginBottom: 4 }}>{adv.title}</div>
                <div style={{ fontSize: 11, color: B.textSecondary, lineHeight: 1.5 }}>{adv.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: 20, color: B.teal, marginBottom: 16 }}>Nightingale BioTech Partnership Value</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { icon: "📍", title: "Memphis-Based", desc: "Local expertise in your patient population and community healthcare landscape" },
            { icon: "🎯", title: "Clinical Expertise", desc: "Team backgrounds from MiMedx, ConvaTec — deep wound care knowledge" },
            { icon: "💎", title: "Boutique Model", desc: "Clinical depth over breadth — focused on your success, not sales quotas" },
            { icon: "🤝", title: "Value-Based Philosophy", desc: "Preventing amputations and preserving limbs — outcomes over transactions" },
            { icon: "🎓", title: "Comprehensive Support", desc: "Clinical training, reimbursement guidance, VAC assistance, 24/7 availability" },
            { icon: "⚡", title: "Fast Implementation", desc: "Streamlined process leveraging Premier GPO relationship and local presence" },
          ].map((adv, i) => (
            <div key={i} style={{
              padding: 16,
              background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
              borderRadius: 12,
              border: `1px solid ${B.border}`,
              display: "flex",
              gap: 12,
              boxShadow: `0 4px 16px ${B.purple}20`
            }}>
              <div style={{ fontSize: 24 }}>{adv.icon}</div>
              <div>
                <div style={{ fontSize: 13, color: B.text, fontWeight: 700, marginBottom: 4 }}>{adv.title}</div>
                <div style={{ fontSize: 11, color: B.textSecondary, lineHeight: 1.5 }}>{adv.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 32,
        padding: 24,
        background: `linear-gradient(135deg, ${B.purple}20, ${B.gold}15)`,
        border: `2px solid ${B.gold}50`,
        borderRadius: 14,
        textAlign: "center",
        boxShadow: `0 8px 32px ${B.goldGlow}`
      }}>
        <div style={{ fontSize: 18, color: B.gold, fontWeight: 800, marginBottom: 12, textShadow: `0 0 16px ${B.goldGlow}` }}>
          The Bottom Line
        </div>
        <div style={{ fontSize: 14, color: B.text, lineHeight: 1.7 }}>
          Better clinical outcomes (2.7× more likely to heal) + Better financial performance ($1M+ annual revenue) +
          Better operational efficiency (no inventory, no tissue banking) = <strong style={{ color: B.gold }}>Methodist North leads Memphis wound care</strong>
        </div>
      </div>
    </div>
  )

  const renderAction = () => (
    <div style={{ padding: "60px 40px", textAlign: "center" }}>
      <SectionTag text="NEXT STEPS" color={B.gold} />
      <h1 style={{ fontSize: 48, fontWeight: 800, color: B.text, margin: "0 0 16px 0" }}>
        Ready to Transform Methodist North Wound Care?
      </h1>
      <div style={{ fontSize: 18, color: B.textSecondary, marginBottom: 48, maxWidth: 700, margin: "0 auto 48px" }}>
        Let's work together to bring ActiGraft PRO to your wound care center and generate $1M+ in new revenue while improving patient outcomes.
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${B.card}, ${B.surface})`,
        borderRadius: 14,
        padding: 32,
        border: `1px solid ${B.border}`,
        marginBottom: 32,
        maxWidth: 800,
        margin: "0 auto 32px",
        boxShadow: `0 8px 32px ${B.purple}40`
      }}>
        <h3 style={{ fontSize: 20, color: B.text, marginBottom: 24 }}>Immediate Actions</h3>
        <div style={{ textAlign: "left", maxWidth: 600, margin: "0 auto" }}>
          {[
            { num: 1, action: "Schedule VAC Prep Call", desc: "Align on presentation strategy and timeline" },
            { num: 2, action: "Identify Key Stakeholders", desc: "Finance, administration, supply chain contacts" },
            { num: 3, action: "Coverage Verification", desc: "Confirm top payer policies for G0465" },
            { num: 4, action: "Clinical Training Scheduling", desc: "Prepare team for implementation" },
          ].map((item) => (
            <div key={item.num} style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
              padding: 16,
              background: B.surface,
              borderRadius: 10,
              border: `1px solid ${B.border}30`
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: `linear-gradient(135deg, ${B.purple}30, ${B.gold}20)`,
                border: `2px solid ${B.gold}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 800, color: B.gold, flexShrink: 0,
                boxShadow: `0 2px 12px ${B.goldGlow}`
              }}>
                {item.num}
              </div>
              <div>
                <div style={{ fontSize: 14, color: B.text, fontWeight: 700, marginBottom: 2 }}>{item.action}</div>
                <div style={{ fontSize: 12, color: B.textSecondary }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 16, color: B.text, fontWeight: 700, marginBottom: 12 }}>Contact Nightingale BioTech</div>
        <div style={{ fontSize: 14, color: B.textSecondary, lineHeight: 1.8 }}>
          <div style={{ marginBottom: 8 }}>📧 <strong style={{ color: B.text }}>Email:</strong> info@nightingalebiotech.com</div>
          <div style={{ marginBottom: 8 }}>📞 <strong style={{ color: B.text }}>Phone:</strong> Contact your territory representative</div>
          <div>🌐 <strong style={{ color: B.text }}>Website:</strong> www.nightingalebiotech.com</div>
        </div>
      </div>

      <div style={{
        padding: 20,
        background: `linear-gradient(135deg, ${B.purple}15, ${B.teal}10)`,
        border: `1px solid ${B.tealBright}40`,
        borderRadius: 12,
        maxWidth: 700,
        margin: "0 auto",
        boxShadow: `0 4px 20px ${B.tealGlow}`
      }}>
        <div style={{
          fontSize: 15,
          color: B.tealBright,
          fontWeight: 700,
          marginBottom: 8,
          textShadow: `0 0 12px ${B.tealGlow}`
        }}>
          🎯 The Window is Open
        </div>
        <div style={{ fontSize: 13, color: B.text, lineHeight: 1.6 }}>
          While competitors scramble to adapt to CMS cuts that decimated their business model, Methodist North can act now to establish market leadership with proven outcomes, protected reimbursement, and zero capital investment.
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <img src={nbLogoWhite} alt="Nightingale BioTech" style={{ height: 40, opacity: 0.8 }} />
        <div style={{ fontSize: 11, color: B.textMuted, marginTop: 16 }}>
          © 2026 Nightingale BioTech • Serving Memphis Healthcare Excellence
        </div>
      </div>
    </div>
  )

  // ========== MAIN RENDER ==========
  const renderSlide = () => {
    switch (slide.id) {
      case "title": return renderTitle()
      case "crisis": return renderCrisis()
      case "methodist": return renderMethodist()
      case "memphis": return renderMemphis()
      case "product": return renderProduct()
      case "clinical": return renderClinical()
      case "financial": return renderFinancial()
      case "revenue": return renderRevenue()
      case "competitive": return renderCompetitive()
      case "gpo": return renderGPO()
      case "reimbursement": return renderReimbursement()
      case "implementation": return renderImplementation()
      case "training": return renderTraining()
      case "advantages": return renderAdvantages()
      case "action": return renderAction()
      default: return null
    }
  }

  return (
    <>
      <style>{slideInKeyframes}</style>
      <div style={{
        minHeight: "100vh",
        background: B.bg,
        color: B.text,
        fontFamily: NIGHTINGALE.font.primary,
        position: "relative",
        backgroundImage: `radial-gradient(circle at 20% 50%, ${B.purple}15, transparent 50%), radial-gradient(circle at 80% 50%, ${B.teal}08, transparent 50%)`
      }}>
        {/* Header */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: `${B.surface}E6`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${B.border}`,
          padding: isMobile ? "10px 16px" : "12px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: `0 2px 16px ${B.purple}30`
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16 }}>
            <img src={nbLogoWhite} alt="Nightingale BioTech" style={{ height: isMobile ? 22 : 28 }} />
            {!isMobile && <div style={{ fontSize: 13, color: B.textMuted }}>
              ActiGraft<span style={{ fontSize: 10, verticalAlign: "super" }}>®</span> PRO Presentation
            </div>}
          </div>
          <div style={{ fontSize: isMobile ? 11 : 12, color: B.textSecondary, fontWeight: 600 }}>
            {isMobile ? `${idx + 1}/${SLIDE_ORDER.length}` : `Slide ${idx + 1} of ${SLIDE_ORDER.length}`}
          </div>
        </div>

        {/* Slide Content */}
        <div key={animKey.current} style={{
          ...slideStyle,
          minHeight: isMobile ? "calc(100vh - 120px)" : "calc(100vh - 140px)",
          padding: isMobile ? "20px 16px" : "32px 48px"
        }}>
          {renderSlide()}
        </div>

        {/* Footer Navigation */}
        <div style={{
          position: "sticky",
          bottom: 0,
          background: `${B.surface}F0`,
          backdropFilter: "blur(12px)",
          borderTop: `1px solid ${B.border}`,
          padding: isMobile ? "12px 16px" : "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 12 : 24,
          boxShadow: `0 -2px 16px ${B.purple}30`
        }}>
          <button
            onClick={() => go(idx - 1)}
            disabled={idx === 0}
            style={{
              padding: isMobile ? "8px 12px" : "10px 20px",
              background: idx === 0 ? B.surface : `linear-gradient(135deg, ${B.purple}30, ${B.card})`,
              border: `1px solid ${idx === 0 ? B.border : B.borderLight}`,
              borderRadius: isMobile ? 6 : 8,
              color: idx === 0 ? B.textMuted : B.text,
              fontSize: isMobile ? 12 : 13,
              fontWeight: 600,
              cursor: idx === 0 ? "not-allowed" : "pointer",
              opacity: idx === 0 ? 0.5 : 1,
              transition: "all 0.2s",
              minHeight: 44
            }}
          >
            {isMobile ? "←" : "← Previous"}
          </button>

          <div style={{ display: "flex", gap: isMobile ? 6 : 8, alignItems: "center", flex: 1, justifyContent: "center", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            {SLIDE_ORDER.map((s, i) => (
              <div key={i} style={{ position: "relative" }}>
                <button
                  onClick={() => go(i)}
                  style={{
                    width: i === idx ? (isMobile ? 24 : 32) : (isMobile ? 8 : 10),
                    height: isMobile ? 8 : 10,
                    borderRadius: isMobile ? 4 : 5,
                    background: i === idx ? s.color : B.border,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
                    opacity: i === idx ? 1 : 0.6,
                    boxShadow: i === idx ? `0 0 16px ${s.color}60` : "none",
                    minHeight: 44,
                    minWidth: 44
                  }}
                  title={`${i + 1}. ${s.label}`}
                  aria-label={`Go to slide ${i + 1}: ${s.label}`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => go(idx + 1)}
            disabled={idx === SLIDE_ORDER.length - 1}
            style={{
              padding: isMobile ? "8px 12px" : "10px 20px",
              background: idx === SLIDE_ORDER.length - 1 ? B.surface : `linear-gradient(135deg, ${B.purple}30, ${B.card})`,
              border: `1px solid ${idx === SLIDE_ORDER.length - 1 ? B.border : B.borderLight}`,
              borderRadius: isMobile ? 6 : 8,
              color: idx === SLIDE_ORDER.length - 1 ? B.textMuted : B.text,
              fontSize: isMobile ? 12 : 13,
              fontWeight: 600,
              cursor: idx === SLIDE_ORDER.length - 1 ? "not-allowed" : "pointer",
              opacity: idx === SLIDE_ORDER.length - 1 ? 0.5 : 1,
              transition: "all 0.2s",
              minHeight: 44
            }}
          >
            {isMobile ? "→" : "Next →"}
          </button>
        </div>
      </div>
    </>
  )
}

export default ActiGraftPresentationDeck
