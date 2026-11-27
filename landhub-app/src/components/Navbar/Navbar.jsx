import { useState, useEffect, useCallback } from 'react'
import { useScrollNavbar } from '../../hooks/useScrollNavbar'
import { useLanguage } from '../../hooks/useLanguage'
import './Navbar.css'

export function Navbar() {
  const isScrolled = useScrollNavbar(30)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { language, setLanguage, t, isRTL } = useLanguage()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'features', 'experience', 'process', 'faq', 'contact']
      const scrollPos = window.scrollY + 240
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          return
        }
      }
      setActiveSection('')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t('navAbout'), href: '#about', id: 'about' },
    { label: t('navServices'), href: '#features', id: 'features' },
    { label: t('navExperience'), href: '#experience', id: 'experience' },
    { label: t('navProcess'), href: '#process', id: 'process' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: t('navContact'), href: '#contact', id: 'contact' },
  ]

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const targetId = href.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const whatsappUrl =
    'https://wa.me/97148005363?text=' +
    encodeURIComponent('Hello LAND HUB, I would like to inquire about private client advisory.')

  return (
    <header className={`lh-prypco-header ${isScrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}>
      {/* Floating White Pill Container (Desktop) / Transparent Header (Mobile) */}
      <div className="lh-header-pill">
        {/* Left: Language Selector Pill */}
        <div className="lh-header-left">
          <div className="lh-globe-pill" role="group" aria-label="Language Selector">
            <button
              type="button"
              className={language === 'en' ? 'is-active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span className="lh-pill-sep" aria-hidden="true">/</span>
            <button
              type="button"
              className={language === 'ar' ? 'is-active' : ''}
              onClick={() => setLanguage('ar')}
            >
              AR
            </button>
          </div>
        </div>

        {/* Center: Official LAND HUB Brand Wordmark */}
        <a href="#hero" className="lh-header-brand" aria-label="LAND HUB Home">
          <span className="lh-brand-bars" aria-hidden="true">
            <span className="b1" />
            <span className="b2" />
            <span className="b3" />
          </span>
          <span className="lh-brand-wordmark">LAND HUB</span>
        </a>

        {/* Right: Black Pill "Menu" Button */}
        <div className="lh-header-right">
          <button
            type="button"
            className={`lh-menu-pill-btn ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <span className="lh-menu-label">{menuOpen ? 'Close' : 'Menu'}</span>
            <span className="lh-menu-lines" aria-hidden="true">
              <span className="line t" />
              <span className="line b" />
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Mega-Dropdown Card */}
      {menuOpen && (
        <div className="lh-mega-dropdown" role="dialog" aria-label="Site Navigation">
          <div className="lh-mega-grid">
            <div className="lh-mega-col">
              <span className="lh-mega-heading">EXPLORE</span>
              <ul className="lh-mega-list">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`lh-mega-link ${activeSection === item.id ? 'is-active' : ''}`}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lh-mega-col lh-mega-advisory">
              <span className="lh-mega-heading">DUBAI ADVISORY DESK</span>
              <p className="lh-mega-addr">
                Office 909, MAI Tower, Al Nahda 1<br />
                Dubai, United Arab Emirates
              </p>
              <a href="tel:+97148005363" className="lh-mega-phone">
                +971 4 800 5363
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lh-mega-wa-btn"
              >
                <span className="lh-wa-dot" aria-hidden="true" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
