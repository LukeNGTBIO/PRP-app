import { useState } from 'react'
import PRP from './PRP.jsx'
import MethodistIntelDashboard from './MethodistIntelDashboard.jsx'

function App() {
  const [activePage, setActivePage] = useState('prp')

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#0A1526',
        borderBottom: '2px solid #1A3050',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: "'Roboto', 'Segoe UI', system-ui, sans-serif",
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #449AF6, #FEBE11)',
          padding: '6px 10px',
          borderRadius: 8,
          fontWeight: 800,
          fontSize: 13,
          color: '#0A1526',
          letterSpacing: -0.3,
          marginRight: 12,
        }}>
          NB
        </div>
        <button
          onClick={() => setActivePage('prp')}
          style={{
            background: activePage === 'prp' ? 'rgba(68,154,246,0.15)' : 'transparent',
            border: activePage === 'prp' ? '1px solid rgba(68,154,246,0.3)' : '1px solid transparent',
            borderBottom: activePage === 'prp' ? '2px solid #449AF6' : '2px solid transparent',
            color: activePage === 'prp' ? '#449AF6' : '#8FA8BE',
            padding: '14px 20px',
            fontSize: 14,
            fontWeight: activePage === 'prp' ? 700 : 400,
            cursor: 'pointer',
            transition: 'all 0.2s',
            borderRadius: '8px 8px 0 0',
          }}
        >
          PRP Competitive Landscape
        </button>
        <button
          onClick={() => setActivePage('methodist')}
          style={{
            background: activePage === 'methodist' ? 'rgba(68,154,246,0.15)' : 'transparent',
            border: activePage === 'methodist' ? '1px solid rgba(68,154,246,0.3)' : '1px solid transparent',
            borderBottom: activePage === 'methodist' ? '2px solid #449AF6' : '2px solid transparent',
            color: activePage === 'methodist' ? '#449AF6' : '#8FA8BE',
            padding: '14px 20px',
            fontSize: 14,
            fontWeight: activePage === 'methodist' ? 700 : 400,
            cursor: 'pointer',
            transition: 'all 0.2s',
            borderRadius: '8px 8px 0 0',
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
