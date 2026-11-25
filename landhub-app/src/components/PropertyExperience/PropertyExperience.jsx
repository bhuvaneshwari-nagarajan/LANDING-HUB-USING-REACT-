import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../hooks/useLanguage'
import './PropertyExperience.css'

export function PropertyExperience() {
  const [sectionRef, isInView] = useInView({ threshold: 0.12 })
  const [activeScene, setActiveScene] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { t, isRTL } = useLanguage()

  // Curated Living Perspectives
  const scenes = [
    {
      id: 'penthouses',
      category: 'Sky Residences',
      district: 'Downtown & Palm Jumeirah',
      title: 'Trophy Penthouses & Sky Mansions',
      src: '/assets/features/feat-elevator.mp4',
      poster: '/assets/images/image-01.jpeg',
      specs: ['Private Glass Lift', 'Panoramic Horizons', 'Infinity Sky Terrace'],
      narrative: 'Elevated duplex penthouses commanding unbroken skyline and ocean vistas, paired with bespoke private lift access and round-the-clock concierge.',
    },
    {
      id: 'beachfront',
      category: 'Coastal Estates',
      district: 'Jumeirah Bay & La Mer',
      title: 'Private Coastal Waterfront Villas',
      src: '/assets/experience/experience-villa.mp4',
      poster: '/assets/images/image-02.jpeg',
      specs: ['Direct Beach Access', 'Private Yacht Mooring', 'Water Gardens'],
      narrative: 'Rare beachfront sanctuaries balancing architectural purity with immediate coastal connectivity, tailored for discretionary wealth preservation.',
    },
    {
      id: 'mansions',
      category: 'Private Mansions',
      district: 'Emirates Hills & Dubai Hills',
      title: 'Ultra-Prime Private Family Compounds',
      src: '/assets/features/feat-family.mp4',
      poster: '/assets/images/image-03.jpeg',
      specs: ['Private Sunset Grounds', 'Multigenerational Living', 'Legacy Security'],
      narrative: 'Secluded luxury estates designed for multigenerational living, utmost residential discretion, and permanent wealth preservation.',
    },
  ]

  const handleSceneChange = (newIndex) => {
    if (newIndex === activeScene) return
    setActiveScene(newIndex)
    setIsTransitioning(true)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 350)
  }

  const current = scenes[activeScene]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`lh-experience-section ${isInView ? 'is-revealed' : ''}`}
      aria-label="Curated Architectural Showcase"
    >
      <div className="lh-experience-container">
        {/* Section Header */}
        <div className="lh-experience-header-tier reveal-init">
          <div className="lh-section-kicker">
            <span className="lh-section-kicker-dot" />
            <span>LIVING EXCELLENCE</span>
          </div>

          <h2 className="lh-experience-title">
            {isRTL ? (
              <>تجارب سكنية تعيد تعريف <span className="lh-serif-accent">الفخامة المعمارية.</span></>
            ) : (
              <>Curated architectural concepts &amp; <span className="lh-serif-accent">living excellence.</span></>
            )}
          </h2>

          <p className="lh-experience-subtitle">
            {t('experienceSubtitle')}
          </p>
        </div>

        {/* Large Immersive Architectural Theatre */}
        <div className="lh-theatre-wrapper reveal-init reveal-delay-1">
          <div className={`lh-theatre-display ${isTransitioning ? 'is-transitioning' : ''}`}>
            {/* Background Video Layer */}
            <video
              key={current.src}
              className="lh-theatre-video"
              autoPlay
              muted
              loop
              playsInline
              poster={current.poster}
              aria-hidden="true"
            >
              <source src={current.src} type="video/mp4" />
            </video>

            {/* Scrim Overlay */}
            <div className="lh-theatre-scrim" />

            {/* Theatre Info Overlay */}
            <div className="lh-theatre-info-overlay">
              <span className="lh-theatre-district-tag">{current.district}</span>
              <h3 className="lh-theatre-headline">{current.title}</h3>
              <p className="lh-theatre-narrative">{current.narrative}</p>
              <div className="lh-theatre-specs">
                {current.specs.map((spec) => (
                  <span key={spec} className="lh-theatre-spec-pill">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Scene Selector Deck (Follows Selected Card Smoothly) */}
          <div className="lh-scene-selector-grid" role="tablist" aria-label="Perspective Selector">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={activeScene === idx}
                className={`lh-scene-tab-card ${activeScene === idx ? 'is-active' : ''}`}
                onClick={() => handleSceneChange(idx)}
              >
                <div className="lh-scene-tab-header">
                  <span className="lh-scene-tab-cat">{scene.category}</span>
                  <span className="lh-scene-tab-pip" aria-hidden="true" />
                </div>
                <h4 className="lh-scene-tab-title">{scene.title}</h4>
                <p className="lh-scene-tab-district">{scene.district}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
