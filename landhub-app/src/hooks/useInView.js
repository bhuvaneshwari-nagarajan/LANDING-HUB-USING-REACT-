import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true
      }
    }
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      return true
    }
    return false
  })

  useEffect(() => {
    // If already marked in view due to reduced motion or lack of IntersectionObserver, skip
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        if (options.triggerOnce !== false) {
          observer.unobserve(entry.target)
        }
      } else if (options.triggerOnce === false) {
        setIsInView(false)
      }
    }, {
      threshold: options.threshold ?? 0.08,
      rootMargin: options.rootMargin || '120px 0px 0px 0px',
    })

    observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin, options.triggerOnce])

  return [ref, isInView]
}
