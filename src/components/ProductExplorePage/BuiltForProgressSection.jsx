import img1 from '../../assets/product-explore/built-lifestyle-1.png';
import img2 from '../../assets/product-explore/built-lifestyle-2.png';
import img3 from '../../assets/product-explore/built-lifestyle-3.png';
import img4 from '../../assets/product-explore/built-lifestyle-4.png';

/* ─── Card data — captions match Figma node 1184:9227 exactly ─────────────── */
const CARDS = [
  {
    img: img1,
    caption: (
      <p className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-black">
        Track your{' '}
        <span style={{ color: '#d29300' }}>baseline weight and body fat</span>
        {' '}first thing in the morning for the most consistent data.
      </p>
    ),
  },
  {
    img: img2,
    caption: (
      <p className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-black">
        Visualize{' '}
        <span style={{ color: '#30956a' }}>long-term trends</span>
        {' '}through the app, helping you stay motivated toward your fitness goals.
      </p>
    ),
  },
  {
    img: img3,
    caption: (
      <p className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-black">
        <span style={{ color: '#d82525' }}>Track after activity or stress</span>
        <br />
        Understand how your body responds in real time.
      </p>
    ),
  },
  {
    img: img4,
    caption: (
      <p className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-black">
        <span style={{ color: '#30956a' }}>After a long day</span>
        <br />
        Stress leaves signals. Now you can see them.
      </p>
    ),
  },
];

/* ─── CartIcon ───────────────────────────────────────────────────────────────── */
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

/* ─── BuiltForProgressSection ────────────────────────────────────────────────── */
export default function BuiltForProgressSection() {
  return (
    <section className="w-full bg-white">
      <div
        className="flex flex-col gap-[80px] items-center
                   px-4 md:px-8 lg:px-16 xl:px-[120px]
                   pt-[80px] md:pt-[120px] lg:pt-[150px]
                   pb-[80px] md:pb-[150px] lg:pb-[300px]"
      >

        {/* ── Heading: "Built for" (black) + "Progress" (gray) ── */}
        <h2 className="flex flex-wrap gap-x-6 items-baseline justify-center
                       font-inter font-bold leading-none text-center
                       text-[48px] md:text-[64px] lg:text-[88px]">
          <span className="text-black">Built for</span>
          <span className="text-[#808080]">Progress</span>
        </h2>

        {/* ── 4 lifestyle cards — horizontal scroll on small screens ── */}
        <div className="flex gap-[48px] items-start justify-center
                        w-full overflow-x-auto pb-2
                        snap-x snap-mandatory">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="flex flex-col gap-[19px] items-center
                         shrink-0 w-[280px] md:w-[320px] lg:w-[350px]
                         snap-start"
            >
              {/* Image — aspect 350/450 ≈ 7/9, rounded-[40px] */}
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

              {/* Caption */}
              <div className="w-full px-6">
                {card.caption}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTAs — Figma node 1184:9248 ── */}
        <div className="flex gap-[10px] items-center w-full max-w-[448px]">

          {/* "See how it works" — transparent ghost, text-[#004172] */}
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
