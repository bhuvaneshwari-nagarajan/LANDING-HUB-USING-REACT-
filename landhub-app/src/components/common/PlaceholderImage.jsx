import { useState } from 'react'
import './PlaceholderImage.css'

export function PlaceholderImage({
  src,
  fallbackUrl,
  localSvg,
  alt = 'LAND HUB Architecture',
  aspectRatio = '16/9',
  label = 'Architectural Photography',
  className = '',
  loading = 'lazy'
}) {
  const candidateList = [src, fallbackUrl, localSvg].filter(Boolean)
  const currentKey = `${src || ''}|${fallbackUrl || ''}|${localSvg || ''}`

  const [state, setState] = useState({
    key: currentKey,
    sourceIndex: 0,
    isLoaded: false,
    allFailed: candidateList.length === 0,
  })

  // Adjust state during render when props change
  if (state.key !== currentKey) {
    setState({
      key: currentKey,
      sourceIndex: 0,
      isLoaded: false,
      allFailed: candidateList.length === 0,
    })
  }

  const currentSrc = candidateList[state.sourceIndex]

  const handleImageError = () => {
    setState((prev) => {
      if (prev.sourceIndex < candidateList.length - 1) {
        return {
          ...prev,
          sourceIndex: prev.sourceIndex + 1,
          isLoaded: false,
        }
      }
      return {
        ...prev,
        allFailed: true,
      }
    })
  }

  const handleImageLoad = () => {
    setState((prev) => ({
      ...prev,
      isLoaded: true,
    }))
  }

  return (
    <div
      className={`lh-media-frame lh-reveal-image-wrap ${className} ${state.allFailed ? 'is-placeholder' : ''}`}
      style={{ aspectRatio }}
      role="img"
      aria-label={alt}
    >
      {!state.allFailed && currentSrc ? (
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          className={`lh-media-img ${state.isLoaded ? 'is-visible' : 'is-loading'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        /* Rich Built-in Designed Architectural Fallback - Midnight Sapphire & Brushed Platinum */
        <div className="lh-designed-fallback">
          <svg className="lh-fallback-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="dfBg2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#080D1A" />
                <stop offset="60%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
              <linearGradient id="dfGlass2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#dfBg2)" />
            <circle cx="560" cy="180" r="160" fill="#CBD5E1" opacity="0.08" />
            <circle cx="280" cy="300" r="140" fill="#CBD5E1" opacity="0.04" />
            <polygon points="120,120 680,100 660,260 100,280" fill="#0F172A" stroke="#1E293B" strokeWidth="1.5" />
            <polygon points="140,140 650,120 640,240 130,260" fill="url(#dfGlass2)" />
            <polygon points="180,280 720,260 700,420 160,440" fill="#080D1A" stroke="#1E293B" strokeWidth="1.5" />
            <polygon points="200,300 690,280 680,400 190,420" fill="url(#dfGlass2)" opacity="0.75" />
            <line x1="80" y1="440" x2="740" y2="440" stroke="#CBD5E1" strokeWidth="1.5" opacity="0.6" />
          </svg>
          <div className="lh-fallback-badge">
            <span className="lh-fallback-dot" aria-hidden="true" />
            <span className="lh-fallback-text">{label}</span>
          </div>
        </div>
      )}
    </div>
  )
}
