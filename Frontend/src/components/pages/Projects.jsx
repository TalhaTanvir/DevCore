import { useEffect, useMemo, useState } from 'react'
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { projectCards as fallbackProjectCards } from '../../data/projects'
import { fetchWorkItems } from '../../services/contentApi'

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
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

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map((project) => project.category))]
    return ['All', ...uniqueCategories]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects
    }

    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory, projects])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--bg-white)] pb-20 text-[#0f172a]">
      <div className="w-full rounded-b-[30px] bg-black pt-28 md:rounded-b-[36px] md:pt-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10 md:py-12">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Portfolio</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              Recent projects
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
              Explore work across product, design, and engineering. Every project balances brand clarity, performance, and measurable growth.
            </p>
          </div>

          <Link
            to="/#portfolio"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/15"
          >
            <FiArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="mt-10 flex flex-wrap gap-3 md:mt-12">
          {categories.map((category) => {
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium tracking-[-0.01em] transition md:px-5 md:text-base ${
                  isActive
                    ? 'border-[#ff5555] bg-[#ff5555] text-white shadow-[0_10px_26px_rgba(255,85,85,0.25)]'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        <div className="mt-12 grid gap-6 md:mt-14 md:gap-7 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.key}
              className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(15,23,42,0.12)]"
            >
              <div className="aspect-[16/10] w-full overflow-hidden" style={{ backgroundColor: project.fallback }}>
                <div
                  className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: project.image }}
                />
              </div>

              <div className="p-5 md:p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{project.category}</p>
                <h2 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.015em] text-black md:text-2xl">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  {project.subtitle}
                </p>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-[#ff5555] hover:text-[#ff5555]"
                >
                  View more
                  <FiArrowUpRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
