import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════
   ACTIGRAFT TRAINING & EDUCATION MANUAL — e-PDF Edition
   ═══════════════════════════════════════════════════════════════════
   Design Reference: Legacy Medical Consultants ActiGraft Playbook
   + Master Training Guide | 2026 Edition
   Brand Ownership: Nightingale BioTech (bird watermark)
   Product Lines: ActiGraft (teal/cyan) · Legacy Medical (purple/magenta)
   ═══════════════════════════════════════════════════════════════════ */

// ─── DESIGN TOKENS (Enhanced Legacy Medical Consultants palette) ───
const C = {
  // Backgrounds — deep magenta/purple to bright teal/cyan gradient layers
  bg0: "#1D0B1F",   // deepest (body) — dark purple/magenta base
  bg1: "#2B1435",   // page base — rich purple
  bg2: "#3A1D4B",   // page content — purple-magenta
  bg3: "#2A3D52",   // elevated sections — purple-teal transition
  bg4: "#1E4555",   // card dark — teal
  bg5: "#26516B",   // card hover — brighter teal

  // Cream text hierarchy (matches Legacy Medical typography)
  cream1: "#F7F5F2", // primary headings — pure ivory
  cream2: "#EBE7DF", // body text — warm cream
  cream3: "#CCC4BA", // secondary text
  cream4: "#ACA49A", // muted/captions
  cream5: "#8C847A", // very muted

  // Cream card backgrounds (matches the light info boxes)
  cardCream: "#F7F4ED",
  cardCreamBorder: "#DDD4C8",
  cardCreamText: "#2C2520",
  cardCreamMuted: "#5C5448",

  // Teal/Cyan accents (enhanced — brighter, more electric)
  teal: "#00D4D4",        // bright teal/cyan core
  tealDark: "#00B8C5",    // darker teal
  tealDeep: "#009BAD",    // deep teal
  tealBright: "#1BFFFF",  // electric cyan highlight
  tealGlow: "rgba(0,212,212,0.12)",

  // Purple/Magenta accent cards (enhanced — more vibrant)
  purple: "#6B2E7D",      // rich purple
  purpleBorder: "#9D4BB8", // bright magenta border
  purpleLight: "#8A3D9E", // light purple
  purpleDark: "#451B52",  // dark purple
  magenta: "#B84BB8",     // vibrant magenta

  // Gold accents (Legacy Medical product line)
  gold: "#D4B870",
  goldDark: "#B09858",
  goldLight: "#ECD890",
  goldGlow: "rgba(212,184,112,0.14)",

  // Status
  green: "#7FBA9A",
  red: "#D07878",
  redLight: "#E09898",
  amber: "#D4B870",

  // Borders
  border: "#3D2454",
  borderLight: "#4D3464",
};

// ─── NIGHTINGALE BIRD SVG WATERMARK ───
const BirdWatermark = ({ style }) => (
  <svg viewBox="0 0 400 440" style={{ position: "absolute", opacity: 0.04, pointerEvents: "none", ...style }} fill="none">
    {/* Hummingbird / Nightingale silhouette — wings spread, facing right, digital particle aesthetic */}
    <path d="M200 40 C220 20, 260 10, 300 30 C340 50, 360 90, 340 130 C320 170, 280 180, 260 200 L340 160 C370 140, 395 150, 390 180 C385 210, 360 230, 330 240 L260 260 C280 280, 310 310, 320 350 C325 370, 315 395, 290 400 C265 405, 245 390, 240 370 C235 350, 225 330, 210 320 L200 310 L190 320 C175 330, 165 350, 160 370 C155 390, 135 405, 110 400 C85 395, 75 370, 80 350 C90 310, 120 280, 140 260 L70 240 C40 230, 15 210, 10 180 C5 150, 30 140, 60 160 L140 200 C120 180, 80 170, 60 130 C40 90, 60 50, 100 30 C140 10, 180 20, 200 40Z" fill={C.teal} />
    {/* Eye */}
    <circle cx="220" cy="65" r="6" fill={C.cream1} />
    {/* Beak */}
    <path d="M260 55 L310 40 L270 65 Z" fill={C.magenta} />
    {/* Wing detail lines */}
    <path d="M140 160 C160 140, 200 130, 240 140" stroke={C.tealBright} strokeWidth="1.2" opacity="0.5" />
    <path d="M130 180 C160 155, 210 145, 260 160" stroke={C.tealBright} strokeWidth="1" opacity="0.4" />
    <path d="M120 200 C155 175, 220 165, 280 185" stroke={C.tealBright} strokeWidth="0.8" opacity="0.3" />
    {/* Tail feather details */}
    <path d="M200 310 C210 340, 215 365, 210 390" stroke={C.teal} strokeWidth="1.2" opacity="0.4" />
    <path d="M200 310 C190 340, 185 365, 190 390" stroke={C.teal} strokeWidth="1.2" opacity="0.4" />
  </svg>
);

// ─── HEXAGONAL GRID + MOLECULAR BACKGROUND (Legacy Medical brand) ───
const MolecularBg = ({ variant = 0 }) => {
  // Hexagonal grid pattern positions
  const hexSize = 35;
  const hexRows = 30;
  const hexCols = 24;
  const hexagons = [];

  for (let row = 0; row < hexRows; row++) {
    for (let col = 0; col < hexCols; col++) {
      const x = col * hexSize * 1.5 + ((row % 2) * hexSize * 0.75);
      const y = row * hexSize * 0.866;
      hexagons.push({ x, y });
    }
  }

  // Molecular nodes and connections
  const helixOffsetX = variant === 0 ? 640 : 120;
  const helixOffsetY = variant === 0 ? 60 : 200;

  // Scattered luminous dots
  const dotSeed = variant * 37;
  const dots = [];
  for (let i = 0; i < 45; i++) {
    const seed = (i + dotSeed) * 2654435761;
    const x = ((seed >>> 0) % 1000) / 10;
    const y = ((seed * 31 >>> 0) % 1000) / 10;
    const r = 0.5 + ((seed * 17 >>> 0) % 8) / 10;
    const op = 0.05 + ((seed * 7 >>> 0) % 18) / 100;
    dots.push({ x, y, r, op });
  }

  return (
    <svg viewBox="0 0 820 1100" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
      <defs>
        {/* Hexagon path definition */}
        <path id="hexagon" d="M 0,-10 L 8.66,-5 L 8.66,5 L 0,10 L -8.66,5 L -8.66,-5 Z" />

        {/* Enhanced purple/magenta to teal/cyan gradient for background */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.purple} stopOpacity="0.12" />
          <stop offset="50%" stopColor={C.magenta} stopOpacity="0.10" />
          <stop offset="100%" stopColor={C.teal} stopOpacity="0.12" />
        </linearGradient>

        {/* Radial glow for holographic effect */}
        <radialGradient id="glowGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor={C.tealBright} stopOpacity="0.08" />
          <stop offset="50%" stopColor={C.magenta} stopOpacity="0.04" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hexagonal grid pattern */}
      <g opacity="0.04">
        {hexagons.map((hex, i) => (
          <use key={i} href="#hexagon" x={hex.x} y={hex.y} stroke={i % 3 === 0 ? C.teal : C.magenta} strokeWidth="0.6" fill="none" />
        ))}
      </g>

      {/* Luminous dot field */}
      {dots.map((d, i) => (
        <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`} r={d.r} fill={i % 2 === 0 ? C.tealBright : C.magenta} opacity={d.op} />
      ))}

      {/* Double helix structure */}
      <g transform={`translate(${helixOffsetX}, ${helixOffsetY})`} opacity="0.06">
        <path d={`M0,0 C40,50 -40,100 0,150 C40,200 -40,250 0,300 C40,350 -40,400 0,450 C40,500 -40,550 0,600 C40,650 -40,700 0,750 C40,800 -40,850 0,900`} stroke={C.tealBright} strokeWidth="2.5" fill="none" />
        <path d={`M80,0 C40,50 120,100 80,150 C40,200 120,250 80,300 C40,350 120,400 80,450 C40,500 120,550 80,600 C40,650 120,700 80,750 C40,800 120,850 80,900`} stroke={C.magenta} strokeWidth="2.5" fill="none" />
        {[0,75,150,225,300,375,450,525,600,675,750,825].map((y, i) => {
          const phase = Math.sin((y / 150) * Math.PI);
          const x1 = 40 + phase * 40;
          const x2 = 40 - phase * 40 + 80;
          return <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={C.cream4} strokeWidth="1.2" opacity="0.6" />;
        })}
      </g>

      {/* Diagonal geometric overlays (brand guide style) */}
      <g opacity="0.06">
        {variant === 0 ? (
          <>
            <path d="M 0,0 L 200,0 L 0,200 Z" fill="url(#bgGradient)" />
            <path d="M 820,1100 L 620,1100 L 820,900 Z" fill="url(#bgGradient)" />
          </>
        ) : (
          <>
            <path d="M 820,0 L 620,0 L 820,200 Z" fill="url(#bgGradient)" />
            <path d="M 0,1100 L 200,1100 L 0,900 Z" fill="url(#bgGradient)" />
          </>
        )}
      </g>

      {/* Holographic overlay effect */}
      <rect width="820" height="1100" fill="url(#glowGradient)" opacity="0.3" />
    </svg>
  );
};

// ─── GLOBAL STYLES (no animations) ───
const GlobalStyle = () => (
  <style>{`
    @media print {
      /* ── HIDE decorative / interactive elements ── */
      .mol-bg, .bird-wm, .toolbar-float, .no-print { display: none !important; }

      /* ── PAGE STRUCTURE: white base, no shadows ── */
      html, body { background: #fff !important; -webkit-print-color-adjust: exact; }
      .page {
        break-after: page !important;
        box-shadow: none !important;
        border: none !important;
        background: #fff !important;
        margin-bottom: 0 !important;
        border-radius: 0 !important;
      }

      /* ── ALL TEXT defaults to near-black ── */
      .page, .page * { color: #1a1a1a !important; }
      .page h1, .page h2, .page h3, .page h4 { color: #0B2030 !important; }
      .page strong { color: #111 !important; }

      /* ── CREAM INFO CARDS: light warm tint (minimal ink) ── */
      .cream-card { background: #f7f3ed !important; border: 1px solid #c8c0b4 !important; }
      .cream-card, .cream-card * { color: #222 !important; }

      /* ── PURPLE / TEAL DARK CARDS → white bg with teal left border ── */
      .page div[style*="background: ${C.purple}"],
      .page div[style*="background: rgb(107, 46, 125)"] {
        background: #fff !important;
        border: 1px solid #00D4D4 !important;
        border-left: 3px solid #00D4D4 !important;
      }

      /* ── ALERT CARDS → white bg, keep left accent border ── */
      .page div[style*="border-left: 3px"] {
        background: #fff !important;
      }

      /* ── DARK INFO PANELS (bg3, bg4 component cards) → light gray ── */
      .page div[style*="background: ${C.bg3}"],
      .page div[style*="background: rgb(42, 61, 82)"],
      .page div[style*="background: ${C.bg4}"],
      .page div[style*="background: rgb(30, 69, 85)"] {
        background: #f5f5f5 !important;
        border-color: #ccc !important;
      }

      /* ── TABLES ── */
      .tbl th {
        background: linear-gradient(135deg, #6B2E7D, #B84BB8, #00D4D4) !important;
        color: #1BFFFF !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .tbl td {
        background: #fff !important;
        border-color: #ccc !important;
        color: #222 !important;
      }
      .tbl tr:nth-child(even) td {
        background: #f8f8f8 !important;
      }

      /* ── PROGRESS / COMPARISON BARS → keep but with print-safe contrast ── */
      .page div[style*="height: 6px"] {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* ── STEP BADGES → keep teal fill (small, worth the ink) ── */
      .page div[style*="background: linear-gradient"][style*="min-width: 32px"] {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* ── SECTION HEADER BADGES (small teal pills) → keep ── */
      .page div[style*="background: linear-gradient"][style*="padding: 4px"] {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* ── STAT VALUES: dark text for readability ── */
      .page div[style*="font-size: 36px"] { color: #0B2030 !important; }

      /* ── FOOTER BAR → light border, dark text ── */
      .page > div:last-child {
        border-top-color: #ccc !important;
      }

      /* ── BODY / OUTER WRAPPER ── */
      .page + .page { margin-top: 0 !important; }
      @page { margin: 0.5in; size: letter; }
    }

    * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
    body { margin: 0; background: ${C.bg0}; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${C.bg0}; }
    ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
  `}</style>
);

// ─── PAGE WRAPPER (each "page" of the e-PDF) ───
// Using static variant based on pageNum to ensure consistent rendering
const Page = ({ children, pageNum, isMobile }) => {
  // Derive variant from page number for consistent background patterns
  const variant = typeof pageNum === 'string' && pageNum !== '' && pageNum !== 'i'
    ? parseInt(pageNum) % 2
    : (pageNum === 'i' ? 1 : 0);

  return (
    <div className="page" style={{
      position: "relative",
      maxWidth: 820,
      margin: isMobile ? "0 auto 20px" : "0 auto 32px",
      background: C.bg1,
      borderRadius: isMobile ? 0 : 8,
      boxShadow: isMobile ? "none" : `0 8px 32px ${C.purpleDark}80, 0 2px 12px ${C.teal}30, 0 0 40px ${C.magenta}15`,
      overflow: "hidden",
      minHeight: 400,
      border: `1px solid ${C.border}`
    }}>
      <div className="mol-bg"><MolecularBg variant={variant} /></div>
      <BirdWatermark style={{ bottom: -40, right: -20, width: 280, height: 300 }} />
    <div style={{
      position: "relative",
      zIndex: 1,
      padding: isMobile ? "28px 20px 44px" : "44px 48px 60px"
    }}>
      {children}
    </div>
    {/* Page number + footer */}
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: isMobile ? "10px 20px" : "10px 48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: `1px solid ${C.border}`,
      zIndex: 2
    }}>
      <span style={{
        fontSize: isMobile ? 7 : 8,
        color: C.cream5,
        letterSpacing: isMobile ? 0.5 : 1.5,
        textTransform: "uppercase"
      }}>
        {isMobile ? "Nightingale BioTech" : "Nightingale BioTech · Legacy Medical Consultants · Confidential"}
      </span>
      <span style={{ fontSize: 9, color: C.cream4, fontWeight: 700 }}>{pageNum}</span>
    </div>
  </div>
  );
};

// ─── REUSABLE COMPONENTS (Playbook-matched) ───

// Section header with geometric corner accents (Legacy Medical brand)
const SectionHead = ({ num, title, sub }) => (
  <div style={{ marginBottom: 28, position: "relative" }}>
    {/* Enhanced geometric corner accents with gradient */}
    <div style={{
      position: "absolute",
      top: -6,
      left: -6,
      width: 40,
      height: 40,
      borderTop: `2px solid ${C.teal}50`,
      borderLeft: `2px solid ${C.teal}50`,
      borderTopLeftRadius: 2
    }} />
    <div style={{
      position: "absolute",
      top: -6,
      right: -6,
      width: 40,
      height: 40,
      borderTop: `2px solid ${C.magenta}50`,
      borderRight: `2px solid ${C.magenta}50`,
      borderTopRightRadius: 2
    }} />

    {num && <div style={{
      display: "inline-block",
      background: `linear-gradient(135deg, ${C.purple}, ${C.magenta}, ${C.teal})`,
      color: "#fff",
      fontSize: 9,
      fontWeight: 800,
      padding: "4px 14px",
      borderRadius: 4,
      letterSpacing: 2,
      marginBottom: 12,
      textTransform: "uppercase",
      boxShadow: `0 2px 8px ${C.teal}40, 0 1px 16px ${C.magenta}30`
    }}>Section {num}</div>}

    <h2 style={{
      fontSize: 28,
      fontWeight: 800,
      color: C.cream1,
      margin: 0,
      lineHeight: 1.2,
      fontFamily: "'Georgia', 'Times New Roman', serif"
    }}>{title}</h2>

    {sub && <p style={{ fontSize: 13, color: C.cream4, margin: "6px 0 0", lineHeight: 1.4 }}>{sub}</p>}

    <div style={{
      width: 80,
      height: 3,
      background: `linear-gradient(90deg, ${C.purple}, ${C.magenta}, ${C.teal}, transparent)`,
      marginTop: 12,
      borderRadius: 2,
      boxShadow: `0 1px 8px ${C.teal}30`
    }} />
  </div>
);

// Cream info card (frosted glass aesthetic)
const CreamCard = ({ title, children, borderColor }) => (
  <div className="cream-card" style={{
    background: C.cardCream,
    border: `1px solid ${borderColor || C.cardCreamBorder}`,
    borderRadius: 10,
    padding: "18px 20px",
    marginBottom: 12,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
  }}>
    {title && <div style={{ fontSize: 14, fontWeight: 800, color: C.cardCreamText, marginBottom: 8, fontFamily: "'Georgia', serif" }}>{title}</div>}
    <div style={{ fontSize: 12.5, color: C.cardCreamMuted, lineHeight: 1.7 }}>{children}</div>
  </div>
);

// Dark purple-teal card (matches Legacy Medical brand)
const TealCard = ({ title, children, icon }) => (
  <div style={{
    background: C.purple,
    border: `1px solid ${C.purpleBorder}`,
    borderRadius: 8,
    padding: "18px 20px",
    marginBottom: 12,
    boxShadow: `0 2px 8px ${C.purpleDark}60, 0 1px 12px ${C.magenta}20`
  }}>
    {title && <div style={{ fontSize: 11, fontWeight: 700, color: C.tealBright, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</div>}
    <div style={{ fontSize: 12.5, color: C.cream2, lineHeight: 1.65 }}>{children}</div>
  </div>
);

// Alert / callout card (Legacy Medical brand: purple-teal gradient theme)
const AlertCard = ({ title, children, type }) => {
  const colors = {
    warn: { bg: `linear-gradient(135deg, ${C.gold}15, ${C.goldGlow})`, border: C.gold, text: C.goldLight },
    danger: { bg: `linear-gradient(135deg, ${C.red}15, rgba(208,120,120,0.08))`, border: C.red, text: C.redLight },
    info: { bg: `linear-gradient(135deg, ${C.purple}18, ${C.magenta}12, ${C.tealGlow})`, border: C.teal, text: C.tealBright }
  };
  const c = colors[type] || colors.info;
  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}50`,
      borderLeft: `3px solid ${c.border}`,
      borderRadius: 8,
      padding: "14px 18px",
      marginBottom: 12,
      boxShadow: `0 2px 8px ${C.purpleDark}30, 0 1px 12px ${c.border}20`
    }}>
      {title && <div style={{ fontSize: 11, fontWeight: 700, color: c.text, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>{title}</div>}
      <div style={{ fontSize: 12, color: C.cream3, lineHeight: 1.65 }}>{children}</div>
    </div>
  );
};

// Numbered step badge (Legacy Medical brand: gradient badge with glow)
const StepBadge = ({ n }) => (
  <div style={{
    minWidth: 32,
    height: 32,
    borderRadius: 6,
    background: `linear-gradient(135deg, ${C.purple}, ${C.magenta}, ${C.teal})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 800,
    fontSize: 15,
    flexShrink: 0,
    fontFamily: "'Georgia', serif",
    boxShadow: `0 2px 8px ${C.teal}50, 0 1px 16px ${C.magenta}30, inset 0 1px 0 rgba(255,255,255,0.15)`
  }}>{n}</div>
);

// Step row
const StepRow = ({ n, title, desc, time }) => (
  <div style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
    <StepBadge n={n} />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, color: C.cream1, fontSize: 14, fontFamily: "'Georgia', serif" }}>{title}</div>
      <div style={{ color: C.cream3, fontSize: 12, lineHeight: 1.6, marginTop: 3 }}>{desc}</div>
      {time && <div style={{ color: C.teal, fontSize: 10, fontWeight: 700, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.8 }}>{time}</div>}
    </div>
  </div>
);

// Big stat (Legacy Medical brand: gradient accent text)
const BigStat = ({ value, label, sub }) => (
  <div style={{ textAlign: "center", flex: "1 1 150px" }}>
    <div style={{
      fontSize: 36,
      fontWeight: 800,
      background: `linear-gradient(135deg, ${C.cream1}, ${C.tealBright}, ${C.magenta})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: 1,
      fontFamily: "'Georgia', serif",
      filter: `drop-shadow(0 2px 4px ${C.teal}30)`
    }}>{value}</div>
    <div style={{
      fontSize: 11,
      fontWeight: 700,
      color: C.teal,
      marginTop: 6,
      textTransform: "uppercase",
      letterSpacing: 0.6
    }}>{label}</div>
    {sub && <div style={{ fontSize: 10, color: C.cream5, marginTop: 3 }}>{sub}</div>}
  </div>
);

// Table (Legacy Medical brand: purple-magenta-teal gradient header)
const Tbl = ({ h, rows, compact }) => (
  <div style={{
    overflowX: "auto",
    marginBottom: 16,
    borderRadius: 8,
    border: `1px solid ${C.border}`,
    overflow: "hidden"
  }}>
    <table className="tbl" style={{ width: "100%", borderCollapse: "collapse", fontSize: compact ? 11 : 12 }}>
      <thead>
        <tr>{h.map((x, i) => <th key={i} style={{
          padding: compact ? "8px 10px" : "10px 14px",
          background: `linear-gradient(135deg, ${C.purple}, ${C.magenta}, ${C.teal})`,
          color: C.tealBright,
          textAlign: "left",
          borderBottom: `2px solid ${C.teal}`,
          fontWeight: 700,
          whiteSpace: "nowrap",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          fontSize: compact ? 9 : 10
        }}>{x}</th>)}</tr>
      </thead>
      <tbody>{rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci} style={{
        padding: compact ? "7px 10px" : "9px 14px",
        borderBottom: `1px solid ${C.border}`,
        background: ri % 2 === 0 ? C.bg2 : C.bg3,
        color: ci === 0 ? C.cream2 : C.cream3,
        fontWeight: ci === 0 ? 600 : 400
      }}>{c}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

// Body paragraph
const P = ({ children }) => <p style={{ fontSize: 13, color: C.cream2, lineHeight: 1.8, margin: "0 0 14px" }}>{children}</p>;

// Sub-heading
const H3 = ({ children }) => <h3 style={{ fontSize: 16, fontWeight: 700, color: C.cream1, margin: "20px 0 10px", fontFamily: "'Georgia', serif" }}>{children}</h3>;

// Two-column grid
const Grid2 = ({ children }) => <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 14 }}>{children}</div>;

// ─── SEND MODAL ───
const SendModal = ({ open, onClose }) => {
  const [method, setMethod] = useState("email");
  const [to, setTo] = useState("");
  const [msg, setMsg] = useState("I'd like to share our ActiGraft Training Manual with you. This covers clinical protocols, reimbursement guidance (CY2026 updates), MAC-specific billing, and implementation pathways.");
  if (!open) return null;
  const fire = () => {
    const subj = encodeURIComponent("ActiGraft Training & Education Manual — Nightingale BioTech / Legacy Medical");
    const body = encodeURIComponent(msg + "\n\n" + window.location.href);
    window.open(method === "email" ? `mailto:${to}?subject=${subj}&body=${body}` : `sms:${to}?body=${encodeURIComponent(msg + " " + window.location.href)}`, "_blank");
    onClose();
  };
  const inp = { width: "100%", padding: 10, borderRadius: 4, border: `1px solid ${C.borderLight}`, background: C.bg2, color: C.cream1, fontSize: 13, outline: "none", boxSizing: "border-box" };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,12,18,0.92)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.bg3,
        border: `1px solid ${C.purpleBorder}`,
        borderRadius: 10,
        padding: 28,
        width: "100%",
        maxWidth: 440,
        boxShadow: `0 8px 32px ${C.purpleDark}80, 0 2px 12px ${C.teal}40, 0 0 60px ${C.magenta}20`
      }}>
        <h3 style={{ color: C.cream1, fontSize: 16, fontWeight: 700, margin: "0 0 16px", fontFamily: "'Georgia', serif" }}>Quick Send Manual</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["email", "sms"].map(m => <button key={m} onClick={() => setMethod(m)} style={{ flex: 1, padding: "7px 14px", borderRadius: 4, border: `1px solid ${method === m ? C.teal : C.border}`, background: method === m ? C.tealGlow : "transparent", color: method === m ? C.teal : C.cream4, cursor: "pointer", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{m === "email" ? "Email" : "SMS"}</button>)}
        </div>
        <input value={to} onChange={e => setTo(e.target.value)} placeholder={method === "email" ? "recipient@hospital.com" : "+1 (555) 000-0000"} style={{ ...inp, marginBottom: 10 }} />
        <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={3} style={{ ...inp, marginBottom: 14, resize: "vertical", fontSize: 12 }} />
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 9, borderRadius: 4, border: `1px solid ${C.border}`, background: "transparent", color: C.cream4, cursor: "pointer" }}>Cancel</button>
          <button onClick={fire} style={{ flex: 1, padding: 9, borderRadius: 4, border: "none", background: `linear-gradient(135deg, ${C.teal}, ${C.magenta})`, color: "#fff", fontWeight: 700, cursor: "pointer", boxShadow: `0 2px 8px ${C.teal}40` }}>Send</button>
        </div>
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════════
// MAIN APPLICATION
// ════════════════════════════════════════════════════════
export default function ActiGraftManual() {
  const [sendOpen, setSendOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(isMobile);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to top when component mounts (tab is opened)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Cleanup: close modals when component unmounts (tab is switched)
    return () => {
      setSendOpen(false);
      setTocOpen(false);
    };
  }, []);

  const sections = [
    { id: "cover", label: "Cover", pg: "" },
    { id: "toc", label: "Table of Contents", pg: "i" },
    { id: "s1", label: "The 2026 Medicare Landscape", pg: "1" },
    { id: "s2", label: "ActiGraft Technology & Whole Blood Science", pg: "3" },
    { id: "s3", label: "Clinical Application Protocol", pg: "5" },
    { id: "s4", label: "Billing, Coding & Reimbursement", pg: "7" },
    { id: "s5", label: "MAC-Specific Coverage & Requirements", pg: "9" },
    { id: "s6", label: "Documentation & Audit Protection", pg: "11" },
    { id: "s7", label: "Financial Impact & Revenue Modeling", pg: "13" },
    { id: "s8", label: "Competitive Intelligence Matrix", pg: "15" },
    { id: "s9", label: "Sales Strategy & Objection Handling", pg: "17" },
    { id: "s10", label: "Territory Intel: Memphis & Arkansas", pg: "19" },
    { id: "s11", label: "Implementation & Getting Started", pg: "21" },
    { id: "s12", label: "Quick Reference & Resources", pg: "22" },
  ];

  const goTo = (id) => { setTocOpen(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80); };

  return (
    <div style={{ background: C.bg0, minHeight: "100vh", fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", paddingBottom: 80 }}>
      <GlobalStyle />
      <SendModal open={sendOpen} onClose={() => setSendOpen(false)} />

      {/* ═══ FLOATING TOOLBAR ═══ */}
      <div className="toolbar-float no-print" style={{
        position: "fixed",
        top: isMobile ? 8 : 16,
        right: isMobile ? 8 : 16,
        zIndex: 500,
        display: "flex",
        gap: isMobile ? 4 : 6,
        flexWrap: "wrap"
      }}>
        <button onClick={() => setTocOpen(!tocOpen)} style={{
          padding: isMobile ? "6px 10px" : "7px 14px",
          borderRadius: 4,
          border: `1px solid ${C.borderLight}`,
          background: C.bg3,
          color: C.cream3,
          cursor: "pointer",
          fontSize: isMobile ? 10 : 11,
          fontWeight: 600
        }}>
          {tocOpen ? "✕" : "☰"}
        </button>
        <button onClick={() => window.print()} style={{
          padding: isMobile ? "6px 10px" : "7px 14px",
          borderRadius: 4,
          border: `1px solid ${C.borderLight}`,
          background: C.bg3,
          color: C.cream3,
          cursor: "pointer",
          fontSize: isMobile ? 10 : 11,
          fontWeight: 600
        }}>
          🖨
        </button>
        <button onClick={() => setSendOpen(true)} style={{
          padding: isMobile ? "6px 10px" : "7px 14px",
          borderRadius: 4,
          border: `1px solid ${C.teal}50`,
          background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`,
          color: C.tealBright,
          cursor: "pointer",
          fontSize: isMobile ? 10 : 11,
          fontWeight: 700,
          boxShadow: `0 2px 8px ${C.teal}40`
        }}>
          ✉
        </button>
      </div>

      {/* ═══ TOC SIDEBAR ═══ */}
      {tocOpen && <div className="no-print" style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 300, maxWidth: "80vw", background: C.bg2, borderLeft: `1px solid ${C.borderLight}`, zIndex: 400, overflowY: "auto", padding: "60px 16px 16px", boxShadow: "-4px 0 40px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: 9, color: C.cream5, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Table of Contents</div>
        {sections.map(s => (
          <button key={s.id} onClick={() => goTo(s.id)} style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "7px 6px", border: "none", background: "transparent", color: C.cream3, cursor: "pointer", fontSize: 12, textAlign: "left", borderRadius: 3 }}
            onMouseEnter={e => e.currentTarget.style.background = C.bg4} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <span>{s.label}</span>{s.pg && <span style={{ color: C.cream5, fontSize: 10 }}>{s.pg}</span>}
          </button>
        ))}
      </div>}

      <div style={{ padding: isMobile ? "12px 8px 0" : "24px 16px 0" }}>

        {/* ════════════════════════════════════
            COVER PAGE
        ════════════════════════════════════ */}
        <div id="cover">
          <Page isMobile={isMobile} pageNum="">
            {/* Nightingale ownership watermark — large, centered */}
            <BirdWatermark style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 360, height: 400, opacity: 0.05 }} />
            <div style={{ textAlign: "center", padding: "60px 0 40px", position: "relative" }}>
              {/* Nightingale brand mark */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32, padding: "8px 20px", border: `1px solid ${C.border}`, borderRadius: 40, boxShadow: `0 2px 12px ${C.teal}20, 0 1px 20px ${C.magenta}15` }}>
                <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: C.teal }}>
                  <path d="M12 2C14 1,18 3,19 6C20 9,18 12,16 13L20 11C22 10,23 12,22 14C21 16,18 17,16 17L12 19C13 21,12 23,10 23C8 23,7 21,8 19L4 17C2 17,0 16,0 14C0 12,2 10,4 11L8 13C6 12,4 9,5 6C6 3,10 1,12 2Z" />
                </svg>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.cream4, letterSpacing: 3, textTransform: "uppercase" }}>Nightingale BioTech</span>
              </div>

              <div style={{
                fontSize: 10,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${C.magenta}, ${C.gold})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 20
              }}>Legacy Medical Consultants Presents</div>

              <h1 style={{ fontSize: 38, fontWeight: 800, color: C.cream1, margin: "0 0 8px", lineHeight: 1.2, fontFamily: "'Georgia', 'Times New Roman', serif" }}>ActiGraft Playbook</h1>
              <h2 style={{ fontSize: 20, fontWeight: 400, color: C.cream3, margin: "0 0 8px", fontFamily: "'Georgia', serif" }}>for Distributor & Physician Partners</h2>
              <p style={{
                fontSize: 13,
                background: `linear-gradient(135deg, ${C.teal}, ${C.magenta})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 600,
                margin: 0
              }}>Comprehensive Training for Market Excellence</p>

              <div style={{
                width: 80,
                height: 2,
                background: `linear-gradient(90deg, ${C.purple}, ${C.magenta}, ${C.teal})`,
                margin: "28px auto",
                boxShadow: `0 1px 12px ${C.teal}40, 0 1px 12px ${C.magenta}30`
              }} />

              <div style={{ fontSize: 12, color: C.cream4, marginBottom: 6 }}>2026 Edition</div>
              <div style={{ fontSize: 10, color: C.cream5, letterSpacing: 1 }}>Palmetto GBA (TN) · Novitas Solutions (AR, MS, TX) · WPS J5 (MO)</div>
              <div style={{ fontSize: 10, color: C.cream5, marginTop: 4 }}>Memphis CSRA · Jonesboro–Little Rock Corridor</div>

              <div style={{ marginTop: 40, padding: "12px 24px", display: "inline-block", border: `1px solid ${C.border}`, borderRadius: 4, boxShadow: `0 2px 8px ${C.teal}20` }}>
                <div style={{ fontSize: 9, color: C.cream5, letterSpacing: 1.5, textTransform: "uppercase" }}>Transforming Healthcare Through Innovation</div>
              </div>
            </div>
          </Page>
        </div>

        {/* ════════════════════════════════════
            TABLE OF CONTENTS
        ════════════════════════════════════ */}
        <div id="toc">
          <Page isMobile={isMobile} pageNum="i">
            <SectionHead title="Table of Contents" />
            <div style={{ marginTop: 10 }}>
              {sections.filter(s => s.pg && s.pg !== "i").map((s, i) => (
                <button key={s.id} onClick={() => goTo(s.id)} style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0", border: "none", borderBottom: `1px solid ${C.border}`, background: "transparent", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ color: C.cream2, fontSize: 14, fontFamily: "'Georgia', serif" }}>{s.label}</span>
                  <span style={{ color: C.cream5, fontSize: 12, fontWeight: 600, minWidth: 24, textAlign: "right" }}>{s.pg}</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 28, padding: "14px 18px", background: `linear-gradient(135deg, ${C.purple}15, ${C.tealGlow})`, border: `1px solid ${C.teal}40`, borderRadius: 4, boxShadow: `0 2px 8px ${C.teal}20` }}>
              <div style={{ fontSize: 11, color: C.tealBright, fontWeight: 700, marginBottom: 4 }}>CONFIDENTIAL — AUTHORIZED DISTRIBUTORS ONLY</div>
              <div style={{ fontSize: 11, color: C.cream4 }}>This training manual contains proprietary sales strategies, territory intelligence, and competitive positioning data. Unauthorized distribution is prohibited. © 2026 Nightingale BioTech / Legacy Medical Consultants.</div>
            </div>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 1 — THE 2026 LANDSCAPE
        ════════════════════════════════════ */}
        <div id="s1">
          <Page isMobile={isMobile} pageNum="1">
            <SectionHead num="I" title="The 2026 Medicare Wound Care Landscape" sub="The market shift that creates your opportunity" />
            <P>The Medicare wound care market is undergoing its most significant restructuring in a decade. Effective January 1, 2026, CMS reduced covered skin substitute products from over 210 to just 18 — a <strong style={{ color: C.cream1 }}>91% reduction</strong> that has disrupted treatment protocols nationwide. Meanwhile, PRP wound care under NCD 270.3 remains completely untouched, creating a stable, high-reimbursement alternative.</P>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "22px 0" }}>
              <BigStat value="210→18" label="Skin Substitutes Cut" sub="91% coverage reduction Jan 2026" />
              <BigStat value="$1,064" label="G0465 Office Rate" sub="CY2026 — up 38.1% from $770.83" />
              <BigStat value="20 Wk" label="Guaranteed Coverage" sub="NCD 270.3 diabetic wounds" />
              <BigStat value="$0" label="Equipment Cost" sub="No capital investment required" />
            </div>

            <Grid2>
              <CreamCard title="What's NOT Changing — Your Stability">NCD 270.3 has had zero modifications since its April 2021 expansion. G0465 coverage for diabetic chronic wounds is nationally mandated across all MACs for 20 weeks — no prior authorization required. CY2026 actually increased the non-facility rate by 38.1%.</CreamCard>
              <TealCard title="What IS Changing — The Urgency">Over 190 skin substitute products lost Medicare coverage January 1, 2026. Providers relying on these products face immediate revenue disruption and treatment gaps. ActiGraft fills this gap under an entirely separate, protected NCD reimbursement pathway.</TealCard>
            </Grid2>

            <AlertCard type="warn" title="The Window Is 90 Days">Early adopters who implement ActiGraft now capture disproportionate market share before displaced skin substitute providers pivot to PRP. First-mover advantage in your territory is time-limited. Every day of delay is revenue lost and patients underserved.</AlertCard>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 2 — TECHNOLOGY & SCIENCE
        ════════════════════════════════════ */}
        <div id="s2">
          <Page isMobile={isMobile} pageNum="3">
            <SectionHead num="II" title="ActiGraft Technology & Whole Blood Science" sub="The biological foundation of clinical superiority" />
            <P>ActiGraft is fundamentally different from conventional PRP systems. Rather than concentrating platelets by centrifugation — which discards red blood cells, most white blood cells, and disrupts the plasma protein profile — ActiGraft preserves the patient's <strong style={{ color: C.cream1 }}>whole blood in its natural physiologic ratios</strong> to create a biological wound matrix.</P>

            <H3>The Whole Blood Advantage — What ActiGraft Preserves</H3>
            <Grid2>
              {[
                { t: "Platelets", d: "Growth factors PDGF, TGF-β, VEGF, EGF in natural concentration. No artificial concentration, no disrupted ratios.", c: C.teal },
                { t: "Red Blood Cells", d: "Oxygen delivery to hypoxic wound bed — completely absent in conventional PRP. Critical for cellular metabolism.", c: C.red },
                { t: "White Blood Cells", d: "Full immune response including neutrophils, macrophages, and lymphocytes. Infection defense at wound site.", c: C.green },
                { t: "Plasma Proteins", d: "Fibrinogen, albumin, and immunoglobulins in physiologic balance. Natural scaffold formation.", c: C.gold },
              ].map((item, i) => (
                <div key={i} style={{ background: C.bg3, borderRadius: 6, padding: "14px 16px", border: `1px solid ${C.border}`, borderTop: `3px solid ${item.c}`, boxShadow: `0 1px 8px ${item.c}20` }}>
                  <div style={{ color: item.c, fontWeight: 700, fontSize: 13, marginBottom: 4, fontFamily: "'Georgia', serif" }}>{item.t}</div>
                  <div style={{ color: C.cream4, fontSize: 11.5, lineHeight: 1.55 }}>{item.d}</div>
                </div>
              ))}
            </Grid2>

            <H3>Growth Factor Preservation Comparison</H3>
            {[
              { l: "ActiGraft (Whole Blood)", v: 100, c: C.teal },
              { l: "AutoGel / Aurix (Nuo)", v: 50, c: C.gold },
              { l: "SkinDisc (Innoveren)", v: 40, c: C.amber },
              { l: "RegenKit (RegenLab/MiMedx)", v: 35, c: C.red },
              { l: "3C Patch (Reapplix)", v: 30, c: C.red },
            ].map((b, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: C.cream3 }}>{b.l}</span>
                  <span style={{ fontSize: 11, color: b.c, fontWeight: 700 }}>{b.v}%</span>
                </div>
                <div style={{ height: 6, background: C.bg4, borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${b.v}%`, background: b.c, borderRadius: 3, boxShadow: `0 1px 6px ${b.c}40` }} />
                </div>
              </div>
            ))}
            <div style={{ fontSize: 10, color: C.cream5, fontStyle: "italic", marginTop: 4, marginBottom: 16 }}>Centrifugation concentrates platelets but discards 60–70% of growth factors in the supernatant.</div>

            <AlertCard type="info" title="FDA 510(k) Clearance">ActiGraft PRO — 510(k) BK241079 — FDA cleared for management of exuding cutaneous wounds including diabetic ulcers. Product Code: PMQ. Autologous whole blood product — the patient's own blood becomes the therapy. Zero risk of immune rejection or disease transmission.</AlertCard>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 3 — CLINICAL PROTOCOL
        ════════════════════════════════════ */}
        <div id="s3">
          <Page isMobile={isMobile} pageNum="5">
            <SectionHead num="III" title="Clinical Application Protocol" sub="15-minute total procedure — from blood draw to dressing" />
            <P>ActiGraft's streamlined protocol allows wound care providers to treat up to 12 patients per day without adding clinical staff. Each application follows a standardized six-phase workflow that any trained RN/LPN can execute with confidence.</P>

            <StepRow n={1} title="Patient Assessment & Selection" desc="Confirm eligible wound: chronic (≥4 weeks), failed conservative therapy (≥30 days documented), adequate vascular status (ABI ≥0.7), controlled diabetes (HbA1c <9%). Document wound L×W×D in cm. Photograph with ruler and date stamp." time="Pre-procedure" />
            <StepRow n={2} title="Wound Bed Preparation" desc="Standard debridement if indicated. Irrigate with sterile normal saline using gentle, non-traumatic technique. Achieve hemostasis. Remove surface exudate and biofilm. Pat dry with sterile gauze." time="3–5 minutes" />
            <StepRow n={3} title="Blood Collection" desc="Standard venipuncture. Draw 18–20 mL autologous whole blood into ActiGraft sterile collection vessel pre-filled with ACD-A anticoagulant. Closed-system design prevents contamination." time="2 minutes" />
            <StepRow n={4} title="ActiGraft Processing" desc="Transfer blood to processing cartridge per kit instructions. 2–3 minute automated processing at room temperature (20–24°C). No centrifuge required. Monitor timer/color change for completion. Output: 3–5 mL processed blood for application." time="2–3 minutes" />
            <StepRow n={5} title="Application" desc="Position applicator 2–3 inches above wound bed at 45° angle. Start from deepest area, progress outward. Target ~0.5 mL per 2×2 inch area. Allow 30–60 seconds for fibrin network formation. Do NOT disturb during setting period." time="3 minutes" />
            <StepRow n={6} title="Dressing & Documentation" desc="Inner layer: non-adherent silicone gauze (extends 0.5 inch beyond wound margin). Outer layer: absorbent foam for moisture management. Photograph post-application. Complete treatment note with wound measurements, tissue composition, and medical necessity narrative." time="5 minutes" />

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "22px 0" }}>
              <BigStat value="15 min" label="Total Procedure" sub="vs. 45–60 min competitor systems" />
              <BigStat value="3×" label="Patient Throughput" sub="12 patients/day with current staff" />
              <BigStat value="2 hrs" label="Staff Training" sub="RN/LPN competency certification" />
            </div>

            <CreamCard title="Dual-Daily Application Protocol">ActiGraft may be applied twice daily (morning + evening) when clinically justified. Morning application at 8 AM with full wound prep; evening at 6 PM with gentle saline cleanse only. Each application billed separately. This enables up to 280 total applications over the 20-week NCD 270.3 coverage period — compared to approximately 20 with conventional PRP systems.</CreamCard>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 4 — BILLING & CODING
        ════════════════════════════════════ */}
        <div id="s4">
          <Page isMobile={isMobile} pageNum="7">
            <SectionHead num="IV" title="Billing, Coding & Reimbursement Mastery" sub="HCPCS codes, payment architecture, and claim requirements" />
            <P>PRP wound care applications use <strong style={{ color: C.cream1 }}>HCPCS codes, NOT CPT codes</strong>. This fundamental distinction creates both compliance opportunities and denial risks if misunderstood. The most critical codes for your practice are G0465 (diabetic) and G0460 (non-diabetic).</P>

            <Tbl h={["Element", "G0465 (Diabetic)", "G0460 (Non-Diabetic)"]} rows={[
              ["Coverage Authority", "National (NCD 270.3)", "MAC-determined (LCD)"],
              ["CY2026 Non-Facility", "$1,064.49", "Contractor priced (no national rate)"],
              ["CY2026 Hospital Outpt", "$2,107.97 (APC 5054)", "Contractor priced"],
              ["Invoice Required", "YES — mandatory with claim", "MAC-specific"],
              ["Coverage Duration", "20 weeks from first treatment", "MAC-specific"],
              ["Prior Authorization", "No (first 20 weeks)", "Often required"],
              ["Denial Rate", "~8% (documentation errors)", "15–25% (coverage gaps)"],
            ]} />

            <H3>Payment Rates by Setting</H3>
            <Tbl h={["Setting", "CY2026 Rate", "Claim Form", "Key Notes"]} rows={[
              ["Office / Clinic (POS 11)", "$1,064.49", "CMS-1500", "+38.1% increase from CY2025 ($770.83)"],
              ["Hospital Outpatient (POS 22)", "$2,107.97", "UB-04", "APC 5054 · Physician: $83.84 component"],
              ["Critical Access Hospital", "101% of cost", "UB-04 (85X)", "Cost-based reimbursement — high margin"],
              ["SNF (POS 31)", "$1,064.49", "CMS-1500", "Standard physician fee schedule"],
              ["RHC / FQHC", "All-inclusive rate", "UB-04", "TOB 71X (RHC) / 77X (FQHC)"],
            ]} />

            <AlertCard type="danger" title="Mandatory Dual Diagnosis Coding — All MACs">Every G0465 claim requires <strong>two ICD-10 codes</strong>: one for diabetes (E11.xxx) and one for chronic ulcer (L97.xxx). Example: E11.621 + L97.411. Claims with only one code are auto-denied. This is the #1 preventable denial in PRP wound care billing.</AlertCard>

            <CreamCard title="Invoice Submission — The Most Common Denial">An itemized invoice must accompany every G0465 claim. Invoice must show: product name ("ActiGraft PRO"), unit price, manufacturer, FDA 510(k) number (BK241079). Invoice dated same day as treatment or earlier. Volume discounts on purchasing do not affect reimbursement rate. Submit claims within 30 days of treatment.</CreamCard>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 5 — MAC COVERAGE
        ════════════════════════════════════ */}
        <div id="s5">
          <Page isMobile={isMobile} pageNum="9">
            <SectionHead num="V" title="MAC-Specific Coverage & Requirements" sub="Regional billing variations that make or break your claims" />

            <AlertCard type="danger" title="Memphis Tri-State Dual-MAC Alert">The Memphis CSRA straddles two MAC jurisdictions. Shelby, Tipton, and Fayette counties (TN) bill through Palmetto GBA JJ. DeSoto, Marshall, Tate, and Tunica counties (MS) plus Crittenden County (AR) bill through Novitas JH. Always verify treatment location — not patient home address — for MAC assignment.</AlertCard>

            <CreamCard title="Palmetto GBA — Jurisdiction JJ (Tennessee)">
              <strong>LCD:</strong> L38745 · <strong>Coverage:</strong> G0465 covered 20 weeks, no prior auth. ~78% approval for week 21–24 extensions via KX modifier.<br />
              <strong>Documentation:</strong> Baseline measurements, 30+ day failed conservative therapy, photo with ruler/date stamp, patient-specific medical necessity narrative, mandatory invoice with every G0465 claim.<br />
              <strong>Portal:</strong> palmettogba.com · <strong>Hotline:</strong> 1-800-PALMETTO
            </CreamCard>

            <CreamCard title="Novitas Solutions — Jurisdiction JH (AR, MS, TX, LA)">
              <strong>LCD:</strong> L39068 (v21, updated July 2025) · <strong>Coverage:</strong> G0465 per NCD 270.3. G0460 contractor-priced.<br />
              <strong>Documentation:</strong> Wound assessment with size/location/duration, prior treatment history, FDA-cleared device identification, treatment notes each session.<br />
              <strong>Portal:</strong> novitas-solutions.com (Novitasphere) · <strong>JH Line:</strong> 1-855-252-8782
            </CreamCard>

            <TealCard title="WPS Government Health Admin — J5 (Missouri)">
              <strong style={{ color: C.redLight }}>LCD: NONE — No published LCD for PRP wound care.</strong> G0465 per NCD 270.3 nationally. G0460 has no explicit coverage pathway. Engage WPS medical director proactively before first claim submission. Portal: wpsgha.com · EDI Support: 800-782-8082 (option 1).
            </TealCard>

            <H3>Billing Mechanics by Setting</H3>
            <Tbl compact h={["Setting", "Form", "TOB", "Rev Code", "Payment"]} rows={[
              ["Office (POS 11)", "CMS-1500", "—", "—", "MPFS $1,064.49"],
              ["Hospital Outpt (POS 22)", "UB-04", "13X", "0942", "OPPS APC 5054"],
              ["CAH Outpatient", "UB-04", "85X", "0942", "101% reasonable cost"],
              ["SNF (POS 31)", "CMS-1500", "—", "—", "MPFS rate"],
              ["RHC", "UB-04", "71X", "521", "All-inclusive"],
              ["FQHC", "UB-04", "77X", "520", "All-inclusive"],
            ]} />

            <CreamCard title="Tennessee Provider Scope (Palmetto JJ)"><strong>RNs:</strong> Can administer under physician supervision. Bill through supervising physician/practice NPI. Cannot independently bill Medicare.<br /><strong>NPs:</strong> Can administer independently within scope and bill Medicare directly at 85% of physician rate using own NPI. Must maintain collaborative agreement per TN Board of Nursing.</CreamCard>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 6 — DOCUMENTATION & AUDIT
        ════════════════════════════════════ */}
        <div id="s6">
          <Page isMobile={isMobile} pageNum="11">
            <SectionHead num="VI" title="Documentation & Audit Protection" sub="Your compliance moat against denials and OIG audits" />
            <P>OIG increased wound care audits 8% in 2025 with a projected 15% increase for 2026. Focus areas include medical necessity narratives, diagnosis code validity, and conservative care documentation. Superior documentation templates are your competitive moat — facilities choose the distributor who makes compliance effortless.</P>

            <H3>The 6-Point Audit-Ready Documentation Flow</H3>
            <StepRow n={1} title="Dual ICD-10 Diagnosis Codes" desc="E11.xxx (diabetes + complication) + L97.xxx (chronic ulcer by location/severity). Example pairing: E11.621 + L97.411. Never submit with only one code — auto-denial at all MACs." />
            <StepRow n={2} title="Failed Conservative Therapy" desc="Minimum 30 consecutive days documented: specific dressing types used (foam, hydrocolloid, alginate), weekly measurements showing <10–20% improvement." />
            <StepRow n={3} title="Vascular Assessment" desc="ABI ≥0.7 documented. Alternative PVR waveforms if ABI not obtainable due to calcification. Required by all three MACs (Palmetto, Novitas, WPS)." />
            <StepRow n={4} title="Baseline Wound Documentation" desc="Length × Width × Depth in centimeters. Photography with ruler and date stamp. Tissue composition percentages (granulation, slough, eschar). Wound bed color assessment." />
            <StepRow n={5} title="Medical Necessity Narrative" desc="Patient-specific narrative (not template boilerplate). Clinical reasoning for ActiGraft selection over alternatives. Expected outcomes. Written BEFORE or AT treatment — never retroactively." />
            <StepRow n={6} title="Invoice Documentation" desc="Itemized: unit price, product name 'ActiGraft PRO', manufacturer, 510(k) BK241079. Dated same day as treatment or earlier. Must be submitted with every G0465 claim." />

            <H3>Appeal Process by MAC Level</H3>
            <Tbl compact h={["Level", "Timeframe to File", "Reviewed By", "Reversal Rate"]} rows={[
              ["Level 1 — Redetermination", "120 days after denial", "Original MAC", "~40% with proper documentation"],
              ["Level 2 — Reconsideration", "60 days after Level 1", "QIC (Independent Contractor)", "~25%"],
              ["Level 3 — ALJ Hearing", "90–120 days after Level 2", "Administrative Law Judge", "Higher (>$180 in controversy)"],
            ]} />
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 7 — FINANCIAL IMPACT
        ════════════════════════════════════ */}
        <div id="s7">
          <Page isMobile={isMobile} pageNum="13">
            <SectionHead num="VII" title="Financial Impact & Revenue Modeling" sub="Three volume scenarios at CY2026 reimbursement rates" />

            <Tbl h={["Scenario", "Monthly Apps", "Monthly Revenue", "Annual Revenue", "Product Cost"]} rows={[
              ["Conservative (Launch)", "20", "$21,290", "$255,477", "~$4,000/mo"],
              ["Moderate (Month 3–4)", "50", "$53,225", "$638,694", "~$10,000/mo"],
              ["Aggressive (6–12 mo)", "100", "$106,449", "$1,277,388", "~$20,000/mo"],
            ]} />
            <div style={{ fontSize: 10, color: C.cream5, fontStyle: "italic", marginBottom: 20 }}>Based on G0465 non-facility $1,064.49. Varies by GPCI locality. Excludes G0460 and cash-pay.</div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "0 0 22px" }}>
              <BigStat value="$0" label="Equipment Investment" sub="No centrifuge purchase needed" />
              <BigStat value="60 Days" label="ROI Timeline" sub="Conservative 20 apps/month" />
              <BigStat value="127%" label="CAH ROI" sub="Cost-based reimbursement" />
            </div>

            <CreamCard title="Critical Access Hospital: The 101% Opportunity">
              CAHs receive 101% of reasonable costs for outpatient services. The financial model: purchase ActiGraft at volume discounts, bill Medicare at documented standard cost, keep the spread plus 1% premium. A CAH treating 15 wound patients bi-weekly generates <strong>$152,700+ annual net margin</strong>. Additional revenue from swing bed stays (5–7 extra days × $550/day per wound patient) adds $33,000+ annually. Interim payments at 40% upfront, full reconciliation at year-end.
            </CreamCard>

            <TealCard title="The Swing Bed Revenue Multiplier">Complex wound patients stay 5–7 days longer during active ActiGraft treatment. At $550/day per diem rate, this generates $3,300 per patient in swing bed revenue. For 10 wound patients annually, that's $33,000 in additional revenue on top of ActiGraft application margins.</TealCard>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 8 — COMPETITIVE INTEL
        ════════════════════════════════════ */}
        <div id="s8">
          <Page isMobile={isMobile} pageNum="15">
            <SectionHead num="VIII" title="Competitive Intelligence Matrix" sub="Know every competitor's weakness and how to exploit it" />

            <Tbl h={["Feature", "ActiGraft", "SkinDisc", "RegenKit", "3C Patch", "AutoGel"]} rows={[
              ["Prep Time", "✓ 5 min", "✗ 20–30 min", "✗ 25–35 min", "✗ 45–60 min", "✗ 15–20 min"],
              ["Equipment Cost", "✓ $0", "✗ $3–5K", "✗ $4–6K", "✗ $15–18K", "✗ $2–3K"],
              ["Space Required", "✓ 2×2 ft", "4×4 ft", "4×6 ft", "✗ 8×8 ft", "2×2 ft"],
              ["Training Time", "✓ 2 hours", "4–6 hours", "✗ 6–8 hours", "✗ 8–12 hours", "2–3 hours"],
              ["Daily Applications", "✓ Up to 2", "✗ 1 max", "✗ 1 max", "✗ 1 max", "✗ 1 max"],
              ["RBC Preserved", "✓ 100%", "✗ None", "✗ None", "✗ None", "✗ None"],
              ["Growth Factors", "✓ 100%", "✗ 20–40%", "✗ 20–40%", "✗ 20–40%", "30–50%"],
              ["12-Wk Closure Rate", "✓ 65–70%", "56%", "56%", "54%", "52%"],
              ["Supply Chain", "✓ USA", "USA", "✗ Switzerland", "✗ Denmark", "USA"],
              ["Volume Discounts", "✓ Yes (tiered)", "✗ No", "✗ Limited", "✗ No", "✗ No"],
            ]} />

            <AlertCard type="warn" title="MiMedx RegenKit Distribution Alert — Competitive Threat">MiMedx recently secured exclusive U.S. distribution for RegenKit Wound Gel-2. This is a significant competitive threat — MiMedx has an established wound care sales force and deep GPO relationships. Counter-positioning: RegenKit still requires centrifugation (35 min prep), discards all RBCs, relies on international supply chain from Switzerland, and MiMedx distribution markup increases facility cost. ActiGraft's zero equipment cost, 5-minute prep, domestic supply chain, and whole blood approach create clear, defensible differentiation.</AlertCard>

            <Grid2>
              <CreamCard title="GPO Access — Your Leverage">
                <strong>Vizient:</strong> Innovative Technology Contract since October 2022<br />
                <strong>Premier:</strong> Contract since March 2022<br />
                <strong>Healogics iSupply:</strong> Added October 2024 — 600+ wound centers nationwide<br /><br />
                When a facility says "we need to go through our GPO," respond: <em>"ActiGraft already has contracts with Vizient, Premier, and Healogics. Which GPO does your facility use?"</em>
              </CreamCard>
              <TealCard title="CMS Does NOT Approve Specific Brands">CMS requires any FDA-cleared device with a wound care indication. No "approved company" list exists. Any competitor claiming exclusivity is incorrect. Your advantage comes from superior workflow, pricing, clinical support, and provider relationships — not regulatory lock-in.</TealCard>
            </Grid2>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 9 — SALES & OBJECTIONS
        ════════════════════════════════════ */}
        <div id="s9">
          <Page isMobile={isMobile} pageNum="17">
            <SectionHead num="IX" title="Sales Strategy & Objection Handling" sub="From prospect to signed contract — the proven playbook" />

            <H3>Account Prioritization Framework</H3>
            <Tbl compact h={["Priority", "Setting", "Key Indicators", "Monthly Volume"]} rows={[
              ["★★★ Highest", "Critical Access Hospitals", "101% cost reimbursement, ≤25 beds, ≥10 wound pts/mo", "25–100 apps"],
              ["★★ High", "Outpatient Wound Centers", "8+ wound patients daily, revenue-focused admin", "50–200 apps"],
              ["★ Medium", "Private Practices", "3+ wound patients weekly, new revenue interest", "10–50 apps"],
            ]} />

            <H3>Top 5 Objections & Winning Responses</H3>
            {[
              { o: "We're happy with our current PRP system.", r: "Excellent — you already understand PRP's value. Quick question: how long does each application take? With ActiGraft at 15 minutes vs. 45–60 minutes, you triple patient throughput at the same reimbursement rate. Would a side-by-side trial on 5 patients be worth exploring?" },
              { o: "The cost is too high for our facility.", r: "Let's look at the numbers: $1,064 reimbursement per G0465 application, $0 equipment cost, ROI-positive within 60 days treating just 5 patients. What volume do you see in your current wound care census?" },
              { o: "We don't have enough wound care volume.", r: "Many practices have qualifying patients who aren't being identified. Even 3 patients treated bi-weekly generates $25,000+ annual revenue. A brief chart review could identify candidates your team may be overlooking." },
              { o: "I'm worried about Medicare coverage.", r: "That's actually our strongest positioning. NCD 270.3 provides guaranteed national coverage for 20 weeks, no prior auth. G0465 increased 38% for 2026. While skin substitutes face 91% coverage reduction, PRP is the most stable reimbursement pathway in wound care." },
              { o: "We need to go through our GPO.", r: "ActiGraft has active contracts with Vizient (Oct 2022), Premier (March 2022), and Healogics iSupply (Oct 2024 — covering 600+ centers). Which GPO does your facility use? We likely already have access." },
            ].map((item, i) => (
              <div key={i} style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4, padding: "12px 16px", marginBottom: 8, boxShadow: `0 1px 6px ${C.teal}10` }}>
                <div style={{
                  color: C.gold,
                  fontSize: 10,
                  fontWeight: 700,
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: 0.6
                }}>Objection: "{item.o}"</div>
                <div style={{ color: C.cream3, fontSize: 12, lineHeight: 1.65 }}>{item.r}</div>
              </div>
            ))}
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 10 — TERRITORY INTEL
        ════════════════════════════════════ */}
        <div id="s10">
          <Page isMobile={isMobile} pageNum="19">
            <SectionHead num="X" title="Territory Intel: Memphis & Arkansas Corridor" sub="Ground-level facility intelligence for your market" />

            <H3>Memphis CSRA — Priority Targets</H3>
            <Tbl compact h={["Facility", "Type", "MAC", "Priority", "Intel"]} rows={[
              ["Methodist University Hospital", "583-bed system", "Palmetto JJ", "★★★ Platinum", "Flagship campus, wound centers"],
              ["Regional One Health", "Regional referral", "Palmetto JJ", "★★★ Platinum", "TN's only multi-place HBO center"],
              ["Baptist Memorial Memphis", "706-bed flagship", "Palmetto JJ", "★★★ Platinum", "ProHeal partnership, Vizient GPO"],
              ["Methodist Olive Branch", "100-bed", "Novitas JH", "★★ Gold", "DeSoto County MS — no wound center"],
              ["Baptist DeSoto (Southaven)", "339-bed", "Novitas JH", "★★ Gold", "Largest MS hospital in metro"],
              ["Saint Francis Wound Center", "Comprehensive", "Palmetto JJ", "★★ Gold", "HBO therapy, wound/ostomy nursing"],
            ]} />

            <CreamCard title="DeSoto County Opportunity — Service Gap">DeSoto County, MS (178K population, fastest-growing county in Mississippi) has no dedicated wound care center. Patients travel to Memphis for specialized services. Establishing ActiGraft protocols at Methodist Olive Branch or Baptist DeSoto captures this underserved market without cross-state competition. Both facilities bill through Novitas JH.</CreamCard>

            <H3>Jonesboro–Little Rock Corridor (All Novitas JH — 130 miles)</H3>
            <Tbl compact h={["Facility", "Location", "Priority", "Key Intel"]} rows={[
              ["St. Bernards Wound Healing", "Jonesboro", "★★★ Platinum", "Outreach: Walnut Ridge, Pocahontas, Wynne, Osceola"],
              ["NEA Baptist Memorial", "Jonesboro", "★★ Gold", "Baptist system — Vizient GPO access"],
              ["Unity Health Wound Healing", "Searcy", "★★ Gold", "Mid-corridor hub, 60-mile gap territory"],
              ["Lawrence Memorial (CAH)", "Walnut Ridge", "★★ Gold", "25 beds — 101% cost reimbursement opportunity"],
              ["Baptist Health Wound & HBO", "N. Little Rock", "★★★ Platinum", "Healogics iSupply — ActiGraft accessible"],
              ["CHI St. Vincent Wound Care", "Little Rock", "★★ Gold", "CommonSpirit Health, HBO therapy"],
              ["UAMS Medical Center", "Little Rock", "★ Silver", "Academic — longer cycle but high influence"],
            ]} />

            <AlertCard type="info" title="Lawrence Memorial — CAH Opportunity">Confirmed CAH designation (25 beds), managed by St. Bernards since 1981. 101% cost-based reimbursement model creates exceptional ActiGraft margins in rural northeast Arkansas. Entry point: leverage St. Bernards relationship for warm introduction.</AlertCard>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 11 — IMPLEMENTATION
        ════════════════════════════════════ */}
        <div id="s11">
          <Page isMobile={isMobile} pageNum="21">
            <SectionHead num="XI" title="Implementation & Getting Started" sub="From commitment to first patient in 5 business days" />

            <H3>5-Day Go-Live Timeline</H3>
            <StepRow n={1} title="Day 1 — Commitment & Ordering" desc="Complete distributor agreement. Place initial supply order. No equipment purchase, no installation, no facility modification required. Product ships with 2–3 day domestic delivery." time="Day 1" />
            <StepRow n={2} title="Days 2–3 — Staff Clinical Training" desc="2-hour certification session covering application protocol, wound assessment, documentation requirements, and billing workflows. On-site or virtual options. Includes competency verification and QR-based video refresher materials." time="Days 2–3" />
            <StepRow n={3} title="Days 3–4 — Billing System Setup" desc="Configure G0465/G0460 in billing software. Establish invoice generation workflow. Build ICD-10 dual-code templates (E11.xxx + L97.xxx). Test claim submission with clearinghouse. We provide invoice templates." time="Days 3–4" />
            <StepRow n={4} title="Day 5 — First Patient Treatment" desc="Identify eligible patient from wound care census. Apply ActiGraft per protocol. Complete full documentation with photography, measurement, and medical necessity narrative. Submit claim." time="Day 5" />
            <StepRow n={5} title="Ongoing — Continuous Support" desc="Nightingale BioTech provides 24/7 clinical hotline, billing support during business hours, documentation template updates, quarterly compliance reviews, and denial management assistance." time="Ongoing" />

            <Grid2>
              <CreamCard title="30-Day Pilot Program">Minimal investment, maximum data. Zero equipment capital required. Inventory buy-back guarantee if unsuccessful — no financial loss. Target: 10 pilot patients, 15–20 applications. Success criteria: ≥50% show ≥30% wound closure, 100% billing success, ≥85% claim approval.</CreamCard>
              <CreamCard title="Contact Us">
                <strong>Email:</strong> customerservice@legacymedicalconsultants.com<br />
                <strong>Phone:</strong> 817-961-1288<br />
                <strong>Support:</strong> 24/7 clinical hotline, billing support business hours<br />
                <strong>Training:</strong> On-site or virtual, 2-hour competency certification
              </CreamCard>
            </Grid2>
          </Page>
        </div>

        {/* ════════════════════════════════════
            SECTION 12 — QUICK REFERENCE
        ════════════════════════════════════ */}
        <div id="s12">
          <Page isMobile={isMobile} pageNum="22">
            <SectionHead num="XII" title="Quick Reference & Resources" sub="Everything you need at a glance" />

            <Grid2>
              <CreamCard title="MAC Contact Quick Dial">
                <strong>Palmetto GBA (TN):</strong> 1-800-PALMETTO<br />palmettogba.com<br /><br />
                <strong>Novitas JH (AR/MS/TX):</strong> 855-252-8782<br />novitas-solutions.com (Novitasphere)<br /><br />
                <strong>WPS J5 (MO):</strong> 800-782-8082 opt 1<br />wpsgha.com
              </CreamCard>
              <CreamCard title="Code Quick Reference">
                <strong>G0465:</strong> Diabetic PRP — $1,064.49 (office)<br />
                <strong>G0460:</strong> Non-diabetic PRP — contractor priced<br />
                <strong>KX modifier:</strong> Required after 20 weeks<br />
                <strong>Rev Code:</strong> 0942 · <strong>APC:</strong> 5054<br />
                <strong>FDA 510(k):</strong> BK241079 (ActiGraft PRO)
              </CreamCard>
              <CreamCard title="GPO Access Confirmed">
                <strong>Vizient:</strong> Innovative Technology (Oct 2022)<br />
                <strong>Premier:</strong> Contract active (March 2022)<br />
                <strong>Healogics iSupply:</strong> 600+ centers (Oct 2024)
              </CreamCard>
              <CreamCard title="NCD & LCD References">
                <strong>NCD 270.3:</strong> cms.gov/medicare-coverage-database<br />
                <strong>L39068:</strong> Novitas PRP LCD<br />
                <strong>L38745:</strong> Palmetto PRP LCD<br />
                <strong>WPS J5:</strong> No published PRP LCD
              </CreamCard>
            </Grid2>

            <H3>Weekly Activity Targets</H3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "0 0 22px" }}>
              <BigStat value="50" label="Prospecting Calls" sub="Weekly target" />
              <BigStat value="5" label="Demos Scheduled" sub="Weekly target" />
              <BigStat value="3" label="Proposals Out" sub="Weekly target" />
              <BigStat value="1" label="Contract Signed" sub="Weekly target" />
            </div>

            <H3>Clinical Outcomes Benchmarks</H3>
            <Tbl compact h={["Metric", "Target", "Why It Matters"]} rows={[
              ["Healing Rate (12 weeks)", ">65%", "Primary clinical endpoint — drives referrals"],
              ["Time to Closure", "<10 weeks avg", "Faster healing = more treatment cycles"],
              ["Recurrence (6 months)", "<10%", "Validates long-term product efficacy"],
              ["Limb Salvage Rate", ">90%", "The most compelling clinical story"],
              ["Claim Denial Rate", "<5%", "Documentation quality — above 5% needs intervention"],
            ]} />

            {/* CLOSING */}
            <div style={{ textAlign: "center", marginTop: 36, padding: "24px 0", borderTop: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.cream1, fontFamily: "'Georgia', serif", marginBottom: 6 }}>Master This Manual. Dominate Your Territory.</div>
              <div style={{ fontSize: 12, color: C.cream4, maxWidth: 500, margin: "0 auto 16px", lineHeight: 1.6 }}>Your competitive advantage is not ActiGraft's technology alone — it's superior technology combined with superior distributor execution in billing, documentation, and strategic sales.</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: `1px solid ${C.border}`, borderRadius: 20, boxShadow: `0 1px 8px ${C.teal}20` }}>
                <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: C.teal }}><path d="M12 2C14 1,18 3,19 6C20 9,18 12,16 13L20 11C22 10,23 12,22 14C21 16,18 17,16 17L12 19C13 21,12 23,10 23C8 23,7 21,8 19L4 17C2 17,0 16,0 14C0 12,2 10,4 11L8 13C6 12,4 9,5 6C6 3,10 1,12 2Z" /></svg>
                <span style={{ fontSize: 9, color: C.cream5, letterSpacing: 1.5, textTransform: "uppercase" }}>Nightingale BioTech · Legacy Medical Consultants</span>
              </div>
              <div style={{ fontSize: 9, color: C.cream5, marginTop: 10 }}>© 2026 · Confidential — Authorized Distributors Only · Unauthorized Distribution Prohibited</div>
            </div>
          </Page>
        </div>

      </div>
    </div>
  );
}
