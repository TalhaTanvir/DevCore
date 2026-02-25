import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Testimonials', href: '/#testimonials' },
]
const TOP_HIDE_THRESHOLD = 50

function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const isHoveringRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || 0
      const isScrollingUp = currentScrollY < lastScrollY.current
      const isScrollingDown = currentScrollY > lastScrollY.current

      if (isHoveringRef.current) {
        setIsVisible(true)
      } else if (currentScrollY <= TOP_HIDE_THRESHOLD) {
        setIsVisible(true)
      } else if (isScrollingUp) {
        setIsVisible(true)
      } else if (isScrollingDown) {
        setIsVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    lastScrollY.current = window.scrollY || 0
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 px-5 py-6 transition-transform duration-300 md:px-10 ${
        isVisible ? 'translate-y-0' : '-translate-y-[120%]'
      }`}
      onMouseEnter={() => {
        isHoveringRef.current = true
        setIsVisible(true)
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false
        const currentScrollY = window.scrollY || 0
        if (currentScrollY <= TOP_HIDE_THRESHOLD) {
          setIsVisible(true)
        }
      }}
    >
      <header className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4">
        <Link
          to="/#home"
          className="inline-flex items-center rounded-full border border-black/15 bg-white px-3 py-3 transition-colors duration-300 hover:border-[#ff5555] hover:bg-[#fff3f3] md:px-4 md:py-4"
        >
          <span className="inline-flex h-10 w-20 items-center justify-center overflow-hidden md:h-12 md:w-24">
            <img
              src={logo}
              alt="DevCore"
              className="h-full w-full scale-[2.1] object-contain md:scale-[2.3]"
            />
          </span>
        </Link>
        <nav className="flex items-center justify-between gap-4 rounded-full border border-black/15 bg-white px-4 py-3 transition-colors duration-300 hover:border-[#ff5555] md:px-7 md:py-4">
          <ul className="hidden items-center gap-6 text-base font-semibold leading-none text-[#222224] lg:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="relative transition-colors duration-300 hover:text-[#ff5555] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#ff5555] after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/#contact-us"
            className="rounded-full bg-[#ff5555] px-4 py-2.5 text-base font-semibold leading-none text-black transition-colors hover:bg-[#ff3b3b] md:px-6 md:py-3.5"
          >
            Let&apos;s talk!
          </Link>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
