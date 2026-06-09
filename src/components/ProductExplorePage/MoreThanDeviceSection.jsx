import moreThanDeviceImg from '../../assets/product-explore/more-than-device.png';

/* ─── Product-specific config ────────────────────────────────────────────────
   image  → the full-width ecosystem diagram for this product
   features → bullet list (right column, Figma w-[457px])
   Add a dedicated image per product once assets are available.
──────────────────────────────────────────────────────────────────────────── */
const PRODUCT_CONFIG = {
  'complete-essentials': {
    image: moreThanDeviceImg,
    features: [
      'Blood sugar, BP, pulse & body composition — all in one',
      'Syncs with Total Care app',
      'AI insights + alerts',
      'Doctor support when needed',
    ],
  },
  'bp-essentials': {
    image: moreThanDeviceImg,
    features: [
      'Blood pressure & pulse monitoring, daily',
      'Body composition tracking — BMI, fat, muscle',
      'Syncs with Total Care app',
      'AI insights + doctor support',
    ],
  },
  'diabetes-essentials': {
    image: moreThanDeviceImg,
    features: [
      'Fast blood glucose results in 5 seconds',
      'Body composition — weight, BMI & body fat',
      'Syncs with Total Care app',
      'AI insights + alerts',
    ],
  },
  'scale': {
    image: moreThanDeviceImg,
    features: [
      'Tracks fat, muscle, BMI, metabolism',
      'Syncs with Total Care app',
      'AI insights + alerts',
      'Doctor support when needed',
    ],
  },
  'glucose': {
    image: moreThanDeviceImg,
    features: [
      'Fast results in 5 seconds, 900-test memory',
      'Before & after meal sugar tracking',
      'Syncs with Total Care app',
      'AI insights + alerts',
    ],
  },
  'bp': {
    image: moreThanDeviceImg,
    features: [
      'Clinically validated BP & pulse monitoring',
      'Irregular heartbeat detection',
      'Syncs with Total Care app',
      'AI insights + doctor support',
    ],
  },
};

const DEFAULT_CONFIG = {
  image: moreThanDeviceImg,
  features: [
    'Tracks fat, muscle, BMI, metabolism',
    'Syncs with Total Care app',
    'AI insights + alerts',
    'Doctor support when needed',
  ],
};

/* ─── CartIcon ────────────────────────────────────────────────────────────── */
function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
      className="shrink-0 drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)]">
      <path d="M1.5 1.5H4L5.76 10.39C5.82 10.7 5.99 10.98 6.24 11.17C6.49 11.36 6.8 11.46 7.12 11.45H13.5C13.82 11.46 14.13 11.36 14.38 11.17C14.63 10.98 14.8 10.7 14.86 10.39L16 4.5H4.17"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7"  cy="15" r="1" fill="white"/>
      <circle cx="13.5" cy="15" r="1" fill="white"/>
    </svg>
  );
}

/* ─── MoreThanDeviceSection ───────────────────────────────────────────────── */
export default function MoreThanDeviceSection({ product }) {
  const config = (product && PRODUCT_CONFIG[product.id]) || DEFAULT_CONFIG;

  return (
    <section className="w-full bg-white">
      {/* Outer: px-[120px] py-[60px], gap-[48px], items-center — Figma node 1250:13125 */}
      <div
        className="flex flex-col gap-[48px] items-center
                   px-4 md:px-8 lg:px-16 xl:px-[120px]
                   py-[60px] md:py-[80px] lg:py-[60px]"
      >

        {/* ── Top row: heading (left) + bullet list (right) ── */}
        {/* Figma: flex, gap-[120px], items-end, justify-center, px-[48px] */}
        <div
          className="flex flex-col lg:flex-row gap-[40px] lg:gap-[120px]
                     items-start lg:items-end justify-center
                     w-full lg:px-[48px]"
        >
          {/* Left: green label + 88px headline */}
          <div className="flex flex-col gap-[40px] flex-1">
            <p
              className="font-inter font-medium leading-normal tracking-[0.3888px]
                         text-[#00b82e] text-[20px] md:text-[24px]"
            >
              More than a device.
            </p>
            <div
              className="font-inter font-bold leading-normal text-black
                         text-[48px] md:text-[64px] lg:text-[88px]"
            >
              <p>A complete</p>
              <p>health system.</p>
            </div>
          </div>

          {/* Right: bullet list — Figma w-[457px], font-light, 16px */}
          <ul
            className="list-disc font-inter font-light text-[16px] leading-7
                       tracking-[0.5184px] text-black
                       lg:w-[457px] shrink-0 pl-6 space-y-0"
          >
            {config.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        {/* ── Full-width ecosystem image — aspect 4096/1875, rounded-[80px] ── */}
        <div
          className="relative w-full rounded-[40px] md:rounded-[60px] lg:rounded-[80px] overflow-hidden"
          style={{ aspectRatio: '4096 / 1875' }}
        >
          <img
            src={config.image}
            alt="Complete health ecosystem"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* ── CTAs — Figma node 1250:13132, w-[448px], gap-[10px] ── */}
        <div className="flex gap-[10px] items-center w-full max-w-[448px]">

          {/* "See how it works" — transparent, text-[#004172] */}
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

          {/* "Add to Cart" — navy filled */}
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
