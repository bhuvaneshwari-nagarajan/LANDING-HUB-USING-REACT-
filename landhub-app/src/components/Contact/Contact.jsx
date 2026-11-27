import { useState, useEffect } from 'react'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../hooks/useLanguage'
import './Contact.css'

export function Contact() {
  const [sectionRef, isInView] = useInView({ threshold: 0.12 })
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    interest: 'buying',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { isRTL } = useLanguage()

  useEffect(() => {
    const handleSelectContact = (e) => {
      if (e.detail?.interest) {
        setFormData((prev) => ({ ...prev, interest: e.detail.interest }))
      }
    }
    window.addEventListener('lh:select-contact', handleSelectContact)
    return () => window.removeEventListener('lh:select-contact', handleSelectContact)
  }, [])

  const whatsappUrl = 'https://wa.me/97148005363?text=' + encodeURIComponent('Hello LAND HUB, I would like to inquire about private client advisory services.')

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', contact: '', interest: 'buying', message: '' })
    }, 4000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`lh-contact-section ${isInView ? 'is-revealed' : ''}`}
      aria-label="Contact and Private Advisory Desk"
    >
      <div className="lh-contact-container">
        {/* Section Header */}
        <div className="lh-contact-header-tier reveal-init">
          <div className="lh-section-kicker">
            <span className="lh-section-kicker-dot" />
            <span>PRIVATE ADVISORY</span>
          </div>

          <h2 className="lh-contact-title">
            {isRTL ? (
              <>خطوتك التالية تبدأ <span className="lh-serif-accent">بتواصل مباشر.</span></>
            ) : (
              <>Your next move starts with a <span className="lh-serif-accent">hello.</span></>
            )}
          </h2>

          <p className="lh-contact-subtitle">
            Tell us what you're looking for or what you'd like to list. Connect directly with our private client advisory team in Dubai.
          </p>
        </div>

        {/* Form & Details Split Grid */}
        <div className="lh-contact-grid">
          {/* Minimal Luxury Form */}
          <div className="lh-contact-form-col reveal-init reveal-delay-1">
            <form className="lh-contact-form" onSubmit={handleSubmit}>
              {isSubmitted ? (
                <div className="lh-form-success-banner" role="status">
                  <span className="lh-success-dot" />
                  <div>
                    <h3 className="lh-success-title">Enquiry Received</h3>
                    <p className="lh-success-text">A private client advisor will reach out to you discreetly within 24 hours.</p>
                  </div>
                </div>
              ) : null}

              <div className="lh-form-row">
                <div className="lh-form-group">
                  <label htmlFor="contact-name" className="lh-field-label">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="lh-field-input"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="lh-form-group">
                  <label htmlFor="contact-info" className="lh-field-label">Email or Phone</label>
                  <input
                    id="contact-info"
                    type="text"
                    required
                    className="lh-field-input"
                    placeholder="How can we reach you?"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>
              </div>

              <div className="lh-form-group">
                <label htmlFor="contact-interest" className="lh-field-label">I'm interested in</label>
                <select
                  id="contact-interest"
                  className="lh-field-select"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                >
                  <option value="buying">Acquiring a Luxury Property</option>
                  <option value="selling">Selling or Listing an Estate</option>
                  <option value="plots">Land Parcels &amp; Development Plots</option>
                  <option value="financing">Mortgage &amp; Debt Structuring</option>
                  <option value="visa">Golden Visa &amp; Fiduciary Representation</option>
                </select>
              </div>

              <div className="lh-form-group">
                <label htmlFor="contact-message" className="lh-field-label">Message</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  className="lh-field-textarea"
                  placeholder="Tell us a little about your criteria or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="lh-contact-submit-btn">
                <span>Send Enquiry</span>
                <span className="lh-submit-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
              </button>
            </form>
          </div>

          {/* Contact Details Column */}
          <div className="lh-contact-info-col reveal-init reveal-delay-2">
            <div className="lh-contact-info-card">
              <span className="lh-info-card-kicker">DUBAI OFFICE</span>
              <h3 className="lh-info-card-title">MAI Tower &middot; Suite 909</h3>
              <p className="lh-info-card-address">
                Al Nahda 1, Dubai, United Arab Emirates<br />
                Dedicated private client parking available
              </p>

              <div className="lh-info-divider" />

              <div className="lh-info-direct-lines">
                <div className="lh-direct-entry">
                  <span className="lh-direct-lbl">Advisory Telephone</span>
                  <a href="tel:+97148005363" className="lh-direct-val">+971 4 800 LENDING (5363)</a>
                </div>
                <div className="lh-direct-entry">
                  <span className="lh-direct-lbl">Direct Email</span>
                  <a href="mailto:private@landhub.ae" className="lh-direct-val">private@landhub.ae</a>
                </div>
                <div className="lh-direct-entry">
                  <span className="lh-direct-lbl">Working Hours</span>
                  <span className="lh-direct-val">Mon&ndash;Fri: 09:00 &ndash; 18:30 (GST)</span>
                </div>
              </div>

              {/* WhatsApp Link */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lh-whatsapp-card-btn"
              >
                <span className="lh-wa-badge-dot" />
                <span>Chat via WhatsApp</span>
                <span className="lh-wa-arrow" aria-hidden="true">{isRTL ? '←' : '→'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
