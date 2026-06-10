import tipsMeditiveImg from '../../assets/product-explore/tips-meditive.png';
import tipsOmronImg    from '../../assets/product-explore/tips-omron.png';
import glucobuddyImg   from '../../assets/product-explore/tips_1.png';
import { useCart } from '../../context/CartContext';

/* ─── Gradient style for product titles ──────────────────────────────────── */
const gradientStyle = {
  backgroundImage: 'linear-gradient(180deg, #0185DE 0%, #013253 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

/* ─── Product tip data ───────────────────────────────────────────────────── */
const SCALE_TIPS = {
  id: 'scale',
  title: 'Meditive Body Composition Scale',
  tips: [
    'Place the scale on a hard, flat surface. Avoid carpets, rugs, and mats.',
    'Stand barefoot with clean, dry feet on the metal sensors.',
    'Stand still with your weight evenly distributed on both feet.',
    'Weigh yourself at the same time each day, ideally in the morning before eating or drinking.',
    'Avoid measuring immediately after exercise.',
    'Keep the scale in one location and recalibrate to 0.0 if moved.',
  ],
  image: tipsMeditiveImg,
  imageAlt: 'Person standing on Meditive Body Composition Scale',
  imageLabel: null,
};

const BP_TIPS = {
  id: 'bp',
  title: 'Omron BP Monitor — HEM 7140-AP',
  tips: [
    'Measure at the same time of day every day (within 1 hour after getting up and before bed-time are recommended).',
    'No bathing, drinking alcohol or caffeine, smoking, exercising or eating 30 minutes before taking a measurement.',
    'Use appropriate arm cuff of small, medium, large & wide size.',
  ],
  image: tipsOmronImg,
  imageAlt: 'Correct posture for upper arm blood pressure measurement',
  imageLabel: 'Correct posture for upper arm blood pressure measurement',
};

const GLUCOSE_TIPS = {
  id: 'glucose',
  title: 'GlucoBuddy Glucometer',
  tips: [
    'Ensure your hands are clean and completely dry before testing.',
    'Always use fresh test strips within their expiration date.',
    'Avoid using samples from alternative sites like the forearm unless advised.',
    'Apply the blood drop to the correct edge of the test strip.',
    'Allow the strip to completely "fill" with the blood droplet.',
  ],
  image: glucobuddyImg,
  imageAlt: 'GlucoBuddy glucometer accurate measurement tips',
  imageLabel: null,
};

/* ─── Product → tips rows mapping (hardcoded fallback) ──────────────────── */
const PRODUCT_TIPS_MAP = {
  'complete-essentials': [SCALE_TIPS, BP_TIPS, GLUCOSE_TIPS],
  'bp-essentials':       [SCALE_TIPS, BP_TIPS],
  'diabetes-essentials': [SCALE_TIPS, GLUCOSE_TIPS],
  'scale':               [SCALE_TIPS],
  'glucose':             [GLUCOSE_TIPS],
  'bp':                  [BP_TIPS],
};

const DEFAULT_TIPS = [SCALE_TIPS, BP_TIPS];

/* ─── Dynamic DB helpers ─────────────────────────────────────────────────── */

const TIPS_META = {
  'scale':   { image: tipsMeditiveImg, imageAlt: 'Person standing on Meditive Body Composition Scale', imageLabel: null,        title: 'Meditive Body Composition Scale' },
  'bp':      { image: tipsOmronImg,   imageAlt: 'Correct posture for upper arm BP measurement',        imageLabel: 'Correct posture for upper arm blood pressure measurement', title: 'Omron BP Monitor - HEM 7140-AP' },
  'glucose': { image: glucobuddyImg,  imageAlt: 'GlucoBuddy glucometer accurate measurement tips',    imageLabel: null,        title: 'GlucoBuddy Glucometer' },
};

function buildTipRows(product) {
  if (!product) return DEFAULT_TIPS;

  // Individual product with DB tips
  if ((product.tips ?? []).length > 0) {
    const meta = TIPS_META[product.id] || {};
    return [{
      id: product.id,
      title: meta.title || product.name,
      tips: product.tips.map(t => t.tipText),
      image: meta.image || null,
      imageAlt: meta.imageAlt || product.name,
      imageLabel: meta.imageLabel || null,
    }];
  }

  // Bundle: one tip row per component that has tips
  if ((product.bundleItems ?? []).length > 0) {
    const rows = product.bundleItems
      .filter(bi => (bi.component.tips ?? []).length > 0)
      .map(bi => {
        const meta = TIPS_META[bi.component.id] || {};
        return {
          id: bi.component.id,
          title: meta.title || bi.component.name,
          tips: bi.component.tips.map(t => t.tipText),
          image: meta.image || null,
          imageAlt: meta.imageAlt || bi.component.name,
          imageLabel: meta.imageLabel || null,
        };
      });
    if (rows.length > 0) return rows;
  }

  // Hardcoded fallback
  return PRODUCT_TIPS_MAP[product.id] || DEFAULT_TIPS;
}

/* ─── Cart icon (inline SVG) ─────────────────────────────────────────────── */
function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0.909 0.909H4.545L6.871 12.415C6.954 12.833 7.181 13.21 7.513 13.479C7.845 13.748 8.261 13.892 8.689 13.883H16.972C17.4 13.892 17.816 13.748 18.148 13.479C18.48 13.21 18.707 12.833 18.79 12.415L20.182 5.455H4.545M9.091 17.727C9.091 18.211 8.697 18.605 8.212 18.605C7.728 18.605 7.333 18.211 7.333 17.727C7.333 17.242 7.728 16.848 8.212 16.848C8.697 16.848 9.091 17.242 9.091 17.727ZM18.182 17.727C18.182 18.211 17.788 18.605 17.303 18.605C16.818 18.605 16.424 18.211 16.424 17.727C16.424 17.242 16.818 16.848 17.303 16.848C17.788 16.848 18.182 17.242 18.182 17.727Z"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── CTA Buttons ────────────────────────────────────────────────────────── */
function CTAButtons({ onAddToCart }) {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex gap-[10px] flex-wrap">
      {/* See how it works — outlined */}
      <button
        type="button"
        onClick={scrollToHowItWorks}
        className="flex-1 min-w-[180px] max-w-[219px] h-[40px] rounded-[12px] border border-[#004172] bg-white text-[#004172] font-inter font-medium text-[16px] tracking-[0.2592px] hover:bg-[#EDF5FF] transition-colors duration-200 shadow-[0_2px_2px_rgba(0,65,114,0.08)] whitespace-nowrap"
      >
        See how it works
      </button>

      {/* Add to Cart — filled */}
      <button
        type="button"
        onClick={onAddToCart}
        className="flex-1 min-w-[180px] max-w-[219px] h-[40px] rounded-[12px] bg-[#004172] text-white font-inter font-medium text-[16px] tracking-[0.2592px] flex items-center justify-center gap-2 hover:bg-[#003562] transition-colors duration-200 shadow-[0_2px_2px_rgba(0,65,114,0.08)] whitespace-nowrap"
      >
        Add to Cart
        <CartIcon />
      </button>
    </div>
  );
}

/* ─── Single tip row (alternating layout) ────────────────────────────────── */
function TipRow({ data, index }) {
  const { showToast } = useCart();
  const imageLeft = index % 2 === 0; // even → image left; odd → image right

  const handleAddToCart = () => {
    showToast({
      image: data.image,
      label: 'Product',
      name:  data.title,
      type:  'product',
    });
  };

  /* Image column */
  const imageCol = (
    <div className="shrink-0 w-full lg:w-[500px] xl:w-[560px] flex flex-col items-center gap-6">
      {data.imageLabel && (
        <p className="font-inter font-bold text-[16px] md:text-[20px] lg:text-[24px] text-[#3CBA84] uppercase tracking-[0.48px] text-center leading-[1.5]">
          {data.imageLabel}
        </p>
      )}
      <img
        src={data.image}
        alt={data.imageAlt}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  );

  /* Content column */
  const contentCol = (
    <div className="flex flex-col gap-[48px] flex-1 min-w-0">
      <h3
        className="font-inter font-bold text-[28px] md:text-[36px] lg:text-[48px] leading-[1.15]"
        style={gradientStyle}
      >
        {data.title}
      </h3>

      <ul className="list-disc pl-7 flex flex-col gap-[6px]">
        {data.tips.map((tip, i) => (
          <li
            key={i}
            className="font-inter font-light text-[15px] md:text-[16px] lg:text-[18px] text-black tracking-[0.5825px] leading-[28px] mb-4 last:mb-0"
          >
            {tip}
          </li>
        ))}
      </ul>

      <CTAButtons onAddToCart={handleAddToCart} />
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[80px] xl:gap-[120px] items-center">
      {imageLeft ? (
        <>
          {imageCol}
          {contentCol}
        </>
      ) : (
        <>
          {contentCol}
          {imageCol}
        </>
      )}
    </div>
  );
}

/* ─── TipsSection ────────────────────────────────────────────────────────── */
export default function TipsSection({ product }) {
  const rows = buildTipRows(product);

  return (
    <section id="tips" className="w-full bg-white overflow-hidden">
      <div className="px-4 md:px-8 lg:px-16 xl:px-[120px] py-[60px] md:py-[100px] lg:py-[150px]">

        {/* Section header */}
        <div className="flex flex-col gap-[16px] md:gap-[24px] lg:gap-[40px] mb-[60px] md:mb-[80px] lg:mb-[120px]">
          <p className="font-inter font-medium text-[22px] md:text-[28px] lg:text-[32px] text-[#30956A] leading-none">
            Tips for
          </p>
          <h2 className="font-inter font-bold text-[40px] md:text-[64px] lg:text-[88px] text-black leading-none">
            Accurate measurements
          </h2>
        </div>

        {/* Tip rows */}
        <div className="flex flex-col gap-[80px] md:gap-[100px] lg:gap-[120px]">
          {rows.map((data, i) => (
            <TipRow key={data.id} data={data} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
