// ═══════════════════════════════════════════════════════════════
//  NIGHTINGALE BIOTECH — Brand Theme v5.0
//  Monochromatic Steel + Electric Cyan Backlit Glow
// ═══════════════════════════════════════════════════════════════

export const NIGHTINGALE = {
  // Backgrounds - Steel Foundation
  bg: {
    deepest: '#1A1E24',
    base: '#22262E',
    panel: '#282D35',
    card: '#2E343C',
    cardAlt: '#343A44',
    elevated: '#3C424C',
    header: '#1E2228',
    input: '#262C34',
    logoPlate: '#141820',
    overlay: 'rgba(26,30,36,0.90)',
  },

  // Borders
  border: {
    default: '#38404C',
    light: '#445060',
    accent: '#506070',
    focus: '#607080',
    subtle: '#303840',
  },

  // Text - Silver/Platinum Ramp
  text: {
    platinum: '#C8D0DA',
    silver: '#A8B2BE',
    chrome: '#909AA6',
    pewter: '#788290',
    slate: '#606A78',
    graphite: '#4A5462',
    steel: '#384250',
  },

  // Electric Cyan - The Glow Origin
  cyan: {
    core: '#00E5FF',
    bright: '#5CF0FF',
    mid: '#00BCD4',
    dim: '#008C9E',
    deep: '#005F6B',
    bg: 'rgba(0,229,255,0.04)',
    bgHover: 'rgba(0,229,255,0.07)',
    bgActive: 'rgba(0,229,255,0.10)',
    border: 'rgba(0,229,255,0.15)',
    borderGlow: 'rgba(0,229,255,0.30)',
  },

  // Glow Effects - Backlit Halo System
  glow: {
    tight: '0 0 8px rgba(0,229,255,0.50), 0 0 16px rgba(0,229,255,0.25)',
    medium: '0 0 12px rgba(0,229,255,0.50), 0 0 30px rgba(0,229,255,0.25), 0 0 60px rgba(0,229,255,0.10)',
    wide: '0 0 15px rgba(0,229,255,0.50), 0 0 40px rgba(0,229,255,0.30), 0 0 80px rgba(0,229,255,0.15), 0 0 120px rgba(0,229,255,0.05)',
    text: '0 0 6px rgba(0,229,255,0.40), 0 0 15px rgba(0,229,255,0.20), 0 0 30px rgba(0,229,255,0.08)',
  },

  // Emboss System - Depth & Relief
  emboss: {
    text: '1px 1px 1px rgba(0,0,0,0.45), -1px -1px 0px rgba(200,210,220,0.18)',
    textDeep: '1px 2px 2px rgba(0,0,0,0.45), -1px -1px 0px rgba(200,210,220,0.18)',
    raised: '1px 1px 3px rgba(0,0,0,0.35), -1px -1px 2px rgba(200,210,220,0.07)',
    inset: 'inset 1px 1px 3px rgba(0,0,0,0.35), inset -1px -1px 2px rgba(200,210,220,0.07)',
  },

  // Molecular Frost Overlays
  frost: {
    default: 'rgba(180,190,202,0.14)',
    bright: 'rgba(210,218,228,0.20)',
    dim: 'rgba(160,170,182,0.07)',
    warm: 'rgba(210,190,160,0.12)', // Amber reflection
  },

  // Status Colors - Desaturated
  status: {
    green: { value: '#7BAA8E', bg: 'rgba(123,170,142,0.08)', border: 'rgba(123,170,142,0.18)' },
    red: { value: '#B07878', bg: 'rgba(176,120,120,0.08)', border: 'rgba(176,120,120,0.18)' },
    blue: { value: '#7898B0', bg: 'rgba(120,152,176,0.08)', border: 'rgba(120,152,176,0.18)' },
    amber: { value: '#A8986C', bg: 'rgba(168,152,108,0.08)', border: 'rgba(168,152,108,0.18)' },
  },

  // Typography
  font: {
    primary: "'Exo 2', 'Helvetica Neue', Arial, sans-serif",
    display: "'Libre Caslon Display', Georgia, serif",
    mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
  },

  // Type Scale
  fontSize: {
    xs: 10,
    sm: 11,
    base: 13,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 22,
    '3xl': 28,
    '4xl': 36,
    '5xl': 48,
  },

  // Shadows
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.30)',
    md: '0 4px 12px rgba(0,0,0,0.28)',
    lg: '0 4px 24px rgba(0,0,0,0.22)',
    xl: '0 8px 40px rgba(0,0,0,0.32)',
    card: '0 2px 8px rgba(0,0,0,0.22)',
  },

  // Chart Colors - Cyan & Steel Palette
  chart: ['#00E5FF', '#A8B2BE', '#00BCD4', '#6E7E92', '#C8D0DA'],

  // Brushed Metal Texture
  texture: {
    brushed: "repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.015) 1px, rgba(255,255,255,0.015) 2px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px)",
  },
}

// Google Font Import URL
export const FONT_IMPORT = 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Libre+Caslon+Display&display=swap'
