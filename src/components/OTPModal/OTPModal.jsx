import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─── Icons ────────────────────────────────────────────────────────────────────

// Exact Figma checkmark — used in Verify button (node I2073:16823;3:1805)
const VerifyIcon = () => (
  <svg width="16" height="12" viewBox="0 0 15.8 11.425" fill="none" className="flex-shrink-0">
    <path d="M14.9 0.9L5.275 10.525L0.9 6.15" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Exact Figma checkmark — inner icon inside green square (node I2073:16832;1952:3953)
// Same proportions as VerifyIcon, scaled to fit 36×36 green square
const SuccessTickIcon = () => (
  <svg width="20" height="15" viewBox="0 0 15.8 11.425" fill="none" className="flex-shrink-0">
    <path d="M14.9 0.9L5.275 10.525L0.9 6.15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Exact Figma right-chevron — Continue button (node I2073:16832;1952:3957;3:1807)
const ChevronRightIcon = () => (
  <svg width="8" height="14" viewBox="0 0 6.8 11.8" fill="none" className="flex-shrink-0">
    <path d="M0.9 10.9L5.9 5.9L0.9 0.9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Matches Figma: "OTP sent to ********8978."
function maskPhone(raw) {
  const digits = (raw || '').replace(/\D/g, '');
  if (!digits) return '**********';
  return '*'.repeat(8) + digits.slice(-4);
}

// OTP box Tailwind classes per state
function boxCls(status, value) {
  const base =
    'w-[48px] h-[48px] rounded-[14.4px] border-[1.2px] text-center ' +
    'font-inter font-medium text-[16.8px] tracking-[-0.168px] ' +
    'outline-none transition-all duration-300 ';
  if (status === 'success') return base + 'border-[#34c759] bg-[#e8fff1] text-[#00b82e]';
  if (status === 'error')   return base + 'border-[#EF4444] bg-[#fef2f2] text-[#EF4444]';
  if (value)                return base + 'border-[#004172] text-black bg-white';
  return base + 'border-[#ebebeb] text-[rgba(0,0,0,0.5)] bg-white';
}

// ─── Success card — exact Figma node 2073:16832 ───────────────────────────────

function SuccessCard({ onContinue }) {
  return (
    <div className="fade-slide-in flex flex-col gap-[32px] items-center w-full">

      {/* Icon — Figma: bg-[#e8fff1] p-[12px] rounded-[30px] wrapping 38×36 container */}
      <div className="bg-[#e8fff1] p-[12px] rounded-[30px] flex items-center justify-center flex-shrink-0">
        <div className="relative flex items-center justify-center" style={{ width: '38px', height: '36px' }}>
          {/* Inner green square — Figma: bg-[#34c759] rounded-[3.409px], centered */}
          <div
            className="flex items-center justify-center bg-[#34c759] rounded-[8px]"
            style={{
              width: '36px',
              height: '36px',
              boxShadow: '0px 3px 15px rgba(0,65,114,0.08), inset 0px 0px 3px rgba(0,65,114,0.12)',
            }}
          >
            <SuccessTickIcon />
          </div>
        </div>
      </div>

      {/* Text block — Figma: gap-[16px], text-center */}
      <div className="flex flex-col gap-[16px] items-start text-center leading-[28px] w-full">
        {/* Title — Figma: Inter Bold 18px, #00b82e, tracking 0.5825px */}
        <p className="font-inter font-bold text-[18px] text-[#00b82e] leading-[28px] tracking-[0.5825px] w-full">
          Registration Successful
        </p>
        {/* Description — Figma: Inter Light 16px, black, tracking 0.5184px */}
        <p className="font-inter font-light text-[16px] text-black leading-[28px] tracking-[0.5184px] w-full">
          Now you can access your orders, Appointments, reports, special offers and more
        </p>
      </div>

      {/* Continue button — Figma: bg-[#004172], h-[48px], w-full, rounded-[12px] */}
      <div className="flex flex-col gap-[8px] w-full">
        <button
          type="button"
          onClick={onContinue}
          className="flex items-center justify-center gap-[8px] h-[48px] w-full rounded-[12px] bg-[#004172] font-inter font-medium text-[16px] text-white tracking-[0.2592px] transition-opacity duration-200 hover:opacity-90"
          style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.08)' }}
        >
          Continue
          <ChevronRightIcon />
        </button>
      </div>

    </div>
  );
}

// ─── Main OTPModal ────────────────────────────────────────────────────────────

export default function OTPModal({ phoneNumber = '', onClose, onSuccess }) {
  const [otp, setOtp]             = useState(['', '', '', '', '', '']);
  const [status, setStatus]       = useState(null);   // null | 'success' | 'error'
  const [isShaking, setIsShaking] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const inputRefs = useRef([]);

  // Auto-focus first box on mount
  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  // 45-second resend countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // ── Input handlers ──────────────────────────────────────────────────────────

  const handleInput = useCallback((index, e) => {
    if (status === 'success') return;
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    setOtp(prev => { const n = [...prev]; n[index] = digit; return n; });
    setStatus(null);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  }, [status]);

  const handleKeyDown = useCallback((index, e) => {
    if (status === 'success') return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      setStatus(null);
      setOtp(prev => {
        const n = [...prev];
        if (prev[index]) { n[index] = ''; return n; }
        if (index > 0) { n[index - 1] = ''; inputRefs.current[index - 1]?.focus(); }
        return n;
      });
    }
    if (e.key === 'ArrowLeft'  && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) inputRefs.current[index + 1]?.focus();
  }, [status]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    if (status === 'success') return;
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    setOtp(() => Array.from({ length: 6 }, (_, i) => pasted[i] || ''));
    setStatus(null);
    setTimeout(() => inputRefs.current[Math.min(pasted.length, 5)]?.focus(), 0);
  }, [status]);

  // ── Verify ──────────────────────────────────────────────────────────────────

  const handleVerify = () => {
    const entered = otp.join('');
    if (entered.length < 6) return;
    if (entered === '123456') {
      setStatus('success');
    } else {
      setStatus('error');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  // ── Resend ──────────────────────────────────────────────────────────────────

  const handleResend = () => {
    if (countdown > 0) return;
    setOtp(['', '', '', '', '', '']);
    setStatus(null);
    setCountdown(45);
    setTimeout(() => inputRefs.current[0]?.focus(), 0);
  };

  // ── Continue (after success) ────────────────────────────────────────────────

  const handleContinue = () => {
    if (onSuccess) onSuccess();
    else onClose();
  };

  const allFilled = otp.every(d => d !== '');

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-[48px] p-[32px] w-[540px] max-w-[95vw] relative"
        style={{ boxShadow: '0px 2px 10px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.12)' }}
      >

        {/* ── SUCCESS STATE — full content replacement ── */}
        {status === 'success' ? (
          <SuccessCard onContinue={handleContinue} />
        ) : (

          /* ── OTP FORM STATE ── */
          <div className="flex flex-col gap-[32px]">

            {/* Close button */}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full border border-[#e5e5e5] hover:border-[#cccccc] transition-colors"
              style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08)' }}
            >
              <CloseIcon />
            </button>

            {/* Heading — Figma: Inter Bold 18px + Light 16px, centered */}
            <div className="flex flex-col gap-[16px] items-center text-center w-full">
              <p className="font-inter font-bold text-[18px] text-black leading-[28px] tracking-[0.5825px] w-full">
                Enter OTP
              </p>
              <p className="font-inter font-light text-[16px] text-black leading-[28px] tracking-[0.5184px] w-full">
                OTP sent to {maskPhone(phoneNumber)}.
              </p>
            </div>

            {/* OTP inputs + action buttons */}
            <div className="flex flex-col gap-[8px] w-full">

              {/* 6 boxes — Figma: 48×48px, radius 14.4px, border 1.2px, gap 9.6px */}
              <div className={`flex gap-[9.6px] justify-center${isShaking ? ' otp-shake' : ''}`}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={digit}
                    onChange={(e) => handleInput(i, e)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className={boxCls(status, digit)}
                    aria-label={`OTP digit ${i + 1}`}
                  />
                ))}
              </div>

              {/* Verify button — Figma: h-[48px], bg-[#004172], rounded-[12px], full-width */}
              <button
                type="button"
                onClick={handleVerify}
                disabled={!allFilled}
                className={[
                  'flex items-center justify-center gap-[8px] h-[48px] w-full',
                  'rounded-[12px] bg-[#004172] font-inter font-medium text-[16px] text-white tracking-[0.2592px]',
                  'transition-opacity duration-200',
                  allFilled ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed',
                ].join(' ')}
                style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.08)' }}
              >
                <VerifyIcon />
                Verify OTP
              </button>

              {/* Resend — Figma: h-[48px], rounded-[16px], text-[#4d4d4d], centered */}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0}
                className={[
                  'flex items-center justify-center h-[48px] w-full rounded-[16px]',
                  'font-inter font-medium text-[16px] tracking-[0.2592px] transition-colors duration-200',
                  countdown > 0
                    ? 'text-[#4d4d4d] cursor-default'
                    : 'text-[#004172] hover:text-[#003060] cursor-pointer',
                ].join(' ')}
                style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08)' }}
              >
                {countdown > 0 ? `Resend SMS in ${countdown} sec` : 'Resend OTP'}
              </button>
            </div>

            {/* Error status card — only shown on failed verification */}
            {status === 'error' && (
              <div className="fade-slide-in flex items-start gap-3 px-4 py-3 rounded-[12px] border border-[#EF4444] bg-[#fef2f2]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="flex-shrink-0">
                  <circle cx="11" cy="11" r="11" fill="#EF4444" />
                  <path d="M7.5 7.5l7 7M14.5 7.5l-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col gap-0.5 pt-[1px]">
                  <p className="font-inter font-semibold text-[14px] leading-[20px] text-[#991b1b]">Verification Failed</p>
                  <p className="font-inter font-normal text-[13px] leading-[18px] text-[#dc2626]">Incorrect OTP. Please check and try again.</p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
