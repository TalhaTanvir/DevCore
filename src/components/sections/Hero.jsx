function Hero() {
  return (
    <section id="home" className="scroll-mt-24 relative min-h-screen overflow-hidden bg-[#141414] px-5 py-10 text-white md:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col justify-between">

        <div className="relative flex flex-1 flex-col items-center justify-center">
          <h1 className="text-center uppercase leading-[0.88] tracking-[-0.04em]">
            <span className="block text-5xl font-medium sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">We are</span>
            <span className="block text-5xl font-medium sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">Full-service</span>
            <span
              className="block text-5xl font-light tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              Agency
            </span>
          </h1>

          <p className="mt-10 w-full max-w-xs text-sm leading-[1.4] tracking-[-0.01em] text-white/85 md:absolute md:right-[5%] md:top-[60%] md:mt-0 md:text-lg md:leading-[1.3]">
            The first full-stack Web3 creative agency integrating AI technology to deliver best-in-class client
            experience.
          </p>
        </div>

        <div className="pb-3">
          <div className="relative mx-auto grid h-[140px] w-[140px] place-items-center rounded-full border border-white/25">
            <span className="hero-rotate absolute text-xs uppercase tracking-[0.22em] text-white/80">
              Scroll to explore scroll to explore
            </span>
            <span className="text-4xl leading-none text-white/90">&#8595;</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Open"
        className="absolute right-6 top-7 text-5xl leading-none text-white transition-opacity hover:opacity-75 md:right-10 md:top-8 md:text-6xl"
      >
        &#8599;
      </button>
    </section>
  )
}

export default Hero
