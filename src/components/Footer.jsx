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
      <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[1.2fr_0.95fr_0.95fr_1.15fr] md:gap-8">
        <div className="space-y-9">
          <div className="space-y-2">
            <a
              href="mailto:contact@66loop.com"
              className="inline-flex items-center gap-2 border-b border-white/70 pb-1 text-2xl leading-none tracking-[-0.02em] transition-opacity hover:opacity-80 md:text-3xl"
            >
              contact@66loop.com
              <FiCopy className="text-base" aria-hidden="true" />
            </a>
            <a href="tel:+44020801238779" className="block text-lg text-white/90 hover:opacity-80 md:text-xl">
              +44 0208 123 8779
            </a>
          </div>

          <div className="space-y-1 text-base text-white/90 md:text-lg">
            <p className="mb-2 inline-flex items-center gap-2">
              <FiMapPin aria-hidden="true" /> Florida, USA
            </p>
            <p>Newcastle Upon Tyne, UK</p>
            <p>Lahore, Pakistan</p>
          </div>
        </div>

        <nav>
          <ul className="space-y-2 text-base text-white/92 md:text-lg">
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
          <ul className="space-y-2 text-base text-white/92 md:text-lg">
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
                    <item.icon className="text-sm" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col gap-4 text-sm text-white/65 md:mt-12 md:flex-row md:items-center md:justify-between">
        <p>&copy; 2025 DevCore Technologies. All rights reserved.</p>
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
