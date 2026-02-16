import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'
import InsideLoopSection from './sections/InsideLoopSection'
import OurWork from './sections/OurWork'
import OurServices from './sections/OurServices'
import Testimonials from './sections/Testimonials'
import Faqs from './sections/Faqs'
import ContactUs from './sections/ContactUs'
import Footer from './components/Footer'

function App() {
  return (
    <main className="relative min-h-screen bg-[#141414]">
      <div className="absolute left-0 right-0 top-0 z-20 px-5 py-6 md:px-10">
        <Navbar />
      </div>
      <Hero />
      <InsideLoopSection />
      <OurServices />
      <OurWork />
      <Testimonials />
      <Faqs />
      <ContactUs />
      <Footer />
    </main>
  )
}

export default App
