import { Fragment } from 'react';

import lifestyle1Img from '../../assets/product-explore/built-lifestyle-1.png';
import lifestyle2Img from '../../assets/product-explore/built-lifestyle-2.png';
import lifestyle3Img from '../../assets/product-explore/built-lifestyle-3.png';
import lifestyle4Img from '../../assets/product-explore/built-lifestyle-4.png';
import scale2Img     from '../../assets/product-explore/built-for-scale-2.png';
import scale4Img     from '../../assets/product-explore/built-for-scale-4.png';
import bp1Img        from '../../assets/product-explore/built-for-bp-1.png';
import bp4Img        from '../../assets/product-explore/built-for-bp-4.png';
import glucose1Img   from '../../assets/product-explore/built-for-glucose-1.png';
import glucose2Img   from '../../assets/product-explore/built-for-glucose-2.png';
import glucose3Img   from '../../assets/product-explore/built-for-glucose-3.png';
import glucose4Img   from '../../assets/product-explore/built-for-glucose-4.png';

/* ─── Image key → local asset map ───────────────────────────────────────── */
const LIFESTYLE_IMAGES = {
  lifestyle1: lifestyle1Img,
  lifestyle2: lifestyle2Img,
  lifestyle3: lifestyle3Img,
  lifestyle4: lifestyle4Img,
  scale2:     scale2Img,
  scale4:     scale4Img,
  bp1:        bp1Img,
  bp4:        bp4Img,
  glucose1:   glucose1Img,
  glucose2:   glucose2Img,
  glucose3:   glucose3Img,
  glucose4:   glucose4Img,
};

/* ─── Caption renderer ───────────────────────────────────────────────────── */
function renderWithBreaks(text) {
  const parts = String(text).split('\n');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <br />}
    </Fragment>
  ));
}

function Cap({ segments }) {
  return (
    <p className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-black">
      {segments.map((seg, i) =>
        seg.color
          ? <span key={i} style={{ color: seg.color }}>{renderWithBreaks(seg.text)}</span>
          : <span key={i}>{renderWithBreaks(seg.text)}</span>
      )}
    </p>
  );
}

function parseCard(raw) {
  let segments = [];
  try { segments = JSON.parse(raw.captionJson); } catch { /* fallback: empty */ }
  return {
    img: raw.imageUrl ?? LIFESTYLE_IMAGES[raw.imageKey] ?? lifestyle1Img,
    segments,
  };
}

/* ─── CartIcon ───────────────────────────────────────────────────────────── */
function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
      className="shrink-0 drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)]">
      <path d="M1.5 1.5H4L5.76 10.39C5.82 10.7 5.99 10.98 6.24 11.17C6.49 11.36 6.8 11.46 7.12 11.45H13.5C13.82 11.46 14.13 11.36 14.38 11.17C14.63 10.98 14.8 10.7 14.86 10.39L16 4.5H4.17"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="15" r="1" fill="white"/>
      <circle cx="13.5" cy="15" r="1" fill="white"/>
    </svg>
  );
}

/* ─── BuiltForProgressSection ───────────────────────────────────────────── */
export default function BuiltForProgressSection({ product }) {
  const rawCards = product?.lifestyleCards ?? [];
  const cards    = rawCards.map(parseCard);

  return (
    <section className="w-full bg-white">
      <div
        className="flex flex-col items-center
                   gap-[80px]
                   px-6 py-[60px]
                   lg:px-[120px] lg:pt-[150px] lg:pb-[300px]"
      >
        {/* Heading — mobile: stacked (flex-col); desktop: inline (flex-row) */}
        <h2 className="flex flex-col items-center gap-0 text-center
                       lg:flex-row lg:items-baseline lg:gap-x-6
                       font-inter font-bold leading-none
                       text-[48px] lg:text-[88px]">
          <span className="text-black">Built for</span>
          <span className="text-[#808080] italic lg:not-italic">Progress</span>
        </h2>

        {/* Cards — mobile: single column (flex-wrap); desktop: horizontal row */}
        <div className="flex flex-wrap gap-[48px] items-start justify-center
                        w-full
                        lg:flex-nowrap lg:overflow-x-auto lg:pb-2">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col gap-[19px] items-center
                         w-full max-w-[350px] lg:shrink-0 lg:w-[350px]"
            >
              <div
                className="relative w-full rounded-[40px] overflow-hidden"
                style={{ aspectRatio: '350 / 450' }}
              >
                <img
                  src={card.img}
                  alt={`Built for Progress — card ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="w-full px-6">
                <Cap segments={card.segments} />
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-[10px] items-center w-full max-w-[448px]">
          <button
            type="button"
            onClick={() =>
              document.getElementById('how-it-works')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            className="flex-1 h-[40px] flex items-center justify-center
                       px-4 py-2 rounded-xl
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       font-inter font-medium text-[16px] tracking-[0.2592px]
                       text-[#004172] whitespace-nowrap
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
          >
            See how it works
          </button>

          <button
            type="button"
            className="relative flex-1 h-[40px] flex items-center justify-center gap-2
                       px-4 py-2 rounded-xl
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       font-inter font-medium text-[16px] tracking-[0.2592px]
                       text-white whitespace-nowrap
                       hover:brightness-110 active:brightness-90
                       transition-all duration-150
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
          >
            <div className="absolute inset-0 bg-[#004172] rounded-xl pointer-events-none" />
            <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
            <span className="relative z-10">Add to Cart</span>
            <span className="relative z-10"><CartIcon /></span>
          </button>
        </div>
      </div>
    </section>
  );
}
