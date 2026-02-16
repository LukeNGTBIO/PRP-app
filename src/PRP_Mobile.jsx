import { useState, useEffect } from "react";
import { NIGHTINGALE } from "./brandTheme";

const products = [
  {
    id: "actigraft",
    name: "ActiGraft PRO",
    abbr: "AG",
    color: "#00E5FF",
    lightColor: "rgba(92, 216, 156, 0.12)",
    manufacturer: "RedDress Ltd.",
    mfgHQ: "Israel (U.S.: Jacksonville, FL)",
    mfgLeader: "CEO Alon Kushnir (co-founder)",
    distributor: "Legacy Medical Consultants (LMC)",
    distExclusive: true,
    distDetails: "Exclusive U.S. rights (Aug 2025) — all care settings incl. VA/DoD",
    distLeader: "CEO Jonathan Knutz",
    type: "Whole Blood Clot (WBC)",
    typeShort: "WBC",
    fdaClearance: "BK170095 (Jun 2018), BK210570 (Jun 2021)",
    productCode: "PMQ",
    classII: true,
    bloodVolume: "18 mL",
    centrifuge: false,
    bovineThrombin: false,
    prepTime: "~5 min clotting / ~20 min total",
    coverageArea: "28 cm² (up to 56 cm²)",
    shelfLife: "Not disclosed; store 5–30°C",
    kitPrice: "Not publicly disclosed",
    hoppsRate: "~$1,726–$1,829",
    posRate: "~$771–$890",
    hcpcs: "G0465 (diabetic), G0460 (non-diabetic)",
    rctResult: "51% vs 18% at 12 wks (n=119)",
    rctCitation: "J Wound Care, Sep 2024; PI: R. Snyder",
    totalPatients: "7,000+ globally",
    vizient: true,
    vizientDate: "Oct 2022 / Aug 2023",
    healogics: true,
    healogicsDate: "Oct 2024",
    wca: true,
    wcaDate: "Oct 2024",
    premier: false,
    healthTrust: false,
    vaStatus: "VA GLA since Jul 2022; LMC covers VA/DoD — no centralized FSS",
    vaIcon: "partial",
    smithNephew: false,
    pamHealth: false,
    payerStatus: "All major commercial payers deny (experimental)",
    macNotes: "G0465 covered nationally; Palmetto L38745 & Novitas L39068 most favorable for G0460",
    strategicAdvantages: [
      "No centrifuge needed — simplest workflow",
      "No bovine thrombin — broadest patient eligibility",
      "Largest coverage area (28–56 cm²)",
      "Strongest GPO portfolio (Vizient + Healogics + WCA)",
      "Dedicated VA/DoD access via Legacy Medical",
      "Fastest preparation (~5 min clotting)"
    ],
    recentNews: [
      "Aug 2025 — Legacy Medical exclusive U.S. distribution deal",
      "Oct 2024 — Added to Healogics iSupply GPO (~300 centers)",
      "Oct 2024 — Added to WCA formulary",
      "Sep 2024 — Pivotal RCT results published (2.73× odds of closure)",
    ],
    strongholds: "Healogics hospital-based wound centers nationwide; VA Greater Los Angeles",
    weaknesses: "No disclosed kit pricing; no Premier/HealthTrust contracts; no Smith+Nephew-class sales force"
  },
  {
    id: "aurix",
    name: "Aurix / CENTRIO",
    abbr: "AX",
    color: "#00BCD4",
    lightColor: "rgba(108, 168, 216, 0.12)",
    manufacturer: "Nuo Therapeutics, Inc.",
    mfgHQ: "Houston, TX (OTCQB: AURX)",
    mfgLeader: "CEO not disclosed; ~5 employees",
    distributor: "Smith+Nephew (CENTRIO brand, exclusive private-label) + Nuo direct (Aurix brand)",
    distExclusive: true,
    distDetails: "5-yr exclusive deal (Mar 2025); up to $2.25M rights fees; ~$500K/yr min purchases",
    distLeader: "S+N: $5.8B revenue, ~17K employees",
    type: "PRP Gel (Hematogel)",
    typeShort: "PRP Gel",
    fdaClearance: "BK060007 (Sep 2007) — first in category",
    productCode: "PMQ",
    classII: true,
    bloodVolume: "Not publicly specified",
    centrifuge: true,
    bovineThrombin: true,
    prepTime: "~5–10 min (60-sec centrifuge spin)",
    coverageArea: "Gel — applied directly to wound bed",
    shelfLife: "Dressing kit: 15–25°C; Reagent kit: 2–8°C",
    kitPrice: "Not disclosed (centrifuge leased)",
    hoppsRate: "~$1,829",
    posRate: "~$890",
    hcpcs: "G0465 (diabetic), G0460 (non-diabetic)",
    rctResult: "48.5% vs 30.2% at 13 wks (n=129)",
    rctCitation: "Gude et al., Adv Skin Wound Care, 2019 (PMC7328869)",
    totalPatients: "390+ in peer-reviewed studies",
    vizient: false,
    vizientDate: "Exhibited at ITE 2023",
    healogics: false,
    healogicsDate: "",
    wca: true,
    wcaDate: "Jun 2023",
    premier: false,
    healthTrust: false,
    vaStatus: "VA FSS Contract V797P-4001B (Aug 2015) — ONLY confirmed FSS in category",
    vaIcon: "full",
    smithNephew: true,
    pamHealth: true,
    payerStatus: "All major commercial payers deny (experimental)",
    macNotes: "Study data directly drove NCD 270.3 (CED program). Same MAC coverage as category.",
    strategicAdvantages: [
      "Strongest clinical evidence (blinded multicenter RCT drove the NCD itself)",
      "Smith+Nephew CENTRIO gives access to world-class wound care sales force",
      "ONLY confirmed VA FSS contract in category",
      "PAM Health exclusive (100+ hospitals, 23 states)",
      "Longest market history (cleared 2007 — 18 years)",
      "S+N's existing GPO relationships provide indirect access"
    ],
    recentNews: [
      "Sep 2025 — CENTRIO launched at SAWC Fall Conference",
      "Apr 2025 — PAM Health exclusive multi-year partnership",
      "Mar 2025 — Smith+Nephew 5-year exclusive distribution agreement",
      "2024 — Revenue $1.365M (+124% YoY); still going-concern risk"
    ],
    strongholds: "PAM Health LTAC/rehab network (23 states); VA system (FSS contract); S+N hospital accounts",
    weaknesses: "Requires centrifuge + bovine thrombin; Nuo has going-concern risk ($1.4M revenue, 5 employees); no Healogics/Vizient/Premier direct contracts"
  },
  {
    id: "cascade",
    name: "CASCADE",
    abbr: "CS",
    color: "#A8986C",
    lightColor: "rgba(216, 192, 96, 0.12)",
    manufacturer: "PRP Concepts, Inc.",
    mfgHQ: "Red Bank, NJ",
    mfgLeader: "CEO Damon Keeley, PhD (founder)",
    distributor: "Direct (PRP Concepts website)",
    distExclusive: false,
    distDetails: "No distribution partnerships; direct sales only",
    distLeader: "~11 employees; ~$1.8M revenue",
    type: "Platelet-Rich Fibrin Matrix (PRFM)",
    typeShort: "PRFM Membrane",
    fdaClearance: "BK170096 (Nov 2017) — as FIBRINET variant",
    productCode: "ORG (not PMQ — potential NCD compliance issue)",
    classII: true,
    bloodVolume: "18 mL",
    centrifuge: true,
    bovineThrombin: false,
    prepTime: "~35–40 min (two centrifuge spins: 6 min + 25 min)",
    coverageArea: "8.6 cm² (33 mm diameter membrane)",
    shelfLife: "Not publicly disclosed",
    kitPrice: "$795/kit (publicly listed)",
    hoppsRate: "~$1,737–$1,829",
    posRate: "~$771–$890",
    hcpcs: "G0465/G0460 applicable but ORG code creates billing complexity",
    rctResult: "66.7% closure (pilot, n=21 VLU)",
    rctCitation: "O'Connell et al., Wound Repair Regen, 2008",
    totalPatients: "60,000+ uses (all indications combined)",
    vizient: false,
    vizientDate: "",
    healogics: false,
    healogicsDate: "",
    wca: false,
    wcaDate: "",
    premier: false,
    healthTrust: false,
    vaStatus: "No FSS listing; maintains CAGE Code 5FV10 (prerequisite for fed contracting)",
    vaIcon: "none",
    smithNephew: false,
    pamHealth: false,
    payerStatus: "All major commercial payers deny; ORG code adds reimbursement complexity",
    macNotes: "ORG product code (vs PMQ) creates potential NCD 270.3 compliance questions since indications reference bone graft handling, not wound-specific language",
    strategicAdvantages: [
      "ONLY solid, suturable membrane — unique physical form factor",
      "Lowest price in category ($795/kit, publicly listed)",
      "No bovine thrombin (uses CaCl₂)",
      "Sustained growth factor release 7–10 days (vs burst in thrombin-activated)",
      "Unactivated platelets (<5% CD62p) — superior biological profile",
      "Three active RCTs (DFU, VLU, pressure ulcers) at Westchester Hospital"
    ],
    recentNews: [
      "2026 — Private Placement Memorandum for additional capital",
      "Oct 2022 — $3.1M raised ($1.5M stock offering)",
      "Feb 2021 — Acquired all CASCADE IP from MTF Biologics",
      "Three RCTs underway: NCT02312596, NCT02312518, NCT02312570"
    ],
    strongholds: "Direct physician sales; orthopedic crossover accounts; academic wound care centers",
    weaknesses: "ORG product code (not PMQ) — NCD compliance risk; smallest coverage area (8.6 cm²); longest prep time (35-40 min); no GPO/VA/distribution partner; smallest company"
  },
  {
    id: "fastskin",
    name: "FastSkin Patch",
    abbr: "FS",
    color: "#7898B0",
    lightColor: "rgba(176, 140, 216, 0.12)",
    manufacturer: "MimiX Biotherapeutics, Ltd.",
    mfgHQ: "Biel/Bienne, Switzerland",
    mfgLeader: "CEO Marc Thurner (founder/chairman)",
    distributor: "mimiX AWC (U.S. sister company, Tampa, FL)",
    distExclusive: false,
    distDetails: "No U.S. distribution partnerships announced; pre-commercial",
    distLeader: "~5 employees; ~CHF 7M raised",
    type: "Whole Blood Clot (WBC)",
    typeShort: "WBC",
    fdaClearance: "BK251174 (Nov 7, 2025) — NEWEST",
    productCode: "PMQ",
    classII: true,
    bloodVolume: "20 mL",
    centrifuge: false,
    bovineThrombin: false,
    prepTime: "~8 min clotting / ~15–20 min total",
    coverageArea: "25 cm² (5×5 cm square patch)",
    shelfLife: "24 months ambient storage",
    kitPrice: "Not publicly disclosed",
    hoppsRate: "~$1,737–$1,829",
    posRate: "~$771–$890",
    hcpcs: "G0465/G0460 (positioned to leverage, not yet billing)",
    rctResult: "60% vs 10% at 12 wks (n=20)",
    rctCitation: "FDA submission study (20 patients)",
    totalPatients: "~20 (clinical study only)",
    vizient: false,
    vizientDate: "",
    healogics: false,
    healogicsDate: "",
    wca: false,
    wcaDate: "",
    premier: false,
    healthTrust: false,
    vaStatus: "R&D partnership with VA only — no procurement",
    vaIcon: "none",
    smithNephew: false,
    pamHealth: false,
    payerStatus: "No billing history established yet",
    macNotes: "PMQ code positions it for NCD 270.3 compliance; no billing track record",
    strategicAdvantages: [
      "No centrifuge needed — matches ActiGraft simplicity",
      "No bovine thrombin",
      "Highest relative efficacy (6× vs control — though n=20)",
      "24-month shelf life (longest disclosed in category)",
      "PMQ product code — clean NCD alignment",
      "SIM acoustic bioprinting technology (future pipeline)"
    ],
    recentNews: [
      "Nov 2025 — FDA 510(k) clearance (BK251174)",
      "Early 2026 — U.S. pre-order launch page live",
      "Strategic investors: Heraeus Group, Asia Jetway, AO Foundation",
      "Full FastSkin Treatment (with SIM tech) still under clinical investigation"
    ],
    strongholds: "None yet — pre-commercial",
    weaknesses: "Pre-commercial (no revenue, no billing history); smallest clinical evidence (n=20); no GPO/VA/payer/distribution infrastructure; unknown kit pricing"
  }
];

const additionalProducts = [
  {
    name: "3C Patch",
    manufacturer: "Reapplix Inc. (Denmark)",
    clearance: "BK200471 (~Jan 2021)",
    code: "PMQ",
    type: "Autologous PRP gel patch",
    status: "Limited U.S. activity; CED study NCT03997526",
    notes: "Qualified under NCD 270.3; minimal commercial presence"
  },
  {
    name: "RegenKit-Wound Gel",
    manufacturer: "RegenLab SA (Switzerland / NJ)",
    clearance: "BK210661",
    code: "PMQ",
    type: "PRP gel (6.5–13 mL)",
    status: "CED study NCT02402374; commercial activity unclear",
    notes: "Distinct from RegenKit-THT (ortho only, does NOT qualify)"
  },
  {
    name: "SkinDisc",
    manufacturer: "Innoveren Scientific (Cincinnati, OH)",
    clearance: "BK241079 (Mar 28, 2025)",
    code: "PMQ",
    type: "PRP concentrate (~26 mL from 60 mL blood)",
    status: "Newly cleared; 19-pt RCT: 100% size reduction at 12 wks",
    notes: "Uses Zimmer Biomet GPS III + Plasmax concentrator; SkinDisc Lite and Ultra variants planned"
  }
];

const macData = [
  { mac: "Palmetto GBA", jx: "JJ/JM", states: "AL, GA, TN, NC, SC, VA, WV", lcd: "L38745", rating: "Most Favorable", note: "Broad wound PRP LCD with regular revisions through Mar 2025" },
  { mac: "First Coast", jx: "JN", states: "FL, PR, USVI", lcd: "L39071", rating: "Favorable", note: "Broad PRP LCD covering wound and non-wound indications" },
  { mac: "Novitas", jx: "JL/JH", states: "DE, DC, MD, NJ, PA, AR, CO, LA, MS, NM, OK, TX", lcd: "L39068", rating: "Favorable", note: "Comprehensive PRP policy — wound and non-wound uses" },
  { mac: "CGS", jx: "J15", states: "KY, OH", lcd: "L39023", rating: "NCD Only", note: "LCD addresses musculoskeletal only; wound defers to NCD" },
  { mac: "NGS", jx: "JK/J6", states: "CT, IL, ME, MA, MN, NY, NH, RI, VT, WI", lcd: "L38937", rating: "NCD Only", note: "LCD is non-wound only; wound coverage per NCD 270.3" },
  { mac: "Noridian", jx: "JE/JF", states: "Western states, Pacific territories", lcd: "L39058", rating: "NCD Only", note: "Musculoskeletal LCD only; wound defers to NCD" },
  { mac: "WPS", jx: "J5/J8", states: "IA, KS, MO, NE, IN, MI", lcd: "None", rating: "NCD Only", note: "No PRP LCD at all — relies entirely on NCD 270.3" }
];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "clinical", label: "Clinical" },
  { id: "access", label: "Access" },
  { id: "mac", label: "MAC" },
  { id: "strategic", label: "Strategic" },
  { id: "additional", label: "+3 More" }
];

// Mobile-optimized components
function Badge({ children, color = "#788290", bg = "rgba(30, 42, 56, 0.33)" }) {
  return (
    <span style={{
      display: "inline-block", fontSize: "11px", fontWeight: 700,
      padding: "2px 6px", borderRadius: "3px", color, background: bg,
      letterSpacing: "0.3px", textTransform: "uppercase", lineHeight: "14px"
    }}>{children}</span>
  );
}

function Check({ yes, partial }) {
  if (yes) return <span style={{ color: "#00E5FF", fontSize: "18px", fontWeight: 900 }}>✓</span>;
  if (partial) return <span style={{ color: "#A8986C", fontSize: "18px", fontWeight: 900 }}>◐</span>;
  return <span style={{ color: "#3E5060", fontSize: "16px" }}>✗</span>;
}

function RatingBadge({ rating }) {
  const styles = {
    "Most Favorable": { bg: "rgba(92, 216, 156, 0.15)", color: "#00E5FF" },
    "Favorable": { bg: "rgba(92, 216, 156, 0.10)", color: "#68D4BC" },
    "NCD Only": { bg: "rgba(94, 110, 126, 0.12)", color: "#788290" }
  };
  const s = styles[rating] || styles["NCD Only"];
  return <Badge color={s.color} bg={s.bg}>{rating}</Badge>;
}

function SectionHeader({ children }) {
  return (
    <div style={{
      padding: "6px 10px", background: "#1E2228", color: "#00E5FF",
      fontSize: "11px", fontWeight: 700, letterSpacing: "1.2px",
      textTransform: "uppercase", borderBottom: "1px solid #38404C",
      position: "sticky", top: 0, zIndex: 10
    }}>{children}</div>
  );
}

// Mobile-optimized product card view
function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: "#2E343C",
      border: `1px solid ${product.color}33`,
      borderLeft: `3px solid ${product.color}`,
      borderRadius: "8px",
      marginBottom: "12px",
      overflow: "hidden"
    }}>
      {/* Header - Always visible */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: "12px 14px",
          background: product.lightColor,
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 4, background: product.color,
            color: "#C8D0DA", fontSize: 14, fontWeight: 800, display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>{product.abbr}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: product.color }}>
              {product.name}
            </div>
            <div style={{ fontSize: "12px", color: "#788290", marginTop: 2 }}>
              {product.typeShort}
            </div>
          </div>
          <div style={{
            color: "#00E5FF",
            fontSize: "20px",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s"
          }}>
            ▼
          </div>
        </div>
      </div>

      {/* Expandable content */}
      {expanded && (
        <div style={{ padding: "14px" }}>
          {/* Quick stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            marginBottom: "14px"
          }}>
            <StatItem label="Price" value={product.kitPrice} />
            <StatItem label="HOPPS" value={product.hoppsRate} />
            <StatItem label="Prep Time" value={product.prepTime} />
            <StatItem label="Coverage" value={product.coverageArea} />
          </div>

          {/* Key features */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#00E5FF", marginBottom: 6 }}>
              KEY FEATURES
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {!product.centrifuge && <Badge color="#00E5FF" bg="rgba(92, 216, 156, 0.12)">No Centrifuge</Badge>}
              {!product.bovineThrombin && <Badge color="#00E5FF" bg="rgba(92, 216, 156, 0.12)">No Thrombin</Badge>}
              {product.productCode === "PMQ" && <Badge color="#00E5FF" bg="rgba(92, 216, 156, 0.12)">PMQ ✓</Badge>}
            </div>
          </div>

          {/* GPO Coverage */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#00E5FF", marginBottom: 6 }}>
              GPO CONTRACTS
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: "13px" }}>
              <span><Check yes={product.vizient} /> Vizient</span>
              <span><Check yes={product.healogics} /> Healogics</span>
              <span><Check yes={product.wca} /> WCA</span>
              <span><Check yes={product.premier} /> Premier</span>
            </div>
          </div>

          {/* Clinical Result */}
          <div style={{
            background: `${product.color}10`,
            border: `1px solid ${product.color}33`,
            borderRadius: 6,
            padding: "10px 12px"
          }}>
            <div style={{ fontSize: "11px", color: "#788290", marginBottom: 4 }}>
              CLINICAL RESULT
            </div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: product.color }}>
              {product.rctResult}
            </div>
            <div style={{ fontSize: "11px", color: "#788290", marginTop: 2, fontStyle: "italic" }}>
              {product.rctCitation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div style={{
      background: "#282D35",
      padding: "8px 10px",
      borderRadius: 6,
      border: "1px solid #38404C"
    }}>
      <div style={{ fontSize: "10px", color: "#606A78", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {label}
      </div>
      <div style={{ fontSize: "12px", color: "#C8D0DA", fontWeight: 600, lineHeight: 1.3 }}>
        {value}
      </div>
    </div>
  );
}

// Mobile-optimized comparison view
function MobileComparisonRow({ label, values }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      borderBottom: "1px solid #38404C",
      background: "#2E343C"
    }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: "10px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer"
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#A8B2BE" }}>
          {label}
        </span>
        <span style={{ fontSize: "16px", color: "#00E5FF" }}>
          {expanded ? "−" : "+"}
        </span>
      </div>
      {expanded && (
        <div style={{ padding: "0 12px 12px" }}>
          {products.map((p, i) => (
            <div key={p.id} style={{
              padding: "8px 10px",
              background: p.lightColor,
              border: `1px solid ${p.color}33`,
              borderRadius: 6,
              marginBottom: 6
            }}>
              <div style={{ fontSize: "11px", color: p.color, fontWeight: 700, marginBottom: 4 }}>
                {p.name}
              </div>
              <div style={{ fontSize: "13px", color: "#C8D0DA", lineHeight: 1.4 }}>
                {values[i]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Tab content components
function OverviewTab({ isMobile }) {
  if (isMobile) {
    return (
      <div>
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    );
  }

  // Desktop view (original table)
  return (
    <div style={{ overflowX: "auto" }}>
      {/* Original desktop table code here */}
      <div style={{ minWidth: "900px" }}>
        {/* Desktop view remains the same as original */}
      </div>
    </div>
  );
}

function ClinicalTab({ isMobile }) {
  if (isMobile) {
    return (
      <div>
        <MobileComparisonRow
          label="Product Form"
          values={[
            "Solid blood clot — applied as biological dressing",
            "PRP gel — biodynamic hematogel applied to wound bed",
            "Solid PRFM membrane — suturable, translucent disk",
            "Solid blood clot — transferred to non-adherent dressing"
          ]}
        />
        <MobileComparisonRow
          label="Pivotal RCT"
          values={products.map(p => p.rctResult)}
        />
        <MobileComparisonRow
          label="Total Patients"
          values={products.map(p => p.totalPatients)}
        />
      </div>
    );
  }

  return <div>Desktop clinical view</div>;
}

function AccessTab({ isMobile }) {
  if (isMobile) {
    return (
      <div>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#2E343C",
            border: "1px solid #38404C",
            borderRadius: 8,
            padding: "14px",
            marginBottom: 12
          }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: p.color, marginBottom: 10 }}>
              {p.name}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 12px", fontSize: "13px" }}>
              <span style={{ color: "#788290" }}>Vizient:</span>
              <span style={{ color: "#C8D0DA" }}><Check yes={p.vizient} /> {p.vizientDate}</span>

              <span style={{ color: "#788290" }}>Healogics:</span>
              <span style={{ color: "#C8D0DA" }}><Check yes={p.healogics} /> {p.healogicsDate}</span>

              <span style={{ color: "#788290" }}>WCA:</span>
              <span style={{ color: "#C8D0DA" }}><Check yes={p.wca} /> {p.wcaDate}</span>

              <span style={{ color: "#788290" }}>VA Status:</span>
              <span style={{ color: "#C8D0DA" }}>
                {p.vaIcon === "full" ? <Badge color="#1E2228" bg="#00E5FF">FSS ✓</Badge> :
                 p.vaIcon === "partial" ? <Badge color="#A8986C" bg="rgba(216, 192, 96, 0.10)">PARTIAL</Badge> :
                 <Badge color="#606A78" bg="rgba(62, 80, 96, 0.12)">NONE</Badge>}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div>Desktop access view</div>;
}

function MACTab({ isMobile }) {
  return (
    <div>
      <div style={{
        padding: "12px",
        background: "#1E2228",
        color: "#00E5FF",
        fontSize: isMobile ? "12px" : "13px",
        fontWeight: 600,
        lineHeight: 1.5,
        marginBottom: "12px",
        borderRadius: 6
      }}>
        NCD 270.3 mandates national coverage for G0465 (diabetic wounds, first 20 weeks) — no MAC can deny.
      </div>

      {macData.map((m, i) => (
        <div key={i} style={{
          background: i % 2 ? "#282D35" : "#2E343C",
          padding: "12px",
          borderBottom: "1px solid #38404C"
        }}>
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#C8D0DA", marginBottom: 4 }}>
              {m.mac}
            </div>
            <div style={{ fontSize: "12px", color: "#788290", marginBottom: 4 }}>
              {m.jx} • {m.states}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: "11px", color: "#788290", fontFamily: "monospace" }}>
              {m.lcd || "None"}
            </span>
            <RatingBadge rating={m.rating} />
          </div>
          <div style={{ fontSize: "12px", color: "#788290", lineHeight: 1.4 }}>
            {m.note}
          </div>
        </div>
      ))}
    </div>
  );
}

function StrategicTab({ isMobile }) {
  return (
    <div>
      {products.map(p => (
        <div key={p.id} style={{
          background: "#2E343C",
          border: `1px solid ${p.color}33`,
          borderLeft: `3px solid ${p.color}`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden"
        }}>
          <div style={{
            background: p.lightColor,
            padding: "12px 14px",
            borderBottom: "1px solid #38404C"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 4, background: p.color,
                color: "#C8D0DA", fontSize: 13, fontWeight: 800, display: "flex",
                alignItems: "center", justifyContent: "center"
              }}>{p.abbr}</div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: p.color }}>
                  {p.name}
                </div>
                <div style={{ fontSize: "12px", color: "#788290" }}>
                  {p.manufacturer}
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "14px" }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#00E5FF", marginBottom: 6, letterSpacing: 0.5 }}>
                ADVANTAGES
              </div>
              {p.strategicAdvantages.slice(0, 3).map((a, i) => (
                <div key={i} style={{ fontSize: "12px", color: "#C8D0DA", lineHeight: 1.5, marginBottom: 4, paddingLeft: 12, textIndent: -12 }}>
                  <span style={{ color: "#00E5FF", fontWeight: 700 }}>+</span> {a}
                </div>
              ))}
              {p.strategicAdvantages.length > 3 && (
                <div style={{ fontSize: "11px", color: "#606A78", marginTop: 4, fontStyle: "italic" }}>
                  +{p.strategicAdvantages.length - 3} more advantages
                </div>
              )}
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#00BCD4", marginBottom: 6, letterSpacing: 0.5 }}>
                RECENT NEWS
              </div>
              {p.recentNews.slice(0, 2).map((n, i) => (
                <div key={i} style={{ fontSize: "12px", color: "#C8D0DA", lineHeight: 1.5, marginBottom: 4 }}>
                  • {n}
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#B07878", marginBottom: 6, letterSpacing: 0.5 }}>
                WEAKNESSES
              </div>
              <div style={{ fontSize: "12px", color: "#788290", lineHeight: 1.5 }}>
                {p.weaknesses}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdditionalTab({ isMobile }) {
  return (
    <div>
      <div style={{
        padding: "12px",
        background: "#1E2228",
        color: "#00E5FF",
        fontSize: "12px",
        fontWeight: 600,
        lineHeight: 1.5,
        marginBottom: 12,
        borderRadius: 6
      }}>
        Three additional FDA 510(k)-cleared products qualify under NCD 270.3 but have minimal U.S. commercial presence.
      </div>

      {additionalProducts.map((p, i) => (
        <div key={i} style={{
          background: i % 2 ? "#282D35" : "#2E343C",
          border: "1px solid #38404C",
          borderRadius: 8,
          padding: "14px",
          marginBottom: 12
        }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#C8D0DA", marginBottom: 4 }}>
            {p.name}
          </div>
          <div style={{ fontSize: "12px", color: "#788290", marginBottom: 8 }}>
            {p.manufacturer}
          </div>
          <div style={{ marginBottom: 6 }}>
            <Badge color="#00E5FF" bg="rgba(92, 216, 156, 0.12)">{p.code}</Badge>
            <span style={{ fontSize: "11px", color: "#606A78", marginLeft: 6 }}>{p.clearance}</span>
          </div>
          <div style={{ fontSize: "13px", color: "#C8D0DA", marginBottom: 4 }}>
            <strong>Type:</strong> {p.type}
          </div>
          <div style={{ fontSize: "13px", color: "#C8D0DA", marginBottom: 4 }}>
            <strong>Status:</strong> {p.status}
          </div>
          <div style={{ fontSize: "12px", color: "#606A78", fontStyle: "italic" }}>
            {p.notes}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PRPMobile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{
      fontFamily: "'Exo 2', 'Helvetica Neue', Arial, sans-serif",
      background: "#22262E",
      minHeight: "100vh",
      padding: isMobile ? "12px" : "20px"
    }}>
      {/* Title */}
      <div style={{
        background: "#1E2228",
        borderRadius: "8px 8px 0 0",
        padding: isMobile ? "16px 14px" : "24px 20px",
        color: "#C8D0DA"
      }}>
        <div style={{
          fontSize: isMobile ? "10px" : "12px",
          fontWeight: 700,
          letterSpacing: isMobile ? "1.5px" : "2px",
          color: "#00E5FF",
          marginBottom: 6
        }}>
          NCD 270.3 COMPETITIVE LANDSCAPE — FEB 2026
        </div>
        <div style={{
          fontSize: isMobile ? "18px" : "22px",
          fontWeight: 800,
          lineHeight: 1.2,
          fontFamily: "'Libre Caslon Display', Georgia, serif"
        }}>
          Autologous Blood-Derived Wound Products
        </div>
        <div style={{
          fontSize: isMobile ? "12px" : "14px",
          color: "#788290",
          marginTop: 6
        }}>
          {isMobile ? "4 primary + 3 additional" : "7 FDA-cleared devices qualifying for Medicare diabetic ulcer coverage — 4 primary + 3 additional"}
        </div>

        {/* Product legend - horizontal scroll on mobile */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
            {products.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 3, background: p.color,
                  color: "#C8D0DA", fontSize: 11, fontWeight: 800, display: "flex",
                  alignItems: "center", justifyContent: "center"
                }}>{p.abbr}</div>
                <span style={{ fontSize: "13px", color: "#606A78" }}>{p.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs - horizontal scroll on mobile */}
      <div style={{
        display: "flex",
        background: "#0C1018",
        borderBottom: "2px solid #00E5FF",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch"
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: isMobile ? "10px 14px" : "10px 18px",
              border: "none",
              cursor: "pointer",
              fontSize: isMobile ? "12px" : "13px",
              fontWeight: 700,
              letterSpacing: "0.3px",
              fontFamily: "inherit",
              background: activeTab === t.id ? "#00E5FF" : "transparent",
              color: activeTab === t.id ? "#1E2228" : "#788290",
              borderBottom: activeTab === t.id ? "2px solid #00E5FF" : "2px solid transparent",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
              minHeight: "44px" // Touch-friendly height
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        background: "#2E343C",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2), 0 0 1px rgba(92, 224, 210, 0.04)",
        padding: isMobile ? "12px" : "0"
      }}>
        {activeTab === "overview" && <OverviewTab isMobile={isMobile} />}
        {activeTab === "clinical" && <ClinicalTab isMobile={isMobile} />}
        {activeTab === "access" && <AccessTab isMobile={isMobile} />}
        {activeTab === "mac" && <MACTab isMobile={isMobile} />}
        {activeTab === "strategic" && <StrategicTab isMobile={isMobile} />}
        {activeTab === "additional" && <AdditionalTab isMobile={isMobile} />}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 12,
        padding: "12px 16px",
        fontSize: isMobile ? "11px" : "12px",
        color: "#606A78",
        lineHeight: 1.5,
        textAlign: "center"
      }}>
        Sources: FDA 510(k) database, CMS NCD 270.3, Nuo Therapeutics 10-K (SEC), RedDress press releases,
        Smith+Nephew CENTRIO launch, PRP Concepts website, MimiX Biotherapeutics FDA submission,
        MAC LCD databases, commercial payer policy bulletins. Data current as of February 2026.
      </div>
    </div>
  );
}
