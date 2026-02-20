import loopWhiteImage from '../../assets/images/Loop-White.png'

function OurProcess() {
  return (
    <section className="bg-[#efefef] px-5 py-20 text-[#111111] md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <p className="max-w-5xl text-3xl leading-[1.08] tracking-[-0.03em] md:text-5xl">
            We&apos;re not just another tech company, we&apos;re the minds who turn vision into intelligent products,
            blending design, code, and innovation to bring clarity to complexity.
          </p>
        </div>

        <div className="mt-20 md:mt-28 md:ml-auto md:max-w-3xl">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-24 md:gap-y-12">
            <article>
              <p className="text-5xl leading-none tracking-[-0.03em] text-[#6f73ff] md:text-7xl">10+</p>
              <p className="mt-1 text-xl leading-[1.15] tracking-[-0.02em] text-black/70 md:text-3xl">
                Of building what&apos;s next
              </p>
            </article>

            <article>
              <p className="text-5xl leading-none tracking-[-0.03em] text-[#6f73ff] md:text-7xl">25+</p>
              <p className="mt-1 text-xl leading-[1.15] tracking-[-0.02em] text-black/70 md:text-3xl">
                Professionals crafting purposefully
              </p>
            </article>

            <article className="md:col-start-1">
              <p className="text-5xl leading-none tracking-[-0.03em] text-[#6f73ff] md:text-7xl">240+</p>
              <p className="mt-1 text-xl leading-[1.15] tracking-[-0.02em] text-black/70 md:text-3xl">
                Projects that sparked real change
              </p>
            </article>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl px-4 py-8 md:mt-20 md:px-10 md:py-12">
          <img
            src={loopWhiteImage}
            alt="Loop white"
            className="mx-auto h-auto w-full max-w-4xl object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default OurProcess
