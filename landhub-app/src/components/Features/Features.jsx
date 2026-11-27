import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../hooks/useLanguage'
import './Features.css'

export function Features() {
  const [sectionRef, isInView] = useInView({ threshold: 0.08 })
  const [isPaused, setIsPaused] = useState(false)
  const { t, isRTL } = useLanguage()

  // PRYPCO #services-main: 3 Stepped Core Pillar Cards
  const corePillars = [
    {
      id: 'discovery',
      tag: 'Real Estate',
      title: t('capDiscoveryTitle'),
      desc: t('capDiscoveryDesc'),
      video: '/assets/features/feat-elevator.mp4',
      poster: '/assets/images/image-05.jpeg',
      accent: 'red',
    },
    {
      id: 'mortgage',
      tag: 'Mortgages',
      title: t('capMortgageTitle'),
      desc: t('capMortgageDesc'),
      video: '/assets/features/feat-approval.mp4',
      poster: '/assets/images/image-06.jpeg',
      accent: 'green',
    },
    {
      id: 'conveyance',
      tag: 'Conveyance',
      title: t('capSupportTitle'),
      desc: t('capSupportDesc'),
      video: '/assets/features/feat-keys.mp4',
      poster: '/assets/images/image-07.jpeg',
      accent: 'white',
    },
  ]

  // PRYPCO #services-list: Continuous Right-to-Left Ecosystem Marquee
  const ecosystemItems = [
    {
      id: 'eco-1',
      title: t('capDiscoveryTitle'),
      sub: 'Villas, Townhouses & Penthouses',
      video: '/assets/features/feat-elevator.mp4',
    },
    {
      id: 'eco-2',
      title: t('capMortgageTitle'),
      sub: 'Whole-of-Market UAE Lenders',
      video: '/assets/features/feat-approval.mp4',
    },
    {
      id: 'eco-3',
      title: t('capInsightsTitle'),
      sub: 'Borrowing & LTV Optimization',
      video: '/assets/features/feat-cards.mp4',
    },
    {
      id: 'eco-4',
      title: t('capSupportTitle'),
      sub: 'Trustee & Title Deed Transfer',
      video: '/assets/features/feat-keys.mp4',
    },
  ]

  const repeatingEcosystem = [...ecosystemItems, ...ecosystemItems, ...ecosystemItems]

  return (
    <section
      id="features"
      ref={sectionRef}
      className={`lh-prypco-services ${isInView ? 'is-revealed' : ''}`}
      aria-label="Services & Capabilities"
    >
      {/* Part 1: Stepped 3-Column Grid (PRYPCO #services-main Pattern) */}
      <div className="lh-services-wrap">
        <div className="lh-services-lead reveal-init">
          <h2 className="lh-services-headline">
            {isRTL
              ? 'تملك منزل أحلامك، أو هيكل تمويلك العقاري بوضوح.'
              : 'Own your dream home, or structure your mortgage with clarity.'}
          </h2>
        </div>

        <div className="lh-stepped-grid">
          {corePillars.map((pillar, idx) => (
            <a
              key={pillar.id}
              href="#contact"
              className={`lh-stepped-card step-${idx} reveal-init reveal-delay-${idx + 1}`}
            >
              <div className="lh-stepped-top">
                <span className={`lh-stepped-badge ${pillar.accent}`}>{pillar.tag}</span>
                <h3 className="lh-stepped-title">{pillar.title}</h3>
                <p className="lh-stepped-desc">{pillar.desc}</p>
              </div>

              <div className="lh-stepped-media">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={pillar.poster}
                  aria-hidden="true"
                >
                  <source src={pillar.video} type="video/mp4" />
                </video>
                <span className="lh-stepped-arrow" aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Part 2: Continuous Right-to-Left Ecosystem Carousel (PRYPCO #services-list Pattern) */}
      <div className="lh-ecosystem-block">
        <div className="lh-services-wrap lh-ecosystem-header">
          <div>
            <h3 className="lh-eco-title">{t('capabilitiesTitle')}</h3>
            <p className="lh-eco-sub">{t('capabilitiesSubtitle')}</p>
          </div>
          <button
            type="button"
            className={`lh-eco-toggle ${isPaused ? 'is-paused' : ''}`}
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
          >
            <span className="lh-eco-dot" aria-hidden="true" />
            <span>{isPaused ? 'Paused' : 'Continuous'}</span>
          </button>
        </div>

        <div
          className="lh-eco-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`lh-eco-track ${isPaused ? 'is-paused' : ''}`}>
            {repeatingEcosystem.map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href="#contact"
                className="lh-eco-card"
                aria-label={item.title}
              >
                <div className="lh-eco-media">
                  <video autoPlay muted loop playsInline aria-hidden="true">
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>
                <div className="lh-eco-body">
                  <div>
                    <h4 className="lh-eco-card-title">{item.title}</h4>
                    <p className="lh-eco-card-sub">{item.sub}</p>
                  </div>
                  <span className="lh-eco-arrow" aria-hidden="true">
                    {isRTL ? '←' : '→'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
