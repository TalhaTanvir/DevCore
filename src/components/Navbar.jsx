const navItems = ['Our work', 'About us', 'Blog', 'Shop']

function Navbar() {
  return (
    <div className="absolute left-0 right-0 top-0 z-20 px-5 py-6 md:px-10">
      <header className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4">
        <a
          href="#"
          className="px-1 py-1 text-[30px] font-bold leading-none tracking-tight text-white transition-opacity hover:opacity-85 md:text-[44px]"
        >
          DevCore.
        </a>
        <nav className="flex items-center justify-between gap-4 rounded-full bg-[#f2f2f4] px-4 py-3 md:px-7 md:py-4">
          <ul className="hidden items-center gap-6 text-[16px] font-semibold leading-none text-[#222224] lg:flex">
            {navItems.map((item) => (
              <li key={item}>
                <a href="#" className="transition-opacity hover:opacity-75">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="rounded-full bg-[#f26b3e] px-4 py-2.5 text-[16px] font-semibold leading-none text-black transition-colors hover:bg-[#ea5f31] md:px-6 md:py-3.5"
          >
            Let&apos;s talk!
          </a>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
