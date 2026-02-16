import { useState } from "react";

const products = [
  {
    id: "actigraft",
    name: "ActiGraft PRO",
    abbr: "AG",
    color: "#0D6E3F",
    lightColor: "#E8F5ED",
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
    color: "#1A3A6B",
    lightColor: "#E6EDF7",
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
    color: "#8B4513",
    lightColor: "#FDF3E7",
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
    color: "#7B2D8E",
    lightColor: "#F5EAF8",
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
  { id: "overview", label: "Overview Matrix" },
  { id: "clinical", label: "Clinical & MOA" },
  { id: "access", label: "Market Access" },
  { id: "mac", label: "MAC Coverage" },
  { id: "strategic", label: "Strategic Intel" },
  { id: "additional", label: "+3 Products" }
];

function Badge({ children, color = "#555", bg = "#f0f0f0" }) {
  return (
    <span style={{
      display: "inline-block", fontSize: "10px", fontWeight: 700,
      padding: "2px 7px", borderRadius: "3px", color, background: bg,
      letterSpacing: "0.3px", textTransform: "uppercase", lineHeight: "16px"
    }}>{children}</span>
  );
}

function Check({ yes, partial }) {
  if (yes) return <span style={{ color: "#0D6E3F", fontSize: "18px", fontWeight: 900 }}>✓</span>;
  if (partial) return <span style={{ color: "#D4A017", fontSize: "18px", fontWeight: 900 }}>◐</span>;
  return <span style={{ color: "#ccc", fontSize: "18px" }}>✗</span>;
}

function RatingBadge({ rating }) {
  const styles = {
    "Most Favorable": { bg: "#0D6E3F", color: "#fff" },
    "Favorable": { bg: "#2E7D32", color: "#fff" },
    "NCD Only": { bg: "#78909C", color: "#fff" }
  };
  const s = styles[rating] || styles["NCD Only"];
  return <Badge color={s.color} bg={s.bg}>{rating}</Badge>;
}

function SectionHeader({ children }) {
  return (
    <div style={{
      padding: "6px 12px", background: "#1a1a2e", color: "#D4A860",
      fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px",
      textTransform: "uppercase", borderBottom: "1px solid #2a2a3e"
    }}>{children}</div>
  );
}

function DataRow({ label, values, highlight, mono }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "180px repeat(4, 1fr)",
      borderBottom: "1px solid #eee", minHeight: "40px",
      background: highlight ? "#fafaf5" : "#fff"
    }}>
      <div style={{
        padding: "8px 12px", fontSize: "11px", fontWeight: 700,
        color: "#444", background: highlight ? "#f5f5ed" : "#f9f9f9",
        borderRight: "1px solid #eee", display: "flex", alignItems: "center"
      }}>{label}</div>
      {values.map((v, i) => (
        <div key={i} style={{
          padding: "8px 10px", fontSize: mono ? "11px" : "12px",
          fontFamily: mono ? "'JetBrains Mono', 'Fira Code', monospace" : "inherit",
          color: "#333", borderRight: i < 3 ? "1px solid #f0f0f0" : "none",
          display: "flex", alignItems: "center", lineHeight: "1.4"
        }}>{v}</div>
      ))}
    </div>
  );
}

function OverviewTab() {
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "900px" }}>
        {/* Header row */}
        <div style={{
          display: "grid", gridTemplateColumns: "180px repeat(4, 1fr)",
          background: "#1a1a2e", color: "#fff", position: "sticky", top: 0, zIndex: 2
        }}>
          <div style={{ padding: "12px", fontSize: "10px", fontWeight: 700, letterSpacing: "1px", color: "#D4A860" }}>
            PRODUCT ATTRIBUTE
          </div>
          {products.map(p => (
            <div key={p.id} style={{
              padding: "12px 10px", borderLeft: "1px solid #2a2a3e",
              textAlign: "center"
            }}>
              <div style={{
                display: "inline-block", width: "28px", height: "28px",
                borderRadius: "4px", background: p.color, color: "#fff",
                fontSize: "11px", fontWeight: 800, lineHeight: "28px",
                marginBottom: "4px"
              }}>{p.abbr}</div>
              <div style={{ fontSize: "12px", fontWeight: 700, marginTop: "2px" }}>{p.name}</div>
              <div style={{ fontSize: "10px", color: "#aaa", marginTop: "1px" }}>{p.typeShort}</div>
            </div>
          ))}
        </div>

        <SectionHeader>Company & Distribution</SectionHeader>
        <DataRow label="Manufacturer" values={products.map(p => p.manufacturer)} />
        <DataRow label="HQ Location" values={products.map(p => p.mfgHQ)} highlight />
        <DataRow label="Key Leader" values={products.map(p => p.mfgLeader)} />
        <DataRow label="U.S. Distributor" values={products.map(p => (
          <span>{p.distributor}{p.distExclusive && <Badge color="#0D6E3F" bg="#E8F5ED"> EXCLUSIVE</Badge>}</span>
        ))} highlight />
        <DataRow label="Deal Details" values={products.map(p => p.distDetails)} />

        <SectionHeader>Product Specifications</SectionHeader>
        <DataRow label="Product Type" values={products.map(p => (
          <Badge color={p.color} bg={p.lightColor}>{p.type}</Badge>
        ))} />
        <DataRow label="Blood Volume" values={products.map(p => p.bloodVolume)} highlight mono />
        <DataRow label="Centrifuge Required" values={products.map(p => (
          <span>{p.centrifuge ? <Badge color="#B71C1C" bg="#FFEBEE">YES</Badge> : <Badge color="#0D6E3F" bg="#E8F5ED">NO</Badge>}</span>
        ))} />
        <DataRow label="Bovine Thrombin" values={products.map(p => (
          <span>{p.bovineThrombin ? <Badge color="#B71C1C" bg="#FFEBEE">YES</Badge> : <Badge color="#0D6E3F" bg="#E8F5ED">NO</Badge>}</span>
        ))} highlight />
        <DataRow label="Prep Time" values={products.map(p => p.prepTime)} mono />
        <DataRow label="Coverage Area" values={products.map(p => p.coverageArea)} highlight mono />
        <DataRow label="Shelf Life / Storage" values={products.map(p => p.shelfLife)} />

        <SectionHeader>Regulatory</SectionHeader>
        <DataRow label="510(k) Clearance" values={products.map(p => p.fdaClearance)} mono />
        <DataRow label="Product Code" values={products.map(p => (
          <span>{p.productCode === "PMQ" ?
            <Badge color="#0D6E3F" bg="#E8F5ED">PMQ ✓</Badge> :
            <Badge color="#E65100" bg="#FFF3E0">ORG ⚠</Badge>
          }</span>
        ))} highlight />

        <SectionHeader>Reimbursement</SectionHeader>
        <DataRow label="Kit Price" values={products.map(p => (
          <span style={{ fontWeight: p.kitPrice.includes("$795") ? 800 : 400, color: p.kitPrice.includes("$795") ? "#0D6E3F" : "#666" }}>
            {p.kitPrice}
          </span>
        ))} mono />
        <DataRow label="HOPPS Rate (POS 22)" values={products.map(p => p.hoppsRate)} highlight mono />
        <DataRow label="Office Rate (POS 11)" values={products.map(p => p.posRate)} mono />
        <DataRow label="HCPCS Codes" values={products.map(p => p.hcpcs)} highlight />
      </div>
    </div>
  );
}

function ClinicalTab() {
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "900px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "180px repeat(4, 1fr)",
          background: "#1a1a2e", color: "#fff", position: "sticky", top: 0, zIndex: 2
        }}>
          <div style={{ padding: "12px", fontSize: "10px", fontWeight: 700, letterSpacing: "1px", color: "#D4A860" }}>
            CLINICAL & MOA
          </div>
          {products.map(p => (
            <div key={p.id} style={{
              padding: "10px", borderLeft: "1px solid #2a2a3e", textAlign: "center"
            }}>
              <div style={{
                display: "inline-block", padding: "2px 10px", borderRadius: "3px",
                background: p.color, color: "#fff", fontSize: "11px", fontWeight: 700
              }}>{p.name}</div>
            </div>
          ))}
        </div>

        <SectionHeader>Mechanism of Action</SectionHeader>
        <DataRow label="Product Form" values={[
          "Solid blood clot — applied as biological dressing",
          "PRP gel — biodynamic hematogel applied to wound bed",
          "Solid PRFM membrane — suturable, translucent disk",
          "Solid blood clot — transferred to non-adherent dressing"
        ]} />
        <DataRow label="Active Components" values={[
          "ALL blood components: RBCs, WBCs, platelets, plasma, fibrin, stem cells, fibrocyte precursors",
          "Concentrated platelets + growth factors: PDGF, TGF-β, VEGF (separated from RBCs/WBCs)",
          "Platelets (210× concentrated) in dense cross-linked fibrin lattice; extremely low neutrophils",
          "ALL blood components: similar to ActiGraft — RBCs, WBCs, platelets, fibrin, growth factors"
        ]} highlight />
        <DataRow label="Activation Method" values={[
          "Calcium gluconate powder + kaolin nanoparticles (pre-loaded in mold)",
          "Bovine thrombin + ascorbic acid (reagent kit)",
          "Calcium chloride (CaCl₂) — endogenous thrombin activation",
          "Calcium gluconate solution + 28mg kaolin (coagulation cartridge)"
        ]} />
        <DataRow label="Growth Factor Release" values={[
          "Immediate + sustained (clot acts as reservoir ~7 days)",
          "Burst release upon thrombin activation",
          "Sustained 7–10 days (platelets remain unactivated; <5% CD62p)",
          "Immediate + sustained (similar to ActiGraft; clot active ~7 days)"
        ]} highlight />
        <DataRow label="Application Frequency" values={[
          "Weekly", "Per wound assessment", "Per wound assessment (avg 2 apps in pilot study)", "Weekly (anticipated)"
        ]} />

        <SectionHeader>Clinical Evidence</SectionHeader>
        <DataRow label="Pivotal RCT Result" values={products.map(p => (
          <span style={{ fontWeight: 700, color: p.color }}>{p.rctResult}</span>
        ))} />
        <DataRow label="RCT Citation" values={products.map(p => (
          <span style={{ fontSize: "11px", fontStyle: "italic" }}>{p.rctCitation}</span>
        ))} highlight />
        <DataRow label="Total Patients / Uses" values={products.map(p => p.totalPatients)} />
        <DataRow label="Evidence Tier" values={[
          <Badge color="#1a1a2e" bg="#E8E8E8">Tier 1: Multicenter RCT (n=119)</Badge>,
          <Badge color="#1A3A6B" bg="#E6EDF7">Tier 1+: Blinded RCT drove NCD (n=129)</Badge>,
          <Badge color="#8B4513" bg="#FDF3E7">Tier 2: Pilot study (n=21 VLU)</Badge>,
          <Badge color="#7B2D8E" bg="#F5EAF8">Tier 3: Small FDA study (n=20)</Badge>
        ]} highlight />
        <DataRow label="CED Participation" values={[
          "No", "Yes — instrumental in NCD 270.3", "No", "No"
        ]} />
        <DataRow label="Active Trials" values={[
          "Investigator-initiated studies (LMC/RedDress)",
          "Completed (CED program concluded)",
          "3 active RCTs: NCT02312596/518/570",
          "Full FastSkin Treatment (with SIM tech) under investigation"
        ]} highlight />
      </div>
    </div>
  );
}

function AccessTab() {
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "900px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "180px repeat(4, 1fr)",
          background: "#1a1a2e", color: "#fff", position: "sticky", top: 0, zIndex: 2
        }}>
          <div style={{ padding: "12px", fontSize: "10px", fontWeight: 700, letterSpacing: "1px", color: "#D4A860" }}>
            MARKET ACCESS
          </div>
          {products.map(p => (
            <div key={p.id} style={{
              padding: "10px", borderLeft: "1px solid #2a2a3e", textAlign: "center"
            }}>
              <div style={{
                display: "inline-block", padding: "2px 10px", borderRadius: "3px",
                background: p.color, color: "#fff", fontSize: "11px", fontWeight: 700
              }}>{p.name}</div>
            </div>
          ))}
        </div>

        <SectionHeader>GPO & Formulary Contracts</SectionHeader>
        <DataRow label="Vizient" values={products.map(p => (
          <span><Check yes={p.vizient} /> {p.vizientDate && <span style={{ fontSize: "10px", color: "#666", marginLeft: 4 }}>{p.vizientDate}</span>}</span>
        ))} />
        <DataRow label="Healogics iSupply" values={products.map(p => (
          <span><Check yes={p.healogics} /> {p.healogicsDate && <span style={{ fontSize: "10px", color: "#666", marginLeft: 4 }}>{p.healogicsDate}</span>}</span>
        ))} highlight />
        <DataRow label="WCA Formulary" values={products.map(p => (
          <span><Check yes={p.wca} /> {p.wcaDate && <span style={{ fontSize: "10px", color: "#666", marginLeft: 4 }}>{p.wcaDate}</span>}</span>
        ))} />
        <DataRow label="Premier" values={products.map(p => <Check yes={p.premier} />)} highlight />
        <DataRow label="HealthTrust" values={products.map(p => <Check yes={p.healthTrust} />)} />

        <SectionHeader>Strategic Partnerships</SectionHeader>
        <DataRow label="Smith+Nephew" values={products.map(p => (
          <span>{p.smithNephew ? <Badge color="#1A3A6B" bg="#E6EDF7">CENTRIO Deal</Badge> : <Check />}</span>
        ))} />
        <DataRow label="PAM Health" values={products.map(p => (
          <span>{p.pamHealth ? <Badge color="#1A3A6B" bg="#E6EDF7">Exclusive</Badge> : <Check />}</span>
        ))} highlight />

        <SectionHeader>VA / DoD Access</SectionHeader>
        <DataRow label="VA Status" values={products.map(p => p.vaStatus)} />
        <DataRow label="VA Access Level" values={products.map(p => (
          <span>{p.vaIcon === "full" ? <Badge color="#fff" bg="#0D6E3F">FSS CONTRACT ✓</Badge> :
                 p.vaIcon === "partial" ? <Badge color="#8B6914" bg="#FFF8E1">FACILITY-LEVEL</Badge> :
                 <Badge color="#999" bg="#f5f5f5">NONE</Badge>}</span>
        ))} highlight />

        <SectionHeader>Commercial Payer Landscape</SectionHeader>
        <DataRow label="UnitedHealthcare" values={Array(4).fill(<Badge color="#B71C1C" bg="#FFEBEE">DENIED — Experimental</Badge>)} />
        <DataRow label="Aetna" values={Array(4).fill(<Badge color="#B71C1C" bg="#FFEBEE">DENIED — Experimental</Badge>)} highlight />
        <DataRow label="Cigna" values={Array(4).fill(<Badge color="#B71C1C" bg="#FFEBEE">DENIED — Experimental (Policy 0507)</Badge>)} />
        <DataRow label="BCBS" values={Array(4).fill(<Badge color="#B71C1C" bg="#FFEBEE">DENIED — Investigational (2.01.98)</Badge>)} highlight />
        <DataRow label="Medicare Advantage" values={Array(4).fill(<Badge color="#0D6E3F" bg="#E8F5ED">COVERED — Must follow NCD 270.3</Badge>)} />
        <DataRow label="Medicaid" values={Array(4).fill(<Badge color="#78909C" bg="#ECEFF1">State-dependent; most defer to NCD</Badge>)} highlight />

        <SectionHeader>GPO Penetration Score</SectionHeader>
        <DataRow label="Overall Access Score" values={[
          <div style={{ display: "flex", gap: 2 }}>
            {[1,2,3,4,5].map(i => <div key={i} style={{ width: 18, height: 18, borderRadius: 3, background: i <= 4 ? "#0D6E3F" : "#e0e0e0" }} />)}
            <span style={{ marginLeft: 6, fontWeight: 700, color: "#0D6E3F" }}>4/5</span>
          </div>,
          <div style={{ display: "flex", gap: 2 }}>
            {[1,2,3,4,5].map(i => <div key={i} style={{ width: 18, height: 18, borderRadius: 3, background: i <= 3 ? "#1A3A6B" : "#e0e0e0" }} />)}
            <span style={{ marginLeft: 6, fontWeight: 700, color: "#1A3A6B" }}>3/5</span>
          </div>,
          <div style={{ display: "flex", gap: 2 }}>
            {[1,2,3,4,5].map(i => <div key={i} style={{ width: 18, height: 18, borderRadius: 3, background: i <= 1 ? "#8B4513" : "#e0e0e0" }} />)}
            <span style={{ marginLeft: 6, fontWeight: 700, color: "#8B4513" }}>1/5</span>
          </div>,
          <div style={{ display: "flex", gap: 2 }}>
            {[1,2,3,4,5].map(i => <div key={i} style={{ width: 18, height: 18, borderRadius: 3, background: i <= 0 ? "#7B2D8E" : "#e0e0e0" }} />)}
            <span style={{ marginLeft: 6, fontWeight: 700, color: "#7B2D8E" }}>0/5</span>
          </div>
        ]} />
      </div>
    </div>
  );
}

function MACTab() {
  return (
    <div>
      <div style={{
        padding: "16px", background: "#1a1a2e", color: "#D4A860",
        fontSize: "11px", fontWeight: 600, lineHeight: 1.5
      }}>
        NCD 270.3 mandates national coverage for G0465 (diabetic wounds, first 20 weeks) — no MAC can deny.
        Variation exists only for: G0460 (non-diabetic), coverage beyond 20 weeks, and documentation requirements.
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr style={{ background: "#f5f5ed" }}>
              {["MAC", "Jurisdiction", "States", "LCD #", "Rating", "Notes"].map(h => (
                <th key={h} style={{
                  padding: "10px 12px", textAlign: "left", fontWeight: 700,
                  fontSize: "10px", letterSpacing: "0.5px", textTransform: "uppercase",
                  color: "#555", borderBottom: "2px solid #ddd"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {macData.map((m, i) => (
              <tr key={m.mac} style={{ background: i % 2 ? "#fafafa" : "#fff" }}>
                <td style={{ padding: "10px 12px", fontWeight: 700, color: "#333", borderBottom: "1px solid #eee" }}>{m.mac}</td>
                <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: "11px", borderBottom: "1px solid #eee" }}>{m.jx}</td>
                <td style={{ padding: "10px 12px", fontSize: "11px", color: "#555", borderBottom: "1px solid #eee", maxWidth: "200px" }}>{m.states}</td>
                <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: "11px", borderBottom: "1px solid #eee" }}>{m.lcd}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #eee" }}><RatingBadge rating={m.rating} /></td>
                <td style={{ padding: "10px 12px", fontSize: "11px", color: "#666", borderBottom: "1px solid #eee", lineHeight: 1.4 }}>{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "16px", background: "#fff", borderTop: "2px solid #eee" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px" }}>KEY BILLING REQUIREMENTS (ALL MACs)</div>
        <div style={{ fontSize: "11px", color: "#555", lineHeight: 1.7 }}>
          <div><strong>G0465</strong> — Autologous PRP/blood-derived for diabetic chronic wounds (NCD-mandated nationally)</div>
          <div><strong>G0460</strong> — Non-diabetic chronic wounds (MAC discretion; strongest coverage in Palmetto GBA, First Coast, Novitas)</div>
          <div><strong>KX Modifier</strong> — Required for treatments beyond 20 weeks (all MACs accept this mechanism)</div>
          <div><strong>Required ICD-10</strong> — Dual coding: diabetes mellitus (E11.x) + chronic ulcer (L97.x / L98.x)</div>
          <div><strong>Documentation</strong> — Wound measurements each visit, FDA-cleared device used, standard wound care measures documented</div>
        </div>
      </div>
    </div>
  );
}

function StrategicTab() {
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "900px" }}>
        {products.map(p => (
          <div key={p.id} style={{ borderBottom: "3px solid #eee" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              background: p.lightColor, borderLeft: `4px solid ${p.color}`
            }}>
              <div style={{ gridColumn: "1 / -1", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 4, background: p.color,
                  color: "#fff", fontSize: 12, fontWeight: 800, display: "flex",
                  alignItems: "center", justifyContent: "center"
                }}>{p.abbr}</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: p.color }}>{p.name}</div>
                  <div style={{ fontSize: "11px", color: "#666" }}>{p.manufacturer} — {p.type}</div>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
              <div style={{ padding: "12px 16px", borderRight: "1px solid #eee" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#0D6E3F", letterSpacing: "0.5px", marginBottom: 8 }}>STRATEGIC ADVANTAGES</div>
                {p.strategicAdvantages.map((a, i) => (
                  <div key={i} style={{ fontSize: "11px", color: "#333", lineHeight: 1.5, marginBottom: 4, paddingLeft: 12, textIndent: -12 }}>
                    <span style={{ color: "#0D6E3F", fontWeight: 700 }}>+</span> {a}
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 16px", borderRight: "1px solid #eee" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#1A3A6B", letterSpacing: "0.5px", marginBottom: 8 }}>RECENT NEWS (2024–2026)</div>
                {p.recentNews.map((n, i) => (
                  <div key={i} style={{ fontSize: "11px", color: "#333", lineHeight: 1.5, marginBottom: 4, paddingLeft: 12, textIndent: -12 }}>
                    <span style={{ color: "#1A3A6B", fontWeight: 700 }}>→</span> {n}
                  </div>
                ))}
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#666", marginBottom: 4 }}>STRONGHOLDS</div>
                  <div style={{ fontSize: "11px", color: "#555", lineHeight: 1.4 }}>{p.strongholds}</div>
                </div>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#B71C1C", letterSpacing: "0.5px", marginBottom: 8 }}>WEAKNESSES & VULNERABILITIES</div>
                <div style={{ fontSize: "11px", color: "#555", lineHeight: 1.5 }}>{p.weaknesses}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdditionalTab() {
  return (
    <div>
      <div style={{
        padding: "16px", background: "#1a1a2e", color: "#D4A860",
        fontSize: "11px", fontWeight: 600, lineHeight: 1.5
      }}>
        Three additional FDA 510(k)-cleared products qualify under NCD 270.3 but have minimal U.S. commercial presence.
        None have confirmed GPO contracts, VA access, or significant revenue. Listed for competitive awareness.
      </div>
      {additionalProducts.map((p, i) => (
        <div key={p.name} style={{
          display: "grid", gridTemplateColumns: "200px 1fr",
          borderBottom: "1px solid #eee", background: i % 2 ? "#fafafa" : "#fff"
        }}>
          <div style={{
            padding: "16px", borderRight: "1px solid #eee",
            display: "flex", flexDirection: "column", justifyContent: "center"
          }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#333" }}>{p.name}</div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: 2 }}>{p.manufacturer}</div>
            <div style={{ marginTop: 6 }}>
              <Badge color="#0D6E3F" bg="#E8F5ED">{p.code}</Badge>
              <span style={{ fontSize: "10px", color: "#999", marginLeft: 6 }}>{p.clearance}</span>
            </div>
          </div>
          <div style={{ padding: "16px" }}>
            <div style={{ fontSize: "12px", color: "#333", lineHeight: 1.5 }}>
              <strong>Type:</strong> {p.type}
            </div>
            <div style={{ fontSize: "12px", color: "#333", lineHeight: 1.5, marginTop: 4 }}>
              <strong>Status:</strong> {p.status}
            </div>
            <div style={{ fontSize: "11px", color: "#888", lineHeight: 1.5, marginTop: 4, fontStyle: "italic" }}>
              {p.notes}
            </div>
          </div>
        </div>
      ))}

      <div style={{ padding: "16px", background: "#fff3e0", borderTop: "2px solid #E65100" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#E65100", marginBottom: 6 }}>
          PRODUCTS THAT DO NOT QUALIFY UNDER NCD 270.3
        </div>
        <div style={{ fontSize: "11px", color: "#555", lineHeight: 1.6 }}>
          The following widely-used PRP devices are cleared only for orthopedic bone graft handling (product code ORG without wound indications)
          and cannot bill G0465/G0460: Arthrex ACP & Angel Systems, GPS III (Zimmer Biomet — standalone), SmartPrep (Harvest/Terumo),
          Magellan (Medtronic), Pure PRP II (EmCyte), Eclipse PRP, Dr. PRP, RegenKit-THT (RegenLab — ortho version only).
        </div>
      </div>
    </div>
  );
}

export default function NCD270StudyChart() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{
      fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
      background: "#f0efe8", minHeight: "100vh",
      padding: "20px"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Title */}
      <div style={{
        background: "#1a1a2e",
        borderRadius: "8px 8px 0 0",
        padding: "24px 20px",
        color: "#fff"
      }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#D4A860", marginBottom: 6 }}>
          NCD 270.3 COMPETITIVE LANDSCAPE — FEBRUARY 2026
        </div>
        <div style={{ fontSize: "20px", fontWeight: 800, lineHeight: 1.2 }}>
          Autologous Blood-Derived Wound Products
        </div>
        <div style={{ fontSize: "12px", color: "#aaa", marginTop: 6 }}>
          7 FDA-cleared devices qualifying for Medicare diabetic ulcer coverage — 4 primary + 3 additional
        </div>

        {/* Quick legend */}
        <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
          {products.map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 3, background: p.color,
                color: "#fff", fontSize: 9, fontWeight: 800, display: "flex",
                alignItems: "center", justifyContent: "center"
              }}>{p.abbr}</div>
              <span style={{ fontSize: "11px", color: "#ccc" }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", background: "#232340",
        borderBottom: "2px solid #D4A860", overflowX: "auto"
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "10px 18px", border: "none", cursor: "pointer",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.3px",
            fontFamily: "inherit",
            background: activeTab === t.id ? "#D4A860" : "transparent",
            color: activeTab === t.id ? "#1a1a2e" : "#aaa",
            borderBottom: activeTab === t.id ? "2px solid #D4A860" : "2px solid transparent",
            transition: "all 0.15s ease", whiteSpace: "nowrap"
          }}>{t.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        background: "#fff",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
      }}>
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "clinical" && <ClinicalTab />}
        {activeTab === "access" && <AccessTab />}
        {activeTab === "mac" && <MACTab />}
        {activeTab === "strategic" && <StrategicTab />}
        {activeTab === "additional" && <AdditionalTab />}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 12, padding: "12px 16px",
        fontSize: "10px", color: "#999", lineHeight: 1.5
      }}>
        Sources: FDA 510(k) database, CMS NCD 270.3, Nuo Therapeutics 10-K (SEC), RedDress press releases, Smith+Nephew CENTRIO launch,
        PRP Concepts website, MimiX Biotherapeutics FDA submission, MAC LCD databases, commercial payer policy bulletins.
        Data current as of February 2026.
      </div>
    </div>
  );
}
