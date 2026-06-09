import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

/* ─── Product assets (same as IndividualListingSection) ─────────────────── */
import bgBpMonitor       from '../../assets/products/bg-bp-monitor.jpg';
import bgGlucoseMonitor  from '../../assets/products/bg-glucose-monitor.jpg';
import bgSmartScale      from '../../assets/products/bg-smart-scale.jpg';
import comboBpScale      from '../../assets/products/combo-bp-scale.jpg';
import comboDiabetes     from '../../assets/products/combo-diabetes.jpg';
import comboComplete     from '../../assets/products/combo-complete.jpg';
import iconWeightMachine from '../../assets/products/icons/weight machine green.svg';
import iconHeart         from '../../assets/products/icons/heart green.svg';
import iconShieldTick    from '../../assets/products/icons/shild tick green complete health essential.svg';
import iconWaterDrop     from '../../assets/products/icons/water drop box.svg';

/* ─── Figma remote assets ────────────────────────────────────────────────── */
const heroImg     = 'https://www.figma.com/api/mcp/asset/16ba1c90-cbc8-470e-b17f-b41fe1cf00c2';
const trustBanner = 'https://www.figma.com/api/mcp/asset/33d251c2-222d-4935-8333-925ed884d3e0';
const icoBP       = 'https://www.figma.com/api/mcp/asset/050dc0d4-5bb2-4a17-9a2a-82fc48c9b991';
const icoFamily   = 'https://www.figma.com/api/mcp/asset/55d69ca8-01e4-4fd1-a219-efabc26de2e9';
const icoWeight   = 'https://www.figma.com/api/mcp/asset/4ff671c2-9b8c-41c5-b12a-ed94c7b49646';
const icoPrev     = 'https://www.figma.com/api/mcp/asset/e73e0bbf-5701-4e04-845c-4af8a17aeee8';
const icoSugar    = 'https://www.figma.com/api/mcp/asset/0f1eac50-2cb7-472a-9a98-4e3b2c002ac8';
const icoPostDx   = 'https://www.figma.com/api/mcp/asset/b1132177-2c59-4ea2-85ad-59ec36272417';

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const PURPLE_GRADIENT    = 'linear-gradient(118.61deg, #B189FF 0%, #2E008B 96.072%)';
const SUBSCRIPTION_TEXT  = '3 months of TotalCare subscription FREE';

/* Card bg gradients — default (collapsed) vs expanded, matches web hover states */
const CARD_GRADIENT_DEFAULT  = 'linear-gradient(183.51deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.5) 65%, rgba(255,255,255,0.85) 96%)';
const CARD_GRADIENT_EXPANDED = 'linear-gradient(183.51deg, rgba(255,255,255,0) 5%, rgba(255,255,255,0.855) 32%, rgba(255,255,255,0.95) 96%)';

/* ─── Product data (mirrors IndividualListingSection) ───────────────────── */
const COMBOS = [
  {
    id: 'bp-essentials',
    bgImage: comboBpScale,
    icon: iconWeightMachine,
    productName: 'Omron HEM-7140T1-AP BP Monitor + MEDITIVE Body Composition Scale',
    title: 'Blood pressure care essentials',
    mrp: '₹5,559', price: '₹2,899',
    featuresTitle: 'Tracks key cardiovascular and body health indicators:',
    features: [
      'Blood pressure & pulse monitoring',
      'Irregular heartbeat detection',
      'Hypertension indication alerts',
      'Clinically validated accuracy',
      'Bluetooth app connectivity',
      'One-touch easy operation',
      'Weight, BMI & body fat tracking',
      'Muscle mass, metabolism & hydration insights',
    ],
  },
  {
    id: 'diabetes-essentials',
    bgImage: comboDiabetes,
    icon: iconHeart,
    productName: 'RGB GlucoBuddy BLE Glucometer + MEDITIVE Body Composition Scale',
    title: 'Diabetes care essentials',
    mrp: '₹4,599', price: '₹1,999',
    featuresTitle: 'Tracks key diabetes and body health indicators:',
    features: [
      'Fast blood sugar results in 5 seconds',
      'Before & after meal sugar tracking',
      '900 test memory with recall',
      'Auto coding & strip ejection',
      'Weight, BMI & body fat tracking',
      'Muscle mass, metabolism & hydration insights',
      'Bluetooth health data sync',
      'Compact daily-use monitoring setup',
    ],
  },
  {
    id: 'complete-essentials',
    bgImage: comboComplete,
    icon: iconShieldTick,
    productName: 'Omron HEM BP Monitor + RGB GlucoBuddy Glucometer + MEDITIVE Scale',
    title: 'Complete health essentials',
    mrp: '₹7,159', price: '₹3,899',
    featuresTitle: 'Tracks essential everyday health indicators:',
    features: [
      'Blood sugar, BP & pulse monitoring',
      'Before & after meal sugar tracking',
      'Irregular heartbeat & hypertension alerts',
      'Fast glucose results in 5 seconds',
      'Weight, BMI & body fat tracking',
      'Muscle mass, metabolism & hydration insights',
      'Bluetooth-connected health tracking',
      'Multi-device monitoring for the whole family',
    ],
  },
];

const DEVICES = [
  {
    id: 'scale',
    bgImage: bgSmartScale,
    icon: iconWeightMachine,
    productName: 'MEDITIVE Body Composition Scale',
    title: 'Body Composition Scale',
    mrp: '₹2,999', price: '₹1,000',
    featuresTitle: 'Captures multiple body composition parameters:',
    features: [
      'Track weight and body fat together',
      'Understand fitness progress beyond weight',
      'Monitor muscle and metabolism changes',
      'Sync health data to your phone',
      'Track progress for the whole family',
      'Accurate readings with automatic tracking',
    ],
  },
  {
    id: 'glucose',
    bgImage: bgGlucoseMonitor,
    icon: iconWaterDrop,
    productName: 'RGB GlucoBuddy BLE Glucometer',
    title: 'Glucose Monitor',
    mrp: '₹1,600', price: '₹1,000',
    featuresTitle: 'Captures diabetes monitoring parameters:',
    features: [
      'Auto Coding',
      'Automatic Strip Ejection',
      'FAD-GDH Enzyme Technology',
      'Fast Results in 5 Seconds',
      '900 Test Memory',
      'Before & After Meal Tracking',
      'Compact & Portable Design',
    ],
  },
  {
    id: 'bp',
    bgImage: bgBpMonitor,
    icon: iconHeart,
    productName: 'Omron HEM-7140T1-AP BP Monitor',
    title: 'Blood Pressure Monitor',
    mrp: '₹2,560', price: '₹2,000',
    featuresTitle: 'Captures cardiovascular vital parameters:',
    features: [
      'Bluetooth Connectivity',
      'IntelliSense™ Technology',
      'Hypertension Indicator',
      'Irregular Heartbeat Detection',
      'Pulse Monitoring',
      'One-touch Operation',
      'Clinically Validated Accuracy',
    ],
  },
];

/* ─── Health-focus → product mapping ────────────────────────────────────── */
const FOCUS_MAP = {
  bp:         { combos: ['bp-essentials'],                                    devices: ['bp'] },
  family:     { combos: ['complete-essentials'],                              devices: ['scale', 'bp', 'glucose'] },
  weight:     { combos: [],                                                   devices: ['scale'] },
  preventive: { combos: ['complete-essentials'],                              devices: ['scale', 'bp'] },
  sugar:      { combos: ['diabetes-essentials'],                              devices: ['glucose'] },
  postdx:     { combos: ['bp-essentials', 'diabetes-essentials', 'complete-essentials'], devices: [] },
};

/* ─── Health-focus selector cards ───────────────────────────────────────── */
const SELECTOR_CARDS = [
  { id: 'bp',         icon: icoBP,      label: 'High Blood Pressure' },
  { id: 'family',     icon: icoFamily,  label: 'Family Health Monitoring' },
  { id: 'weight',     icon: icoWeight,  label: 'Weight Gain / Loss Tracking' },
  { id: 'preventive', icon: icoPrev,    label: 'Preventive Health Check' },
  { id: 'sugar',      icon: icoSugar,   label: 'Mild / Occasional Sugar Monitoring' },
  { id: 'postdx',     icon: icoPostDx,  label: 'Post-Diagnosis Care' },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function parsePrice(str) {
  return parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0;
}

/* ─── Mobile product card — tap to expand features (web hover → mobile tap) */
function MobileProductCard({ item, type }) {
  const [expanded, setExpanded] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    showToast({
      image: item.bgImage,
      label: type === 'combo' ? 'Combo' : 'Device',
      name: item.productName,
      type: 'product',
      price: parsePrice(item.price),
      originalPrice: parsePrice(item.mrp),
      description: item.featuresTitle,
    });
  };

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col justify-end"
      style={{
        borderRadius: '24px',
        border: '1px solid #D7EAF9',
        minHeight: expanded ? 'auto' : '280px',
        boxShadow: 'inset 0px 0px 8px rgba(0,65,114,0.08)',
        cursor: 'pointer',
      }}
      onClick={() => setExpanded(e => !e)}
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: '24px' }}>
        <img
          src={item.bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ borderRadius: '24px' }}
        />
        {/* Gradient fades in/out with expanded state */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            borderRadius: '24px',
            opacity: expanded ? 0 : 1,
            background: CARD_GRADIENT_DEFAULT,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            borderRadius: '24px',
            opacity: expanded ? 1 : 0,
            background: CARD_GRADIENT_EXPANDED,
          }}
        />
      </div>

      {/* Inner shadow ring */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: '24px', boxShadow: 'inset 0px 0px 8px rgba(0,65,114,0.08)' }}
      />

      {/* Content */}
      <div className="relative flex flex-col" style={{ padding: '20px', gap: '16px' }}>

        {/* Product name row */}
        <div className="flex items-center" style={{ gap: '8px' }}>
          <img src={item.icon} alt="" style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }} />
          <p
            className="font-inter font-medium text-[#00B82E] flex-1 min-w-0"
            style={{ fontSize: '13px', lineHeight: '20px', letterSpacing: '0.42px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {item.productName}
          </p>
        </div>

        {/* Title */}
        <p
          className="font-inter font-bold text-black"
          style={{ fontSize: type === 'combo' ? '22px' : '20px', lineHeight: '1.2' }}
        >
          {item.title}
        </p>

        {/* Pricing row */}
        <div className="flex flex-wrap items-end" style={{ gap: '8px' }}>
          <span
            className="font-inter font-light text-[#999] line-through"
            style={{ fontSize: '22px', lineHeight: '1', whiteSpace: 'nowrap' }}
          >
            {item.mrp}
          </span>
          <span
            className="font-inter font-light text-black"
            style={{ fontSize: '22px', lineHeight: '1', whiteSpace: 'nowrap' }}
          >
            {item.price}
          </span>
          <span
            className="font-inter font-light text-black"
            style={{ fontSize: '22px', lineHeight: '1' }}
          >
            +
          </span>
          {/* Purple subscription text */}
          <p
            className="font-inter font-medium"
            style={{
              fontSize: '11px', lineHeight: '18px', letterSpacing: '0.36px',
              background: PURPLE_GRADIENT,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            {SUBSCRIPTION_TEXT}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#D7EAF9', width: '100%' }} />

        {/* Chevron toggle row */}
        <div
          className="flex items-center justify-between"
          style={{ gap: '8px' }}
          onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
        >
          <p
            className="font-inter font-medium text-[#004172]"
            style={{ fontSize: '13px', lineHeight: '20px' }}
          >
            {expanded ? 'Hide features' : 'See all features'}
          </p>
          <svg width="13" height="8" viewBox="0 0 13 8" fill="none" style={{ flexShrink: 0, transition: 'transform 0.3s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <path d="M1.5 1.5L6.5 6.5L11.5 1.5" stroke="#004172" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Features — animated expand/collapse */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div style={{ paddingTop: '4px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p
              className="font-inter font-bold text-black"
              style={{ fontSize: '13px', lineHeight: '20px', letterSpacing: '0.42px' }}
            >
              {item.featuresTitle}
            </p>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {item.features.map((f, i) => (
                <li key={i}
                    className="font-inter font-light text-black"
                    style={{ fontSize: '13px', lineHeight: '22px', letterSpacing: '0.42px' }}>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <div
          className="flex w-full"
          style={{ gap: '12px' }}
          onClick={e => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => navigate(`/product/${item.id}`)}
            className="flex-1 flex items-center justify-center font-inter font-medium text-[#004172]"
            style={{
              height: '40px', borderRadius: '12px', fontSize: '14px',
              letterSpacing: '0.26px', border: 'none', cursor: 'pointer',
              background: 'rgba(237,249,255,0.85)',
              boxShadow: '0px 2px 2px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.08)',
            }}
          >
            Explore
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center font-inter font-medium text-white"
            style={{
              height: '40px', borderRadius: '12px', fontSize: '14px',
              letterSpacing: '0.26px', border: 'none', cursor: 'pointer',
              background: '#004172',
              boxShadow: '0px 2px 2px rgba(0,65,114,0.08)',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Product bottom sheet ───────────────────────────────────────────────── */
function ProductSheet({ focusId, focusLabel, onClose }) {
  const map = FOCUS_MAP[focusId] || { combos: [], devices: [] };
  const combos  = COMBOS.filter(c => map.combos.includes(c.id));
  const devices = DEVICES.filter(d => map.devices.includes(d.id));

  /* lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.48)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full bg-white flex flex-col overflow-hidden"
        style={{ borderRadius: '28px 28px 0 0', maxHeight: '92vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sheet handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: '#e0e0e0' }} />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{ padding: '12px 20px 16px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <p
              className="font-inter font-light text-[#808080]"
              style={{ fontSize: '12px', letterSpacing: '0.3px' }}
            >
              Products for
            </p>
            <p
              className="font-inter font-bold text-[#004172]"
              style={{ fontSize: '18px', lineHeight: '1.2' }}
            >
              {focusLabel}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex items-center justify-center"
            style={{
              width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
              background: '#f5f5f5', border: 'none', cursor: 'pointer',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 2L2 10M2 2l8 8" stroke="#004172" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#f0f0f0', margin: '0 20px' }} />

        {/* Scrollable product list */}
        <div
          className="overflow-y-auto"
          style={{ padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {/* Combos */}
          {combos.length > 0 && (
            <>
              {combos.length > 0 && devices.length > 0 && (
                <div className="flex items-center" style={{ gap: '12px', marginBottom: '4px' }}>
                  <p className="font-inter font-bold text-[#808080]" style={{ fontSize: '13px', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
                    Device Combos
                  </p>
                  <div style={{ flex: 1, height: '1px', background: '#D7EAF9' }} />
                </div>
              )}
              {combos.map(c => <MobileProductCard key={c.id} item={c} type="combo" />)}
            </>
          )}

          {/* Individual devices */}
          {devices.length > 0 && (
            <>
              {combos.length > 0 && devices.length > 0 && (
                <div className="flex items-center" style={{ gap: '12px', margin: '4px 0' }}>
                  <p className="font-inter font-bold text-[#808080]" style={{ fontSize: '13px', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
                    Individual Devices
                  </p>
                  <div style={{ flex: 1, height: '1px', background: '#D7EAF9' }} />
                </div>
              )}
              {devices.map(d => <MobileProductCard key={d.id} item={d} type="device" />)}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Single selector row ────────────────────────────────────────────────── */
function SelectorCard({ card, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full flex items-center text-left bg-white"
      style={{
        gap: '16px',
        paddingLeft: '24px', paddingRight: '16px',
        paddingTop: '24px',  paddingBottom: '24px',
        borderRadius: '40px', border: 'none', cursor: 'pointer',
        boxShadow: '0px 4px 6px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.16)',
      }}
    >
      {/* 48×48 icon */}
      <div
        className="shrink-0 overflow-hidden flex items-center justify-center"
        style={{ width: '48px', height: '48px' }}
      >
        <img src={card.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Label — Mobile/H3-M: 20px medium #004172 */}
      <p
        className="font-inter font-medium text-[#004172] flex-1 min-w-0 text-left"
        style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '0.324px' }}
      >
        {card.label}
      </p>

      {/* Chevron right */}
      <div className="shrink-0" style={{ filter: 'drop-shadow(0px 2px 8px rgba(0,65,114,0.08))' }}>
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
          <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke="#004172" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */
export default function GetCareSection() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );
  const [activeId,    setActiveId]    = useState(null);
  const [activeLabel, setActiveLabel] = useState('');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Desktop uses IndividualListingSection — this section is mobile-only
  if (!isMobile) return null;

  const open = (id, label) => { setActiveId(id); setActiveLabel(label); };
  const close = () => setActiveId(null);

  return (
    <>
      <section className="bg-white w-full overflow-hidden">

        {/* ── Hero photo — h=422px, image bleed ── */}
        <div className="relative w-full shrink-0" style={{ height: '422px', overflow: 'hidden' }}>
          <img
            src={heroImg}
            alt=""
            className="absolute left-0 w-full max-w-none pointer-events-none"
            style={{ height: '123.46%', top: '-16.35%', objectFit: 'cover' }}
          />
        </div>

        {/* ── Green content area ── */}
        <div
          className="flex flex-col w-full"
          style={{ background: '#e3f0e4', paddingTop: '24px', paddingBottom: '48px', paddingLeft: '24px', paddingRight: '24px', gap: '48px' }}
        >
          {/* Title — "Get care" gradient + "that fits you" black */}
          <div>
            <p
              className="font-inter font-bold w-full"
              style={{
                fontSize: '48px', lineHeight: 'normal',
                background: 'linear-gradient(to bottom, #10b981, #00664c)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              Get care
            </p>
            <p className="font-inter font-bold text-black w-full" style={{ fontSize: '48px', lineHeight: 'normal' }}>
              that fits you
            </p>
          </div>

          {/* Subtitle — Mobile/H3-L */}
          <p
            className="font-inter font-light text-black w-full"
            style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '0.324px', marginTop: '-28px' }}
          >
            Select your health focus
          </p>

          {/* 6 selector cards */}
          <div className="flex flex-col w-full" style={{ gap: '24px' }}>
            {SELECTOR_CARDS.map(card => (
              <SelectorCard
                key={card.id}
                card={card}
                onClick={() => open(card.id, card.label)}
              />
            ))}
          </div>

          {/* Trust banner — aspect 820/119, green glow */}
          <div
            className="relative w-full overflow-hidden shrink-0"
            style={{
              aspectRatio: '820 / 119', borderRadius: '16px',
              boxShadow: '0px 0px 12px 0px rgba(67,172,105,0.16)',
            }}
          >
            <img
              src={trustBanner}
              alt="Expert guidance · Personalised plans · Track progress"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ borderRadius: '16px' }}
            />
          </div>
        </div>
      </section>

      {/* ── Product bottom sheet ── */}
      <AnimatePresence>
        {activeId && (
          <ProductSheet
            key={activeId}
            focusId={activeId}
            focusLabel={activeLabel}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </>
  );
}
