import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../hooks/useLanguage'
import './PropertyExperience.css'

export function PropertyExperience() {
  const [sectionRef, isInView] = useInView({ threshold: 0.08 })
  const [activeScene, setActiveScene] = useState(0)
  const { t, isRTL } = useLanguage()

  const scenes = [
    {
      id: 'penthouses',
      category: 'Sky Residences',
      district: 'Downtown Dubai',
      title: 'Trophy Penthouses & Sky Mansions',
      src: '/assets/features/feat-elevator.mp4',
      poster: '/assets/images/image-01.jpeg',
      narrative: 'Elevated duplex penthouses commanding unbroken skyline vistas with private lift access.',
    },
    {
      id: 'beachfront',
      category: 'Coastal Estates',
      district: 'Palm Jumeirah',
      title: 'Private Coastal Waterfront Villas',
      src: '/assets/experience/experience-villa.mp4',
      poster: '/assets/images/image-02.jpeg',
      narrative: 'Rare beachfront sanctuaries balancing architectural purity with direct coastal access.',
    },
    {
      id: 'mansions',
      category: 'Private Estates',
      district: 'Emirates Hills',
      title: 'Ultra-Prime Family Compounds',
      src: '/assets/features/feat-family.mp4',
      poster: '/assets/images/image-03.jpeg',
      narrative: 'Secluded estates designed for multigenerational living and long-term preservation.',
    },
  ]

  const current = scenes[activeScene]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`lh-prypco-experience ${isInView ? 'is-revealed' : ''}`}
      aria-label="Property Experience"
    >
      {/* PRYPCO #quote Transition Zone (Dark -> Light #f5f5f5) */}
      <div className="lh-quote-transition-zone">
        <div className="lh-exp-wrap lh-quote-grid">
          <div className="lh-quote-left reveal-init">
            <span className="lh-quote-kicker">{t('philosophyMetaTag')}</span>
          </div>

          <div className="lh-quote-right reveal-init reveal-delay-1">
            <blockquote className="lh-quote-statement">
              &ldquo;{t('philosophyQuote')}&rdquo;
            </blockquote>
            <div className="lh-quote-author-row">
              <img
                src="/assets/about/about-family.webp"
                alt="LAND HUB Private Client Advisory"
                className="lh-quote-avatar"
                loading="lazy"
              />
              <div>
                <p className="lh-quote-name">{t('philosophyAuthor')}</p>
                <p className="lh-quote-role">LAND HUB · Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Property Experience Stage on #f5f5f5 */}
      <div className="lh-exp-stage-zone">
        <div className="lh-exp-wrap">
          <div className="lh-exp-header reveal-init">
            <h2 className="lh-exp-title">{t('experienceTitle')}</h2>
            <p className="lh-exp-sub">{t('experienceSubtitle')}</p>
          </div>

          <div className="lh-exp-cinema reveal-clip-up reveal-delay-1">
            <video
              key={current.src}
              className="lh-exp-video"
              autoPlay
              muted
              loop
              playsInline
              poster={current.poster}
              aria-hidden="true"
            >
              <source src={current.src} type="video/mp4" />
            </video>
            <div className="lh-exp-scrim" />

            <div className="lh-exp-overlay">
              <span className="lh-exp-district">{current.district}</span>
              <h3 className="lh-exp-headline">{current.title}</h3>
              <p className="lh-exp-narrative">{current.narrative}</p>
              <a href="#contact" className="lh-exp-cta">
                <span>Request Private Viewing</span>
                <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
              </a>
            </div>
          </div>

          <div className="lh-exp-tabs" role="tablist" aria-label="Property Perspectives">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={activeScene === idx}
                className={`lh-exp-tab ${activeScene === idx ? 'is-active' : ''}`}
                onClick={() => setActiveScene(idx)}
              >
                <span className="lh-tab-cat">{scene.category}</span>
                <span className="lh-tab-title">{scene.title}</span>
                <span className="lh-tab-dist">{scene.district}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
