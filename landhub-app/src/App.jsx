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
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <LanguageProvider>
      <div className="lh-main-wrapper">
        {/* Minimalist Initial Page Loader */}
        <PageLoader />

        {/* Slim Desktop Vertical Minibar on Left */}
        <VerticalMinibar />

        {/* 01. NAVBAR */}
        <Navbar />

        <main id="main-content">
          {/* 02. CINEMATIC HERO */}
          <Hero />

          {/* 03. PHILOSOPHY / ABOUT */}
          <About />

          {/* 04. CAPABILITIES / SERVICES */}
          <Features />

          {/* 05. PROPERTY EXPERIENCE */}
          <PropertyExperience />

          {/* 06. HOW IT WORKS & ARCHITECTURAL SHOWCASE */}
          <HowItWorks />

          {/* 07. CONTACT */}
          <Contact />
        </main>

        {/* 08. FOOTER */}
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
