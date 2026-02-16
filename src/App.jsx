import { useState } from 'react'
import PRP from './PRP.jsx'
import MethodistIntelDashboard from './MethodistIntelDashboard.jsx'
import nbLogoWhite from './assets/nb-logo-white.png'

function App() {
  const [activePage, setActivePage] = useState('prp')

  const tabStyle = (isActive) => ({
    background: isActive ? '#5CE0D2' : 'transparent',
    border: '2px solid transparent',
    borderBottom: isActive ? '2px solid #5CE0D2' : '2px solid transparent',
    color: isActive ? '#0A0E14' : '#5E6E7E',
    padding: '12px 20px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    borderRadius: '6px 6px 0 0',
    letterSpacing: 0.5,
  })

  return (
    <div style={{ background: '#0A0E14', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#090C12',
        borderBottom: '1px solid #2A4050',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontFamily: "'Barlow', 'Helvetica Neue', Arial, sans-serif",
      }}>
        <div style={{
          marginRight: 12,
          padding: '6px 0',
          flexShrink: 0,
        }}>
          <img
            src={nbLogoWhite}
            alt="Nightingale Biotech"
            style={{ height: 36, width: 'auto' }}
          />
        </div>
        <button onClick={() => setActivePage('prp')} style={tabStyle(activePage === 'prp')}>
          PRP Competitive Landscape
        </button>
        <button onClick={() => setActivePage('methodist')} style={tabStyle(activePage === 'methodist')}>
          Methodist Hospital Intel
        </button>
      </nav>

      {/* Page Content */}
      {activePage === 'prp' && <PRP />}
      {activePage === 'methodist' && <MethodistIntelDashboard />}
    </div>
  )
}

export default App
