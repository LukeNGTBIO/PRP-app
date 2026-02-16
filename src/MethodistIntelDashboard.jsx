import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, LineChart, Line, Area, AreaChart
} from "recharts";
import {
  Shield, AlertTriangle, CheckCircle, XCircle, Building2, Activity,
  DollarSign, TrendingUp, FileText, Users, Heart, ChevronDown, ChevronRight,
  Target, Zap, Clock, MapPin, Phone, Mail, ExternalLink, Star, Layers
} from "lucide-react";

// ─── DATA LAYER ───────────────────────────────────────────────
// Official Nightingale Biotech Brand Colors (Brand Toolkit July 2024)
// Dark Blue: #0A1526 | Light Blue: #CDE9EE | Bright Blue: #449AF6
// Light Taupe: #EDE7D4 | Golden Yellow: #FEBE11 | White: #FFFFFF
const BRAND = {
  brightBlue: "#449AF6",       // Primary accent — CTAs, links, highlights
  lightBlue: "#CDE9EE",        // Secondary accent — soft highlights, badges
  goldenYellow: "#FEBE11",     // Accent — dividers, warnings, timeline markers
  dark: "#0A1526",             // Dark Blue — primary background
  darkPanel: "#0E1B30",        // Slightly lighter dark panel
  darkCard: "#12223D",         // Card backgrounds
  border: "#1A3050",           // Border color (dark blue family)
  textPrimary: "#CDE9EE",     // Light Blue — headings on dark bg
  textSecondary: "#8FA8BE",    // Muted light blue for secondary text
  textMuted: "#5B7590",        // Dimmed text
  confirmed: "#449AF6",        // Bright Blue for positive / confirmed
  assessed: "#FEBE11",         // Golden Yellow for assessed / warning
  unconfirmed: "#E85D5D",      // Red for not found / barriers
  high: "#CDE9EE",             // Light Blue for high confidence
  taupe: "#EDE7D4",            // Light Taupe — alt backgrounds, subtle accents
  white: "#FFFFFF",
};

const HOSPITAL_PROFILE = {
  name: "Methodist University Hospital",
  parent: "Methodist Le Bonheur Healthcare (MLH)",
  address: "1265 Union Avenue, Memphis, TN 38104",
  beds: 583,
  taxStatus: "501(c)(3) Non-Profit",
  ein: "62-0479367",
  systemSize: "6 hospitals + ambulatory/outpatient centers",
  academic: "Primary teaching hospital — UTHSC",
  ranking: "#1 Best Regional Hospital in Memphis (U.S. News)",
  associates: 13000,
  providers: 2400,
  revenue: "$1.9B",
  hospitals: [
    "Methodist University Hospital", "Methodist North Hospital",
    "Methodist South Hospital", "Methodist Le Bonheur Germantown",
    "Methodist Olive Branch Hospital", "Le Bonheur Children's Hospital"
  ],
};

const GPO_DATA = {
  primary: {
    name: "HealthTrust Purchasing Group (HPG)",
    type: "COMMITTED MODEL",
    since: "March 1, 2013",
    model: "Members must purchase set % from HealthTrust-contracted suppliers",
    compliance: "100% market share achieved in some CCIIs",
    minCompliance: 80,
    results2021: {
      newGPOSpend: 20.4,
      totalValue: 1.5,
      hipKneeSavings: 0.289,
      biosimilarSavings: 1.1,
      pharmacySavings: 3.05,
      initiativesTotal: 102,
      initiativesTiedToHT: 86,
    },
    actigraftContract: false,
    supplyChainVP: "Larry Fogarty",
  },
  secondary: {
    name: "Vizient",
    type: "INNOVATIVE TECHNOLOGY CONTRACT",
    model: "Optional committed programs; academic medical center focus",
    actigraftContract: true,
    contractDate: "October 2022",
    proAvailability: "August 2023",
  },
};

const ACTIGRAFT_GPO_CONTRACTS = [
  { gpo: "Vizient", status: "ACTIVE", type: "Innovative Technology Contract", date: "Oct 2022", confidence: "Confirmed" },
  { gpo: "Healogics iSupply", status: "ACTIVE", type: "GPO Selection", date: "Oct 2024", confidence: "Confirmed" },
  { gpo: "Capstone Health Alliance", status: "ACTIVE", type: "Contract #CAP-MM-146", date: "Jul 2021", confidence: "Confirmed" },
  { gpo: "MediGroup", status: "ACTIVE", type: "Strategic Partnership", date: "Oct 2021", confidence: "Confirmed" },
  { gpo: "WCA Formulary", status: "ACTIVE", type: "Formulary Addition", date: "Oct 2024", confidence: "Confirmed" },
  { gpo: "HealthTrust (HPG)", status: "NOT FOUND", type: "No contract announced", date: "—", confidence: "High Confidence" },
  { gpo: "Premier", status: "UNCONFIRMED", type: "Showcased at conference", date: "—", confidence: "Moderate" },
];

const REIMBURSEMENT = {
  hcpcsCode: "G0465",
  ncd: "NCD 270.3",
  hospitalOutpatient: 1726,
  nonFacility: 770.83,
  kitCost: 450,
  grossMargin: 1276,
  grossMarginPct: 74,
  coverageDuration: "20 weeks (20 applications)",
  woundClosureRate: 72,
  standardOfCare: 22,
  hbotOnly: 20665,
  combinedProtocol: 36406,
  revenueIncrease: 76,
};

const PROTOCOL_REVENUE = [
  { week: "Wk 1-2", hbotOnly: 2533, combined: 4813 },
  { week: "Wk 3-4", hbotOnly: 5066, combined: 8163 },
  { week: "Wk 5-6", hbotOnly: 7599, combined: 14912 },
  { week: "Wk 7-8", hbotOnly: 10132, combined: 21161 },
  { week: "Wk 9-10", hbotOnly: 12665, combined: 27410 },
  { week: "Wk 11-12", hbotOnly: 20665, combined: 36406 },
];

const WOUND_CARE_FACILITIES = [
  { name: "South Wound Healing Center", address: "1251 Wesley Dr. #107, Memphis, TN 38116", phone: "901-516-3730", hbo: false, hours: "Mon-Thu 8a-4:30p, Fri 8a-12p" },
  { name: "North Wound Healing Center (Comprehensive)", address: "Methodist North Hospital", phone: "—", hbo: true, hours: "Mon-Fri", hboChambers: 2 },
  { name: "East Wound Care Center", address: "2900 Kirby Pkwy Suite 12, Memphis, TN 38119", phone: "—", hbo: false, hours: "—" },
  { name: "Comprehensive Wound Care Center", address: "1251 Wesley Drive Suite 107, Memphis, TN 38116", phone: "—", hbo: false, hours: "—" },
  { name: "South Wound Care Center", address: "1264 Wesley Drive Suite 102, Memphis, TN 38116", phone: "—", hbo: false, hours: "—" },
];

const TIMELINE_EVENTS = [
  { date: "Mar 2013", event: "MLH joins HealthTrust GPO", type: "gpo" },
  { date: "2020", event: "ActiGraft FDA 510(k) + CE Mark", type: "product" },
  { date: "Jul 2021", event: "Capstone Health Alliance contract", type: "contract" },
  { date: "Oct 2021", event: "MediGroup partnership", type: "contract" },
  { date: "Oct 2022", event: "Vizient Innovative Technology Contract", type: "contract" },
  { date: "May 2023", event: "ActiGraft PRO launch + G-Code", type: "product" },
  { date: "Aug 2023", event: "ActiGraft PRO on Vizient", type: "contract" },
  { date: "Oct 2024", event: "Healogics iSupply + WCA Formulary", type: "contract" },
  { date: "Aug 2025", event: "LMC exclusive U.S. distribution", type: "product" },
  { date: "2026", event: "CTP reimbursement cuts (90%) — ActiGraft immune", type: "regulatory" },
];

const STRATEGIC_SCORES = [
  { axis: "Vizient Contract", value: 95 },
  { axis: "Reimbursement", value: 90 },
  { axis: "Clinical Evidence", value: 80 },
  { axis: "Cost Advantage", value: 85 },
  { axis: "HealthTrust Gap", value: 30 },
  { axis: "Clinical Champion", value: 45 },
  { axis: "HBO Synergy", value: 88 },
  { axis: "Regulatory Shield", value: 95 },
];

const PER_APP_ECONOMICS = [
  { name: "Kit Cost", value: 450, fill: "#E85D5D" },
  { name: "Gross Margin", value: 1276, fill: "#449AF6" },
];

const WOUND_CLOSURE_DATA = [
  { name: "ActiGraft Pro", rate: 72, fill: BRAND.brightBlue },
  { name: "Standard of Care", rate: 22, fill: BRAND.textMuted },
];

// ─── COMPONENTS ───────────────────────────────────────────────

const ConfidenceBadge = ({ level }) => {
  const map = {
    "Confirmed": { bg: "rgba(52,211,153,0.15)", text: BRAND.confirmed, icon: CheckCircle },
    "High Confidence": { bg: "rgba(96,165,250,0.15)", text: BRAND.high, icon: Shield },
    "Assessed": { bg: "rgba(251,191,36,0.15)", text: BRAND.assessed, icon: AlertTriangle },
    "Probable": { bg: "rgba(251,191,36,0.15)", text: BRAND.assessed, icon: AlertTriangle },
    "Moderate": { bg: "rgba(251,191,36,0.15)", text: BRAND.assessed, icon: AlertTriangle },
    "Unconfirmed": { bg: "rgba(248,113,113,0.15)", text: BRAND.unconfirmed, icon: XCircle },
    "Inferred": { bg: "rgba(139,155,180,0.15)", text: BRAND.textSecondary, icon: Target },
    "Recommendation": { bg: "rgba(37,162,220,0.15)", text: BRAND.brightBlue, icon: Zap },
    "Contextual": { bg: "rgba(139,155,180,0.15)", text: BRAND.textSecondary, icon: FileText },
  };
  const cfg = map[level] || map["Unconfirmed"];
  const Icon = cfg.icon;
  return (
    <span style={{ background: cfg.bg, color: cfg.text, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, letterSpacing: 0.3 }}>
      <Icon size={12} /> {level}
    </span>
  );
};

const StatusDot = ({ active }) => (
  <span style={{ width: 8, height: 8, borderRadius: "50%", background: active ? BRAND.confirmed : BRAND.unconfirmed, display: "inline-block" }} />
);

const MetricCard = ({ icon: Icon, label, value, sub, accent = BRAND.brightBlue }) => (
  <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Icon size={14} color={accent} />
      <span style={{ color: BRAND.textMuted, fontSize: 11, fontWeight: 500, letterSpacing: 0.4, textTransform: "uppercase" }}>{label}</span>
    </div>
    <div style={{ fontSize: 24, fontWeight: 700, color: BRAND.white, letterSpacing: -0.5 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: BRAND.textMuted }}>{sub}</div>}
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div style={{ marginBottom: 18, paddingBottom: 12, borderBottom: `1px solid ${BRAND.border}` }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
      <Icon size={17} color={BRAND.brightBlue} />
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: BRAND.white, letterSpacing: -0.2 }}>{title}</h2>
    </div>
    {subtitle && <p style={{ margin: 0, marginLeft: 25, fontSize: 12, color: BRAND.textMuted }}>{subtitle}</p>}
  </div>
);

const Collapsible = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "transparent", border: "none", padding: "16px 22px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: BRAND.textPrimary }}>
        <Icon size={18} color={BRAND.brightBlue} />
        <span style={{ flex: 1, textAlign: "left", fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{title}</span>
        {open ? <ChevronDown size={18} color={BRAND.textMuted} /> : <ChevronRight size={18} color={BRAND.textMuted} />}
      </button>
      {open && <div style={{ padding: "0 22px 20px", borderTop: `1px solid ${BRAND.border}` }}>{children}</div>}
    </div>
  );
};

const DataRow = ({ label, value, confidence, highlight }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: `1px solid ${BRAND.border}22` }}>
    <div style={{ flex: "0 0 200px", fontSize: 12, color: BRAND.textSecondary, fontWeight: 500, paddingTop: 2 }}>{label}</div>
    <div style={{ flex: 1, fontSize: 13, color: highlight ? BRAND.brightBlue : BRAND.textPrimary, fontWeight: highlight ? 600 : 400, lineHeight: 1.5 }}>{value}</div>
    {confidence && <div style={{ flex: "0 0 auto" }}><ConfidenceBadge level={confidence} /></div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: BRAND.darkPanel, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: "10px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
      <div style={{ fontSize: 12, color: BRAND.textSecondary, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: p.color, fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
          {p.name}: ${p.value.toLocaleString()}
        </div>
      ))}
    </div>
  );
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────

export default function MethodistIntelDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Executive Overview", icon: Target },
    { id: "gpo", label: "GPO Analysis", icon: Layers },
    { id: "financial", label: "Financial Intelligence", icon: DollarSign },
    { id: "clinical", label: "Clinical & Facilities", icon: Heart },
    { id: "strategy", label: "Strategic Playbook", icon: Zap },
    { id: "data", label: "Raw Intelligence", icon: FileText },
  ];

  return (
    <div style={{ minHeight: "100vh", background: BRAND.dark, color: BRAND.textPrimary, fontFamily: "'Roboto', 'Segoe UI', system-ui, sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: BRAND.dark, borderBottom: `1px solid ${BRAND.border}`, padding: "20px 32px", position: "sticky", top: 50, zIndex: 50 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                <div style={{ background: BRAND.brightBlue, padding: "6px 10px", borderRadius: 6, fontWeight: 700, fontSize: 13, color: BRAND.white, letterSpacing: 0.5 }}>NB</div>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: -0.3, color: BRAND.white }}>
                  Methodist University Hospital — Market Intelligence
                </h1>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: BRAND.textMuted, marginLeft: 46 }}>
                ActiGraft Pro · GPO Contracting Intelligence · Compiled Feb 15, 2026 · Nightingale BioTech
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: BRAND.textMuted, background: BRAND.darkCard, padding: "6px 12px", borderRadius: 8, border: `1px solid ${BRAND.border}` }}>
                <Clock size={12} style={{ verticalAlign: -2, marginRight: 4 }} /> Last Updated: Feb 15, 2026
              </span>
            </div>
          </div>
          {/* TABS */}
          <div style={{ display: "flex", gap: 4, marginTop: 18, overflowX: "auto" }}>
            {tabs.map(t => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{ background: active ? `${BRAND.brightBlue}15` : "transparent", border: `1px solid ${active ? BRAND.brightBlue + "33" : "transparent"}`, borderRadius: 6, padding: "7px 14px", color: active ? BRAND.brightBlue : BRAND.textMuted, fontSize: 12, fontWeight: active ? 600 : 400, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", transition: "all 0.15s" }}>
                  <Icon size={14} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>

        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === "overview" && (
          <div>
            {/* Key Metrics Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
              <MetricCard icon={Building2} label="System Revenue" value={HOSPITAL_PROFILE.revenue} sub="6-hospital nonprofit system" />
              <MetricCard icon={Activity} label="Hospital Beds" value={HOSPITAL_PROFILE.beds} sub="Flagship hospital — Memphis" />
              <MetricCard icon={Shield} label="Primary GPO" value="HealthTrust" sub="Committed model since 2013" accent={BRAND.assessed} />
              <MetricCard icon={CheckCircle} label="Vizient Contract" value="ACTIVE" sub="ActiGraft PRO since Aug 2023" accent={BRAND.confirmed} />
              <MetricCard icon={XCircle} label="HealthTrust" value="NO CONTRACT" sub="Highest-priority gap" accent={BRAND.unconfirmed} />
              <MetricCard icon={DollarSign} label="Per-App Margin" value="$1,276" sub="74% gross margin (G0465)" accent={BRAND.goldenYellow} />
            </div>

            {/* Critical Assessment Banner */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.goldenYellow}44`, borderLeft: `3px solid ${BRAND.goldenYellow}`, borderRadius: 4, padding: "16px 20px", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Zap size={18} color={BRAND.goldenYellow} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700, color: BRAND.goldenYellow }}>Critical Strategic Finding</h3>
                  <p style={{ margin: 0, fontSize: 13, color: BRAND.textSecondary, lineHeight: 1.6 }}>
                    ActiGraft's classification as a <strong style={{ color: BRAND.brightBlue }}>blood-derived product (G0465)</strong> places it in a distinct product category from allografts and CTPs on HealthTrust's existing regenerative tissue contracts. This creates a <strong style={{ color: BRAND.white }}>category gap — not a compliance conflict</strong>. MLH may be able to procure ActiGraft through Vizient's contract without violating HealthTrust committed-model requirements, because HealthTrust has no competing contract in this product category.
                  </p>
                </div>
              </div>
            </div>

            {/* GPO Contract Landscape */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24, marginBottom: 28 }}>
              <SectionHeader icon={Layers} title="ActiGraft GPO Contract Landscape" subtitle="Current contract status across all Group Purchasing Organizations" />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${BRAND.border}` }}>
                      {["GPO", "Status", "Contract Type", "Date", "Confidence"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: BRAND.textSecondary, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ACTIGRAFT_GPO_CONTRACTS.map((c, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${BRAND.border}33`, background: c.status === "NOT FOUND" ? `${BRAND.unconfirmed}08` : "transparent" }}>
                        <td style={{ padding: "12px 14px", fontWeight: 600, color: BRAND.textPrimary }}>{c.gpo}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <StatusDot active={c.status === "ACTIVE"} />
                            <span style={{ color: c.status === "ACTIVE" ? BRAND.confirmed : c.status === "NOT FOUND" ? BRAND.unconfirmed : BRAND.assessed, fontWeight: 600 }}>{c.status}</span>
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px", color: BRAND.textSecondary }}>{c.type}</td>
                        <td style={{ padding: "12px 14px", color: BRAND.textSecondary }}>{c.date}</td>
                        <td style={{ padding: "12px 14px" }}><ConfidenceBadge level={c.confidence} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24 }}>
              <SectionHeader icon={Clock} title="Key Timeline" subtitle="Critical milestones for ActiGraft market positioning at MLH" />
              <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", paddingLeft: 28 }}>
                <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 1, background: BRAND.border }} />
                {TIMELINE_EVENTS.map((e, i) => {
                  const colors = { gpo: BRAND.assessed, product: BRAND.brightBlue, contract: BRAND.confirmed, regulatory: BRAND.unconfirmed };
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "10px 0", position: "relative" }}>
                      <div style={{ position: "absolute", left: -22, top: 14, width: 12, height: 12, borderRadius: "50%", background: colors[e.type], border: `2px solid ${BRAND.dark}`,  }} />
                      <span style={{ flex: "0 0 90px", fontSize: 12, fontWeight: 600, color: colors[e.type] }}>{e.date}</span>
                      <span style={{ fontSize: 13, color: BRAND.textPrimary }}>{e.event}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ GPO TAB ═══ */}
        {activeTab === "gpo" && (
          <div>
            {/* HealthTrust vs Vizient Comparison */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              {/* HealthTrust Card */}
              <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.assessed}44`, borderRadius: 8, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <Shield size={18} color={BRAND.assessed} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: BRAND.white }}>HealthTrust (HPG)</h3>
                    <span style={{ fontSize: 11, color: BRAND.assessed, fontWeight: 600 }}>PRIMARY GPO — Committed Model</span>
                  </div>
                </div>
                <DataRow label="Member Since" value="March 1, 2013" confidence="Confirmed" />
                <DataRow label="Model" value="COMMITTED — MLH must purchase set % from HealthTrust-contracted suppliers" confidence="Confirmed" />
                <DataRow label="Min Compliance" value="80% (MLH achieved 100% in some CCIIs)" confidence="Confirmed" />
                <DataRow label="Supply Chain VP" value="Larry Fogarty" confidence="Confirmed" />
                <DataRow label="2021 New GPO Spend" value="$20.4M" confidence="Confirmed" />
                <DataRow label="2021 Total Value" value="$1.5M" confidence="Confirmed" />
                <DataRow label="Pharmacy Savings" value="$3.05M" confidence="Confirmed" />
                <DataRow label="Biosimilar Savings" value="$1.1M" confidence="Confirmed" />
                <DataRow label="PPI Initiatives" value="Cardiovascular, Spine, Osteobiologics (via SourceTrust)" confidence="Confirmed" />
                <div style={{ marginTop: 16, background: `${BRAND.unconfirmed}12`, border: `1px solid ${BRAND.unconfirmed}33`, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <XCircle size={16} color={BRAND.unconfirmed} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.unconfirmed }}>ActiGraft Contract: NOT FOUND</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: BRAND.textSecondary, lineHeight: 1.5 }}>
                    No public contract between RedDress/ActiGraft/LMC and HealthTrust HPG identified. GPO contracting expansion is an explicit goal per LMC-RedDress partnership (Aug 2025).
                  </p>
                </div>
              </div>

              {/* Vizient Card */}
              <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.confirmed}44`, borderRadius: 8, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <CheckCircle size={18} color={BRAND.confirmed} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: BRAND.white }}>Vizient</h3>
                    <span style={{ fontSize: 11, color: BRAND.confirmed, fontWeight: 600 }}>SECONDARY GPO — Active ActiGraft Contract</span>
                  </div>
                </div>
                <DataRow label="Contract Type" value="Innovative Technology Contract" confidence="Confirmed" />
                <DataRow label="Original Award" value="October 2022" confidence="Confirmed" />
                <DataRow label="PRO Available" value="August 2023" confidence="Confirmed" />
                <DataRow label="Model" value="Optional committed programs; academic medical center focus" confidence="Confirmed" />
                <DataRow label="Member Base" value="Academic medical centers, community hospitals, IDNs, non-acute providers" confidence="Confirmed" />
                <DataRow label="MLH Alignment" value="UTHSC academic affiliation aligns with Vizient's academic medical center member base" confidence="Probable" />
                <div style={{ marginTop: 16, background: `${BRAND.confirmed}12`, border: `1px solid ${BRAND.confirmed}33`, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <CheckCircle size={16} color={BRAND.confirmed} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.confirmed }}>ActiGraft Contract: ACTIVE</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: BRAND.textSecondary, lineHeight: 1.5 }}>
                    Vizient Innovative Technology Contract awarded Oct 2022. ActiGraft PRO available through Vizient since Aug 2023. This is the primary GPO pathway into MLH for ActiGraft.
                  </p>
                </div>
              </div>
            </div>

            {/* GPO Precedence Analysis */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24, marginBottom: 28 }}>
              <SectionHeader icon={Target} title="GPO Precedence Assessment" subtitle="Which GPO controls biologics & wound care procurement at MLH?" />
              <DataRow label="Assessment" value="HealthTrust is the PRIMARY GPO for all MLH supply chain decisions due to committed-model requirements. However, for novel products NOT on HealthTrust contract (like ActiGraft), hospitals can access through secondary GPO contracts (Vizient) or off-contract purchasing." confidence="Assessed" highlight />
              <DataRow label="Key Insight" value="ActiGraft is classified as a blood-derived product (G0465), NOT a skin substitute/CTP. This classification likely falls OUTSIDE existing HealthTrust regenerative tissue contracts — creating a category gap, not a compliance conflict." confidence="Assessed" highlight />
              <DataRow label="HealthTrust WC Committee" value="Dedicated specialty committee governs wound care product contracting. CMO Dr. Schlosser noted 'fairly significant lack of clinical evidence' about most biologics — emphasis on clinical rigor." confidence="Confirmed" />
              <DataRow label="HealthTrust WC Contracts" value="Covers regenerative tissue: non-viable human tissue (placental, amnion, chorion), animal tissue (porcine, bovine), non-cultured viable human cells" confidence="Confirmed" />
              <DataRow label="Classification Gap" value="ActiGraft's G0465 blood-derived classification does NOT overlap with HealthTrust's CTP/allograft contracts — this is the strategic opening for Vizient-pathway procurement" confidence="Assessed" highlight />
            </div>

            {/* 2021 HealthTrust Performance */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24 }}>
              <SectionHeader icon={TrendingUp} title="MLH HealthTrust Performance (2021)" subtitle="Demonstrates MLH's deep HealthTrust integration and compliance culture" />
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { metric: "New GPO Spend", value: 20.4, fill: BRAND.brightBlue },
                    { metric: "Pharmacy Savings", value: 3.05, fill: BRAND.goldenYellow },
                    { metric: "Total Value", value: 1.5, fill: BRAND.lightBlue },
                    { metric: "Biosimilar Savings", value: 1.1, fill: BRAND.assessed },
                    { metric: "Hip/Knee Savings", value: 0.289, fill: BRAND.high },
                  ]} margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={BRAND.border} />
                    <XAxis dataKey="metric" tick={{ fontSize: 11, fill: BRAND.textSecondary }} />
                    <YAxis tick={{ fontSize: 11, fill: BRAND.textSecondary }} tickFormatter={v => `$${v}M`} />
                    <Tooltip content={({ active, payload }) => active && payload?.length ? (
                      <div style={{ background: BRAND.darkPanel, border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: BRAND.textPrimary }}>
                        <strong>{payload[0].payload.metric}</strong>: ${payload[0].value}M
                      </div>
                    ) : null} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {[BRAND.brightBlue, BRAND.goldenYellow, BRAND.lightBlue, BRAND.assessed, BRAND.high].map((c, i) => (
                        <Cell key={i} fill={c} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 10 }}>
                <span style={{ fontSize: 12, color: BRAND.textSecondary }}>
                  <strong style={{ color: BRAND.textPrimary }}>102</strong> total initiatives · <strong style={{ color: BRAND.brightBlue }}>86</strong> tied to HealthTrust contracts
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ═══ FINANCIAL TAB ═══ */}
        {activeTab === "financial" && (
          <div>
            {/* Reimbursement Summary Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
              <MetricCard icon={FileText} label="HCPCS Code" value="G0465" sub="Blood-derived product — NOT CTP" />
              <MetricCard icon={DollarSign} label="Hospital Outpatient" value={`$${REIMBURSEMENT.hospitalOutpatient.toLocaleString()}`} sub="Per application (APC 5054)" accent={BRAND.confirmed} />
              <MetricCard icon={DollarSign} label="Kit Cost" value={`$${REIMBURSEMENT.kitCost}`} sub="Invoice price per kit" accent={BRAND.unconfirmed} />
              <MetricCard icon={TrendingUp} label="Gross Margin" value={`$${REIMBURSEMENT.grossMargin.toLocaleString()}`} sub={`${REIMBURSEMENT.grossMarginPct}% per application`} accent={BRAND.goldenYellow} />
              <MetricCard icon={Shield} label="NCD Coverage" value="270.3" sub="Up to 20 wks / 20 applications" />
              <MetricCard icon={Zap} label="2026 Regulatory Shield" value="IMMUNE" sub="Not affected by CTP 90% cuts" accent={BRAND.confirmed} />
            </div>

            {/* Per-Application Economics Pie */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24 }}>
                <SectionHeader icon={DollarSign} title="Per-Application Economics" subtitle="Hospital outpatient reimbursement breakdown" />
                <div style={{ height: 260, display: "flex", justifyContent: "center" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={PER_APP_ECONOMICS} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                        {PER_APP_ECONOMICS.map((e, i) => <Cell key={i} fill={e.fill} />)}
                      </Pie>
                      <Tooltip content={({ active, payload }) => active && payload?.length ? (
                        <div style={{ background: BRAND.darkPanel, border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: BRAND.textPrimary }}>
                          <strong>{payload[0].name}</strong>: ${payload[0].value.toLocaleString()}
                        </div>
                      ) : null} />
                      <Legend formatter={(val) => <span style={{ color: BRAND.textSecondary, fontSize: 12 }}>{val}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ textAlign: "center", fontSize: 12, color: BRAND.textMuted, marginTop: 8 }}>
                  Total Reimbursement: <strong style={{ color: BRAND.brightBlue }}>${REIMBURSEMENT.hospitalOutpatient.toLocaleString()}</strong> per application
                </div>
              </div>

              {/* Wound Closure Comparison */}
              <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24 }}>
                <SectionHeader icon={Heart} title="Wound Closure Rates (12 Weeks)" subtitle="ActiGraft Pro vs. Standard of Care" />
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={WOUND_CLOSURE_DATA} margin={{ top: 10, right: 30, bottom: 20, left: 30 }} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke={BRAND.border} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: BRAND.textSecondary }} tickFormatter={v => `${v}%`} domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: BRAND.textSecondary }} width={120} />
                      <Tooltip content={({ active, payload }) => active && payload?.length ? (
                        <div style={{ background: BRAND.darkPanel, border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: BRAND.textPrimary }}>
                          <strong>{payload[0].payload.name}</strong>: {payload[0].value}% closure
                        </div>
                      ) : null} />
                      <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={40}>
                        {WOUND_CLOSURE_DATA.map((e, i) => <Cell key={i} fill={e.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: BRAND.brightBlue }}>3.3×</span>
                  <span style={{ fontSize: 13, color: BRAND.textSecondary, marginLeft: 8 }}>better closure rate vs. standard of care</span>
                </div>
              </div>
            </div>

            {/* Protocol Revenue Comparison */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24, marginBottom: 28 }}>
              <SectionHeader icon={TrendingUp} title="Cumulative Revenue: HBOT-Only vs. ActiGraft + HBOT Protocol" subtitle="12-week treatment protocol — per patient revenue comparison" />
              <div style={{ height: 340 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PROTOCOL_REVENUE} margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                    <defs>
                      <linearGradient id="gradCombined" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={BRAND.brightBlue} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={BRAND.brightBlue} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradHbot" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={BRAND.textMuted} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={BRAND.textMuted} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={BRAND.border} />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: BRAND.textSecondary }} />
                    <YAxis tick={{ fontSize: 11, fill: BRAND.textSecondary }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="combined" stroke={BRAND.brightBlue} fill="url(#gradCombined)" strokeWidth={3} name="ActiGraft + HBOT" />
                    <Area type="monotone" dataKey="hbotOnly" stroke={BRAND.textMuted} fill="url(#gradHbot)" strokeWidth={2} strokeDasharray="6 4" name="HBOT Only" />
                    <Legend formatter={(val) => <span style={{ color: BRAND.textSecondary, fontSize: 12 }}>{val}</span>} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 10 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: BRAND.textMuted, textTransform: "uppercase", letterSpacing: 0.6 }}>HBOT Only</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: BRAND.textSecondary }}>${REIMBURSEMENT.hbotOnly.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: BRAND.brightBlue, textTransform: "uppercase", letterSpacing: 0.6 }}>Combined Protocol</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: BRAND.brightBlue }}>${REIMBURSEMENT.combinedProtocol.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: BRAND.confirmed, textTransform: "uppercase", letterSpacing: 0.6 }}>Revenue Increase</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: BRAND.confirmed }}>+{REIMBURSEMENT.revenueIncrease}%</div>
                </div>
              </div>
            </div>

            {/* 20-Week Max Utilization */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24 }}>
              <SectionHeader icon={Star} title="20-Week Maximum Utilization Model" subtitle="Full NCD 270.3 coverage — per patient economics (Medicare + MA)" />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${BRAND.border}` }}>
                      {["Metric", "Value"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: BRAND.textSecondary, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Total Applications", "30 (20 wks × variable freq)"],
                      ["Total Kit Cost", "$13,500 (30 × $450)"],
                      ["ActiGraft Revenue (G0465)", "$51,780"],
                      ["HBOT Revenue (40 sessions)", "$20,665"],
                      ["Total Per-Patient Revenue", "$72,445"],
                      ["Total Gross Profit", "$58,945"],
                      ["Gross Margin", "81%"],
                      ["vs. HBOT-Only Revenue", "+$51,780 (+250%)"],
                    ].map(([m, v], i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${BRAND.border}22` }}>
                        <td style={{ padding: "10px 14px", color: BRAND.textSecondary, fontWeight: 500 }}>{m}</td>
                        <td style={{ padding: "10px 14px", color: i >= 4 ? BRAND.brightBlue : BRAND.textPrimary, fontWeight: i >= 4 ? 700 : 400 }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ CLINICAL TAB ═══ */}
        {activeTab === "clinical" && (
          <div>
            {/* Wound Care Facilities */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24, marginBottom: 28 }}>
              <SectionHeader icon={MapPin} title="MLH Wound Care Facilities (5 Locations)" subtitle="Methodist Le Bonheur Healthcare wound care center network" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                {WOUND_CARE_FACILITIES.map((f, i) => (
                  <div key={i} style={{ background: BRAND.darkPanel, border: `1px solid ${f.hbo ? BRAND.brightBlue + "44" : BRAND.border}`, borderRadius: 8, padding: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <Building2 size={16} color={f.hbo ? BRAND.brightBlue : BRAND.textSecondary} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.textPrimary }}>{f.name}</span>
                    </div>
                    <div style={{ fontSize: 12, color: BRAND.textSecondary, lineHeight: 1.6 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 }}>
                        <MapPin size={12} style={{ flexShrink: 0, marginTop: 2 }} /> {f.address}
                      </div>
                      {f.phone !== "—" && <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <Phone size={12} /> {f.phone}
                      </div>}
                      {f.hbo && (
                        <div style={{ marginTop: 8, background: `${BRAND.brightBlue}15`, border: `1px solid ${BRAND.brightBlue}33`, borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                          <Activity size={14} color={BRAND.brightBlue} />
                          <span style={{ color: BRAND.brightBlue, fontWeight: 600, fontSize: 12 }}>{f.hboChambers} HBO Monoplace Chambers</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wound Care Director Intel */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24, marginBottom: 28 }}>
              <SectionHeader icon={Users} title="Wound Care Leadership Intelligence" subtitle="Key contacts and decision-making culture" />
              <DataRow label="Identified Contact" value="Sandy Deimund, BSN — Clinical Director, Methodist North Comprehensive Wound Healing Center" confidence="Confirmed" highlight />
              <DataRow label="Role" value="Oversees Methodist North HBO and wound care center operations; quoted in Memphis Medical News on treatment protocols and HBO integration" confidence="Confirmed" />
              <DataRow label="System-Wide WC Director" value="Not publicly identified by name — system-level title not found in web searches" confidence="Unconfirmed" />
              <DataRow label="Public Stance on ActiGraft" value="No publicly available statements from any MLH wound care leader regarding ActiGraft" confidence="Unconfirmed" />
              <DataRow label="Decision Culture" value="Centralized supply chain with strong HealthTrust alignment. Product adoption requires both supply chain approval and clinical champion endorsement through formal value analysis." confidence="Inferred" />
              <DataRow label="Value Analysis Process" value="MLH evaluates products through formal value analysis incorporating HealthTrust contract portfolio. Physician advisory committees involved in wound care biologics decisions." confidence="Inferred" />
            </div>

            {/* LMC Distribution */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24 }}>
              <SectionHeader icon={ExternalLink} title="Legacy Medical Consultants (LMC) — Exclusive U.S. Distributor" subtitle="Distribution agreement effective August 19, 2025" />
              <DataRow label="Agreement Type" value="Exclusive U.S. distribution (multi-year)" confidence="Confirmed" />
              <DataRow label="Scope" value="All care settings: hospitals, physician offices, VA/DoD, outpatient wound-care centers" confidence="Confirmed" />
              <DataRow label="Collaboration" value="Payer coverage expansion, GPO contracting expansion, investigator-initiated research" confidence="Confirmed" />
              <DataRow label="LMC CEO" value="Jonathan Knutz" confidence="Confirmed" />
              <DataRow label="RedDress CEO" value="Alon Kushnir (Co-Founder)" confidence="Confirmed" />
              <DataRow label="Contact" value="customerservice@legacymedicalconsultants.com | 817-961-1288" confidence="Confirmed" />
              <DataRow label="Full Portfolio" value="Zenith, Impax, Orion, Complete ACA, SurGraft FT, Reeva FT (allografts) + ActiGraft Pro (autologous)" confidence="Confirmed" />
            </div>
          </div>
        )}

        {/* ═══ STRATEGY TAB ═══ */}
        {activeTab === "strategy" && (
          <div>
            {/* Radar Chart */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24 }}>
                <SectionHeader icon={Target} title="Market Entry Readiness" subtitle="Scoring across 8 strategic dimensions (0-100)" />
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={STRATEGIC_SCORES} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke={BRAND.border} />
                      <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: BRAND.textSecondary }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: BRAND.textMuted }} />
                      <Radar name="Score" dataKey="value" stroke={BRAND.brightBlue} fill={BRAND.brightBlue} fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Key Barriers & Enablers */}
              <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24 }}>
                <SectionHeader icon={AlertTriangle} title="Barriers & Enablers" subtitle="Critical factors for MLH market entry" />
                <div style={{ marginBottom: 16 }}>
                  <h4 style={{ fontSize: 13, color: BRAND.confirmed, fontWeight: 700, margin: "0 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle size={14} /> Enablers
                  </h4>
                  {[
                    "Active Vizient Innovative Technology Contract",
                    "G0465 classification immune to 2026 CTP reimbursement cuts",
                    "74% gross margin ($450 cost vs $1,726 reimbursement)",
                    "Methodist North already operates 2 HBO chambers",
                    "LMC-RedDress GPO contracting expansion underway",
                    "Product category gap in HealthTrust wound care contracts",
                    "72% wound closure (3.3× standard of care)",
                  ].map((e, i) => (
                    <div key={i} style={{ fontSize: 12, color: BRAND.textSecondary, padding: "5px 0", paddingLeft: 20, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: BRAND.confirmed }}>✓</span> {e}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 13, color: BRAND.unconfirmed, fontWeight: 700, margin: "0 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
                    <XCircle size={14} /> Barriers
                  </h4>
                  {[
                    "No HealthTrust contract (primary GPO)",
                    "Committed-model compliance culture may create institutional friction",
                    "No identified clinical champion at MLH wound care",
                    "No public statements from MLH wound care leadership on ActiGraft",
                    "System-wide wound care director not publicly identified",
                  ].map((e, i) => (
                    <div key={i} style={{ fontSize: 12, color: BRAND.textSecondary, padding: "5px 0", paddingLeft: 20, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: BRAND.unconfirmed }}>✗</span> {e}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div style={{ background: BRAND.darkCard, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 24 }}>
              <SectionHeader icon={Zap} title="Strategic Playbook — MLH Market Entry" subtitle="Prioritized action items for ActiGraft adoption at Methodist University Hospital" />
              {[
                { priority: 1, title: "Leverage Vizient Contract", desc: "Approach MLH supply chain leadership with Vizient Innovative Technology Contract number. Position ActiGraft as a novel product category (autologous/blood-derived G0465) distinct from allografts/CTPs on HealthTrust.", confidence: "Recommendation" },
                { priority: 2, title: "Exploit Product Category Gap", desc: "ActiGraft's G0465 classification falls outside HealthTrust regenerative tissue contracts (which cover allografts, CTPs). This means Vizient-pathway procurement may not violate HealthTrust compliance.", confidence: "Assessed" },
                { priority: 3, title: "Engage Sandy Deimund, BSN", desc: "Target the confirmed Clinical Director at Methodist North Wound Healing Center as initial clinical contact. She manages the HBO + wound care program — ideal for ActiGraft + HBOT synergy pitch.", confidence: "Recommendation" },
                { priority: 4, title: "2026 Reimbursement Shield Messaging", desc: "Emphasize ActiGraft's immunity from CTP reimbursement cuts (up to 90%). MLH wound care centers using skin substitutes face massive payment reductions — ActiGraft is a revenue-protective alternative.", confidence: "Recommendation" },
                { priority: 5, title: "UTHSC Research Collaboration", desc: "MLH's academic partnership with UTHSC creates opportunity for investigator-initiated research (explicitly listed in LMC-RedDress agreement). Identify UTHSC surgery/wound care faculty.", confidence: "Recommendation" },
                { priority: 6, title: "HealthTrust Contract Pursuit", desc: "Submit ActiGraft to HealthTrust's Advanced Wound Care Specialty Committee. This removes the primary barrier not just at MLH but across all HealthTrust-committed systems nationwide.", confidence: "Recommendation" },
                { priority: 7, title: "Present Combined Protocol Economics", desc: "Show $72,445 per-patient revenue (20-wk protocol) vs. $20,665 HBOT-only — a 250% increase. 74% gross margin at $450/kit vs. $1,726 reimbursement.", confidence: "Recommendation" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: i < 6 ? `1px solid ${BRAND.border}22` : "none" }}>
                  <div style={{ flex: "0 0 32px", height: 32, borderRadius: 6, background: `${BRAND.brightBlue}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: BRAND.brightBlue }}>{r.priority}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: BRAND.textPrimary }}>{r.title}</span>
                      <ConfidenceBadge level={r.confidence} />
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: BRAND.textSecondary, lineHeight: 1.6 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ RAW DATA TAB ═══ */}
        {activeTab === "data" && (
          <div>
            <Collapsible title="Hospital Profile Data" icon={Building2} defaultOpen>
              <div style={{ paddingTop: 14 }}>
                {Object.entries({
                  "Hospital Name": HOSPITAL_PROFILE.name,
                  "Parent System": HOSPITAL_PROFILE.parent,
                  "Address": HOSPITAL_PROFILE.address,
                  "Bed Count": `${HOSPITAL_PROFILE.beds} beds (flagship)`,
                  "Tax Status": `${HOSPITAL_PROFILE.taxStatus} | EIN ${HOSPITAL_PROFILE.ein}`,
                  "System Size": HOSPITAL_PROFILE.systemSize,
                  "Academic": HOSPITAL_PROFILE.academic,
                  "US News": HOSPITAL_PROFILE.ranking,
                  "Associates": `${HOSPITAL_PROFILE.associates.toLocaleString()}+`,
                  "Providers": `${HOSPITAL_PROFILE.providers.toLocaleString()}+`,
                  "Revenue": HOSPITAL_PROFILE.revenue,
                  "Hospitals": HOSPITAL_PROFILE.hospitals.join(", "),
                }).map(([k, v]) => <DataRow key={k} label={k} value={v} confidence="Confirmed" />)}
              </div>
            </Collapsible>

            <Collapsible title="GPO Affiliation — HealthTrust (Primary)" icon={Shield}>
              <div style={{ paddingTop: 14 }}>
                <DataRow label="GPO Name" value="HealthTrust Purchasing Group (HPG)" confidence="Confirmed" />
                <DataRow label="Member Since" value="March 1, 2013" confidence="Confirmed" />
                <DataRow label="Model" value="COMMITTED MODEL — set % of product volume from HealthTrust brands" confidence="Confirmed" />
                <DataRow label="Min Compliance" value="80% to contract terms" confidence="Confirmed" />
                <DataRow label="MLH Compliance" value="Achieved 100% market share in some CCIIs; described as highly compliant" confidence="Confirmed" />
                <DataRow label="Supply Chain VP" value="Larry Fogarty" confidence="Confirmed" />
                <DataRow label="2021 New GPO Spend" value="$20.4M" confidence="Confirmed" />
                <DataRow label="2021 Total Value" value="$1.5M" confidence="Confirmed" />
                <DataRow label="Pharmacy Savings" value="$3.05M" confidence="Confirmed" />
                <DataRow label="Biosimilar Savings" value="$1.1M" confidence="Confirmed" />
                <DataRow label="Hip/Knee Savings" value="$289K" confidence="Confirmed" />
                <DataRow label="Initiatives (2021)" value="102 total; 86 tied to HealthTrust contracts" confidence="Confirmed" />
                <DataRow label="PPI Evaluation" value="Cardiovascular, Spine, Osteobiologics via SourceTrust" confidence="Confirmed" />
                <DataRow label="ActiGraft Contract" value="NOT FOUND" confidence="High Confidence" />
              </div>
            </Collapsible>

            <Collapsible title="GPO Affiliation — Vizient (Secondary)" icon={CheckCircle}>
              <div style={{ paddingTop: 14 }}>
                <DataRow label="Access Level" value="Potential secondary/supplementary GPO" confidence="Probable" />
                <DataRow label="Academic Alignment" value="Vizient serves academic medical centers; MLH-UTHSC qualifies" confidence="Contextual" />
                <DataRow label="ActiGraft Contract" value="ACTIVE — Innovative Technology Contract (Oct 2022); PRO since Aug 2023" confidence="Confirmed" highlight />
              </div>
            </Collapsible>

            <Collapsible title="ActiGraft Reimbursement Data" icon={DollarSign}>
              <div style={{ paddingTop: 14 }}>
                <DataRow label="NCD" value="270.3 — Blood-Derived Products for Chronic Non-Healing Wounds" confidence="Confirmed" />
                <DataRow label="HCPCS" value="G0465 — Autologous PRP/blood-derived product" confidence="Confirmed" />
                <DataRow label="Hospital Outpatient" value="$1,726-$1,749 per application (APC 5054)" confidence="Confirmed" />
                <DataRow label="Non-Facility" value="$770.83 per application" confidence="Confirmed" />
                <DataRow label="Kit Cost" value="$450 (invoice)" confidence="Confirmed" />
                <DataRow label="Gross Margin" value="$1,276 per application (74%)" confidence="Confirmed" />
                <DataRow label="Coverage Duration" value="Up to 20 weeks (20 applications)" confidence="Confirmed" />
                <DataRow label="Medicare Advantage" value="Covered — NCD binding on MA plans" confidence="Confirmed" />
                <DataRow label="2026 Regulatory" value="IMMUNE from CTP 90% reimbursement cuts" confidence="Confirmed" highlight />
                <DataRow label="Wound Closure" value="72% in 12 weeks (vs. 22% standard of care)" confidence="Confirmed" />
                <DataRow label="Product Classification" value="Autologous blood-derived product — NOT skin substitute/CTP" confidence="Confirmed" highlight />
              </div>
            </Collapsible>

            <Collapsible title="Wound Care Facilities Detail" icon={MapPin}>
              <div style={{ paddingTop: 14 }}>
                {WOUND_CARE_FACILITIES.map((f, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <DataRow label="Facility" value={f.name} confidence="Confirmed" />
                    <DataRow label="Address" value={f.address} />
                    <DataRow label="HBO" value={f.hbo ? `YES — ${f.hboChambers} monoplace chambers` : "No"} />
                    {f.phone !== "—" && <DataRow label="Phone" value={f.phone} />}
                  </div>
                ))}
              </div>
            </Collapsible>

            <Collapsible title="All GPO Contract Status" icon={Layers}>
              <div style={{ paddingTop: 14 }}>
                {ACTIGRAFT_GPO_CONTRACTS.map((c, i) => (
                  <DataRow key={i} label={c.gpo} value={`${c.status} — ${c.type} (${c.date})`} confidence={c.confidence} highlight={c.status === "ACTIVE"} />
                ))}
              </div>
            </Collapsible>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${BRAND.border}`, textAlign: "center" }}>
          <p style={{ fontSize: 11, color: BRAND.textMuted, lineHeight: 1.6 }}>
            Methodist University Hospital ActiGraft GPO Intelligence Dashboard · Compiled Feb 15, 2026<br />
            Nightingale BioTech × Legacy Medical Consultants · Confidential — For Internal Strategic Use Only<br />
            Data sourced from public records, press releases, HealthTrust/Vizient publications, CMS, and web intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
