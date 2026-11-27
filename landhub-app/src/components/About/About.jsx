import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../hooks/useLanguage'
import { AlternatingSlideshowCard } from '../common/AlternatingSlideshowCard'
import './About.css'

export function About() {
  const [sectionRef, isInView] = useInView({ threshold: 0.12 })
  const { t, isRTL } = useLanguage()

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`lh-prypco-about ${isInView ? 'is-revealed' : ''}`}
      aria-label="About LAND HUB"
    >
      <div className="lh-about-wrap">
        <div className="lh-about-split-card">
          {/* Left: Architectural Media */}
          <div className="lh-about-media-col reveal-clip-up">
            <AlternatingSlideshowCard
              images={[
                '/assets/images/image-01.jpeg',
                '/assets/images/image-02.jpeg',
                '/assets/images/image-03.jpeg',
                '/assets/images/image-04.jpeg',
              ]}
              aspectRatio="4/5"
              alt="LAND HUB Dubai Architecture"
              className="lh-about-slideshow"
            />
          </div>

          {/* Right: Editorial Narrative (PRYPCO #earn Pattern) */}
          <div className="lh-about-copy-col reveal-init reveal-delay-1">
            <span className="lh-about-pill">{t('philosophyMetaTag')}</span>

            <h2 className="lh-about-heading">
              {isRTL ? 'ما هي لاند هب؟' : 'What is LAND HUB?'}
            </h2>

            <p className="lh-about-body">{t('philosophyLead')}</p>

            <a href="#features" className="lh-about-cta">
              <span>{t('heroCtaPrimary')}</span>
              <span className="lh-about-cta-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
