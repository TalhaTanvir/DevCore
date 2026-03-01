import React from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const services = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end web application development including frontend, backend, APIs, authentication, and deployment.",
    icon: "window",
  },
  {
    title: "Front-End Development",
    description:
      "Modern, responsive interfaces built with clean component architecture, strong UX, and high performance.",
    icon: "screen",
  },
  {
    title: "Ecommerce Store Development",
    description:
      "Scalable online stores with product management, secure checkout, payment integration, and conversion-focused UI.",
    icon: "tag",
  },
  {
    title: "Animation & Motion Design",
    description:
      "Interactive motion for websites and products, from micro-interactions to branded visual storytelling.",
    icon: "spark",
  },
]

function ServiceIllustration({ icon }) {
  if (icon === "window") {
    return (
      <div className="relative h-52 w-full">
        <div className="absolute left-6 top-10 h-32 w-52 rounded-xl border border-white/35 bg-gradient-to-br from-white/20 to-white/5" />
        <div className="absolute left-14 top-[72px] h-24 w-36 rounded-lg border border-white/45 bg-black/35" />
        <div className="absolute right-9 top-16 h-28 w-20 rounded-lg border border-white/40 bg-gradient-to-b from-white/15 to-transparent" />
        <span className="absolute left-10 top-14 h-2 w-12 rounded-full bg-white/60" />
        <span className="absolute left-10 top-20 h-2 w-20 rounded-full bg-white/35" />
        <span className="absolute left-10 top-[104px] h-2 w-16 rounded-full bg-white/30" />
        <span className="absolute right-[60px] top-20 h-2 w-8 rounded-full bg-white/55" />
        <span className="absolute right-[60px] top-[104px] h-2 w-8 rounded-full bg-white/35" />
        <span className="absolute bottom-7 left-9 h-3 w-3 rounded-full bg-white/75" />
      </div>
    )
  }

  if (icon === "screen") {
    return (
      <div className="relative h-52 w-full">
        <div className="absolute left-8 top-8 h-[130px] w-60 rounded-xl border border-white/60 bg-gradient-to-br from-white/15 to-white/5" />
        <div className="absolute left-[52px] top-14 h-[90px] w-[200px] rounded-lg border border-white/40 bg-black/30" />
        <div className="absolute left-[60px] top-[88px] h-10 w-12 rounded-md bg-white/80" />
        <div className="absolute left-[120px] top-[88px] h-6 w-28 rounded bg-white/25" />
        <div className="absolute left-[120px] top-[120px] h-4 w-20 rounded bg-white/20" />
        <div className="absolute left-[108px] top-[142px] h-2.5 w-24 rounded-full bg-white/65" />
        <div className="absolute left-20 top-[150px] h-2.5 w-[152px] rounded-full bg-white/35" />
        <span className="absolute right-10 top-12 text-5xl leading-none text-white/80">{`</>`}</span>
      </div>
    )
  }

  if (icon === "tag") {
    return (
      <div className="relative h-52 w-full">
        <div className="absolute left-10 top-12 h-[124px] w-24 rotate-[-10deg] rounded-md border border-white/40 bg-gradient-to-b from-white/20 to-white/5" />
        <div className="absolute left-24 top-[72px] h-[118px] w-24 rotate-[8deg] rounded-md border border-white/55 bg-[#0f0f0f]" />
        <div className="absolute right-9 top-16 h-[108px] w-[104px] rounded-xl border border-white/40 bg-gradient-to-b from-white/15 to-transparent" />
        <span className="absolute left-[58px] top-[64px] h-2.5 w-2.5 rounded-full bg-white/75" />
        <span className="absolute left-[106px] top-[96px] h-2.5 w-2.5 rounded-full bg-white/70" />
        <span className="absolute right-14 top-24 text-sm tracking-[0.15em] text-white/70">
          SALE
        </span>
        <span className="absolute right-14 top-[124px] text-2xl font-light leading-none text-white/90">
          30%
        </span>
      </div>
    )
  }

  return (
    <div className="relative h-52 w-full">
      <div className="absolute left-8 top-10 h-24 w-24 rounded-full border border-white/50" />
      <div className="absolute left-14 top-16 h-12 w-12 rounded-full bg-white/70" />
      <div className="absolute right-10 top-8 h-24 w-24 rounded-xl border border-white/40 bg-gradient-to-br from-white/20 to-transparent" />
      <span className="absolute right-[72px] top-[60px] h-8 w-8 rounded border border-white/70" />
      <span className="absolute right-7 top-[108px] h-2.5 w-16 rounded-full bg-white/40" />
      <span className="absolute left-10 bottom-8 text-xs uppercase tracking-[0.25em] text-white/70">
        Motion
      </span>
      <span className="absolute left-[112px] bottom-8 text-xs uppercase tracking-[0.25em] text-white/45">
        UI
      </span>
    </div>
  )
}

function OurServices() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-[var(--bg-dark)] px-5 pb-16 pt-12 text-white md:px-10 md:pb-20 md:pt-16"
    >
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="flex flex-col gap-5 md:gap-6">
          <span className="inline-flex w-fit rounded-full border border-white/20 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            What We Deliver
          </span>
          <h2 className="max-w-5xl text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-white md:text-5xl lg:text-6xl">
            End-to-End Services for Modern Digital Products
          </h2>
          <p className="max-w-3xl text-sm leading-[1.75] text-white/65 md:text-base">
            We combine strategy, engineering, and design to build web products that are reliable, scalable, and ready for long-term growth.
          </p>
        </div>

        <div className="mt-8 md:mt-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={18}
            slidesPerView={1.1}
            speed={550}
            grabCursor
            navigation={{
              prevEl: ".ourservices-prev",
              nextEl: ".ourservices-next",
            }}
            pagination={{
              el: ".ourservices-pagination",
              clickable: true,
            }}
            breakpoints={{
              520: { slidesPerView: 1.3, spaceBetween: 18 },
              768: { slidesPerView: 2.1, spaceBetween: 20 },
              1024: { slidesPerView: 3.05, spaceBetween: 22 },
              1280: { slidesPerView: 3.6, spaceBetween: 24 },
            }}
          >
            {services.map((service) => (
              <SwiperSlide key={service.title} className="h-auto pb-2">
                <article className="group flex h-[430px] flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-md transition hover:border-white/20 hover:from-white/12 hover:to-white/6 md:h-[450px]">
                  <div className="rounded-2xl border border-white/10 bg-black/25">
                    <ServiceIllustration icon={service.icon} />
                  </div>

                  <h3 className="mt-4 min-h-[56px] text-2xl leading-[1.15] tracking-[-0.02em] text-white md:min-h-[72px] md:text-3xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 min-h-[88px] max-w-xl text-sm leading-[1.65] text-white/65 md:min-h-[96px] md:text-[15px]">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-5 flex items-center gap-2 text-white/70">
                    <span className="h-[1px] w-8 bg-white/20 transition group-hover:w-12" />
                    <span className="text-sm">Learn more</span>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="ourservices-pagination flex items-center gap-4 [&_.swiper-pagination-bullet]:!m-0 [&_.swiper-pagination-bullet]:!h-2.5 [&_.swiper-pagination-bullet]:!w-2.5 [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:!bg-white/55 [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet-active]:!w-8 [&_.swiper-pagination-bullet-active]:!bg-white" />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous service"
                className="ourservices-prev grid h-14 w-14 place-items-center rounded-full border border-white/65 text-white transition hover:border-white hover:bg-white/10"
              >
                <FiArrowLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next service"
                className="ourservices-next grid h-14 w-14 place-items-center rounded-full border border-white/65 text-white transition hover:border-white hover:bg-white/10"
              >
                <FiArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default OurServices

