/**
 * NIGHTINGALE BIOTECH — Tailwind CSS Theme Extension v5.0
 * Monochromatic Steel + Electric Cyan Backlit Glow
 *
 * Merge into your tailwind.config.js → theme.extend
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        ng: {
          // Backgrounds: Charcoal/Gunmetal
          deepest:    '#1A1E24',
          base:       '#22262E',
          panel:      '#282D35',
          card:       '#2E343C',
          'card-alt': '#343A44',
          elevated:   '#3C424C',
          header:     '#1E2228',
          input:      '#262C34',
          modal:      '#2A3038',
          'logo-plate': '#141820',

          // Borders: Steel Grey
          border:         '#38404C',
          'border-light': '#445060',
          'border-accent':'#506070',
          'border-focus': '#607080',
          'border-subtle':'#303840',

          // Text: Silver/Platinum Metallic Ramp
          platinum:   '#C8D0DA',
          silver:     '#A8B2BE',
          chrome:     '#909AA6',
          pewter:     '#788290',
          slate:      '#606A78',
          graphite:   '#4A5462',
          steel:      '#384250',

          // Electric Cyan Glow Source
          cyan:       '#00E5FF',
          'cyan-bright':'#5CF0FF',
          'cyan-mid': '#00BCD4',
          'cyan-dim': '#008C9E',
          'cyan-deep':'#005F6B',

          // Status (Desaturated)
          success:    '#7BAA8E',
          danger:     '#B07878',
          info:       '#7898B0',
          warning:    '#A8986C',
        }
      },
      backgroundColor: {
        'ng-cyan-tint':       'rgba(0, 229, 255, 0.04)',
        'ng-cyan-tint-hover': 'rgba(0, 229, 255, 0.07)',
        'ng-cyan-tint-active':'rgba(0, 229, 255, 0.10)',
        'ng-overlay':         'rgba(26, 30, 36, 0.90)',
        'ng-green-tint':      'rgba(123, 170, 142, 0.08)',
        'ng-red-tint':        'rgba(176, 120, 120, 0.08)',
        'ng-blue-tint':       'rgba(120, 152, 176, 0.08)',
        'ng-amber-tint':      'rgba(168, 152, 108, 0.08)',
      },
      borderColor: {
        'ng-cyan-tint':   'rgba(0, 229, 255, 0.15)',
        'ng-cyan-glow':   'rgba(0, 229, 255, 0.30)',
        'ng-green-tint':  'rgba(123, 170, 142, 0.18)',
        'ng-red-tint':    'rgba(176, 120, 120, 0.18)',
        'ng-blue-tint':   'rgba(120, 152, 176, 0.18)',
        'ng-amber-tint':  'rgba(168, 152, 108, 0.18)',
      },
      fontFamily: {
        'ng-primary': ["'Exo 2'", "'Helvetica Neue'", "Arial", "sans-serif"],
        'ng-display': ["'Libre Caslon Display'", "Georgia", "serif"],
        'ng-mono':    ["'JetBrains Mono'", "'Fira Code'", "'SF Mono'", "Consolas", "monospace"],
      },
      fontSize: {
        'ng-xs':'10px','ng-sm':'11px','ng-base':'13px','ng-md':'14px',
        'ng-lg':'16px','ng-xl':'18px','ng-2xl':'22px','ng-3xl':'28px',
        'ng-4xl':'36px','ng-5xl':'48px',
      },
      letterSpacing: {
        'ng-tight':'-0.5px','ng-wide':'0.5px','ng-wider':'1.0px',
        'ng-widest':'2.0px','ng-caps':'3.5px','ng-ultra':'5.0px',
      },
      lineHeight: {
        'ng-tight':'1.2','ng-snug':'1.35','ng-normal':'1.5',
        'ng-relaxed':'1.65','ng-loose':'1.8',
      },
      borderRadius: {
        'ng-sm':'3px','ng-md':'5px','ng-lg':'8px',
        'ng-xl':'10px','ng-2xl':'12px',
      },
      boxShadow: {
        // Standard shadows
        'ng-sm':      '0 1px 3px rgba(0,0,0,0.30)',
        'ng-md':      '0 4px 12px rgba(0,0,0,0.28)',
        'ng-lg':      '0 4px 24px rgba(0,0,0,0.22)',
        'ng-xl':      '0 8px 40px rgba(0,0,0,0.32)',
        'ng-card':    '0 2px 8px rgba(0,0,0,0.22)',
        // Emboss (Image 1 letterpress)
        'ng-emboss':  '1px 1px 3px rgba(0,0,0,0.35), -1px -1px 2px rgba(200,210,220,0.07)',
        'ng-inset':   'inset 1px 1px 3px rgba(0,0,0,0.35), inset -1px -1px 2px rgba(200,210,220,0.07)',
        // Cyan Glow Halos (Image 2 backlit signage)
        'ng-glow-tight':  '0 0 8px rgba(0,229,255,0.50), 0 0 16px rgba(0,229,255,0.25)',
        'ng-glow-medium': '0 0 12px rgba(0,229,255,0.50), 0 0 30px rgba(0,229,255,0.25), 0 0 60px rgba(0,229,255,0.10)',
        'ng-glow-wide':   '0 0 15px rgba(0,229,255,0.50), 0 0 40px rgba(0,229,255,0.30), 0 0 80px rgba(0,229,255,0.15), 0 0 120px rgba(0,229,255,0.05)',
      },
      keyframes: {
        'ng-pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(0,229,255,0.35), 0 0 30px rgba(0,229,255,0.15)' },
          '50%':      { boxShadow: '0 0 18px rgba(0,229,255,0.55), 0 0 45px rgba(0,229,255,0.28)' },
        }
      },
      animation: {
        'ng-pulse-glow': 'ng-pulse-glow 2.5s ease-in-out infinite',
      }
    }
  }
}
