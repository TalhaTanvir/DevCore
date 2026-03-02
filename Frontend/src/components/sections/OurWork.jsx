import { useEffect, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { projectCards as fallbackProjectCards } from '../../data/projects'
import { fetchWorkItems } from '../../services/contentApi'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function OurWork() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState(fallbackProjectCards)

  useEffect(() => {
    let isMounted = true

    const fetchProjects = async () => {
      try {
        const workItems = await fetchWorkItems()
        if (isMounted) {
          setProjects(workItems)
        }
      } catch {
        // Keep fallback static cards when API is unavailable.
      }
    }

    fetchProjects()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 relative z-10 block bg-[var(--bg-light)] px-5 pb-20 pt-12 text-[#0d1022] md:px-10 md:pb-28 md:pt-16"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="relative w-full max-w-5xl pt-4 md:pt-6">
          <h2 className="mx-auto max-w-5xl text-center text-4xl leading-[1.03] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            Full-Stack Solutions
            <br />
            Delivered End-to-End
          </h2>
        </div>

        <p className="mt-10 max-w-2xl text-center text-base leading-[1.6] text-[#1d2238]/75 md:text-lg">
          A curated portfolio of full-stack web solutions spanning UX-focused interfaces, scalable backend systems,
          and production-ready deployments
        </p>

        <div className="mt-16 w-full">
          <h3 className="text-2xl leading-[1.2] tracking-[-0.02em] md:text-3xl">Featured Projects</h3>

          <div className="mt-8">
            <Swiper
              modules={[Navigation, Pagination]}
              speed={600}
              grabCursor
              slidesPerView={1.12}
              spaceBetween={14}
              navigation={{
                prevEl: '.ourwork-prev',
                nextEl: '.ourwork-next',
              }}
              pagination={{
                el: '.ourwork-pagination',
                clickable: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2.05, spaceBetween: 14 },
                900: { slidesPerView: 3.05, spaceBetween: 16 },
                1200: { slidesPerView: 4.15, spaceBetween: 16 },
              }}
              className="ourwork-swiper"
            >
              {projects.map((card) => (
                <SwiperSlide key={card.key}>
                  <article
                    className="relative h-[390px] w-full overflow-hidden rounded-[28px] bg-cover bg-center md:h-[460px]"
                    style={{ backgroundColor: card.fallback, backgroundImage: card.image }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

                    <div className="absolute inset-x-0 bottom-16 px-5 md:px-6">
                      <h4 className="text-lg font-bold leading-[1.15] tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] md:text-xl">
                        {card.title}
                      </h4>
                      <p className="mt-2 max-w-xl text-xs leading-[1.45] text-[#d1d5db] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] md:text-sm">
                        {card.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate('/projects')}
                      className="group absolute bottom-3 left-3 right-3 inline-flex h-11 items-center justify-between overflow-hidden rounded-full border border-white/75 bg-transparent px-5 text-[26px] leading-none text-white backdrop-blur-[2px] transition-colors duration-300 before:absolute before:inset-y-0 before:-left-16 before:w-12 before:rotate-12 before:bg-white/30 before:blur-sm before:transition-all before:duration-500 hover:text-white hover:before:left-[120%] md:bottom-4 md:left-4 md:right-4 md:h-12"
                    >
                      <span className="relative z-10 text-2xl tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1">
                        Explore more
                      </span>
                      <span className="relative z-10 text-3xl transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110">
                        &rarr;
                      </span>
                    </button>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-6 flex items-center justify-between">
              <div className="ourwork-pagination flex items-center gap-2" />

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous project"
                  className="ourwork-prev grid h-12 w-12 place-items-center rounded-full border border-[#1a2138]/40 text-[#101624] transition hover:border-[#1a2138]/70"
                >
                  <FiArrowLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  className="ourwork-next grid h-12 w-12 place-items-center rounded-full border border-[#1a2138]/40 text-[#101624] transition hover:border-[#1a2138]/70"
                >
                  <FiArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurWork
