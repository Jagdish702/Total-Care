import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cureBayLogo from '../../assets/images/curebay-logo.png';
import { useCart } from '../../context/CartContext';

/* ─── Design tokens ─────────────────────────────────────────────────────────── */
const PURPLE_GRADIENT = 'linear-gradient(122.44deg, #B189FF 0%, #2E008B 96.072%)';
const GREEN_GRADIENT  = 'linear-gradient(180deg, #10B981 0%, #00664C 100%)';

/* ─── Icons ─────────────────────────────────────────────────────────────────── */

function ChevronRightIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="shrink-0 drop-shadow-[0px_1.333px_5.333px_rgba(0,65,114,0.08)]"
    >
      <path d="M6 4L10 8L6 12" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Cart icon SVG (matches Figma node I1184:9159;3:1803) ──────────────────── */
function CartBtnIcon() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 18 18" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="shrink-0 drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)]"
    >
      <path
        d="M1.5 1.5H4L5.76 10.39C5.82 10.7 5.99 10.98 6.24 11.17C6.49 11.36 6.8 11.46 7.12 11.45H13.5C13.82 11.46 14.13 11.36 14.38 11.17C14.63 10.98 14.8 10.7 14.86 10.39L16 4.5H4.17"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="7"  cy="15" r="1" fill="white" />
      <circle cx="13.5" cy="15" r="1" fill="white" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="shrink-0 drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)]"
    >
      <path
        d="M1 3H15V16H1V3Z M15 8H19L23 12V16H15V8Z"
        stroke="#808080" strokeWidth="1.8" strokeLinejoin="round"
      />
      <circle cx="5"  cy="18" r="2" stroke="#808080" strokeWidth="1.8"/>
      <circle cx="19" cy="18" r="2" stroke="#808080" strokeWidth="1.8"/>
    </svg>
  );
}

/* ─── Star Rating ────────────────────────────────────────────────────────────── */
function StarIcon({ fill }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={fill}
        stroke={fill === '#e5e5e5' ? '#e5e5e5' : '#FFB800'}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled  = star <= Math.floor(rating);
        const partial = !filled && star <= Math.ceil(rating) && rating % 1 > 0;
        return (
          <StarIcon
            key={star}
            fill={filled ? '#FFB800' : partial ? '#FFB800' : '#e5e5e5'}
          />
        );
      })}
    </div>
  );
}

/* ─── Countdown hook ─────────────────────────────────────────────────────────── */
function useCountdown() {
  const INITIAL = 47 * 3600 + 59 * 60 + 59;
  const [secs, setSecs] = useState(INITIAL);

  useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

/* ─── Price Scale Bar ────────────────────────────────────────────────────────── */
function PriceScaleBar({ price, originalPrice }) {
  // SVG coordinate system matches Figma's 460px-wide reference frame
  const W       = 460;
  const LINE_Y  = 12;    // bar center Y within the SVG
  const R       = 10.67; // circle radius from Figma (inset 10.67px top/bottom)
  const SVG_H   = LINE_Y + R + 2; // ~24.67

  // Positions derived from Figma: market stays at ~37.6%, curebay shifts right
  // with savings (formula matches Figma's 313px/173px for the 46%-off demo product)
  const savings  = 1 - price / originalPrice;
  const marketX  = W * 0.376;
  const curebayX = Math.min(W * 0.90, W * (0.376 + savings / 1.5));

  const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

  // Label left offsets as % of bar width (117px and 252.84px in Figma's 460px grid)
  const curebayLabelLeft = `${(117 / W) * 100}%`;    // ~25.4%
  const marketLabelLeft  = `${(252.84 / W) * 100}%`; // ~55.0%

  return (
    <div
      className="w-full flex flex-col"
      aria-label={`CureBay price ${inr(price)} vs market ${inr(originalPrice)}`}
    >
      {/* ── Labels row (33 px tall, matching Figma's mt-33 on the gray bar) ── */}
      <div className="relative w-full overflow-visible" style={{ height: 33 }}>
        {/* CureBay: logo + price */}
        <div
          className="absolute top-0 flex items-center gap-1"
          style={{ left: curebayLabelLeft }}
        >
          <img
            src={cureBayLogo}
            alt="CureBay"
            className="h-[18px] object-contain"
            style={{ width: 60 }}
          />
          <span
            className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] whitespace-nowrap"
            style={{ color: '#004172' }}
          >
            {inr(price)}
          </span>
        </div>

        {/* Market: red text */}
        <div
          className="absolute"
          style={{ top: 3, left: marketLabelLeft }}
        >
          <span className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-[#d82525] whitespace-nowrap">
            Market : {inr(originalPrice)}
          </span>
        </div>
      </div>

      {/* ── SVG bar: gray track + two colored lines + two filled circle dots ── */}
      <svg
        viewBox={`0 0 ${W} ${SVG_H}`}
        width="100%"
        style={{ height: 'auto', display: 'block', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          {/* Gradient runs left-to-right along the market line: green → blue */}
          <linearGradient
            id="marketLineGradient"
            x1="3" y1={LINE_Y} x2={marketX} y2={LINE_Y}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="#3CBA84" />
            <stop offset="100%" stopColor="#004172" />
          </linearGradient>
        </defs>

        {/* Gray track */}
        <rect
          x="0" y={LINE_Y - 2} width={W} height="4" rx="40"
          fill="#e5e5e5"
        />

        {/* Red line → CureBay (drawn first so gradient line sits on top) */}
        <line
          x1="3" y1={LINE_Y} x2={curebayX} y2={LINE_Y}
          stroke="#d82525" strokeWidth="2" strokeLinecap="round"
        />
        {/* CureBay dot: red filled circle */}
        <circle cx={curebayX} cy={LINE_Y} r={R} fill="#d82525" />

        {/* Gradient line → Market (green→blue, drawn on top of red line) */}
        <line
          x1="3" y1={LINE_Y} x2={marketX} y2={LINE_Y}
          stroke="url(#marketLineGradient)" strokeWidth="2" strokeLinecap="round"
        />
        {/* Market dot: blue filled circle (matches gradient end color) */}
        <circle cx={marketX} cy={LINE_Y} r={R} fill="#004172" />
      </svg>
    </div>
  );
}

/* ─── Breadcrumb ─────────────────────────────────────────────────────────────── */
function Breadcrumb({ productName }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex gap-1 items-center h-16
                 px-4 md:px-8 lg:px-16 xl:px-[120px]"
    >
      <Link
        to="/"
        className="font-inter font-medium text-[12px] leading-5 tracking-[0.3883px]
                   text-[#999999] hover:text-[#004172] transition-colors duration-150 shrink-0 whitespace-nowrap"
      >
        Home
      </Link>
      <ChevronRightIcon />
      <span
        className="font-inter font-medium text-[12px] leading-5 tracking-[0.3883px]
                   text-black truncate"
        aria-current="page"
      >
        {productName}
      </span>
    </nav>
  );
}

/* ─── Product Image Panel ────────────────────────────────────────────────────── */
function ProductImage({ image, name, discount }) {
  return (
    <div
      className="relative flex-1 self-stretch rounded-[48px] overflow-hidden
                 min-h-[420px] md:min-h-[540px] lg:min-h-0"
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />

    </div>
  );
}

/* ─── Product Info Panel ─────────────────────────────────────────────────────── */
function ProductInfo({ product }) {
  const countdown = useCountdown();
  const { showToast } = useCart();
  const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

  const handleAddToCart = () => {
    showToast({
      image:         product.image,
      label:         'Product',
      name:          product.name,
      type:          'product',
      price:         product.price,
      originalPrice: product.originalPrice,
      description:   product.description,
    });
  };
  const savings = product.originalPrice - product.price;
  const isCombo = product.devices.length > 1;

  return (
    <div className="lg:w-[460px] w-full shrink-0 flex flex-col gap-[60px]">

      {/* ── 1. Title ── */}
      <h1
        className="font-inter font-bold leading-[1.1] text-black
                   text-[40px] md:text-[44px] lg:text-[48px]"
      >
        {product.name}
      </h1>

      {/* ── 2. Device list (combos only) ── */}
      {isCombo && (
        <ul
          className="list-disc font-inter font-medium text-[16px] leading-7
                     tracking-[0.5184px] text-[#00B82E]
                     [text-shadow:0px_2px_4px_rgba(0,65,114,0.08)] space-y-0"
          aria-label="Included devices"
        >
          {product.devices.map((device) => (
            <li key={device} className="ms-6 mb-0">
              <span>{device}</span>
            </li>
          ))}
        </ul>
      )}

      {/* ── 3. Features ── */}
      <div className="flex flex-col gap-6 font-inter text-[16px] leading-7 tracking-[0.5184px]">
        <p className="font-bold text-black">{product.featuresTitle}</p>
        <p className="font-light text-black">
          {product.features.map((f, i) => (
            <span key={i}>
              {'• '}{f}
              {i < product.features.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>

      {/* ── 4. Pricing + CTAs ── */}
      <div className="flex flex-col gap-6">
        {/* Countdown */}
        <p
          className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px]"
          style={{
            background:              GREEN_GRADIENT,
            WebkitBackgroundClip:    'text',
            WebkitTextFillColor:     'transparent',
            backgroundClip:          'text',
          }}
          aria-label={`Limited offer ending in ${countdown}`}
        >
          Limited 500 Member offer ending in{' '}
          <span aria-live="polite">{countdown}</span>
        </p>

        {/* Price display */}
        <div className="flex flex-wrap gap-4 items-baseline font-inter font-light text-[32px] leading-[1.2]">
          <span className="text-black">{inr(product.price)}</span>
          <span className="text-[#999999] text-[24px]">(MRP {inr(product.originalPrice)})</span>
        </div>

        {/* Price scale bar */}
        <PriceScaleBar price={product.price} originalPrice={product.originalPrice} />

        {/* Savings + subscription */}
        <div className="flex flex-col gap-6">
          <p className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-black">
            Save {inr(savings)} vs market
          </p>
          <p
            className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px]"
            style={{
              background:           PURPLE_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            + 3 months of TotalCare subscription FREE
          </p>
        </div>

        {/* CTA buttons — exact match to Figma node 1184:9158 */}
        <div className="flex flex-col gap-3 w-full" role="group" aria-label="Purchase options">

          {/* Add to Cart — Figma node 1184:9159 */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="relative w-full flex items-center justify-center gap-2
                       px-4 py-2 rounded-xl
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       font-inter font-medium text-[16px] leading-7 tracking-[0.5184px]
                       text-white cursor-pointer
                       hover:brightness-110 active:brightness-90
                       transition-all duration-150
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172] focus-visible:ring-offset-2"
            aria-label={`Add ${product.name} to cart`}
          >
            {/* Solid background layer */}
            <div className="absolute inset-0 bg-[#004172] rounded-xl pointer-events-none" />
            {/* Inner shadow overlay */}
            <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
            {/* Content */}
            <span className="relative z-10">Add to Cart</span>
            <span className="relative z-10"><CartBtnIcon /></span>
          </button>

          {/* See how it works — Figma node 1184:9160 */}
          <button
            type="button"
            onClick={() =>
              document.getElementById('how-it-works')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            className="w-full flex items-center justify-center
                       h-[40px] px-4 py-2 rounded-xl
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       font-inter font-medium text-[16px] leading-[28px] tracking-[0.5184px]
                       text-[#004172]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172] focus-visible:ring-offset-2"
            aria-label="Scroll to How It Works section"
          >
            See how it works.
          </button>

        </div>
      </div>

      {/* ── 5. Delivery ── */}
      <div className="flex flex-col gap-3">
        <p className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-black">
          Delivery Options
        </p>
        <div className="flex items-center gap-[5px]">
          <TruckIcon />
          <span className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-[#808080]">
            Fastest Delivery by{' '}
          </span>
          <span className="font-inter font-medium text-[16px] leading-7 tracking-[0.5184px] text-black whitespace-nowrap">
            Saturday, 5 April
          </span>
        </div>
        <button
          type="button"
          className="self-start font-inter font-medium text-[16px] leading-7 tracking-[0.5184px]
                     text-[#004172] hover:underline
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172] rounded"
          aria-label="Edit delivery location"
        >
          Edit Location
        </button>
      </div>
    </div>
  );
}

/* ─── ProductHeroSection ─────────────────────────────────────────────────────── */
export default function ProductHeroSection({ product }) {
  return (
    <section aria-labelledby="product-title">
      <Breadcrumb productName={product.name} />

      <div
        className="flex flex-col gap-[60px] items-start overflow-clip
                   pb-[60px] xl:pb-[120px] px-4 md:px-8 lg:px-16 xl:px-[120px]"
      >
        {/* Hero row */}
        <div className="flex gap-[60px] items-start w-full lg:flex-row flex-col">
          <ProductImage
            image={product.image}
            name={product.name}
            discount={product.discount}
          />
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  );
}
