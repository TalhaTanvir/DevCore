function InsideLoopSection() {
  return (
    <section className="bg-[#efefef] px-5 py-20 text-[#111111] md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[1020px] text-[clamp(2rem,4.6vw,4rem)] leading-[1.08] tracking-[-0.03em]">
            We&apos;re not just another tech company, we&apos;re the minds who turn vision into intelligent products,
            blending design, code, and innovation to bring clarity to complexity.
          </p>
        </div>

        <div className="mt-20 md:mt-28 md:ml-auto md:max-w-[760px]">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-24 md:gap-y-12">
            <article>
              <p className="text-[clamp(2.8rem,5vw,5rem)] leading-none tracking-[-0.03em] text-[#6f73ff]">10+</p>
              <p className="mt-1 text-[clamp(1.2rem,1.8vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-black/70">
                Of building what&apos;s next
              </p>
            </article>

            <article>
              <p className="text-[clamp(2.8rem,5vw,5rem)] leading-none tracking-[-0.03em] text-[#6f73ff]">25+</p>
              <p className="mt-1 text-[clamp(1.2rem,1.8vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-black/70">
                Professionals crafting purposefully
              </p>
            </article>

            <article className="md:col-start-1">
              <p className="text-[clamp(2.8rem,5vw,5rem)] leading-none tracking-[-0.03em] text-[#6f73ff]">240+</p>
              <p className="mt-1 text-[clamp(1.2rem,1.8vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-black/70">
                Projects that sparked real change
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InsideLoopSection
