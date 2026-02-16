import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   NIGHTINGALE BIOTECH · METHODIST NORTH PITCH DECK
   Premium In-Service Presentation · February 2026
   ═══════════════════════════════════════════════════════════ */

// ── BRAND TOKENS ──────────────────────────────────────────
const B = {
  bg: "#080E1A",
  surface: "#0D1729",
  card: "#131F35",
  cardHover: "#192845",
  border: "#1E3050",
  borderLight: "#2A4068",
  emerald: "#00D4AA",
  emeraldDark: "#00A888",
  emeraldGlow: "#00D4AA33",
  gold: "#FFB547",
  goldDark: "#E5972E",
  goldGlow: "#FFB54733",
  red: "#FF4D6A",
  redDark: "#CC3D55",
  blue: "#4DA6FF",
  purple: "#A78BFA",
  text: "#E8EDF5",
  textSecondary: "#8B9DC0",
  textMuted: "#5A7094",
  white: "#FFFFFF",
};

// ── SVG CHART COMPONENTS ──────────────────────────────────

const DonutChart = ({ pct, size = 120, stroke = 10, color = B.emerald, label, sublabel, bgColor = B.border }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bgColor} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(.22,1,.36,1)" }} />
      </svg>
      <div style={{ marginTop: -size/2 - 18, marginBottom: size/2 - 24, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: size * 0.22, fontWeight: 800, color, fontFamily: "var(--font-display)" }}>{label}</div>
        {sublabel && <div style={{ fontSize: 10, color: B.textMuted, letterSpacing: "0.5px", fontFamily: "var(--font-body)" }}>{sublabel}</div>}
      </div>
    </div>
  );
};

const HBar = ({ label, value, pct, color = B.emerald, maxW = "100%", highlight }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3, fontFamily: "var(--font-body)" }}>
      <span style={{ color: highlight ? color : B.textSecondary, fontWeight: highlight ? 700 : 400 }}>{label}</span>
      <span style={{ color, fontWeight: 700 }}>{value}</span>
    </div>
    <div style={{ height: 8, background: B.surface, borderRadius: 4, overflow: "hidden", border: `1px solid ${B.border}` }}>
      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}CC, ${color})`, borderRadius: 4, transition: "width 1.2s cubic-bezier(.22,1,.36,1)" }} />
    </div>
  </div>
);

const VBar = ({ label, value, pct, color = B.emerald, maxH = 160 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
    <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "var(--font-display)" }}>{value}</div>
    <div style={{ width: "100%", maxWidth: 44, height: maxH, background: B.surface, borderRadius: 6, border: `1px solid ${B.border}`, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <div style={{ width: "100%", height: `${pct}%`, background: `linear-gradient(180deg, ${color}, ${color}88)`, borderRadius: "0 0 5px 5px", transition: "height 1.2s cubic-bezier(.22,1,.36,1)" }} />
    </div>
    <div style={{ fontSize: 10, color: B.textMuted, textAlign: "center", lineHeight: 1.2, fontFamily: "var(--font-body)", maxWidth: 70 }}>{label}</div>
  </div>
);

const MetricCard = ({ icon, value, label, sublabel, accent = B.emerald }) => (
  <div style={{ background: B.card, borderRadius: 14, padding: "18px 16px", border: `1px solid ${B.border}`, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: -10, right: -10, width: 60, height: 60, borderRadius: "50%", background: `${accent}08` }} />
    <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 28, fontWeight: 800, color: accent, lineHeight: 1, fontFamily: "var(--font-display)" }}>{value}</div>
    <div style={{ fontSize: 12, color: B.textSecondary, marginTop: 4, fontWeight: 600, fontFamily: "var(--font-body)" }}>{label}</div>
    {sublabel && <div style={{ fontSize: 10, color: B.textMuted, marginTop: 2, fontFamily: "var(--font-body)" }}>{sublabel}</div>}
  </div>
);

const GlowBox = ({ color = B.emerald, children, style = {} }) => (
  <div style={{ background: `linear-gradient(135deg, ${color}12, ${color}06)`, borderRadius: 14, padding: "18px 22px", border: `1px solid ${color}30`, position: "relative", overflow: "hidden", ...style }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
    {children}
  </div>
);

const SectionTag = ({ children, color = B.emerald }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
    <div style={{ width: 8, height: 8, borderRadius: 2, background: color, boxShadow: `0 0 8px ${color}66` }} />
    <span style={{ fontSize: 10, color, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>{children}</span>
  </div>
);

const NightingaleLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="18" fill="none" stroke={B.emerald} strokeWidth="1.5" opacity="0.4" />
    <path d="M20 8 C14 14, 10 20, 14 28 C16 32, 24 32, 26 28 C30 20, 26 14, 20 8Z" fill={B.emerald} opacity="0.9" />
    <path d="M16 18 C18 16, 22 16, 24 18" fill="none" stroke={B.bg} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="16" r="1" fill={B.bg} />
    <path d="M14 20 C8 18, 6 22, 10 24" fill="none" stroke={B.emerald} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M26 20 C32 18, 34 22, 30 24" fill="none" stroke={B.emerald} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Sparkline = ({ data, color = B.emerald, w = 120, h = 40 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - ((d - min) / range) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={`${color}15`} stroke="none" />
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════
   SLIDES
   ═══════════════════════════════════════════════════════════ */

const S = {}; // slide registry

// ── 1. TITLE ──────────────────────────────────────────────
S.title = () => (
  <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
    <div style={{ flex: "0 0 58%", padding: "44px 48px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, background: `radial-gradient(ellipse at 20% 50%, ${B.emerald}08 0%, transparent 60%)` }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <NightingaleLogo size={36} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: B.emerald, letterSpacing: "3px", textTransform: "uppercase", fontFamily: "var(--font-display)" }}>Nightingale BioTech</div>
            <div style={{ fontSize: 10, color: B.textMuted, letterSpacing: "1.5px", fontFamily: "var(--font-body)" }}>ADVANCED WOUND CARE DISTRIBUTION</div>
          </div>
        </div>
        <h1 style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.06, margin: 0, fontFamily: "var(--font-display)", color: B.white }}>
          Revolutionizing
          <br />Wound Care Revenue
          <br /><span style={{ color: B.emerald }}>at Methodist North</span>
        </h1>
        <div style={{ width: 50, height: 3, background: `linear-gradient(90deg, ${B.emerald}, ${B.gold})`, borderRadius: 2, margin: "20px 0" }} />
        <p style={{ fontSize: 15, color: B.textSecondary, lineHeight: 1.6, maxWidth: 440, fontFamily: "var(--font-body)" }}>
          An ActiGraft PRO partnership to transform Sandy Deimund's
          Limb Preservation Center into the Mid-South's dominant wound healing destination — with zero equipment cost and 8× the revenue of post-reform skin substitutes.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[["Sandy Deimund, FNP, CWS", "Clinical KOL"], ["Jacob Smith", "Nightingale BioTech Partner"], ["February 2026", "In-Service Presentation"]].map(([a, b]) => (
            <div key={a} style={{ background: B.card, borderRadius: 8, padding: "8px 14px", border: `1px solid ${B.border}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: B.text, fontFamily: "var(--font-body)" }}>{a}</div>
              <div style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "36px 36px 36px 0", alignContent: "center" }}>
      <MetricCard icon="🧬" value="2.73×" label="RCT Healing Advantage" sublabel="vs Standard of Care (p<0.05)" accent={B.emerald} />
      <MetricCard icon="⏱️" value="5 min" label="Point-of-Care Prep" sublabel="vs 15–30 min competitors" accent={B.gold} />
      <MetricCard icon="💰" value="$42K" label="Per-Patient Revenue" sublabel="20-week HOPD course (G0465)" accent={B.purple} />
      <MetricCard icon="🏥" value="$0" label="Equipment Investment" sublabel="No centrifuge · No cold chain" accent={B.blue} />
      <MetricCard icon="📋" value="5" label="GPO Contracts" sublabel="Premier ✓ (Methodist's GPO)" accent={B.emerald} />
      <MetricCard icon="🩺" value="7,000+" label="Patients Treated" sublabel="Across U.S. wound centers" accent={B.gold} />
    </div>
  </div>
);

// ── 2. THE CRISIS ─────────────────────────────────────────
S.crisis = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.red}>The $19.6 Billion Problem</SectionTag>
    <h2 style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      The Skin Substitute Market <span style={{ color: B.red }}>Just Collapsed</span>
    </h2>
    <p style={{ fontSize: 14, color: B.textSecondary, marginTop: 8, fontFamily: "var(--font-body)", maxWidth: 600 }}>
      CMS enacted the largest single-category payment reduction in Medicare history. Wound care centers nationwide are losing their primary advanced therapy revenue source.
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20 }}>
      <div>
        <div style={{ fontSize: 11, color: B.textMuted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-body)", fontWeight: 700 }}>Medicare Skin Sub Spending Explosion</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 180, padding: "0 8px" }}>
          {[
            { yr: "2019", val: "$252M", pct: 3, color: B.textMuted },
            { yr: "2020", val: "$1.2B", pct: 12, color: B.textMuted },
            { yr: "2021", val: "$3.4B", pct: 34, color: B.gold },
            { yr: "2022", val: "$5.1B", pct: 51, color: B.gold },
            { yr: "2023", val: "$7.8B", pct: 78, color: B.red },
            { yr: "2024", val: "$10B+", pct: 100, color: B.red },
            { yr: "2025E", val: "$15.4B", pct: 100, color: B.red },
            { yr: "2026", val: "—", pct: 5, color: `${B.red}44` },
          ].map((d) => (
            <div key={d.yr} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: d.color, fontFamily: "var(--font-body)" }}>{d.val}</div>
              <div style={{ width: "100%", maxWidth: 36, height: d.pct * 1.4, background: `linear-gradient(180deg, ${d.color}, ${d.color}55)`, borderRadius: "4px 4px 0 0", transition: "height 1s ease" }} />
              <div style={{ fontSize: 9, color: B.textMuted, fontFamily: "var(--font-body)" }}>{d.yr}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 10, color: B.textMuted, marginTop: 4, fontFamily: "var(--font-body)" }}>40× increase in 5 years → then CMS pulled the plug</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <GlowBox color={B.red}>
          <div style={{ fontSize: 11, color: B.red, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-body)" }}>CMS Action · January 1, 2026</div>
          <div style={{ fontSize: 13, color: "#FECACA", lineHeight: 1.7, fontFamily: "var(--font-body)" }}>
            All 152 Q-codes moved to flat ~$127/sq cm rate. Previously $1,000–$5,800/sq cm. <strong>158 products delisted entirely.</strong> Only 18 on "Covered" list. Max 8 applications per wound.
          </div>
        </GlowBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ background: B.card, borderRadius: 10, padding: 14, border: `1px solid ${B.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: B.red, fontFamily: "var(--font-display)" }}>~90%</div>
            <div style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>Payment Reduction</div>
          </div>
          <div style={{ background: B.card, borderRadius: 10, padding: 14, border: `1px solid ${B.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: B.red, fontFamily: "var(--font-display)" }}>$19.6B</div>
            <div style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>Projected Cut</div>
          </div>
        </div>
        <GlowBox color={B.gold} style={{ marginTop: 0 }}>
          <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-body)" }}>Why This Matters for Methodist North</div>
          <div style={{ fontSize: 12, color: "#FEF3C7", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
            Any CTP-based wound revenue Sandy's team generates today faces <strong>immediate 90% reduction</strong>. The center needs a reimbursement pathway CMS hasn't touched — and won't.
          </div>
        </GlowBox>
      </div>
    </div>
  </div>
);

// ── 3. METHODIST NORTH ↔ ACTIGRAFT ALIGNMENT ─────────────
S.methodist = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.blue}>System Intelligence</SectionTag>
    <h2 style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      Methodist Le Bonheur: <span style={{ color: B.blue }}>Why Now</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 16 }}>
      <div style={{ gridColumn: "1 / 3" }}>
        <div style={{ background: B.card, borderRadius: 14, padding: 20, border: `1px solid ${B.border}`, height: "100%" }}>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: B.blue, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>System Profile</div>
              {[
                ["Founded", "1918 (United Methodist Church)"],
                ["Hospitals", "6 campuses · ~1,700 beds"],
                ["Employees", "13,000+ · 2,000+ providers"],
                ["Flagship", "Methodist University Hospital (583 beds)"],
                ["Academic", "Principal affiliate — UT HSC"],
                ["CEO", "Michael Ugwueke, DHA, FACHE"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${B.border}`, fontSize: 12, fontFamily: "var(--font-body)" }}>
                  <span style={{ color: B.textMuted }}>{k}</span>
                  <span style={{ color: B.text, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ width: 1, background: B.border }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: B.red, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>Financial Pressure</div>
              {[
                ["-$110.3M", "H1 FY2023 Operating Loss"],
                ["-12.1%", "Operating Margin"],
                ["Baa1", "Moody's (down from A1)"],
                ["A+ (neg)", "S&P (down from AA–)"],
                ["$125M", "Savings Target"],
                ["Oct 2024", "Epic Go-Live Disruption"],
              ].map(([k, v]) => (
                <div key={v} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${B.border}`, fontSize: 12, fontFamily: "var(--font-body)" }}>
                  <span style={{ color: B.red, fontWeight: 700 }}>{k}</span>
                  <span style={{ color: B.textSecondary }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <GlowBox color={B.emerald}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-body)" }}>GPO ✓ Confirmed</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: B.emerald, fontFamily: "var(--font-display)" }}>Premier</div>
          <div style={{ fontSize: 11, color: B.textSecondary, fontFamily: "var(--font-body)", marginTop: 2 }}>Switched Mar 2023 from HealthTrust</div>
          <div style={{ fontSize: 11, color: B.emerald, fontFamily: "var(--font-body)", marginTop: 4, fontWeight: 600 }}>ActiGraft on Premier since Mar 2022 ✓</div>
        </GlowBox>
        <GlowBox color={B.gold}>
          <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-body)" }}>Wound Center Model</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: B.gold, fontFamily: "var(--font-display)" }}>Self-Operated</div>
          <div style={{ fontSize: 11, color: B.textSecondary, fontFamily: "var(--font-body)", marginTop: 2 }}>NOT Healogics-managed. Formulary decisions made internally by MLH.</div>
        </GlowBox>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginTop: 14 }}>
      {[
        { name: "University", beds: 583, wound: true, flag: true },
        { name: "North", beds: 246, wound: true, flag: true, target: true },
        { name: "South", beds: 156, wound: true, flag: false },
        { name: "Germantown", beds: 319, wound: false },
        { name: "Olive Branch", beds: 100, wound: false },
        { name: "Le Bonheur", beds: 255, wound: false, child: true },
      ].map((h) => (
        <div key={h.name} style={{ background: h.target ? `${B.emerald}15` : B.card, borderRadius: 10, padding: "10px 8px", border: `1px solid ${h.target ? B.emerald + "44" : B.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 18, marginBottom: 4 }}>{h.child ? "👶" : "🏥"}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: h.target ? B.emerald : B.text, fontFamily: "var(--font-body)" }}>Methodist {h.name}</div>
          <div style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>{h.beds} beds</div>
          {h.wound && <div style={{ fontSize: 9, color: h.target ? B.emerald : B.gold, marginTop: 3, fontWeight: 600, fontFamily: "var(--font-body)" }}>🩹 Wound Center {h.target ? "← TARGET" : ""}</div>}
        </div>
      ))}
    </div>
  </div>
);

// ── 4. METHODIST NORTH DEEP DIVE ──────────────────────────
S.north = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.emerald}>Target Facility</SectionTag>
    <h2 style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      Methodist North: <span style={{ color: B.emerald }}>Ground Zero</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 16 }}>
      <div>
        <div style={{ background: B.card, borderRadius: 14, padding: 20, border: `1px solid ${B.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>Facility Profile</div>
          {[
            ["Address", "3960 New Covington Pike, Memphis 38128"],
            ["Beds", "246 (community hospital)"],
            ["Opened", "1978 · Serving NE Shelby County"],
            ["Service Area", "Raleigh, Bartlett, Frayser, Millington, Tipton Co."],
            ["Magnet Status", "Only adult Magnet hospital in West TN ✓"],
            ["Safety Grade", "Leapfrog 'A' ✓"],
            ["Certifications", "Primary Stroke · ACC Chest Pain"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${B.border}`, fontSize: 12, fontFamily: "var(--font-body)" }}>
              <span style={{ color: B.textMuted, minWidth: 90 }}>{k}</span>
              <span style={{ color: B.text, fontWeight: 500, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: B.card, borderRadius: 14, padding: 20, border: `1px solid ${B.border}` }}>
          <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>North Wound Healing Center</div>
          {[
            ["Location", "Physicians Medical Bldg, Suite 350"],
            ["Phone", "901-516-5766"],
            ["Hours", "Mon–Fri 8:00 AM – 4:30 PM"],
            ["HBOT", "2 monoplace hyperbaric chambers"],
            ["Protocol Length", "12–18 weeks typical"],
            ["Referral", "Self-referral accepted"],
            ["Management", "Self-operated (NOT Healogics)"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${B.border}`, fontSize: 12, fontFamily: "var(--font-body)" }}>
              <span style={{ color: B.textMuted, minWidth: 100 }}>{k}</span>
              <span style={{ color: B.text, fontWeight: 500, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Multidisciplinary Team Access</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {["Vascular Surgery", "Infectious Disease", "Podiatry", "Endocrinology", "Orthopedics", "Plastic Surgery", "General Surgery", "Cardiology", "Radiology", "Dermatology", "Nutrition", "Diabetes Education"].map((spec) => (
            <div key={spec} style={{ background: B.surface, borderRadius: 6, padding: "5px 10px", fontSize: 11, color: B.textSecondary, fontFamily: "var(--font-body)", border: `1px solid ${B.border}`, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: B.emerald, flexShrink: 0 }} />
              {spec}
            </div>
          ))}
        </div>
        <GlowBox color={B.emerald}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-body)" }}>Why Self-Operated = Faster Adoption</div>
          <div style={{ fontSize: 12, color: B.text, lineHeight: 1.7, fontFamily: "var(--font-body)" }}>
            Healogics-managed centers require formulary approval through iSupply (ActiGraft IS on iSupply, but adds steps). Methodist North's self-operated model means Sandy and MLH supply chain leadership (Rusty Parker, Sr. Director) can evaluate and approve directly through <strong style={{ color: B.emerald }}>Premier GPO — where ActiGraft already has a contract</strong>.
          </div>
        </GlowBox>
        <GlowBox color={B.gold}>
          <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-body)" }}>Expansion Opportunity</div>
          <div style={{ fontSize: 12, color: B.text, lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
            Success at North cascades to <strong>Methodist South</strong> wound center (1251 Wesley Dr, Suite 107) and potentially the <strong>Limb Preservation Center</strong> Sandy built — covering all MLH wound care touchpoints.
          </div>
        </GlowBox>
      </div>
    </div>
  </div>
);

// ── 5. SANDY DEIMUND ──────────────────────────────────────
S.sandy = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.gold}>Clinical Champion</SectionTag>
    <h2 style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      Sandy Deimund: <span style={{ color: B.gold }}>The Program Builder</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24, marginTop: 16 }}>
      <div>
        <div style={{ background: B.card, borderRadius: 14, padding: 20, border: `1px solid ${B.border}`, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${B.gold}44, ${B.emerald}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: `2px solid ${B.gold}44` }}>👩‍⚕️</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: B.white, fontFamily: "var(--font-display)" }}>Sondra "Sandy" Deimund</div>
              <div style={{ fontSize: 13, color: B.gold, fontWeight: 600, fontFamily: "var(--font-body)" }}>FNP, CWS</div>
              <div style={{ fontSize: 11, color: B.textMuted, fontFamily: "var(--font-body)" }}>NPI: 1033622832 · MSN, U of Memphis</div>
            </div>
          </div>
        </div>
        <div style={{ background: B.card, borderRadius: 14, padding: 18, border: `1px solid ${B.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>Career Timeline at Methodist</div>
          {[
            { yr: "20+ yrs", ev: "Wound care clinical practice at MLH", color: B.textMuted },
            { yr: "Director", ev: "Led North, South & Olive Branch wound centers", color: B.textSecondary },
            { yr: "Builder", ev: "Designed Limb Preservation Center from scratch", color: B.gold },
            { yr: "Innovator", ev: "Built EMR workflows in Cerner + new billing process", color: B.emerald },
            { yr: "Advocate", ev: "Diabetes Empowerment Education (Qsource grant)", color: B.blue },
            { yr: "Current", ev: "NP — Limb Preservation & Wound Healing Center", color: B.white },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 1, background: `linear-gradient(180deg, ${item.color}, ${B.border})`, flexShrink: 0, marginTop: 6 }} />
              <div>
                <div style={{ fontSize: 10, color: item.color, fontWeight: 700, fontFamily: "var(--font-body)" }}>{item.yr}</div>
                <div style={{ fontSize: 12, color: B.text, fontFamily: "var(--font-body)" }}>{item.ev}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Sandy's Capabilities ↔ ActiGraft Alignment</div>
        {[
          { sandyCap: "Built limb preservation center from ground up", actigraftFit: "ActiGraft = next-gen clinical tool for her program", icon: "🏗️" },
          { sandyCap: "Created new billing process for novel service line", actigraftFit: "G0465 billing is distinct from CTPs — Sandy's strength", icon: "💳" },
          { sandyCap: "Developed EMR workflow in Cerner (now Epic)", actigraftFit: "5-min prep integrates easily into Epic visit workflow", icon: "💻" },
          { sandyCap: "Launched diabetes education in North Memphis", actigraftFit: "ActiGraft targets the exact DFU population she serves", icon: "🎓" },
          { sandyCap: "Recognized Shelby Co. amputation crisis publicly", actigraftFit: "2.73× healing odds = measurable amputation reduction", icon: "📣" },
          { sandyCap: "Multi-campus wound operations leadership", actigraftFit: "Success at North → South expansion built into plan", icon: "🔄" },
        ].map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr 24px 1fr", gap: 8, alignItems: "center", background: B.card, borderRadius: 10, padding: "10px 14px", border: `1px solid ${B.border}` }}>
            <div style={{ fontSize: 18, textAlign: "center" }}>{row.icon}</div>
            <div style={{ fontSize: 11, color: B.textSecondary, fontFamily: "var(--font-body)", lineHeight: 1.4 }}>{row.sandyCap}</div>
            <div style={{ textAlign: "center", color: B.emerald, fontWeight: 700, fontSize: 14 }}>→</div>
            <div style={{ fontSize: 11, color: B.emerald, fontFamily: "var(--font-body)", lineHeight: 1.4, fontWeight: 600 }}>{row.actigraftFit}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── 6. MEMPHIS MARKET DATA ────────────────────────────────
S.memphis = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.blue}>Market Intelligence</SectionTag>
    <h2 style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      Memphis: <span style={{ color: B.blue }}>Diabetes Capital of the Mid-South</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
      <MetricCard icon="🔴" value="14%" label="Diabetes Prevalence" sublabel="Shelby Co. (2× national 7%)" accent={B.red} />
      <MetricCard icon="👥" value="110K" label="Adults w/ Diabetes" sublabel="Shelby County alone" accent={B.blue} />
      <MetricCard icon="🦶" value="5,500+" label="Est. DFU Patients/Yr" sublabel="5–10% annual incidence" accent={B.gold} />
      <MetricCard icon="⚰️" value="1/day" label="Diabetes Deaths" sublabel="Shelby Co. · 67% Black" accent={B.red} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 16 }}>
      <div style={{ background: B.card, borderRadius: 14, padding: 18, border: `1px solid ${B.border}` }}>
        <div style={{ fontSize: 11, color: B.blue, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>Diabetes Rate Comparison</div>
        <HBar label="Shelby County" value="14.0%" pct={100} color={B.red} highlight />
        <HBar label="Tennessee" value="12.9%" pct={92} color={B.gold} />
        <HBar label="MS Delta Counties" value="15–18%" pct={100} color={B.red} highlight />
        <HBar label="National Average" value="7.0%" pct={50} color={B.textMuted} />
        <div style={{ marginTop: 8, fontSize: 10, color: B.textMuted, fontStyle: "italic", fontFamily: "var(--font-body)" }}>Methodist North's service area (NE Shelby) includes highest-burden ZIP codes</div>
      </div>
      <div style={{ background: B.card, borderRadius: 14, padding: 18, border: `1px solid ${B.border}` }}>
        <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>Payer Mix — Medicare Favorable</div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <DonutChart pct={48} size={100} stroke={10} color={B.blue} label="47.9%" sublabel="Medicare Adv." />
        </div>
        {[
          ["Medicare-eligible persons", "164,303"],
          ["MA Enrollment", "47.85%"],
          ["Medicaid Coverage", "23.6%"],
          ["G0465 Coverage", "All Medicare ✓"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 11, fontFamily: "var(--font-body)" }}>
            <span style={{ color: B.textMuted }}>{k}</span>
            <span style={{ color: B.text, fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ background: B.card, borderRadius: 14, padding: 18, border: `1px solid ${B.border}` }}>
        <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>Competitive Landscape</div>
        {[
          { name: "Methodist (North/South)", note: "Self-operated · Premier GPO", color: B.emerald, you: true },
          { name: "Baptist Memorial", note: "14 hospitals · ProHeal partnership", color: B.textMuted },
          { name: "Regional One Health", note: "12-pt multiplace HBOT · Burn center", color: B.textMuted },
          { name: "Saint Francis", note: "Tenet-owned · Wound & ostomy center", color: B.textMuted },
          { name: "VA Memphis", note: "196K veterans · 1 in 4 diabetic", color: B.textMuted },
        ].map((c) => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "4px 8px", borderRadius: 6, background: c.you ? `${B.emerald}10` : "transparent" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 11, color: c.you ? B.emerald : B.text, fontWeight: c.you ? 700 : 500, fontFamily: "var(--font-body)" }}>{c.name} {c.you && "← YOU"}</div>
              <div style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>{c.note}</div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 10, color: B.emerald, fontWeight: 600, marginTop: 8, fontFamily: "var(--font-body)" }}>No confirmed Healogics center in Memphis proper — white space for Methodist</div>
      </div>
    </div>
  </div>
);

// ── 7. ACTIGRAFT PRODUCT ──────────────────────────────────
S.product = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.emerald}>The Solution</SectionTag>
    <h2 style={{ fontSize: 38, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      ActiGraft <span style={{ color: B.emerald }}>PRO</span> <span style={{ fontSize: 18, color: B.textMuted, fontWeight: 400 }}>· FDA 510(k) Cleared</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20 }}>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { step: "01", title: "DRAW", desc: "18 mL peripheral blood", time: "30 sec", icon: "💉", color: B.emerald },
            { step: "02", title: "MIX", desc: "Add nanoparticle powder", time: "10 sec", icon: "🧪", color: "#34D399" },
            { step: "03", title: "CLOT", desc: "Autologous whole blood clot forms", time: "~5 min", icon: "🩸", color: "#6EE7B7" },
            { step: "04", title: "APPLY", desc: "Place on debrided wound bed", time: "30 sec", icon: "✋", color: "#A7F3D0" },
          ].map((s) => (
            <div key={s.step} style={{ background: B.card, borderRadius: 12, padding: 14, border: `1px solid ${B.border}`, borderLeft: `3px solid ${s.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: s.color, fontFamily: "var(--font-display)" }}>{s.step}</span>
                <span style={{ fontSize: 11, color: B.textMuted, fontFamily: "var(--font-body)" }}>{s.time}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: B.white, fontFamily: "var(--font-body)" }}>{s.title}</div>
              <div style={{ fontSize: 11, color: B.textMuted, fontFamily: "var(--font-body)" }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <GlowBox color={B.emerald}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-body)" }}>The Whole Blood Difference</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              ["🔴 RBCs", "Oxygen delivery to hypoxic wound bed"],
              ["🟡 Platelets", "PDGF, TGF-β, VEGF, EGF cascade"],
              ["⬜ Fibrin", "Natural scaffold for cell migration"],
              ["🟢 WBCs", "Immune defense & signaling"],
              ["🟣 Stem Cells", "Tissue regeneration potential"],
              ["🔵 Plasma", "Nutrients & protein transport"],
            ].map(([k, v]) => (
              <div key={k} style={{ fontSize: 10, fontFamily: "var(--font-body)" }}>
                <div style={{ color: B.text, fontWeight: 700 }}>{k}</div>
                <div style={{ color: B.textMuted, lineHeight: 1.3 }}>{v}</div>
              </div>
            ))}
          </div>
        </GlowBox>
      </div>
      <div>
        <div style={{ background: B.card, borderRadius: 14, padding: 20, border: `1px solid ${B.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>ActiGraft PRO vs. All Competitors</div>
          <div style={{ fontSize: 10, color: B.textMuted, display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr 1fr", gap: 2, marginBottom: 6, fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.5px" }}>
            <span>Product</span><span>Prep</span><span>Equip $</span><span>Apps/Day</span><span>RBCs</span>
          </div>
          {[
            ["ActiGraft PRO", "5 min", "$0", "2×", "✓ Yes", B.emerald, true],
            ["RegenKit (MiMedx)", "15 min", "$4–6K", "1×", "✗ No", B.gold, false],
            ["3C Patch", "20 min", "$15K+", "1×", "✗ No", B.textMuted, false],
            ["Aurix", "20 min", "$2–3K", "1×", "✗ No", B.textMuted, false],
            ["CASCADE", "20 min", "Std.", "1×", "✗ No", B.textMuted, false],
            ["SkinDisc", "30 min", "$3–5K", "1×", "✗ No", B.textMuted, false],
          ].map(([name, prep, equip, apps, rbc, color, hl]) => (
            <div key={name} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr 1fr", gap: 2, padding: "5px 0", borderBottom: `1px solid ${B.border}`, fontSize: 11, fontFamily: "var(--font-body)", background: hl ? `${B.emerald}08` : "transparent", borderRadius: hl ? 4 : 0 }}>
              <span style={{ color: hl ? B.emerald : B.textSecondary, fontWeight: hl ? 700 : 400 }}>{name}</span>
              <span style={{ color: hl ? B.emerald : B.text }}>{prep}</span>
              <span style={{ color: hl ? B.emerald : B.text }}>{equip}</span>
              <span style={{ color: hl ? B.emerald : B.text }}>{apps}</span>
              <span style={{ color: rbc.startsWith("✓") ? B.emerald : B.red }}>{rbc}</span>
            </div>
          ))}
        </div>
        <div style={{ background: B.card, borderRadius: 14, padding: 18, border: `1px solid ${B.border}` }}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>GPO Access — Broadest in PRP Category</div>
          {[
            ["Vizient", "Oct 2022", true],
            ["Premier", "Mar 2022", true, "← Methodist's GPO"],
            ["Healogics iSupply", "Oct 2024", true, "600+ centers"],
            ["WCA Formulary", "Oct 2024", true],
            ["Capstone", "Aug 2021", true],
            ["HealthTrust", "—", false, "Gap (HCA/TriStar)"],
          ].map(([gpo, date, active, note]) => (
            <div key={gpo} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 12, fontFamily: "var(--font-body)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: active ? B.emerald : B.red, flexShrink: 0 }} />
              <span style={{ color: active ? B.text : B.textMuted, fontWeight: 600, minWidth: 110 }}>{gpo}</span>
              <span style={{ color: B.textMuted, fontSize: 10 }}>{date}</span>
              {note && <span style={{ color: active ? B.gold : B.red, fontSize: 10, fontWeight: 600 }}>{note}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── 8. RCT EVIDENCE ───────────────────────────────────────
S.evidence = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.emerald}>Clinical Evidence</SectionTag>
    <h2 style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      RCT Data: <span style={{ color: B.emerald }}>2.73× Healing Advantage</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 24, marginTop: 16 }}>
      <div>
        <div style={{ background: B.card, borderRadius: 14, padding: 20, border: `1px solid ${B.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: B.textMuted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)", fontWeight: 700 }}>Pivotal RCT · J. of Wound Care, 2024</div>
          {[["Design", "Multicenter Blinded RCT"], ["Patients", "119 · 16 sites worldwide"], ["Lead PI", "Robert J. Snyder, DPM, MSc, MBA"], ["Indication", "Diabetic Foot Ulcers"], ["Follow-up", "12 weeks + wound durability"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${B.border}`, fontSize: 12, fontFamily: "var(--font-body)" }}>
              <span style={{ color: B.textMuted }}>{k}</span>
              <span style={{ color: B.text, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <GlowBox color={B.emerald} style={{ textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: B.emerald, fontFamily: "var(--font-display)" }}>51%</div>
            <div style={{ fontSize: 10, color: B.textSecondary, fontFamily: "var(--font-body)", letterSpacing: "1px" }}>ACTIGRAFT (PP)</div>
          </GlowBox>
          <div style={{ background: B.card, borderRadius: 14, padding: 16, border: `1px solid ${B.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: B.red, fontFamily: "var(--font-display)" }}>18%</div>
            <div style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)", letterSpacing: "1px" }}>STANDARD CARE</div>
          </div>
        </div>
        <div style={{ background: B.card, borderRadius: 10, padding: 12, marginTop: 12, border: `1px solid ${B.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: B.textMuted, fontFamily: "var(--font-body)" }}>Wound Durability (Healed Wounds Remaining Closed)</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 8 }}>
            <div><span style={{ fontSize: 22, fontWeight: 800, color: B.emerald, fontFamily: "var(--font-display)" }}>71%</span> <span style={{ fontSize: 10, color: B.textMuted }}>ActiGraft</span></div>
            <div><span style={{ fontSize: 22, fontWeight: 800, color: B.textMuted, fontFamily: "var(--font-display)" }}>55%</span> <span style={{ fontSize: 10, color: B.textMuted }}>SOC</span></div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>DFU 12-Week Healing — All Advanced Therapies</div>
        {[
          { name: "EpiFix (Tettelbach 2019)", rate: 70, color: B.textMuted, note: "⚠️ 90% reimbursement cut" },
          { name: "Grafix (Lavery 2014)", rate: 62, color: B.textMuted, note: "⚠️ 90% reimbursement cut" },
          { name: "Apligraf (Veves 2001)", rate: 56, color: B.textMuted, note: "⚠️ 90% reimbursement cut" },
          { name: "ActiGraft PRO (Snyder 2024)", rate: 51, color: B.emerald, note: "✓ G0465 UNTOUCHED" },
          { name: "Dermagraft (Marston 2003)", rate: 30, color: B.textMuted, note: "⚠️ Delisted in 2026" },
          { name: "Standard of Care (meta)", rate: 24, color: B.red, note: "" },
        ].map((p) => (
          <div key={p.name} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, fontFamily: "var(--font-body)", marginBottom: 3 }}>
              <span style={{ color: p.color === B.emerald ? B.emerald : B.textSecondary, fontWeight: p.color === B.emerald ? 700 : 400 }}>{p.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {p.note && <span style={{ fontSize: 9, color: p.note.startsWith("✓") ? B.emerald : B.red, fontWeight: 600 }}>{p.note}</span>}
                <span style={{ color: p.color, fontWeight: 700, minWidth: 32, textAlign: "right" }}>{p.rate}%</span>
              </div>
            </div>
            <div style={{ height: 10, background: B.surface, borderRadius: 5, overflow: "hidden", border: `1px solid ${B.border}` }}>
              <div style={{ height: "100%", width: `${p.rate}%`, background: p.color === B.emerald ? `linear-gradient(90deg, ${B.emeraldDark}, ${B.emerald})` : p.color === B.red ? B.red : `${B.textMuted}66`, borderRadius: 5 }} />
            </div>
          </div>
        ))}
        <GlowBox color={B.gold} style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, color: B.gold, fontWeight: 700, fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
            The insight for Sandy: every CTP above faces 90% reimbursement cuts or delisting in 2026. ActiGraft's 51% heal rate delivers comparable clinical outcomes through a <strong>completely protected reimbursement pathway</strong> — NCD 270.3, code G0465.
          </div>
        </GlowBox>
      </div>
    </div>
  </div>
);

// ── 9. REVENUE ENGINE ─────────────────────────────────────
S.revenue = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.purple}>Revenue Model</SectionTag>
    <h2 style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      Methodist North <span style={{ color: B.purple }}>Revenue Projections</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 16 }}>
      <div>
        <div style={{ background: B.card, borderRadius: 14, padding: 20, border: `1px solid ${B.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: B.purple, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>Per-Patient Economics (HOPD · APC 5054)</div>
          {[
            ["Revenue per treatment", "$2,107.97", B.text],
            ["Product cost per treatment", "~$200", B.textMuted],
            ["Gross margin per treatment", "~$1,908", B.emerald],
            ["12-week course (12 tx)", "$25,296", B.text],
            ["20-week full course (20 tx)", "$42,159", B.purple],
            ["Equipment cost", "$0", B.emerald],
          ].map(([k, v, c]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${B.border}`, fontSize: 12, fontFamily: "var(--font-body)" }}>
              <span style={{ color: B.textMuted }}>{k}</span>
              <span style={{ color: c, fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>Annual Revenue by Patient Volume</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, padding: "0 8px", height: 140 }}>
          <VBar label="5 pts/wk" value="$506K" pct={25} color={B.purple} maxH={120} />
          <VBar label="10 pts/wk" value="$1.01M" pct={50} color="#A78BFA" maxH={120} />
          <VBar label="15 pts/wk" value="$1.52M" pct={75} color="#C4B5FD" maxH={120} />
          <VBar label="20 pts/wk" value="$2.02M" pct={100} color="#DDD6FE" maxH={120} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <GlowBox color={B.emerald} style={{ textAlign: "center", padding: 18 }}>
            <div style={{ fontSize: 11, color: B.textSecondary, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>ActiGraft · 20 Weeks</div>
            <div style={{ fontSize: 38, fontWeight: 800, color: B.emerald, fontFamily: "var(--font-display)", margin: "4px 0" }}>$42,159</div>
            <div style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>Per patient · G0465</div>
          </GlowBox>
          <div style={{ background: B.card, borderRadius: 14, padding: 18, border: `1px solid ${B.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: B.textSecondary, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>CTP · Post-Reform</div>
            <div style={{ fontSize: 38, fontWeight: 800, color: B.red, fontFamily: "var(--font-display)", margin: "4px 0" }}>$5,091</div>
            <div style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>Per patient · 5cm² · 8 apps</div>
          </div>
        </div>
        <div style={{ background: `linear-gradient(135deg, ${B.purple}18, ${B.emerald}10)`, borderRadius: 14, padding: 18, border: `1px solid ${B.purple}30`, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: B.text, fontFamily: "var(--font-body)" }}>ActiGraft generates</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: B.purple, fontFamily: "var(--font-display)", margin: "4px 0" }}>8.3×</div>
          <div style={{ fontSize: 13, color: B.text, fontFamily: "var(--font-body)" }}>more revenue per patient than post-reform CTPs</div>
        </div>
        <GlowBox color={B.gold}>
          <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-body)" }}>Methodist North Specific Impact</div>
          <div style={{ fontSize: 12, color: B.text, lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
            With MLH seeking <strong style={{ color: B.gold }}>$125M in operational savings</strong> and facing credit downgrades, a service line generating $1M+ annually with zero capital outlay and ~90% gross margin is strategically aligned with CEO Ugwueke's turnaround priorities.
          </div>
        </GlowBox>
      </div>
    </div>
  </div>
);

// ── 10. COMPETITIVE THREAT ────────────────────────────────
S.threat = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.red}>Competitive Intelligence</SectionTag>
    <h2 style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      The MiMedx Threat: <span style={{ color: B.red }}>Why Speed Matters</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 16 }}>
      <div>
        <GlowBox color={B.red} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: B.red, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-body)" }}>Breaking · December 22, 2025</div>
          <div style={{ fontSize: 14, color: "#FECACA", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
            <strong>MiMedx Group (NASDAQ: MDXG)</strong> signed an <strong>EXCLUSIVE U.S. distribution agreement</strong> for RegenKit Wound Gel. MiMedx brings $450M+ revenue, 400+ reps, existing VA/DoD contracts, and HealthTrust access to PRP wound care.
          </div>
        </GlowBox>
        <div style={{ fontSize: 11, color: B.textMuted, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>PRP Threat Assessment</div>
        {[
          { name: "RegenKit (MiMedx)", level: "HIGH", pct: 90, color: B.red, detail: "400+ reps · VA/DoD · HealthTrust" },
          { name: "3C Patch (Reapplix)", level: "MOD", pct: 50, color: B.gold, detail: "IWGDF guideline · Vizient only" },
          { name: "Aurix System", level: "LOW", pct: 15, color: B.textMuted, detail: "Micro-cap · ~$2.6M revenue" },
          { name: "CASCADE (MTF)", level: "LOW", pct: 12, color: B.textMuted, detail: "Ortho focus · no wound GPO" },
          { name: "SkinDisc", level: "MIN", pct: 5, color: B.textMuted, detail: "Pre-revenue · no infrastructure" },
        ].map((t) => (
          <div key={t.name} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "var(--font-body)", marginBottom: 2 }}>
              <span style={{ color: B.textSecondary }}>{t.name}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 9, color: B.textMuted }}>{t.detail}</span>
                <span style={{ color: t.color, fontWeight: 700, fontSize: 10 }}>{t.level}</span>
              </div>
            </div>
            <div style={{ height: 6, background: B.surface, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${t.pct}%`, background: t.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ background: B.card, borderRadius: 14, padding: 18, border: `1px solid ${B.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>ActiGraft Advantages Over RegenKit</div>
          {[
            { attr: "Prep Time", acti: "5 min", regen: "15 min", win: "acti" },
            { attr: "Equipment Cost", acti: "$0", regen: "$4–6K", win: "acti" },
            { attr: "Applications/Day", acti: "2×", regen: "1×", win: "acti" },
            { attr: "Red Blood Cells", acti: "✓ Preserved", regen: "✗ Removed", win: "acti" },
            { attr: "Per-Kit Cost", acti: "~$200", regen: "$250–400", win: "acti" },
            { attr: "Healogics iSupply", acti: "✓ On formulary", regen: "✗ NOT listed", win: "acti" },
            { attr: "Rep Salesforce", acti: "Boutique/dedicated", regen: "400+ generalists", win: "tie" },
            { attr: "VA/DoD Access", acti: "Via Legacy Medical", regen: "Existing contracts", win: "regen" },
          ].map((r) => (
            <div key={r.attr} style={{ display: "grid", gridTemplateColumns: "95px 1fr 1fr", gap: 4, padding: "4px 0", borderBottom: `1px solid ${B.border}`, fontSize: 11, fontFamily: "var(--font-body)" }}>
              <span style={{ color: B.textMuted }}>{r.attr}</span>
              <span style={{ color: r.win === "acti" ? B.emerald : B.textSecondary, fontWeight: r.win === "acti" ? 700 : 400 }}>{r.acti}</span>
              <span style={{ color: r.win === "regen" ? B.gold : B.textSecondary, fontWeight: r.win === "regen" ? 700 : 400 }}>{r.regen}</span>
            </div>
          ))}
        </div>
        <GlowBox color={B.emerald}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-body)" }}>Window of Opportunity</div>
          <div style={{ fontSize: 12, color: B.text, lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
            MiMedx's RegenKit deal was signed <strong>December 2025</strong>. Their 400-rep army is still ramping — it takes 6–12 months to deploy a new SKU at scale. <strong style={{ color: B.emerald }}>Methodist North can establish ActiGraft protocols NOW</strong>, before MiMedx reps begin RegenKit detailing in Memphis.
          </div>
        </GlowBox>
      </div>
    </div>
  </div>
);

// ── 11. NIGHTINGALE + JACOB ───────────────────────────────
S.partnership = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.emerald}>The Partnership</SectionTag>
    <h2 style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      Nightingale BioTech + <span style={{ color: B.emerald }}>Jacob Smith</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 16 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <NightingaleLogo size={44} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: B.emerald, fontFamily: "var(--font-display)" }}>Nightingale BioTech</div>
            <div style={{ fontSize: 11, color: B.textMuted, fontFamily: "var(--font-body)" }}>Advanced Wound Care Distribution · Founded by Organogenesis Veterans</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>The Origin Story</div>
        <div style={{ fontSize: 13, color: B.textSecondary, lineHeight: 1.7, fontFamily: "var(--font-body)", marginBottom: 16 }}>
          Jacob Smith and the Nightingale team cut their teeth at <strong style={{ color: B.text }}>Organogenesis</strong> — the company that pioneered the advanced wound care biologics market. They witnessed firsthand how the CTP reimbursement model was built, how it grew, and why it was destined to be disrupted. <strong style={{ color: B.emerald }}>Nightingale identified the PRP pendulum shift before Legacy Medical formalized their exclusive distribution agreement in August 2025.</strong>
        </div>
        <div style={{ background: B.card, borderRadius: 14, padding: 18, border: `1px solid ${B.border}` }}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>Nightingale vs. MiMedx Model</div>
          {[
            ["Focus", "Dedicated PRP specialist", "50+ SKU generalist"],
            ["Rep Expertise", "Deep clinical training", "Broad but shallow"],
            ["Response", "Same-day · Direct line", "Ticketed queue"],
            ["Billing Support", "Hands-on G0465 setup", "Call center"],
            ["In-Service", "Custom for your team", "Corporate template"],
            ["Relationship", "Partner (equity stake)", "Quota-driven vendor"],
          ].map(([attr, ng, comp]) => (
            <div key={attr} style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr", gap: 4, padding: "4px 0", borderBottom: `1px solid ${B.border}`, fontSize: 11, fontFamily: "var(--font-body)" }}>
              <span style={{ color: B.textMuted }}>{attr}</span>
              <span style={{ color: B.emerald, fontWeight: 600 }}>{ng}</span>
              <span style={{ color: B.textMuted }}>{comp}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ background: B.card, borderRadius: 14, padding: 20, border: `1px solid ${B.border}`, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${B.emerald}44, ${B.blue}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: `2px solid ${B.emerald}44` }}>👔</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: B.white, fontFamily: "var(--font-display)" }}>Jacob Smith</div>
              <div style={{ fontSize: 12, color: B.emerald, fontWeight: 600, fontFamily: "var(--font-body)" }}>Partner · Nightingale BioTech</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: B.gold, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>Career Journey</div>
          {[
            { phase: "Organogenesis", role: "Wound care biologics · Built market expertise", color: B.blue },
            { phase: "Industry Leadership", role: "Recognized for execution, detail, clinical distillation", color: B.gold },
            { phase: "Nightingale BioTech", role: "Partner · Leading Memphis market development", color: B.emerald },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 3, background: p.color, borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: p.color, fontFamily: "var(--font-body)" }}>{p.phase}</div>
                <div style={{ fontSize: 11, color: B.textSecondary, fontFamily: "var(--font-body)" }}>{p.role}</div>
              </div>
            </div>
          ))}
        </div>
        <GlowBox color={B.emerald}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-body)" }}>Why Jacob + Sandy Works</div>
          {[
            "Organogenesis heritage = understands wound center workflows inside out",
            "Personally committed as partner (not a quota-driven rep)",
            "Will provide hands-on G0465 billing & coding setup",
            "In-service training customized for Methodist North's team",
            "Ongoing clinical support — not a drive-by sale",
            "First to identify this opportunity for Methodist North",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 5, fontSize: 11, color: B.text, fontFamily: "var(--font-body)" }}>
              <span style={{ color: B.emerald, marginTop: 1, flexShrink: 0 }}>→</span>
              <span>{item}</span>
            </div>
          ))}
        </GlowBox>
      </div>
    </div>
  </div>
);

// ── 12. ACTION PLAN ───────────────────────────────────────
S.action = () => (
  <div style={{ padding: "36px 48px", height: "100%" }}>
    <SectionTag color={B.emerald}>Next Steps</SectionTag>
    <h2 style={{ fontSize: 38, fontWeight: 800, margin: "8px 0 0", fontFamily: "var(--font-display)", color: B.white, lineHeight: 1.1 }}>
      90-Day <span style={{ color: B.emerald }}>Activation Plan</span>
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, marginTop: 16 }}>
      <div>
        {[
          { wk: "Wk 1–2", title: "Clinical In-Service", items: ["ActiGraft PRO MOA & technique training for Sandy's team", "Documentation workflow integration with Epic", "Case selection criteria & patient identification"], color: B.emerald, icon: "🎓" },
          { wk: "Wk 2–3", title: "Billing Deep-Dive", items: ["G0465 claims setup & invoice requirements", "Dual diagnosis coding (ICD-10-E + L codes)", "Methodist billing team alignment with Ensemble RCM"], color: B.blue, icon: "💳" },
          { wk: "Wk 3–4", title: "Formulary Activation", items: ["Premier GPO contract documentation (already on Premier)", "Value Analysis Committee presentation support", "Supply chain onboarding with Rusty Parker's team"], color: B.gold, icon: "📋" },
          { wk: "Wk 4–8", title: "First Patients", items: ["On-site Jacob Smith support for initial treatments", "Heal rate tracking & documentation begins", "Case study development for Methodist metrics"], color: B.purple, icon: "🩺" },
          { wk: "Wk 8–12", title: "Scale & Expand", items: ["Data review & outcome reporting", "Methodist South expansion assessment", "System-wide wound care strategy presentation to MLH leadership"], color: B.emerald, icon: "📈" },
        ].map((phase, i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 40 }}>
              <div style={{ fontSize: 20 }}>{phase.icon}</div>
              <div style={{ width: 2, flex: 1, background: `linear-gradient(180deg, ${phase.color}, ${B.border})` }} />
            </div>
            <div style={{ flex: 1, background: B.card, borderRadius: 10, padding: "12px 16px", border: `1px solid ${B.border}`, borderLeft: `3px solid ${phase.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: phase.color, fontFamily: "var(--font-display)" }}>{phase.title}</span>
                <span style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>{phase.wk}</span>
              </div>
              {phase.items.map((item, j) => (
                <div key={j} style={{ fontSize: 11, color: B.textSecondary, fontFamily: "var(--font-body)", lineHeight: 1.5, display: "flex", gap: 6 }}>
                  <span style={{ color: phase.color, flexShrink: 0 }}>·</span>{item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <GlowBox color={B.emerald}>
          <div style={{ fontSize: 11, color: B.emerald, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>What Methodist North Gets</div>
          {[
            ["2.73×", "RCT healing advantage for DFU patients"],
            ["$1M+", "Potential annual new revenue (10 pts/wk)"],
            ["$0", "Capital equipment investment"],
            ["5 min", "Prep = 3–4× patient throughput"],
            ["NCD 270.3", "Protected federal reimbursement pathway"],
            ["Jacob", "Dedicated clinical partner on-site"],
          ].map(([k, v]) => (
            <div key={v} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
              <div style={{ minWidth: 55, fontSize: 14, fontWeight: 800, color: B.emerald, fontFamily: "var(--font-display)", textAlign: "right" }}>{k}</div>
              <div style={{ fontSize: 11, color: B.text, fontFamily: "var(--font-body)" }}>{v}</div>
            </div>
          ))}
        </GlowBox>
        <div style={{ background: `linear-gradient(135deg, ${B.emerald}12, ${B.gold}08)`, borderRadius: 14, padding: 20, border: `1px solid ${B.emerald}25`, textAlign: "center" }}>
          <NightingaleLogo size={40} />
          <div style={{ fontSize: 18, fontWeight: 800, color: B.white, fontFamily: "var(--font-display)", marginTop: 10 }}>Let's Build This Together</div>
          <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${B.emerald}, ${B.gold})`, borderRadius: 1, margin: "10px auto" }} />
          <div style={{ fontSize: 14, fontWeight: 700, color: B.emerald, fontFamily: "var(--font-body)" }}>Jacob Smith</div>
          <div style={{ fontSize: 12, color: B.textMuted, fontFamily: "var(--font-body)" }}>Partner · Nightingale BioTech</div>
          <div style={{ marginTop: 12, fontSize: 11, color: B.textSecondary, fontStyle: "italic", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
            "Same patients. Same wounds. Same clinical excellence.<br />Dramatically better economics."
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   DECK ENGINE
   ═══════════════════════════════════════════════════════════ */

const SLIDE_ORDER = [
  { id: "title", label: "Overview", section: "INTRO", color: B.emerald },
  { id: "crisis", label: "The Crisis", section: "MARKET", color: B.red },
  { id: "methodist", label: "Methodist System", section: "METHODIST", color: B.blue },
  { id: "north", label: "Methodist North", section: "METHODIST", color: B.emerald },
  { id: "sandy", label: "Sandy Deimund", section: "METHODIST", color: B.gold },
  { id: "memphis", label: "Memphis Market", section: "MARKET", color: B.blue },
  { id: "product", label: "ActiGraft PRO", section: "SOLUTION", color: B.emerald },
  { id: "evidence", label: "Clinical Evidence", section: "SOLUTION", color: B.emerald },
  { id: "revenue", label: "Revenue Model", section: "ECONOMICS", color: B.purple },
  { id: "threat", label: "Competitive Intel", section: "STRATEGY", color: B.red },
  { id: "partnership", label: "Nightingale + Jacob", section: "PARTNERSHIP", color: B.emerald },
  { id: "action", label: "90-Day Plan", section: "CLOSE", color: B.emerald },
];

export default function NightingalePitchDeck() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const animKey = useRef(0);

  const go = useCallback((n) => {
    if (n < 0 || n >= SLIDE_ORDER.length || n === idx) return;
    setDir(n > idx ? 1 : -1);
    animKey.current++;
    setIdx(n);
  }, [idx]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(idx + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [idx, go]);

  const slide = SLIDE_ORDER[idx];
  const SlideComp = S[slide.id];

  return (
    <div style={{ width: "100%", height: "100vh", background: B.bg, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "var(--font-body)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap');
        :root { --font-display: 'Sora', sans-serif; --font-body: 'Source Sans 3', sans-serif; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes slideIn { from { opacity:0; transform:translateX(${dir > 0 ? 40 : -40}px); } to { opacity:1; transform:translateX(0); } }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px", borderBottom: `1px solid ${B.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <NightingaleLogo size={22} />
          <span style={{ fontSize: 11, fontWeight: 700, color: B.emerald, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-display)" }}>Nightingale</span>
          <span style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>× Methodist North</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {SLIDE_ORDER.map((s, i) => (
            <div key={i} onClick={() => go(i)} style={{ width: i === idx ? 28 : 12, height: 4, borderRadius: 2, background: i === idx ? s.color : i < idx ? `${s.color}55` : B.border, cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        <div style={{ fontSize: 10, color: B.textMuted, fontFamily: "var(--font-body)" }}>
          <span style={{ color: slide.color, fontWeight: 700 }}>{slide.section}</span> · {idx + 1}/{SLIDE_ORDER.length}
        </div>
      </div>

      {/* ── SLIDE ── */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div key={animKey.current} style={{ position: "absolute", inset: 0, animation: "slideIn 0.35s ease-out forwards" }}>
          <SlideComp />
        </div>
      </div>

      {/* ── FOOTER NAV ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px", borderTop: `1px solid ${B.border}`, flexShrink: 0 }}>
        <button onClick={() => go(idx - 1)} disabled={idx === 0} style={{ background: idx === 0 ? B.surface : B.card, color: idx === 0 ? B.textMuted : B.text, border: `1px solid ${B.border}`, borderRadius: 8, padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: idx === 0 ? "default" : "pointer", fontFamily: "var(--font-body)" }}>
          ← Prev
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          {SLIDE_ORDER.map((s, i) => (
            <button key={i} onClick={() => go(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 0", fontSize: 10, color: i === idx ? s.color : B.textMuted, fontWeight: i === idx ? 700 : 400, fontFamily: "var(--font-body)", textDecoration: i === idx ? "underline" : "none", textUnderlineOffset: 3 }}>
              {s.label}
            </button>
          ))}
        </div>
        <button onClick={() => go(idx + 1)} disabled={idx === SLIDE_ORDER.length - 1} style={{ background: idx === SLIDE_ORDER.length - 1 ? B.surface : slide.color, color: idx === SLIDE_ORDER.length - 1 ? B.textMuted : B.bg, border: `1px solid ${idx === SLIDE_ORDER.length - 1 ? B.border : slide.color}`, borderRadius: 8, padding: "7px 18px", fontSize: 12, fontWeight: 700, cursor: idx === SLIDE_ORDER.length - 1 ? "default" : "pointer", fontFamily: "var(--font-body)" }}>
          Next →
        </button>
      </div>
    </div>
  );
}
