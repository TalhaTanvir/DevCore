function OurProcess() {
  const processSteps = [
    {
      id: '01',
      title: 'Discover',
      description:
        'We align on business goals, user needs, and technical scope so every decision has a clear purpose.',
    },
    {
      id: '02',
      title: 'Strategize',
      description:
        'We define roadmap priorities, success metrics, and delivery phases to keep the project focused and measurable.',
    },
    {
      id: '03',
      title: 'Design',
      description:
        'We craft UX flows and interface systems that reflect your brand and remove friction from the journey.',
    },
    {
      id: '04',
      title: 'Prototype',
      description:
        'We validate key journeys early with clickable prototypes so feedback is fast and development risk stays low.',
    },
    {
      id: '05',
      title: 'Build',
      description:
        'We develop with speed, test with intent, and iterate using real feedback until the product is production-ready.',
    },
    {
      id: '06',
      title: 'Launch & Scale',
      description:
        'After release, we monitor performance, optimize continuously, and support growth with data-driven improvements.',
    },
  ]

  const highlights = [
    { value: '10+', label: 'Years of delivery experience' },
    { value: '25+', label: 'Experts across design and engineering' },
    { value: '240+', label: 'Projects launched across industries' },
  ]

  return (
    <section className="bg-[var(--bg-light)] px-5 py-20 text-[#111111] md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#A9A9A9] md:text-sm">Our process</p>
          <h2 className="mt-3 text-4xl leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            Built With Structure,
            <br />
            Delivered With Speed
            <span className="text-[#ff5555]">.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.65] text-black/70 md:text-lg">
            Our workflow keeps strategy, design, and development connected from day one so your product moves from
            concept to launch without chaos.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <article
              key={step.id}
              className="rounded-[28px] border border-black/15 bg-[#f4f4f4] p-6 md:p-7"
            >
              <p className="text-sm font-medium tracking-[0.1em] text-[#ff5555]">{step.id}</p>
              <h3 className="mt-2 text-3xl leading-[1.05] tracking-[-0.03em] md:text-4xl">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-black/70 md:text-base">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[28px] border border-black/15 bg-white p-6 md:mt-14 md:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {highlights.map((item) => (
              <article key={item.value}>
                <p className="text-5xl leading-none tracking-[-0.03em] text-[#111111] md:text-7xl">{item.value}</p>
                <p className="mt-2 max-w-xs text-lg leading-[1.25] tracking-[-0.01em] text-black/70 md:text-2xl">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default OurProcess
