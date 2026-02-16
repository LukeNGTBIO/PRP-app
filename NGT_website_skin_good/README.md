# Nightingale BioTech — Brand Kit v5.0

**Monochromatic Steel + Electric Cyan Backlit Glow**

Cellular Regenerative Biomedical Distribution

---

## Design Source — Two Reference Images

**Image 1 (Static/Print Mode):** Dark charcoal brushed-metal surface with fine vertical texture. Embossed/debossed silver bird logomark. "Nightingale" in geometric tech sans-serif with letterpress depth. "BIOTECH" in ultra-wide tracked light caps. Frosted silver molecular overlays (DNA, neurons, molecules) at 5-7% opacity. Zero chromatic color.

**Image 2 (Active/Digital Mode):** Same steel foundation, PLUS electric cyan (#00E5FF) backlit glow radiating from behind the bird logomark and text. Logo sits on a dark recessed plate (#141820) with cyan halo bleeding outward. Molecular overlays include warm amber reflections on some DNA elements. The glow is NOT a flat accent — it's a radiating halo that spreads and fades.

**For web/digital contexts, the active mode (steel + glow) is primary.**

---

## Files

| File | Purpose | Framework |
|------|---------|-----------|
| `nightingale-theme.css` | CSS variables + glow/emboss systems + components | Any / Vanilla |
| `nightingale-tokens.json` | Machine-readable design tokens | Style Dictionary, Figma |
| `tailwind.nightingale.config.js` | Tailwind theme extension with glow shadows | Tailwind CSS |
| `_nightingale-variables.scss` | SCSS variables + convenience maps | Sass/SCSS |
| `nightingale-brand-guide.html` | Visual brand reference (self-contained) | Browser |

---

## Quick Start

```html
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="nightingale-theme.css">
<body class="ng-theme">
  <!-- Steel foundation applied. Add glow classes for activation: -->
  <div class="ng-logo-plate"><!-- Dark recessed panel with cyan glow --></div>
  <h1 class="ng-display-glow ng-display-lg">Nightingale</h1>
  <div class="ng-card-glow"><!-- Card with cyan border glow --></div>
  <button class="ng-btn ng-btn-glow">CTA</button>
</body>
```

---

## Color System

### Layer 1: Backgrounds (Charcoal/Gunmetal)
| Token | Hex | Use |
|-------|-----|-----|
| `--ng-bg-deepest` | `#1A1E24` | Vignette, overlays |
| `--ng-bg-base` | `#22262E` | Page background |
| `--ng-bg-panel` | `#282D35` | Panels, sidebars |
| `--ng-bg-card` | `#2E343C` | Cards, containers |
| `--ng-bg-card-alt` | `#343A44` | Hover, alt rows |
| `--ng-bg-elevated` | `#3C424C` | Dropdowns |
| `--ng-bg-logo-plate` | `#141820` | Dark recessed logo panel |

### Layer 1: Text (Silver/Platinum Metallic Ramp)
| Token | Hex | Use |
|-------|-----|-----|
| `--ng-platinum` | `#C8D0DA` | Hero text, emboss highlights |
| `--ng-silver` | `#A8B2BE` | Primary headings |
| `--ng-chrome` | `#909AA6` | Body text default |
| `--ng-pewter` | `#788290` | Secondary text |
| `--ng-slate` | `#606A78` | Labels, captions |
| `--ng-graphite` | `#4A5462` | Disabled, placeholder |
| `--ng-steel` | `#384250` | Watermarks |

### Layer 2: Electric Cyan Glow
| Token | Hex | Use |
|-------|-----|-----|
| `--ng-cyan` | `#00E5FF` | Backlight source |
| `--ng-cyan-bright` | `#5CF0FF` | Bright glow edge |
| `--ng-cyan-mid` | `#00BCD4` | Mid glow |
| `--ng-cyan-dim` | `#008C9E` | Dim glow |
| `--ng-cyan-deep` | `#005F6B` | Far edge of spread |

### Status (Desaturated Monochromes)
| Token | Hex | Use |
|-------|-----|-----|
| `--ng-status-green` | `#7BAA8E` | Success (muted sage) |
| `--ng-status-red` | `#B07878` | Danger (muted rose) |
| `--ng-status-blue` | `#7898B0` | Info (muted steel) |
| `--ng-status-amber` | `#A8986C` | Warning (muted bronze) |

---

## Glow System — The Defining Effect

The electric cyan backlit glow is applied via `box-shadow` and `text-shadow` at three intensities:

| Token | CSS Property | Use |
|-------|-------------|-----|
| `--ng-glow-tight` | box-shadow | Cards, badges, buttons |
| `--ng-glow-medium` | box-shadow | Logo plates, featured panels |
| `--ng-glow-wide` | box-shadow | Hero areas, full logo treatment |
| `--ng-glow-text` | text-shadow | Glowing text headings |

**CSS Classes:** `.ng-glow-tight`, `.ng-glow-medium`, `.ng-glow-wide`, `.ng-glow-text`, `.ng-glow-border`, `.ng-glow-pulse`

**Principle:** The glow emanates outward from behind dark elements (like backlit signage at night). It bleeds, spreads, and fades — never a sharp-edged flat color.

---

## Emboss System — Static Depth

From Image 1's letterpress/debossed metallic look:

| Token | CSS Property | Use |
|-------|-------------|-----|
| `--ng-emboss-text` | text-shadow | Standard embossed text |
| `--ng-emboss-text-deep` | text-shadow | Hero/display text |
| `--ng-emboss-raised` | box-shadow | Raised panel surfaces |
| `--ng-emboss-inset` | box-shadow | Inset input fields |

---

## Typography

| Role | Font | Weight | Color | Effect |
|------|------|--------|-------|--------|
| Brand Name (digital) | Exo 2 | 600 | platinum | glow-text |
| Brand Name (print) | Exo 2 | 600 | silver | emboss-text-deep |
| Brand Sub ("BIOTECH") | Exo 2 | 300 | silver | emboss, tracking: 5px |
| Section Heading | Exo 2 | 700 | silver | emboss-text |
| Active Heading | Exo 2 | 700 | cyan-bright | glow-text |
| Sub Heading | Exo 2 | 500 | pewter | none |
| Section Label | Exo 2 | 700 | slate | caps, 3.5px tracking |
| Body Default | Exo 2 | 400 | chrome | none |
| Data Values | JetBrains Mono | 400 | pewter | none |

---

## Design Principles

1. **Steel foundation, glow activation** — The monochromatic steel palette is always present. Cyan glow activates on interactive/active states only.
2. **Backlit halo, not flat fill** — The cyan is a radiating glow emanating from behind dark silhouettes, with multi-layered box-shadows that spread and fade.
3. **Dark silhouette + halo** — Logo bird is a dark fill with cyan stroke/glow behind it (Image 2), not a bright colored fill.
4. **Emboss for structure, glow for interaction** — Static elements use the emboss text-shadow. Active/interactive elements use the glow.
5. **Brushed metal texture** — Fine vertical CSS repeating-linear-gradient on page backgrounds.
6. **Frosted molecular overlays** — DNA, neurons, molecules at 5-12% opacity. Silver default, with occasional warm amber reflections (Image 2).
7. **Ultra-wide-tracked subordinate text** — "BIOTECH" treatment: weight 300, tracking 3.5-5.5px, uppercase, embossed.
8. **Desaturated status** — Green, red, blue, amber shifted heavily toward grey.

---

## Evolution from Previous Versions

| v3 (Aqua/Sea Green) | v4 (Monochromatic Steel) | v5 (Steel + Cyan Glow) |
|---------------------|-------------------------|------------------------|
| Flat aqua #5CE0D2 | Silver #A8B2BE only | Silver + Cyan #00E5FF glow |
| No glow effects | Emboss effects only | Emboss + backlit glow halos |
| Barlow font | Exo 2 font | Exo 2 font |
| No texture | Brushed metal | Brushed metal |
| Single mode | Single mode | Dual mode (static/active) |
| No logo plate | — | Dark recessed logo plate |

---

*Nightingale BioTech · Brand Identity System v5.0 · February 2026*
