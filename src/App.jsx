import MainLayout from './layouts/MainLayout'
import Hero from './components/sections/Hero'
import InsideLoopSection from './components/sections/InsideLoopSection'
import OurWork from './components/sections/OurWork'
import OurServices from './components/sections/OurServices'
import Testimonials from './components/sections/Testimonials'
import Faqs from './components/sections/Faqs'
import ContactUs from './components/sections/ContactUs'

function App() {
  return (
    <MainLayout>
      <Hero />
      <InsideLoopSection />
      <OurServices />
      <OurWork />
      <Testimonials />
      <Faqs />
      <ContactUs />
    </MainLayout>
  )
}

export default App
