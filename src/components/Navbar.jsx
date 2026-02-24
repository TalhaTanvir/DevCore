import { useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logo.png'

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
  const isHoveringRef = useRef(false)

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
  }

  const scheduleHide = () => {
    clearHideTimer()
    hideTimerRef.current = setTimeout(() => {
      if (!isHoveringRef.current) {
        setIsVisible(false)
      }
    }, 5000)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || 0
      const isScrollingUp = currentScrollY < lastScrollY.current
      const isInHeroSection = currentScrollY < window.innerHeight * 0.9

      if (isHoveringRef.current) {
        clearHideTimer()
        setIsVisible(true)
      } else if (isInHeroSection) {
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
      onMouseEnter={() => {
        isHoveringRef.current = true
        clearHideTimer()
        setIsVisible(true)
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false
        if ((window.scrollY || 0) >= window.innerHeight * 0.9) {
          scheduleHide()
        }
      }}
    >
      <header className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4">
        <a
          href="#home"
          className="inline-flex items-center rounded-full border border-black/15 bg-white px-3 py-3 transition-colors duration-300 hover:border-[#ff5555] hover:bg-[#fff3f3] md:px-4 md:py-4"
        >
          <span className="inline-flex h-10 w-20 items-center justify-center overflow-hidden md:h-12 md:w-24">
            <img
              src={logo}
              alt="DevCore"
              className="h-full w-full scale-[2.1] object-contain md:scale-[2.3]"
            />
          </span>
        </a>
        <nav className="flex items-center justify-between gap-4 rounded-full border border-black/15 bg-white px-4 py-3 transition-colors duration-300 hover:border-[#ff5555] md:px-7 md:py-4">
          <ul className="hidden items-center gap-6 text-base font-semibold leading-none text-[#222224] lg:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative transition-colors duration-300 hover:text-[#ff5555] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#ff5555] after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact-us"
            className="rounded-full bg-[#ff5555] px-4 py-2.5 text-base font-semibold leading-none text-black transition-colors hover:bg-[#ff3b3b] md:px-6 md:py-3.5"
          >
            Let&apos;s talk!
          </a>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
