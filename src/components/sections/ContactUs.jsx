import { useState } from 'react'

const interestTags = [
  'AI Solutions',
  'Product Design',
  'UX/UI Design',
  'Website Development',
  'Mobile App Development',
  'Dashboard',
  'CMS Development',
  'Custom Solutions',
]

function ContactUs() {
  const minBudget = 10
  const maxBudget = 100
  const [budget, setBudget] = useState(40)
  const budgetPercent = ((budget - minBudget) / (maxBudget - minBudget)) * 100

  return (
    <section
      id="contact-us"
      className="scroll-mt-24 relative z-10 overflow-hidden bg-[#050814] px-5 py-20 text-white md:px-10 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_100%,rgba(16,56,181,0.28)_0%,rgba(5,8,20,0)_58%)]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            Hey{' '}
            <span className="inline-block border-b-[4px] border-[#f18f3a] pb-[1px] leading-none text-white">Ya&apos;ll!</span>
          </p>
          <h2 className="mt-2 text-4xl font-medium leading-[1.06] tracking-[-0.03em] md:text-6xl">
            What Are We Shaping Today?
          </h2>
        </div>

        <div className="mt-10 rounded-[32px] bg-[#f2f2f4] p-6 text-[#111322] shadow-[0_26px_62px_rgba(0,0,0,0.18)] md:p-12">
          <div className="text-3xl font-medium tracking-[-0.02em] text-[#1b1f2d] md:text-4xl">
            Area of Interest
          </div>

          <div className="mt-6 flex max-w-5xl flex-wrap gap-3">
            {interestTags.map((tag, index) => (
              <span
                key={tag}
                className={`rounded-full border px-4 py-[7px] text-sm leading-none tracking-[-0.01em] md:text-base ${
                  index === interestTags.length - 1
                    ? 'border-[#8e6dff] text-[#1b1f2d]'
                    : 'border-[#c7cbd5] text-[#1b1f2d]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-[1.45fr_0.95fr] md:gap-12">
            <div className="space-y-8">
              <label className="block">
                <span className="sr-only">Name</span>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border-b border-[#d0d3db] bg-transparent pb-2 text-lg text-[#191d2b] placeholder:text-[#a9adb7] focus:outline-none md:text-2xl"
                />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border-b border-[#d0d3db] bg-transparent pb-2 text-lg text-[#191d2b] placeholder:text-[#a9adb7] focus:outline-none md:text-2xl"
                />
              </label>
              <label className="block">
                <span className="sr-only">Phone Number</span>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border-b border-[#d0d3db] bg-transparent pb-2 text-lg text-[#191d2b] placeholder:text-[#a9adb7] focus:outline-none md:text-2xl"
                />
              </label>
              <label className="block">
                <span className="sr-only">I need</span>
                <input
                  type="text"
                  placeholder="I need..."
                  className="w-full border-b border-[#d0d3db] bg-transparent pb-2 text-lg text-[#191d2b] placeholder:text-[#a9adb7] focus:outline-none md:text-2xl"
                />
              </label>
            </div>

            <div className="flex flex-col justify-between md:pb-1">
              <div>
                <div className="text-4xl font-medium tracking-[-0.02em] text-[#151a2a] md:text-5xl">
                  Budget
                </div>
                <div className="relative mt-8 pr-2">
                  <span
                    className="absolute -top-9 z-10 rounded-full bg-[#111322] px-3 py-[2px] text-sm font-semibold text-white"
                    style={{ left: `calc(${budgetPercent}% - 18px)` }}
                  >
                    {budget}K
                  </span>
                  <input
                    type="range"
                    min={minBudget}
                    max={maxBudget}
                    step="5"
                    value={budget}
                    onChange={(event) => setBudget(Number(event.target.value))}
                    className="contact-budget-range h-[2px] w-full cursor-pointer appearance-none rounded-full"
                    style={{
                      background: `linear-gradient(to right, #5571ff 0%, #9157ff ${budgetPercent}%, #c9cdd8 ${budgetPercent}%, #c9cdd8 100%)`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-12 flex items-center gap-3 md:justify-start">
                <button
                  type="button"
                  className="inline-flex h-[44px] items-center rounded-full border border-[#cfd3dc] bg-[#f7f7f8] px-6 text-base font-medium tracking-[-0.02em] text-[#1d2134] md:text-lg"
                >
                  Submit Request
                </button>
                <span className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#2d54f5] text-xl text-white">
                  &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
