import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const ACCENT = '#ff5555';
void motion;

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Custom hook for typewriter / rotating words (pure JS, no deps)
function useRotatingText(words = [], typingSpeed = 80, deletingSpeed = 50, pause = 1800) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (charIndex < currentWord.length) {
          setDisplayText((prev) => prev + currentWord[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          // Pause at end
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // Deleting backward
        if (charIndex > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          // Move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  // Reset on mount/unmount if needed
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return displayText;
}

export default function HeroSection() {
  const words = ['Websites', 'Brands', 'Experiences', 'Solutions', 'Growth'];

  const rotatingText = useRotatingText(words, 70, 40, 2000);
  const [particles] = useState(() =>
    Array.from({ length: 42 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <section className="relative isolate min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--bg-dark)] text-white">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-white/45"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, 10, 0],
              opacity: [0.12, 0.6, 0.12],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <div className="relative z-10 w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center space-y-8 md:space-y-12">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-none"
          >
            <span className="text-white block sm:inline">We craft exceptional</span>{' '}
            <span
              className="inline-block min-w-[180px] sm:min-w-[260px] text-left"
              style={{ color: ACCENT }}
            >
              {rotatingText}
              <span className="animate-blink" style={{ color: ACCENT }}>
                |
              </span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl text-slate-300/90 font-light leading-relaxed"
          >
            Performance-first web development • Scalable architecture •
            <span style={{ color: ACCENT }}> Results-obsessed</span>
            <span style={{ color: ACCENT }}>,</span> made for ambitious brands.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7 pt-6"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              className={cn(
                'group relative inline-flex items-center gap-3 px-8 py-5',
                'text-lg font-semibold rounded-2xl shadow-2xl',
                'bg-white text-slate-950 hover:bg-slate-100',
                'transition-all duration-300'
              )}
            >
              Launch Your Project
              <FiArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
            </motion.a>

            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'inline-flex items-center px-8 py-5 text-lg font-medium rounded-2xl',
                'border border-slate-700/70 text-slate-200',
                'hover:bg-[#272727] hover:border-slate-600/80',
                'transition-all duration-300'
              )}
            >
              View Our Work
            </motion.a>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
