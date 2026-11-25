import { useState, useEffect } from 'react'
import './VerticalMinibar.css'

const SECTIONS = [
  {
    id: 'hero',
    label: 'Top',
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 21h16L12 2z" />
        <line x1="12" y1="8" x2="12" y2="16" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="9" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    id: 'features',
    label: 'Services',
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="12" y1="3" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'process',
    label: 'Process',
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="8" y1="10" x2="16" y2="10" />
      </svg>
    ),
  },
]

export function VerticalMinibar() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id)
          return
        }
      }
      setActiveSection('hero')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const activeIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === activeSection))

  return (
    <nav
      className="lh-vertical-symbol-nav"
      aria-label="Section Navigation"
    >
      <div className="lh-symbol-nav-track">
        {/* Continuous Slim Connecting Line */}
        <div className="lh-symbol-nav-spine" aria-hidden="true">
          <div
            className="lh-symbol-spine-progress"
            style={{
              height: `${(activeIndex / (SECTIONS.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Animated Sliding Active Indicator Badge */}
        <div
          className="lh-symbol-active-indicator"
          style={{
            transform: `translate3d(0, ${activeIndex * 48}px, 0)`,
          }}
          aria-hidden="true"
        >
          <span className="lh-indicator-beacon" />
        </div>

        {/* Vertical Symbols Stack */}
        <div className="lh-symbol-markers-list">
          {SECTIONS.map((sec, idx) => {
            const isActive = activeSection === sec.id

            return (
              <button
                key={sec.id}
                type="button"
                className={`lh-symbol-item ${isActive ? 'is-active' : ''}`}
                onClick={() => handleScrollTo(sec.id)}
                aria-label={`Navigate to ${sec.label}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                <div className="lh-symbol-icon-wrap" aria-hidden="true">
                  {sec.symbol}
                </div>

                {/* Micro Tooltip */}
                <span className="lh-symbol-tooltip" role="tooltip">
                  <span className="lh-tooltip-index">0{idx + 1}</span>
                  <span className="lh-tooltip-label">{sec.label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
