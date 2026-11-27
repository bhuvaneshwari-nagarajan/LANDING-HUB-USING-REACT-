import { useState, useEffect } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import './SpatialHUD.css'

const WAYPOINT_ICONS = [
  // 01 Arrival
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L4 20h16L12 3z" />
  </svg>,
  // 02 Architecture
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>,
  // 03 Advisory
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 3 2 8 12 13 22 8 12 3" />
    <polyline points="2 16 12 21 22 16" />
  </svg>,
  // 04 Residences
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>,
  // 05 Private Desk
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
]

const RESIDENCE_FILMS = [
  {
    id: 'penthouse',
    label: 'Sky Penthouses',
    district: 'Downtown Dubai',
    src: '/assets/hero/hero-penthouse.mp4',
    poster: '/assets/images/image-01.jpeg',
  },
  {
    id: 'coastal',
    label: 'Coastal Villas',
    district: 'Palm Jumeirah',
    src: '/assets/experience/experience-villa.mp4',
    poster: '/assets/images/image-02.jpeg',
  },
  {
    id: 'estates',
    label: 'Private Estates',
    district: 'Emirates Hills',
    src: '/assets/features/feat-family.mp4',
    poster: '/assets/images/image-03.jpeg',
  },
]

export function SpatialHUD({ activeStep, onSelectStep }) {
  const { language, setLanguage, isRTL } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [filmOpen, setFilmOpen] = useState(false)
  const [activeFilm, setActiveFilm] = useState(0)
  const [contactOpen, setContactOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' })

  const chapters = isRTL
    ? [
        {
          id: 'arrival',
          kicker: 'دبي · الإمارات',
          title: 'جد مكانك في دبي.',
          line: 'منظور معماري متأنٍ للعقارات والتمويل الخاص.',
        },
        {
          id: 'architecture',
          kicker: 'العمارة',
          title: 'مساحات مصممة للغد.',
          line: 'فلل شاطئية وشقق بنتهاوس مختارة بعناية.',
        },
        {
          id: 'advisory',
          kicker: 'الاستشارات',
          title: 'دقة في العقار والتمويل.',
          line: 'استشارات مستقلة ومقارنات بنكية شاملة في الإمارات.',
        },
        {
          id: 'residences',
          kicker: 'المساكن',
          title: 'جولة معمارية حية.',
          line: 'استكشف أفخم المساكن عبر العروض المرئية.',
          action: 'مشاهدة الفيلم المعماري',
          actionType: 'film',
        },
        {
          id: 'desk',
          kicker: 'مكتب الاستشارات',
          title: 'خطوتك التالية تبدأ هنا.',
          line: 'مكتب 909، برج إم إيه آي، النهدة 1، دبي.',
          action: 'تواصل مع المستشار',
          actionType: 'contact',
        },
      ]
    : [
        {
          id: 'arrival',
          kicker: 'DUBAI · UAE',
          title: 'Find your place in Dubai.',
          line: 'An architectural approach to private property & lending.',
        },
        {
          id: 'architecture',
          kicker: 'ARCHITECTURE',
          title: 'Spaces shaped for permanence.',
          line: 'Curated waterfront pavilions, villas, and sky residences.',
        },
        {
          id: 'advisory',
          kicker: 'ADVISORY',
          title: 'Independent acquisition & debt.',
          line: 'Whole-of-market UAE mortgage structuring and DLD conveyance.',
        },
        {
          id: 'residences',
          kicker: 'RESIDENCES',
          title: 'Enter the living environment.',
          line: 'Experience our curated architectural perspectives.',
          action: 'View Architectural Film',
          actionType: 'film',
        },
        {
          id: 'desk',
          kicker: 'PRIVATE DESK',
          title: 'Your move begins here.',
          line: 'Suite 909, MAI Tower, Al Nahda 1, Dubai.',
          action: 'Connect Privately',
          actionType: 'contact',
        },
      ]

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setFilmOpen(false)
        setContactOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const current = chapters[activeStep] || chapters[0]
  const whatsappUrl =
    'https://wa.me/97148005363?text=' +
    encodeURIComponent('Hello LAND HUB, I would like to inquire about private client advisory.')

  const handleAction = () => {
    if (current.actionType === 'film') setFilmOpen(true)
    if (current.actionType === 'contact') setContactOpen(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', contact: '', message: '' })
      setContactOpen(false)
    }, 2600)
  }

  return (
    <>
      {/* Minimal Corner Brand Mark (No Navbar Bar) */}
      <button
        type="button"
        className="lh-spatial-brand"
        onClick={() => onSelectStep(0)}
        aria-label="LAND HUB Home"
      >
        <span className="lh-spatial-bars" aria-hidden="true">
          <span className="b1" />
          <span className="b2" />
          <span className="b3" />
        </span>
        <span className="lh-spatial-wordmark">LAND HUB</span>
      </button>

      {/* Hidden Navigation Trigger (Reveals Menu Only on Deliberate Click) */}
      <button
        type="button"
        className={`lh-spatial-menu-trigger ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close Index' : 'Open Index'}
      >
        <span className="lh-trigger-line l1" />
        <span className="lh-trigger-line l2" />
      </button>

      {/* Left-Side Symbol-Only Camera Waypoint Rail */}
      <nav className="lh-spatial-rail" aria-label="3D Viewpoints">
        <div className="lh-rail-spine" aria-hidden="true">
          <div
            className="lh-rail-progress"
            style={{ height: `${(activeStep / (chapters.length - 1)) * 100}%` }}
          />
        </div>
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            className={`lh-rail-node ${activeStep === idx ? 'is-active' : ''}`}
            onClick={() => onSelectStep(idx)}
            aria-label={ch.kicker}
            aria-current={activeStep === idx ? 'step' : undefined}
          >
            <span className="lh-rail-icon" aria-hidden="true">
              {WAYPOINT_ICONS[idx]}
            </span>
            <span className="lh-rail-tooltip" role="tooltip">
              {ch.kicker}
            </span>
          </button>
        ))}
      </nav>

      {/* Minimal Floating Chapter Caption (Lower Left) */}
      <div className="lh-spatial-caption" key={current.id}>
        <div className="lh-caption-kicker">
          <span className="lh-caption-dot" aria-hidden="true" />
          <span>{current.kicker}</span>
        </div>
        <h1 className="lh-caption-title">{current.title}</h1>
        <p className="lh-caption-line">{current.line}</p>
        {current.action && (
          <button type="button" className="lh-caption-cta" onClick={handleAction}>
            <span>{current.action}</span>
            <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
          </button>
        )}
      </div>

      {/* Bottom-Right Minimal Camera Step & Scroll Cue */}
      <div className="lh-spatial-counter" aria-hidden="true">
        <span className="lh-counter-curr">0{activeStep + 1}</span>
        <span className="lh-counter-sep">/</span>
        <span className="lh-counter-total">0{chapters.length}</span>
        {activeStep < chapters.length - 1 && (
          <button
            type="button"
            className="lh-scroll-next-btn"
            onClick={() => onSelectStep(activeStep + 1)}
            aria-label="Next viewpoint"
          >
            SCROLL &darr;
          </button>
        )}
      </div>

      {/* Deliberate Index Overlay (Hidden Until Clicked) */}
      {menuOpen && (
        <div className="lh-spatial-overlay" role="dialog" aria-label="Spatial Index">
          <div className="lh-overlay-inner">
            <div className="lh-overlay-top">
              <div className="lh-lang-group" role="group" aria-label="Language">
                <button
                  type="button"
                  className={language === 'en' ? 'is-active' : ''}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <span>/</span>
                <button
                  type="button"
                  className={language === 'ar' ? 'is-active' : ''}
                  onClick={() => setLanguage('ar')}
                >
                  AR
                </button>
              </div>
              <button
                type="button"
                className="lh-overlay-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close Index"
              >
                &times;
              </button>
            </div>

            <ul className="lh-overlay-list">
              {chapters.map((ch, idx) => (
                <li key={ch.id}>
                  <button
                    type="button"
                    className={`lh-overlay-item ${activeStep === idx ? 'is-active' : ''}`}
                    onClick={() => {
                      onSelectStep(idx)
                      setMenuOpen(false)
                    }}
                  >
                    <span className="lh-ov-idx">0{idx + 1}</span>
                    <span className="lh-ov-title">{ch.kicker}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="lh-overlay-footer">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="lh-ov-wa">
                WhatsApp Advisory &rarr;
              </a>
              <span className="lh-ov-addr">Suite 909, MAI Tower, Al Nahda 1, Dubai</span>
            </div>
          </div>
        </div>
      )}

      {/* Architectural Film Modal (04 · Residences) */}
      {filmOpen && (
        <div className="lh-modal-backdrop" role="dialog" aria-label="Architectural Film">
          <div className="lh-film-modal">
            <button
              type="button"
              className="lh-modal-close"
              onClick={() => setFilmOpen(false)}
              aria-label="Close Film"
            >
              &times;
            </button>
            <video
              key={RESIDENCE_FILMS[activeFilm].src}
              className="lh-film-video"
              autoPlay
              muted
              loop
              playsInline
              controls
              poster={RESIDENCE_FILMS[activeFilm].poster}
            >
              <source src={RESIDENCE_FILMS[activeFilm].src} type="video/mp4" />
            </video>
            <div className="lh-film-tabs">
              {RESIDENCE_FILMS.map((film, idx) => (
                <button
                  key={film.id}
                  type="button"
                  className={activeFilm === idx ? 'is-active' : ''}
                  onClick={() => setActiveFilm(idx)}
                >
                  <span>{film.label}</span>
                  <small>{film.district}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Private Desk Inquiry Modal (05 · Contact) */}
      {contactOpen && (
        <div className="lh-modal-backdrop" role="dialog" aria-label="Private Advisory Inquiry">
          <div className="lh-contact-modal">
            <button
              type="button"
              className="lh-modal-close"
              onClick={() => setContactOpen(false)}
              aria-label="Close Inquiry"
            >
              &times;
            </button>
            <span className="lh-modal-kicker">PRIVATE DESK · DUBAI</span>
            <h2 className="lh-modal-title">Direct Consultation</h2>
            {submitted ? (
              <div className="lh-modal-success">
                Enquiry received. An advisor will respond within 24 hours.
              </div>
            ) : (
              <form className="lh-modal-form" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="text"
                  required
                  placeholder="Email or Phone"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
                <textarea
                  rows="3"
                  placeholder="Criteria or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <div className="lh-modal-actions">
                  <button type="submit" className="lh-modal-submit">
                    Send Enquiry &rarr;
                  </button>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="lh-modal-wa">
                    WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
