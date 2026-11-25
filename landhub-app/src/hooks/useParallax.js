import { useState, useEffect } from 'react'

export function useParallax(speed = 0.25) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    // Check for reduced motion preference or small screens
    const isMobile = window.innerWidth <= 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isMobile || prefersReducedMotion) {
      return
    }

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffsetY(window.scrollY * speed)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return offsetY
}
