import { useEffect, useRef, useState } from 'react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
]

function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const hideTimerRef = useRef(null)

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
      }
    }

    const scheduleHide = () => {
      clearHideTimer()
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY || 0
      const isScrollingUp = currentScrollY < lastScrollY.current
      const isInHeroSection = currentScrollY < window.innerHeight * 0.9

      if (isInHeroSection) {
        clearHideTimer()
        setIsVisible(true)
      } else if (isScrollingUp) {
        setIsVisible(true)
        scheduleHide()
      } else {
        clearHideTimer()
        setIsVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    lastScrollY.current = window.scrollY || 0
    scheduleHide()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearHideTimer()
    }
  }, [])

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 px-5 py-6 transition-transform duration-300 md:px-10 ${
        isVisible ? 'translate-y-0' : '-translate-y-[120%]'
      }`}
    >
      <header className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4">
        <a
          href="#home"
          className="px-1 py-1 text-3xl font-bold leading-none tracking-tight text-white transition-opacity hover:opacity-85 md:text-5xl"
        >
          DevCore.
        </a>
        <nav className="flex items-center justify-between gap-4 rounded-full border border-black/15 bg-white px-4 py-3 md:px-7 md:py-4">
          <ul className="hidden items-center gap-6 text-base font-semibold leading-none text-[#222224] lg:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="transition-opacity hover:opacity-75">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact-us"
            className="rounded-full bg-[#f26b3e] px-4 py-2.5 text-base font-semibold leading-none text-black transition-colors hover:bg-[#ea5f31] md:px-6 md:py-3.5"
          >
            Let&apos;s talk!
          </a>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
