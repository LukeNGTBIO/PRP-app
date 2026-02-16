import { useState, useMemo } from "react";
import { NIGHTINGALE } from "./brandTheme";
import {
  Calculator, DollarSign, Shield, TrendingUp, AlertTriangle, CheckCircle,
  XCircle, ChevronDown, ChevronUp, Info, Minus, Plus, BarChart3,
  Building2, Activity, FileText, Scale, Zap, Heart, Clock, Target
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
//  CMS REIMBURSEMENT DATA — CY 2025 / CY 2026
// ═══════════════════════════════════════════════════════════════

const CMS_DATA = {
  cy2025: {
    conversionFactor: 89.169,
    g0465_hopd: 2107.97,
    g0465_mpfs_nonfacility: 770.83,
    g0465_mpfs_facility: 83.84,
    laborShare: 0.60,
    nonLaborShare: 0.40,
    budgetNeutralityFactor: 0.9995,
    skinSub_apc5053: 1829,       // ≤100cm² bundled
    skinSub_apc5054: 3661,       // >100cm² bundled
  },
  cy2026: {
    conversionFactor: 91.415,
    g0465_hopd_est: 2161,        // estimated proportional increase
    g0465_mpfs_nonfacility: 790.26,  // office rate: CY2025 rate × (91.415/89.169)
    g0465_mpfs_facility: 85.95,      // facility rate: proportional increase
    laborShare: 0.60,
    nonLaborShare: 0.40,
    budgetNeutralityFactor: 0.9990,
    skinSub_flatRate_perCm2: 127.28,
    skinSub_apc5053: 1875,       // ≤100cm² bundled (estimated)
    skinSub_apc5054: 3753,       // >100cm² bundled (estimated)
  },
  wageIndex: {
    min: 0.60,
    max: 1.85,
    nationalMedian: 1.00,
    memphis: 0.88,
  },
};

const SKIN_SUB_PRODUCTS = [
  { name: "Apligraf", hcpcs: "Q4101", aspPerCm2: 30.42, type: "BLA (351)", exempt: true, mfg: "Organogenesis" },
  { name: "EpiFix", hcpcs: "Q4186", aspPerCm2: 140, type: "361 HCT/P", exempt: false, mfg: "MiMedx" },
  { name: "EpiCord", hcpcs: "Q4187", aspPerCm2: 140, type: "361 HCT/P", exempt: false, mfg: "MiMedx" },
  { name: "Affinity", hcpcs: "Q4159", aspPerCm2: 420.53, type: "361 HCT/P", exempt: false, mfg: "Organogenesis" },
  { name: "NuShield", hcpcs: "Q4160", aspPerCm2: 92.91, type: "361 HCT/P", exempt: false, mfg: "Organogenesis" },
  { name: "Grafix/StravixPL", hcpcs: "Q4133", aspPerCm2: 250, type: "361 HCT/P", exempt: false, mfg: "Smith & Nephew" },
  { name: "Kerecis Omega3", hcpcs: "Q4158", aspPerCm2: 200, type: "510(k)", exempt: false, mfg: "Coloplast" },
  { name: "Artacent", hcpcs: "Q4190", aspPerCm2: 2068, type: "361 HCT/P", exempt: false, mfg: "Tides Medical" },
  { name: "Revita", hcpcs: "Q4180", aspPerCm2: 656, type: "361 HCT/P", exempt: false, mfg: "StimLabs" },
];

// ═══════════════════════════════════════════════════════════════
//  HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

const N = NIGHTINGALE;

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      fontSize: N.fontSize.xl, fontWeight: 700, color: N.text.platinum,
      fontFamily: N.font.primary, textShadow: N.emboss.text,
      letterSpacing: 0.5,
    }}>
      {Icon && <Icon size={22} color={N.cyan.core} />}
      {title}
    </div>
    {subtitle && (
      <div style={{
        fontSize: N.fontSize.sm, color: N.text.pewter, marginTop: 4,
        fontFamily: N.font.primary,
      }}>{subtitle}</div>
    )}
  </div>
);

const Card = ({ children, style, glowBorder }) => (
  <div style={{
    background: N.bg.card,
    border: `1px solid ${glowBorder ? N.cyan.border : N.border.default}`,
    borderRadius: 10,
    padding: 24,
    boxShadow: glowBorder ? N.glow.tight : N.shadow.card,
    ...style,
  }}>{children}</div>
);

const Stat = ({ label, value, sub, color, large }) => (
  <div style={{ textAlign: "center", flex: 1, minWidth: 120 }}>
    <div style={{
      fontSize: large ? N.fontSize["2xl"] : N.fontSize.xl,
      fontWeight: 800, color: color || N.cyan.core,
      fontFamily: N.font.primary, textShadow: N.glow.text,
      letterSpacing: -0.5,
    }}>{value}</div>
    <div style={{
      fontSize: N.fontSize.sm, color: N.text.silver, marginTop: 2,
      fontFamily: N.font.primary, fontWeight: 600,
    }}>{label}</div>
    {sub && <div style={{
      fontSize: N.fontSize.xs, color: N.text.pewter, marginTop: 2,
    }}>{sub}</div>}
  </div>
);

const InputGroup = ({ label, value, onChange, min, max, step, unit, helpText, width }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{
      display: "block", fontSize: N.fontSize.sm, color: N.text.silver,
      fontWeight: 600, marginBottom: 6, fontFamily: N.font.primary,
    }}>{label}</label>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min={min} max={max} step={step || 0.01}
        style={{
          width: width || 120, padding: "10px 14px",
          background: N.bg.input, border: `1px solid ${N.border.default}`,
          borderRadius: 6, color: N.cyan.bright,
          fontSize: N.fontSize.base, fontWeight: 700, fontFamily: N.font.mono,
          outline: "none", textAlign: "right",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = N.cyan.borderGlow;
          e.target.style.boxShadow = N.glow.tight;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = N.border.default;
          e.target.style.boxShadow = "none";
        }}
      />
      {unit && <span style={{
        fontSize: N.fontSize.sm, color: N.text.pewter, fontFamily: N.font.primary,
        fontWeight: 600,
      }}>{unit}</span>}
    </div>
    {helpText && <div style={{
      fontSize: N.fontSize.xs, color: N.text.slate, marginTop: 4,
      fontFamily: N.font.primary,
    }}>{helpText}</div>}
  </div>
);

const Badge = ({ children, color, bg }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    fontSize: N.fontSize.xs, fontWeight: 700, color: color || N.cyan.core,
    background: bg || N.cyan.bg, padding: "3px 10px", borderRadius: 20,
    border: `1px solid ${color ? color + "33" : N.cyan.border}`,
    fontFamily: N.font.primary, letterSpacing: 0.3,
  }}>{children}</span>
);

const ComparisonBar = ({ label, value, maxValue, color, formatFn }) => {
  const pct = Math.min((value / maxValue) * 100, 100);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontSize: N.fontSize.sm, color: N.text.silver, marginBottom: 4,
        fontFamily: N.font.primary, fontWeight: 600,
      }}>
        <span>{label}</span>
        <span style={{ color: color || N.cyan.core, fontFamily: N.font.mono, fontWeight: 700 }}>
          {formatFn ? formatFn(value) : `$${value.toLocaleString()}`}
        </span>
      </div>
      <div style={{
        height: 10, background: N.bg.input, borderRadius: 5,
        overflow: "hidden", border: `1px solid ${N.border.subtle}`,
      }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${color || N.cyan.core}, ${color ? color + "99" : N.cyan.mid})`,
          borderRadius: 5, transition: "width 0.5s ease",
          boxShadow: `0 0 8px ${color || N.cyan.core}44`,
        }} />
      </div>
    </div>
  );
};

const CoverageRow = ({ label, prp, skinSub, prpGood, skinSubGood }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12, padding: "10px 0",
    borderBottom: `1px solid ${N.border.subtle}`,
    fontSize: N.fontSize.sm, fontFamily: N.font.primary,
  }}>
    <div style={{ color: N.text.silver, fontWeight: 600 }}>{label}</div>
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      color: prpGood !== false ? N.status.green.value : N.text.pewter,
    }}>
      {prpGood !== false ? <CheckCircle size={14} /> : <Minus size={14} />}
      {prp}
    </div>
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      color: skinSubGood === true ? N.status.green.value : skinSubGood === false ? N.status.red.value : N.status.amber.value,
    }}>
      {skinSubGood === true ? <CheckCircle size={14} /> : skinSubGood === false ? <XCircle size={14} /> : <AlertTriangle size={14} />}
      {skinSub}
    </div>
  </div>
);

const fmt = (n) => "$" + Math.round(n).toLocaleString();
const fmtDec = (n) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (n) => (n * 100).toFixed(1) + "%";

// ═══════════════════════════════════════════════════════════════
//  MAIN CALCULATOR COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function ActiGraftCalculator() {
  // ─── Sub-tab state ─────────────────────────────────
  const [activeTab, setActiveTab] = useState("reimbursement");

  // ─── Calculator inputs ─────────────────────────────
  const [wageIndex, setWageIndex] = useState(1.00);
  const [paymentYear, setPaymentYear] = useState("cy2025");
  const [siteOfService, setSiteOfService] = useState("hopd"); // 'hopd' or 'office'
  const [woundSizeCm2, setWoundSizeCm2] = useState(10);
  const [prpApplications, setPrpApplications] = useState(20);
  const [skinSubApplications, setSkinSubApplications] = useState(6);
  const [selectedSkinSub, setSelectedSkinSub] = useState("EpiFix");
  const [prpKitCost, setPrpKitCost] = useState(75);
  const [kitsPerDay, setKitsPerDay] = useState(2);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ─── Distributor-specific inputs ──────────────────
  const [actigraftInvoiceCost, setActigraftInvoiceCost] = useState(650);
  const [kitsPerOrder, setKitsPerOrder] = useState(10);
  const [volumeDiscountPct, setVolumeDiscountPct] = useState(15);
  const [skinSubInvoiceCostPerCm2, setSkinSubInvoiceCostPerCm2] = useState(100);

  // ─── Derived calculations ──────────────────────────
  const calc = useMemo(() => {
    const yr = paymentYear === "cy2025" ? CMS_DATA.cy2025 : CMS_DATA.cy2026;

    // Select G0465 rate based on site of service
    let baseG0465;
    if (siteOfService === "office") {
      baseG0465 = yr.g0465_mpfs_nonfacility; // ~$770
    } else {
      // HOPD bundled rate
      baseG0465 = paymentYear === "cy2025" ? yr.g0465_hopd : yr.g0465_hopd_est; // ~$2,108
    }

    // Wage-index adjusted G0465
    const laborPortion = baseG0465 * yr.laborShare * wageIndex;
    const nonLaborPortion = baseG0465 * yr.nonLaborShare;
    const adjustedG0465 = laborPortion + nonLaborPortion;

    // PRP per-wound economics
    const prpTotalReimbursement = adjustedG0465 * prpApplications;
    const prpTotalKitCost = prpKitCost * prpApplications;
    const prpFacilityMargin = prpTotalReimbursement - prpTotalKitCost;
    const prpMarginPct = prpTotalReimbursement > 0 ? prpFacilityMargin / prpTotalReimbursement : 0;

    // PRP weekly/daily throughput economics
    const prpWeeklyKits = kitsPerDay; // 2 kits = ~2 patients per day, but NCD 270.3 = up to 2 kits/day
    const prpWeeklyReimbursement = prpWeeklyKits * adjustedG0465;
    const prpWeeklyKitCost = prpWeeklyKits * prpKitCost;
    const prpWeeklyMargin = prpWeeklyReimbursement - prpWeeklyKitCost;
    const prp20WeekReimbursement = prpWeeklyReimbursement * 20;
    const prp20WeekMargin = prpWeeklyMargin * 20;

    // Skin substitute economics
    const product = SKIN_SUB_PRODUCTS.find((p) => p.name === selectedSkinSub) || SKIN_SUB_PRODUCTS[0];
    const skinSubProductCostPerApp = product.aspPerCm2 * woundSizeCm2;
    const skinSubInvoiceCostPerApp = skinSubInvoiceCostPerCm2 * woundSizeCm2;

    let skinSubReimbPerApp;
    if (siteOfService === "office") {
      // Physician office: Separate product payment (closer to ASP-based rates ~$800 typical)
      // Office reimbursement is typically product cost-based, not bundled
      const officeRate = paymentYear === "cy2025" ? 800 : 850; // Approximate office reimbursement
      skinSubReimbPerApp = Math.min(officeRate, skinSubProductCostPerApp * 1.08); // Closer margin in office
    } else if (paymentYear === "cy2025") {
      // HOPD Bundled: APC 5053 for ≤100cm², APC 5054 for >100cm²
      const bundledBase = woundSizeCm2 <= 100 ? yr.skinSub_apc5053 : yr.skinSub_apc5054;
      // HOPD starts at 80% of bundled rate, adjusted for wage index
      const bundled80Pct = bundledBase * 0.80;
      skinSubReimbPerApp = (bundled80Pct * yr.laborShare * wageIndex) + (bundled80Pct * yr.nonLaborShare);
    } else {
      // CY 2026 HOPD: Separate product payment + application procedure
      const productPayment = yr.skinSub_flatRate_perCm2 * woundSizeCm2;
      const appProcedure = woundSizeCm2 <= 100 ? 800 : 1200; // Approximate application-only APC
      const appProcedureAdj = (appProcedure * yr.laborShare * wageIndex) + (appProcedure * yr.nonLaborShare);
      skinSubReimbPerApp = productPayment + appProcedureAdj;
    }

    const skinSubTotalReimb = skinSubReimbPerApp * skinSubApplications;
    const skinSubTotalProductCost = skinSubProductCostPerApp * skinSubApplications;
    const skinSubFacilityMargin = skinSubTotalReimb - skinSubTotalProductCost;
    const skinSubMarginPct = skinSubTotalReimb > 0 ? skinSubFacilityMargin / skinSubTotalReimb : 0;

    // Distributor profit margins (skin substitute)
    const skinSubDistribInvoiceCost = skinSubInvoiceCostPerApp * skinSubApplications;
    const skinSubDistribProfit = skinSubTotalReimb - skinSubDistribInvoiceCost;
    const skinSubDistribMarginPct = skinSubTotalReimb > 0 ? skinSubDistribProfit / skinSubTotalReimb : 0;

    // Distributor profit margins (ActiGraft)
    const actigraftDiscountedCost = actigraftInvoiceCost * (1 - volumeDiscountPct / 100);
    const actigraftOrderCost = actigraftDiscountedCost * kitsPerOrder;
    const actigraftOrderReimbursement = adjustedG0465 * kitsPerOrder;
    const actigraftDistribProfit = actigraftOrderReimbursement - actigraftOrderCost;
    const actigraftDistribMarginPct = actigraftOrderReimbursement > 0 ? actigraftDistribProfit / actigraftOrderReimbursement : 0;

    // CY 2026 change for selected product
    const newRate2026 = product.exempt ? product.aspPerCm2 * 1.06 : CMS_DATA.cy2026.skinSub_flatRate_perCm2;
    const productChangeDir = product.exempt ? "Exempt (BLA, ASP+6%)" :
      (newRate2026 < product.aspPerCm2 ? "decrease" : "increase");
    const productChangePct = product.exempt ? 0 :
      Math.abs((newRate2026 - product.aspPerCm2) / product.aspPerCm2);

    return {
      adjustedG0465,
      laborPortion,
      nonLaborPortion,
      prpTotalReimbursement,
      prpTotalKitCost,
      prpFacilityMargin,
      prpMarginPct,
      prpWeeklyReimbursement,
      prpWeeklyKitCost,
      prpWeeklyMargin,
      prp20WeekReimbursement,
      prp20WeekMargin,
      skinSubReimbPerApp,
      skinSubTotalReimb,
      skinSubTotalProductCost,
      skinSubFacilityMargin,
      skinSubMarginPct,
      skinSubProductCostPerApp,
      skinSubInvoiceCostPerApp,
      skinSubDistribInvoiceCost,
      skinSubDistribProfit,
      skinSubDistribMarginPct,
      actigraftDiscountedCost,
      actigraftOrderCost,
      actigraftOrderReimbursement,
      actigraftDistribProfit,
      actigraftDistribMarginPct,
      product,
      newRate2026,
      productChangeDir,
      productChangePct,
    };
  }, [wageIndex, paymentYear, siteOfService, woundSizeCm2, prpApplications, skinSubApplications, selectedSkinSub, prpKitCost, kitsPerDay, actigraftInvoiceCost, kitsPerOrder, volumeDiscountPct, skinSubInvoiceCostPerCm2]);

  // ─── Sub-tab definitions ───────────────────────────
  const tabs = [
    { id: "reimbursement", label: "Reimbursement", icon: DollarSign },
    { id: "roi", label: "Facility ROI", icon: TrendingUp },
    { id: "distributor", label: "Distributor Pricing", icon: Scale },
    { id: "coverage", label: "Coverage", icon: Shield },
    { id: "throughput", label: "Throughput", icon: BarChart3 },
  ];

  // ─── Tab button styling (matches PRP.jsx pattern) ──
  const subTabStyle = (isActive) => ({
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "10px 16px", fontSize: N.fontSize.sm, fontWeight: isActive ? 700 : 600,
    color: isActive ? N.cyan.bright : N.text.pewter,
    background: isActive ? N.cyan.bgActive : "transparent",
    border: "none",
    borderBottom: isActive ? `2px solid ${N.cyan.core}` : "2px solid transparent",
    cursor: "pointer", fontFamily: N.font.primary,
    borderRadius: "6px 6px 0 0", transition: "all 0.2s ease",
    textShadow: isActive ? N.glow.text : "none",
    letterSpacing: 0.3,
  });

  // ═══════════════════════════════════════════════════
  //  SHARED INPUTS PANEL (visible in all tabs)
  // ═══════════════════════════════════════════════════

  const InputPanel = () => (
    <Card style={{ marginBottom: 24 }} glowBorder>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
        fontSize: N.fontSize.lg, fontWeight: 700, color: N.cyan.core,
        fontFamily: N.font.primary,
      }}>
        <Calculator size={20} />
        Calculator Inputs
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20,
      }}>
        {/* Wage Index */}
        <div>
          <InputGroup
            label="OPPS Wage Index (WI)"
            value={wageIndex}
            onChange={(v) => setWageIndex(Math.max(0.60, Math.min(1.85, v)))}
            min={0.60} max={1.85} step={0.01}
            helpText={`Range: 0.60 – 1.85 | National neutral: 1.00`}
          />
          <div style={{
            display: "flex", gap: 6, flexWrap: "wrap", marginTop: -8,
          }}>
            {[
              { label: "Low (PR)", val: 0.60 },
              { label: "Memphis", val: 0.88 },
              { label: "National", val: 1.00 },
              { label: "NYC", val: 1.42 },
              { label: "SF Bay", val: 1.85 },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => setWageIndex(p.val)}
                style={{
                  padding: "3px 8px", fontSize: 11, borderRadius: 4,
                  border: `1px solid ${wageIndex === p.val ? N.cyan.borderGlow : N.border.subtle}`,
                  background: wageIndex === p.val ? N.cyan.bgActive : N.bg.input,
                  color: wageIndex === p.val ? N.cyan.bright : N.text.slate,
                  cursor: "pointer", fontFamily: N.font.primary, fontWeight: 600,
                }}
              >{p.label} ({p.val})</button>
            ))}
          </div>
        </div>

        {/* Payment Year */}
        <div>
          <label style={{
            display: "block", fontSize: N.fontSize.sm, color: N.text.silver,
            fontWeight: 600, marginBottom: 6, fontFamily: N.font.primary,
          }}>Payment Year</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["cy2025", "cy2026"].map((yr) => (
              <button
                key={yr}
                onClick={() => setPaymentYear(yr)}
                style={{
                  flex: 1, padding: "10px 16px", borderRadius: 6,
                  border: `1px solid ${paymentYear === yr ? N.cyan.borderGlow : N.border.default}`,
                  background: paymentYear === yr ? N.cyan.bgActive : N.bg.input,
                  color: paymentYear === yr ? N.cyan.bright : N.text.pewter,
                  fontSize: N.fontSize.base, fontWeight: 700, cursor: "pointer",
                  fontFamily: N.font.primary,
                  boxShadow: paymentYear === yr ? N.glow.tight : "none",
                }}
              >{yr === "cy2025" ? "CY 2025" : "CY 2026"}</button>
            ))}
          </div>
          <div style={{
            fontSize: N.fontSize.xs, color: N.text.slate, marginTop: 6,
          }}>
            Conversion factor: ${paymentYear === "cy2025" ? "89.169" : "91.415"}
          </div>
        </div>

        {/* Site of Service */}
        <div>
          <label style={{
            display: "block", fontSize: N.fontSize.sm, color: N.text.silver,
            fontWeight: 600, marginBottom: 6, fontFamily: N.font.primary,
          }}>Site of Service</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { value: "hopd", label: "HOPD" },
              { value: "office", label: "Physician Office" }
            ].map((site) => (
              <button
                key={site.value}
                onClick={() => setSiteOfService(site.value)}
                style={{
                  flex: 1, padding: "10px 16px", borderRadius: 6,
                  border: `1px solid ${siteOfService === site.value ? N.cyan.borderGlow : N.border.default}`,
                  background: siteOfService === site.value ? N.cyan.bgActive : N.bg.input,
                  color: siteOfService === site.value ? N.cyan.bright : N.text.pewter,
                  fontSize: N.fontSize.base, fontWeight: 700, cursor: "pointer",
                  fontFamily: N.font.primary,
                  boxShadow: siteOfService === site.value ? N.glow.tight : "none",
                }}
              >{site.label}</button>
            ))}
          </div>
          <div style={{
            fontSize: N.fontSize.xs, color: N.text.slate, marginTop: 6,
          }}>
            {siteOfService === "hopd"
              ? "Bundled rate environment (~$1,800 PRP reimbursement)"
              : "Separate product payment (~$800 PRP reimbursement)"}
          </div>
        </div>

        {/* Wound Size */}
        <InputGroup
          label="Wound Size"
          value={woundSizeCm2}
          onChange={(v) => setWoundSizeCm2(Math.max(1, Math.min(200, v)))}
          min={1} max={200} step={1} unit="cm²"
          helpText="Typical DFU: 5–25 cm²"
        />

        {/* PRP Applications */}
        <InputGroup
          label="PRP Applications (per wound)"
          value={prpApplications}
          onChange={(v) => setPrpApplications(Math.max(1, Math.min(40, v)))}
          min={1} max={40} step={1} unit="treatments"
          helpText="NCD 270.3: up to 20 consecutive weeks"
        />

        {/* Skin Sub Applications */}
        <InputGroup
          label="Skin Sub Applications (per wound)"
          value={skinSubApplications}
          onChange={(v) => setSkinSubApplications(Math.max(1, Math.min(16, v)))}
          min={1} max={16} step={1} unit="applications"
          helpText="LCD guidance: 4–8 max per episode"
        />

        {/* Skin Sub Product Select */}
        <div>
          <label style={{
            display: "block", fontSize: N.fontSize.sm, color: N.text.silver,
            fontWeight: 600, marginBottom: 6, fontFamily: N.font.primary,
          }}>Competitor Product</label>
          <select
            value={selectedSkinSub}
            onChange={(e) => setSelectedSkinSub(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px",
              background: N.bg.input, border: `1px solid ${N.border.default}`,
              borderRadius: 6, color: N.cyan.bright,
              fontSize: N.fontSize.base, fontFamily: N.font.primary,
              fontWeight: 600, outline: "none", cursor: "pointer",
            }}
          >
            {SKIN_SUB_PRODUCTS.map((p) => (
              <option key={p.name} value={p.name} style={{ background: N.bg.card }}>
                {p.name} — ${p.aspPerCm2}/cm² ({p.mfg})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        style={{
          display: "flex", alignItems: "center", gap: 6, marginTop: 16,
          background: "transparent", border: "none", color: N.text.slate,
          fontSize: N.fontSize.sm, cursor: "pointer", fontFamily: N.font.primary,
          fontWeight: 600,
        }}
      >
        {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        Advanced Settings
      </button>

      {showAdvanced && (
        <div>
          {/* Facility Economics */}
          <div style={{
            fontSize: N.fontSize.sm, fontWeight: 700, color: N.text.silver,
            marginTop: 12, marginBottom: 8, fontFamily: N.font.primary,
          }}>Facility Economics</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20, paddingBottom: 12,
            borderBottom: `1px solid ${N.border.subtle}`,
          }}>
            <InputGroup
              label="PRP Kit Cost (facility)"
              value={prpKitCost}
              onChange={(v) => setPrpKitCost(Math.max(0, Math.min(500, v)))}
              min={0} max={500} step={5} unit="per kit"
              helpText="Typical: $50–$150 per ActiGraft kit"
            />
            <InputGroup
              label="Kits Per Day (throughput)"
              value={kitsPerDay}
              onChange={(v) => setKitsPerDay(Math.max(1, Math.min(10, v)))}
              min={1} max={10} step={1} unit="kits/day"
              helpText="NCD 270.3: up to 2 kits per day"
            />
          </div>

          {/* Distributor Pricing */}
          <div style={{
            fontSize: N.fontSize.sm, fontWeight: 700, color: N.cyan.core,
            marginTop: 16, marginBottom: 8, fontFamily: N.font.primary,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <DollarSign size={14} />
            Distributor Pricing & Volume Discounts
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}>
            <InputGroup
              label="ActiGraft Invoice Cost"
              value={actigraftInvoiceCost}
              onChange={(v) => setActigraftInvoiceCost(Math.max(0, Math.min(2000, v)))}
              min={0} max={2000} step={10} unit="per kit"
              helpText="Distributor cost before discount"
            />
            <InputGroup
              label="Kits Per Order (volume)"
              value={kitsPerOrder}
              onChange={(v) => setKitsPerOrder(Math.max(1, Math.min(100, v)))}
              min={1} max={100} step={1} unit="kits"
              helpText="Wholesale order quantity"
            />
            <InputGroup
              label="Volume Discount Rate"
              value={volumeDiscountPct}
              onChange={(v) => setVolumeDiscountPct(Math.max(0, Math.min(50, v)))}
              min={0} max={50} step={0.5} unit="%"
              helpText="Discount varies by volume & quarter"
            />
            <InputGroup
              label="Skin Sub Invoice Cost"
              value={skinSubInvoiceCostPerCm2}
              onChange={(v) => setSkinSubInvoiceCostPerCm2(Math.max(0, Math.min(500, v)))}
              min={0} max={500} step={5} unit="per cm²"
              helpText="Distributor cost per square cm"
            />
          </div>

          {/* Distributor Profit Summary */}
          <div style={{
            marginTop: 16, padding: "14px 18px",
            background: N.bg.panel, borderRadius: 8,
            border: `1px solid ${N.cyan.border}`,
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
              fontSize: N.fontSize.sm, fontFamily: N.font.primary,
            }}>
              <div>
                <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs, marginBottom: 4 }}>
                  ActiGraft Cost After {volumeDiscountPct}% Discount
                </div>
                <div style={{ color: N.cyan.bright, fontFamily: N.font.mono, fontWeight: 700, fontSize: N.fontSize.base }}>
                  {fmtDec(calc.actigraftDiscountedCost)} per kit
                </div>
              </div>
              <div>
                <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs, marginBottom: 4 }}>
                  Distributor Profit ({kitsPerOrder} kits)
                </div>
                <div style={{
                  color: calc.actigraftDistribProfit >= 0 ? N.status.green.value : N.status.red.value,
                  fontFamily: N.font.mono, fontWeight: 700, fontSize: N.fontSize.base,
                }}>
                  {fmt(calc.actigraftDistribProfit)} ({pct(calc.actigraftDistribMarginPct)})
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );

  // ═══════════════════════════════════════════════════
  //  TAB 1 — REIMBURSEMENT COMPARISON
  // ═══════════════════════════════════════════════════

  const ReimbursementTab = () => (
    <div>
      {/* WI-Adjusted Payment Breakdown */}
      <Card style={{ marginBottom: 20 }}>
        <SectionHeader
          icon={DollarSign}
          title="Wage-Index Adjusted Reimbursement"
          subtitle={`OPPS formula: (National Rate × 60% × WI) + (National Rate × 40%) | Your WI: ${wageIndex.toFixed(2)}`}
        />
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 24,
          marginTop: 16,
        }}>
          {/* PRP Column */}
          <div>
            <div style={{
              fontSize: N.fontSize.lg, fontWeight: 700, color: N.cyan.core,
              marginBottom: 12, fontFamily: N.font.primary,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Heart size={18} /> PRP (G0465) — ActiGraft
            </div>
            <div style={{
              background: N.bg.panel, borderRadius: 8, padding: 16,
              border: `1px solid ${N.cyan.border}`,
            }}>
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: N.text.pewter, fontSize: N.fontSize.sm }}>
                  {siteOfService === "hopd" ? "National base rate (HOPD):" : "Office rate (MPFS):"}
                </span>
                <span style={{ color: N.text.silver, fontFamily: N.font.mono, fontWeight: 700, marginLeft: 8 }}>
                  {siteOfService === "hopd"
                    ? fmtDec(paymentYear === "cy2025" ? CMS_DATA.cy2025.g0465_hopd : CMS_DATA.cy2026.g0465_hopd_est)
                    : fmtDec(paymentYear === "cy2025" ? CMS_DATA.cy2025.g0465_mpfs_nonfacility : CMS_DATA.cy2026.g0465_mpfs_nonfacility)}
                </span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: N.text.pewter, fontSize: N.fontSize.sm }}>Labor portion (60% × {wageIndex.toFixed(2)}):</span>
                <span style={{ color: N.text.silver, fontFamily: N.font.mono, fontWeight: 700, marginLeft: 8 }}>
                  {fmtDec(calc.laborPortion)}
                </span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: N.text.pewter, fontSize: N.fontSize.sm }}>Non-labor portion (40%):</span>
                <span style={{ color: N.text.silver, fontFamily: N.font.mono, fontWeight: 700, marginLeft: 8 }}>
                  {fmtDec(calc.nonLaborPortion)}
                </span>
              </div>
              <div style={{
                borderTop: `1px solid ${N.cyan.border}`, paddingTop: 12,
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
              }}>
                <span style={{ color: N.text.silver, fontWeight: 700, fontSize: N.fontSize.base }}>WI-Adjusted Payment:</span>
                <span style={{
                  color: N.cyan.core, fontFamily: N.font.mono,
                  fontSize: N.fontSize["2xl"], fontWeight: 800,
                  textShadow: N.glow.text,
                }}>{fmtDec(calc.adjustedG0465)}</span>
              </div>
            </div>
            <div style={{
              marginTop: 12, fontSize: N.fontSize.xs, color: N.text.slate,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <Info size={12} /> Includes phlebotomy, centrifugation, preparation, administration, dressings
            </div>
          </div>

          {/* Divider */}
          <div style={{ background: N.border.subtle }} />

          {/* Skin Sub Column */}
          <div>
            <div style={{
              fontSize: N.fontSize.lg, fontWeight: 700, color: N.status.amber.value,
              marginBottom: 12, fontFamily: N.font.primary,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Activity size={18} /> {calc.product.name} — Skin Substitute
            </div>
            <div style={{
              background: N.bg.panel, borderRadius: 8, padding: 16,
              border: `1px solid ${N.status.amber.border}`,
            }}>
              {paymentYear === "cy2025" ? (
                <>
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ color: N.text.pewter, fontSize: N.fontSize.sm }}>Bundled APC rate (≤100 cm²):</span>
                    <span style={{ color: N.text.silver, fontFamily: N.font.mono, fontWeight: 700, marginLeft: 8 }}>
                      {fmt(CMS_DATA.cy2025.skinSub_apc5053)}
                    </span>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ color: N.text.pewter, fontSize: N.fontSize.sm }}>WI-adjusted per application:</span>
                    <span style={{ color: N.text.silver, fontFamily: N.font.mono, fontWeight: 700, marginLeft: 8 }}>
                      {fmtDec(calc.skinSubReimbPerApp)}
                    </span>
                  </div>
                  <div style={{
                    fontSize: N.fontSize.xs, color: N.status.amber.value, marginBottom: 12,
                    padding: "6px 10px", background: N.status.amber.bg, borderRadius: 4,
                  }}>
                    Product cost bundled into APC — facility absorbs product acquisition
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ color: N.text.pewter, fontSize: N.fontSize.sm }}>Product: $127.28/cm² × {woundSizeCm2} cm²:</span>
                    <span style={{ color: N.text.silver, fontFamily: N.font.mono, fontWeight: 700, marginLeft: 8 }}>
                      {fmtDec(CMS_DATA.cy2026.skinSub_flatRate_perCm2 * woundSizeCm2)}
                    </span>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <span style={{ color: N.text.pewter, fontSize: N.fontSize.sm }}>Application + product (WI-adj):</span>
                    <span style={{ color: N.text.silver, fontFamily: N.font.mono, fontWeight: 700, marginLeft: 8 }}>
                      {fmtDec(calc.skinSubReimbPerApp)}
                    </span>
                  </div>
                  <div style={{
                    fontSize: N.fontSize.xs, color: N.status.red.value, marginBottom: 12,
                    padding: "6px 10px", background: N.status.red.bg, borderRadius: 4,
                  }}>
                    CY 2026: Products unpackaged — flat $127.28/cm² regardless of product ASP
                  </div>
                </>
              )}
              <div style={{
                borderTop: `1px solid ${N.status.amber.border}`, paddingTop: 12,
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
              }}>
                <span style={{ color: N.text.silver, fontWeight: 700, fontSize: N.fontSize.base }}>WI-Adjusted Payment:</span>
                <span style={{
                  color: N.status.amber.value, fontFamily: N.font.mono,
                  fontSize: N.fontSize["2xl"], fontWeight: 800,
                }}>{fmtDec(calc.skinSubReimbPerApp)}</span>
              </div>
            </div>
            <div style={{
              marginTop: 12, fontSize: N.fontSize.xs, color: N.text.slate,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <AlertTriangle size={12} color={N.status.amber.value} />
              {calc.product.name}: Pre-2026 ASP ${calc.product.aspPerCm2}/cm² →
              {calc.product.exempt ? " BLA-exempt (ASP+6% continues)" :
                ` flat $127.28/cm² (${calc.productChangeDir === "decrease" ? "-" : "+"}${(calc.productChangePct * 100).toFixed(0)}%)`}
            </div>
          </div>
        </div>

        {/* Per-treatment visual comparison */}
        <div style={{ marginTop: 24 }}>
          <div style={{
            fontSize: N.fontSize.base, fontWeight: 700, color: N.text.silver,
            marginBottom: 12, fontFamily: N.font.primary,
          }}>Per-Treatment Reimbursement Comparison</div>
          <ComparisonBar
            label="PRP (G0465) — per treatment"
            value={calc.adjustedG0465}
            maxValue={Math.max(calc.adjustedG0465, calc.skinSubReimbPerApp) * 1.1}
            color={N.cyan.core}
          />
          <ComparisonBar
            label={`${calc.product.name} — per application`}
            value={calc.skinSubReimbPerApp}
            maxValue={Math.max(calc.adjustedG0465, calc.skinSubReimbPerApp) * 1.1}
            color={N.status.amber.value}
          />
        </div>
      </Card>

      {/* CY 2026 Impact Card */}
      {paymentYear === "cy2026" && (
        <Card style={{ marginBottom: 20 }}>
          <SectionHeader
            icon={AlertTriangle}
            title="CY 2026 Skin Substitute Payment Reform"
            subtitle="CMS reclassified skin substitutes as incident-to supplies — 90% aggregate spending reduction"
          />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16, marginTop: 12,
          }}>
            {SKIN_SUB_PRODUCTS.filter(p => !p.exempt).slice(0, 6).map((p) => {
              const change = ((CMS_DATA.cy2026.skinSub_flatRate_perCm2 - p.aspPerCm2) / p.aspPerCm2) * 100;
              const isIncrease = change > 0;
              return (
                <div key={p.name} style={{
                  background: N.bg.panel, borderRadius: 8, padding: 14,
                  border: `1px solid ${N.border.subtle}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: N.text.silver, fontWeight: 700, fontSize: N.fontSize.sm }}>{p.name}</span>
                    <Badge color={isIncrease ? N.status.green.value : N.status.red.value}
                           bg={isIncrease ? N.status.green.bg : N.status.red.bg}>
                      {isIncrease ? "+" : ""}{change.toFixed(0)}%
                    </Badge>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: N.fontSize.xs, color: N.text.pewter }}>
                    <span>Pre-2026: ${p.aspPerCm2}/cm²</span>
                    <span>→ $127.28/cm²</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{
            marginTop: 16, padding: "12px 16px",
            background: N.cyan.bg, border: `1px solid ${N.cyan.border}`,
            borderRadius: 8, fontSize: N.fontSize.sm, color: N.text.silver,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Shield size={16} color={N.cyan.core} />
            <strong style={{ color: N.cyan.core }}>PRP (G0465) is unaffected</strong> — governed by NCD 270.3, not subject to skin substitute reclassification
          </div>
        </Card>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════
  //  TAB 2 — FACILITY ROI
  // ═══════════════════════════════════════════════════

  const ROITab = () => {
    const maxMargin = Math.max(Math.abs(calc.prpFacilityMargin), Math.abs(calc.skinSubFacilityMargin));
    return (
      <div>
        {/* Hero stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
          marginBottom: 24,
        }}>
          <Card glowBorder>
            <div style={{
              textAlign: "center", marginBottom: 12,
              fontSize: N.fontSize.base, color: N.text.silver, fontWeight: 700,
              fontFamily: N.font.primary,
            }}>
              <Heart size={16} style={{ verticalAlign: "middle", marginRight: 6 }} color={N.cyan.core} />
              PRP — Per Wound Margin
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
              <Stat label="Total Reimbursement" value={fmt(calc.prpTotalReimbursement)} sub={`${prpApplications} treatments × ${fmtDec(calc.adjustedG0465)}`} />
              <Stat label="Kit Cost" value={fmt(calc.prpTotalKitCost)} sub={`${prpApplications} × $${prpKitCost}`} color={N.text.pewter} />
              <Stat label="Facility Margin" value={fmt(calc.prpFacilityMargin)}
                    sub={pct(calc.prpMarginPct) + " margin"}
                    color={calc.prpFacilityMargin >= 0 ? N.status.green.value : N.status.red.value} large />
            </div>
          </Card>

          <Card>
            <div style={{
              textAlign: "center", marginBottom: 12,
              fontSize: N.fontSize.base, color: N.text.silver, fontWeight: 700,
              fontFamily: N.font.primary,
            }}>
              <Activity size={16} style={{ verticalAlign: "middle", marginRight: 6 }} color={N.status.amber.value} />
              {calc.product.name} — Per Wound Margin
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
              <Stat label="Total Reimbursement" value={fmt(calc.skinSubTotalReimb)} sub={`${skinSubApplications} apps × ${fmtDec(calc.skinSubReimbPerApp)}`} color={N.status.amber.value} />
              <Stat label="Product Cost" value={fmt(calc.skinSubTotalProductCost)}
                    sub={`${skinSubApplications} × ${fmtDec(calc.skinSubProductCostPerApp)}`}
                    color={N.status.red.value} />
              <Stat label="Facility Margin" value={fmt(calc.skinSubFacilityMargin)}
                    sub={pct(calc.skinSubMarginPct) + " margin"}
                    color={calc.skinSubFacilityMargin >= 0 ? N.status.green.value : N.status.red.value} large />
            </div>
          </Card>
        </div>

        {/* Margin Comparison Bars */}
        <Card style={{ marginBottom: 20 }}>
          <SectionHeader
            icon={TrendingUp}
            title="Facility Margin — Head to Head"
            subtitle="Total reimbursement minus facility product acquisition cost per wound episode"
          />
          <div style={{ marginTop: 16 }}>
            <ComparisonBar
              label={`PRP (ActiGraft) — ${prpApplications} treatments`}
              value={Math.max(0, calc.prpFacilityMargin)}
              maxValue={maxMargin * 1.1}
              color={N.status.green.value}
            />
            <ComparisonBar
              label={`${calc.product.name} — ${skinSubApplications} applications`}
              value={Math.max(0, calc.skinSubFacilityMargin)}
              maxValue={maxMargin * 1.1}
              color={calc.skinSubFacilityMargin >= 0 ? N.status.amber.value : N.status.red.value}
            />
          </div>

          {calc.skinSubFacilityMargin < 0 && (
            <div style={{
              marginTop: 16, padding: "12px 16px",
              background: N.status.red.bg, border: `1px solid ${N.status.red.border}`,
              borderRadius: 8, fontSize: N.fontSize.sm, color: N.status.red.value,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <AlertTriangle size={16} />
              <strong>Negative margin:</strong> {calc.product.name} product cost ({fmtDec(calc.skinSubTotalProductCost)}) exceeds reimbursement ({fmtDec(calc.skinSubTotalReimb)}) — facility loses {fmt(Math.abs(calc.skinSubFacilityMargin))} per wound
            </div>
          )}

          {/* Margin delta */}
          <div style={{
            marginTop: 20, textAlign: "center", padding: "16px 24px",
            background: calc.prpFacilityMargin > calc.skinSubFacilityMargin ? N.cyan.bg : N.status.amber.bg,
            border: `1px solid ${calc.prpFacilityMargin > calc.skinSubFacilityMargin ? N.cyan.border : N.status.amber.border}`,
            borderRadius: 10,
          }}>
            <div style={{ fontSize: N.fontSize.sm, color: N.text.pewter, marginBottom: 4 }}>
              PRP Margin Advantage Per Wound
            </div>
            <div style={{
              fontSize: N.fontSize["3xl"], fontWeight: 800,
              color: calc.prpFacilityMargin > calc.skinSubFacilityMargin ? N.cyan.core : N.status.red.value,
              fontFamily: N.font.mono, textShadow: N.glow.text,
            }}>
              {calc.prpFacilityMargin > calc.skinSubFacilityMargin ? "+" : ""}{fmt(calc.prpFacilityMargin - calc.skinSubFacilityMargin)}
            </div>
          </div>
        </Card>

        {/* 5-Year Modeled Cost (Dougherty 2008) */}
        <Card>
          <SectionHeader
            icon={FileText}
            title="Published Cost-Effectiveness Evidence"
            subtitle="Dougherty 2008 — 200,000 patients, 5-year model (Wound Repair and Regeneration)"
          />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 16,
          }}>
            <div style={{
              background: N.cyan.bg, border: `1px solid ${N.cyan.border}`,
              borderRadius: 10, padding: 20, textAlign: "center",
            }}>
              <div style={{ fontSize: N.fontSize.xs, color: N.text.pewter, marginBottom: 4 }}>PRP Gel</div>
              <div style={{ fontSize: N.fontSize["2xl"], fontWeight: 800, color: N.cyan.core, fontFamily: N.font.mono }}>$15,159</div>
              <div style={{ fontSize: N.fontSize.sm, color: N.text.silver, marginTop: 4 }}>2.87 QALYs</div>
              <Badge color={N.status.green.value} bg={N.status.green.bg}>Lowest Cost</Badge>
            </div>
            <div style={{
              background: N.status.amber.bg, border: `1px solid ${N.status.amber.border}`,
              borderRadius: 10, padding: 20, textAlign: "center",
            }}>
              <div style={{ fontSize: N.fontSize.xs, color: N.text.pewter, marginBottom: 4 }}>Bilayer Skin Sub</div>
              <div style={{ fontSize: N.fontSize["2xl"], fontWeight: 800, color: N.status.amber.value, fontFamily: N.font.mono }}>$24,374</div>
              <div style={{ fontSize: N.fontSize.sm, color: N.text.silver, marginTop: 4 }}>2.79 QALYs</div>
              <Badge color={N.status.amber.value} bg={N.status.amber.bg}>+61% Cost</Badge>
            </div>
            <div style={{
              background: N.status.red.bg, border: `1px solid ${N.status.red.border}`,
              borderRadius: 10, padding: 20, textAlign: "center",
            }}>
              <div style={{ fontSize: N.fontSize.xs, color: N.text.pewter, marginBottom: 4 }}>Standard of Care</div>
              <div style={{ fontSize: N.fontSize["2xl"], fontWeight: 800, color: N.status.red.value, fontFamily: N.font.mono }}>$40,073</div>
              <div style={{ fontSize: N.fontSize.sm, color: N.text.silver, marginTop: 4 }}>2.65 QALYs</div>
              <Badge color={N.status.red.value} bg={N.status.red.bg}>+164% Cost</Badge>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════
  //  TAB 3 — DISTRIBUTOR PRICING
  // ═══════════════════════════════════════════════════

  const DistributorTab = () => {
    // Calculate max profitable size for skin sub in HOPD (80% bundle rule)
    const yr = paymentYear === "cy2025" ? CMS_DATA.cy2025 : CMS_DATA.cy2026;
    const bundledBase = yr.skinSub_apc5053 || 1829;
    const hopdReimb80Pct = bundledBase * 0.80;
    const hopdReimbAdj = (hopdReimb80Pct * yr.laborShare * wageIndex) + (hopdReimb80Pct * yr.nonLaborShare);
    const maxProfitableSize = Math.floor(hopdReimbAdj / skinSubInvoiceCostPerCm2);

    return (
      <div>
        {/* Hero Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
          marginBottom: 24,
        }}>
          <Card glowBorder>
            <div style={{
              textAlign: "center", marginBottom: 12,
              fontSize: N.fontSize.base, color: N.text.silver, fontWeight: 700,
              fontFamily: N.font.primary,
            }}>
              <Heart size={16} style={{ verticalAlign: "middle", marginRight: 6 }} color={N.cyan.core} />
              ActiGraft Distributor Profit (Per Order)
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
              <Stat label="Order Revenue" value={fmt(calc.actigraftOrderReimbursement)}
                    sub={`${kitsPerOrder} kits × ${fmtDec(calc.adjustedG0465)}`} />
              <Stat label="Invoice Cost" value={fmt(calc.actigraftOrderCost)}
                    sub={`${fmtDec(calc.actigraftDiscountedCost)}/kit after ${volumeDiscountPct}% discount`}
                    color={N.text.pewter} />
              <Stat label="Distributor Profit" value={fmt(calc.actigraftDistribProfit)}
                    sub={pct(calc.actigraftDistribMarginPct) + " margin"}
                    color={calc.actigraftDistribProfit >= 0 ? N.status.green.value : N.status.red.value} large />
            </div>
          </Card>

          <Card>
            <div style={{
              textAlign: "center", marginBottom: 12,
              fontSize: N.fontSize.base, color: N.text.silver, fontWeight: 700,
              fontFamily: N.font.primary,
            }}>
              <Activity size={16} style={{ verticalAlign: "middle", marginRight: 6 }} color={N.status.amber.value} />
              Skin Sub Distributor Profit (Per Wound)
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
              <Stat label="Total Reimbursement" value={fmt(calc.skinSubTotalReimb)}
                    sub={`${skinSubApplications} apps × ${fmtDec(calc.skinSubReimbPerApp)}`}
                    color={N.status.amber.value} />
              <Stat label="Invoice Cost" value={fmt(calc.skinSubDistribInvoiceCost)}
                    sub={`${fmtDec(calc.skinSubInvoiceCostPerApp)}/app (${skinSubInvoiceCostPerCm2}/cm²)`}
                    color={N.status.red.value} />
              <Stat label="Distributor Profit" value={fmt(calc.skinSubDistribProfit)}
                    sub={pct(calc.skinSubDistribMarginPct) + " margin"}
                    color={calc.skinSubDistribProfit >= 0 ? N.status.green.value : N.status.red.value} large />
            </div>
          </Card>
        </div>

        {/* HOPD 80% Bundle Rate Explanation */}
        <Card style={{ marginBottom: 20 }}>
          <SectionHeader
            icon={Building2}
            title="HOPD Skin Substitute Reimbursement Model"
            subtitle="80% of bundled rate adjusted for local wage index — largest profitable size constraint"
          />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16, marginTop: 12,
          }}>
            <div style={{
              background: N.bg.panel, borderRadius: 8, padding: 16,
              border: `1px solid ${N.border.subtle}`,
            }}>
              <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs, marginBottom: 6 }}>
                Bundle Base Rate (APC 5053)
              </div>
              <div style={{ color: N.text.silver, fontFamily: N.font.mono, fontWeight: 700, fontSize: N.fontSize.xl }}>
                {fmt(bundledBase)}
              </div>
            </div>
            <div style={{
              background: N.bg.panel, borderRadius: 8, padding: 16,
              border: `1px solid ${N.cyan.border}`,
            }}>
              <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs, marginBottom: 6 }}>
                80% Bundle (WI: {wageIndex.toFixed(2)})
              </div>
              <div style={{ color: N.cyan.bright, fontFamily: N.font.mono, fontWeight: 700, fontSize: N.fontSize.xl }}>
                {fmtDec(hopdReimbAdj)}
              </div>
            </div>
            <div style={{
              background: N.bg.panel, borderRadius: 8, padding: 16,
              border: `1px solid ${N.status.amber.border}`,
            }}>
              <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs, marginBottom: 6 }}>
                Invoice Cost per cm²
              </div>
              <div style={{ color: N.status.amber.value, fontFamily: N.font.mono, fontWeight: 700, fontSize: N.fontSize.xl }}>
                {fmtDec(skinSubInvoiceCostPerCm2)}
              </div>
            </div>
            <div style={{
              background: N.status.green.bg, borderRadius: 8, padding: 16,
              border: `1px solid ${N.status.green.border}`,
            }}>
              <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs, marginBottom: 6 }}>
                Max Profitable Size (2025)
              </div>
              <div style={{ color: N.status.green.value, fontFamily: N.font.mono, fontWeight: 700, fontSize: N.fontSize.xl }}>
                ~{maxProfitableSize} cm²
              </div>
              <div style={{ color: N.text.slate, fontSize: N.fontSize.xs, marginTop: 4 }}>
                Larger sizes lose money
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 16, padding: "12px 16px",
            background: N.cyan.bg, border: `1px solid ${N.cyan.border}`,
            borderRadius: 8, fontSize: N.fontSize.sm, color: N.text.silver,
          }}>
            <strong style={{ color: N.cyan.core }}>Formula:</strong> HOPD Reimbursement =
            (Bundle Rate × 80% × 60% × WI) + (Bundle Rate × 80% × 40%)
            <br />
            Profit = Reimbursement − (Invoice Cost/cm² × Size in cm²)
          </div>
        </Card>

        {/* Volume Discount Tiers */}
        <Card style={{ marginBottom: 20 }}>
          <SectionHeader
            icon={TrendingUp}
            title="ActiGraft Volume Discount Analysis"
            subtitle="Wholesale pricing tiers — higher volume = lower cost per kit"
          />
          <div style={{ marginTop: 12 }}>
            {[
              { kits: 5, discount: 10 },
              { kits: 10, discount: 15 },
              { kits: 25, discount: 20 },
              { kits: 50, discount: 25 },
              { kits: 100, discount: 30 },
            ].map((tier) => {
              const discountedCost = actigraftInvoiceCost * (1 - tier.discount / 100);
              const orderCost = discountedCost * tier.kits;
              const orderReimb = calc.adjustedG0465 * tier.kits;
              const profit = orderReimb - orderCost;
              const marginPct = orderReimb > 0 ? profit / orderReimb : 0;

              return (
                <div key={tier.kits} style={{
                  display: "grid", gridTemplateColumns: "100px 1fr 120px 120px 120px",
                  gap: 16, padding: "12px 16px",
                  borderBottom: `1px solid ${N.border.subtle}`,
                  background: tier.kits === kitsPerOrder ? N.cyan.bg : "transparent",
                  borderRadius: 6,
                }}>
                  <div>
                    <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs }}>Volume</div>
                    <div style={{ color: N.text.silver, fontWeight: 700, fontSize: N.fontSize.base }}>
                      {tier.kits} kits
                    </div>
                  </div>
                  <div>
                    <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs }}>Discount</div>
                    <div style={{ color: N.cyan.core, fontWeight: 700, fontSize: N.fontSize.base }}>
                      {tier.discount}% off → {fmtDec(discountedCost)}/kit
                    </div>
                  </div>
                  <div>
                    <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs }}>Order Cost</div>
                    <div style={{ color: N.text.silver, fontFamily: N.font.mono, fontWeight: 700, fontSize: N.fontSize.sm }}>
                      {fmt(orderCost)}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs }}>Revenue</div>
                    <div style={{ color: N.cyan.bright, fontFamily: N.font.mono, fontWeight: 700, fontSize: N.fontSize.sm }}>
                      {fmt(orderReimb)}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs }}>Profit</div>
                    <div style={{
                      color: profit >= 0 ? N.status.green.value : N.status.red.value,
                      fontFamily: N.font.mono, fontWeight: 700, fontSize: N.fontSize.sm,
                    }}>
                      {fmt(profit)}
                      <span style={{ fontSize: N.fontSize.xs, marginLeft: 4 }}>({pct(marginPct)})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Profit Comparison */}
        <Card>
          <SectionHeader
            icon={Scale}
            title="Distributor Profit Comparison"
            subtitle="ActiGraft vs. Skin Substitute per wound episode"
          />
          <div style={{ marginTop: 16 }}>
            <ComparisonBar
              label={`ActiGraft — ${kitsPerOrder} kit order`}
              value={Math.max(0, calc.actigraftDistribProfit)}
              maxValue={Math.max(Math.abs(calc.actigraftDistribProfit), Math.abs(calc.skinSubDistribProfit)) * 1.2}
              color={N.status.green.value}
            />
            <ComparisonBar
              label={`${calc.product.name} — ${skinSubApplications} applications`}
              value={Math.max(0, calc.skinSubDistribProfit)}
              maxValue={Math.max(Math.abs(calc.actigraftDistribProfit), Math.abs(calc.skinSubDistribProfit)) * 1.2}
              color={calc.skinSubDistribProfit >= 0 ? N.status.amber.value : N.status.red.value}
            />
          </div>

          {calc.skinSubDistribProfit < 0 && (
            <div style={{
              marginTop: 16, padding: "12px 16px",
              background: N.status.red.bg, border: `1px solid ${N.status.red.border}`,
              borderRadius: 8, fontSize: N.fontSize.sm, color: N.status.red.value,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <AlertTriangle size={16} />
              <strong>Negative margin:</strong> Skin substitute invoice cost exceeds HOPD reimbursement — distributor loses {fmt(Math.abs(calc.skinSubDistribProfit))} per wound
            </div>
          )}
        </Card>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════
  //  TAB 4 — COVERAGE COMPARISON
  // ═══════════════════════════════════════════════════

  const CoverageTab = () => (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <SectionHeader
          icon={Shield}
          title="Insurance Coverage: PRP vs. Skin Substitutes"
          subtitle="NCD 270.3 provides a federal coverage floor — skin substitutes face unprecedented regulatory uncertainty"
        />

        {/* Column headers */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12, padding: "12px 0",
          borderBottom: `2px solid ${N.border.default}`,
          fontSize: N.fontSize.sm, fontFamily: N.font.primary, fontWeight: 700,
        }}>
          <div style={{ color: N.text.pewter }}>Coverage Dimension</div>
          <div style={{ color: N.cyan.core }}>PRP (NCD 270.3)</div>
          <div style={{ color: N.status.amber.value }}>Skin Substitutes</div>
        </div>

        <CoverageRow
          label="Coverage Authority"
          prp="National Coverage Determination (federal)"
          skinSub="LCDs (regional, withdrawn/uncertain)"
          prpGood={true} skinSubGood={false}
        />
        <CoverageRow
          label="Prior Authorization"
          prp="None required"
          skinSub="Often required; varies by MAC"
          prpGood={true} skinSubGood={false}
        />
        <CoverageRow
          label="SOC Failure Period"
          prp="Not required before starting"
          skinSub="4 weeks documented failure (<50% area reduction)"
          prpGood={true} skinSubGood={false}
        />
        <CoverageRow
          label="Application Cap"
          prp="No cap within 20-week window"
          skinSub="8 max per episode (per withdrawn LCD)"
          prpGood={true} skinSubGood={false}
        />
        <CoverageRow
          label="Treatment Duration"
          prp="20 consecutive weeks (national)"
          skinSub="12–16 weeks per episode"
          prpGood={true} skinSubGood={undefined}
        />
        <CoverageRow
          label="Documentation Burden"
          prp="ICD-10 codes + FDA device"
          skinSub="Photos, vascular assessment, measurements, failure docs"
          prpGood={true} skinSubGood={false}
        />
        <CoverageRow
          label="Product-Specific Risk"
          prp="No restrictions (autologous)"
          skinSub="Only 18 products met Level 1 evidence threshold"
          prpGood={true} skinSubGood={false}
        />
        <CoverageRow
          label="Fraud/Abuse Scrutiny"
          prp="Low (minimal abuse potential)"
          skinSub="Extremely high — $1.1B DOJ fraud charges (Jun 2025)"
          prpGood={true} skinSubGood={false}
        />
        <CoverageRow
          label="CY 2026 Payment Stability"
          prp="Rate increases with conversion factor"
          skinSub="~90% aggregate spending reduction"
          prpGood={true} skinSubGood={false}
        />
      </Card>

      {/* PRP Kit Rules */}
      <Card style={{ marginBottom: 20 }}>
        <SectionHeader
          icon={Clock}
          title="PRP Treatment Protocol — NCD 270.3 Rules"
          subtitle="Autologous platelet-rich plasma for diabetic chronic wounds/ulcers"
        />
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16, marginTop: 12,
        }}>
          {[
            { icon: Target, label: "Coverage", value: "Diabetic chronic wounds/ulcers", detail: "ICD-10 diabetes + ulcer codes required" },
            { icon: Clock, label: "Duration", value: "20 consecutive weeks", detail: "Beyond 20 weeks at MAC discretion (KX modifier)" },
            { icon: Zap, label: "Frequency", value: "Up to 2 kits per day", detail: "Essentially ~2 treatments per week for 20 weeks" },
            { icon: Shield, label: "Device Requirement", value: "FDA-cleared Class II", detail: "ActiGraft PRO (BK170095) or Aurix (BK060007)" },
            { icon: Building2, label: "Sites of Service", value: "POS 11, 19, 22, 49, 12, 31", detail: "Office, HOPD (on/off-campus), clinic, home, SNF" },
            { icon: DollarSign, label: "Billing", value: "G0465 per treatment", detail: "All supplies bundled — no separate product cost" },
          ].map((item, i) => (
            <div key={i} style={{
              background: N.bg.panel, borderRadius: 8, padding: 16,
              border: `1px solid ${N.border.subtle}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <item.icon size={16} color={N.cyan.core} />
                <span style={{ color: N.text.silver, fontWeight: 700, fontSize: N.fontSize.sm }}>{item.label}</span>
              </div>
              <div style={{ color: N.cyan.bright, fontWeight: 700, fontSize: N.fontSize.base, marginBottom: 4 }}>{item.value}</div>
              <div style={{ color: N.text.slate, fontSize: N.fontSize.xs }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skin Sub LCD Drama */}
      <Card>
        <SectionHeader
          icon={AlertTriangle}
          title="2025–2026 Skin Substitute Coverage Crisis"
          subtitle="The most turbulent coverage landscape in wound care history"
        />
        <div style={{ marginTop: 12 }}>
          {[
            { date: "Jan 1, 2026", event: "CMS directed all 7 MACs to issue updated LCDs", detail: "Would have limited coverage to 18 products, placed 154 in evaluation, designated 158 as non-covered", color: N.status.red.value },
            { date: "Dec 24, 2025", event: "CMS withdrew finalized LCDs — coverage in limbo", detail: "Previous MAC-specific LCDs remain in effect where they exist — massive regional variation", color: N.status.amber.value },
            { date: "CY 2026", event: "Skin subs reclassified as 'incident-to supplies'", detail: "Products unpackaged: flat $127.28/cm² regardless of prior ASP — ~90% aggregate spending cut", color: N.status.red.value },
            { date: "Jun 2025", event: "DOJ charged $1.1 billion in skin sub fraud", detail: "OIG flagged 640% spending growth ($252M in 2019 → $10B+ in 2024)", color: N.status.red.value },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: 16, padding: "14px 0",
              borderBottom: i < 3 ? `1px solid ${N.border.subtle}` : "none",
            }}>
              <div style={{
                width: 100, flexShrink: 0, fontSize: N.fontSize.xs,
                color: item.color, fontWeight: 700, fontFamily: N.font.mono,
              }}>{item.date}</div>
              <div>
                <div style={{ color: N.text.silver, fontWeight: 700, fontSize: N.fontSize.sm, marginBottom: 4 }}>{item.event}</div>
                <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs }}>{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════
  //  TAB 4 — THROUGHPUT / 20-WEEK MODEL
  // ═══════════════════════════════════════════════════

  const ThroughputTab = () => {
    const weeksData = Array.from({ length: 20 }, (_, i) => {
      const week = i + 1;
      const cumPrpReimb = calc.adjustedG0465 * kitsPerDay * week;
      const cumPrpCost = prpKitCost * kitsPerDay * week;
      return { week, cumPrpReimb, cumPrpCost, cumMargin: cumPrpReimb - cumPrpCost };
    });

    return (
      <div>
        {/* Weekly Economics */}
        <Card style={{ marginBottom: 20 }} glowBorder>
          <SectionHeader
            icon={BarChart3}
            title="PRP Weekly & 20-Week Throughput Economics"
            subtitle={`${kitsPerDay} kits/day × ${fmtDec(calc.adjustedG0465)} per treatment (WI: ${wageIndex.toFixed(2)})`}
          />
          <div style={{
            display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 20,
            marginTop: 16, marginBottom: 20,
          }}>
            <Stat label="Weekly Revenue" value={fmt(calc.prpWeeklyReimbursement)} sub={`${kitsPerDay} treatments/week`} large />
            <Stat label="Weekly Kit Cost" value={fmt(calc.prpWeeklyKitCost)} sub={`${kitsPerDay} × $${prpKitCost}`} color={N.text.pewter} />
            <Stat label="Weekly Margin" value={fmt(calc.prpWeeklyMargin)} color={N.status.green.value} large />
          </div>

          {/* 20-week totals */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
            padding: 20, background: N.bg.panel, borderRadius: 10,
            border: `1px solid ${N.cyan.border}`,
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: N.fontSize.sm, color: N.text.pewter, marginBottom: 4 }}>
                20-Week Total Revenue
              </div>
              <div style={{
                fontSize: N.fontSize["3xl"], fontWeight: 800, color: N.cyan.core,
                fontFamily: N.font.mono, textShadow: N.glow.text,
              }}>{fmt(calc.prp20WeekReimbursement)}</div>
              <div style={{ fontSize: N.fontSize.xs, color: N.text.slate, marginTop: 4 }}>
                {kitsPerDay} kits/day × 20 weeks × {fmtDec(calc.adjustedG0465)}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: N.fontSize.sm, color: N.text.pewter, marginBottom: 4 }}>
                20-Week Facility Margin
              </div>
              <div style={{
                fontSize: N.fontSize["3xl"], fontWeight: 800, color: N.status.green.value,
                fontFamily: N.font.mono,
              }}>{fmt(calc.prp20WeekMargin)}</div>
              <div style={{ fontSize: N.fontSize.xs, color: N.text.slate, marginTop: 4 }}>
                After kit costs: {kitsPerDay * 20} kits × ${prpKitCost} = {fmt(prpKitCost * kitsPerDay * 20)}
              </div>
            </div>
          </div>
        </Card>

        {/* Week-by-week accumulation table */}
        <Card>
          <SectionHeader
            icon={TrendingUp}
            title="Cumulative Revenue by Week"
            subtitle="20-week NCD 270.3 treatment window"
          />
          <div style={{ overflowX: "auto", marginTop: 12 }}>
            <table style={{
              width: "100%", borderCollapse: "collapse",
              fontSize: N.fontSize.sm, fontFamily: N.font.primary,
            }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${N.border.default}` }}>
                  {["Week", "Cumulative Revenue", "Cumulative Kit Cost", "Cumulative Margin"].map((h) => (
                    <th key={h} style={{
                      padding: "10px 12px", textAlign: "right",
                      color: N.text.pewter, fontWeight: 700, fontSize: N.fontSize.xs,
                      textTransform: "uppercase", letterSpacing: 0.5,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeksData.filter((_, i) => i % 2 === 0 || i === 19).map((w) => (
                  <tr key={w.week} style={{
                    borderBottom: `1px solid ${N.border.subtle}`,
                    background: w.week === 20 ? N.cyan.bg : "transparent",
                  }}>
                    <td style={{ padding: "8px 12px", color: N.text.silver, fontWeight: 700, textAlign: "right" }}>
                      {w.week}
                    </td>
                    <td style={{ padding: "8px 12px", color: N.cyan.bright, fontFamily: N.font.mono, fontWeight: 700, textAlign: "right" }}>
                      {fmt(w.cumPrpReimb)}
                    </td>
                    <td style={{ padding: "8px 12px", color: N.text.pewter, fontFamily: N.font.mono, textAlign: "right" }}>
                      {fmt(w.cumPrpCost)}
                    </td>
                    <td style={{
                      padding: "8px 12px", fontFamily: N.font.mono, fontWeight: 700, textAlign: "right",
                      color: w.week === 20 ? N.status.green.value : N.text.silver,
                    }}>
                      {fmt(w.cumMargin)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Contrast with skin sub */}
          <div style={{
            marginTop: 20, padding: "16px 20px",
            background: N.status.amber.bg, border: `1px solid ${N.status.amber.border}`,
            borderRadius: 10,
          }}>
            <div style={{
              fontSize: N.fontSize.base, fontWeight: 700, color: N.status.amber.value,
              marginBottom: 8, display: "flex", alignItems: "center", gap: 8,
            }}>
              <Scale size={18} />
              Skin Substitute Contrast
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16,
              fontSize: N.fontSize.sm, color: N.text.silver,
            }}>
              <div>
                <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs, marginBottom: 4 }}>Max Applications</div>
                <div style={{ fontWeight: 700 }}>8 per episode (LCD)</div>
              </div>
              <div>
                <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs, marginBottom: 4 }}>Required Waiting</div>
                <div style={{ fontWeight: 700 }}>4 weeks SOC failure first</div>
              </div>
              <div>
                <div style={{ color: N.text.pewter, fontSize: N.fontSize.xs, marginBottom: 4 }}>KX Modifier</div>
                <div style={{ fontWeight: 700 }}>Required after 4th app</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════

  return (
    <div style={{
      maxWidth: 1200, margin: "0 auto",
      padding: "24px 20px 60px",
      fontFamily: N.font.primary,
    }}>
      {/* Page Title */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontSize: N.fontSize["3xl"], fontWeight: 800,
          color: N.text.platinum, fontFamily: N.font.display,
          textShadow: N.emboss.textDeep, margin: 0,
          letterSpacing: -0.5,
        }}>
          ActiGraft ROI Calculator
        </h1>
        <div style={{
          fontSize: N.fontSize.base, color: N.text.pewter,
          fontFamily: N.font.primary, marginTop: 6,
        }}>
          PRP vs. Skin Substitute — CMS Reimbursement, Coverage & Facility Economics
        </div>
        <div style={{
          display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap",
        }}>
          <Badge>G0465 | NCD 270.3</Badge>
          <Badge color={N.status.green.value} bg={N.status.green.bg}>
            OPPS APC 5054
          </Badge>
          <Badge color={N.status.amber.value} bg={N.status.amber.bg}>
            {paymentYear === "cy2025" ? "CY 2025 Rates" : "CY 2026 Reform"}
          </Badge>
        </div>
      </div>

      {/* Shared Inputs */}
      <InputPanel />

      {/* Sub-tab Navigation */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 20,
        borderBottom: `1px solid ${N.border.default}`,
        overflowX: "auto",
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={subTabStyle(activeTab === tab.id)}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {activeTab === "reimbursement" && <ReimbursementTab />}
      {activeTab === "roi" && <ROITab />}
      {activeTab === "distributor" && <DistributorTab />}
      {activeTab === "coverage" && <CoverageTab />}
      {activeTab === "throughput" && <ThroughputTab />}

      {/* Footer */}
      <div style={{
        marginTop: 40, paddingTop: 20,
        borderTop: `1px solid ${N.border.subtle}`,
        fontSize: N.fontSize.xs, color: N.text.slate,
        fontFamily: N.font.primary, lineHeight: 1.6,
      }}>
        <strong style={{ color: N.text.pewter }}>Sources:</strong> CMS CY 2025 OPPS Final Rule (CMS-1809-FC);
        CMS CY 2026 OPPS/PFS Final Rules; CMS Addendum B & L; NCD 270.3; Dougherty 2008 (Wound Repair & Regeneration);
        Gude et al. 2019 (Advances in Skin & Wound Care); CMS ASP Drug Pricing Files.
        <br />
        <strong style={{ color: N.text.pewter }}>Disclaimer:</strong> This calculator is for educational and strategic planning purposes.
        Actual reimbursement varies by carrier, geography, and clinical circumstances. Consult CMS fee schedules for authoritative rates.
      </div>
    </div>
  );
}
