import { FaDribbble, FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { FiCopy, FiMapPin } from 'react-icons/fi'
import footerLogo from '../assets/images/Footer Logo.png'

const navLinks = ['Home', 'Services', 'Portfolio', 'Testimonilals']
const socialLinks = [
  { label: 'Facebook', href: '#', icon: FaFacebookF },
  { label: 'X', href: '#', icon: FaXTwitter },
  { label: 'Instagram', href: '#', icon: FaInstagram },
  { label: 'Dribbble', href: '#', icon: FaDribbble },
  { label: 'LinkedIn', href: '#', icon: FaLinkedinIn },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[var(--bg-dark)] px-4 pb-0 pt-12 text-white sm:px-6 md:px-10 md:pt-14 lg:px-16">
      <div className="relative mx-auto w-full max-w-7xl rounded-3xl px-2 py-4 sm:px-4 md:p-8 lg:p-10">
        
        {/* Changed grid-cols to 2fr 1fr 1fr and used a tighter gap for consistency */}
        <div className="grid gap-12 text-center md:gap-16 lg:grid-cols-[2fr_1fr_1fr] lg:gap-x-12 lg:text-left">
          
          {/* Brand/Logo Column - Larger width (2fr) */}
          <div className="space-y-6 md:space-y-8">
            <img 
              src={footerLogo} 
              alt="DevCore" 
              className="mx-auto h-32 w-auto md:h-36 lg:mx-0 lg:h-44 object-contain" 
            />
            <p className="mx-auto max-w-md text-sm leading-relaxed text-white/72 md:text-base lg:mx-0">
              Building reliable digital products across web, mobile, and growth systems for modern businesses.
            </p>
            <div className="mt-12 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white/30">Follow Us</span>
              <ul className="flex gap-3">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                      aria-label={item.label}
                    >
                      <item.icon className="text-lg transition-transform group-hover:scale-110" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links Column - Standard width (1fr) */}
          <div className="space-y-5 lg:pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Quick Links</h3>
            <nav>
              <ul className="grid grid-cols-1 gap-y-3 text-sm text-white/90 md:text-base">
                {navLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-opacity hover:opacity-70">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Column - Standard width (1fr) */}
          <div className="space-y-5 lg:pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Contact</h3>
            <div className="space-y-5">
              <a
                href="mailto:devcore@gmail.com"
                className="inline-flex items-center justify-center gap-2 pb-1 text-xl leading-none tracking-[-0.02em] transition-opacity hover:opacity-80 md:text-2xl lg:justify-start"
              >
                devcore@gmail.com
              </a>
              <a href="tel:+921234567" className="block text-base text-white/88 transition-opacity hover:opacity-80 md:text-lg">
                +921234567
              </a>
              <div className="space-y-2.5 pt-1 text-sm text-white/80 md:text-base">
                <p className="inline-flex items-center justify-center gap-2 lg:justify-start">
                  <FiMapPin aria-hidden="true" /> Lahore, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center text-sm text-white/65 md:mt-20 md:flex-row md:justify-between md:text-left lg:mt-24">
          <p>&copy; {currentYear} DevCore Technologies. All rights reserved.</p>
          <div className="flex items-center justify-center gap-5 md:justify-start">
            <a href="#" className="underline-offset-2 transition-opacity hover:opacity-75 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="underline-offset-2 transition-opacity hover:opacity-75 hover:underline">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer