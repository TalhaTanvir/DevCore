function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 overflow-hidden bg-[#090a0f] px-5 py-[4.5rem] text-white md:px-10 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_26%_10%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(255,255,255,0.06),transparent_32%)]" />

      <div className="relative mx-auto w-full max-w-[1250px]">
        <span className="absolute left-0 top-0 text-xl text-white/75">&swarr;</span>
        <span className="absolute right-2 top-[21%] hidden text-[3rem] text-white/90 md:block">&searr;</span>

        <h2 className="pl-6 text-[clamp(2.7rem,7.4vw,6.4rem)] uppercase leading-[0.9] tracking-[-0.045em] text-[#ececec] md:max-w-[760px]">
          Customer
          <br />
          Reviews About
          <br />
          Our Work
        </h2>

        <div className="relative mt-14 h-[455px] md:mt-8 md:h-[500px]">
          <div className="absolute left-[7%] top-[20%] h-[300px] w-[75%] max-w-[760px] rotate-[-12deg] rounded-[28px] bg-black/38 shadow-[0_28px_80px_rgba(0,0,0,0.65)] md:left-[15%] md:top-[24%] md:h-[355px]" />
          <div className="absolute left-[10%] top-[15%] h-[305px] w-[78%] max-w-[770px] rotate-[-6deg] rounded-[28px] bg-black/45 shadow-[0_28px_80px_rgba(0,0,0,0.58)] md:left-[19%] md:top-[19%] md:h-[360px]" />

          <article className="absolute left-0 top-[6%] w-full max-w-[900px] rounded-[28px] bg-[#252529] px-7 pb-8 pt-7 shadow-[0_30px_90px_rgba(0,0,0,0.62)] md:left-[24%] md:top-[14%] md:px-9 md:pb-9 md:pt-8">
            <span className="text-[3.1rem] leading-none text-[#ff5555]">&quot;</span>

            <p className="mt-1 max-w-[38ch] text-[clamp(1.05rem,1.65vw,2.05rem)] leading-[1.62] tracking-[0.01em] text-white/92">
              I recently engaged in a website development project with an outstanding team, and the results were
              nothing short of exceptional. The team exhibited an exemplary level of professionalism, expertise, and
              dedication throughout the entire process.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                alt="Joe Glodberg"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-[clamp(1.35rem,2.4vw,2.05rem)] leading-none tracking-[-0.02em] text-[#efefef]">
                  Joe Glodberg
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/38">CEO</p>
              </div>
            </div>

            <span className="absolute bottom-7 right-7 text-[3.1rem] leading-none text-[#ff5555]">&quot;</span>
          </article>

          <div className="absolute bottom-1 left-1 flex items-center gap-2 md:bottom-3 md:left-0">
            <span className="h-[6px] w-10 rounded-full bg-white" />
            <span className="h-[6px] w-2 rounded-full bg-white/35" />
            <span className="h-[6px] w-2 rounded-full bg-white/35" />
          </div>

          <div className="absolute bottom-0 right-0 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-[1.45rem] text-white transition hover:border-white"
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-[1.45rem] text-white transition hover:border-white"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
