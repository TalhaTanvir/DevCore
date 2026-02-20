import React, { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

import "swiper/css"
import "swiper/css/navigation"

const services = [
  {
    title: "UI Design",
    description:
      "We push creative boundaries through modern interfaces and distinctive product visuals.",
    icon: "window",
  },
  {
    title: "Web Development",
    description:
      "Our frontend team builds high-performing websites and products with clean, scalable code.",
    icon: "screen",
  },
  {
    title: "Ecommerce",
    description:
      "We design custom commerce experiences that convert and stay aligned with your brand.",
    icon: "tag",
  },
  {
    title: "Animation",
    description:
      "From UI motion to product storytelling, we craft animations that feel sharp and intentional.",
    icon: "spark",
  },
]

function ServiceIllustration({ icon }) {
  if (icon === "window") {
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

  if (icon === "screen") {
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

  if (icon === "tag") {
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
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-[#141414] px-5 pb-16 pt-12 text-white md:px-10 md:pb-20 md:pt-16"
    >
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="uppercase leading-[0.88] tracking-[-0.04em] text-white">
            <span className="block text-5xl font-light text-white/85 md:text-7xl">
              We are
            </span>
            <span
              className="block text-5xl font-light md:text-7xl"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              expert at
            </span>
          </h2>

          <div className="flex items-center gap-3">
            {/* React Icons arrows */}
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/55 bg-white/20 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur transition hover:border-white hover:bg-white/30"
            >
              <FiArrowLeft size={20} className="text-white" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/55 bg-white/20 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur transition hover:border-white hover:bg-white/30"
            >
              <FiArrowRight size={20} className="text-white" />
            </button>
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <Swiper
            modules={[Navigation]}
            spaceBetween={18}
            slidesPerView={1.1}
            speed={550}
            grabCursor
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // attach refs correctly (important when using custom buttons)
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }}
            breakpoints={{
              520: { slidesPerView: 1.3, spaceBetween: 18 },
              768: { slidesPerView: 2.1, spaceBetween: 20 },
              1024: { slidesPerView: 3.05, spaceBetween: 22 },
              1280: { slidesPerView: 3.6, spaceBetween: 24 },
            }}
          >
            {services.map((service) => (
              <SwiperSlide key={service.title} className="pb-2">
                <article className="group h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-md transition hover:border-white/20 hover:from-white/12 hover:to-white/6">
                  <div className="rounded-2xl border border-white/10 bg-black/25">
                    <ServiceIllustration icon={service.icon} />
                  </div>

                  <h3 className="mt-4 text-3xl leading-[1.05] tracking-[-0.03em] text-white md:text-4xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-[15px] leading-[1.6] text-white/65">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-white/70">
                    <span className="h-[1px] w-8 bg-white/20 transition group-hover:w-12" />
                    <span className="text-sm">Learn more</span>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}


export default OurServices
