const workTags = [
  { label: 'AI-Powered', className: 'left-1/2 top-0 -translate-x-1/2 rotate-[-10deg]' },
  { label: 'Product Design', className: 'left-[18%] top-[34%] rotate-[12deg] md:left-[20%]' },
  { label: 'Development', className: 'right-[14%] top-[34%] rotate-[-10deg] md:right-[19%]' },
]

const domainCards = [
  {
    key: 'fintech',
    fallback: '#d9dee6',
    image:
      "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80')",
  },
  {
    key: 'ecommerce',
    fallback: '#cfd4df',
    title: 'E-Commerce',
    description:
      'From smart storefronts to adaptive systems, we craft e-commerce solutions that boost sales, engagement, and growth.',
    image:
      "url('https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80')",
  },
  {
    key: 'mobility',
    fallback: '#d6dce6',
    image:
      "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&w=900&q=80')",
  },
  {
    key: 'realestate',
    fallback: '#cbe0e6',
    image:
      "url('https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=900&q=80')",
  },
  {
    key: 'healthcare',
    fallback: '#dfe2e8',
    image:
      "url('https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80')",
  },
]

function OurWork() {
  return (
    <section
      id="portfolio"
      className="scroll-mt-24 relative z-10 block bg-[#efefef] px-5 py-20 text-[#0d1022] md:px-10 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="relative w-full max-w-5xl pt-14 md:pt-16">
          {workTags.map((tag) => (
            <span
              key={tag.label}
              className={`absolute rounded-full border border-[#1a2138]/45 bg-[#f6f5f6] px-5 py-2 text-base leading-none tracking-[-0.02em] text-[#141b35] md:text-2xl ${tag.className}`}
            >
              {tag.label}
            </span>
          ))}

          <h2 className="mx-auto max-w-5xl text-center text-4xl leading-[1.03] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            Products Designed to Learn and
            <br />
            Scale Intelligently
            <span className="text-[#f18f3a]">.</span>
          </h2>
        </div>

        <p className="mt-10 max-w-2xl text-center text-base leading-[1.6] text-[#1d2238]/75 md:text-lg">
          We build AI-powered systems through design, development, and CMS evolving with your vision to scale
          intelligently and create lasting impact.
        </p>

        <div className="mt-16 w-full">
          <h3 className="text-4xl leading-[1.06] tracking-[-0.04em] md:text-6xl">
            Domains We Help Evolve<span className="text-[#f18f3a]">.</span>
          </h3>

          <div className="mt-8 overflow-x-auto pb-2">
            <div className="flex w-max gap-3 md:gap-4">
              {domainCards.map((card) => (
                <article
                  key={card.key}
                  className="relative h-[390px] w-[250px] shrink-0 overflow-hidden rounded-[28px] bg-cover bg-center md:h-[460px] md:w-[250px]"
                  style={{ backgroundColor: card.fallback, backgroundImage: card.image }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {card.title ? (
                    <div className="absolute inset-x-0 bottom-16 px-5 md:px-6">
                      <h4 className="text-3xl leading-[1.02] tracking-[-0.03em] text-white md:text-5xl">
                        {card.title}
                      </h4>
                      <p className="mt-3 max-w-xl text-sm leading-[1.4] text-white/85 md:text-base">
                        {card.description}
                      </p>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    className="absolute bottom-3 left-3 right-3 inline-flex h-11 items-center justify-between rounded-full bg-white px-5 text-[26px] leading-none text-[#151a2e] md:bottom-4 md:left-4 md:right-4 md:h-12"
                  >
                    <span className="text-2xl tracking-[-0.02em]">Explore</span>
                    <span className="text-3xl">&rarr;</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurWork
