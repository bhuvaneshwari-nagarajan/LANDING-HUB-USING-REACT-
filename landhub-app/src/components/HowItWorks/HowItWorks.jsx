import { useLanguage } from '../../hooks/useLanguage'
import './HowItWorks.css'

export function HowItWorks() {
  const { t } = useLanguage()

  // PRYPCO #about Pattern: Sticky-Stacked 3-Card Process Sequence on #f5f5f5
  const stackCards = [
    {
      id: 'discover',
      variant: 'crimson',
      pill: t('step1Title'),
      title: t('step1Heading'),
      desc: t('step1Desc'),
      mediaType: 'image',
      mediaSrc: '/assets/images/image-01.jpeg',
    },
    {
      id: 'structure',
      variant: 'white',
      pill: t('step3Title'),
      title: t('step3Heading'),
      desc: t('step3Desc'),
      mediaType: 'video',
      mediaSrc: '/assets/features/feat-approval.mp4',
    },
    {
      id: 'conveyance',
      variant: 'obsidian',
      pill: t('step4Title'),
      title: t('step4Heading'),
      desc: t('step4Desc'),
      mediaType: 'video',
      mediaSrc: '/assets/features/feat-keys.mp4',
    },
  ]

  return (
    <section id="process" className="lh-prypco-process" aria-label="How LAND HUB Works">
      <div className="lh-process-wrap">
        <div className="lh-sticky-stack">
          {stackCards.map((card, idx) => (
            <div
              key={card.id}
              className="lh-sticky-slot"
              style={{ zIndex: idx + 1 }}
            >
              <article className={`lh-stack-card variant-${card.variant}`}>
                <div className="lh-stack-copy">
                  <span className="lh-stack-pill">{card.pill}</span>
                  <h2 className="lh-stack-title">{card.title}</h2>
                  <p className="lh-stack-desc">{card.desc}</p>
                </div>

                <div className="lh-stack-media">
                  {card.mediaType === 'video' ? (
                    <video autoPlay muted loop playsInline aria-hidden="true">
                      <source src={card.mediaSrc} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={card.mediaSrc} alt={card.pill} loading="lazy" />
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
