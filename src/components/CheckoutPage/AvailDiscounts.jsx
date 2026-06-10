import { useState, useRef } from 'react';

/* ── Figma SVG assets ─────────────────────────────────────────────────────── */
import radioDefault  from '../../assets/checkout/radio-default.svg';       // gray ring (unselected)
import radioSelected from '../../assets/checkout/radio-selected.svg';      // green gradient (selected)
import iconCloseErr  from '../../assets/checkout/icon-close-error.svg';    // warning △ in error input
import iconVerifyOff from '../../assets/checkout/icon-verify-disabled.svg'; // gray ✓ (disabled Verify)
import iconVerifyOn  from '../../assets/checkout/icon-verify-active.svg';   // blue ✓ (active Verify)

/* ═══════════════════════════════════════════════════════════════════════════
   Radio icon helpers  — exact Figma sizing
═══════════════════════════════════════════════════════════════════════════ */
function RadioUnselected() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <img alt="" src={radioDefault} className="absolute block inset-0 max-w-none size-full" />
    </div>
  );
}

function RadioChecked() {
  /* Figma wraps imgIcon in inset-[8.33%] inside 24x24 container */
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]">
      <div className="absolute inset-[8.33%]">
        <img alt="" src={radioSelected} className="absolute block inset-0 max-w-none size-full" />
      </div>
    </div>
  );
}

/* ── Success gradient text ───────────────────────────────────────────────── */
function SuccessText({ children }) {
  return (
    <div className="flex flex-1 min-w-px h-[41px] items-center justify-center p-[12px] rounded-[12px]">
      <p className="flex-1 min-w-px font-inter font-medium text-[16px] tracking-[0.5184px] leading-[28px]"
        style={{
          backgroundImage: 'linear-gradient(180deg, #10B981 0%, #00664C 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
        {children}
      </p>
    </div>
  );
}

/* ── Apply / SendOTP button — active or disabled ────────────────────────── */
function ActionBtn({ onClick, disabled, children }) {
  if (disabled) {
    return (
      <div className="flex gap-0 h-[40px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0
        drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)] relative cursor-not-allowed">
        <div aria-hidden className="absolute bg-[#f9f9f9] inset-0 pointer-events-none rounded-[12px]" />
        <p className="font-inter font-medium text-[16px] text-[#ccc] tracking-[0.2592px] whitespace-nowrap relative">
          {children}
        </p>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]" />
      </div>
    );
  }
  return (
    <button type="button" onClick={onClick}
      className="flex gap-0 h-[40px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0
        drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)] relative cursor-pointer hover:brightness-105 transition-all duration-150">
      <div aria-hidden className="absolute bg-[#edf9ff] inset-0 pointer-events-none rounded-[12px]" />
      <p className="font-inter font-medium text-[16px] text-[#004172] tracking-[0.2592px] whitespace-nowrap relative">
        {children}
      </p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
    </button>
  );
}

/* ── Remove button — ghost: just text + drop-shadow, no bg fill ─────────── */
function RemoveBtn({ onClick }) {
  return (
    <button type="button" onClick={onClick}
      className="flex gap-0 h-[40px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0
        drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)] relative cursor-pointer">
      <p className="font-inter font-medium text-[16px] text-[#004172] tracking-[0.2592px] whitespace-nowrap relative">
        Remove
      </p>
    </button>
  );
}

/* ── Verify button with checkmark icon ──────────────────────────────────── */
function VerifyBtn({ onClick, disabled }) {
  if (disabled) {
    return (
      <div className="flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0
        drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)] relative cursor-not-allowed">
        <div aria-hidden className="absolute bg-[#f9f9f9] inset-0 pointer-events-none rounded-[12px]" />
        <div className="drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)] overflow-clip relative shrink-0 size-[24px]">
          <div className="absolute inset-[27.86%_20.83%_32.03%_20.83%]">
            <div className="absolute inset-[-10.39%_-7.14%]">
              <img alt="" src={iconVerifyOff} className="block max-w-none size-full" />
            </div>
          </div>
        </div>
        <p className="font-inter font-medium text-[16px] text-[#ccc] tracking-[0.2592px] whitespace-nowrap relative">
          Verify
        </p>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]" />
      </div>
    );
  }
  return (
    <button type="button" onClick={onClick}
      className="flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] rounded-[12px] shrink-0
        drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)] relative cursor-pointer hover:brightness-105 transition-all duration-150">
      <div aria-hidden className="absolute bg-[#edf9ff] inset-0 pointer-events-none rounded-[12px]" />
      <div className="drop-shadow-[0px_2px_8px_rgba(0,65,114,0.08)] overflow-clip relative shrink-0 size-[24px]">
        <div className="absolute inset-[27.86%_20.83%_32.03%_20.83%]">
          <div className="absolute inset-[-10.39%_-7.14%]">
            <img alt="" src={iconVerifyOn} className="block max-w-none size-full" />
          </div>
        </div>
      </div>
      <p className="font-inter font-medium text-[16px] text-[#004172] tracking-[0.2592px] whitespace-nowrap relative">
        Verify
      </p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
    </button>
  );
}

/* ── Text input field — 3 visual states (default / filled / error) ───────── */
function InputField({ value, onChange, onClear, placeholder, error }) {
  const stateClasses = error
    ? 'border-[#ff9191] border-[0.81px] drop-shadow-[0px_2px_1px_rgba(0,65,114,0.08)]'
    : value
      ? 'border-[#ebebeb] border-[1.62px] drop-shadow-[0px_2px_1px_rgba(0,65,114,0.08)]'
      : 'bg-white border-[#ebebeb] border-[0.81px]';

  return (
    <div className={`flex items-center px-[16px] py-[16px] relative rounded-[12px] shrink-0 w-full h-[44px] ${stateClasses}`}>
      {(value || error) && (
        <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[12px]" />
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 min-w-px bg-transparent font-inter font-medium text-[16px] tracking-[0.2592px]
          leading-normal text-black placeholder:text-[#999] outline-none relative z-[1]"
      />
      {/* Error warning icon on right */}
      {error && onClear && (
        <button type="button" onClick={onClear}
          className="drop-shadow-[0px_2px_1px_rgba(0,65,114,0.08)] overflow-clip relative shrink-0 size-[24px] z-[1]">
          <div className="absolute inset-[17.3%_12.5%_17.73%_12.5%]">
            <div className="absolute inset-[-5.52%_-4.79%]">
              <img alt="" src={iconCloseErr} className="block max-w-none size-full" />
            </div>
          </div>
        </button>
      )}
      {value && !error && (
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
      )}
    </div>
  );
}

/* ── OTP 4-box input ─────────────────────────────────────────────────────── */
function OtpBoxes({ value, onChange, error }) {
  const refs = useRef([]);

  const handleKey = (i, e) => {
    const ch = e.target.value.replace(/\D/g, '').slice(-1);
    const arr = Array.from({ length: 4 }, (_, idx) => value[idx] || '');
    arr[i] = ch;
    onChange(arr.join(''));
    if (ch && i < 3) refs.current[i + 1]?.focus();
    if (!ch && e.key === 'Backspace' && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div className="flex gap-[8px] items-start shrink-0">
      {[0, 1, 2, 3].map(i => {
        const char = value[i] || '';
        const filled = !!char;
        const boxClass = error
          ? 'border-[#ff9191] border-[0.81px] drop-shadow-[0px_2px_1px_rgba(0,65,114,0.08)]'
          : filled
            ? 'border-[#ebebeb] border-[1.62px] drop-shadow-[0px_2px_1px_rgba(0,65,114,0.08)]'
            : 'bg-white border-[#ebebeb] border-[0.81px]';

        return (
          <div key={i}
            className={`flex flex-col h-[40px] items-center justify-center px-[16px] py-[16px] relative rounded-[12px] shrink-0 ${boxClass}`}
            style={{ minWidth: 40, width: 40 }}>
            {(filled || error) && (
              <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[12px]" />
            )}
            <input
              ref={el => refs.current[i] = el}
              type="text" maxLength={1}
              value={char}
              onChange={() => {}}
              onKeyDown={e => handleKey(i, e)}
              onInput={e => handleKey(i, { target: e.target, key: '' })}
              className="relative z-[1] w-full text-center bg-transparent font-inter font-medium
                text-[14px] tracking-[-0.14px] leading-normal text-black outline-none"
            />
            {filled && !error && (
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ── COUPON SECTION
═══════════════════════════════════════════════════════════════════════════ */
const VALID_COUPON = 'FLAT100';

function CouponSection({ isSelected, onSelect, onApplied, onRemoved }) {
  const [code, setCode]     = useState('');
  const [status, setStatus] = useState('input'); // 'input' | 'invalid' | 'applied'

  const handleSelect = () => { setStatus('input'); setCode(''); onSelect(); };

  const handleApply = () => {
    if (code.trim().toUpperCase() === VALID_COUPON) {
      setStatus('applied');
      onApplied?.({ type: 'coupon', label: 'FLAT100', discount: 100 });
    } else {
      setStatus('invalid');
    }
  };

  const handleClear = () => { setCode(''); setStatus('input'); };

  const handleRemove = () => {
    setCode(''); setStatus('input');
    onRemoved?.();
  };

  if (!isSelected) {
    return (
      <button type="button" onClick={handleSelect} className="flex items-center gap-[16px] cursor-pointer">
        <RadioUnselected />
        <span className="font-inter font-medium text-[16px] text-black tracking-[0.5184px] leading-[28px] whitespace-nowrap">
          Coupon
        </span>
      </button>
    );
  }

  return (
    <div className="flex flex-col items-start justify-center gap-[16px] w-full">
      {/* Header row */}
      <div className="flex items-center gap-[16px]">
        <RadioChecked />
        <span className="font-inter font-medium text-[16px] text-black tracking-[0.5184px] leading-[28px] whitespace-nowrap">
          Coupon
        </span>
      </div>

      {/* State body */}
      {status === 'applied' ? (
        /* "Coupon filled" — success */
        <div className="flex gap-[16px] items-center pr-0 w-full">
          <SuccessText>'FLAT100' applied!</SuccessText>
          <RemoveBtn onClick={handleRemove} />
        </div>
      ) : (
        /* "Coupon" / "Coupon invlid" — input row */
        <div className={`flex gap-[16px] w-full ${status === 'invalid' ? 'items-start' : 'items-center'}`}>
          <div className="flex flex-1 min-w-px flex-col gap-[8px] items-start">
            <InputField
              value={code}
              onChange={e => { setCode(e.target.value); if (status === 'invalid') setStatus('input'); }}
              onClear={status === 'invalid' ? handleClear : undefined}
              placeholder="Enter coupon code here"
              error={status === 'invalid'}
            />
            {status === 'invalid' && (
              <p className="font-inter font-light text-[16px] text-[#d82525] tracking-[0.2592px] leading-[1.2] w-full">
                Invalid Code
              </p>
            )}
          </div>
          {status === 'invalid'
            ? <ActionBtn disabled>Apply</ActionBtn>
            : <ActionBtn onClick={handleApply} disabled={!code.trim()}>Apply</ActionBtn>
          }
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ── CORPORATE DISCOUNT SECTION
═══════════════════════════════════════════════════════════════════════════ */
const VALID_OTP = '3333';

function CorporateSection({ isSelected, onSelect, onApplied, onRemoved }) {
  const [step, setStep]   = useState('email');
  // 'email' | 'otp-empty' | 'otp-filled' | 'otp-invalid' | 'success'
  const [email, setEmail] = useState('');
  const [otp, setOtp]     = useState('');

  const handleSelect = () => { setStep('email'); setEmail(''); setOtp(''); onSelect(); };

  const handleSendOtp = () => { if (email.trim()) setStep('otp-empty'); };

  const handleOtpChange = (val) => {
    setOtp(val);
    const digits = val.replace(/\s/g, '');
    if (step === 'otp-invalid') setStep(digits.length === 4 ? 'otp-filled' : 'otp-empty');
    else setStep(digits.length === 4 ? 'otp-filled' : 'otp-empty');
  };

  const handleVerify = () => {
    if (otp === VALID_OTP) {
      setStep('success');
      onApplied?.({ type: 'corporate', label: 'Corporate', discount: 200 });
    } else {
      setStep('otp-invalid');
    }
  };

  const handleRemove = () => {
    setStep('email'); setEmail(''); setOtp('');
    onRemoved?.();
  };

  if (!isSelected) {
    return (
      <button type="button" onClick={handleSelect} className="flex items-center gap-[16px] cursor-pointer">
        <RadioUnselected />
        <span className="font-inter font-medium text-[16px] text-black tracking-[0.5184px] leading-[28px] whitespace-nowrap">
          Corporate Discount
        </span>
      </button>
    );
  }

  return (
    <div className="flex flex-col items-start justify-center gap-[16px] w-full">
      {/* Header */}
      <div className="flex items-center gap-[16px]">
        <RadioChecked />
        <span className="font-inter font-medium text-[16px] text-black tracking-[0.5184px] leading-[28px] whitespace-nowrap">
          Corporate Discount
        </span>
      </div>

      {/* Email step — "Corporate DIscount" */}
      {step === 'email' && (
        <div className="flex gap-[16px] items-start w-full">
          <div className="flex flex-1 min-w-px flex-col gap-[8px] items-start">
            <InputField
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter Corporate email id"
              error={false}
            />
            <p className="font-inter font-light text-[16px] text-[#808080] tracking-[0.2592px] leading-[1.2] w-full">
              For Verification
            </p>
          </div>
          <ActionBtn onClick={handleSendOtp} disabled={!email.trim()}>Send OTP</ActionBtn>
        </div>
      )}

      {/* OTP step — "unfilled / filled / invalid" */}
      {(step === 'otp-empty' || step === 'otp-filled' || step === 'otp-invalid') && (
        <div className="flex flex-col gap-[12px] items-start w-full">
          <p className="font-inter font-light text-[16px] text-black tracking-[0.2592px] leading-[1.2]">
            Enter the OTP sent to {email || 'your email'}
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-between w-full">
            <OtpBoxes
              value={otp}
              onChange={handleOtpChange}
              error={step === 'otp-invalid'}
            />
            <VerifyBtn
              onClick={handleVerify}
              disabled={step !== 'otp-filled'}
            />
          </div>
          {step === 'otp-invalid' && (
            <p className="font-inter font-light text-[16px] text-[#d82525] tracking-[0.2592px] leading-[1.2]">
              Wrong OTP, Re-Enter
            </p>
          )}
        </div>
      )}

      {/* Success — "Corporate discount success" */}
      {step === 'success' && (
        <div className="flex gap-[16px] items-center pr-0 w-full">
          <SuccessText>Discount Successfully applied!</SuccessText>
          <RemoveBtn onClick={handleRemove} />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ── CURE COINS SECTION
═══════════════════════════════════════════════════════════════════════════ */
const TOTAL_CC = 1000;

function CureCoinsSection({ isSelected, onSelect, onApplied, onRemoved }) {
  const [amount, setAmount]   = useState('');
  const [status, setStatus]   = useState('input'); // 'input' | 'filled' | 'error' | 'success'
  const [usedCoins, setUsedCoins] = useState(0);

  const ccRemaining = status === 'success' ? TOTAL_CC - usedCoins : TOTAL_CC;

  const handleSelect = () => { setAmount(''); setStatus('input'); setUsedCoins(0); onSelect(); };

  const handleApply = () => {
    const num = parseInt(amount, 10);
    if (!num || num > TOTAL_CC) {
      setStatus('error');
    } else {
      setUsedCoins(num);
      setStatus('success');
      onApplied?.({ type: 'curecoins', label: `${num} CC`, discount: num, coins: num });
    }
  };

  const handleClear = () => { setAmount(''); setStatus('input'); };

  const handleRemove = () => {
    setAmount(''); setStatus('input'); setUsedCoins(0);
    onRemoved?.();
  };

  /* CC badge */
  const ccBadge = (
    <span className="font-inter font-bold text-[16px] text-[#d29300] tracking-[0.5184px] leading-[normal] whitespace-nowrap">
      {ccRemaining.toLocaleString('en-IN')} CC left
    </span>
  );

  if (!isSelected) {
    return (
      <div className="flex items-center justify-between w-full">
        <button type="button" onClick={handleSelect} className="flex items-center gap-[16px] cursor-pointer">
          <RadioUnselected />
          <span className="font-inter font-medium text-[16px] text-black tracking-[0.5184px] leading-[28px] whitespace-nowrap">
            Cure Coins
          </span>
        </button>
        {ccBadge}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px] items-start justify-center w-full">
      {/* Header with CC badge */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[16px]">
          <RadioChecked />
          <span className="font-inter font-medium text-[16px] text-black tracking-[0.5184px] leading-[28px] whitespace-nowrap">
            Cure Coins
          </span>
        </div>
        {ccBadge}
      </div>

      {/* Success — "Cure Coins success" */}
      {status === 'success' && (
        <div className="flex gap-[16px] items-center pr-0 w-full">
          <SuccessText>{usedCoins} Cure Coins applied Successfully!</SuccessText>
          <RemoveBtn onClick={handleRemove} />
        </div>
      )}

      {/* Input step */}
      {status !== 'success' && (
        <div className={`flex gap-[16px] w-full ${status === 'error' ? 'items-start' : 'items-center'}`}>
          <div className="flex flex-1 min-w-px flex-col gap-[8px] items-start">
            <InputField
              value={amount}
              onChange={e => {
                const v = e.target.value.replace(/\D/g, '');
                setAmount(v);
                setStatus(v ? 'filled' : 'input');
              }}
              onClear={status === 'error' ? handleClear : undefined}
              placeholder="Enter number of Curecoin to use"
              error={status === 'error'}
            />
            {status !== 'error' && (
              <p className="font-inter font-light text-[16px] text-[#808080] tracking-[0.2592px] leading-[1.2] w-full">
                (1 Cure Coin = ₹1 discount)
              </p>
            )}
            {status === 'error' && (
              <p className="font-inter font-light text-[16px] text-[#d82525] tracking-[0.2592px] leading-[1.2] w-full">
                Invalid digits
              </p>
            )}
          </div>
          {status === 'error'
            ? <ActionBtn disabled>Apply</ActionBtn>
            : <ActionBtn onClick={handleApply} disabled={!amount}>Apply</ActionBtn>
          }
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AvailDiscounts — main export
═══════════════════════════════════════════════════════════════════════════ */
export default function AvailDiscounts({ onDiscountChange }) {
  const [active, setActive] = useState(null); // null | 'coupon' | 'corporate' | 'curecoins'

  const handleSelect = (section) => setActive(prev => (prev === section ? null : section));

  const handleApplied = (info) => {
    onDiscountChange?.(info);
  };

  const handleRemoved = () => {
    setActive(null);
    onDiscountChange?.(null);
  };

  return (
    <div className="flex flex-col gap-0 w-full border-t border-b border-[#CCC] py-4 overflow-x-hidden">
      <div className="flex flex-col gap-[24px] px-4 sm:px-[24px] py-[0]">

        {/* Heading */}
        <p className="font-inter font-bold text-[18px] text-black tracking-[0.5825px] leading-[28px]">
          Avail Discounts
        </p>

        {/* Three discount options */}
        <div className="flex flex-col gap-[24px] w-full">

          <CouponSection
            isSelected={active === 'coupon'}
            onSelect={() => handleSelect('coupon')}
            onApplied={handleApplied}
            onRemoved={handleRemoved}
          />

          <CorporateSection
            isSelected={active === 'corporate'}
            onSelect={() => handleSelect('corporate')}
            onApplied={handleApplied}
            onRemoved={handleRemoved}
          />

          <CureCoinsSection
            isSelected={active === 'curecoins'}
            onSelect={() => handleSelect('curecoins')}
            onApplied={handleApplied}
            onRemoved={handleRemoved}
          />

        </div>
      </div>
    </div>
  );
}
