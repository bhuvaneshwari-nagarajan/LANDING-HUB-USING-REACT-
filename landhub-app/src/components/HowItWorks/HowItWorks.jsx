import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../hooks/useLanguage'
import './HowItWorks.css'

export function HowItWorks() {
  const [sectionRef, isInView] = useInView({ threshold: 0.08 })
  const [activeStageIdx, setActiveStageIdx] = useState(0)

  // Integrated Capabilities state
  const [selectedPillar, setSelectedPillar] = useState(0)
  const [isPillarFading, setIsPillarFading] = useState(false)

  const { t, isRTL } = useLanguage()

  // Four luxury client progression stages - Strictly NO numbers or "01 / 02" labels
  const stages = [
    {
      id: 'discover',
      name: t('step1Title'), // Discovery
      tagline: t('step1Tagline'), // Asset Scope & Profiling
      heading: t('step1Heading'),
      description: t('step1Desc'),
      deliverables: [
        'Private Asset Calibration & Enclave Targeting',
        'Borrowing Capacity & Equity Leverage Optimization',
        'Discretionary Mandate Free from Developer Sales Quotas',
      ],
      mediaType: 'image',
      mediaSrc: '/assets/images/image-01.jpeg',
      district: 'Palm Jumeirah & Emirates Hills',
    },
    {
      id: 'explore',
      name: t('step2Title'), // Explore
      tagline: t('step2Tagline'), // Comparative Due Diligence
      heading: t('step2Heading'),
      description: t('step2Desc'),
      deliverables: [
        'Direct Off-Market Pocket Listings & Waterfront Sanctuaries',
        'Whole-of-Market UAE Tier-1 Bank Underwriting Matrix',
        'Land Department Escrow & Title Due Diligence Audit',
      ],
      mediaType: 'image',
      mediaSrc: '/assets/images/image-02.jpeg',
      district: 'Downtown Dubai & Jumeirah Bay',
    },
    {
      id: 'guidance',
      name: t('step3Title'), // Guidance
      tagline: t('step3Tagline'), // Capital Architecture
      heading: t('step3Heading'),
      description: t('step3Desc'),
      deliverables: [
        'Fast-Track Conditional Pre-Approvals & Private Banking',
        'Debt-to-Income Leverage & Liquidity Structuring',
        'Central Bank Compliance & Non-Resident Financing',
      ],
      mediaType: 'video',
      mediaSrc: '/assets/features/feat-approval.mp4',
      district: 'Financial Architecture & Underwriting',
    },
    {
      id: 'conveyance',
      name: t('step4Title'), // Conveyance
      tagline: t('step4Tagline'), // Sovereign Handover
      heading: t('step4Heading'),
      description: t('step4Desc'),
      deliverables: [
        'Certified Trustee Registration & Escrow Settlement',
        'Valuation Appraisal Defense & Golden Visa Conveyance',
        'Turnkey Key Handover & Title Deed Execution',
      ],
      mediaType: 'video',
      mediaSrc: '/assets/features/feat-keys.mp4',
      district: 'Sovereign Title Conveyance',
    },
  ]

  // Connected Advisory Pillars (Integrated Capabilities)
  const connectedPillars = [
    {
      id: 'acquisition',
      tag: 'Acquisition Advisory',
      title: t('pillar1Title'),
      subtitle: t('pillar1Subtitle'),
      videoSrc: '/assets/hero/hero-penthouse.mp4',
      deliverables: [
        'Direct off-market property sourcing',
        'Official Land Department due diligence',
        'Private developer allocation access',
      ],
    },
    {
      id: 'mortgage',
      tag: 'Capital Structuring',
      title: t('pillar2Title'),
      subtitle: t('pillar2Subtitle'),
      videoSrc: '/assets/features/feat-approval.mp4',
      deliverables: [
        'Whole-of-market bank comparison',
        'Independent mortgage pre-approvals',
        'Customized commercial debt structures',
      ],
    },
    {
      id: 'conveyance',
      tag: 'Sovereign Conveyance',
      title: t('pillar3Title'),
      subtitle: t('pillar3Subtitle'),
      videoSrc: '/assets/features/feat-keys.mp4',
      deliverables: [
        'Valuation inspection defense',
        'Dubai Land Department trustee registration',
        'Full title conveyance and key handover',
      ],
    },
  ]

  const handlePillarChange = (idx) => {
    if (idx === selectedPillar) return
    setSelectedPillar(idx)
    setIsPillarFading(true)
    setTimeout(() => {
      setIsPillarFading(false)
    }, 260)
  }

  const activePillar = connectedPillars[selectedPillar]

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`lh-process-section ${isInView ? 'is-revealed' : ''}`}
      aria-label="Client Journey & Progression"
    >
      <div className="lh-process-container">
        {/* Section Header */}
        <div className="lh-process-header">
          <div className="lh-section-kicker reveal-init">
            <span className="lh-section-kicker-dot" />
            <span>CLIENT PROGRESSION</span>
          </div>

          <h2 className="lh-process-title reveal-init reveal-delay-1">
            {t('processTitle')}
          </h2>

          <p className="lh-process-subtitle reveal-init reveal-delay-2">
            {t('processSubtitle')}
          </p>
        </div>

        {/* ==========================================================================
           SEQUENTIAL STEP PROGRESSION (LINE BY LINE)
           Discovery -> Explore -> Guidance -> Conveyance
           ========================================================================== */}
        <div className="lh-sequential-progression-track" role="list">
          {stages.map((stage, idx) => {
            const isLast = idx === stages.length - 1
            const isActive = activeStageIdx === idx

            return (
              <div
                key={stage.id}
                role="listitem"
                className={`lh-progression-row reveal-init reveal-delay-${idx + 1} ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveStageIdx(idx)}
                onMouseEnter={() => setActiveStageIdx(idx)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveStageIdx(idx)
                  }
                }}
                aria-current={isActive ? 'step' : undefined}
              >
                {/* Left Column: Spine Indicator & Stage Name */}
                <div className="lh-progression-spine-col">
                  <div className="lh-progression-node-wrap">
                    <span className="lh-progression-node" aria-hidden="true" />
                    {!isLast && (
                      <div className="lh-progression-connecting-line" aria-hidden="true">
                        <span className="lh-connecting-line-fill" />
                        <span className="lh-connecting-arrow">&darr;</span>
                      </div>
                    )}
                  </div>

                  <div className="lh-progression-name-box">
                    <h3 className="lh-progression-stage-name">{stage.name}</h3>
                    <span className="lh-progression-stage-tagline">{stage.tagline}</span>
                  </div>
                </div>

                {/* Middle Column: Editorial Content & Deliverables */}
                <div className="lh-progression-content-col">
                  <h4 className="lh-progression-heading">{stage.heading}</h4>
                  <p className="lh-progression-desc">{stage.description}</p>

                  <div className="lh-progression-deliverables" role="list">
                    {stage.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="lh-progression-deliverable-item" role="listitem">
                        <span className="lh-deliverable-check" aria-hidden="true">&check;</span>
                        <span className="lh-deliverable-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Architectural Media Frame */}
                <div className="lh-progression-media-col">
                  <div className="lh-progression-media-frame">
                    {stage.mediaType === 'video' ? (
                      <video
                        className="lh-progression-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                      >
                        <source src={stage.mediaSrc} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={stage.mediaSrc}
                        alt={stage.name}
                        className="lh-progression-img"
                        loading="lazy"
                      />
                    )}
                    <div className="lh-progression-media-scrim" />
                    <span className="lh-progression-district-tag">{stage.district}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ==========================================================================
           CONNECTED CAPABILITIES SECTION (PRESERVED)
           ========================================================================== */}
        <div className="lh-connected-suite-container reveal-init reveal-delay-3">
          <div className="lh-connected-header">
            <span className="lh-connected-kicker">{t('integratedMeta')}</span>
            <h3 className="lh-connected-title">{t('integratedTitle')}</h3>
            <p className="lh-connected-subtitle">{t('integratedSubtitle')}</p>
          </div>

          <div className="lh-connected-tabs-bar" role="tablist" aria-label="Integrated Capabilities">
            {connectedPillars.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={selectedPillar === idx}
                className={`lh-connected-tab ${selectedPillar === idx ? 'is-active' : ''}`}
                onClick={() => handlePillarChange(idx)}
              >
                <span className="lh-tab-dot" aria-hidden="true" />
                <span className="lh-tab-text">{p.tag}</span>
              </button>
            ))}
          </div>

          <div className={`lh-connected-view-card ${isPillarFading ? 'is-fading' : ''}`}>
            <div className="lh-connected-view-info">
              <span className="lh-view-badge">{activePillar.tag}</span>
              <h4 className="lh-view-title">{activePillar.title}</h4>
              <p className="lh-view-subtitle">{activePillar.subtitle}</p>

              <div className="lh-view-points">
                {activePillar.deliverables.map((pt, i) => (
                  <div key={i} className="lh-view-point-item">
                    <span className="lh-point-bullet" aria-hidden="true">&bull;</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="lh-view-action">
                <a href="#contact" className="lh-btn lh-btn-primary">
                  <span>Inquire for {activePillar.tag}</span>
                  <span className="lh-btn-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
                </a>
              </div>
            </div>

            <div className="lh-connected-view-media">
              <video
                key={activePillar.videoSrc}
                className="lh-connected-video"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              >
                <source src={activePillar.videoSrc} type="video/mp4" />
              </video>
              <div className="lh-connected-media-scrim" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
