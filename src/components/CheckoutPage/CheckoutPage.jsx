import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Header from '../Header/Header';

/* ── Asset imports ─────────────────────────────────────────────────────── */
import iconAmbulance  from '../../assets/checkout/icon-ambulance.svg';
import iconConcierge  from '../../assets/checkout/icon-concierge.svg';
import iconMedicine   from '../../assets/checkout/icon-medicine.svg';
import iconSpecialist from '../../assets/checkout/icon-specialist.svg';
import deliveryIcon   from '../../assets/checkout/delivery.svg';
import iconCash       from '../../assets/checkout/tabler_cash.svg';
import payVisa        from '../../assets/cart/pay-visa.png';
import payMc          from '../../assets/cart/pay-mc.png';
import payPp          from '../../assets/cart/pay-pp.png';
import payUpi         from '../../assets/cart/pay-upi.png';
import AvailDiscounts from './AvailDiscounts';

/* ═══════════════════════════════════════════════════════════════════════════
   Constants & data
═══════════════════════════════════════════════════════════════════════════ */
const DELIVERY_CHARGE = 49;

/* Feature bullets per device (matched by name substring) */
const DEVICE_FEATURES = {
  bp: {
    heading: 'Captures cardiovascular vital parameters:',
    bullets: [
      'Systolic Blood Pressure',
      'Diastolic Blood Pressure',
      'Pulse Rate',
      'Hypertension indication',
      'Irregular heartbeat detection',
    ],
  },
  scale: {
    heading: 'Measures body composition parameters:',
    bullets: [
      'Body weight and BMI',
      'Body fat percentage',
      'Muscle mass',
      'Bone density estimation',
      'Visceral fat level',
    ],
  },
  glucose: {
    heading: 'Monitors glucose levels with precision:',
    bullets: [
      'Fasting blood glucose',
      'Post-meal glucose measurement',
      'HbA1c trend estimation',
      'Daily glucose patterns',
      'Hypoglycemia and hyperglycemia alerts',
    ],
  },
  cgm: {
    heading: 'Continuous glucose monitoring features:',
    bullets: [
      'Real-time glucose readings every 5 minutes',
      'Day and night glucose trend curves',
      'Automatic hypo/hyperglycemia alerts',
      'Effortless, needle-free wear',
      'Direct sync to Total Care app',
    ],
  },
  default: {
    heading: 'Product features:',
    bullets: [
      'Advanced health monitoring',
      'Clinically validated accuracy',
      'Real-time data sync with Total Care app',
      'Easy-to-use interface',
    ],
  },
};

function getDeviceFeatures(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('omron') || n.includes(' bp') || n.includes('blood pressure')) return DEVICE_FEATURES.bp;
  if (n.includes('scale') || n.includes('meditive') || n.includes('body composition')) return DEVICE_FEATURES.scale;
  if (n.includes('glucobuddy') || n.includes('glucometer') || n.includes('gluco')) return DEVICE_FEATURES.glucose;
  if (n.includes('tracky') || n.includes('cgm')) return DEVICE_FEATURES.cgm;
  return DEVICE_FEATURES.default;
}

const SUBSCRIPTION_BENEFITS = [
  { icon: iconAmbulance,  text: 'Ambulance within 30 minutes' },
  { icon: iconConcierge,  text: 'Medical Concierge within 30 minutes' },
  { icon: iconMedicine,   text: 'Medicine delivery within 3 hours' },
  { icon: iconAmbulance,  text: 'Family doctor call back within 6 hours' },
  { icon: iconSpecialist, text: 'Specialist consultation within 48 hours' },
];

const CHECKOUT_STEPS = [
  'Purchase Summary',
  'User Details & shipping address',
  'Payment',
];

/* ═══════════════════════════════════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════════════════════════════════ */
const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

/* ═══════════════════════════════════════════════════════════════════════════
   Inline SVG icons
═══════════════════════════════════════════════════════════════════════════ */
function StepCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" stroke="#B2B2B2" strokeWidth="1.5" />
      <path d="M7.5 12L10.5 15L16.5 9" stroke="#B2B2B2" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="#004172" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   StepperBar
═══════════════════════════════════════════════════════════════════════════ */
function StepperBar() {
  return (
    <>
      {/* Mobile: compact step indicator */}
      <div className="flex flex-col gap-4 md:hidden w-full">
        <div className="flex items-center gap-4">
          {/* Step circle */}
          <div className="w-[80px] h-[80px] rounded-full border-2 border-[#B2B2B2] flex flex-col items-center justify-center shrink-0">
            <span className="font-inter font-bold text-[28px] text-black leading-none">1</span>
            <span className="font-inter font-medium text-[12px] text-[#B2B2B2] leading-none">/3</span>
          </div>
          {/* Step text */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="font-inter font-bold text-[16px] text-black tracking-[0.26px] leading-[24px]">
              Purchase Summery
            </p>
            <p className="font-inter font-medium text-[12px] text-[#808080] tracking-[0.26px] leading-[20px]">
              Next : User Details &amp; shipping address
            </p>
          </div>
        </div>
        <div className="h-px bg-[#E5E5E5] w-full" />
      </div>

      {/* Desktop: full step bar */}
      <div className="hidden md:flex border-b border-[#E5E5E5] pb-5 w-full items-center justify-center flex-wrap gap-0">
        {CHECKOUT_STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex gap-2 items-center justify-center px-4 py-2 rounded-[12px] shrink-0">
              <StepCheckIcon />
              <span className="font-inter font-medium text-[16px] text-[#808080] tracking-[0.5184px] leading-[28px] whitespace-nowrap">
                {label}
              </span>
            </div>
            {i < CHECKOUT_STEPS.length - 1 && (
              <span className="font-inter font-medium text-[16px] text-[#B2B2B2] tracking-[0.26px] select-none">
                - - - - - - -
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ReviewProductCard  — device item in checkout
═══════════════════════════════════════════════════════════════════════════ */
function ReviewProductCard({ item }) {
  const purpleGradientStyle = {
    backgroundImage: 'linear-gradient(93.16deg, rgb(177, 137, 255) 0%, rgb(46, 0, 139) 96.07%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <div
      className="flex gap-2 items-start p-2 rounded-[20px] w-full bg-white"
      style={{ boxShadow: '0 4px 6px rgba(0,65,114,0.08), inset 0 0 2px rgba(0,65,114,0.16)' }}
    >
      {/* Image */}
      <div className="shrink-0 rounded-[12px] overflow-hidden w-[100px] h-[90px] md:w-[180px] md:h-[150px]">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#F9F9F9]" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-start justify-between self-stretch flex-1 min-w-0 p-1 md:p-2">
        <div className="flex flex-col gap-2 md:gap-4 w-full">
          <p className="font-inter font-medium text-[14px] md:text-[18px] text-black tracking-[0.5825px] leading-[20px] md:leading-[28px] line-clamp-2 w-full">
            {item.name}
          </p>
          <p className="font-inter font-medium text-[11px] md:text-[12px] leading-[18px] md:leading-[20px] tracking-[0.3883px]"
            style={purpleGradientStyle}>
            First 3 months of TotalCare subscription FREE
          </p>
          {item.description && (
            <p className="font-inter font-light text-[12px] md:text-[16px] text-[#808080] tracking-[0.3883px] md:tracking-[0.5184px] leading-[20px] md:leading-[28px] line-clamp-2 w-full">
              {item.description}
            </p>
          )}
        </div>

        {/* Qty + Price row */}
        <div className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center gap-[5px] font-inter font-medium text-[12px] md:text-[16px] tracking-[0.3883px] md:tracking-[0.5184px] leading-[20px] md:leading-[28px]">
            <span className="text-[#CCC]">Quantity</span>
            <span className="text-black">{item.qty}</span>
          </div>
          <div className="flex items-center gap-[4px] md:gap-[5px]">
            {item.originalPrice && item.originalPrice !== item.price && (
              <span className="font-inter font-medium text-[12px] md:text-[16px] text-[#CCC] line-through tracking-[0.3883px] md:tracking-[0.5184px]">
                {fmt(item.originalPrice * item.qty)}
              </span>
            )}
            <span className="font-inter font-medium text-[12px] md:text-[16px] text-black tracking-[0.3883px] md:tracking-[0.5184px] leading-[20px] md:leading-[28px]">
              {fmt((item.price || 0) * item.qty)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SubscriptionProductCard  — subscription item in checkout
═══════════════════════════════════════════════════════════════════════════ */
function SubscriptionProductCard({ item }) {
  const greenGradientStyle = {
    backgroundImage: 'linear-gradient(180deg, #10B981 0%, #00664C 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <div
      className="flex gap-2 items-start p-2 rounded-[20px] w-full bg-white"
      style={{ boxShadow: '0 4px 6px rgba(0,65,114,0.08), inset 0 0 2px rgba(0,65,114,0.16)' }}
    >
      {/* Image */}
      <div className="shrink-0 rounded-[12px] overflow-hidden w-[100px] h-[90px] md:w-[180px] md:h-[150px]">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#F9F9F9]" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-start justify-between self-stretch flex-1 min-w-0 p-1 md:p-2">
        <div className="flex flex-col gap-2 md:gap-4 w-full">
          <p className="font-inter font-medium text-[14px] md:text-[18px] text-black tracking-[0.5825px] leading-[20px] md:leading-[28px] line-clamp-2">
            {item.name}
          </p>
          {item.priceLabel && (
            <p className="font-inter font-medium text-[11px] md:text-[12px] leading-[18px] md:leading-[20px] tracking-[0.3883px]"
              style={greenGradientStyle}>
              {item.priceLabel}
            </p>
          )}
          {item.description && (
            <p className="font-inter font-light text-[12px] md:text-[16px] text-[#808080] tracking-[0.3883px] md:tracking-[0.5184px] leading-[20px] md:leading-[28px] line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        {/* Qty + Price row */}
        <div className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center gap-[5px] font-inter font-medium text-[12px] md:text-[16px] tracking-[0.3883px] md:tracking-[0.5184px] leading-[20px] md:leading-[28px]">
            <span className="text-[#CCC]">Quantity</span>
            <span className="text-black">{item.qty}</span>
          </div>
          <div className="flex items-center gap-[4px] md:gap-[5px]">
            {item.originalPrice && item.originalPrice !== item.price && (
              <span className="font-inter font-medium text-[12px] md:text-[16px] text-[#CCC] line-through tracking-[0.3883px] md:tracking-[0.5184px]">
                {fmt(item.originalPrice * item.qty)}
              </span>
            )}
            <span className="font-inter font-medium text-[12px] md:text-[16px] text-black tracking-[0.3883px] md:tracking-[0.5184px] leading-[20px] md:leading-[28px]">
              {item.price === 0 ? '₹0' : fmt((item.price || 0) * item.qty)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DeliveryCard  — top card in right panel
═══════════════════════════════════════════════════════════════════════════ */
function DeliveryCard() {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] flex gap-3 items-start p-3 w-full">
      <div className="shrink-0"
        style={{ filter: 'drop-shadow(0px 1.333px 5.333px rgba(0,65,114,0.08))' }}>
        <img src={deliveryIcon} alt="" aria-hidden="true" className="w-8 h-8 object-contain" />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p className="font-inter font-medium text-[12px] text-black tracking-[0.3883px] leading-[20px]">
          Delivery
        </p>
        <p className="font-inter font-medium text-[12px] text-[#999] tracking-[0.3883px] leading-[20px]">
          Arrives in 2–4 days
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DiscountsSection  — radio-button discount options
═══════════════════════════════════════════════════════════════════════════ */
function DiscountsSection({ selected, onChange }) {
  const options = [
    { id: 'coupon',    label: 'Coupon',             badge: null },
    { id: 'corporate', label: 'Corporate Discount',  badge: null },
    { id: 'curecoins', label: 'Cure Coins',          badge: '1,000 CC left' },
  ];

  return (
    <div className="border-t border-b border-[#CCC] py-4 w-full">
      <div className="flex flex-col gap-6 px-6">
        <p className="font-inter font-bold text-[18px] text-black tracking-[0.5825px] leading-[28px]">
          Avail Discounts
        </p>
        <div className="flex flex-col gap-6">
          {options.map(opt => (
            <div key={opt.id} className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onChange(opt.id)}
                className="flex items-center gap-4 group"
              >
                {/* Radio visual */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                  selected === opt.id ? 'border-[#004172]' : 'border-[#B2B2B2] group-hover:border-[#808080]'
                }`}>
                  {selected === opt.id && (
                    <div className="w-3 h-3 rounded-full bg-[#004172]" />
                  )}
                </div>
                <span className="font-inter font-medium text-[16px] text-black tracking-[0.5184px] leading-[28px]">
                  {opt.label}
                </span>
              </button>
              {opt.badge && (
                <span className="font-inter font-medium text-[16px] text-[#D29300] tracking-[0.5184px] leading-[28px]">
                  {opt.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PriceBreakdown  — per-item prices → subtotal → delivery → total
═══════════════════════════════════════════════════════════════════════════ */
function PriceBreakdown({ items, discount }) {
  const subtotal         = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0);
  const originalSubtotal = items.reduce((s, i) => s + (i.originalPrice || i.price || 0) * i.qty, 0);
  const discountAmt      = discount ? (discount.discount || discount.coins || 0) : 0;
  const total            = Math.max(0, subtotal + DELIVERY_CHARGE - discountAmt);
  const originalTotal    = originalSubtotal + DELIVERY_CHARGE;

  return (
    <div className="bg-[#F7F5F4] border-t border-b border-[#CCC] w-full px-4 py-4 flex flex-col gap-3">
      {/* Per-item lines */}
      {items.map(item => (
        <div key={item.id} className="flex items-center justify-between gap-2">
          <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px] flex-1 min-w-0 truncate">
            {item.name}
          </p>
          <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px] shrink-0 text-right">
            {item.price === 0 ? '₹0' : fmt((item.price || 0) * item.qty)}
          </p>
        </div>
      ))}

      {/* Divider */}
      <div className="h-px bg-[#CCC] w-full" />

      {/* Subtotal */}
      <div className="flex items-center justify-between gap-2">
        <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px]">Subtotal</p>
        <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px] text-right">{fmt(subtotal)}</p>
      </div>

      {/* Delivery */}
      <div className="flex items-center justify-between gap-2">
        <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px]">Delivery charges</p>
        <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px] text-right">{fmt(DELIVERY_CHARGE)}</p>
      </div>

      {/* Discount line */}
      {discountAmt > 0 && (
        <div className="flex items-center justify-between gap-2">
          <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#10B981] tracking-[0.26px] leading-[20px] md:leading-[24px]">
            Discount {discount.label ? `(${discount.label})` : ''}
          </p>
          <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#10B981] tracking-[0.26px] leading-[20px] md:leading-[24px] text-right">
            -{fmt(discountAmt)}
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-[#CCC] w-full" />

      {/* Estimated Total */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="font-inter font-bold text-[14px] md:text-[16px] text-black tracking-[0.26px] leading-[24px]">Estimated Total</p>
        <div className="flex items-center gap-2 shrink-0">
          {originalTotal !== total && (
            <p className="font-inter font-bold text-[13px] md:text-[16px] text-[#B2B2B2] tracking-[0.26px] line-through">
              {fmt(originalTotal)}
            </p>
          )}
          <p className="font-inter font-bold text-[14px] md:text-[16px] text-black tracking-[0.26px]">
            {fmt(total)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CheckoutPage — main export
═══════════════════════════════════════════════════════════════════════════ */
export default function CheckoutPage() {
  const { cartItems } = useCart();
  const navigate      = useNavigate();
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const devices       = cartItems.filter(i => i.type === 'product');
  const subscriptions = cartItems.filter(i => i.type === 'subscription');

  const subtotal         = cartItems.reduce((s, i) => s + (i.price || 0) * i.qty, 0);
  const originalSubtotal = cartItems.reduce((s, i) => s + (i.originalPrice || i.price || 0) * i.qty, 0);
  const discountAmt      = appliedDiscount ? (appliedDiscount.discount || appliedDiscount.coins || 0) : 0;
  const total            = Math.max(0, subtotal + DELIVERY_CHARGE - discountAmt);
  const originalTotal    = originalSubtotal + DELIVERY_CHARGE;

  const purplePromoStyle = {
    backgroundImage: 'linear-gradient(130.65deg, rgb(177, 137, 255) 0%, rgb(46, 0, 139) 96.07%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />

      <main className="px-4 md:px-8 lg:px-16 xl:px-[120px] py-6 md:py-[60px] flex flex-col gap-6 md:gap-[60px]">

        {/* ── Stepper ─────────────────────────────────────────────── */}
        <StepperBar />

        {/* ── Two-column layout ───────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-start w-full">

          {/* ━━━━━━━━━━━━ LEFT PANEL ━━━━━━━━━━━━ */}
          <div className="bg-transparent md:bg-white flex-1 min-w-0 flex flex-col p-0 md:p-8">

            {/* Review Products section */}
            <div className="flex flex-col gap-4 md:gap-6 p-0 md:p-2">
              <h2 className="font-inter font-bold text-[16px] md:text-[18px] text-[#808080] tracking-[0.5825px] leading-[28px]">
                Review your products
              </h2>

              {devices.length === 0 ? (
                <p className="font-inter font-light text-[16px] text-[#808080] tracking-[0.5184px]">
                  No devices in your cart.
                </p>
              ) : (
                devices.map(device => {
                  const features = getDeviceFeatures(device.name);
                  return (
                    <div key={device.id} className="flex flex-col gap-4 md:gap-6">
                      <ReviewProductCard item={device} />
                      {/* Feature bullet list */}
                      <div className="flex flex-col gap-2 md:gap-3">
                        <p className="font-inter font-medium text-[13px] md:text-[16px] text-black tracking-[0.3883px] md:tracking-[0.5184px] leading-[20px] md:leading-[28px]">
                          {features.heading}
                        </p>
                        <ul className="list-disc pl-5 md:pl-6 flex flex-col gap-0">
                          {features.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              className="font-inter font-light text-[13px] md:text-[16px] text-[#4D4D4D] tracking-[0.3883px] md:tracking-[0.5184px] leading-[20px] md:leading-[28px]"
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Free Subscription section */}
            {subscriptions.length > 0 && (
              <div className="flex flex-col gap-4 md:gap-6 p-0 md:p-2 mt-4 md:mt-6">
                {/* Section header */}
                <div className="flex flex-col gap-2 md:gap-3">
                  <p className="font-inter font-bold text-[16px] md:text-[18px] text-[#808080] tracking-[0.5825px] leading-[28px]">
                    Free 3 months subscription
                  </p>
                  <p
                    className="font-inter font-medium text-[12px] leading-[20px] tracking-[0.3883px]"
                    style={purplePromoStyle}
                  >
                    Get first 3 months of TotalCare subscription FREE with any device purchase.
                  </p>
                </div>

                {/* Subscription item cards */}
                {subscriptions.map(sub => (
                  <SubscriptionProductCard key={sub.id} item={sub} />
                ))}

                {/* Subscription benefits list */}
                <div className="flex flex-col gap-3 md:gap-4">
                  {SUBSCRIPTION_BENEFITS.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <img
                        src={b.icon}
                        alt=""
                        aria-hidden="true"
                        className="w-4 h-4 shrink-0 object-contain"
                      />
                      <p className="font-inter font-light text-[13px] md:text-[16px] text-[#4D4D4D] tracking-[0.3883px] md:tracking-[0.5184px] leading-[20px] md:leading-[28px] flex-1">
                        {b.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ━━━━━━━━━━━━ RIGHT PANEL ━━━━━━━━━━━━ */}
          <div className="bg-transparent md:bg-white flex-1 min-w-0 flex flex-col gap-4 p-0 md:p-8">

            {/* Delivery card */}
            <DeliveryCard />

            {/* Discounts */}
            <AvailDiscounts onDiscountChange={setAppliedDiscount} />

            {/* Price breakdown */}
            <PriceBreakdown items={cartItems} discount={appliedDiscount} />

            {/* Divider */}
            <div className="h-px bg-[#CCC] w-full" />

            {/* Payment icons + grand total + action buttons */}
            <div className="flex flex-col gap-6">

              {/* Icons row + total amount */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                {/* Payment icons */}
                <div className="flex items-center gap-[4px] flex-wrap">
                  <img src={payVisa}  alt="Visa"        style={{ height: '17.6px' }} className="object-contain" />
                  <img src={payMc}    alt="Mastercard"  style={{ height: '18px'   }} className="object-contain" />
                  <img src={payPp}    alt="PayPal"      style={{ height: '18px'   }} className="object-contain" />
                  <img src={payUpi}   alt="UPI"         style={{ height: '18px'   }} className="object-contain" />
                  <img src={iconCash} alt="Cash"        style={{ width: '24px', height: '24px' }} className="object-contain" />
                </div>

                {/* Grand total */}
                <div className="flex items-center gap-[5px] font-inter font-medium tracking-[0.3888px] text-center">
                  {originalTotal !== total && (
                    <span className="font-inter font-medium text-[18px] md:text-[24px] text-[#CCC] line-through">
                      {Number(originalTotal).toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="font-inter font-medium text-[20px] md:text-[24px] text-black">
                    {fmt(total)}
                  </span>
                </div>
              </div>

              {/* Action buttons — stacked on mobile (Continue first, Back below), side-by-side on desktop */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">

                {/* Continue to Payment — primary, full-width on mobile */}
                <button
                  type="button"
                  onClick={() => navigate('/user-details')}
                  className="flex w-full md:flex-1 items-center justify-center gap-2 h-12 py-3 rounded-[12px] relative min-w-0 px-4 hover:brightness-110 transition-all duration-150 order-1 md:order-2"
                  style={{
                    background: '#004172',
                    boxShadow: '0 2px 2px rgba(0,65,114,0.08), inset 0 0 2px rgba(0,65,114,0.08)',
                  }}
                >
                  <span className="font-inter font-medium text-[16px] text-white tracking-[0.26px] whitespace-nowrap leading-[normal]">
                    Continue to Payment
                  </span>
                  <ChevronRightIcon />
                </button>

                {/* Back — ghost on mobile (text link), bordered on desktop */}
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex w-full md:flex-1 items-center justify-center gap-2 h-12 px-4 py-3 rounded-[16px] min-w-0 hover:bg-[#F5F9FF] transition-colors duration-150 order-2 md:order-1"
                  style={{ boxShadow: '0 2px 2px rgba(0,65,114,0.08)' }}
                >
                  <span className="md:hidden">
                    <ChevronLeftIcon />
                  </span>
                  <span className="font-inter font-medium text-[16px] text-[#004172] tracking-[0.26px] whitespace-nowrap leading-[normal]">
                    Back
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
