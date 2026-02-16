# PRP vs. skin substitute wound care: CMS reimbursement data for ROI calculator

**Autologous platelet-rich plasma under NCD 270.3 (HCPCS G0465) holds a decisive reimbursement and coverage advantage over skin substitutes heading into 2026, as CMS implements the most dramatic payment reform in wound care history.** The CY 2026 OPPS/PFS final rules slash skin substitute reimbursement by an estimated **90%**, dropping payment from product-specific ASP+6% rates to a flat **$127.28 per cm²** — while PRP payment under G0465 remains untouched at approximately **$2,108 per treatment in the HOPD setting**. Part B spending on skin substitutes exploded from $252 million in 2019 to over $10 billion in 2024, triggering this regulatory reset. Meanwhile, PRP's national coverage determination provides a stable, federally mandated coverage floor with fewer documentation hurdles. Below is every data point needed to build the calculator, organized by the seven research domains requested.

---

## 1. OPPS wage index ranges and labor-share formula

The CMS OPPS wage index adjusts the labor-related portion of APC payments to reflect geographic differences in hospital labor costs. The formula is straightforward:

**Adjusted Payment = (National Unadjusted Rate × 0.60 × Hospital Wage Index) + (National Unadjusted Rate × 0.40)**

The **labor-related share is 60%** and the **non-labor share is 40%** — this split has been stable for multiple payment years and remains in effect for CY 2025 and CY 2026. The national unadjusted base rate effectively carries a wage index of 1.0000.

Across all CBSAs, the OPPS wage index ranges from approximately **0.60 at the low end** (Puerto Rico and certain rural areas) to approximately **1.80–1.85 at the high end** (San Jose–Sunnyvale–Santa Clara, CA and San Francisco Bay Area CBSAs). The national median clusters around **0.95–1.00**. For CY 2026, CMS **realigned** the OPPS wage index with the IPPS post-reclassified wage index and **eliminated the low-wage-index hospital policy** previously applied only under OPPS. A **5% cap on annual wage index decreases** remains in effect, and hospitals experiencing a decrease greater than 9.75% from CY 2024 are set to 90.25% of their CY 2024 value as a transition measure. The budget neutrality factor for CY 2026 is **0.9990** (CY 2025 was 0.9995).

| Parameter | CY 2025 | CY 2026 |
|---|---|---|
| OPPS Conversion Factor | $89.169 | $91.415 |
| Labor-related share | 60% | 60% |
| Non-labor share | 40% | 40% |
| WI range (approx.) | 0.60–1.85 | 0.60–1.85 |
| Budget neutrality factor | 0.9995 | 0.9990 |
| Low-WI hospital policy | Active (OPPS only) | Eliminated |

*Source: CMS CY 2025 OPPS Final Rule (CMS-1809-FC, 89 FR 93912, Nov 27, 2024); CMS CY 2026 OPPS Final Rule (CMS-1834-FC, Nov 25, 2025); Addendum L wage index tables at cms.gov.*

---

## 2. HOPD APC payment rates for skin substitutes face a structural reset

Under the **CY 2025 system**, skin substitute procedures were bundled — the product cost was packaged into the APC payment for the application procedure. CMS divided products into "high-cost" and "low-cost" groups, with distinct payment levels based on wound size:

| APC | Description | CY 2025 National Unadjusted Rate |
|---|---|---|
| APC 5053 | Skin Sub Application, ≤100 cm² (CPT 15271/15275) | ~$1,829 (high-cost group) |
| APC 5054 | Skin Sub Application, >100 cm² (CPT 15273/15277); also G0465 PRP | ~$2,108–$3,661 (varies by code) |
| Add-on codes | CPT 15272, 15274, 15276, 15278 | Packaged (no separate payment) |

Under the **CY 2026 system** (effective January 1, 2026), CMS implemented a fundamental restructuring:

- Skin substitutes **reclassified from "biologicals" to "incident-to supplies"**
- Product payment is **unpackaged** from the application procedure — products now receive **separate payment** from the application codes
- Three new product-level APCs created based on FDA regulatory pathway:
  - **APC 6000** — PMA (Premarket Approval) products
  - **APC 6001** — 510(k) products
  - **APC 6002** — 361 HCT/P products
- **All three APCs pay the same rate for CY 2026: $127.28 per cm² under PFS / $127.14 per cm² under OPPS** (CMS plans differentiated rates in future years once sufficient cost data exists)
- Application codes reassigned: CPT 15271/15275 → APC 5053; CPT 15273/15277 → APC 5054
- **Section 351 BLA products** (e.g., Apligraf, Dermagraft) are exempt and continue at ASP+6%

The reported **~90% spending reduction** reflects CMS's projection of aggregate Medicare skin substitute spending, not a uniform 90% cut to every product. High-priced products like Artacent ($2,068/cm²), Revita ($656/cm²), and Affinity ($420/cm²) face reductions exceeding 90%. Lower-priced products like Apligraf ($30/cm²) and Cytal ($20/cm²) actually see a payment increase under the $127.28 flat rate. CMS projects **$19 billion in CY 2026 spending reduction** and credits this reform with preventing an estimated $11 increase in Part B premiums.

*Source: CMS CY 2026 PFS Final Rule (Oct 31, 2025); CMS CY 2026 OPPS Final Rule (Nov 25, 2025); APMA News Release; McDermott+ analysis (Nov 25, 2025); Sidley Austin analysis (Dec 2025).*

---

## 3. G0465 PRP payment holds steady at approximately $2,108 in the HOPD

HCPCS G0465 is described as: *"Autologous platelet-rich plasma (PRP) or other blood-derived product for diabetic chronic wounds/ulcers, using an FDA-cleared device (includes administration, dressings, phlebotomy, centrifugation or mixing, and all preparatory procedures, per treatment)."*

| Setting | Rate Type | CY 2025 Amount |
|---|---|---|
| Hospital Outpatient (OPPS) | APC 5054 national unadjusted | **$2,107.97** |
| Physician Office (MPFS non-facility) | National rate (new for CY 2025) | **$770.83** |
| Physician Office with debridement | MPFS non-facility | **$890.18** |
| MPFS Facility (physician component only) | Professional fee when performed in HOPD | **$83.84** |

The **$770.83** figure is confirmed as the MPFS non-facility national rate — this was newly established for CY 2025 (previously G0465 was contractor-priced under the physician fee schedule). The **$2,107.97** is the OPPS APC payment rate in the hospital outpatient setting. These are distinct payment streams: in the HOPD, the facility receives ~$2,108 via OPPS and the physician receives ~$84 via MPFS facility rate.

G0465 maps to **APC 5054** under the OPPS. Critically, G0465 is governed by NCD 270.3 and is **not affected by the CY 2026 skin substitute payment reforms** — the new flat-rate pricing and reclassification apply only to skin substitute products, not to autologous PRP. For CY 2026, the G0465 OPPS rate will increase proportionally with the new conversion factor ($91.415 vs. $89.169), yielding an estimated rate of approximately **$2,161** (exact amount pending Addendum B publication).

Covered sites of service include POS 11 (office), POS 19 (off-campus HOPD), POS 22 (on-campus HOPD), POS 49 (independent clinic), POS 12 (home), and POS 31 (SNF).

*Source: CMS Addendum B; RedDress Medical reimbursement guide (2025); 3C Patch reimbursement data; StreamlineMD/Alliance of Wound Care analysis; CMS CY 2025 OPPS Final Rule.*

---

## 4. Facility acquisition costs vary enormously across skin substitute products

Pre-2026 ASP (Average Sales Price) data reveals the staggering price variation that drove CMS to act. The following table shows per-cm² pricing that hospitals and CMS were paying:

| HCPCS | Product | Manufacturer | Pre-2026 ASP per cm² | New 2026 Rate | Change |
|---|---|---|---|---|---|
| Q4186 | **EpiFix** | MiMedx | ~$130–150 (estimated) | $127.28 | ~-5% to -15% |
| Q4187 | EpiCord | MiMedx | ~$130–150 (estimated) | $127.28 | ~-5% to -15% |
| Q4101 | **Apligraf** | Organogenesis | $30.42 | ASP+6% (BLA exempt) | Increase |
| Q4159 | **Affinity** | Organogenesis | $420.53 | $127.28 | **-70%** |
| Q4160 | **NuShield** | Organogenesis | $92.91 | $127.28 | +37% |
| Q4133 | **Grafix/StravixPL** | Smith & Nephew | ~$200–300 (estimated) | $127.28 | -35% to -58% |
| Q4158 | **Kerecis Omega3** | Coloplast/Kerecis | ~$150–250 (estimated) | $127.28 | Varies |

**Per-application cost ranges** (pre-2026, for a typical 5–25 cm² wound):

- **Low-end products** (Apligraf, Oasis, Cytal): **$150–$750** per application
- **Mid-range products** (NuShield, EpiFix, Grafix): **$750–$3,500** per application
- **High-end products** (Affinity, Artacent, Revita): **$3,500–$50,000+** per application
- **Post-2026 flat rate**: For a 10 cm² wound, all products pay **~$1,273** per application ($127.28 × 10 cm²)

The HOPD bundled rate (CY 2025) for high-cost skin substitute applications was approximately **$1,829 for wounds ≤100 cm²** and **$3,661 for wounds >100 cm²**, which included both product and application costs. Under CY 2026, the application procedure (CPT 15271) and product ($127.28/cm²) are paid separately.

*Source: CMS ASP Drug Pricing Files (Q3 2023, Q4 2025); WV Medicaid ASP File; CMS CY 2026 PFS Final Rule; manufacturer pricing data; Regulations.gov public comment CMS-2025-0306-2115.*

---

## 5. Skin substitute coverage faces unprecedented regulatory uncertainty

The 2025–2026 period represents the most turbulent coverage landscape in wound care history. Here are the critical developments:

**Coverage losses and LCD drama:** CMS directed all seven MACs to issue updated LCDs for skin substitutes effective January 1, 2026, which would have limited coverage to just **18 products** for DFU/VLU, placed **154 products** in a 12-month "status quo" evaluation period, and designated **158 products as non-covered** for insufficient evidence. However, **CMS withdrew these finalized LCDs on December 24, 2025** — just days before implementation — leaving the coverage landscape in limbo. Previous MAC-specific LCDs remain in effect where they exist.

**PRP (NCD 270.3) vs. skin substitutes — coverage comparison:**

| Coverage Dimension | PRP under NCD 270.3 | Skin Substitutes (2026 status) |
|---|---|---|
| **Coverage authority** | National Coverage Determination (federal) | LCDs (regional, currently withdrawn/uncertain) |
| **Prior authorization** | None required | Often required; varies by MAC |
| **Standard-of-care failure period** | Not required before starting PRP | **4 weeks** of documented SOC failure with <50% area reduction |
| **Application cap per wound** | No cap within 20-week window | **8 applications max** (per withdrawn LCD); 4 without KX modifier |
| **Treatment duration** | 20 consecutive weeks (national); beyond at MAC discretion | 12–16 weeks per episode |
| **Documentation burden** | ICD-10 diabetes + ulcer codes; FDA-cleared device | Extensive: photos, vascular assessment, wound measurements, failure documentation |
| **Product-specific coverage risk** | No product-specific restrictions | Only 18 products met Level 1 RCT evidence threshold |
| **Fraud/abuse scrutiny** | Low (autologous product, minimal abuse potential) | Extremely high — DOJ charged $1.1 billion in fraud (June 2025); OIG flagged 640% spending growth |

**Transitional pass-through (TPT) changes:** CMS created a new ASC payment indicator "S2" for skin substitutes to be paid separately at the OPPS rate in ASC settings. The previous system where products gained TPT status (and higher temporary reimbursement) for 2–3 years is effectively replaced by the new flat-rate framework.

*Source: CMS NCD 270.3; CMS CY 2026 OPPS Final Rule; McDermott+ analysis; Applied Policy analysis; DOJ press release (June 2025); HHS OIG Reports.*

---

## 6. Per-wound economics strongly favor PRP over skin substitutes

**PRP treatment protocol under NCD 270.3:**
- Up to **20 consecutive weeks** of treatment for diabetic chronic wounds
- Applications as clinically indicated (typically **1–2 per week**)
- G0465 is billed per treatment; all preparation, administration, and supplies are bundled into the code
- No separate product cost to the facility — PRP is prepared at point of care from patient's own blood (autologous)
- Beyond 20 weeks, coverage continues at MAC discretion with KX modifier
- FDA-cleared devices required (ActiGraft PRO by RedDress Medical; Aurix by Nuo Therapeutics)

**Skin substitute treatment protocol:**
- Typically **1 application per week for 12–16 weeks** (varies by product and LCD)
- Under the withdrawn LCD framework: **maximum 8 applications per wound episode**; applications 5–8 require KX modifier with documented medical necessity
- Must document **4 weeks of standard-of-care failure** before initiating skin substitute therapy
- Mean expected applications per episode: **4** (per LCD guidance)

**Per-wound total cost comparison (HOPD setting):**

| Cost Component | PRP (G0465) | Skin Substitutes (CY 2025) | Skin Substitutes (CY 2026) |
|---|---|---|---|
| **Facility product cost** | ~$0 (autologous, from patient blood) | $500–$5,000+ per application | $127.28/cm² (~$1,273 for 10 cm² wound) |
| **OPPS payment per treatment** | $2,108 | $1,829 (≤100cm² bundled) | Application + product (separate) |
| **Typical applications** | 12–20 | 4–8 | 4–8 |
| **Estimated total CMS payment per wound** | **$25,296–$42,160** (12–20 treatments × $2,108) | **$7,316–$14,632** (4–8 × $1,829) | TBD (restructured) |
| **Facility net margin per wound** | High (minimal supply cost; ~$50–100 per kit) | Low to negative (product cost often exceeds reimbursement) | Potentially negative at $127.28/cm² flat rate |
| **5-year modeled direct cost per patient** | **$15,159** (Dougherty 2008 model) | $24,374–$40,569 (varies by product) | Expected lower under new pricing |

A landmark cost-effectiveness analysis (Dougherty 2008, modeling 200,000 patients over 5 years) found PRP gel delivered the **lowest total direct cost ($15,159)** with the highest quality-adjusted life years (**2.87 QALYs**), compared to $24,374/2.79 QALYs for bilayered skin substitutes and $40,073/2.65 QALYs for standard of care alone.

Clinical outcomes support PRP's value proposition: the Aurix CED trial (Gude et al., 2019) demonstrated **48.5% complete wound healing** vs. 30.2% for usual care alone (p = 0.048), while ActiGraft pilot data showed **95% complete wound closure at 12 weeks** (28/29 patients, though non-randomized). Apligraf's pivotal RCT showed **56% closure at 12 weeks** vs. 38% control.

*Source: Dougherty 2008 (Wound Repair and Regeneration); Gude et al. 2019 (Advances in Skin & Wound Care); Snyder & Ead 2020 (comparative cost analysis); CMS NCD 270.3; manufacturer billing guides.*

---

## 7. Memphis market intelligence reveals complex competitive dynamics

**Health system GPO affiliations:**

| Health System | GPO Affiliation | Wound Care Center | Notes |
|---|---|---|---|
| **Methodist Le Bonheur Healthcare** | **Premier** (switched from HealthTrust, March 2023) | Methodist North + Methodist South Wound Healing Centers | Largest Memphis system, 6 hospitals |
| **Baptist Memorial Health Care** | **Vizient** (confirmed; $13.6M documented savings) | Wound care services across network | Multi-state system (TN, MS, AR) |
| **Saint Francis Hospital** | **HealthTrust** (Tenet Healthcare captive GPO) | Saint Francis Comprehensive Wound Center | Tenet subsidiary |
| **Regional One Health** | **Likely Vizient** (unconfirmed; academic safety-net hospital) | Limb preservation via VIP Physicians Memphis | Public hospital, UT Health affiliated |

**Memphis CBSA 32820 wage index:** Approximately **0.87–0.89**, below the national average of 1.0. This means Memphis HOPD facilities receive roughly **7–8% less** on the labor portion of APC payments compared to the national rate. For G0465 at an illustrative WI of 0.88: Labor portion = $2,108 × 0.60 × 0.88 = $1,113; Non-labor = $2,108 × 0.40 = $843; **Estimated Memphis-adjusted payment ≈ $1,956.**

**Smith & Nephew's pivotal dual role** is the most significant local dynamic. S&N's North American headquarters sits at **1450 Brooks Road, Memphis** with over 2,000 employees. In a transformative move, S&N entered an **exclusive private-label distribution agreement with Nuo Therapeutics** to market the Aurix system as the **"CENTRIO Platelet-Rich Plasma System"** in the U.S. wound care market. This makes S&N simultaneously a major skin substitute/advanced wound care competitor and the primary distribution channel for PRP therapy — creating complex competitive dynamics for any PRP company entering Memphis.

**Active wound care competitors in Memphis include:**
- **Smith & Nephew** — PICO negative pressure, advanced wound dressings, and now CENTRIO PRP
- **MiMedx** (MDXG) — EpiFix, AXIOFILL, EPIEFFECT (amniotic tissue products; strong national presence)
- **Organogenesis** — Apligraf, NuShield, Affinity (broad portfolio)
- **Coloplast/Kerecis** — Omega3 fish skin graft (Coloplast acquired Kerecis for up to $1.3B in July 2023)
- **Nuo Therapeutics** — Aurix/CENTRIO PRP (via S&N distribution); revenue grew 124% YoY to $1.365M in 2024
- **PRP Concepts** — CASCADE Autologous Platelet System (produces platelet-rich fibrin membrane; running 3 active RCTs)

*Source: Vizient case study (Baptist Memorial); Tenet Healthcare/HealthTrust filings; S&N investor relations; Nuo Therapeutics 10-K (2024); manufacturer websites; CMS Addendum L wage index tables.*

---

## Conclusion: PRP's structural advantages are widening

Three converging forces make PRP under NCD 270.3 the most strategically advantaged wound therapy entering 2026. First, **payment stability** — G0465 retains its ~$2,108 HOPD rate while skin substitute reimbursement collapses to $127.28/cm². Second, **coverage certainty** — NCD 270.3 provides federal-level coverage without the LCD uncertainty, prior authorization requirements, or application caps burdening skin substitutes. Third, **facility economics** — with near-zero product acquisition cost (autologous blood) against a $2,108 payment, PRP generates substantially higher facility margins than skin substitutes, where product costs often consume or exceed reimbursement. For the ROI calculator, the critical variables are the wage index multiplier (0.60–1.85 range), the number of applications per wound episode (12–20 for PRP vs. 4–8 for skin substitutes), and the facility product acquisition delta (~$0 for PRP vs. $500–$5,000+ for skin substitutes). The Memphis market specifically requires navigating three distinct GPO relationships (Premier, Vizient, HealthTrust) and accounting for Smith & Nephew's dual role as both wound care competitor and PRP distributor through its CENTRIO partnership with Nuo Therapeutics.