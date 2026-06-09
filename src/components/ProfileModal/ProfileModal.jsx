import React, { useState } from 'react';
import indiaFlagImg from '../../assets/icons/india-flag.png';
import checkSquareSvg from '../../assets/icons/check-square.svg';

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
    <path d="M6 9l6 6 6-6" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SmallChevronDown = () => (
  <svg width="10" height="5" viewBox="0 0 10 5" fill="none" className="flex-shrink-0">
    <path d="M1 0.5l4 4 4-4" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#999999" strokeWidth="1.5" />
    <path d="M16 2v4M8 2v4M3 10h18" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AvatarIcon = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <circle cx="7" cy="5" r="3.5" fill="#B2B2B2" />
    <path d="M0 15C0 11.134 3.134 8 7 8s7 3.134 7 7" fill="#B2B2B2" />
    <circle cx="14.5" cy="4" r="2.5" fill="#CCCCCC" />
    <path d="M18.5 15C18.5 12.015 16.762 9.5 14.5 9.5" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
    <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Checkbox primitives — exact Figma design ────────────────────────────────

// Unchecked: 14×14 gray-bordered square centered in 20×20 (matches Figma node 1910:2253)
const UncheckedBox = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
    <rect
      x="3" y="3" width="14" height="14" rx="1"
      stroke="#b2b2b2" strokeWidth="2"
      style={{ filter: 'drop-shadow(0px 2px 1px rgba(0,65,114,0.08))' }}
    />
  </svg>
);

// Checked: exact Figma SVG — green gradient rounded-square outline + tick (node 2073:16795)
const CheckedBox = ({ id = 'cb' }) => (
  <svg
    width="20" height="20"
    viewBox="19 17 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
    style={{ filter: 'drop-shadow(0px 2px 8px rgba(0,65,114,0.08))' }}
  >
    <defs>
      <linearGradient
        id={`cbGrad-${id}`}
        x1="28.9167" y1="19"
        x2="28.9167" y2="34"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#00664C" />
      </linearGradient>
    </defs>
    <path
      d="M26 25.6667L28.5 28.1667L36.8333 19.8333M36 26.5V32.3333C36 32.7754 35.8244 33.1993 35.5118 33.5118C35.1993 33.8244 34.7754 34 34.3333 34H22.6667C22.2246 34 21.8007 33.8244 21.4882 33.5118C21.1756 33.1993 21 32.7754 21 32.3333V20.6667C21 20.2246 21.1756 19.8007 21.4882 19.4882C21.8007 19.1756 22.2246 19 22.6667 19H31.8333"
      stroke={`url(#cbGrad-${id})`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Shared input style ───────────────────────────────────────────────────────
// Matches Figma: Inter Medium 16px, black when filled, #ccc as placeholder
const INPUT_CLS =
  'flex-1 min-w-0 bg-transparent outline-none border-none ' +
  'font-inter font-medium text-[16px] text-black leading-[28px] tracking-[0.5184px] ' +
  'placeholder:text-[#cccccc] placeholder:font-inter placeholder:font-medium ' +
  'placeholder:text-[16px] placeholder:leading-[28px] placeholder:tracking-[0.5184px]';

// ─── Input field variants ─────────────────────────────────────────────────────

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-inter font-medium text-[16px] text-black leading-normal tracking-[0.2592px]">
        {label}
      </p>
      <div className="bg-white border border-[#ebebeb] h-[44px] flex items-center px-4 rounded-[12px] w-full">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={INPUT_CLS}
        />
      </div>
    </div>
  );
}

function SelectInput({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-inter font-medium text-[16px] text-black leading-normal tracking-[0.2592px]">
        {label}
      </p>
      <div className="bg-white border border-[#ebebeb] h-[44px] flex items-center px-4 rounded-[12px] w-full">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={INPUT_CLS}
        />
        <ChevronDownIcon />
      </div>
    </div>
  );
}

function PhoneInput({ label, phoneValue, onPhoneChange }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-inter font-medium text-[16px] text-black leading-normal tracking-[0.2592px]">
        {label}
      </p>
      <div className="flex w-full h-[44px]">
        {/* Left: India flag + country code + chevron */}
        <div
          className="bg-white flex items-center gap-2 px-4 border border-[#ebebeb] rounded-l-[12px] flex-shrink-0"
          style={{ boxShadow: '0px 2px 1px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.08)' }}
        >
          {/* India flag — exact Figma size: 17.778 × 12 px */}
          <img
            src={indiaFlagImg}
            alt="India"
            style={{ width: '17.778px', height: '12px', objectFit: 'cover', display: 'block', flexShrink: 0 }}
          />
          <span className="font-inter font-medium text-[16px] text-[#cccccc] leading-normal tracking-[0.2592px] whitespace-nowrap">
            +91
          </span>
          <SmallChevronDown />
        </div>
        {/* Right: phone number input */}
        <div
          className="bg-white flex flex-1 items-center px-4 border-t border-b border-r border-[#ebebeb] rounded-r-[12px]"
          style={{ boxShadow: '0px 2px 1px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.08)' }}
        >
          <input
            type="tel"
            value={phoneValue}
            onChange={onPhoneChange}
            placeholder="E.g. 98XXXXXXXX"
            className={INPUT_CLS}
          />
        </div>
      </div>
    </div>
  );
}

function DatePickerInput({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-inter font-medium text-[16px] text-black leading-normal tracking-[0.2592px]">
        {label}
      </p>
      <div className="bg-white border border-[#ebebeb] h-[44px] flex items-center gap-2 px-4 rounded-[12px] w-full">
        <CalendarIcon />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="DD / MM / YYYY"
          className={INPUT_CLS}
        />
        <ChevronDownIcon />
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function ProfileModal({ onClose, onRequestOTP }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    dateOfBirth: '',
    bloodGroup: '',
    age: '',
    address1: '',
    country: '',
    pincode: '',
    city: '',
    state: '',
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const [checkboxes, setCheckboxes] = useState({
    consent: false,
    terms: true,
    privacy: true,
  });

  const toggleCheckbox = (key) => () => {
    setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-[48px] w-[1025px] max-w-[95vw] max-h-[90vh] overflow-y-auto relative flex flex-col gap-6 md:gap-[48px]"
        style={{ boxShadow: '0px 2px 10px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.12)' }}
      >
        {/* ── Header row ── */}
        <div className="flex items-center justify-between shrink-0">
          <h2 className="font-inter font-semibold text-[22px] md:text-[32px] text-black leading-normal tracking-[0px]">
            Create your Profile
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e5e5e5] hover:border-[#cccccc] transition-colors flex-shrink-0"
            style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08)' }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Content area ── */}
        <div className="flex flex-col gap-[24px] shrink-0">

          {/* Avatar placeholder */}
          <div
            className="w-[78px] h-[78px] bg-[#e5e5e5] rounded-[16px] flex items-center justify-center flex-shrink-0"
            style={{ boxShadow: '0px 2px 1px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.08)' }}
          >
            <AvatarIcon />
          </div>

          {/* Form grid — 1 col mobile → 2 col tablet → 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[24px] w-full">

            {/* Row 1 */}
            <TextInput
              label="First Name"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              placeholder="Enter First Name"
            />
            <TextInput
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              placeholder="Enter Last Name"
            />
            <TextInput
              label="Gender"
              value={formData.gender}
              onChange={handleChange('gender')}
              placeholder="Eg. Male"
            />

            {/* Row 2 */}
            <PhoneInput
              label="Phone Number*"
              phoneValue={formData.phoneNumber}
              onPhoneChange={handleChange('phoneNumber')}
            />
            <DatePickerInput
              label="Date of Birth*"
              value={formData.dateOfBirth}
              onChange={handleChange('dateOfBirth')}
            />
            <SelectInput
              label="Blood Group"
              value={formData.bloodGroup}
              onChange={handleChange('bloodGroup')}
              placeholder="eg. O+"
            />

            {/* Row 3 */}
            <TextInput
              label="Age*"
              value={formData.age}
              onChange={handleChange('age')}
              placeholder="eg. 24"
            />
            <TextInput
              label="Address 1*"
              value={formData.address1}
              onChange={handleChange('address1')}
              placeholder="Enter Address 1"
            />
            <SelectInput
              label="Country"
              value={formData.country}
              onChange={handleChange('country')}
              placeholder="eg. India"
            />

            {/* Row 4 */}
            <SelectInput
              label="Pin code*"
              value={formData.pincode}
              onChange={handleChange('pincode')}
              placeholder="Placeholder"
            />
            <SelectInput
              label="City*"
              value={formData.city}
              onChange={handleChange('city')}
              placeholder="eg. Nardana"
            />
            <SelectInput
              label="State*"
              value={formData.state}
              onChange={handleChange('state')}
              placeholder="eg. Maharashtra"
            />
          </div>

          {/* Consent + T&C + Privacy checkboxes */}
          <div className="flex flex-col gap-[20px]">
            {/* Consent (toggleable) */}
            <button
              type="button"
              onClick={toggleCheckbox('consent')}
              className="flex items-start gap-4 cursor-pointer text-left focus:outline-none"
            >
              {checkboxes.consent ? <CheckedBox id="consent" /> : <UncheckedBox />}
              <p className="font-inter font-medium text-[16px] text-[rgba(0,0,0,0.5)] leading-normal tracking-[-0.16px]">
                By checking  on this you are giving consent to Total Care the access to your account and login to it.
              </p>
            </button>
            {/* Terms and Conditions (toggleable) */}
            <button
              type="button"
              onClick={toggleCheckbox('terms')}
              className="flex items-center gap-4 cursor-pointer focus:outline-none"
            >
              {checkboxes.terms ? <CheckedBox id="terms" /> : <UncheckedBox />}
              <p className="font-inter font-medium text-[16px] text-[rgba(0,0,0,0.5)] leading-normal tracking-[-0.16px]">
                Terms and Conditions
              </p>
            </button>
            {/* Privacy Policy (toggleable) */}
            <button
              type="button"
              onClick={toggleCheckbox('privacy')}
              className="flex items-center gap-4 cursor-pointer focus:outline-none"
            >
              {checkboxes.privacy ? <CheckedBox id="privacy" /> : <UncheckedBox />}
              <p className="font-inter font-medium text-[16px] text-[rgba(0,0,0,0.5)] leading-normal tracking-[-0.16px]">
                Privacy Policy
              </p>
            </button>
          </div>
        </div>

        {/* ── CTA button ── */}
        <div className="flex justify-end shrink-0">
          <button
            type="button"
            onClick={() => onRequestOTP && onRequestOTP(formData.phoneNumber, formData)}
            className="flex items-center gap-2 bg-[#004172] text-white font-inter font-medium text-[16px] leading-normal tracking-[0.2592px] h-[40px] px-4 rounded-[12px] whitespace-nowrap"
            style={{ boxShadow: '0px 2px 2px rgba(0,65,114,0.08), inset 0px 0px 2px rgba(0,65,114,0.08)' }}
          >
            Get Consent via OTP
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
