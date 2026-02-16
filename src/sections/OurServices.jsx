const services = [
  {
    title: 'UI Design',
    description:
      'We push creative boundaries through modern interfaces and distinctive product visuals.',
    icon: 'window',
  },
  {
    title: 'Web Development',
    description:
      'Our frontend team builds high-performing websites and products with clean, scalable code.',
    icon: 'screen',
  },
  {
    title: 'Ecommerce',
    description:
      'We design custom commerce experiences that convert and stay aligned with your brand.',
    icon: 'tag',
  },
  {
    title: 'Animation',
    description:
      'From UI motion to product storytelling, we craft animations that feel sharp and intentional.',
    icon: 'spark',
  },
]

function ServiceIllustration({ icon }) {
  if (icon === 'window') {
    return (
      <div className="relative h-52 w-full">
        <div className="absolute left-8 top-6 h-28 w-48 border border-white/20" />
        <div className="absolute left-12 top-12 h-32 w-52 border border-white/70 bg-gradient-to-r from-white/20 to-white/5" />
        <div className="absolute left-20 top-20 h-24 w-44 border border-white/40" />
        <span className="absolute bottom-4 left-9 h-4 w-4 bg-white/70" />
        <span className="absolute right-7 top-8 h-3 w-3 bg-white/70" />
      </div>
    )
  }

  if (icon === 'screen') {
    return (
      <div className="relative h-52 w-full">
        <div className="absolute left-8 top-10 h-[120px] w-56 border border-white/70 bg-gradient-to-r from-white/15 to-white/5" />
        <div className="absolute left-12 top-14 h-[88px] w-48 border border-white/40" />
        <div className="absolute left-4 top-40 h-3 w-44 bg-white/75" />
        <span className="absolute right-14 top-16 text-6xl leading-none text-white/85">+</span>
        <span className="absolute left-10 top-7 h-2 w-2 bg-white/80" />
        <span className="absolute right-11 top-4 h-3 w-3 bg-white/85" />
      </div>
    )
  }

  if (icon === 'tag') {
    return (
      <div className="relative h-52 w-full">
        <div className="absolute left-14 top-8 h-[136px] w-32 rotate-[-11deg] rounded-sm border border-white/35 bg-gradient-to-b from-white/25 to-white/5" />
        <div className="absolute left-12 top-16 h-[120px] w-28 rotate-[12deg] rounded-sm border border-white/55 bg-[#101010]" />
        <span className="absolute left-[72px] top-[74px] h-3 w-3 rounded-full bg-white/75" />
        <span className="absolute right-10 top-14 text-5xl leading-none text-white/85">+</span>
      </div>
    )
  }

  return (
    <div className="relative h-52 w-full">
      <span className="absolute left-10 top-20 text-7xl leading-none text-white/85">+</span>
      <span className="absolute right-16 top-10 text-8xl leading-none text-white/85">+</span>
      <span className="absolute right-12 top-6 h-4 w-4 bg-white/75" />
      <span className="absolute left-8 top-8 h-3 w-3 bg-white/70" />
    </div>
  )
}

function OurServices() {
  return (
    <section className="bg-[#141414] px-5 pb-16 pt-12 text-white md:px-10 md:pb-20 md:pt-16">
      <div className="mx-auto w-full max-w-[1400px] overflow-hidden">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="uppercase leading-[0.88] tracking-[-0.04em] text-white">
            <span className="block text-[clamp(2.6rem,7.4vw,5.2rem)] font-light text-white/85">We are</span>
            <span
              className="block text-[clamp(2.8rem,7.8vw,5.4rem)] font-light"
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              expert at
            </span>
          </h2>

          <button
            type="button"
            className="h-14 rounded-full border border-white/45 px-10 text-[18px] text-white transition hover:border-white hover:bg-white hover:text-black md:px-14"
          >
            Lets work!
          </button>
        </div>

        <div className="mt-12 overflow-x-auto pb-2 md:mt-16">
          <div className="flex w-max gap-6 pr-5 md:pr-0">
            {services.map((service) => (
              <article
                key={service.title}
                className="w-[300px] shrink-0 rounded-3xl border border-white/5 bg-[#13151b] p-6 md:w-[320px]"
              >
                <ServiceIllustration icon={service.icon} />
                <h3 className="mt-2 text-[clamp(1.8rem,2.6vw,2.2rem)] leading-[1.05] tracking-[-0.03em] text-white">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-white/60">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurServices
