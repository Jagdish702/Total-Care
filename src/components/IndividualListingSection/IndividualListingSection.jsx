import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../hooks/useProducts';
import { PRODUCT_CARD_ASSETS } from '../../assets/productImages';

/* ─── Design tokens ─────────────────────────────────────────────────────────── */
const SUBSCRIPTION_TEXT = '3 months of TotalCare subscription FREE';

const COMBO_DEFAULT_GRADIENT = 'linear-gradient(181.70deg, rgba(255,255,255,0) 47.215%, rgba(255,255,255,0.4) 62.579%, rgba(255,255,255,0.8) 96.412%)';
const COMBO_HOVER_GRADIENT   = 'linear-gradient(181.70deg, rgba(255,255,255,0) 3.5879%, rgba(255,255,255,0.855) 31.799%, rgba(255,255,255,0.95) 96.412%)';
const INDIV_DEFAULT_GRADIENT = 'linear-gradient(183.51deg, rgba(255,255,255,0) 47.215%, rgba(255,255,255,0.48) 62.579%, rgba(255,255,255,0.8) 96.412%)';
const INDIV_HOVER_GRADIENT   = 'linear-gradient(183.51deg, rgba(255,255,255,0) 3.5879%, rgba(255,255,255,0.855) 31.799%, rgba(255,255,255,0.95) 96.412%)';
const PURPLE_GRADIENT        = 'linear-gradient(118.61deg, #B189FF 0%, #2E008B 96.072%)';

/* ─── Data helpers ──────────────────────────────────────────────────────────── */
const inrStr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

function toCardItem(product) {
  const assets       = PRODUCT_CARD_ASSETS[product.id] ?? {};
  const apiCardImage = (product.images ?? []).find(img => img.imageType === 'card')?.imageUrl ?? null;
  return {
    id:            product.id,
    bgImage:       apiCardImage ?? assets.bgImage ?? null,  // GCP first, static fallback
    icon:          assets.icon ?? null,                     // icons remain static SVGs
    productName:   product.subtitle ?? product.name,
    title:         product.name,
    mrp:           inrStr(product.originalPrice),
    price:         inrStr(product.price),
    rawPrice:      product.price,
    rawMrp:        product.originalPrice,
    featuresTitle: product.featuresTitle ?? '',
    features:      (product.features ?? []).map(f => f.featureText ?? f),
  };
}

/* ─── Shared atoms ──────────────────────────────────────────────────────────── */
function ChevronIcon({ expanded, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={expanded ? 'Collapse features' : 'Expand features'}
      className="absolute top-5 right-6 z-10
                 w-[60px] h-[60px] rounded-full
                 bg-[rgba(0,52,91,0.1)]
                 flex items-center justify-center
                 cursor-pointer shrink-0
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]
                 transition-colors duration-200 hover:bg-[rgba(0,52,91,0.15)]"
    >
      <svg
        width="13" height="8" viewBox="0 0 13 8" fill="none" aria-hidden="true"
        className="transition-transform duration-300"
        style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <path
          d="M1.5 1.5L6.5 6.5L11.5 1.5"
          stroke="#004172" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function SubscriptionText() {
  return (
    <p
      className="font-inter font-medium text-[12px] tracking-[0.3883px] leading-[20px] w-[296px] shrink-0"
      style={{ background: PURPLE_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
    >
      {SUBSCRIPTION_TEXT}
    </p>
  );
}

function PricingRow({ mrp, price }) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <span className="font-inter font-medium text-[24px] text-[#999] line-through leading-8 whitespace-nowrap">
        {mrp}
      </span>
      <span className="font-inter font-light text-[24px] text-black leading-7 whitespace-nowrap">
        {price}
      </span>
      <span className="font-inter font-light text-[32px] text-black leading-none whitespace-nowrap">+</span>
      <SubscriptionText />
    </div>
  );
}

function CardDivider() {
  return <div className="w-full h-px bg-[#D7EAF9] shrink-0" />;
}

function FeaturesList({ featuresTitle, features }) {
  if (!features?.length) return null;
  return (
    <div className="flex flex-col gap-4 pt-[27px]">
      {featuresTitle && (
        <p className="font-inter font-light text-[16px] text-black tracking-[0.5184px] leading-7">
          {featuresTitle}
        </p>
      )}
      <ul className="list-disc pl-6 flex flex-col gap-0">
        {features.map((feat, i) => (
          <li key={i} className="font-inter font-light text-[16px] text-black tracking-[0.5184px] leading-7">
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Skeleton card ─────────────────────────────────────────────────────────── */
function SkeletonCard({ tall }) {
  return (
    <div
      className={`border border-[#D7EAF9] rounded-[24px] bg-[#EDF9FF] animate-pulse ${tall ? 'min-h-[600px]' : 'min-h-[519px]'}`}
    />
  );
}

/* ─── Combo Card ─────────────────────────────────────────────────────────────── */
function ComboCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const navigate  = useNavigate();
  const { showToast } = useCart();

  const handleAddToCart = () => {
    showToast({
      image:         item.bgImage,
      label:         'Combo',
      name:          item.productName,
      type:          'product',
      price:         item.rawPrice,
      originalPrice: item.rawMrp,
      description:   item.featuresTitle,
    });
  };

  return (
    <div
      className="relative border border-[#D7EAF9] rounded-[24px] overflow-hidden
                 flex flex-col
                 md:justify-end md:p-6 md:min-h-[519px]
                 shadow-[inset_0px_0px_8px_0px_rgba(0,65,114,0.08)]
                 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Mobile image — top block, hidden on desktop */}
      {item.bgImage && (
        <div className="md:hidden w-full h-[220px] shrink-0 overflow-hidden bg-[#EDF9FF]">
          <img src={item.bgImage} alt="" className="w-full h-full object-cover object-center" />
        </div>
      )}

      {/* Desktop background image — absolute full cover, hidden on mobile */}
      <div className="hidden md:block absolute inset-0 pointer-events-none rounded-[24px] bg-[#EDF9FF]">
        {item.bgImage && (
          <img src={item.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover object-center rounded-[24px]" />
        )}
        <div className="absolute inset-0 rounded-[24px] transition-opacity duration-500"
             style={{ opacity: hovered ? 0 : 1, background: COMBO_DEFAULT_GRADIENT }} />
        <div className="absolute inset-0 rounded-[24px] transition-opacity duration-500"
             style={{ opacity: hovered ? 1 : 0, background: COMBO_HOVER_GRADIENT }} />
      </div>

      <div className="absolute inset-0 pointer-events-none rounded-[24px]
                      shadow-[inset_0px_0px_8px_0px_rgba(0,65,114,0.08)]" />

      <ChevronIcon expanded={hovered} onClick={() => setHovered(v => !v)} />

      {/* Content — mobile gets own padding; desktop padding is on the card wrapper */}
      <div className="relative p-6 md:p-0 flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-[120px] items-end w-full">
        <div className="flex flex-1 flex-col items-start min-w-0">
          <div className="flex flex-col gap-[27px] items-start w-full">
            <div className="flex gap-2 items-center w-full drop-shadow-[0px_4px_6px_rgba(0,65,114,0.08)]">
              {item.icon && (
                <img src={item.icon} alt="" className="w-6 h-6 shrink-0 object-contain" />
              )}
              <p className="font-inter font-medium text-[12px] text-[#00B82E] tracking-[0.3883px] leading-[1.5]
                            drop-shadow-[0px_2px_4px_rgba(0,65,114,0.08)]">
                {item.productName}
              </p>
            </div>

            <p className="font-inter font-bold text-[28px] md:text-[36px] lg:text-[48px] text-black leading-none whitespace-pre-wrap">
              {item.title}
            </p>

            <PricingRow mrp={item.mrp} price={item.price} />
            <CardDivider />
          </div>

          <motion.div
            initial={false}
            animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden', width: '100%' }}
          >
            <FeaturesList featuresTitle={item.featuresTitle} features={item.features} />
          </motion.div>
        </div>

        <div className="flex gap-6 shrink-0 w-full md:w-[288px]">
          <button
            onClick={() => navigate(`/product/${item.id}`)}
            className="flex-1 h-10 px-4 py-2 rounded-[12px]
                       font-inter font-medium text-[16px] text-[#004172]
                       tracking-[0.2592px] leading-none whitespace-nowrap
                       bg-[rgba(237,249,255,0.2)]
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
          >
            Explore
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 h-10 px-4 py-2 rounded-[12px]
                       font-inter font-medium text-[16px] text-white
                       tracking-[0.2592px] leading-none whitespace-nowrap
                       bg-[#004172]
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                       hover:brightness-110 transition-all duration-150"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Individual Product Card ────────────────────────────────────────────────── */
function ProductCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const navigate  = useNavigate();
  const { showToast } = useCart();

  const handleAddToCart = () => {
    showToast({
      image:         item.bgImage,
      label:         'Device',
      name:          item.productName,
      type:          'product',
      price:         item.rawPrice,
      originalPrice: item.rawMrp,
      description:   item.featuresTitle,
    });
  };

  return (
    <div
      className="relative border border-[#D7EAF9] rounded-[24px] overflow-hidden
                 flex flex-col
                 md:justify-end md:p-6 md:min-h-[600px]
                 shadow-[inset_0px_0px_8px_0px_rgba(0,65,114,0.08)]
                 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Mobile image — top block, hidden on desktop */}
      {item.bgImage && (
        <div className="md:hidden w-full h-[220px] shrink-0 overflow-hidden bg-[#EDF9FF]">
          <img src={item.bgImage} alt="" className="w-full h-full object-cover object-center" />
        </div>
      )}

      {/* Desktop background image — absolute full cover, hidden on mobile */}
      <div className="hidden md:block absolute inset-0 pointer-events-none rounded-[24px] bg-[#EDF9FF]">
        {item.bgImage && (
          <img src={item.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover object-center rounded-[24px]" />
        )}
        <div className="absolute inset-0 rounded-[24px] transition-opacity duration-500"
             style={{ opacity: hovered ? 0 : 1, background: INDIV_DEFAULT_GRADIENT }} />
        <div className="absolute inset-0 rounded-[24px] transition-opacity duration-500"
             style={{ opacity: hovered ? 1 : 0, background: INDIV_HOVER_GRADIENT }} />
      </div>

      <div className="absolute inset-0 pointer-events-none rounded-[24px]
                      shadow-[inset_0px_0px_8px_0px_rgba(0,65,114,0.08)]" />

      <ChevronIcon expanded={hovered} onClick={() => setHovered(v => !v)} />

      {/* Content — mobile gets own padding; desktop padding is on the card wrapper */}
      <div className="relative p-6 md:p-0 flex flex-col sm:flex-row gap-5 sm:gap-8 lg:gap-[80px] items-end w-full">
        <div className="flex flex-1 flex-col items-start min-w-0">
          <div className="flex flex-col gap-[27px] items-start w-full">
            <div className="flex gap-2 items-center w-full drop-shadow-[0px_4px_6px_rgba(0,65,114,0.08)]">
              {item.icon && (
                <img src={item.icon} alt="" className="w-6 h-6 shrink-0 object-contain" />
              )}
              <p className="flex-1 min-w-0 font-inter font-medium text-[12px] text-[#00B82E]
                            tracking-[0.3883px] leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap
                            drop-shadow-[0px_2px_4px_rgba(0,65,114,0.08)]">
                {item.productName}
              </p>
            </div>

            <p className="font-inter font-medium text-[24px] md:text-[28px] lg:text-[32px] text-black leading-8 whitespace-pre-wrap">
              {item.title}
            </p>

            <PricingRow mrp={item.mrp} price={item.price} />
            <CardDivider />
          </div>

          <motion.div
            initial={false}
            animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden', width: '100%' }}
          >
            <FeaturesList featuresTitle={item.featuresTitle} features={item.features} />
          </motion.div>
        </div>

        <div className="flex gap-6 shrink-0 w-full md:w-[288px]">
          <button
            onClick={() => navigate(`/product/${item.id}`)}
            className="flex-1 h-10 px-4 py-2 rounded-[12px]
                       font-inter font-medium text-[16px] text-[#004172]
                       tracking-[0.2592px] leading-none whitespace-nowrap
                       bg-[rgba(237,249,255,0.2)]
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
          >
            Explore
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 h-10 px-4 py-2 rounded-[12px]
                       font-inter font-medium text-[16px] text-white
                       tracking-[0.2592px] leading-none whitespace-nowrap
                       bg-[#004172]
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                       hover:brightness-110 transition-all duration-150"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Section header ─────────────────────────────────────────────────────────── */
function SectionHeader({ label }) {
  return (
    <div className="flex gap-6 items-center w-full">
      <span className="font-inter font-bold text-[24px] text-[#808080] tracking-[0.3888px] leading-none whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-[#D7EAF9]" />
    </div>
  );
}

/* ─── IndividualListingSection ───────────────────────────────────────────────── */
export default function IndividualListingSection() {
  const { products: bundles,     loading: bundlesLoading   } = useProducts({ type: 'bundle'     });
  const { products: individuals, loading: individualsLoading } = useProducts({ type: 'individual' });

  const comboItems  = bundles.map(toCardItem);
  const deviceItems = individuals.map(toCardItem);

  return (
    <section className="bg-white w-full">
      <div
        className="flex flex-col items-center gap-[80px] md:gap-[100px] lg:gap-[120px]
                   px-4 md:px-8 lg:px-16 xl:px-[120px]
                   py-[80px] md:py-[100px] lg:py-[120px]"
      >
        {/* ── Page heading ── */}
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 items-center text-center w-full">
          <p className="font-inter font-medium text-[20px] md:text-[24px] text-[#00B82E]
                        tracking-[0.324px] leading-[28px]">
            Supported devices on Total Care
          </p>
          <div className="font-inter font-bold text-black text-center leading-none
                          text-[48px] md:text-[64px] lg:text-[88px]">
            <p>Upgrade your life</p>
            <p>with better Care Angles</p>
          </div>
        </div>

        {/* ── Device Combos ── */}
        <div className="flex flex-col gap-10 lg:gap-[60px] items-center w-full">
          <SectionHeader label="Device Combos" />
          <div className="flex flex-col gap-8 lg:gap-12 w-full">
            {bundlesLoading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} tall={false} />)
              : comboItems.map(item => <ComboCard key={item.id} item={item} />)
            }
          </div>
        </div>

        {/* ── Individual Devices ── */}
        <div className="flex flex-col gap-10 lg:gap-[60px] items-center w-full">
          <SectionHeader label="Individual Devices" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
            {individualsLoading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} tall />)
              : deviceItems.map(item => <ProductCard key={item.id} item={item} />)
            }
          </div>
        </div>
      </div>
    </section>
  );
}
