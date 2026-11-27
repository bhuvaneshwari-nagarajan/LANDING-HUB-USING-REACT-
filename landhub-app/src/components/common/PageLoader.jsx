import { useState, useEffect } from 'react'
import './PageLoader.css'

export function PageLoader({ onComplete }) {
  // Check once per session: do not replay on refresh within the same session
  const [isMounted, setIsMounted] = useState(() => {
    try {
      return !sessionStorage.getItem('lh_intro_shown')
    } catch {
      return true
    }
  })
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (!isMounted) {
      if (onComplete) onComplete()
      return
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setIsMounted(false)
      try {
        sessionStorage.setItem('lh_intro_shown', 'true')
      } catch {
        // ignore storage errors
      }
      if (onComplete) onComplete()
      return
    }

    // Lock page scroll during the 2-second initial logo presentation
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // 0–2.0s: Display ONLY the official LAND HUB logo centered on black #111111
    // At 2.0s: Initiate smooth cinematic curtain/fade-out transition
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 2000)

    // At 2.65s: Fully unmount loader, restore scroll, record session flag
    const unmountTimer = setTimeout(() => {
      document.body.style.overflow = originalOverflow
      setIsMounted(false)
      try {
        sessionStorage.setItem('lh_intro_shown', 'true')
      } catch {
        // ignore storage errors
      }
      if (onComplete) onComplete()
    }, 2650)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(unmountTimer)
      document.body.style.overflow = originalOverflow
    }
  }, [isMounted, onComplete])

  if (!isMounted) return null

  return (
    <div
      className={`lh-page-loader-overlay ${isFading ? 'is-fading' : ''}`}
      role="status"
      aria-label="LAND HUB"
    >
      <div className="lh-page-loader-stage">
        {/* ONLY the official LAND HUB logo in the center on #111111 */}
        <div className="lh-loader-logo-wrap">
          <img
            src="/assets/brand/landhub-logo.png"
            alt="LAND HUB Dubai Real Estate"
            className="lh-loader-official-logo"
          />
        </div>

        {/* Minimal Progress Hairline Indicator */}
        <div className="lh-loader-progress-track" aria-hidden="true">
          <span className="lh-loader-progress-fill" />
        </div>
      </div>
    </div>
  )
}
