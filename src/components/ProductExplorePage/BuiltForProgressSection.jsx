/* ─── Existing images reused ────────────────────────────────────────────────
   built-lifestyle-1 = scale device (scale card 1)
   built-lifestyle-2 = health-trends app  (scale card 3)
   built-lifestyle-3 = woman yoga + BP cuff  (bp card 2)
   built-lifestyle-4 = woman on couch + BP cuff (bp card 3)
────────────────────────────────────────────────────────────────────────── */
import scale1Img   from '../../assets/product-explore/built-lifestyle-1.png';
import scale3Img   from '../../assets/product-explore/built-lifestyle-2.png';
import bp2Img      from '../../assets/product-explore/built-lifestyle-3.png';
import bp3Img      from '../../assets/product-explore/built-lifestyle-4.png';

import scale2Img   from '../../assets/product-explore/built-for-scale-2.png';
import scale4Img   from '../../assets/product-explore/built-for-scale-4.png';
import bp1Img      from '../../assets/product-explore/built-for-bp-1.png';
import bp4Img      from '../../assets/product-explore/built-for-bp-4.png';
import glucose1Img from '../../assets/product-explore/built-for-glucose-1.png';
import glucose2Img from '../../assets/product-explore/built-for-glucose-2.png';
import glucose3Img from '../../assets/product-explore/built-for-glucose-3.png';
import glucose4Img from '../../assets/product-explore/built-for-glucose-4.png';

/* ─── Caption helper ─────────────────────────────────────────────────────── */
function Cap({ segments }) {
  return (
    <p className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-black">
      {segments.map((seg, i) =>
        seg.color
          ? <span key={i} style={{ color: seg.color }}>{seg.text}</span>
          : <span key={i}>{seg.text}</span>
      )}
    </p>
  );
}

/* ─── Per-product card data ──────────────────────────────────────────────── */
const SCALE_CARDS = [
  {
    img: scale1Img,
    caption: <Cap segments={[
      { text: 'Track your ' },
      { text: 'baseline weight and body fat', color: '#d29300' },
      { text: ' first thing in the morning for the most consistent data.' },
    ]} />,
  },
  {
    img: scale2Img,
    caption: <Cap segments={[
      { text: 'Monitor ' },
      { text: 'muscle mass gains and hydration levels', color: '#d82525' },
      { text: ' to optimize your recovery and training intensity.' },
    ]} />,
  },
  {
    img: scale3Img,
    caption: <Cap segments={[
      { text: 'Visualize ' },
      { text: 'long-term trends', color: '#30956a' },
      { text: ' through the app, helping you stay motivated toward your fitness goals.' },
    ]} />,
  },
  {
    img: scale4Img,
    caption: <Cap segments={[
      { text: 'Use ' },
      { text: 'visceral fat and metabolic age data', color: '#008eb1' },
      { text: ' to make informed decisions about your diet and lifestyle.' },
    ]} />,
  },
];

const BP_CARDS = [
  {
    img: bp1Img,
    caption: <Cap segments={[
      { text: 'Morning check', color: '#008eb1' },
      { text: ' before your day starts\nStay informed before your routine begins.' },
    ]} />,
  },
  {
    img: bp2Img,
    caption: <Cap segments={[
      { text: 'Track after activity or stress', color: '#008eb1' },
      { text: '\nUnderstand how your body responds in real time.' },
    ]} />,
  },
  {
    img: bp3Img,
    caption: <Cap segments={[
      { text: 'After a long day', color: '#30956a' },
      { text: '\nStress leaves signals. Now you can see them.' },
    ]} />,
  },
  {
    img: bp4Img,
    caption: <Cap segments={[
      { text: 'Before sleep', color: '#008eb1' },
      { text: '\nEnd the day with clarity, not assumptions.' },
    ]} />,
  },
];

const GLUCOSE_CARDS = [
  {
    img: glucose1Img,
    caption: <Cap segments={[
      { text: 'Start your day with a quick glucose check. ', color: '#d29300' },
      { text: 'Understand fasting levels early and make smarter food and activity decisions throughout the day.' },
    ]} />,
  },
  {
    img: glucose2Img,
    caption: <Cap segments={[
      { text: 'Measure glucose after meals to see how your body reacts. ', color: '#d82525' },
      { text: 'Identify foods causing spikes and adjust portions for better daily control.' },
    ]} />,
  },
  {
    img: glucose3Img,
    caption: <Cap segments={[
      { text: 'Track glucose around physical activity. ', color: '#3cba84' },
      { text: 'Ensure levels stay balanced to avoid sudden drops or fatigue during workouts or daily movement routines.' },
    ]} />,
  },
  {
    img: glucose4Img,
    caption: <Cap segments={[
      { text: 'Check glucose before bed to prevent overnight risks. ', color: '#00b2dd' },
      { text: 'Sleep with confidence knowing your levels are within a safe and stable range.' },
    ]} />,
  },
];

/* ─── Heading + cards config per product ─────────────────────────────────── */
const PRODUCT_CONFIG = {
  bp: {
    accent: 'Progress',
    cards: BP_CARDS,
  },
  scale: {
    accent: 'Progress',
    cards: SCALE_CARDS,
  },
  glucose: {
    accent: 'Progress',
    cards: GLUCOSE_CARDS,
  },
  'bp-essentials': {
    accent: 'Progress',
    cards: [SCALE_CARDS[0], SCALE_CARDS[2], BP_CARDS[1], BP_CARDS[2]],
  },
  'diabetes-essentials': {
    accent: 'Progress',
    cards: [SCALE_CARDS[0], SCALE_CARDS[2], GLUCOSE_CARDS[0], GLUCOSE_CARDS[1]],
  },
  'complete-essentials': {
    accent: 'Progress',
    cards: [SCALE_CARDS[0], BP_CARDS[1], GLUCOSE_CARDS[0], GLUCOSE_CARDS[2]],
  },
};

const DEFAULT_CONFIG = {
  accent: 'Progress',
  cards: SCALE_CARDS,
};

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
  const config = (product && PRODUCT_CONFIG[product.id]) || DEFAULT_CONFIG;
  const { accent, cards } = config;

  return (
    <section className="w-full bg-white">
      <div
        className="flex flex-col gap-[80px] items-center
                   px-4 md:px-8 lg:px-16 xl:px-[120px]
                   pt-[80px] md:pt-[120px] lg:pt-[150px]
                   pb-[80px] md:pb-[150px] lg:pb-[300px]"
      >
        {/* Heading */}
        <h2 className="flex flex-wrap gap-x-6 items-baseline justify-center
                       font-inter font-bold leading-none text-center
                       text-[48px] md:text-[64px] lg:text-[88px]">
          <span className="text-black">Built for</span>
          <span className="text-[#808080]">{accent}</span>
        </h2>

        {/* 4 cards */}
        <div className="flex gap-[48px] items-start justify-center
                        w-full overflow-x-auto pb-2
                        snap-x snap-mandatory">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col gap-[19px] items-center
                         shrink-0 w-[280px] md:w-[320px] lg:w-[350px]
                         snap-start"
            >
              <div
                className="relative w-full rounded-[40px] overflow-hidden"
                style={{ aspectRatio: '350 / 450' }}
              >
                <img
                  src={card.img}
                  alt={`Built for ${accent} — card ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="w-full px-6">
                {card.caption}
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
