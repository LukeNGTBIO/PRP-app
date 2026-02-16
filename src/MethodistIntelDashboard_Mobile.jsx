import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import nbLogoWhite from './assets/nb-logo-white.png';

// Nightingale BioTech Brand Theme v3.0
const BRAND = {
  brightBlue: "#00E5FF",
  lightBlue: "rgba(92, 224, 210, 0.06)",
  goldenYellow: "#A8986C",
  dark: "#22262E",
  darkPanel: "#282D35",
  darkCard: "#2E343C",
  border: "#38404C",
  textPrimary: "#C8D0DA",
  textSecondary: "#788290",
  textMuted: "#606A78",
  confirmed: "#00E5FF",
  assessed: "#A8986C",
  unconfirmed: "#B07878",
  high: "#00BCD4",
  white: "#C8D0DA",
};

const HOSPITAL_PROFILE = {
  name: "Methodist University Hospital",
  parent: "Methodist Le Bonheur Healthcare (MLH)",
  address: "1265 Union Avenue, Memphis, TN 38104",
  beds: 583,
  revenue: "$1.9B",
  associates: 13000,
  providers: 2400,
};

const GPO_DATA = {
  primary: {
    name: "HealthTrust",
    since: "Mar 2013",
    actigraftContract: false,
  },
  secondary: {
    name: "Vizient",
    actigraftContract: true,
    contractDate: "Oct 2022",
  },
};

const REIMBURSEMENT = {
  hospitalOutpatient: 1726,
  kitCost: 450,
  grossMargin: 1276,
  grossMarginPct: 74,
  woundClosureRate: 72,
  standardOfCare: 22,
};

const WOUND_CARE_FACILITIES = [
  { name: "South Wound Healing Center", address: "1251 Wesley Dr. #107, Memphis, TN 38116", phone: "901-516-3730", hbo: false },
  { name: "North Wound Healing Center", address: "Methodist North Hospital", hbo: true, hboChambers: 2 },
  { name: "East Wound Care Center", address: "2900 Kirby Pkwy Suite 12, Memphis, TN 38119", hbo: false },
];

const PER_APP_ECONOMICS = [
  { name: "Kit Cost", value: 450, fill: "#B07878" },
  { name: "Gross Margin", value: 1276, fill: "#00E5FF" },
];

const STRATEGIC_PRIORITIES = [
  { priority: 1, title: "Leverage Vizient Contract", desc: "Position ActiGraft as novel product category distinct from allografts on HealthTrust." },
  { priority: 2, title: "Product Category Gap", desc: "G0465 classification falls outside HealthTrust regenerative tissue contracts." },
  { priority: 3, title: "Engage Sandy Deimund", desc: "Clinical Director at Methodist North — ideal for ActiGraft + HBOT synergy pitch." },
  { priority: 4, title: "2026 Reimbursement Shield", desc: "Emphasize immunity from CTP reimbursement cuts (up to 90%)." },
];

// Mobile-optimized components
function MetricCard({ label, value, sub, accent = BRAND.brightBlue, isMobile }) {
  return (
    <div style={{
      background: BRAND.darkCard,
      border: `1px solid ${BRAND.border}`,
      borderRadius: 8,
      padding: isMobile ? "12px 14px" : "16px 18px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
    }}>
      <div style={{
        fontSize: isMobile ? "10px" : "11px",
        color: BRAND.textMuted,
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        fontWeight: 600
      }}>
        {label}
      </div>
      <div style={{
        fontSize: isMobile ? "22px" : "28px",
        fontWeight: 700,
        color: accent,
        letterSpacing: -0.5,
        marginBottom: sub ? 4 : 0
      }}>
        {value}
      </div>
      {sub && (
        <div style={{
          fontSize: isMobile ? "11px" : "13px",
          color: BRAND.textMuted
        }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const configs = {
    ACTIVE: { bg: "rgba(92, 216, 156, 0.12)", color: BRAND.confirmed, text: "ACTIVE" },
    "NOT FOUND": { bg: "rgba(224, 112, 112, 0.10)", color: BRAND.unconfirmed, text: "NO CONTRACT" },
  };
  const cfg = configs[status] || configs["NOT FOUND"];

  return (
    <span style={{
      background: cfg.bg,
      color: cfg.color,
      padding: "3px 8px",
      borderRadius: 4,
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: 0.3,
      textTransform: "uppercase",
      display: "inline-block"
    }}>
      {cfg.text}
    </span>
  );
}

function Collapsible({ title, children, defaultOpen = false, isMobile }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{
      background: BRAND.darkCard,
      border: `1px solid ${BRAND.border}`,
      borderRadius: 8,
      marginBottom: 12,
      overflow: "hidden"
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: isMobile ? "12px 14px" : "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          color: BRAND.textPrimary,
          minHeight: "44px" // Touch-friendly
        }}
      >
        <span style={{
          fontSize: isMobile ? "15px" : "17px",
          fontWeight: 700,
          fontFamily: "'Libre Caslon Display', Georgia, serif"
        }}>
          {title}
        </span>
        <span style={{
          fontSize: "18px",
          color: BRAND.brightBlue,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s"
        }}>
          ▼
        </span>
      </button>
      {open && (
        <div style={{
          padding: isMobile ? "12px 14px 16px" : "0 20px 20px",
          borderTop: `1px solid ${BRAND.border}`
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function DataRow({ label, value, highlight, isMobile }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "140px 1fr",
      gap: isMobile ? 4 : 12,
      padding: "10px 0",
      borderBottom: `1px solid ${BRAND.border}33`
    }}>
      <div style={{
        fontSize: isMobile ? "12px" : "13px",
        color: BRAND.textSecondary,
        fontWeight: 600
      }}>
        {label}
      </div>
      <div style={{
        fontSize: isMobile ? "13px" : "14px",
        color: highlight ? BRAND.brightBlue : BRAND.textPrimary,
        fontWeight: highlight ? 600 : 400,
        lineHeight: 1.5
      }}>
        {value}
      </div>
    </div>
  );
}

function OverviewTab({ isMobile }) {
  return (
    <div>
      {/* Key Metrics */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
        gap: isMobile ? 10 : 16,
        marginBottom: 16
      }}>
        <MetricCard label="Revenue" value="$1.9B" sub="6-hospital system" isMobile={isMobile} />
        <MetricCard label="Beds" value={HOSPITAL_PROFILE.beds} sub="Flagship hospital" isMobile={isMobile} />
        <MetricCard label="Primary GPO" value="HealthTrust" sub="Since 2013" accent={BRAND.assessed} isMobile={isMobile} />
        <MetricCard label="Vizient" value="ACTIVE" sub="Oct 2022" accent={BRAND.confirmed} isMobile={isMobile} />
        <MetricCard label="Margin/App" value="$1,276" sub="74% gross" accent={BRAND.goldenYellow} isMobile={isMobile} />
        <MetricCard label="Closure" value="72%" sub="vs 22% SOC" accent={BRAND.brightBlue} isMobile={isMobile} />
      </div>

      {/* Critical Finding */}
      <div style={{
        background: BRAND.darkCard,
        border: `1px solid ${BRAND.goldenYellow}44`,
        borderLeft: `3px solid ${BRAND.goldenYellow}`,
        borderRadius: 6,
        padding: isMobile ? "12px 14px" : "16px 20px",
        marginBottom: 16
      }}>
        <div style={{
          fontSize: isMobile ? "13px" : "15px",
          fontWeight: 700,
          color: BRAND.goldenYellow,
          marginBottom: 8
        }}>
          ⚡ Critical Strategic Finding
        </div>
        <div style={{
          fontSize: isMobile ? "13px" : "15px",
          color: BRAND.textSecondary,
          lineHeight: 1.6
        }}>
          ActiGraft's classification as a <strong style={{ color: BRAND.brightBlue }}>blood-derived product (G0465)</strong> creates a <strong style={{ color: BRAND.white }}>category gap — not a compliance conflict</strong> with HealthTrust. MLH may procure via Vizient without violating committed-model requirements.
        </div>
      </div>

      {/* GPO Contracts */}
      <Collapsible title="GPO Contract Status" defaultOpen isMobile={isMobile}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{
            background: BRAND.darkPanel,
            border: `1px solid ${BRAND.confirmed}33`,
            borderRadius: 6,
            padding: "12px 14px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6
            }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: BRAND.white }}>
                Vizient
              </span>
              <StatusBadge status="ACTIVE" />
            </div>
            <div style={{ fontSize: "12px", color: BRAND.textSecondary }}>
              Innovative Technology Contract (Oct 2022)
            </div>
          </div>

          <div style={{
            background: BRAND.darkPanel,
            border: `1px solid ${BRAND.unconfirmed}33`,
            borderRadius: 6,
            padding: "12px 14px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6
            }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: BRAND.white }}>
                HealthTrust (Primary GPO)
              </span>
              <StatusBadge status="NOT FOUND" />
            </div>
            <div style={{ fontSize: "12px", color: BRAND.textSecondary }}>
              Committed model since Mar 2013 — highest priority gap
            </div>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}

function GPOTab({ isMobile }) {
  return (
    <div>
      <Collapsible title="HealthTrust (Primary)" defaultOpen isMobile={isMobile}>
        <DataRow label="Member Since" value="March 1, 2013" isMobile={isMobile} />
        <DataRow label="Model" value="COMMITTED — 80% min compliance" isMobile={isMobile} />
        <DataRow label="2021 New Spend" value="$20.4M" isMobile={isMobile} />
        <DataRow label="ActiGraft Contract" value="NOT FOUND" highlight isMobile={isMobile} />
      </Collapsible>

      <Collapsible title="Vizient (Secondary)" isMobile={isMobile}>
        <DataRow label="Contract Type" value="Innovative Technology Contract" isMobile={isMobile} />
        <DataRow label="Awarded" value="October 2022" isMobile={isMobile} />
        <DataRow label="PRO Available" value="August 2023" isMobile={isMobile} />
        <DataRow label="ActiGraft Status" value="ACTIVE" highlight isMobile={isMobile} />
      </Collapsible>

      <div style={{
        background: BRAND.darkCard,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 8,
        padding: isMobile ? "12px 14px" : "16px 20px",
        marginTop: 12
      }}>
        <div style={{
          fontSize: isMobile ? "12px" : "13px",
          fontWeight: 700,
          color: BRAND.brightBlue,
          marginBottom: 8
        }}>
          KEY INSIGHT
        </div>
        <div style={{
          fontSize: isMobile ? "13px" : "14px",
          color: BRAND.textSecondary,
          lineHeight: 1.6
        }}>
          ActiGraft's G0465 blood-derived classification likely falls OUTSIDE existing HealthTrust regenerative tissue contracts — creating strategic opening for Vizient-pathway procurement.
        </div>
      </div>
    </div>
  );
}

function FinancialTab({ isMobile }) {
  return (
    <div>
      {/* Per-App Economics */}
      <div style={{
        background: BRAND.darkCard,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 8,
        padding: isMobile ? "12px 14px" : "16px 20px",
        marginBottom: 16
      }}>
        <div style={{
          fontSize: isMobile ? "14px" : "16px",
          fontWeight: 700,
          color: BRAND.white,
          marginBottom: 12,
          fontFamily: "'Libre Caslon Display', Georgia, serif"
        }}>
          Per-Application Economics
        </div>

        {isMobile ? (
          <div>
            <DataRow label="Hospital Reimbursement" value="$1,726" highlight isMobile />
            <DataRow label="Kit Cost" value="$450" isMobile />
            <DataRow label="Gross Margin" value="$1,276 (74%)" highlight isMobile />
          </div>
        ) : (
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PER_APP_ECONOMICS}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {PER_APP_ECONOMICS.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Clinical Performance */}
      <div style={{
        background: BRAND.darkCard,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 8,
        padding: isMobile ? "12px 14px" : "16px 20px"
      }}>
        <div style={{
          fontSize: isMobile ? "14px" : "16px",
          fontWeight: 700,
          color: BRAND.white,
          marginBottom: 12,
          fontFamily: "'Libre Caslon Display', Georgia, serif"
        }}>
          Wound Closure Performance
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12
        }}>
          <div style={{
            background: `${BRAND.brightBlue}10`,
            border: `1px solid ${BRAND.brightBlue}33`,
            borderRadius: 6,
            padding: "12px 14px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "11px", color: BRAND.textMuted, marginBottom: 4 }}>
              ActiGraft Pro
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: BRAND.brightBlue }}>
              72%
            </div>
            <div style={{ fontSize: "11px", color: BRAND.textSecondary, marginTop: 2 }}>
              at 12 weeks
            </div>
          </div>
          <div style={{
            background: `${BRAND.textMuted}10`,
            border: `1px solid ${BRAND.textMuted}33`,
            borderRadius: 6,
            padding: "12px 14px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "11px", color: BRAND.textMuted, marginBottom: 4 }}>
              Standard of Care
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: BRAND.textMuted }}>
              22%
            </div>
            <div style={{ fontSize: "11px", color: BRAND.textSecondary, marginTop: 2 }}>
              at 12 weeks
            </div>
          </div>
        </div>
        <div style={{
          textAlign: "center",
          marginTop: 12,
          padding: "10px",
          background: `${BRAND.confirmed}10`,
          borderRadius: 6
        }}>
          <span style={{ fontSize: isMobile ? "24px" : "28px", fontWeight: 800, color: BRAND.confirmed }}>
            3.3×
          </span>
          <span style={{ fontSize: isMobile ? "13px" : "15px", color: BRAND.textSecondary, marginLeft: 8 }}>
            better closure rate
          </span>
        </div>
      </div>
    </div>
  );
}

function ClinicalTab({ isMobile }) {
  return (
    <div>
      {/* Wound Care Facilities */}
      <div style={{
        fontSize: isMobile ? "13px" : "14px",
        fontWeight: 700,
        color: BRAND.brightBlue,
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5
      }}>
        Wound Care Facilities ({WOUND_CARE_FACILITIES.length})
      </div>

      {WOUND_CARE_FACILITIES.map((f, i) => (
        <div key={i} style={{
          background: BRAND.darkCard,
          border: `1px solid ${f.hbo ? BRAND.brightBlue + "44" : BRAND.border}`,
          borderLeft: f.hbo ? `3px solid ${BRAND.brightBlue}` : `1px solid ${BRAND.border}`,
          borderRadius: 8,
          padding: isMobile ? "12px 14px" : "14px 16px",
          marginBottom: 12
        }}>
          <div style={{
            fontSize: isMobile ? "14px" : "15px",
            fontWeight: 700,
            color: BRAND.white,
            marginBottom: 6
          }}>
            {f.name}
          </div>
          <div style={{
            fontSize: isMobile ? "12px" : "13px",
            color: BRAND.textSecondary,
            lineHeight: 1.6
          }}>
            {f.address}
          </div>
          {f.phone && (
            <div style={{
              fontSize: isMobile ? "12px" : "13px",
              color: BRAND.textSecondary,
              marginTop: 4
            }}>
              📞 {f.phone}
            </div>
          )}
          {f.hbo && (
            <div style={{
              marginTop: 8,
              background: `${BRAND.brightBlue}15`,
              border: `1px solid ${BRAND.brightBlue}33`,
              borderRadius: 6,
              padding: "8px 12px",
              fontSize: "12px",
              color: BRAND.brightBlue,
              fontWeight: 600
            }}>
              ⚡ {f.hboChambers} HBO Monoplace Chambers
            </div>
          )}
        </div>
      ))}

      {/* Key Contact */}
      <Collapsible title="Wound Care Leadership" isMobile={isMobile}>
        <DataRow
          label="Clinical Director"
          value="Sandy Deimund, BSN"
          highlight
          isMobile={isMobile}
        />
        <DataRow
          label="Facility"
          value="Methodist North Comprehensive Wound Healing Center"
          isMobile={isMobile}
        />
        <DataRow
          label="Strategic Value"
          value="Oversees HBO + wound care — ideal for ActiGraft + HBOT synergy pitch"
          isMobile={isMobile}
        />
      </Collapsible>
    </div>
  );
}

function StrategyTab({ isMobile }) {
  return (
    <div>
      <div style={{
        fontSize: isMobile ? "13px" : "14px",
        fontWeight: 700,
        color: BRAND.brightBlue,
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5
      }}>
        Strategic Playbook — Top Priorities
      </div>

      {STRATEGIC_PRIORITIES.map((r, i) => (
        <div key={i} style={{
          background: BRAND.darkCard,
          border: `1px solid ${BRAND.border}`,
          borderRadius: 8,
          padding: isMobile ? "12px 14px" : "14px 16px",
          marginBottom: 12,
          display: "flex",
          gap: isMobile ? 10 : 14
        }}>
          <div style={{
            width: isMobile ? 28 : 32,
            height: isMobile ? 28 : 32,
            borderRadius: 6,
            background: `${BRAND.brightBlue}20`,
            border: `2px solid ${BRAND.brightBlue}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isMobile ? 14 : 16,
            fontWeight: 700,
            color: BRAND.brightBlue,
            flexShrink: 0
          }}>
            {r.priority}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: 700,
              color: BRAND.white,
              marginBottom: 6
            }}>
              {r.title}
            </div>
            <div style={{
              fontSize: isMobile ? "13px" : "14px",
              color: BRAND.textSecondary,
              lineHeight: 1.6
            }}>
              {r.desc}
            </div>
          </div>
        </div>
      ))}

      {/* Enablers & Barriers */}
      <div style={{ marginTop: 20 }}>
        <Collapsible title="✓ Enablers" defaultOpen isMobile={isMobile}>
          {[
            "Active Vizient Innovative Technology Contract",
            "G0465 classification immune to 2026 CTP cuts",
            "74% gross margin ($450 cost vs $1,726 reimbursement)",
            "Methodist North operates 2 HBO chambers",
            "Product category gap in HealthTrust contracts",
          ].map((e, i) => (
            <div key={i} style={{
              fontSize: isMobile ? "13px" : "14px",
              color: BRAND.textSecondary,
              padding: "6px 0",
              paddingLeft: 16,
              position: "relative",
              lineHeight: 1.5
            }}>
              <span style={{
                position: "absolute",
                left: 0,
                color: BRAND.confirmed,
                fontWeight: 700
              }}>
                ✓
              </span>
              {e}
            </div>
          ))}
        </Collapsible>

        <Collapsible title="✗ Barriers" isMobile={isMobile}>
          {[
            "No HealthTrust contract (primary GPO)",
            "Committed-model compliance culture",
            "No identified clinical champion at MLH",
            "System-wide wound care director not identified",
          ].map((e, i) => (
            <div key={i} style={{
              fontSize: isMobile ? "13px" : "14px",
              color: BRAND.textSecondary,
              padding: "6px 0",
              paddingLeft: 16,
              position: "relative",
              lineHeight: 1.5
            }}>
              <span style={{
                position: "absolute",
                left: 0,
                color: BRAND.unconfirmed,
                fontWeight: 700
              }}>
                ✗
              </span>
              {e}
            </div>
          ))}
        </Collapsible>
      </div>
    </div>
  );
}

export default function MethodistIntelDashboardMobile() {
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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "gpo", label: "GPO" },
    { id: "financial", label: "Financial" },
    { id: "clinical", label: "Clinical" },
    { id: "strategy", label: "Strategy" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: BRAND.dark,
      color: BRAND.textPrimary,
      fontFamily: "'Exo 2', 'Helvetica Neue', Arial, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        background: "#1E2228",
        borderBottom: "1px solid #445060",
        padding: isMobile ? "14px 16px" : "20px 32px",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        <div>
          <div style={{ marginBottom: isMobile ? 6 : 8 }}>
            <img
              src={nbLogoWhite}
              alt="Nightingale Biotech"
              style={{ height: isMobile ? 24 : 30, width: "auto" }}
            />
          </div>
          <h1 style={{
            margin: 0,
            fontSize: isMobile ? "16px" : "22px",
            fontWeight: 700,
            letterSpacing: -0.3,
            color: "#C8D0DA",
            fontFamily: "'Libre Caslon Display', Georgia, serif"
          }}>
            Methodist University Hospital
          </h1>
          <p style={{
            margin: 0,
            fontSize: isMobile ? "12px" : "14px",
            color: "#788290",
            marginTop: 4
          }}>
            ActiGraft Pro Market Intelligence
          </p>

          {/* Tabs */}
          <div style={{
            display: "flex",
            gap: 4,
            marginTop: isMobile ? 12 : 18,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            background: "#0C1018",
            borderRadius: 6,
            padding: 4
          }}>
            {tabs.map(t => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    background: active ? "#00E5FF" : "transparent",
                    border: "none",
                    borderRadius: 4,
                    padding: isMobile ? "8px 14px" : "7px 14px",
                    color: active ? "#22262E" : "#606A78",
                    fontSize: isMobile ? "12px" : "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s",
                    letterSpacing: 0.5,
                    minHeight: "44px" // Touch-friendly
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: isMobile ? "16px" : "28px 32px",
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        {activeTab === "overview" && <OverviewTab isMobile={isMobile} />}
        {activeTab === "gpo" && <GPOTab isMobile={isMobile} />}
        {activeTab === "financial" && <FinancialTab isMobile={isMobile} />}
        {activeTab === "clinical" && <ClinicalTab isMobile={isMobile} />}
        {activeTab === "strategy" && <StrategyTab isMobile={isMobile} />}

        {/* Footer */}
        <div style={{
          marginTop: 32,
          paddingTop: 16,
          borderTop: `1px solid ${BRAND.border}`,
          textAlign: "center"
        }}>
          <p style={{
            fontSize: isMobile ? "11px" : "13px",
            color: BRAND.textMuted,
            lineHeight: 1.6
          }}>
            Methodist University Hospital ActiGraft Intelligence<br />
            Nightingale BioTech × Legacy Medical Consultants<br />
            Compiled Feb 15, 2026 • Confidential
          </p>
        </div>
      </div>
    </div>
  );
}
