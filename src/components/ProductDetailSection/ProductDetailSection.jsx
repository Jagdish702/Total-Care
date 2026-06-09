import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, GlassPanel, CardTag, CardStat, StatNum, StatUnit, CardDivider } from '../shared/CardPrimitives';

/* ─── Assets — product images ─────────────────────────────────────────────── */
import omronProduct      from '../../assets/products/devices/omron-product.jpg';
import meditiveProduct   from '../../assets/products/devices/meditive-product.jpg';
import glucoProduct      from '../../assets/products/devices/glucobuddy-product.jpg';

/* ─── Assets — trust banners ──────────────────────────────────────────────── */
import trustBanner       from '../../assets/products/devices/omron-trust-banner.jpg';

/* ─── Assets — hero / lifestyle ───────────────────────────────────────────── */
import omronHero         from '../../assets/products/devices/omron-hero.jpg';
import meditiveHero      from '../../assets/products/devices/meditive-hero.jpg';
import glucoHero         from '../../assets/products/devices/glucobuddy-hero.jpg';

/* ─── Assets — testimonial avatars ────────────────────────────────────────── */
import userRohit         from '../../assets/products/devices/user-rohit.png';
import userAyush         from '../../assets/products/devices/user-ayush.png';
import userNeha          from '../../assets/products/devices/user-neha.jpg';

/* ─── Assets — cart icon ──────────────────────────────────────────────────── */

/* ─── Assets — sparklines ─────────────────────────────────────────────────── */
import sparklineUp       from '../../assets/products/devices/sparkline-up.png';
import sparklineDown     from '../../assets/products/devices/sparkline-down.png';

/* ─── Assets — metric icons (SVG) ─────────────────────────────────────────── */
import iconHeartFill     from '../../assets/hero/icons/ico-heart.svg';
import iconGlucoseStat   from '../../assets/hero/icons/ico-glucose.svg';
import iconPerson        from '../../assets/hero/icons/ico-person.svg';
import iconSleep         from '../../assets/hero/icons/ico-sleep.svg';
import iconBpMetric      from '../../assets/products/icons/blood pressure blue icon.svg';
import iconScaleMetric   from '../../assets/products/icons/weight machine blue icon.svg';
import iconGlucoseMetric from '../../assets/products/icons/water drop box blue icon.svg';

/* ─── Price lookup by productId ──────────────────────────────────────────── */
const PRODUCT_PRICES = {
  bp:      { price: 2000, originalPrice: 2560 },
  scale:   { price: 1000, originalPrice: 2999 },
  glucose: { price: 1000, originalPrice: 1600 },
};

/* ─── Static bullets (shared across all tabs) ─────────────────────────────── */
const BULLETS = [
  'Simple setup. Smarter monitoring.',
  'Native Total Care integration',
  'No third-party health hub dependency',
  'Clinically validated branded devices',
  'Accurate, real-time health tracking',
  'Simple setup. No ecosystem lock-in.',
];

/* ─── Device data ─────────────────────────────────────────────────────────── */
const DEVICES = [
  /* ── Tab 1: Omron BP Monitor ─────────────────────────────────────────── */
  {
    id: 'omron',
    productId: 'bp',
    tabLabel: 'Omron BP Monitor – HEM-7140-AP',
    product: {
      image:       omronProduct,
      title:       'Omron BP Monitor – HEM-7140-AP',
      description: 'A clinically validated digital BP monitor that tracks blood pressure and pulse with reliable, at-home accuracy.',
      trustBanner,
    },
    hero: {
      image: omronHero,
      label: 'OMRON BP MONITOR – HEM-7141',
    },
    testimonial: {
      photo: userRohit,
      name:  'Rohit Sharma',
      quote: 'I stopped guessing and began understanding my blood pressure trends. With insights from my monitor and the Total Care app, I can make sense of my readings.',
    },
    vitals: {
      layout: 'grid',
      latestReading: null,
      stats: [
        { icon: iconHeartFill,   label: 'Heart Rate',     value: '98',  unit: 'BPM',   chart: sparklineUp   },
        { icon: iconGlucoseStat, label: 'Glucose',        value: '92',  unit: 'mg/dL', chart: sparklineDown },
        { icon: iconPerson,      label: 'Blood pressure', value: '98',  unit: 'BPM',   chart: sparklineDown },
        { icon: iconSleep,       label: 'Sleep',          value: '8',   unit: 'Hr',    value2: '43', unit2: 'Min', chart: sparklineDown },
      ],
    },
    insight: {
      icon:  iconBpMetric,
      label: 'Blood Pressure',
      type:  'paragraph',
      text:  'Your BP is slightly elevated today. Consider resting and hydrating.',
    },
  },

  /* ── Tab 2: Meditive Body Composition Scale ───────────────────────────── */
  {
    id: 'meditive',
    productId: 'scale',
    tabLabel: 'Meditive Body Composition Scale',
    product: {
      image:       meditiveProduct,
      title:       'Meditive Body Composition Scale',
      description: 'A smart body composition scale that tracks weight, body fat, muscle, and more to give a complete view of your health.',
      trustBanner,
    },
    hero: {
      image: meditiveHero,
      label: 'MEDITIVE BODY COMPOSITION SCALE',
    },
    testimonial: {
      photo: userAyush,
      name:  'Ayush Mehta',
      quote: 'Weight was merely a number in the past, but now I truly understand the changes happening within my body and how they affect my overall health and energy levels.',
    },
    vitals: {
      layout: 'list',
      latestReading: 'Today, 8:30 AM',
      stats: [
        { icon: iconScaleMetric, label: 'Body Weight', value: '72.4', unit: 'kg',  chart: sparklineUp   },
        { icon: iconScaleMetric, label: 'Body Fat',    value: '21.8%', unit: '',   chart: sparklineDown },
        { icon: iconScaleMetric, label: 'BMI',         value: '21.8%', unit: '',   chart: sparklineDown },
      ],
    },
    insight: {
      icon:      iconScaleMetric,
      label:     'BMI',
      type:      'metric',
      highlight: '40%',
      text:      'improvement. Stay consistent with workouts and hydration',
    },
  },

  /* ── Tab 3: RGB GlucoBuddy Glucometer ────────────────────────────────── */
  {
    id: 'glucobuddy',
    productId: 'glucose',
    tabLabel: 'RGB GlucoBuddy Glucometer',
    product: {
      image:       glucoProduct,
      title:       'RGB GlucoBuddy Glucometer',
      description: 'A glucometer that tracks blood sugar levels and trends to help you manage diabetes with clarity.',
      trustBanner,
    },
    hero: {
      image: glucoHero,
      label: 'RGB GLUCOBUDDY GLUCOMETER',
    },
    testimonial: {
      photo: userNeha,
      name:  'Neha Kulkarni',
      quote: "I used to check my sugar levels but never really understood them fully. Now I can clearly see patterns — what affects my levels, what doesn't, and how to manage them better.",
    },
    vitals: {
      layout: 'list',
      latestReading: 'Today, 8:30 AM',
      stats: [
        { icon: iconGlucoseMetric, label: 'Glucose',         value: '142', unit: 'mg/dl', chart: sparklineUp   },
        { icon: iconGlucoseMetric, label: 'Post-Meal Level', value: '168', unit: 'mg/dl', chart: sparklineDown },
        { icon: iconGlucoseMetric, label: 'Daily Average',   value: '136', unit: 'mg/dl', chart: sparklineDown },
      ],
    },
    insight: {
      icon:      iconGlucoseMetric,
      label:     'Track Glucose Now',
      type:      'metric',
      highlight: '2:30 PM',
      text:      'Time to check your glucose level.',
    },
  },
];

/* ─── Animation variants ──────────────────────────────────────────────────── */
const fadeVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

/* ─── VitalsCard — built with shared hero primitives ─────────────────────── */
function VitalsCard({ vitals }) {
  const isGrid = vitals.layout === 'grid';

  return (
    <GlassCard className="w-full shrink-0">
      {/* heading */}
      <div className="px-1 w-full">
        <p
          className="font-inter font-medium text-[24px] leading-normal tracking-[0.389px]
                     bg-gradient-to-b from-[#0185de] to-[#013253]
                     bg-clip-text text-transparent whitespace-pre-wrap"
          style={{ leadingTrim: 'both', textEdge: 'cap' }}
        >
          {'Your data,\ntranslated into clarity.'}
        </p>
      </div>

      <CardDivider />

      {vitals.latestReading && (
        <div className="flex gap-2 px-1 font-inter font-medium text-[8.53px]
                        tracking-[0.276px] leading-[14px]">
          <span className="text-[#4d4d4d]">Latest Reading</span>
          <span className="text-[#999]">({vitals.latestReading})</span>
        </div>
      )}

      {/* stats — grid or list */}
      {isGrid ? (
        <>
          <div className="flex gap-[8.533px] w-full">
            {[vitals.stats[0], vitals.stats[1]].map((stat, i) => (
              <GlassPanel key={i} className="flex flex-1 items-center justify-between p-[10px]">
                <div className="flex flex-col gap-[8px]">
                  <CardTag icon={stat.icon} label={stat.label} />
                  <CardStat>
                    <StatNum>{stat.value}</StatNum>
                    {stat.unit && <StatUnit>{stat.unit}</StatUnit>}
                    {stat.value2 && <><StatNum>{stat.value2}</StatNum><StatUnit>{stat.unit2}</StatUnit></>}
                  </CardStat>
                </div>
                <img src={stat.chart} alt="" aria-hidden className="h-[5.159px] w-[30.711px] object-contain" />
              </GlassPanel>
            ))}
          </div>
          <CardDivider />
          <div className="flex gap-[8.533px] w-full">
            {[vitals.stats[2], vitals.stats[3]].map((stat, i) => (
              <GlassPanel key={i} className="flex flex-1 items-center justify-between p-[10px]">
                <div className="flex flex-col gap-[8px]">
                  <CardTag icon={stat.icon} label={stat.label} />
                  <CardStat>
                    <StatNum>{stat.value}</StatNum>
                    {stat.unit && <StatUnit>{stat.unit}</StatUnit>}
                    {stat.value2 && <><StatNum>{stat.value2}</StatNum><StatUnit>{stat.unit2}</StatUnit></>}
                  </CardStat>
                </div>
                <img src={stat.chart} alt="" aria-hidden className="h-[5.159px] w-[30.711px] object-contain" />
              </GlassPanel>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-[8.533px] w-full">
          {vitals.stats.map((stat, i) => (
            <GlassPanel key={i} className="flex items-center justify-between p-[10px] w-full">
              <div className="flex flex-col gap-[8px]">
                <CardTag icon={stat.icon} label={stat.label} />
                <CardStat>
                  <StatNum>{stat.value}</StatNum>
                  {stat.unit && <StatUnit>{stat.unit}</StatUnit>}
                </CardStat>
              </div>
              <img src={stat.chart} alt="" aria-hidden className="h-[5.159px] w-[30.711px] object-contain" />
            </GlassPanel>
          ))}
        </div>
      )}

      <CardDivider />

      <p className="font-inter font-medium text-[8.53px] text-[#4d4d4d]
                    tracking-[0.276px] leading-[14px] text-center w-full">
        vitals synced from the devices
      </p>
    </GlassCard>
  );
}

/* ─── InsightCard ─────────────────────────────────────────────────────────── */
function InsightCard({ insight }) {
  return (
    <div className="relative bg-white rounded-[20px] flex flex-col gap-3 p-4 shrink-0
                    drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]
                    shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]">
      {/* tag */}
      <div className="flex gap-[5px] items-center">
        <img src={insight.icon} alt="" className="w-3.5 h-3.5 object-contain" />
        <span className="font-inter font-medium text-[13px] text-[#008eb1]
                         tracking-[0.4px] leading-6 whitespace-nowrap">
          {insight.label}
        </span>
      </div>

      {/* content */}
      {insight.type === 'paragraph' ? (
        <p className="font-inter font-medium text-[11px] text-[#4d4d4d]
                      tracking-[0.3px] leading-[18px]">
          {insight.text}
        </p>
      ) : (
        <div className="flex flex-wrap gap-1 items-end font-inter font-medium">
          <span className="text-[20px] text-black tracking-[0.3888px] leading-none whitespace-nowrap">
            {insight.highlight}
          </span>
          <span className="flex-1 min-w-[60px] text-[11px] text-[#4d4d4d]
                           tracking-[0.3px] leading-[18px]">
            {insight.text}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── TestimonialCard ─────────────────────────────────────────────────────── */
function TestimonialCard({ testimonial }) {
  return (
    <div className="relative rounded-[40px] flex gap-3 p-3 shrink-0
                    drop-shadow-[0px_4px_6px_rgba(0,65,114,0.08)]
                    shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]">
      {/* warm radial gradient bg */}
      <div
        className="absolute inset-0 rounded-[40px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 150% 100% at 50% 50%, #fff8e9 0%, #ffffff 100%)' }}
      />

      {/* Left: avatar + name */}
      <div className="relative flex flex-col gap-2 items-center shrink-0">
        <div className="w-[100px] h-[100px] rounded-[24px] overflow-hidden shrink-0">
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <p className="font-inter font-medium text-[13px] text-black
                      tracking-[0.4px] leading-5 text-center whitespace-nowrap">
          {testimonial.name}
        </p>
      </div>

      {/* Right: verified badge + quote */}
      <div className="relative flex flex-1 flex-col gap-2 min-w-0">
        {/* Verified badge */}
        <div className="bg-[#fff5df] px-2 py-1.5 rounded-[12px] self-start shrink-0">
          <span className="font-inter font-medium text-[10px] text-[#d29300]
                           tracking-[0.3px] leading-[16px] whitespace-nowrap">
            Verified User
          </span>
        </div>

        {/* Opening quote mark */}
        <span className="font-serif text-[32px] text-[#d29300] leading-none tracking-[0.8px]
                         block h-[9px] overflow-hidden">
          &ldquo;
        </span>

        {/* Quote text */}
        <p className="font-inter italic text-[13px] text-[#4d4d4d]
                      tracking-[0.4px] leading-5 overflow-hidden">
          {testimonial.quote}
        </p>

        {/* Closing quote mark — rotated */}
        <div className="flex items-center justify-end w-full">
          <span className="font-serif text-[32px] text-[#d29300] leading-none
                           tracking-[0.8px] block h-[9px] overflow-hidden rotate-180">
            &ldquo;
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── LeftProductCard ─────────────────────────────────────────────────────── */
function LeftProductCard({ product, productId }) {
  const navigate  = useNavigate();
  const { showToast } = useCart();

  const handleAddToCart = () => {
    const prices = PRODUCT_PRICES[productId] || { price: 999, originalPrice: 1999 };
    showToast({
      image:         product.image,
      label:         'Device',
      name:          product.title,
      type:          'product',
      price:         prices.price,
      originalPrice: prices.originalPrice,
      description:   product.description,
    });
  };
  return (
    <div className="bg-white rounded-[48px] flex flex-col gap-8 p-4 h-auto xl:h-full shrink-0
                    w-full lg:w-[460px]
                    drop-shadow-[0px_0px_12px_rgba(0,124,31,0.08)]">
      {/* product image */}
      <div className="h-[280px] md:h-[340px] lg:flex-1 lg:min-h-0 relative rounded-[32px] overflow-hidden">
        <img
          src={product.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[32px]"
        />
        <div className="absolute inset-0 rounded-[32px]
                        shadow-[inset_0px_0px_6px_0px_rgba(0,65,114,0.24)]" />
      </div>

      {/* info block */}
      <div className="flex flex-col gap-8 pb-6 px-6 shrink-0">
        <p className="font-inter font-bold text-[32px] text-black leading-normal">
          {product.title}
        </p>
        <p className="font-inter font-light text-[16px] text-black
                      tracking-[0.5184px] leading-7">
          {product.description}
        </p>

        {/* CTA buttons */}
        <div className="flex gap-6 items-center">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2
                       bg-[#004172] text-white
                       font-inter font-medium text-[16px] tracking-[0.2592px] leading-none
                       px-6 py-3 rounded-[12px]
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                       whitespace-nowrap
                       hover:bg-[#003260] transition-colors duration-150
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
          >
            Add to Cart
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 3.74988H6.27273L8.46545 14.7053C8.54027 15.082 8.7452 15.4204 9.04436 15.6612C9.34351 15.902 9.71784 16.03 10.1018 16.0226H18.0545C18.4385 16.03 18.8129 15.902 19.112 15.6612C19.4112 15.4204 19.6161 15.082 19.6909 14.7053L21 7.84079H7.09091M10.3636 20.1135C10.3636 20.5654 9.99732 20.9317 9.54545 20.9317C9.09359 20.9317 8.72727 20.5654 8.72727 20.1135C8.72727 19.6616 9.09359 19.2953 9.54545 19.2953C9.99732 19.2953 10.3636 19.6616 10.3636 20.1135ZM19.3636 20.1135C19.3636 20.5654 18.9973 20.9317 18.5455 20.9317C18.0936 20.9317 17.7273 20.5654 17.7273 20.1135C17.7273 19.6616 18.0936 19.2953 18.5455 19.2953C18.9973 19.2953 19.3636 19.6616 19.3636 20.1135Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => navigate(`/product/${productId}`)}
            className="flex-1 flex items-center justify-center
                       text-[#004172]
                       font-inter font-medium text-[16px] tracking-[0.2592px] leading-none
                       px-4 py-2 rounded-[12px]
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       whitespace-nowrap
                       hover:bg-[#f0f8ff] transition-colors duration-150
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
          >
            Explore
          </button>
        </div>
      </div>

      {/* trust banner */}
      <div className="aspect-[428/121] rounded-[32px] overflow-hidden relative shrink-0 w-full">
        <img
          src={product.trustBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[32px]"
        />
        <div className="absolute inset-0 rounded-[32px] bg-[rgba(0,184,46,0.04)]" />
      </div>
    </div>
  );
}

/* ─── HeroPanel ───────────────────────────────────────────────────────────── */
function HeroPanel({ hero }) {
  return (
    <div className="w-full lg:flex-1 lg:min-w-0 lg:h-full relative rounded-[40px] overflow-hidden">
      <img
        src={hero.image}
        alt=""
        className="block w-full h-auto lg:absolute lg:inset-0 lg:h-full lg:object-cover rounded-[40px]"
      />
      <div className="absolute inset-0 rounded-[40px]
                      shadow-[inset_0px_0px_6px_0px_rgba(0,65,114,0.24)]" />
      {/* device name label */}
      <div className="absolute top-6 left-6
                      bg-[rgba(0,0,0,0.16)] px-4 py-3 rounded-[40px]">
        <p className="font-sans font-medium text-[16px] text-white uppercase
                      tracking-[0.5184px] leading-none whitespace-nowrap">
          {hero.label}
        </p>
      </div>
    </div>
  );
}

/* ─── RightSidebar ────────────────────────────────────────────────────────── */
function RightSidebar({ device }) {
  return (
    <div className="flex flex-col gap-3 w-full lg:w-[400px] h-auto lg:h-full shrink-0">
      <TestimonialCard testimonial={device.testimonial} />
      <VitalsCard      vitals={device.vitals} />
      <InsightCard     insight={device.insight} />
    </div>
  );
}

/* ─── TabBar ──────────────────────────────────────────────────────────────── */
function TabBar({ activeIdx, onChange }) {
  return (
    /* Mobile: vertical stacked (Figma). Desktop: horizontal side-by-side */
    <div className="flex flex-col md:flex-row w-full gap-0 md:gap-0">
      {DEVICES.map((d, i) => {
        const isActive = i === activeIdx;
        return (
          <button
            key={d.id}
            onClick={() => onChange(i)}
            className={`w-full md:flex-1 px-5 py-[14px] text-left md:text-center
                        text-[16px] tracking-[0.5184px] leading-7
                        transition-colors duration-200 focus:outline-none
                        focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#004172]
                        ${isActive
                          ? 'border-b-2 border-[#004172] font-inter font-bold text-[#004172]'
                          : 'border-b border-[#e5e5e5] font-inter font-medium text-[#808080] hover:text-[#555]'
                        }`}
          >
            {d.tabLabel}
          </button>
        );
      })}
    </div>
  );
}

/* ─── ProductDetailSection ────────────────────────────────────────────────── */
export default function ProductDetailSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-[#fdfffc] flex flex-col items-center
                        px-4 md:px-8 lg:px-10 xl:px-[120px]
                        py-10 md:py-14 lg:py-20 xl:py-[120px]">
      <div className="w-full max-w-[1560px] flex flex-col gap-10 md:gap-[60px]">

        {/* ── Section heading + bullets ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div className="font-inter font-bold text-[40px] md:text-[56px] lg:text-[72px] xl:text-[88px]
                          text-black leading-none shrink-0">
            <p>Works directly</p>
            <p>with Total Care</p>
          </div>
          <ul className="font-inter font-light text-[16px] text-black
                         tracking-[0.5184px] leading-7 list-disc pl-6 shrink-0">
            {BULLETS.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        {/* ── Tabs + content ── */}
        <div className="flex flex-col pt-6">
          <TabBar activeIdx={activeIdx} onChange={setActiveIdx} />

          {/* content panel */}
          <div className="border-t border-[#a2a2a2]
                          pt-6 md:pt-12 px-0 md:px-6 pb-6
                          h-auto xl:h-[940px]
                          overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={DEVICES[activeIdx].id}
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col lg:flex-row gap-6 w-full h-auto xl:h-full"
              >
                {/* Left: product card */}
                <LeftProductCard product={DEVICES[activeIdx].product} productId={DEVICES[activeIdx].productId} />

                {/* Center + right: hero + sidebar */}
                <div className="flex flex-col lg:flex-row gap-[19px] w-full lg:flex-1 min-w-0 h-auto xl:h-full">
                  <HeroPanel    hero={DEVICES[activeIdx].hero} />
                  <RightSidebar device={DEVICES[activeIdx]} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
