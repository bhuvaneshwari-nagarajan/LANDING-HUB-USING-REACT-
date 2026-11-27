import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import './FAQ.css'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const { isRTL } = useLanguage()

  const faqs = isRTL
    ? [
        {
          q: 'ما هي لاند هب؟',
          a: 'لاند هب هي شركة استشارات عقارية وتمويلية مستقلة في دبي، تساعد العملاء على انتقاء العقارات المناسبة وهيكلة الرهن العقاري عبر بنوك الإمارات.',
        },
        {
          q: 'كيف تختلف لاند هب عن شركات الوساطة التقليدية؟',
          a: 'نعمل لصالح المشتري والمستثمر بشكل مستقل دون حصص بيع للمطورين، ونجمع بين اختيار العقار والمقارنة المصرفية المحايدة في مسار واحد.',
        },
        {
          q: 'ما الخدمات التي تقدمونها؟',
          a: 'نقدم استشارات شراء الفلل والشقق والأراضي في دبي، وهيكلة الرهن العقاري والموافقات المسبقة، والمرافقة حتى التسجيل لدى دائرة الأراضي والأملاك.',
        },
        {
          q: 'هل تدعمون المشترين غير المقيمين في الإمارات؟',
          a: 'نعم، نساعد المقيمين وغير المقيمين في تقييم القدرة التمويلية ومقارنة شروط البنوك الإماراتية وإجراءات التسجيل العقاري.',
        },
        {
          q: 'كيف أبدأ الاستشارة؟',
          a: 'يمكنك إرسال طلب عبر نموذج التواصل أدناه أو التواصل مباشرة عبر واتساب مع مكتبنا في دبي.',
        },
      ]
    : [
        {
          q: 'What is LAND HUB?',
          a: 'LAND HUB is an independent real estate and mortgage advisory in Dubai, guiding private buyers and investors from property discovery to bank financing and title conveyance.',
        },
        {
          q: 'How is LAND HUB different from a traditional brokerage?',
          a: 'We operate with buyer-first fiduciary alignment rather than developer sales quotas, combining curated property sourcing with whole-of-market UAE lender comparisons.',
        },
        {
          q: 'What services do you offer?',
          a: 'We provide residential and land acquisition advisory, independent mortgage pre-approvals and refinancing comparisons, borrowing capacity assessments, and DLD trustee conveyance support.',
        },
        {
          q: 'Do you assist both UAE residents and non-residents?',
          a: 'Yes. We advise both UAE residents and international buyers on property selection, Central Bank LTV guidelines, and cross-bank mortgage structuring.',
        },
        {
          q: 'How do I start a private consultation?',
          a: 'Submit an enquiry in the form below or message our Dubai advisory desk directly via WhatsApp to schedule a confidential review.',
        },
      ]

  return (
    <section id="faq" className="lh-prypco-faq" aria-label="Frequently Asked Questions">
      <div className="lh-faq-wrap">
        <div className="lh-faq-grid">
          <div className="lh-faq-left">
            <span className="lh-faq-kicker">FAQS</span>
            <h2 className="lh-faq-title">
              {isRTL ? 'الأسئلة الشائعة.' : 'Frequently asked questions.'}
            </h2>
          </div>

          <div className="lh-faq-list">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={item.q}
                  className={`lh-faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="lh-faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  >
                    <span className="lh-faq-q">{item.q}</span>
                    <span className="lh-faq-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="lh-faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
