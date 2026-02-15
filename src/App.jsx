import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {
  return (
    <main className="relative min-h-screen bg-[#141414]">
      <div className="absolute left-0 right-0 top-0 z-20 px-5 py-6 md:px-10">
        <Navbar />
      </div>
      <Hero />
    </main>
  )
}

export default App
