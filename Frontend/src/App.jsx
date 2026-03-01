import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Hero from './components/sections/Hero'
import OurProcess from './components/sections/OurProcess'
import OurWork from './components/sections/OurWork'
import OurServices from './components/sections/OurServices'
import Testimonials from './components/sections/Testimonials'
import Faqs from './components/sections/Faqs'
import ContactUs from './components/sections/ContactUs'
import Projects from './components/pages/Projects'

function HomePage() {
  return (
    <>
      <Hero />
      <OurProcess />
      <OurServices />
      <OurWork />
      <Testimonials />
      <Faqs />
      <ContactUs />
    </>
  )
}

function ScrollToRouteChange() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.hash])

  return null
}

function App() {
  return (
    <MainLayout>
      <ScrollToRouteChange />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  )
}

export default App
