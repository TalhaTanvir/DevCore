import { zodResolver } from '@hookform/resolvers/zod'
import { FiArrowRight } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(/^\d+$/, 'Phone number must contain only numbers'),
  need: z.string().trim().min(1, 'Please tell us what you need'),
  budget: z
    .string()
    .trim()
    .min(1, 'Budget is required')
    .regex(/^\d+$/, 'Budget must contain only numbers'),
})

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      need: '',
      budget: '',
    },
  })

  const handleNumericInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, '')
  }

  const onSubmit = () => {}

  return (
    <section
      id="contact-us"
      className="scroll-mt-24 relative z-10 overflow-hidden bg-[var(--bg-dark)] px-5 py-20 text-white md:px-10 md:py-28"
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

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mt-12 grid gap-8 md:grid-cols-[1.45fr_0.95fr] md:gap-12">
              <div className="space-y-8">
                <label className="block">
                  <span className="sr-only">Name</span>
                  <input
                    type="text"
                    placeholder="Name"
                    {...register('name')}
                    className="w-full border-b border-[#d0d3db] bg-transparent pb-2 text-lg text-[#191d2b] placeholder:text-[#a9adb7] focus:outline-none md:text-2xl"
                  />
                  {errors.name && <p className="mt-2 text-sm text-[#cf3f5f]">{errors.name.message}</p>}
                </label>
                <label className="block">
                  <span className="sr-only">Email</span>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    className="w-full border-b border-[#d0d3db] bg-transparent pb-2 text-lg text-[#191d2b] placeholder:text-[#a9adb7] focus:outline-none md:text-2xl"
                  />
                  {errors.email && <p className="mt-2 text-sm text-[#cf3f5f]">{errors.email.message}</p>}
                </label>
                <label className="block">
                  <span className="sr-only">Phone Number</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onInput={handleNumericInput}
                    placeholder="Phone Number"
                    {...register('phoneNumber')}
                    className="w-full border-b border-[#d0d3db] bg-transparent pb-2 text-lg text-[#191d2b] placeholder:text-[#a9adb7] focus:outline-none md:text-2xl"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-2 text-sm text-[#cf3f5f]">{errors.phoneNumber.message}</p>
                  )}
                </label>
                <label className="block">
                  <span className="sr-only">I need</span>
                  <input
                    type="text"
                    placeholder="I need..."
                    {...register('need')}
                    className="w-full border-b border-[#d0d3db] bg-transparent pb-2 text-lg text-[#191d2b] placeholder:text-[#a9adb7] focus:outline-none md:text-2xl"
                  />
                  {errors.need && <p className="mt-2 text-sm text-[#cf3f5f]">{errors.need.message}</p>}
                </label>

                <div className="flex items-center gap-3">
                  <label className="sr-only" htmlFor="budget-amount">
                    Budget Amount
                  </label>
                  <input
                    id="budget-amount"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onInput={handleNumericInput}
                    placeholder="Enter budget"
                    {...register('budget')}
                    className="h-[50px] w-full border-b border-[#d0d3db] bg-transparent pb-2 text-lg text-[#191d2b] placeholder:text-[#a9adb7] focus:outline-none md:text-2xl"
                  />
                </div>
                {errors.budget && <p className="-mt-6 text-sm text-[#cf3f5f]">{errors.budget.message}</p>}
              </div>

              <div className="flex flex-col justify-between md:pb-1">
                <div className="mt-12 flex items-center gap-3 md:justify-start">
                  <button
                    type="submit"
                    className="group relative inline-flex h-[58px] items-center gap-3 overflow-hidden rounded-[18px] border border-[#111322] bg-[#0f1324] px-6 text-base font-semibold tracking-[-0.01em] text-white transition duration-300 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d54f5]/40 md:text-lg"
                  >
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_0%_0%,rgba(76,118,255,0.25)_0%,rgba(15,19,36,0)_62%)]" />
                    <span className="relative">Submit Request</span>
                    <span className="relative inline-flex items-center justify-center text-xl text-white transition-transform duration-200 group-hover:translate-x-1">
                      <FiArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
