import { useState, useRef } from 'react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../hooks/useLanguage'
import './Features.css'

export function Features() {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 })
  const tickerRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const { t, isRTL } = useLanguage()

  // Four verified service capability cards - strictly NO visible numbers
  const featureCards = [
    {
      id: 'discovery',
      category: 'Real Estate Advisory',
      title: t('capDiscoveryTitle'),
      videoSrc: '/assets/features/feat-elevator.mp4',
      description: t('capDiscoveryDesc'),
      highlights: ['Waterfront Penthouses', 'Off-Market Estates', 'Title Conveyance'],
      scope: 'Prime Dubai Portfolio & Discretionary Sourcing',
    },
    {
      id: 'mortgage',
      category: 'Capital Structuring',
      title: t('capMortgageTitle'),
      videoSrc: '/assets/features/feat-approval.mp4',
      description: t('capMortgageDesc'),
      highlights: ['Pre-Approval Structuring', 'Competitive Underwriting', 'Refinancing'],
      scope: 'Whole-of-Market UAE Bank Leverage Optimization',
    },
    {
      id: 'insights',
      category: 'Market Intelligence',
      title: t('capInsightsTitle'),
      videoSrc: '/assets/features/feat-cards.mp4',
      description: t('capInsightsDesc'),
      highlights: ['Transparent LTV Ratios', 'Equity Optimization', 'Non-Resident Mortgages'],
      scope: 'Borrowing Power Audit & Central Bank Compliance',
    },
    {
      id: 'support',
      category: 'Fiduciary Support',
      title: t('capSupportTitle'),
      videoSrc: '/assets/features/feat-keys.mp4',
      description: t('capSupportDesc'),
      highlights: ['Trustee Conveyance', 'Valuation Coordination', 'Dedicated Representation'],
      scope: 'End-to-End Handover & Land Department Conveyance',
    },
  ]

  // Render 3 repeating sets for a seamless infinite loop
  const repeatingCards = [...featureCards, ...featureCards, ...featureCards]

  return (
    <section
      id="features"
      ref={sectionRef}
      className={`lh-features-section ${isInView ? 'is-revealed' : ''}`}
      aria-label="Capabilities & Services Showcase"
    >
      <div className="lh-features-container">
        {/* Section Header */}
        <div className="lh-features-header-row">
          <div className="lh-features-header">
            <div className="lh-features-meta reveal-init">
              <span className="lh-meta-tag">{t('capabilitiesMetaTag')}</span>
              <span className="lh-meta-divider" aria-hidden="true" />
              <span className="lh-meta-sub">{t('capabilitiesMetaSub')}</span>
            </div>

            <h2 className="lh-features-title reveal-init reveal-delay-1">
              {t('capabilitiesTitle')}
            </h2>

            <p className="lh-features-subtitle reveal-init reveal-delay-2">
              {t('capabilitiesSubtitle')}
            </p>
          </div>

          {/* Motion Status Badge & Pause/Play Control */}
          <div className="lh-ticker-status-wrap reveal-init reveal-delay-2">
            <button
              type="button"
              className={`lh-ticker-status-pill ${isPaused ? 'is-paused' : ''}`}
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume continuous view' : 'Pause continuous view'}
            >
              <span className="lh-status-pulse-dot" aria-hidden="true" />
              <span className="lh-status-label">
                {isPaused ? 'Paused' : 'Continuous View'}
              </span>
              <span className="lh-status-icon" aria-hidden="true">
                {isPaused ? '▶' : '❚❚'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Showcase - Rotating from RIGHT TO LEFT */}
      <div
        className="lh-ticker-outer-viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        aria-live="polite"
      >
        <div
          ref={tickerRef}
          className={`lh-ticker-track ${isPaused ? 'is-paused' : ''}`}
        >
          {repeatingCards.map((card, idx) => (
            <article
              key={`${card.id}-${idx}`}
              className="lh-capability-card"
              tabIndex={0}
              aria-label={card.title}
            >
              {/* Card Media Header with Video */}
              <div className="lh-card-media-wrapper">
                <video
                  className="lh-card-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                >
                  <source src={card.videoSrc} type="video/mp4" />
                </video>
                <div className="lh-card-media-overlay" />
                <span className="lh-card-category-badge">{card.category}</span>
              </div>

              {/* Card Body Content */}
              <div className="lh-card-body">
                <div className="lh-card-header-line">
                  <span className="lh-card-discipline-dot" aria-hidden="true" />
                  <span className="lh-card-service-label">{card.category}</span>
                </div>
                <h3 className="lh-card-title">{card.title}</h3>
                <p className="lh-card-desc">{card.description}</p>

                {/* Highlights */}
                <div className="lh-card-highlights">
                  {card.highlights.map((h) => (
                    <span key={h} className="lh-highlight-pill">{h}</span>
                  ))}
                </div>

                {/* Card Action Link */}
                <div className="lh-card-action">
                  <a href="#contact" className="lh-card-link">
                    <span>Inquire</span>
                    <span className="lh-card-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
