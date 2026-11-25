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
      className={`lh-about-section ${isInView ? 'is-revealed' : ''}`}
      aria-label="Philosophy and Approach"
    >
      <div className="lh-about-container">
        {/* Editorial Section Kicker & Header */}
        <div className="lh-about-header-tier reveal-init">
          <div className="lh-section-kicker">
            <span className="lh-section-kicker-dot" />
            <span>THE LANDHUB APPROACH</span>
          </div>
          <h2 className="lh-about-monumental-heading">
            {isRTL ? (
              <>منظور متأنٍ واستثنائي في <span className="lh-serif-accent">استثمارات دبي.</span></>
            ) : (
              <>A considered perspective on <span className="lh-serif-accent">Dubai acquisitions.</span></>
            )}
          </h2>
        </div>

        {/* Dual-Column Editorial Composition */}
        <div className="lh-about-grid">
          {/* Narrative Column */}
          <div className="lh-about-narrative-col reveal-init reveal-delay-1">
            <p className="lh-about-lead-text">
              {t('philosophyLead')}
            </p>

            {/* Core Fiduciary Principles (No Generic Cards) */}
            <div className="lh-about-disciplines">
              <div className="lh-discipline-row">
                <span className="lh-discipline-dot" aria-hidden="true" />
                <div className="lh-discipline-content">
                  <h3 className="lh-discipline-title">Fiduciary Market Sourcing</h3>
                  <p className="lh-discipline-desc">
                    Curated off-market villa enclaves, beachfront trophy penthouses, and prime land plots vetted exclusively for private client wealth preservation.
                  </p>
                </div>
              </div>

              <div className="lh-discipline-row">
                <span className="lh-discipline-dot" aria-hidden="true" />
                <div className="lh-discipline-content">
                  <h3 className="lh-discipline-title">Institutional Debt Structuring</h3>
                  <p className="lh-discipline-desc">
                    Whole-of-market mortgage financing comparative matrices across UAE tier-1 banks to optimize loan-to-value leverage and cash-flow liquidity.
                  </p>
                </div>
              </div>

              <div className="lh-discipline-row">
                <span className="lh-discipline-dot" aria-hidden="true" />
                <div className="lh-discipline-content">
                  <h3 className="lh-discipline-title">Sovereign Conveyance &amp; Golden Visa</h3>
                  <p className="lh-discipline-desc">
                    Direct representation through Dubai Land Department trustee registration, valuation appraisal, and residency documentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Quote */}
            <blockquote className="lh-about-quote">
              <p className="lh-quote-body">
                &ldquo;{t('philosophyQuote')}&rdquo;
              </p>
              <footer className="lh-quote-signature">
                <span className="lh-sig-line" aria-hidden="true" />
                <span className="lh-sig-author">{t('philosophyAuthor')}</span>
              </footer>
            </blockquote>
          </div>

          {/* Visual Column: Alternating Direction Image Slideshow with Metrics */}
          <div className="lh-about-visual-col reveal-init reveal-delay-2">
            <div className="lh-about-media-frame">
              <AlternatingSlideshowCard
                images={[
                  '/assets/images/image-01.jpeg',
                  '/assets/images/image-02.jpeg',
                  '/assets/images/image-03.jpeg',
                  '/assets/images/image-04.jpeg',
                ]}
                aspectRatio="4/5"
                alt="LAND HUB Private Client Architecture"
                className="lh-about-slideshow"
              />

              {/* Floating Institutional Metric Badge */}
              <div className="lh-metric-dock">
                <div className="lh-metric-item">
                  <span className="lh-metric-val">AED 4.2B+</span>
                  <span className="lh-metric-lbl">Private Advisory Pipeline</span>
                </div>
                <div className="lh-metric-sep" aria-hidden="true" />
                <div className="lh-metric-item">
                  <span className="lh-metric-val">100%</span>
                  <span className="lh-metric-lbl">Fiduciary Alignment</span>
                </div>
                <div className="lh-metric-sep" aria-hidden="true" />
                <div className="lh-metric-item">
                  <span className="lh-metric-val">Off-Market</span>
                  <span className="lh-metric-lbl">Direct Allocations</span>
                </div>
              </div>
            </div>

            {/* Subtle Mandate Tag */}
            <div className="lh-about-mandate-card">
              <span className="lh-mandate-tag">{t('philosophyMandateTag')}</span>
              <p className="lh-mandate-text">{t('philosophyMandateText')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
