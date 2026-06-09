import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Header       from '../Header/Header';
import AvailDiscounts from '../CheckoutPage/AvailDiscounts';

/* ── Assets ──────────────────────────────────────────────────────────────── */
import stepDone   from '../../assets/user-details/step-done.svg';
import stepIdle   from '../../assets/user-details/step-idle.svg';
import iconCash   from '../../assets/checkout/tabler_cash.svg';
import iconAlert  from '../../assets/payment/icon-alert.svg';
import iconPkg    from '../../assets/payment/icon-package.svg';
import payVisa    from '../../assets/payment/pay-visa.png';
import payMc      from '../../assets/payment/pay-mc.png';
import payPaypal  from '../../assets/payment/pay-paypal.png';
import payUpi     from '../../assets/payment/pay-upi.png';
import payUpiApps from '../../assets/payment/pay-upi-apps.png';
import payNetbank from '../../assets/payment/pay-netbanking.png';

/* ─────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────── */
const DELIVERY_CHARGE = 49;
const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

/* ─────────────────────────────────────────────────────────────────────────
   Payment-mode data
───────────────────────────────────────────────────────────────────────── */
const PAYMENT_OPTIONS = [
  { id: 'all',        label: 'Pay via Debit/Credit/Netbanking/UPI', icons: 'standard'   },
  { id: 'debit',      label: 'Pay via Debit Card',                  icons: 'debit'      },
  { id: 'credit',     label: 'Pay via Credit Card',                 icons: 'debit'      },
  { id: 'upi',        label: 'Pay via UPI',                         icons: 'upi_apps'   },
  { id: 'wallet',     label: 'Pay via E-Wallet',                    icons: 'standard'   },
  { id: 'netbanking', label: 'Pay via Netbanking',                  icons: 'netbanking' },
  {
    id: 'cod',
    label:    'Cash on delivery',
    subLabel: 'Not available for subscription orders',
    icons:    'cash',
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Stepper helpers  (identical pattern to UserDetailsPage / CheckoutPage)
───────────────────────────────────────────────────────────────────────── */
function StepIcon({ src }) {
  return (
    <div className="relative shrink-0" style={{ width: 24, height: 24, overflow: 'visible' }}>
      <div style={{ position: 'absolute', inset: '-58.33% -66.67% -75% -66.67%' }}>
        <img alt="" src={src} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
      </div>
    </div>
  );
}

function StepperBar() {
  return (
    <>
      {/* Mobile: compact step 3 indicator with 2/3 green arc */}
      <div className="flex flex-col gap-4 md:hidden w-full">
        <div className="flex items-center gap-4">
          {/* Progress circle — 2 of 3 steps done (240° arc) */}
          <div className="relative w-[80px] h-[80px] shrink-0 flex items-center justify-center">
            <svg className="absolute inset-0" width="80" height="80" viewBox="0 0 80 80" fill="none">
              {/* Gray base ring */}
              <circle cx="40" cy="40" r="37" stroke="#E5E5E5" strokeWidth="2" />
              {/* Green arc — 2/3 of circle (240°), large-arc-flag=1 */}
              <path
                d="M40 3 A37 37 0 1 1 8 58.5"
                stroke="#00B82E"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="flex flex-col items-center leading-none">
              <span className="font-inter font-bold text-[28px] text-black leading-[1]">3</span>
              <span className="font-inter font-medium text-[12px] text-[#B2B2B2] leading-[1]">/3</span>
            </div>
          </div>
          {/* Step text */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="font-inter font-bold text-[16px] text-black tracking-[0.26px] leading-[24px]">
              Payment
            </p>
          </div>
        </div>
        <div className="h-px bg-[#E5E5E5] w-full" />
      </div>

      {/* Desktop: full step bar */}
      <div className="hidden md:flex border-b border-[#e5e5e5] pb-[20px] w-full gap-0 items-center justify-center flex-wrap">
        {/* Step 1 — done (green) */}
        <div className="flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0">
          <StepIcon src={stepDone} />
          <p className="font-inter font-medium leading-[28px] text-[#00b82e] text-[16px] tracking-[0.5184px] whitespace-nowrap">
            Purchase Summary
          </p>
        </div>
        <p className="font-inter font-medium text-[#00b82e] text-[16px] tracking-[0.2592px] whitespace-nowrap select-none">
          - - - - - - -
        </p>
        {/* Step 2 — done (green) */}
        <div className="flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0">
          <StepIcon src={stepDone} />
          <p className="font-inter font-medium leading-[28px] text-[#00b82e] text-[16px] tracking-[0.5184px] whitespace-nowrap">
            User Details &amp; shipping address
          </p>
        </div>
        <p className="font-inter font-medium text-[#b2b2b2] text-[16px] tracking-[0.2592px] whitespace-nowrap select-none">
          - - - - - - -
        </p>
        {/* Step 3 — current (gray) */}
        <div className="flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0">
          <StepIcon src={stepIdle} />
          <p className="font-inter font-medium leading-[28px] text-[#808080] text-[16px] tracking-[0.5184px] whitespace-nowrap">
            Payment
          </p>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Radio circle  (green gradient when selected, gray ring when idle)
───────────────────────────────────────────────────────────────────────── */
function RadioCircle({ selected }) {
  return selected ? (
    <div
      className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center"
      style={{ borderColor: '#10B981' }}
    >
      <div
        className="w-[10px] h-[10px] rounded-full"
        style={{ background: 'linear-gradient(180deg, #10B981 0%, #00664C 100%)' }}
      />
    </div>
  ) : (
    <div className="shrink-0 w-5 h-5 rounded-full border-2 border-[#B2B2B2]" />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Payment logos per option type
───────────────────────────────────────────────────────────────────────── */
function PaymentLogos({ type }) {
  if (type === 'standard') {
    return (
      <div className="flex items-center gap-[4px] flex-wrap shrink-0">
        <img src={payVisa}   alt="Visa"       style={{ height: '17.6px' }} className="object-contain" />
        <img src={payMc}     alt="Mastercard" style={{ height: '18px'  }} className="object-contain" />
        <img src={payPaypal} alt="PayPal"     style={{ height: '18px'  }} className="object-contain" />
        <img src={payUpi}    alt="UPI"        style={{ height: '18px'  }} className="object-contain" />
      </div>
    );
  }
  if (type === 'debit') {
    return (
      <div className="flex items-center gap-[4px] flex-wrap shrink-0">
        <img src={payVisa}   alt="Visa"       style={{ height: '17.6px' }} className="object-contain" />
        <img src={payMc}     alt="Mastercard" style={{ height: '18px'  }} className="object-contain" />
        <img src={payPaypal} alt="PayPal"     style={{ height: '18px'  }} className="object-contain" />
      </div>
    );
  }
  if (type === 'upi_apps') {
    return (
      <img
        src={payUpiApps}
        alt="GPay, PhonePe, Paytm, BHIM"
        style={{ width: '145px', height: '28px', objectFit: 'contain' }}
        className="shrink-0"
      />
    );
  }
  if (type === 'netbanking') {
    return (
      <img src={payNetbank} alt="Net Banking" style={{ height: '16px' }} className="object-contain shrink-0" />
    );
  }
  if (type === 'cash') {
    return (
      <img src={iconCash} alt="Cash" style={{ width: '24px', height: '24px' }} className="object-contain shrink-0" />
    );
  }
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────
   Chevron right — white, for Complete Order button
───────────────────────────────────────────────────────────────────────── */
function ChevronRightIcon() {
  return (
    <svg
      width="7" height="12"
      viewBox="0 0 5.001 10.001"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M0.9 9.1L4.1 5L0.9 0.9"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Price breakdown  (mirrors CheckoutPage's PriceBreakdown)
───────────────────────────────────────────────────────────────────────── */
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

      <div className="h-px bg-[#CCC] w-full" />

      <div className="flex items-center justify-between gap-2">
        <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px]">Subtotal</p>
        <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px] text-right">{fmt(subtotal)}</p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px]">Delivery charges</p>
        <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#808080] tracking-[0.26px] leading-[20px] md:leading-[24px] text-right">{fmt(DELIVERY_CHARGE)}</p>
      </div>

      {discountAmt > 0 && (
        <div className="flex items-center justify-between gap-2">
          <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#10B981] tracking-[0.26px] leading-[20px] md:leading-[24px]">
            Discount{discount.label ? ` (${discount.label})` : ''}
          </p>
          <p className="font-inter font-medium text-[13px] md:text-[16px] text-[#10B981] tracking-[0.26px] leading-[20px] md:leading-[24px] text-right">
            -{fmt(discountAmt)}
          </p>
        </div>
      )}

      <div className="h-px bg-[#CCC] w-full" />

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

/* ══════════════════════════════════════════════════════════════════════════
   PaymentPage — main export
══════════════════════════════════════════════════════════════════════════ */
export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  /* Form data passed from UserDetailsPage via router state */
  const { phone = '', address = '', firstName = '', lastName = '' } = location.state || {};
  const displayName  = [firstName, lastName].filter(Boolean).join(' ') || 'Guest';
  const displayPhone = phone ? `+91 ${phone}` : '';

  /* Totals (mirrors CheckoutPage) */
  const subtotal      = cartItems.reduce((s, i) => s + (i.price || 0) * i.qty, 0);
  const origSubtotal  = cartItems.reduce((s, i) => s + (i.originalPrice || i.price || 0) * i.qty, 0);
  const discountAmt   = appliedDiscount ? (appliedDiscount.discount || appliedDiscount.coins || 0) : 0;
  const total         = Math.max(0, subtotal + DELIVERY_CHARGE - discountAmt);
  const originalTotal = origSubtotal + DELIVERY_CHARGE;

  return (
    <div className="bg-[#f9f9f9] min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col gap-6 md:gap-[60px] items-center px-4 md:px-8 xl:px-[120px] py-6 md:py-[60px]">

        {/* ── Stepper ───────────────────────────────────────────────── */}
        <StepperBar />

        {/* ── Two-column layout ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-start w-full">

          {/* ━━━━━━━━━━━━ LEFT PANEL ━━━━━━━━━━━━ */}
          <div className="flex flex-col gap-[24px] flex-1 min-w-0">

            {/* ── Contact & Shipping card ─────────────────────────── */}
            <div
              className="bg-white rounded-[16px] p-4 md:p-[32px] flex flex-col gap-3 md:gap-[16px] w-full"
              style={{ boxShadow: '0px 2px 16px rgba(0,0,0,0.06)' }}
            >
              {/* Change button — top-right on mobile */}
              <div className="flex justify-end md:hidden">
                <button
                  type="button"
                  onClick={() => navigate('/user-details')}
                  className="font-inter font-medium text-[14px] text-[#004172] tracking-[0.2592px] leading-[24px] hover:opacity-70 transition-opacity"
                >
                  Change
                </button>
              </div>

              {/* Contact — stacked on mobile, side-by-side on desktop */}
              <div className="flex flex-col md:flex-row md:items-center md:gap-[16px]">
                <p className="font-inter font-bold text-[15px] md:text-[18px] text-black tracking-[0.5825px] leading-[24px] md:leading-[28px] md:shrink-0 md:w-[160px]">
                  Contact
                </p>
                <p className="font-inter font-light text-[13px] md:text-[16px] text-[#4d4d4d] tracking-[0.5184px] leading-[22px] md:leading-[28px] flex-1 min-w-0 mt-1 md:mt-0">
                  {displayName}{displayPhone ? `, ${displayPhone}` : ''}
                </p>
                {/* Change button — inline on desktop only */}
                <button
                  type="button"
                  onClick={() => navigate('/user-details')}
                  className="hidden md:block font-inter font-medium text-[16px] text-[#004172] tracking-[0.2592px] leading-[28px] shrink-0 hover:opacity-70 transition-opacity"
                >
                  Change
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e5e5e5] w-full" />

              {/* Shipping — stacked on mobile, side-by-side on desktop */}
              <div className="flex flex-col md:flex-row md:items-start md:gap-[16px]">
                <p className="font-inter font-bold text-[15px] md:text-[18px] text-black tracking-[0.5825px] leading-[24px] md:leading-[28px] md:shrink-0 md:w-[160px]">
                  Shipping Address
                </p>
                <p className="font-inter font-light text-[13px] md:text-[16px] text-[#4d4d4d] tracking-[0.5184px] leading-[22px] md:leading-[28px] flex-1 min-w-0 break-words mt-1 md:mt-0">
                  {address || '—'}
                </p>
              </div>

              {/* Note */}
              <p className="font-inter font-medium text-[11px] md:text-[12px] text-[#999999] tracking-[0.3883px] leading-[18px] md:leading-[20px]">
                Address cannot be changed after dispatch
              </p>
            </div>

            {/* ── Payment Mode heading ─────────────────────────────── */}
            <p className="font-inter font-bold text-[16px] md:text-[18px] text-[#808080] tracking-[0.5825px] leading-[28px]">
              Payment Mode
            </p>

            {/* ── Payment options card ─────────────────────────────── */}
            <div
              className="bg-white rounded-[16px] p-4 md:p-[32px] flex flex-col w-full"
              style={{ boxShadow: '0px 2px 16px rgba(0,0,0,0.06)' }}
            >
              {PAYMENT_OPTIONS.map((opt, idx) => (
                <React.Fragment key={opt.id}>
                  {idx > 0 && <div className="h-px bg-[#ebebeb] w-full my-3 md:my-[16px]" />}

                  <button
                    type="button"
                    onClick={() => setSelectedPayment(opt.id)}
                    className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-[12px] w-full text-left"
                  >
                    {/* Radio + label row */}
                    <div className="flex items-center gap-[12px] min-w-0 flex-1">
                      <RadioCircle selected={selectedPayment === opt.id} />
                      <div className="flex flex-col min-w-0">
                        <span className="font-inter font-medium text-[14px] md:text-[16px] text-black tracking-[0.5184px] leading-[22px] md:leading-[28px]">
                          {opt.label}
                        </span>
                        {opt.subLabel && (
                          <span className="font-inter font-light text-[12px] text-[#808080] tracking-[0.3883px] leading-[18px] md:leading-[20px]">
                            {opt.subLabel}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Payment logos — left-aligned on mobile, right on desktop */}
                    <div className="pl-8 md:pl-0">
                      <PaymentLogos type={opt.icons} />
                    </div>
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* ── Disclaimer card ──────────────────────────────────── */}
            <div className="bg-white border border-[#e5e5e5] rounded-[12px] p-3 md:p-[12px] flex items-start gap-3 md:gap-[12px] w-full">
              <div className="shrink-0" style={{ width: 16, height: 16, marginTop: 2 }}>
                <img
                  src={iconAlert}
                  alt=""
                  aria-hidden="true"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                <p className="font-inter font-bold text-[13px] md:text-[14px] text-black tracking-[0.4535px] leading-[20px] md:leading-[22px]">
                  No duplicate charges
                </p>
                <p className="font-inter font-light text-[11px] md:text-[12px] text-[#999999] tracking-[0.3883px] leading-[18px] md:leading-[20px]">
                  Fraud held payments are reviewed within 24 hrs — contact support@curebay.com
                </p>
              </div>
            </div>

          </div>{/* /left panel */}

          {/* ━━━━━━━━━━━━ RIGHT PANEL ━━━━━━━━━━━━ */}
          <div
            className="bg-transparent md:bg-white md:rounded-[16px] flex flex-col flex-1 min-w-0 lg:max-w-[480px] xl:max-w-[540px] md:overflow-hidden md:shadow-[0px_2px_16px_rgba(0,0,0,0.06)]"
          >
            {/* Top padded content */}
            <div className="flex flex-col gap-4 md:gap-[16px] pt-0 px-0 pb-0 md:pt-[32px] md:px-[32px] md:pb-[16px]">

              {/* Delivery info card */}
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] flex gap-3 items-start p-3 w-full">
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{ width: 32, height: 32, filter: 'drop-shadow(0px 1.333px 5.333px rgba(0,65,114,0.08))' }}
                >
                  <img src={iconPkg} alt="" aria-hidden="true" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <p className="font-inter font-medium text-[12px] text-black tracking-[0.3883px] leading-[20px]">
                    Delivery
                  </p>
                  <p className="font-inter font-light text-[12px] text-[#808080] tracking-[0.3883px] leading-[20px]">
                    Arrives in 2–4 days
                  </p>
                </div>
              </div>

              {/* Avail Discounts */}
              <AvailDiscounts onDiscountChange={setAppliedDiscount} />

              {/* Price Breakdown */}
              <PriceBreakdown items={cartItems} discount={appliedDiscount} />

            </div>{/* /top padded content */}

            {/* Divider */}
            <div className="h-px bg-[#CCC] w-full my-4 md:my-0" />

            {/* Footer: logos + total + Complete Order */}
            <div className="flex flex-col gap-4 md:gap-[16px] px-0 md:px-[32px] pt-0 md:pt-[16px] pb-4 md:pb-[32px]">

              {/* Payment logos + grand total */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-[4px] flex-wrap">
                  <img src={payVisa}   alt="Visa"        style={{ height: '17.6px' }} className="object-contain" />
                  <img src={payMc}     alt="Mastercard"  style={{ height: '18px'   }} className="object-contain" />
                  <img src={payPaypal} alt="PayPal"      style={{ height: '18px'   }} className="object-contain" />
                  <img src={payUpi}    alt="UPI"         style={{ height: '18px'   }} className="object-contain" />
                  <img src={iconCash}  alt="Cash"        style={{ width: '24px', height: '24px' }} className="object-contain" />
                </div>
                <div className="flex items-center gap-[5px]">
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

              {/* Complete Order button — full width on both mobile and desktop */}
              <button
                type="button"
                className="flex items-center justify-center gap-[8px] h-[48px] w-full rounded-[12px] relative hover:brightness-110 active:scale-[0.98] transition-all"
                style={{
                  background: '#004172',
                  boxShadow: '0px 2px 2px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.08)',
                }}
              >
                <span className="font-inter font-medium text-[16px] text-white tracking-[0.2592px] whitespace-nowrap leading-normal">
                  Complete Order
                </span>
                <ChevronRightIcon />
              </button>

            </div>{/* /footer */}

          </div>{/* /right panel */}

        </div>{/* /two-col layout */}
      </main>
    </div>
  );
}
