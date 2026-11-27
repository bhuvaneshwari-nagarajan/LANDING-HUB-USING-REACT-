import './App.css'
import { LanguageProvider } from './context/LanguageProvider'
import { PageLoader } from './components/common/PageLoader'
import { VerticalMinibar } from './components/common/VerticalMinibar'
import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Features } from './components/Features/Features'
import { PropertyExperience } from './components/PropertyExperience/PropertyExperience'
import { HowItWorks } from './components/HowItWorks/HowItWorks'
import { FAQ } from './components/FAQ/FAQ'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <LanguageProvider>
      <div className="lh-main-wrapper">
        {/* 2-Second Official Logo Introduction */}
        <PageLoader />

        {/* Left-Side Symbol-Only Section Navigation */}
        <VerticalMinibar />

        {/* PRYPCO-Style Floating White Pill Navbar */}
        <Navbar />

        <main id="main-content" className="lh-main-rounded-frame">
          {/* 01. Full-Bleed Video Hero + Centered White Bottom Dock */}
          <Hero />

          {/* 02. Featured Split Card ("What is LAND HUB?") */}
          <About />

          {/* 03. Stepped 3-Column Pillars + Continuous Ecosystem Carousel */}
          <Features />

          {/* 04. Advisory Quote + Interactive Property Experience */}
          <PropertyExperience />

          {/* 05. Sticky-Stacked 3-Card Process Sequence */}
          <HowItWorks />

          {/* 06. Sticky Two-Column FAQ */}
          <FAQ />

          {/* 07. Direct Consultation / Contact Card */}
          <Contact />
        </main>

        {/* 08. PRYPCO-Style Dark Footer with Background Wordmark */}
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
