import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

/* ── Assets ──────────────────────────────────────────────────────────────── */
import stepDone  from '../../assets/user-details/step-done.svg';
import stepIdle  from '../../assets/user-details/step-idle.svg';
import indiaFlag from '../../assets/user-details/india-flag.png';
import iconWarn  from '../../assets/checkout/icon-close-error.svg';

/*
  SVG inline helpers — path data taken directly from the downloaded assets:
  • chevron-down-sm.svg  → viewBox 0 0 11.6667 6.66667  (gray #999, input fields)
  • chevron-right.svg    → viewBox 0 0 39 44, path M16.9 24.9 L21.9 19.9 L16.9 14.9 (white, continue btn)
  We render them inline so the exact Figma stroke / linecap / join are preserved
  and the dimensions are 1:1 to the viewBox — no clipping issues.
*/

/* ── Gray chevron V — matches chevron-down-sm.svg exactly ─────────────────── */
function ChevronDownIcon() {
  return (
    <svg
      width="12" height="7"
      viewBox="0 0 11.6667 6.66667"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M0.833333 0.833333L5.83333 5.83333L10.8333 0.833333"
        stroke="#999999"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Tiny gray chevron for phone country-code — same path, smaller render ── */
function ChevronDownSmIcon() {
  return (
    <svg
      width="10" height="6"
      viewBox="0 0 11.6667 6.66667"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M0.833333 0.833333L5.83333 5.83333L10.8333 0.833333"
        stroke="#999999"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── White right chevron — path extracted from chevron-right.svg ─────────── */
function ChevronRightIcon() {
  /*
    Original file: viewBox 0 0 39 44
    Path: M16.8984 24.9 L21.8984 19.9 L16.8984 14.9
    Translated to 0-origin (subtract min x=16.8984, min y=14.9):
      M0 10 L5 5 L0 0  →  viewBox 0 0 5.001 10.001
    strokeWidth 1.8, white, same linecap/join as source SVG
  */
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

/* ══════════════════════════════════════════════════════════════════════════
   Stepper icon — Figma 56×56 SVG rendered in a 24×24 visible window.
   The SVG circle is drawn from (16,14)→(40,38) = 24px circle centred at
   (28,26). Negative insets push the 56×56 SVG so that centre (28,26)
   aligns with the 24×24 container centre (12,12).
══════════════════════════════════════════════════════════════════════════ */
function StepIcon({ src }) {
  return (
    <div className="relative shrink-0" style={{ width: 24, height: 24, overflow: 'visible' }}>
      <div style={{ position: 'absolute', inset: '-58.33% -66.67% -75% -66.67%' }}>
        <img alt="" src={src} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
      </div>
    </div>
  );
}

/* ── Stepper bar — mobile compact + desktop full ─────────────────────────── */
function StepperBar() {
  return (
    <>
      {/* Mobile: compact step 2 indicator with progress arc */}
      <div className="flex flex-col gap-4 md:hidden w-full">
        <div className="flex items-center gap-4">
          {/* Progress circle — 1 of 3 steps done */}
          <div className="relative w-[80px] h-[80px] shrink-0 flex items-center justify-center">
            <svg className="absolute inset-0" width="80" height="80" viewBox="0 0 80 80" fill="none">
              {/* Gray base ring */}
              <circle cx="40" cy="40" r="37" stroke="#E5E5E5" strokeWidth="2" />
              {/* Green arc — 1/3 of circle completed (120°), starting from top */}
              <path
                d="M40 3 A37 37 0 0 1 72 58.5"
                stroke="#00B82E"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="flex flex-col items-center leading-none">
              <span className="font-inter font-bold text-[28px] text-black leading-[1]">2</span>
              <span className="font-inter font-medium text-[12px] text-[#B2B2B2] leading-[1]">/3</span>
            </div>
          </div>
          {/* Step text */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="font-inter font-bold text-[16px] text-black tracking-[0.26px] leading-[24px]">
              User Details &amp; shipping address
            </p>
            <p className="font-inter font-medium text-[12px] text-[#808080] tracking-[0.26px] leading-[20px]">
              Next : Payment
            </p>
          </div>
        </div>
        <div className="h-px bg-[#E5E5E5] w-full" />
      </div>

      {/* Desktop: full step bar */}
      <div className="hidden md:flex border-b border-[#e5e5e5] pb-[20px] w-full gap-0 items-center justify-center flex-wrap">

        {/* Step 1 — completed → green */}
        <div className="flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0">
          <StepIcon src={stepDone} />
          <p className="font-inter font-medium leading-[28px] text-[#00b82e] text-[16px] tracking-[0.5184px] whitespace-nowrap">
            Purchase Summary
          </p>
        </div>
        <p className="font-inter font-medium text-[#00b82e] text-[16px] tracking-[0.2592px] whitespace-nowrap select-none">
          - - - - - - -
        </p>

        {/* Step 2 — current → gray */}
        <div className="flex gap-[8px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0">
          <StepIcon src={stepIdle} />
          <p className="font-inter font-medium leading-[28px] text-[#808080] text-[16px] tracking-[0.5184px] whitespace-nowrap">
            User Details &amp; shipping address
          </p>
        </div>
        <p className="font-inter font-medium text-[#b2b2b2] text-[16px] tracking-[0.2592px] whitespace-nowrap select-none">
          - - - - - - -
        </p>

        {/* Step 3 — future → gray */}
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

/* ══════════════════════════════════════════════════════════════════════════
   Pin code — validates 6-digit Indian pin code on blur
══════════════════════════════════════════════════════════════════════════ */
function PinCodeInput({ value, onChange }) {
  const [touched, setTouched] = useState(false);
  const isValid  = /^[1-9][0-9]{5}$/.test(value);
  const hasError = touched && value.length > 0 && !isValid;

  return (
    <div className="flex flex-1 flex-col gap-[12px] items-start" style={{ minWidth: 0 }}>
      <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full text-left">
        Pin code*
      </p>
      <div
        className="bg-white flex h-[44px] items-center px-[16px] py-[8px] relative rounded-[12px] w-full"
        style={{ border: hasError ? '0.81px solid #ff9191' : '0.81px solid #ebebeb' }}
      >
        <input
          type="text"
          inputMode="numeric"
          placeholder="Eg. 450001"
          maxLength={6}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ''))}
          onBlur={() => setTouched(true)}
          className="flex-1 font-inter font-medium leading-[28px] min-w-0 text-[#595959] text-[16px] tracking-[0.5184px] placeholder:text-[#ccc] bg-transparent outline-none"
          style={{ paddingRight: hasError ? 28 : 0 }}
        />
        {hasError && (
          <div className="absolute right-[12px] top-1/2 -translate-y-1/2" style={{ width: 18, height: 18 }}>
            <img src={iconWarn} alt="error" className="absolute inset-0 size-full object-contain" />
          </div>
        )}
      </div>
      {hasError && (
        <p className="font-inter text-[11px] text-[#ff4b4b]">Enter a valid 6-digit pin code</p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Main page
══════════════════════════════════════════════════════════════════════════ */
export default function UserDetailsPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '', lastName:  '', email:     '', phone:     '',
    address:   '', delivery:  '', state:     '', city:      '', pinCode:   '',
  });

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  /* Shared input box — h-[44px], border, rounded-[12px] */
  const inputCls = 'flex-1 font-inter font-medium leading-[28px] min-w-0 text-[#595959] text-[16px] tracking-[0.5184px] placeholder:text-[#ccc] bg-transparent outline-none';
  const boxCls   = 'bg-white border-[#ebebeb] border-[0.81px] border-solid flex h-[44px] items-center px-[16px] py-[8px] relative rounded-[12px] w-full';

  return (
    <div className="bg-[#f9f9f9] min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-col gap-6 md:gap-[60px] items-center px-4 md:px-8 xl:px-[120px] py-6 md:py-[60px]">

        {/* Stepper */}
        <StepperBar />

        {/* Content */}
        <div className="flex flex-col gap-[24px] items-start w-full max-w-[1000px]">

          {/* Already have an account? */}
          <div className="flex gap-[8px] md:gap-[12px] items-center flex-wrap">
            <p className="font-inter font-medium leading-[24px] text-[#4d4d4d] text-[14px] md:text-[16px] tracking-[0.5184px]">
              Already have an account?
            </p>
            <button type="button" className="drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)] hover:opacity-80 transition-opacity">
              <p className="font-inter font-medium leading-normal text-[#004172] text-[14px] md:text-[16px] tracking-[0.2592px] whitespace-nowrap">
                Log in / Sign up
              </p>
            </button>
          </div>

          {/* ── Form card ─────────────────────────────────────────────────── */}
          <div className="bg-white p-4 md:p-[32px] w-full rounded-[16px] shadow-[0px_2px_16px_rgba(0,0,0,0.06)] grid grid-cols-1 md:grid-cols-2 gap-x-[24px] gap-y-[20px] md:gap-y-[24px]">

            {/* Row 1 — First Name | Last Name */}
            <div className="flex flex-col gap-[12px] items-start">
              <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full">First Name</p>
              <div className={boxCls}>
                <input type="text" placeholder="E.g. Emily" value={form.firstName} onChange={set('firstName')} className={inputCls} />
                <ChevronDownIcon />
              </div>
            </div>

            <div className="flex flex-col gap-[12px] items-start">
              <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full">Last Name</p>
              <div className={boxCls}>
                <input type="text" placeholder="E.g. Smith" value={form.lastName} onChange={set('lastName')} className={inputCls} />
                <ChevronDownIcon />
              </div>
            </div>

            {/* Row 2 — Email | Phone */}
            <div className="flex flex-col gap-[12px] items-start">
              <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full">Email</p>
              <div className={boxCls}>
                <input type="email" placeholder="E.g. abc@gmail.com" value={form.email} onChange={set('email')} className={inputCls} />
                <ChevronDownIcon />
              </div>
              <p className="font-inter font-medium leading-[20px] text-[#808080] text-[12px] tracking-[0.3883px] w-full">
                Membership will be activated on this email
              </p>
            </div>

            {/* Phone — h-[44px] fixed on both halves */}
            <div className="flex flex-col gap-[12px] items-start">
              <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full">Phone No</p>
              <div className="flex items-stretch w-full h-[44px]">

                {/* Country code */}
                <div className="border-[#ebebeb] border-[1.62px] border-solid drop-shadow-[0px_2px_1px_rgba(0,65,114,0.08)] flex gap-[8px] items-center px-[16px] relative rounded-bl-[12px] rounded-tl-[12px] shrink-0 bg-white">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
                  {/* India flag: 17.778 × 12 px (exact Figma dimensions) */}
                  <div className="relative shrink-0" style={{ width: 17.778, height: 12 }}>
                    <img alt="India" className="absolute inset-0 max-w-none object-cover size-full" src={indiaFlag} />
                  </div>
                  <p className="font-inter font-medium leading-normal text-[#595959] text-[16px] tracking-[0.2592px] whitespace-nowrap">+91</p>
                  <ChevronDownSmIcon />
                </div>

                {/* Phone number */}
                <div className="border-[#ebebeb] border-b-[1.62px] border-r-[1.62px] border-t-[1.62px] border-solid drop-shadow-[0px_2px_1px_rgba(0,65,114,0.08)] flex flex-1 items-center min-w-0 px-[16px] relative rounded-br-[12px] rounded-tr-[12px] bg-white">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
                  <input
                    type="tel" inputMode="numeric" maxLength={10}
                    placeholder="E.g. 98XXXXXXXX"
                    value={form.phone} onChange={set('phone')}
                    className="flex-1 font-inter font-medium leading-normal min-w-0 text-[#595959] text-[16px] tracking-[0.2592px] placeholder:text-[#ccc] bg-transparent outline-none"
                  />
                </div>

              </div>
            </div>

            {/* Row 3 — Address 1 (full width) */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-[12px] items-start">
              <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full">Address 1</p>
              <div className={boxCls}>
                <input type="text" placeholder="E.g. 123 Main Street" value={form.address} onChange={set('address')} className={inputCls} />
                <ChevronDownIcon />
              </div>
              <p className="font-inter font-medium leading-[20px] text-[#808080] text-[12px] tracking-[0.3883px] w-full">
                Address cannot be changed after dispatch
              </p>
            </div>

            {/* Row 4 — Delivery Instructions */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-[12px] items-start">
              <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full">
                Delivery Instructions (Optional)
              </p>
              <div className={boxCls}>
                <input
                  type="text"
                  placeholder="E.g. Leave at door, call before delivery"
                  value={form.delivery} onChange={set('delivery')}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Row 5 — Country | State (2-col) then City | Pin (2-col) */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4 md:gap-[24px] items-start">

              {/* Country / Region */}
              <div className="flex flex-col gap-[12px] items-start">
                <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full">Country/Region</p>
                <div className={boxCls}>
                  <p className="flex-1 font-inter font-medium leading-[28px] min-w-0 text-[#595959] text-[14px] md:text-[16px] tracking-[0.5184px] truncate">India</p>
                  <ChevronDownIcon />
                </div>
              </div>

              {/* State */}
              <div className="flex flex-col gap-[12px] items-start">
                <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full">State*</p>
                <div className={boxCls}>
                  <input type="text" placeholder="E.g. Mahara..." value={form.state} onChange={set('state')}
                    className={`${inputCls} text-[14px] md:text-[16px] overflow-hidden text-ellipsis whitespace-nowrap`} />
                  <ChevronDownIcon />
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col gap-[12px] items-start">
                <p className="font-inter font-medium leading-normal text-[14px] md:text-[16px] text-black tracking-[0.2592px] w-full">City*</p>
                <div className={boxCls}>
                  <input type="text" placeholder="E.g. Mumbai" value={form.city} onChange={set('city')}
                    className={`${inputCls} text-[14px] md:text-[16px]`} />
                  <ChevronDownIcon />
                </div>
              </div>

              {/* Pin code — with validation */}
              <PinCodeInput
                value={form.pinCode}
                onChange={(v) => setForm((p) => ({ ...p, pinCode: v }))}
              />

            </div>

            {/* Row 6 — Continue button: full width on mobile, right-aligned on desktop */}
            <div className="col-span-1 md:col-start-2 md:col-span-1 flex md:justify-end">
              <button
                type="button"
                onClick={() => navigate('/payment', { state: { phone: form.phone, address: form.address, firstName: form.firstName, lastName: form.lastName } })}
                className="drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)] flex gap-[8px] w-full md:w-auto h-[48px] items-center justify-center px-[60px] py-[12px] relative rounded-[12px] shrink-0 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <div aria-hidden className="absolute bg-[#004172] inset-0 pointer-events-none rounded-[12px]" />
                <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
                <p className="font-inter font-medium leading-normal relative text-[16px] text-white tracking-[0.2592px] whitespace-nowrap">
                  Continue
                </p>
                <ChevronRightIcon />
              </button>
            </div>

          </div>{/* /form card */}
        </div>{/* /content */}
      </div>{/* /page body */}
    </div>
  );
}
