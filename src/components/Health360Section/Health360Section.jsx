import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

import img0 from '../../assets/health360/h360-0.jpg';
import img1 from '../../assets/health360/h360-1.jpg';
import img2 from '../../assets/health360/h360-2.jpg';
import img3 from '../../assets/health360/h360-3.jpg';

const FRAMES = [
  {
    titleLines: ['Your Health.', 'Connected. Understood.'],
    body: 'All your devices, insights, and care, synced into one continuous health journey.',
    bullets: [],
  },
  {
    titleLines: ['Unified Device Ecosystem'],
    body: 'We bring your metrics together. Gain an accurate, consolidated baseline of your vital signs from the devices you already trust.',
    bullets: ['Clinical Accuracy', 'Ambient Monitoring', 'Seamless Integration'],
  },
  {
    titleLines: ['Precision Insights with CureBay'],
    body: 'Your raw device data is normalized and transformed into a powerful daily health narrative.',
    bullets: ['Holistic Wellness Score', 'Deep Trends', 'Targeted Alerts'],
  },
  {
    titleLines: ['Data-Driven Medical Consultation'],
    body: "Your insights don't stop with you. Your assigned Family Health Doctor and AI Companion turn analysis into action.",
    bullets: ['Informed Decisions', 'Precision Treatment', 'AI-Orchestrated Action Plan'],
  },
];

const IMGS = [img0, img1, img2, img3];

// ── Mobile 360 Section ────────────────────────────────────────────────────────
function MobileHealth360Section() {
  const [activeFrame, setActiveFrame] = useState(0);
  const [dir, setDir] = useState(1); // swipe direction: 1 = forward, -1 = backward
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(FRAMES.length - 1, i));
    setDir(i > activeFrame ? 1 : -1);
    setActiveFrame(clamped);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    // Only fire if clearly horizontal (avoid hijacking vertical page scroll)
    if (Math.abs(dx) > Math.abs(dy) * 1.2 && Math.abs(dx) > 40) {
      if (dx > 0) goTo(activeFrame + 1); // swipe left → next
      else goTo(activeFrame - 1);        // swipe right → prev
    }
  };

  return (
    <div
      className="bg-[#f9f9f9] flex flex-col items-center gap-10 px-6 py-12"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Title ── */}
      <h2
        className="font-inter font-bold text-black text-center"
        style={{ fontSize: '40px', lineHeight: '1.1', letterSpacing: '-0.5px' }}
      >
        Your health simplified 360°
      </h2>

      {/* ── Card + Text + Dots ── */}
      <div className="flex flex-col items-center w-full">

        {/* Image — CSS cross-fade, same mechanism as desktop */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: '14px',
            aspectRatio: '354 / 161',
            boxShadow: '0px 0.59px 5.9px 0px rgba(0,65,114,0.08)',
          }}
        >
          <div aria-hidden className="absolute inset-0 bg-white" />
          {IMGS.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
              style={{ opacity: i === activeFrame ? 1 : 0 }}
            />
          ))}
          {/* inner stroke */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: '14px',
              boxShadow: 'inset 0px 0px 0.59px 0px rgba(0,65,114,0.12)',
            }}
          />
        </div>

        {/* Text panel — fixed height prevents layout shift during transition */}
        <div className="relative w-full overflow-hidden mt-1" style={{ height: '216px' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={activeFrame}
              custom={dir}
              initial={(d) => ({ opacity: 0, x: d * 24 })}
              animate={{ opacity: 1, x: 0 }}
              exit={(d) => ({ opacity: 0, x: -d * 24 })}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute inset-0 flex flex-col justify-center"
              style={{ gap: '16px' }}
            >
              {activeFrame === 0 ? (
                /* Frame 0 — slightly different typography (Figma Mobile/H3-B) */
                <>
                  <h3
                    className="font-inter font-bold text-[#333]"
                    style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '0.324px' }}
                  >
                    {FRAMES[0].titleLines.map((line, j) => (
                      <span key={j} className="block">{line}</span>
                    ))}
                  </h3>
                  <p
                    className="font-inter font-light text-black"
                    style={{ fontSize: '14px', lineHeight: '24px', letterSpacing: '0.454px' }}
                  >
                    {FRAMES[0].body}
                  </p>
                </>
              ) : (
                /* Frames 1-3 — title + body + bullet list */
                <>
                  <h3
                    className="font-inter font-bold text-[#333]"
                    style={{ fontSize: '24px', lineHeight: 'normal' }}
                  >
                    {FRAMES[activeFrame].titleLines[0]}
                  </h3>
                  <p
                    className="font-inter font-light text-black"
                    style={{ fontSize: '13.31px', lineHeight: '23.292px', letterSpacing: '0.431px' }}
                  >
                    {FRAMES[activeFrame].body}
                  </p>
                  <ul
                    className="font-inter font-light list-disc pl-5"
                    style={{
                      fontSize: '13.31px',
                      lineHeight: '23.292px',
                      letterSpacing: '0.431px',
                      color: '#30956a',
                    }}
                  >
                    {FRAMES[activeFrame].bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows + dots row */}
        <div className="flex items-center gap-4 mt-5">

          {/* Left arrow */}
          <motion.button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(activeFrame - 1)}
            animate={{ opacity: activeFrame === 0 ? 0.25 : 1 }}
            transition={{ duration: 0.15 }}
            disabled={activeFrame === 0}
            className="flex items-center justify-center rounded-full border-0 p-0 cursor-pointer bg-transparent"
            style={{ width: '32px', height: '32px', flexShrink: 0 }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15.5" stroke="#004172" strokeOpacity="0.2" />
              <path d="M18 10.5L12.5 16L18 21.5" stroke="#004172" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-[10px]">
            {FRAMES.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                aria-label={`Go to step ${i + 1}`}
                onClick={() => goTo(i)}
                animate={{
                  scale: i === activeFrame ? 1.5 : 1,
                  opacity: i === activeFrame ? 1 : 0.3,
                }}
                transition={{ duration: 0.15 }}
                className="w-[8px] h-[8px] rounded-full bg-[#004172] border-0 p-0 cursor-pointer"
              />
            ))}
          </div>

          {/* Right arrow */}
          <motion.button
            type="button"
            aria-label="Next"
            onClick={() => goTo(activeFrame + 1)}
            animate={{ opacity: activeFrame === FRAMES.length - 1 ? 0.25 : 1 }}
            transition={{ duration: 0.15 }}
            disabled={activeFrame === FRAMES.length - 1}
            className="flex items-center justify-center rounded-full border-0 p-0 cursor-pointer bg-transparent"
            style={{ width: '32px', height: '32px', flexShrink: 0 }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15.5" stroke="#004172" strokeOpacity="0.2" />
              <path d="M14 10.5L19.5 16L14 21.5" stroke="#004172" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

        </div>
      </div>
    </div>
  );
}

// ── Desktop 360 Section ───────────────────────────────────────────────────────
export default function Health360Section() {
  const stickyRef = useRef(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Hooks must be called unconditionally — guard side-effects with isMobile instead
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!isMobile) {
      setActiveFrame(Math.min(FRAMES.length - 1, Math.floor(v * FRAMES.length)));
    }
  });

  if (isMobile) return <MobileHealth360Section />;

  return (
    <div className="bg-[#f5faff]">

      {/* ── Heading: scrolls normally, NOT part of the sticky section ── */}
      <div className="flex items-center justify-center pt-[120px] pb-[60px]">
        <h2 className="font-inter font-bold text-[clamp(40px,5.5vw,88px)] leading-none text-black whitespace-nowrap">
          Your health simplified 360°
        </h2>
      </div>

      {/* ── Sticky scroll section: card + text + dots ── */}
      {/* 500vh = 4 states × 100vh each + 100vh viewport */}
      <div ref={stickyRef} style={{ height: '500vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[#f5faff] flex flex-col items-center justify-between pt-[40px] pb-[36px]">

          {/* Dashboard card — CSS opacity transition, no MotionValue flash */}
          <div className="relative w-full max-w-[1300px] rounded-[52px] overflow-hidden shrink-0
            shadow-[0px_2.167px_21.667px_0px_rgba(0,65,114,0.08)]"
            style={{ height: 'min(541px, calc(100vh - 380px))' }}>
            <div aria-hidden className="absolute inset-0 bg-white rounded-[52px]" />
            {IMGS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                style={{ opacity: i === activeFrame ? 1 : 0 }}
              />
            ))}
            <div aria-hidden className="absolute inset-0 rounded-[52px] shadow-[inset_0px_0px_2.167px_0px_rgba(0,65,114,0.12)]" />
          </div>

          {/* Text — one frame at a time, instant snap + quick fade */}
          <div className="relative w-full max-w-[828px] h-[250px] overflow-hidden shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFrame}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute inset-0 flex flex-col gap-8 text-center justify-center"
              >
                <h3 className="font-inter font-bold text-[32px] leading-tight text-[#333]">
                  {FRAMES[activeFrame].titleLines.map((line, j) => (
                    <span key={j} className="block">{line}</span>
                  ))}
                </h3>
                <p className="font-inter font-light text-[16px] leading-7 tracking-[0.5px] text-black">
                  {FRAMES[activeFrame].body}
                </p>
                {FRAMES[activeFrame].bullets.length > 0 && (
                  <ul className="font-inter font-light text-[16px] leading-7 tracking-[0.5px] text-[#30956a] list-disc inline-block text-left pl-6 mx-auto">
                    {FRAMES[activeFrame].bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots — always visible at the bottom */}
          <div className="flex items-center gap-[10px] shrink-0">
            {FRAMES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === activeFrame ? 1.5 : 1,
                  opacity: i === activeFrame ? 1 : 0.3,
                }}
                transition={{ duration: 0.15 }}
                className="w-[8px] h-[8px] rounded-full bg-[#004172]"
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
