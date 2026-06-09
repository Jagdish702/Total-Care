import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHealthConcerns } from '../../hooks/useHealthConcerns';
import { CONCERN_ASSETS } from '../../assets/productImages';

import bgImg          from '../../assets/product-showcase/bg.png';
import trustBannerImg from '../../assets/product-showcase/trust-banner.png';
import chevronRight   from '../../assets/product-showcase/icons/chevron-right.svg';

const cellVariants = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.94, transition: { duration: 0.15, ease: 'easeIn'  } },
};

function ConcernButton({ concern, assets, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative bg-white flex items-center gap-4
                 pl-6 pr-4 py-6 rounded-[24px] w-full text-left
                 drop-shadow-[0px_4px_6px_rgba(0,65,114,0.08)]
                 shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]
                 hover:shadow-[inset_0px_0px_0px_1.5px_rgba(16,185,129,0.5),0px_4px_12px_rgba(0,65,114,0.12)]
                 active:scale-[0.98]
                 transition-all duration-150
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
    >
      <div className="w-12 h-12 shrink-0 flex items-center justify-center overflow-hidden">
        {assets?.icon && (
          <img src={assets.icon} alt="" className="w-full h-full object-contain" />
        )}
      </div>
      <p className="flex-1 min-w-0 font-inter font-medium text-[#004172]
                    text-[clamp(15px,1.33vw,24px)] tracking-[0.3888px] leading-normal text-left">
        {concern.label}
      </p>
      <div className="w-6 h-6 shrink-0 overflow-hidden flex items-center justify-center">
        <img src={chevronRight} alt="" className="w-full h-full object-contain" />
      </div>
    </button>
  );
}

function ProductCard({ concern, onClose }) {
  const assets = CONCERN_ASSETS[concern.id] ?? {};

  // Build recommended product name from first recommendation
  const firstRec = concern.recommendations?.[0];
  const productName = firstRec?.product?.name ?? concern.label;

  // Build description from descriptionParts (API) or fall back to product description
  const descParts = concern.descriptionParts?.length
    ? concern.descriptionParts.map(p => ({ text: p.partText, green: p.isHighlighted }))
    : firstRec?.product?.description
      ? [{ text: firstRec.product.description, green: false }]
      : [];

  return (
    <div
      className="relative bg-[rgba(255,255,255,0.8)]
                 rounded-[48px] lg:rounded-[76px]
                 p-6 lg:p-8
                 w-full flex flex-col items-center
                 gap-8 lg:gap-12"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 lg:top-8 lg:right-8
                   w-9 h-9 flex items-center justify-center
                   rounded-full bg-white/70
                   hover:bg-white transition-colors duration-150
                   shadow-[0px_2px_6px_rgba(0,65,114,0.12)]
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M12 2L2 12M2 2L12 12" stroke="#004172" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="flex flex-col gap-4 items-center text-center w-full">
        <p className="font-inter font-bold text-[clamp(14px,0.9vw,18px)]
                      tracking-[0.5825px] leading-[28px]
                      bg-gradient-to-b from-[#10b981] to-[#00664c]
                      bg-clip-text text-transparent
                      px-10 lg:px-14">
          {productName}
        </p>
        <p className="font-inter font-medium text-[16px] text-[#4d4d4d]
                      tracking-[0.5184px] leading-[28px]">
          will be best fit for you
        </p>
      </div>

      {assets.productImage && (
        <div className="w-full rounded-[40px] overflow-hidden h-[240px] sm:h-[320px] lg:h-[395px]">
          <img
            src={assets.productImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {descParts.length > 0 && (
        <p className="font-inter font-medium text-[16px] tracking-[0.5184px]
                      leading-[28px] text-center max-w-[540px]">
          {descParts.map((part, i) => (
            <span key={i} className={part.green ? 'text-[#30956a]' : 'text-[#4d4d4d]'}>
              {part.text}
            </span>
          ))}
        </p>
      )}

      <div className="flex gap-6 items-center justify-center w-full flex-wrap">
        <button
          className="relative px-6 py-4 rounded-[12px]
                     font-inter font-medium text-[16px] text-[#004172]
                     tracking-[0.2592px] leading-none
                     bg-[rgba(237,249,255,0.2)]
                     drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                     shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                     hover:bg-[rgba(0,65,114,0.06)] transition-colors duration-150
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
        >
          View Details
        </button>
        <button
          className="relative w-[160px] py-4 rounded-[12px]
                     font-inter font-medium text-[16px] text-white
                     tracking-[0.2592px] leading-none
                     bg-[#004172]
                     drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                     hover:bg-[#00345b] transition-colors duration-150
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
        >
          Shop
        </button>
      </div>
    </div>
  );
}

function SkeletonButton() {
  return (
    <div className="bg-white rounded-[24px] h-[88px] animate-pulse
                    shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]" />
  );
}

export default function ProductShowcaseSection() {
  const [activeId, setActiveId] = useState(null);
  const { concerns, loading }   = useHealthConcerns();
  const active = concerns.find(c => c.id === activeId) ?? null;

  return (
    <div className="relative w-full overflow-hidden">
      <section
        className="relative w-full"
        style={{
          backgroundImage:      `url(${bgImg})`,
          backgroundAttachment: 'fixed',
          backgroundSize:       'cover',
          backgroundPosition:   'left center',
          backgroundColor:      '#e4f2e8',
        }}
      >
        <div
          className="relative z-10
                     flex items-center justify-end
                     px-4 py-10
                     sm:px-8 sm:py-12
                     lg:p-[120px]"
        >
          <AnimatePresence mode="wait" initial={false}>

            {active === null && (
              <motion.div
                key="default"
                variants={cellVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-8 lg:gap-12 items-start
                           w-full lg:w-[750px] shrink-0"
              >
                <div className="font-inter font-bold leading-none">
                  <p className="text-[clamp(40px,4.9vw,88px)]
                                bg-gradient-to-b from-[#10b981] to-[#00664c]
                                bg-clip-text text-transparent">
                    Get care
                  </p>
                  <p className="text-[clamp(40px,4.9vw,88px)] text-black">
                    that fits you
                  </p>
                </div>

                <p className="font-inter font-light text-[clamp(16px,1.33vw,24px)] text-black
                              tracking-[0.3888px] leading-none">
                  Select your health focus
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 w-full">
                  {loading
                    ? Array.from({ length: 6 }).map((_, i) => <SkeletonButton key={i} />)
                    : concerns.map(concern => (
                        <ConcernButton
                          key={concern.id}
                          concern={concern}
                          assets={CONCERN_ASSETS[concern.id]}
                          onClick={() => setActiveId(concern.id)}
                        />
                      ))
                  }
                </div>

                <div className="w-full aspect-[820/119] rounded-[32px] overflow-hidden shrink-0
                               shadow-[0px_0px_12px_0px_rgba(67,172,105,0.16)]">
                  <img src={trustBannerImg} alt="" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            )}

            {active !== null && (
              <motion.div
                key={active.id}
                variants={cellVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full lg:w-[750px] shrink-0"
              >
                <ProductCard
                  concern={active}
                  onClose={() => setActiveId(null)}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
