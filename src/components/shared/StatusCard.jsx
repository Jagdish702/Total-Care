import React from 'react';

// ── Top-circle icons ──────────────────────────────────────────────────────────

const XIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const ClockRefreshIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

const CreditCardXIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
    <path d="M10 15l4-2M14 15l-4-2" />
  </svg>
);

const WarningIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const TimerRefreshIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M12 7v5l3 1.5" />
  </svg>
);

const SearchIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CheckIcon = ({ color }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4.5 4.5L19 7" />
  </svg>
);

// ── Bottom-row icons ──────────────────────────────────────────────────────────

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const PackageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// ── Variant config ─────────────────────────────────────────────────────────────
// Keys map to the `variant` prop.

const VARIANTS = {
  'payment-failed': {
    circleBg: '#FEE2E2',
    TopIcon:  () => <XIcon color="#EF4444" />,
    title:    'Payment failed',
    subtitle: "Your payment didn't go through.",
    btnLabel: 'Try again',
    btnDisabled: false,
    BottomIcon: CartIcon,
    bottomText: 'Your cart is saved.',
  },
  'payment-in-progress': {
    circleBg: '#FEF3C7',
    TopIcon:  () => <ClockRefreshIcon color="#F59E0B" />,
    title:    'Payment in progress',
    subtitle: "We're confirming your payment.",
    btnLabel: 'Check status',
    btnDisabled: true,
    BottomIcon: BellIcon,
    bottomText: "We'll notify you when it's confirmed.",
  },
  'payment-declined': {
    circleBg: '#FEE2E2',
    TopIcon:  () => <CreditCardXIcon color="#EF4444" />,
    title:    'Payment Declined',
    subtitle: 'Use a different payment method.',
    btnLabel: 'Try Another Method',
    btnDisabled: false,
    BottomIcon: PackageIcon,
    bottomText: 'Your order was not placed.',
  },
  'payment-interrupted': {
    circleBg: '#FEF3C7',
    TopIcon:  () => <WarningIcon color="#F59E0B" />,
    title:    'Payment interrupted',
    subtitle: 'Your payment was not completed.',
    btnLabel: 'Continue Payment',
    btnDisabled: false,
    BottomIcon: BellIcon,
    bottomText: 'Your cart is saved.',
  },
  'confirmation-pending': {
    circleBg: '#FEF3C7',
    TopIcon:  () => <TimerRefreshIcon color="#D97706" />,
    title:    'Confirmation pending',
    subtitle: 'If payment was deducted, it will be refunded automatically.',
    btnLabel: 'Check Status',
    btnDisabled: false,
    BottomIcon: BellIcon,
    bottomText: "We'll update you shortly.",
  },
  'payment-under-review': {
    circleBg: '#DBEAFE',
    TopIcon:  () => <SearchIcon color="#3B82F6" />,
    title:    'Payment under review',
    subtitle: "We're verifying your payment.",
    btnLabel: 'Check Status',
    btnDisabled: false,
    BottomIcon: BellIcon,
    bottomText: "We'll notify you when it's confirmed.",
  },
  'payment-successful': {
    circleBg: '#22C55E',
    TopIcon:  () => <CheckIcon color="#FFFFFF" />,
    title:    'Payment successful',
    subtitle: 'Your order has been placed.',
    btnLabel: 'View Order',
    btnDisabled: false,
    BottomIcon: MailIcon,
    bottomText: 'Confirmation sent to your mail and phone number successfully.',
  },
};

// ── Component ──────────────────────────────────────────────────────────────────
/**
 * StatusCard — Figma-matched payment status modal card.
 *
 * Props:
 *   variant        — one of the 7 keys above (default: 'payment-failed')
 *   onAction       — callback for the primary CTA button
 *   onBottomAction — callback for the bottom info row
 *   className      — extra classes on the wrapper
 */
export default function StatusCard({
  variant = 'payment-failed',
  onAction,
  onBottomAction,
  className = '',
}) {
  const cfg = VARIANTS[variant] ?? VARIANTS['payment-failed'];
  const { TopIcon, BottomIcon } = cfg;

  return (
    <div
      className={[
        'fade-slide-in bg-white rounded-[24px] shadow-[0px_4px_32px_rgba(0,0,0,0.10)]',
        'px-8 pt-8 pb-6 w-full max-w-[440px] mx-auto',
        className,
      ].join(' ')}
    >
      {/* Icon circle */}
      <div
        className="w-[64px] h-[64px] rounded-full flex items-center justify-center mx-auto"
        style={{ backgroundColor: cfg.circleBg }}
      >
        <TopIcon />
      </div>

      {/* Title */}
      <h2 className="mt-5 text-center font-inter font-bold text-[18px] leading-[26px] text-[#111827]">
        {cfg.title}
      </h2>

      {/* Subtitle */}
      <p className="mt-2 text-center font-inter text-[14px] leading-[21px] text-[#6B7280]">
        {cfg.subtitle}
      </p>

      {/* CTA button */}
      <button
        onClick={!cfg.btnDisabled ? onAction : undefined}
        disabled={cfg.btnDisabled}
        className={[
          'mt-6 w-full h-[50px] rounded-[12px] font-inter font-semibold text-[16px] transition-colors',
          cfg.btnDisabled
            ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
            : 'bg-[#004172] text-white hover:bg-[#00325a]',
        ].join(' ')}
      >
        {cfg.btnLabel}
      </button>

      {/* Divider */}
      <div className="mt-6 h-px bg-[#E5E7EB]" />

      {/* Bottom info row */}
      <button
        onClick={onBottomAction}
        className="mt-4 w-full flex items-center gap-3 text-left"
      >
        <div className="w-9 h-9 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
          <BottomIcon />
        </div>
        <span className="flex-1 font-inter text-[13px] leading-[18px] text-[#374151]">
          {cfg.bottomText}
        </span>
        <ChevronRightIcon />
      </button>
    </div>
  );
}
