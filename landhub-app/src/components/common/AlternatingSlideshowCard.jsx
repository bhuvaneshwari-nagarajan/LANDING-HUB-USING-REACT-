import { useState, useEffect, useRef } from 'react'
import './AlternatingSlideshowCard.css'

export function AlternatingSlideshowCard({
  images = [
    '/assets/images/image-01.jpeg',
    '/assets/images/image-02.jpeg',
    '/assets/images/image-03.jpeg',
    '/assets/images/image-04.jpeg',
  ],
  aspectRatio = '4/5',
  alt = 'LAND HUB Curated Architecture',
  className = '',
}) {
  // State: active image index
  const [currentIndex, setCurrentIndex] = useState(0)
  // Stage state: 'visible' | 'exiting' | 'waiting' | 'entering'
  const [stageState, setStageState] = useState('visible')
  // Next entrance direction: alternates between 'right' and 'left'
  const nextDirectionRef = useRef('right')
  const [currentDirection, setCurrentDirection] = useState('none')

  useEffect(() => {
    let timer = null

    if (stageState === 'visible') {
      // 1. Remains visible for 3.5 seconds
      timer = setTimeout(() => {
        setStageState('exiting')
      }, 3500)
    } else if (stageState === 'exiting') {
      // 2. Exits smoothly over 750ms
      timer = setTimeout(() => {
        setStageState('waiting')
      }, 750)
    } else if (stageState === 'waiting') {
      // 3. Wait approximately 2 seconds (user requirement)
      timer = setTimeout(() => {
        // Set entrance direction
        const dir = nextDirectionRef.current
        setCurrentDirection(dir)
        // Advance to next image index
        setCurrentIndex((prev) => (prev + 1) % images.length)
        // Toggle direction for the subsequent image (Right -> Left -> Right -> ...)
        nextDirectionRef.current = dir === 'right' ? 'left' : 'right'
        setStageState('entering')
      }, 2000)
    } else if (stageState === 'entering') {
      // 4. Transitions from entrance offset to visible
      timer = setTimeout(() => {
        setStageState('visible')
      }, 750)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [stageState, images.length])

  const activeSrc = images[currentIndex]

  return (
    <div
      className={`lh-alternating-slideshow-frame ${className}`}
      style={{ aspectRatio }}
      aria-label="Alternating Architectural Slideshow"
    >
      {/* Background Frame Layer to Prevent Blank Frames */}
      <div className="lh-slideshow-backdrop" aria-hidden="true">
        <span className="lh-slideshow-watermark">LAND HUB</span>
      </div>

      {/* Active Animated Image */}
      <div
        className={`lh-slideshow-image-container stage-${stageState} dir-${currentDirection}`}
      >
        <img
          src={activeSrc}
          alt={`${alt} perspective`}
          className="lh-slideshow-img"
          loading="lazy"
        />
        <div className="lh-slideshow-editorial-vignette" aria-hidden="true" />
      </div>

      {/* Subtle Direction & Status Micro-Badge */}
      <div className="lh-slideshow-pill" aria-hidden="true">
        <span className="lh-slideshow-pip" />
        <span className="lh-slideshow-counter">
          0{currentIndex + 1} / 0{images.length}
        </span>
      </div>
    </div>
  )
}
