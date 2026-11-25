import { useState, useEffect, useCallback } from 'react'
import { useScrollNavbar } from '../../hooks/useScrollNavbar'
import { useLanguage } from '../../hooks/useLanguage'
import './Navbar.css'

export function Navbar() {
  const isScrolled = useScrollNavbar(30)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { language, setLanguage, t, isRTL } = useLanguage()

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Prevent background scroll when menu drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Active section observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'features', 'experience', 'process', 'contact']
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

  // Clean navigation items with NO numbering
  const navItems = [
    { label: t('navAbout'), href: '#about', id: 'about', desc: 'Philosophy & Fiduciary Stewardship' },
    { label: t('navServices'), href: '#features', id: 'features', desc: 'Acquisition & Financial Architecture' },
    { label: t('navExperience'), href: '#experience', id: 'experience', desc: 'Curated Living Perspectives' },
    { label: t('navProcess'), href: '#process', id: 'process', desc: 'Client Journey & Progression' },
    { label: t('navContact'), href: '#contact', id: 'contact', desc: 'Private Advisory Consultation' },
  ]

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      targetElement.classList.add('lh-chapter-entering')
      setTimeout(() => {
        targetElement.classList.remove('lh-chapter-entering')
      }, 1000)
    }
  }, [])

  const whatsappUrl = 'https://wa.me/97148005363?text=' + encodeURIComponent('Hello LAND HUB, I would like to inquire about private client advisory services.')

  return (
    <>
      <header className={`lh-navbar ${isScrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-active-menu' : ''}`}>
        <div className="lh-navbar-container">
          {/* Brand Logo & DXB Tagline */}
          <a href="#" className="lh-brand-link" aria-label="LAND HUB Home">
            <div className="lh-brand-mark">
              <span className="lh-brand-bar bar-1" />
              <span className="lh-brand-bar bar-2" />
              <span className="lh-brand-bar bar-3" />
            </div>
            <div className="lh-brand-text-group">
              <span className="lh-brand-name">LAND HUB</span>
              <span className="lh-brand-sub">DUBAI &middot; REAL ESTATE</span>
            </div>
          </a>

          {/* Clean Desktop Navigation Links (NO Numbers) */}
          <nav className="lh-nav-inline" aria-label="Main Navigation">
            <ul className="lh-nav-inline-list">
              {navItems.map((item) => (
                <li key={item.id} className="lh-nav-inline-item">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`lh-nav-inline-link ${activeSection === item.id ? 'is-current' : ''}`}
                  >
                    <span className="lh-inline-title">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Utilities */}
          <div className="lh-navbar-actions">
            {/* Language Selector */}
            <div className="lh-nav-lang-switch" role="group" aria-label="Language Selector">
              <button
                type="button"
                className={`lh-lang-toggle ${language === 'en' ? 'is-active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
              <span className="lh-lang-sep" aria-hidden="true">/</span>
              <button
                type="button"
                className={`lh-lang-toggle ${language === 'ar' ? 'is-active' : ''}`}
                onClick={() => setLanguage('ar')}
                aria-pressed={language === 'ar'}
              >
                AR
              </button>
            </div>

            {/* Quick Contact Link */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="lh-nav-consult-btn"
            >
              <span>{t('navAdvisoryDesk')}</span>
              <span className="lh-btn-dir-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
            </a>

            {/* Minimal Menu Trigger Button */}
            <button
              type="button"
              className={`lh-nav-menu-btn ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close Navigation Drawer' : 'Open Navigation Drawer'}
            >
              <span className="lh-menu-btn-label">{menuOpen ? 'CLOSE' : 'MENU'}</span>
              <span className="lh-menu-hamburger" aria-hidden="true">
                <span className="lh-bar bar-top" />
                <span className="lh-bar bar-bottom" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Elegant Drawer Reveal (NO Numbers) */}
      <div
        className={`lh-nav-drawer-backdrop ${menuOpen ? 'is-visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <aside
        className={`lh-nav-drawer ${menuOpen ? 'is-open' : ''}`}
        aria-label="Navigation Menu"
        aria-hidden={!menuOpen}
      >
        <div className="lh-nav-drawer-inner">
          {/* Drawer Header */}
          <div className="lh-drawer-top">
            <div className="lh-drawer-brand">
              <span className="lh-drawer-logo">LAND HUB</span>
              <span className="lh-drawer-loc">DUBAI &middot; UAE</span>
            </div>
            <button
              type="button"
              className="lh-drawer-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close Menu"
            >
              &times;
            </button>
          </div>

          <div className="lh-drawer-kicker">
            <span className="lh-kicker-dot" />
            <span>A considered move starts here.</span>
          </div>

          {/* Navigation Links with NO Numbers */}
          <nav className="lh-drawer-nav" aria-label="Drawer Menu">
            <ul className="lh-drawer-list">
              {navItems.map((item, index) => (
                <li
                  key={item.id}
                  className="lh-drawer-item"
                  style={{ '--drawer-index': index }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`lh-drawer-link ${activeSection === item.id ? 'is-active' : ''}`}
                  >
                    <div className="lh-drawer-text">
                      <span className="lh-drawer-title">{item.label}</span>
                      <span className="lh-drawer-desc">{item.desc}</span>
                    </div>
                    <span className="lh-drawer-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Drawer Footer Utilities */}
          <div className="lh-drawer-footer">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lh-drawer-whatsapp-btn"
            >
              <span className="lh-wa-dot" />
              <span>Direct WhatsApp Concierge</span>
            </a>

            <div className="lh-drawer-meta-info">
              <p className="lh-drawer-contact-line">Office 909, MAI Tower, Dubai, UAE</p>
              <p className="lh-drawer-phone-line">+971 4 800 LENDING (5363)</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
