import { A11y, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const testimonials = [
  {
    quote:
      'I recently engaged in a website development project with an outstanding team, and the results were nothing short of exceptional. The team exhibited an exemplary level of professionalism, expertise, and dedication throughout the entire process.',
    name: 'Joe Glodberg',
    role: 'CEO',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
  },
  {
    quote:
      'Their design and engineering workflow was clear from day one. Every milestone was delivered on time, and our product now feels faster, cleaner, and more aligned with our customers.',
    name: 'Emily Carter',
    role: 'Product Lead',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
  },
  {
    quote:
      'We trusted them with a full rebuild and got a measurable jump in conversion rates within weeks. Communication stayed sharp, decisions were data-backed, and execution was consistently excellent.',
    name: 'Michael Ross',
    role: 'Founder',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
]

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 relative overflow-hidden bg-[#0a0c12] px-5 py-20 text-white md:px-10 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative">
          <h2 className="max-w-xl text-4xl uppercase leading-[0.92] tracking-[-0.035em] md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block font-light text-white/75">Customer</span>
            <span className="block font-light" style={{ fontFamily: 'Times New Roman, serif' }}>
              Reviews About
            </span>
            <span className="block font-light" style={{ fontFamily: 'Times New Roman, serif' }}>
              Our Work
            </span>
          </h2>

          <button
            type="button"
            aria-label="Explore more"
            className="absolute right-0 top-3 text-4xl leading-none text-white transition-opacity hover:opacity-75 md:text-5xl"
          >
            &#8600;
          </button>
        </div>

        <div className="relative mt-14 pb-20 md:mt-10 md:ml-auto md:max-w-3xl md:pb-24">
          <div className="pointer-events-none absolute inset-x-4 bottom-7 top-7 rounded-[28px] bg-black/35 shadow-[0_28px_60px_rgba(0,0,0,0.55)] md:inset-x-0 md:right-[150px] md:left-[-100px] md:rotate-[-12deg]" />
          <div className="pointer-events-none absolute inset-x-6 bottom-5 top-5 rounded-[28px] bg-[#15171f]/90 shadow-[0_26px_55px_rgba(0,0,0,0.5)] md:inset-x-0 md:right-[105px] md:left-[-58px] md:rotate-[-6deg]" />

          <Swiper
            modules={[Navigation, Pagination, Mousewheel, A11y]}
            slidesPerView={1}
            loop
            speed={700}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 1.1,
            }}
            grabCursor
            navigation={{
              prevEl: '.testimonials-prev',
              nextEl: '.testimonials-next',
            }}
            pagination={{
              el: '.testimonials-pagination',
              clickable: true,
            }}
            className="testimonial-swiper relative z-10"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.name}>
                <article className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(140deg,rgba(44,45,50,0.95),rgba(27,28,33,0.96))] p-7 shadow-[0_35px_70px_rgba(0,0,0,0.5)] md:p-10">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,79,79,0.22),transparent_42%)]" />
                  <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#ff6464] to-[#b52f2f]" />

                  <div className="relative">
                    <span className="text-6xl leading-none text-[#ff4f4f]">&ldquo;</span>

                    <p className="mt-1 max-w-3xl text-base leading-[1.58] tracking-[-0.01em] text-white/88 md:text-2xl">
                      {item.quote}
                    </p>

                    <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="text-xl leading-none tracking-[-0.015em] md:text-3xl">{item.name}</h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.11em] text-white/45">{item.role}</p>
                      </div>
                    </div>
                  </div>

                  <span className="absolute bottom-8 right-7 text-6xl leading-none text-[#ff4f4f]">&rdquo;</span>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between">
            <div className="testimonials-pagination flex items-center gap-2" />

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                className="testimonials-prev grid h-14 w-14 place-items-center rounded-full border border-white/35 text-3xl leading-none text-white/90 transition hover:border-white hover:text-white"
              >
                &#8592;
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                className="testimonials-next grid h-14 w-14 place-items-center rounded-full border border-white/35 text-3xl leading-none text-white/90 transition hover:border-white hover:text-white"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
