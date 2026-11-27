import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import './Hero.css'

export function Hero() {
  const [mode, setMode] = useState('property') // 'property' | 'mortgage'
  const { t, isRTL } = useLanguage()

  const activeMedia =
    mode === 'property'
      ? {
          src: '/assets/hero/hero-penthouse.mp4',
          poster: '/assets/images/image-01.jpeg',
        }
      : {
          src: '/assets/features/feat-approval.mp4',
          poster: '/assets/images/image-06.jpeg',
        }

  return (
    <section id="hero" className="lh-prypco-hero" aria-label="LAND HUB Dubai Real Estate">
      {/* Full-Bleed Campaign Video Background */}
      <div className="lh-hero-bg-stage" aria-hidden="true">
        <video
          key={activeMedia.src}
          className="lh-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={activeMedia.poster}
        >
          <source src={activeMedia.src} type="video/mp4" />
        </video>
        <div className="lh-hero-vignette" />
      </div>

      {/* Centered Hero Statement + Segmented Toggle (PRYPCO Pattern) */}
      <div className="lh-hero-center">
        {/* Segmented Toggle Pill */}
        <div className="lh-hero-toggle" role="tablist" aria-label="Advisory Mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'property'}
            className={`lh-toggle-btn ${mode === 'property' ? 'is-active' : ''}`}
            onClick={() => setMode('property')}
          >
            {isRTL ? 'تملك عقارك' : 'Own Property'}
          </button>
          <span className="lh-toggle-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'mortgage'}
            className={`lh-toggle-btn ${mode === 'mortgage' ? 'is-active' : ''}`}
            onClick={() => setMode('mortgage')}
          >
            {isRTL ? 'التمويل العقاري' : 'Mortgage Advisory'}
          </button>
        </div>

        <h1 className="lh-hero-display-title">
          {isRTL
            ? 'منصتك المتكاملة للعقارات والتمويل في دبي.'
            : 'YOUR END-TO-END DUBAI REAL ESTATE ADVISORY.'}
        </h1>

        <p className="lh-hero-sub">{t('heroSubtext')}</p>
      </div>

      {/* Centered White Rounded Bottom Dock (PRYPCO Bottom Dock Pattern) */}
      <div className="lh-hero-dock-wrap">
        <div className="lh-hero-bottom-dock">
          <div className="lh-dock-left">
            <div className="lh-dock-icon-badge" aria-hidden="true">
              <span className="b1" />
              <span className="b2" />
              <span className="b3" />
            </div>
            <p className="lh-dock-text">
              {isRTL
                ? 'استشارات عقارية وحلول رهن عقاري مستقلة في دبي.'
                : 'Independent property sourcing & UAE mortgage structuring.'}
            </p>
          </div>

          <div className="lh-dock-actions">
            <a href="#experience" className="lh-dock-cta">
              <span>{t('heroCtaPrimary')}</span>
              <span className="lh-dock-circle red" aria-hidden="true">↗</span>
            </a>
            <a href="#contact" className="lh-dock-cta">
              <span>{t('heroCtaSecondary')}</span>
              <span className="lh-dock-circle green" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
