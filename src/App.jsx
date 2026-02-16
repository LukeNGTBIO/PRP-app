import { useState } from 'react'
import PRP from './PRP.jsx'
import MethodistIntelDashboard from './MethodistIntelDashboard.jsx'
import nbBirdWhite from './assets/nb-bird-white.png'

function App() {
  const [activePage, setActivePage] = useState('prp')

  const tabStyle = (isActive) => ({
    background: isActive ? '#D4A860' : 'transparent',
    border: '2px solid transparent',
    borderBottom: isActive ? '2px solid #D4A860' : '2px solid transparent',
    color: isActive ? '#1a1a2e' : '#aaa',
    padding: '12px 20px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    borderRadius: '6px 6px 0 0',
    letterSpacing: 0.5,
  })

  return (
    <div style={{ background: '#f0efe8', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#1a1a2e',
        borderBottom: '2px solid #D4A860',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginRight: 16,
          padding: '8px 0',
        }}>
          <img
            src={nbBirdWhite}
            alt="Nightingale Biotech"
            style={{ height: 32, width: 'auto', filter: 'brightness(1.1)' }}
          />
          <span style={{
            color: '#D4A860',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            lineHeight: 1.2,
          }}>
            NIGHTINGALE<br />BIOTECH
          </span>
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
