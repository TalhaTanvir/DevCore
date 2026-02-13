function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_40%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.15),_transparent_45%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-xl font-extrabold tracking-tight">DevCore</span>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a className="transition-colors hover:text-white" href="#services">
            Services
          </a>
          <a className="transition-colors hover:text-white" href="#work">
            Work
          </a>
          <a className="transition-colors hover:text-white" href="#contact">
            Contact
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 pb-20 pt-16">
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Web Development Agency
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
              We craft high-performance digital experiences for ambitious brands.
            </h1>
            <p className="mt-6 max-w-xl text-slate-300">
              This is your starter layout for DevCore. Send your first custom design
              step, and I will implement it directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Start Project
              </button>
              <button className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300">
                View Work
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">
              Design Queue
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-300">
              <li className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                Step 1 - Header and hero details
              </li>
              <li className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                Step 2 - Sections and content blocks
              </li>
              <li className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                Step 3 - Colors, typography, and interactions
              </li>
            </ul>
          </div>
        </section>

        <section id="services" className="mt-24">
          <h2 className="text-2xl font-bold text-white">Services</h2>
          <p className="mt-2 text-slate-300">
            Placeholder section ready for your custom design spec.
          </p>
        </section>

        <section id="work" className="mt-16">
          <h2 className="text-2xl font-bold text-white">Selected Work</h2>
          <p className="mt-2 text-slate-300">
            Placeholder section ready for your custom design spec.
          </p>
        </section>

        <section id="contact" className="mt-16">
          <h2 className="text-2xl font-bold text-white">Contact</h2>
          <p className="mt-2 text-slate-300">
            Placeholder section ready for your custom design spec.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
