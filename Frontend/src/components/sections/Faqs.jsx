import { useEffect, useState } from 'react'
import { fetchFaqs } from '../../services/contentApi'

const fallbackFaqItems = [
  {
    id: 'faq-cost',
    key: 'faq-cost',
    question: 'How much does a website cost?',
    answer:
      'Pricing depends on scope, timeline, and complexity. After a short discovery call, you will get a clear fixed quote or a phased plan that fits your budget.',
  },
  {
    id: 'faq-subscription',
    key: 'faq-subscription',
    question: 'How does the subscription work?',
    answer:
      'You pay a monthly fee for ongoing design and development support. Requests are prioritized in a queue and delivered continuously based on your plan.',
  },
  {
    id: 'faq-cancel',
    key: 'faq-cancel',
    question: 'How do I pause or cancel?',
    answer:
      'You can pause or cancel anytime before your next billing cycle. Your work history and assets remain available so you can resume later without losing progress.',
  },
  {
    id: 'faq-communication',
    key: 'faq-communication',
    question: 'How do I communicate with you?',
    answer:
      'Communication happens through your preferred channel such as email, Slack, or scheduled calls. You will get regular updates and clear delivery checkpoints.',
  },
  {
    id: 'faq-design-feedback',
    key: 'faq-design-feedback',
    question: "What if I don't like the design?",
    answer:
      'Revisions are part of the process. Feedback is used to iterate quickly until the design direction matches your goals and brand expectations.',
  },
]

function Faqs() {
  const [activeFaqId, setActiveFaqId] = useState(null)
  const [faqItems, setFaqItems] = useState(fallbackFaqItems)

  useEffect(() => {
    let isMounted = true

    const loadFaqs = async () => {
      try {
        const faqs = await fetchFaqs()

        if (isMounted) {
          setFaqItems(faqs)
        }
      } catch {
        // Keep fallback FAQs when API is unavailable.
      }
    }

    loadFaqs()

    return () => {
      isMounted = false
    }
  }, [])

  const toggleFaq = (id) => {
    setActiveFaqId((prevId) => (prevId === id ? null : id))
  }

  return (
    <section className="relative z-0 bg-[var(--bg-light)] px-5 py-20 text-black md:px-10 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">FAQ&apos;s</h2>

        <div className="mt-8 flex flex-col gap-4 md:mt-10 md:gap-5">
          {faqItems.map((item, index) => {
            const itemId = item.key || item.id || `faq-${index}`
            const isOpen = activeFaqId === itemId
            const answerId = `${itemId}-answer`

            return (
              <article
                key={itemId}
                className="overflow-hidden rounded-[40px] border border-black/20 bg-[#f4f4f4] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(itemId)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex w-full cursor-pointer flex-col px-6 py-6 text-left md:px-10"
                >
                  <span className="flex min-h-[56px] items-center justify-between gap-6 md:min-h-[64px]">
                    <span className="text-base leading-[1.25] tracking-[-0.02em] md:text-2xl">{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="inline-grid w-10 place-items-center text-4xl leading-none text-black md:w-12 md:text-5xl"
                    >
                      {isOpen ? '-' : '+'}
                    </span>
                  </span>

                  <span
                    id={answerId}
                    className={`grid overflow-hidden text-sm leading-relaxed text-black/75 transition-all duration-300 md:text-lg ${
                      isOpen ? 'mt-3 grid-rows-[1fr] opacity-100 md:mt-4' : 'mt-0 grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <span className="min-h-0">{item.answer}</span>
                  </span>
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Faqs
