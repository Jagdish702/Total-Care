import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from './faqData';

/* ─── Answer content renderer ────────────────────────────────────────────── */
const answerTextCls =
  'font-inter font-light text-[16px] text-[#ccc] leading-7 tracking-[0.5184px]';

function AnswerContent({ answer }) {
  if (typeof answer === 'string') {
    return <p className={answerTextCls}>{answer}</p>;
  }

  if (Array.isArray(answer)) {
    return (
      <ul className="list-disc pl-5 flex flex-col gap-1">
        {answer.map((item, i) => (
          <li key={i} className={answerTextCls}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (answer?.steps) {
    return (
      <div className="flex flex-col gap-5">
        {answer.steps.map((step, i) => (
          <div key={i} className="flex flex-col gap-2">
            <p className="font-inter font-medium text-[15px] text-white tracking-[0.4px] leading-6">
              {step.title}
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              {step.items.map((item, j) => (
                <li key={j} className={answerTextCls}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

/* ─── Plus / × toggle icon ───────────────────────────────────────────────── */
function ToggleIcon({ isOpen }) {
  return (
    <motion.div
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center
                 shrink-0 drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)]"
      aria-hidden="true"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <line x1="5" y1="0.5"  x2="5" y2="9.5"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0.5" y1="5" x2="9.5" y2="5"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

/* ─── FAQ Item ────────────────────────────────────────────────────────────── */
function FAQItem({ item, isOpen, onToggle, isLast }) {
  return (
    <div
      className={`flex flex-col py-[30px]
                  ${!isLast ? 'border-b border-white/10' : ''}`}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className="flex items-center gap-6 w-full text-left
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
        aria-expanded={isOpen}
      >
        <p
          className="flex-1 min-w-0 font-inter font-medium text-[24px] text-white
                     tracking-[0.389px] leading-normal
                     max-lg:text-[20px] max-md:text-[16px]"
          style={{ leadingTrim: 'both', textEdge: 'cap' }}
        >
          {item.question}
        </p>
        <ToggleIcon isOpen={isOpen} />
      </button>

      {/* Animated answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pt-4 px-6 max-md:px-2">
              <AnswerContent answer={item.answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── FAQSection ──────────────────────────────────────────────────────────── */
export default function FAQSection() {
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) =>
    setActiveId((prev) => (prev === id ? null : id));

  return (
    <section
      className="bg-black w-full flex flex-col items-center
                 px-[120px] py-[150px]
                 max-xl:px-16 max-xl:py-[100px]
                 max-lg:px-10 max-lg:py-20
                 max-md:px-5 max-md:py-14"
    >
      {/* ── Heading ── */}
      <div
        className="flex gap-3 items-center justify-center w-full
                   mb-[80px] max-md:mb-12"
      >
        <h2
          className="font-inter font-bold text-[88px] text-[#808080] leading-none
                     whitespace-nowrap
                     max-xl:text-[72px] max-lg:text-[56px] max-md:text-[36px]"
        >
          Question ?
        </h2>
        <h2
          className="font-inter font-bold text-[88px] text-white leading-none
                     whitespace-nowrap
                     max-xl:text-[72px] max-lg:text-[56px] max-md:text-[36px]"
        >
          Answers
        </h2>
      </div>

      {/* ── FAQ list ── */}
      <div className="flex flex-col w-full max-w-[1560px]">
        {faqData.map((item, index) => (
          <FAQItem
            key={item.id}
            item={item}
            isOpen={activeId === item.id}
            onToggle={() => handleToggle(item.id)}
            isLast={index === faqData.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
