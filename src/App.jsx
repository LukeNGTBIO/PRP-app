import { useState } from 'react'
import PRP from './PRP.jsx'
import MethodistIntelDashboard from './MethodistIntelDashboard.jsx'

function App() {
  const [activePage, setActivePage] = useState('prp')

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
        gap: 8,
        fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
      }}>
        <span style={{
          color: '#D4A860',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          marginRight: 16,
          padding: '14px 0',
        }}>
          NIGHTINGALE BIOTECH
        </span>
        <button
          onClick={() => setActivePage('prp')}
          style={{
            background: activePage === 'prp' ? '#D4A860' : 'transparent',
            border: '2px solid transparent',
            borderBottom: activePage === 'prp' ? '2px solid #D4A860' : '2px solid transparent',
            color: activePage === 'prp' ? '#1a1a2e' : '#aaa',
            padding: '12px 20px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            borderRadius: '6px 6px 0 0',
            letterSpacing: 0.5,
          }}
        >
          PRP Competitive Landscape
        </button>
        <button
          onClick={() => setActivePage('methodist')}
          style={{
            background: activePage === 'methodist' ? '#D4A860' : 'transparent',
            border: '2px solid transparent',
            borderBottom: activePage === 'methodist' ? '2px solid #D4A860' : '2px solid transparent',
            color: activePage === 'methodist' ? '#1a1a2e' : '#aaa',
            padding: '12px 20px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            borderRadius: '6px 6px 0 0',
            letterSpacing: 0.5,
          }}
        >
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
