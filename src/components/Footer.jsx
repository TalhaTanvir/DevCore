import { FaDribbble, FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { FiCopy, FiMapPin } from 'react-icons/fi'

const navLinks = ['Home', 'About us', 'Services', 'Case Studies', 'Blog', 'Contact']
const serviceLinks = ['SaaS', 'E-Commerce', 'Automative', 'Real Estate', 'Health & Care']
const socialLinks = [
  { label: 'Facebook', href: '#', icon: FaFacebookF },
  { label: 'X', href: '#', icon: FaXTwitter },
  { label: 'Instagram', href: '#', icon: FaInstagram },
  { label: 'Dribbble', href: '#', icon: FaDribbble },
  { label: 'LinkedIn', href: '#', icon: FaLinkedinIn },
]

function Footer() {
  return (
    <footer className="bg-[#020511] px-5 pb-10 pt-16 text-white md:px-10 md:pb-12">
      <div className="mx-auto grid w-full max-w-[1312px] gap-12 md:grid-cols-[1.2fr_0.95fr_0.95fr_1.15fr] md:gap-8">
        <div className="space-y-9">
          <div className="space-y-2">
            <a
              href="mailto:contact@66loop.com"
              className="inline-flex items-center gap-2 border-b border-white/70 pb-1 text-[clamp(1.6rem,2.5vw,2rem)] leading-none tracking-[-0.02em] transition-opacity hover:opacity-80"
            >
              contact@66loop.com
              <FiCopy className="text-base" aria-hidden="true" />
            </a>
            <a href="tel:+44020801238779" className="block text-[clamp(1.1rem,1.6vw,1.5rem)] text-white/90 hover:opacity-80">
              +44 0208 123 8779
            </a>
          </div>

          <div className="space-y-1 text-[clamp(1.05rem,1.25vw,1.32rem)] text-white/90">
            <p className="mb-2 inline-flex items-center gap-2">
              <FiMapPin aria-hidden="true" /> Florida, USA
            </p>
            <p>Newcastle Upon Tyne, UK</p>
            <p>Lahore, Pakistan</p>
          </div>
        </div>

        <nav>
          <ul className="space-y-2 text-[clamp(1.05rem,1.2vw,1.35rem)] text-white/92">
            {navLinks.map((item) => (
              <li key={item}>
                <a href="#" className="transition-opacity hover:opacity-75">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ul className="space-y-2 text-[clamp(1.05rem,1.2vw,1.35rem)] text-white/92">
            {serviceLinks.map((item) => (
              <li key={item}>
                <a href="#" className="transition-opacity hover:opacity-75">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-5">
            <form className="relative" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="newsletter" className="sr-only">
                Subscribe Newsletter
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="Subscribe Newsletter"
                className="h-[54px] w-full rounded-full border border-white/25 bg-transparent pl-6 pr-16 text-base text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 inline-flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full bg-[#2b56f8] text-lg transition-colors hover:bg-[#3d65ff]"
                aria-label="Submit newsletter email"
              >
                &rarr;
              </button>
            </form>

            <ul className="flex flex-wrap items-center gap-2">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white text-[#0c1020] transition-transform hover:-translate-y-0.5"
                    aria-label={item.label}
                  >
                    <item.icon className="text-[0.92rem]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end md:pr-4">
            <svg viewBox="0 0 300 150" className="h-[95px] w-[210px]" aria-label="66loop logo">
              <defs>
                <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2f62ff" />
                  <stop offset="45%" stopColor="#9c7dff" />
                  <stop offset="100%" stopColor="#ebf1ff" />
                </linearGradient>
              </defs>
              <path
                d="M35 75c0-24 20-44 44-44 18 0 27 10 40 20 13 10 22 20 40 20 24 0 44-20 44-44M265 75c0 24-20 44-44 44-18 0-27-10-40-20-13-10-22-20-40-20-24 0-44 20-44 44"
                fill="none"
                stroke="url(#loopGradient)"
                strokeWidth="18"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex w-full max-w-[1312px] flex-col gap-4 text-sm text-white/65 md:mt-12 md:flex-row md:items-center md:justify-between">
        <p>&copy; 2025 66Loop Technologies. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="underline-offset-2 transition-opacity hover:opacity-75 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="underline-offset-2 transition-opacity hover:opacity-75 hover:underline">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
