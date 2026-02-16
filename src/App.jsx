import { useState, useEffect } from 'react'
import PRP from './PRP.jsx'
import PRP_Mobile from './PRP_Mobile.jsx'
import MethodistIntelDashboard from './MethodistIntelDashboard.jsx'
import MethodistIntelDashboard_Mobile from './MethodistIntelDashboard_Mobile.jsx'
import ActiGraftManual from './ActiGraftManual.jsx'
import ActiGraftCalculator from './ActiGraftCalculator.jsx'
import nbLogoWhite from './assets/nb-logo-white.png'
import { NIGHTINGALE } from './brandTheme'

// Force fresh deployment - Feb 16, 2026
function App() {
  const [activePage, setActivePage] = useState('prp')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const tabStyle = (isActive) => ({
    background: isActive ? NIGHTINGALE.cyan.bgActive : 'transparent',
    border: 'none',
    borderBottom: isActive ? `2px solid ${NIGHTINGALE.cyan.core}` : '2px solid transparent',
    color: isActive ? NIGHTINGALE.cyan.bright : NIGHTINGALE.text.pewter,
    padding: isMobile ? '10px 12px' : '12px 20px',
    fontSize: isMobile ? NIGHTINGALE.fontSize.sm : NIGHTINGALE.fontSize.md,
    fontWeight: isActive ? 700 : 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderRadius: '5px 5px 0 0',
    letterSpacing: 0.3,
    minHeight: 44,
    fontFamily: NIGHTINGALE.font.primary,
    textShadow: isActive ? NIGHTINGALE.glow.text : 'none',
    boxShadow: isActive ? `${NIGHTINGALE.glow.tight}` : 'none',
  })

  return (
    <div style={{
      background: NIGHTINGALE.bg.base,
      backgroundImage: NIGHTINGALE.texture.brushed,
      minHeight: '100vh'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: NIGHTINGALE.bg.header,
        borderBottom: `1px solid ${NIGHTINGALE.border.default}`,
        padding: isMobile ? '0 12px' : '0 32px',
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? 8 : 16,
        fontFamily: NIGHTINGALE.font.primary,
        overflowX: isMobile ? 'auto' : 'visible',
        WebkitOverflowScrolling: 'touch',
        boxShadow: NIGHTINGALE.shadow.md,
      }}>
        <div style={{
          marginRight: isMobile ? 8 : 12,
          padding: '6px 0',
          flexShrink: 0,
        }}>
          <img
            src={nbLogoWhite}
            alt="Nightingale Biotech"
            style={{ height: isMobile ? 28 : 36, width: 'auto' }}
          />
        </div>
        <button onClick={() => setActivePage('prp')} style={tabStyle(activePage === 'prp')}>
          {isMobile ? 'PRP' : 'PRP Competitive Landscape'}
        </button>
        <button onClick={() => setActivePage('methodist')} style={tabStyle(activePage === 'methodist')}>
          {isMobile ? 'Methodist' : 'Methodist Hospital Intel'}
        </button>
        <button onClick={() => setActivePage('calculator')} style={tabStyle(activePage === 'calculator')}>
          {isMobile ? 'Calculator' : 'ROI Calculator'}
        </button>
        <button onClick={() => setActivePage('manual')} style={tabStyle(activePage === 'manual')}>
          {isMobile ? 'Manual' : 'Manual & Training'}
        </button>
        <button onClick={() => setActivePage('calculator')} style={tabStyle(activePage === 'calculator')}>
          {isMobile ? 'ROI Calc' : 'ROI Calculator'}
        </button>
      </nav>

      {/* Page Content */}
      {activePage === 'prp' && (isMobile ? <PRP_Mobile /> : <PRP />)}
      {activePage === 'methodist' && (isMobile ? <MethodistIntelDashboard_Mobile /> : <MethodistIntelDashboard />)}
      {activePage === 'calculator' && <ActiGraftCalculator />}
      {activePage === 'manual' && <ActiGraftManual />}
      {activePage === 'calculator' && <ActiGraftCalculator />}
    </div>
  )
}

export default App
