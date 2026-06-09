import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import ambulanceIcon        from '../../assets/subscription/icon-ambulance.svg';
import specialistIcon       from '../../assets/subscription/icon-specialist.svg';
import conciergeIcon        from '../../assets/subscription/icon-concierge.svg';
import medicineIcon         from '../../assets/subscription/icon-medicine.svg';
import subscriptionToastImg from '../../assets/product-explore/cart-toast-subscription.png';
import { useCart }          from '../../context/CartContext';

/* ─── Data ──────────────────────────────────────────────────────────────── */

const FEATURES = [
  { icon: ambulanceIcon,  label: 'Ambulance within 30 minutes' },
  { icon: specialistIcon, label: 'Specialist consultation within 48 hours' },
  { icon: conciergeIcon,  label: 'Medical Concierge within 30 minutes' },
  { icon: specialistIcon, label: 'Family doctor call back within 6 hours' },
  { icon: medicineIcon,   label: 'Medicine delivery within 3 hours' },
];

const PLANS = [
  {
    title:     'Quarterly Plan',
    original:  '199',
    price:     '99',
    unitLines: ['INR /', 'month'],
    descLines: ['First 3 months billed at ₹297, then ₹99/month.', 'Save upto ₹300 on your dedicated care'],
    cta:       'Get Started at ₹297',
  },
  {
    title:     'Yearly plan',
    original:  '1,999',
    price:     '999',
    unitLines: ['INR /', 'year'],
    descLines: ['Billed yearly.', 'Save upto ₹1,000 on your dedicated care.'],
    cta:       'Get Started at ₹999',
  },
];

const MODAL_DATA = [
  {
    planTitle:  'Quarterly Plan',
    titleColor: '#d29300',
    subtitle:   'Flexible monthly continuation',
    priceBreakdown: [
      { label: 'First 3 months', original: '₹597', discounted: '₹297/month' },
      { label: 'After 3 months', original: '₹199', discounted: '₹99/month'  },
    ],
    youSaved: [
      { label: '₹100/month × 3 months', value: '₹300 saved'       },
      { label: 'After 3 months',         value: '₹100/month Saved' },
    ],
    billingInfo: [
      'Billed ₹297 today',
      'Auto-renews monthly at ₹99',
      'Cancel anytime before next billing',
    ],
  },
  {
    planTitle:  'Yearly Plan',
    titleColor: '#00b2dd',
    subtitle:   'Best value for long-term care',
    priceBreakdown: [
      { label: '12 months access', original: '₹1,999', discounted: '₹999/year' },
    ],
    youSaved: [
      { label: '₹1000/year', value: '₹1,000 saved' },
    ],
    billingInfo: [
      'Billed ₹999 today',
      'Renews yearly',
      'Cancel anytime before renewal',
    ],
  },
];

/* ─── Countdown ─────────────────────────────────────────────────────────── */
const INITIAL_SECS = 47 * 3600 + 59 * 60 + 30;
function pad(n) { return String(n).padStart(2, '0'); }

/* ─── Price Breakdown Modal ─────────────────────────────────────────────── */
function PriceBreakdownModal({ data, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative bg-white rounded-[48px]
                   drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)]
                   shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]
                   w-full max-w-[700px] max-h-[90vh] overflow-y-auto
                   flex flex-col gap-12 p-8 sm:p-[48px]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[48px] right-[48px]
                     w-[16px] h-[16px] flex items-center justify-center
                     hover:opacity-60 transition-opacity duration-150
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M12 4L4 12M4 4l8 8" stroke="#004172" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex flex-col gap-4 items-center text-center w-full pr-8">
          <p className="font-inter font-black text-[24px] leading-[1.2] tracking-[0.3888px] uppercase"
             style={{ color: data.titleColor }}>
            {data.planTitle}
          </p>
          <p className="font-inter font-light text-[24px] leading-[1.2] tracking-[0.3888px] uppercase text-black">
            {data.subtitle}
          </p>
        </div>

        <hr className="border-0 border-t border-[#e5e5e5] w-full" />

        <div className="flex flex-col gap-6 w-full">
          <p className="font-inter font-bold text-[18px] leading-[28px] tracking-[0.5825px] text-[#808080]">
            Price Breakdown
          </p>
          <div className="flex flex-col gap-3 w-full">
            {data.priceBreakdown.map(({ label, original, discounted }, i) => (
              <div key={i} className="flex items-center justify-between w-full">
                <p className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.5184px] text-black">
                  {label}
                </p>
                <div className="flex gap-2 items-center shrink-0">
                  <p className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.5184px]
                                text-[#b2b2b2] line-through decoration-solid">
                    {original}
                  </p>
                  <p className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.5184px] text-[#4d4d4d]">
                    {discounted}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <p className="font-inter font-bold text-[18px] leading-[28px] tracking-[0.5825px] text-[#808080]">
            You Saved
          </p>
          <div className="flex flex-col gap-3 w-full">
            {data.youSaved.map(({ label, value }, i) => (
              <div key={i} className="flex items-center justify-between w-full">
                <p className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.5184px] text-black">
                  {label}
                </p>
                <p className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.5184px] text-[#4d4d4d] shrink-0">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <p className="font-inter font-bold text-[18px] leading-[28px] tracking-[0.5825px] text-[#808080]">
            Billing Info
          </p>
          <ul className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.5184px]
                         text-black list-disc pl-6">
            {data.billingInfo.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Mobile Plan Card ──────────────────────────────────────────────────── */
function MobilePlanCard({ plan, planIndex, onBreakdown, onGetStarted }) {
  return (
    <div
      className="relative bg-white rounded-[32px]
                 drop-shadow-[0px_2px_4px_rgba(0,65,114,0.08)]
                 flex flex-col items-start w-full"
      style={{ gap: '48px', padding: '48px 24px' }}
    >
      {/* Plan title — 24px gradient */}
      <h3
        className="font-inter font-bold bg-gradient-to-b from-[#10b981] to-[#00664c]
                   bg-clip-text text-transparent shrink-0"
        style={{ fontSize: '24px', lineHeight: '32px' }}
      >
        {plan.title}
      </h3>

      {/* Price row */}
      <div className="flex items-start gap-2 leading-none shrink-0">
        <span className="font-inter font-light text-[16px] text-black tracking-[0.2592px]"
              style={{ lineHeight: '1.2', marginTop: '4px' }}>
          ₹
        </span>
        <span className="font-inter font-normal text-[48px] text-[#ccc] leading-none line-through decoration-solid">
          {plan.original}
        </span>
        <span className="font-inter font-normal text-[48px] text-black leading-none">
          {plan.price}
        </span>
        <div className="flex flex-col font-inter font-light text-[16px] text-black tracking-[0.2592px]"
             style={{ lineHeight: '1.2', marginTop: '4px' }}>
          {plan.unitLines.map((line, i) => <span key={i}>{line}</span>)}
        </div>
      </div>

      {/* Desc + CTA buttons */}
      <div className="flex flex-col gap-6 items-start w-full shrink-0">
        {/* 12px desc text (Mobile/Status) */}
        <p className="font-inter font-medium text-black w-full"
           style={{ fontSize: '12px', lineHeight: '1.5', letterSpacing: '0.3883px' }}>
          {plan.descLines[0]}<br />{plan.descLines[1]}
        </p>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={() => onGetStarted(plan)}
          className="relative w-full text-white font-inter font-medium
                     rounded-[12px] flex items-center justify-center
                     drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                     hover:bg-[#00345b] active:scale-[0.98]
                     transition-all duration-150
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172] focus-visible:ring-offset-2"
          style={{ height: '40px', fontSize: '16px', letterSpacing: '0.2592px', background: '#004172' }}
        >
          {plan.cta}
          <div className="absolute inset-0 rounded-[inherit] pointer-events-none
                          shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
        </button>

        {/* Secondary — see breakdown */}
        <button
          type="button"
          onClick={() => onBreakdown(planIndex)}
          className="w-full flex items-center justify-center font-inter font-medium
                     text-[#004172] rounded-[12px]
                     drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                     hover:underline transition-all duration-150
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172] focus-visible:ring-offset-2"
          style={{ height: '32px', fontSize: '16px', letterSpacing: '0.2592px' }}
        >
          See price breakdown
        </button>
      </div>

      {/* Feature list */}
      <div className="flex flex-col gap-6 items-start w-full shrink-0">
        {FEATURES.map(({ icon, label }, i) => (
          <div key={i} className="flex gap-5 items-center w-full">
            <div className="w-6 h-6 shrink-0 flex items-center justify-center overflow-hidden">
              <img src={icon} alt="" className="w-4 h-4 object-contain" />
            </div>
            <p className="font-inter font-medium text-[16px] text-black
                          tracking-[0.5184px] leading-[28px] flex-1 min-w-0">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Inner stroke */}
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none
                      shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
    </div>
  );
}

/* ─── Desktop PlanCard ──────────────────────────────────────────────────── */
function PlanCard({ plan, planIndex, onBreakdown, onGetStarted }) {
  return (
    <div className="relative bg-white rounded-[32px]
                    drop-shadow-[0px_2px_4px_rgba(0,65,114,0.08)]
                    shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                    flex flex-col gap-12 items-start
                    px-6 py-12
                    w-full xl:w-[498px] shrink-0">

      <h3 className="font-inter font-semibold text-[32px] leading-none
                     bg-gradient-to-b from-[#10b981] to-[#00664c]
                     bg-clip-text text-transparent">
        {plan.title}
      </h3>

      <div className="flex items-start gap-2 leading-none">
        <span className="font-inter font-light text-[16px] text-black tracking-[0.2592px] leading-[1.2] mt-1">₹</span>
        <span className="font-inter font-normal text-[48px] text-[#ccc] leading-none line-through decoration-solid">
          {plan.original}
        </span>
        <span className="font-inter font-normal text-[48px] text-black leading-none">
          {plan.price}
        </span>
        <div className="flex flex-col font-inter font-light text-[16px] text-black tracking-[0.2592px] leading-[1.2] mt-1">
          {plan.unitLines.map((line, i) => <span key={i}>{line}</span>)}
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <p className="font-inter font-medium text-[16px] text-black tracking-[0.2592px] leading-normal">
          {plan.descLines[0]}<br />{plan.descLines[1]}
        </p>

        <button
          onClick={() => onGetStarted(plan)}
          className="w-full h-[40px] bg-[#004172] text-white
                     font-inter font-medium text-[16px] tracking-[0.2592px]
                     rounded-[12px]
                     drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                     shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                     hover:bg-[#00345b] transition-colors duration-150
                     focus:outline-none focus-visible:ring-2
                     focus-visible:ring-[#004172] focus-visible:ring-offset-2"
        >
          {plan.cta}
        </button>

        <button
          onClick={() => onBreakdown(planIndex)}
          className="w-full h-[32px] text-[#004172]
                     font-inter font-medium text-[16px] tracking-[0.2592px]
                     rounded-[12px]
                     drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                     hover:underline transition-all duration-150
                     focus:outline-none focus-visible:ring-2
                     focus-visible:ring-[#004172] focus-visible:ring-offset-2"
        >
          See price breakdown
        </button>
      </div>

      <div className="flex flex-col gap-6 w-full">
        {FEATURES.map(({ icon, label }, i) => (
          <div key={i} className="flex gap-5 items-center w-full">
            <div className="w-6 h-6 shrink-0 flex items-center justify-center overflow-hidden">
              <img src={icon} alt="" className="w-4 h-4 object-contain" />
            </div>
            <p className="font-inter font-medium text-[16px] text-black
                          tracking-[0.5184px] leading-[28px] flex-1 min-w-0">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SubscriptionSection ───────────────────────────────────────────────── */
export default function SubscriptionSection() {
  const [secs, setSecs]       = useState(INITIAL_SECS);
  const [openModal, setOpenModal] = useState(null);
  const [isMobile, setIsMobile]   = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );
  const { showToast } = useCart();

  /* countdown */
  useEffect(() => {
    const id = setInterval(() => setSecs(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  /* responsive */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleGetStarted = (plan) => {
    const isQuarterly = plan.title.toLowerCase().includes('quarterly');
    showToast({
      image:         subscriptionToastImg,
      label:         'Subscription',
      name:          plan.title,
      type:          'subscription',
      price:         isQuarterly ? 297  : 999,
      originalPrice: isQuarterly ? 447  : 1999,
      priceLabel:    isQuarterly
        ? 'Start at ₹297 for 3 months (₹99/month), then continue at ₹99/month.'
        : 'Billed ₹999/year. Save upto ₹1,000 on your dedicated care.',
      description:   'Complete care with priority support, faster consultations, and continuous health tracking',
    });
  };

  const h = pad(Math.floor(secs / 3600));
  const m = pad(Math.floor((secs % 3600) / 60));
  const s = pad(secs % 60);

  /* ── Mobile layout ─────────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        <section className="bg-white flex flex-col items-center w-full px-6 py-12"
                 style={{ gap: '10px' }}>

          {/* Heading block */}
          <div className="flex flex-col items-center text-center w-full" style={{ gap: '48px' }}>
            <h2 className="font-inter font-bold text-black w-full"
                style={{ fontSize: '48px', lineHeight: '1' }}>
              Total Care Subscription
            </h2>
            <p className="font-inter font-light text-[#4d4d4d] w-full"
               style={{ fontSize: '14px', lineHeight: '24px', letterSpacing: '0.4536px' }}>
              Totalcare moves at your speed. Immediate support, reliable care,
              and everything coordinated for you - so you spend less time
              worrying and more time living.
            </p>
          </div>

          {/* Plans block — countdown + cards */}
          <div className="flex flex-col items-center w-full" style={{ gap: '24px' }}>

            {/* Countdown banner */}
            <div
              className="flex flex-col items-center justify-center rounded-[24px] w-full"
              style={{
                gap: '24px',
                padding: '24px',
                background:
                  'radial-gradient(ellipse 100% 200% at 50% 50%, rgba(232,241,248,1) 0%, rgba(255,255,255,1) 100%)',
              }}
            >
              <p className="font-inter font-light text-[#d82525] text-center"
                 style={{ fontSize: '18px', lineHeight: '28px', letterSpacing: '0.5825px' }}>
                Limited 500 Member offer ending in
              </p>
              <p className="font-inter font-bold text-[#d82525] text-center"
                 style={{ fontSize: '18px', lineHeight: '28px', letterSpacing: '0.5825px' }}>
                {h}:{m}:{s}
              </p>
            </div>

            {/* Plan cards */}
            <div className="flex flex-col w-full" style={{ gap: '24px' }}>
              {PLANS.map((plan, idx) => (
                <MobilePlanCard
                  key={plan.title}
                  plan={plan}
                  planIndex={idx}
                  onBreakdown={setOpenModal}
                  onGetStarted={handleGetStarted}
                />
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {openModal !== null && (
            <PriceBreakdownModal
              key="price-modal"
              data={MODAL_DATA[openModal]}
              onClose={() => setOpenModal(null)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  /* ── Desktop layout ─────────────────────────────────────────────────────── */
  return (
    <>
      <section
        className="subscription-section-bg w-full overflow-hidden
                   flex flex-col gap-[60px] items-center
                   pt-[120px] pb-[60px]
                   px-4 sm:px-8 lg:px-[120px]"
      >
        {/* Heading */}
        <div className="flex flex-col gap-12 items-center text-center">
          <h2 className="font-inter font-bold leading-none text-black
                         text-[clamp(36px,6.1vw,88px)] whitespace-nowrap">
            Total Care Subscription
          </h2>
          <p className="font-inter font-light text-[16px] text-black
                        text-center tracking-[0.5184px] leading-[28px]
                        max-w-[646px]">
            Totalcare moves at your speed. Immediate support, reliable care,
            and everything coordinated for you - so you spend less time
            worrying and more time living.
          </p>
        </div>

        {/* Plans container */}
        <div className="flex flex-col gap-6 items-center w-full">

          {/* Countdown banner */}
          <div
            className="subscription-section-bg
                       flex gap-3 items-center justify-center flex-wrap
                       px-6 py-6 rounded-[24px]
                       shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                       w-full max-w-[1020px]"
          >
            <span className="font-inter font-light text-[18px] text-[#d82525]
                             tracking-[0.5825px] leading-[28px]">
              Limited 500 Member offer ending in
            </span>
            <span className="font-inter font-bold text-[18px] text-[#d82525]
                             tracking-[0.5825px] leading-[28px]">
              {h}:{m}:{s}
            </span>
          </div>

          {/* Two plan cards */}
          <div className="flex flex-col xl:flex-row gap-6 justify-center w-full max-w-[1020px]">
            {PLANS.map((plan, idx) => (
              <PlanCard
                key={plan.title}
                plan={plan}
                planIndex={idx}
                onBreakdown={setOpenModal}
                onGetStarted={handleGetStarted}
              />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="bg-[rgba(255,255,255,0.8)] rounded-[24px]
                     drop-shadow-[0px_2px_4px_rgba(0,65,114,0.08)]
                     shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                     p-6 flex flex-col gap-4
                     w-full max-w-[1020px]"
        >
          <p className="font-inter font-bold text-[16px] text-black
                        tracking-[0.5184px] leading-[28px]">
            Disclaimer
          </p>
          <p className="font-inter font-medium text-[12px] text-[#808080]
                        tracking-[0.3883px] leading-[20px]">
            Service availability and response times depend on your location
            and partner network. Emergency and concierge support timelines are
            applicable in select serviceable zones.&nbsp; Delivery and
            consultation timelines may vary based on availability and medical
            requirements. All benefits are valid only for the active
            subscription period and are non-transferable.
          </p>
        </div>
      </section>

      <AnimatePresence>
        {openModal !== null && (
          <PriceBreakdownModal
            key="price-modal"
            data={MODAL_DATA[openModal]}
            onClose={() => setOpenModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
