import { useLanguage } from '../../hooks/useLanguage'
import './Footer.css'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t, isRTL } = useLanguage()

  const navLinks = [
    { label: t('navAbout'), href: '#about' },
    { label: t('navServices'), href: '#features' },
    { label: t('navExperience'), href: '#experience' },
    { label: t('navProcess'), href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: t('navContact'), href: '#contact' },
  ]

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const whatsappUrl =
    'https://wa.me/97148005363?text=' +
    encodeURIComponent('Hello LAND HUB, I would like to inquire about private client advisory services.')

  return (
    <footer className="lh-footer" aria-label="Global Footer">
      <div className="lh-footer-container">
        <div className="lh-footer-grid">
          {/* Left Column: Brand & Address */}
          <div className="lh-footer-brand-col">
            <div className="lh-footer-brand-row">
              <div className="lh-brand-mark">
                <span className="lh-brand-bar bar-1" />
                <span className="lh-brand-bar bar-2" />
                <span className="lh-brand-bar bar-3" />
              </div>
              <span className="lh-footer-brand-title">LAND HUB</span>
            </div>
            <p className="lh-footer-brand-slogan">Find your place. Make your move.</p>
            <p className="lh-footer-address">
              Office 909, MAI Tower, Al Nahda 1, Dubai, United Arab Emirates
            </p>
          </div>

          {/* Center Column: Navigation */}
          <div className="lh-footer-nav-col">
            <span className="lh-footer-col-heading">NAVIGATION</span>
            <ul className="lh-footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="lh-footer-nav-link">
                    <span className="lh-footer-link-label">{link.label}</span>
                    <span className="lh-footer-link-arrow" aria-hidden="true">
                      {isRTL ? '←' : '→'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Direct Concierge */}
          <div className="lh-footer-contact-col">
            <span className="lh-footer-col-heading">DIRECT CONCIERGE</span>
            <div className="lh-footer-contact-stack">
              <div className="lh-footer-line-item">
                <span className="lh-footer-line-lbl">Private Line</span>
                <a href="tel:+97148005363" className="lh-footer-line-val">
                  +971 4 800 5363
                </a>
              </div>
              <div className="lh-footer-line-item">
                <span className="lh-footer-line-lbl">Concierge Desk</span>
                <a href="mailto:private@landhub.ae" className="lh-footer-line-val">
                  private@landhub.ae
                </a>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lh-footer-wa-link"
              >
                <span className="lh-footer-wa-dot" />
                <span>WhatsApp Client Desk</span>
              </a>
            </div>

            <div className="lh-footer-top-anchor">
              <a href="#hero" onClick={scrollToTop} className="lh-back-to-top">
                <span>Back to top</span>
                <span aria-hidden="true">&uarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance */}
        <div className="lh-footer-bottom-bar">
          <p className="lh-footer-copy">
            &copy; {currentYear} LAND HUB Real Estate &amp; Advisory Dubai. All rights reserved.
          </p>
          <p className="lh-footer-compliance">
            Operating in accordance with Dubai Land Department (DLD) and UAE Central Bank advisory frameworks.
          </p>
        </div>

        {/* PRYPCO-Style Monumental Background Wordmark + Tilted Brand Stickers */}
        <div className="lh-footer-wordmark-stage" aria-hidden="true">
          <span className="lh-footer-bg-wordmark">LAND HUB</span>
          <span className="lh-sticker s-red">PROPERTY ↗</span>
          <span className="lh-sticker s-white">MORTGAGE</span>
          <span className="lh-sticker s-green">CONVEYANCE</span>
        </div>
      </div>
    </footer>
  )
}
