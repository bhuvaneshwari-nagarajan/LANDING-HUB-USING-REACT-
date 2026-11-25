import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { useParallax } from '../../hooks/useParallax'
import './Hero.css'

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [locationQuery, setLocationQuery] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [budgetRange, setBudgetRange] = useState('any')
  const videoRef = useRef(null)
  const { t, isRTL } = useLanguage()
  const parallaxOffset = useParallax(0.2)

  // Featured architectural showcase slides
  const featuredSlides = [
    {
      id: 'penthouse',
      src: '/assets/hero/hero-penthouse.mp4',
      fallbackImg: '/assets/images/image-01.jpeg',
      locationTag: 'DOWNTOWN DUBAI',
      title: 'Panoramic Trophy Penthouses',
    },
    {
      id: 'villa',
      src: '/assets/experience/experience-villa.mp4',
      fallbackImg: '/assets/images/image-02.jpeg',
      locationTag: 'PALM JUMEIRAH',
      title: 'Waterfront Coastal Sanctuaries',
    },
    {
      id: 'mansion',
      src: '/assets/features/feat-elevator.mp4',
      fallbackImg: '/assets/images/image-03.jpeg',
      locationTag: 'EMIRATES HILLS',
      title: 'Ultra-Prime Private Estates',
    },
  ]

  // Slideshow auto-advance every 8 seconds if playing
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [isPlaying, featuredSlides.length])

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredSlides.length - 1 : prev - 1))
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const targetElement = document.getElementById('features')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const activeSlideData = featuredSlides[currentSlide]

  return (
    <section id="hero" className="lh-hero-section" aria-label="Find Your Place in Dubai">
      {/* Background Architectural Canvas / Frame with Parallax */}
      <div className="lh-hero-stage">
        <div
          className="lh-hero-media-box"
          style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
        >
          <video
            ref={videoRef}
            key={activeSlideData.src}
            className="lh-hero-bg-video"
            autoPlay
            muted
            loop
            playsInline
            poster={activeSlideData.fallbackImg}
            aria-hidden="true"
          >
            <source src={activeSlideData.src} type="video/mp4" />
          </video>
          {/* Subtle Warm Scrim & Vignette for Contrast */}
          <div className="lh-hero-scrim" />
        </div>

        {/* Floating Slide Index Tag */}
        <div className="lh-hero-slide-tag" aria-hidden="true">
          <span>{activeSlideData.locationTag}</span>
        </div>

        {/* Architectural Slide Controls */}
        <div className="lh-hero-slide-controls" role="group" aria-label="Slideshow Controls">
          <button
            type="button"
            className="lh-slide-arrow-btn"
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
          >
            PREV
          </button>
          <div className="lh-slide-dots">
            {featuredSlides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                className={`lh-slide-dot ${currentSlide === idx ? 'is-active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={currentSlide === idx ? 'true' : 'false'}
              />
            ))}
          </div>
          <button
            type="button"
            className="lh-slide-arrow-btn"
            onClick={handleNextSlide}
            aria-label="Next Slide"
          >
            NEXT
          </button>
          <span className="lh-slide-ctrl-divider" aria-hidden="true">|</span>
          <button
            type="button"
            className="lh-slide-toggle-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
        </div>
      </div>

      {/* Hero Editorial Content Container */}
      <div className="lh-hero-content-wrapper">
        <div className="lh-hero-editorial">
          {/* Subtle Kicker */}
          <div className="lh-hero-kicker">
            <span className="lh-kicker-pip" />
            <span>{t('heroEyebrow')}</span>
          </div>

          {/* Monumental Headline with Serif Accent */}
          <h1 className="lh-hero-headline">
            {isRTL ? (
              <>جد مكانك في <span className="lh-serif-accent">دبي.</span></>
            ) : (
              <>Find your place in <span className="lh-serif-accent">Dubai.</span></>
            )}
          </h1>

          {/* Editorial Subtitle */}
          <p className="lh-hero-description">
            {t('heroSubtext')}
          </p>

          {/* Action CTAs */}
          <div className="lh-hero-actions">
            <a href="#features" className="lh-btn lh-btn-primary">
              <span>{t('heroCtaPrimary')}</span>
              <span className="lh-btn-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
            </a>
            <a href="#contact" className="lh-btn lh-btn-ghost">
              <span>{t('heroCtaSecondary')}</span>
              <span className="lh-btn-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
            </a>
          </div>
        </div>

        {/* Integrated Professional Property Search Interface */}
        <div className="lh-hero-search-container">
          <form className="lh-hero-search-panel" onSubmit={handleSearchSubmit}>
            {/* Location Field */}
            <div className="lh-search-col">
              <label htmlFor="search-location" className="lh-search-label">
                {t('heroSearchLocation')}
              </label>
              <input
                id="search-location"
                type="text"
                className="lh-search-input"
                placeholder={t('heroSearchLocationPh')}
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>

            <div className="lh-search-sep" aria-hidden="true" />

            {/* Property Type Field */}
            <div className="lh-search-col">
              <label htmlFor="search-type" className="lh-search-label">
                {t('heroSearchType')}
              </label>
              <select
                id="search-type"
                className="lh-search-select"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="all">{t('heroSearchTypeAll')}</option>
                <option value="villas">{t('heroSearchTypeVillas')}</option>
                <option value="penthouses">{t('heroSearchTypePenthouses')}</option>
                <option value="plots">{t('heroSearchTypePlots')}</option>
              </select>
            </div>

            <div className="lh-search-sep" aria-hidden="true" />

            {/* Budget Range Field */}
            <div className="lh-search-col">
              <label htmlFor="search-budget" className="lh-search-label">
                {t('heroSearchBudget')}
              </label>
              <select
                id="search-budget"
                className="lh-search-select"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
              >
                <option value="any">{t('heroSearchBudgetAny')}</option>
                <option value="tier1">{t('heroSearchBudget1')}</option>
                <option value="tier2">{t('heroSearchBudget2')}</option>
                <option value="tier3">{t('heroSearchBudget3')}</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="lh-search-action-col">
              <button type="submit" className="lh-search-submit-btn">
                <span>{t('heroSearchSubmit')}</span>
                <span className="lh-search-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
