const faqItems = [
  'How much does a website cost?',
  'How does the subscription work?',
  'How do I pause or cancel?',
  'How do I communicate with you?',
  "What if I don't like the design?",
]

function Faqs() {
  return (
    <section className="bg-white px-5 py-20 text-black md:px-10 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">FAQ&apos;s</h2>

        <div className="mt-8 flex flex-col gap-4 md:mt-10 md:gap-5">
          {faqItems.map((item) => (
            <article
              key={item}
              className="flex min-h-[88px] items-center justify-between overflow-hidden rounded-[40px] border border-black/20 bg-[#f4f4f4] px-6 py-6 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] md:min-h-[96px] md:px-10"
            >
              <p className="pr-6 text-base leading-[1.25] tracking-[-0.02em] md:text-2xl">{item}</p>
              <span aria-hidden="true" className="text-4xl leading-none text-black md:text-5xl">
                +
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faqs
