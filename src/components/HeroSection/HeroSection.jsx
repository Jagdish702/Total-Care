import React, { useState, useEffect, useRef } from 'react';
import { CardTag, CardStat, StatNum, StatUnit, CardDivider, GlassPanel } from '../shared/CardPrimitives';

// ── Primary visuals ────────────────────────────────────────────────────────
import imgBg        from '../../assets/hero/bg.png';
import imgPhone     from '../../assets/hero/hero-phone.png';
import imgTitleFill from '../../assets/hero/total-care-text.png';
import imgQr        from '../../assets/hero/qr-code.png';

// ── Card imagery ───────────────────────────────────────────────────────────
import imgProfile from '../../assets/hero/card-profile.png';
import imgDevices from '../../assets/hero/card-devices.png';
import imgFood    from '../../assets/hero/card-food.png';

// ── Card icons ─────────────────────────────────────────────────────────────
import icoRx        from '../../assets/hero/icons/ico-rx.svg';
import icoLab       from '../../assets/hero/icons/ico-lab.svg';
import icoAllergy   from '../../assets/hero/icons/ico-alergy.svg';
import icoHeart     from '../../assets/hero/icons/ico-heart.svg';
import icoGlucose   from '../../assets/hero/icons/ico-glucose.svg';
import icoPerson    from '../../assets/hero/icons/ico-person.svg';
import icoSleep     from '../../assets/hero/icons/ico-sleep.svg';
import icoAmbulance from '../../assets/hero/icons/ico-ambulance.svg';
import icoConcierge from '../../assets/hero/icons/ico-concierge.svg';
import icoContact   from '../../assets/hero/icons/ico-contact.svg';
import chartHeart   from '../../assets/hero/icons/chart-heart.svg';
import chartLine    from '../../assets/hero/icons/chart-generic.svg';

// ── Figma desktop visual dimensions (px) ──────────────────────────────────
const VISUAL_W = 1251.976;
const VISUAL_H = 890.294;

// ── Figma mobile visual dimensions — frame 606:6436 (407 × 510 px) ────────
// Height trimmed to 510 so Health Devices card is fully visible without
// excessive white-space below the phone mockup.
const MOBILE_VISUAL_W = 407;
const MOBILE_VISUAL_H = 510;

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP floating card components (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

/* Outer glassmorphic card container */
function GlassOuter({ style, animDelay = 0, children }) {
  return (
    <div
      className="absolute opacity-80 p-[8.533px] flex flex-col gap-[8.533px] items-start
                 rounded-[22.756px] bg-[rgba(0,52,91,0.1)]
                 drop-shadow-[0px_1.422px_7.111px_rgba(0,65,114,0.08)]
                 shadow-[inset_0px_0px_1.422px_0px_rgba(0,65,114,0.12)]"
      style={{
        ...style,
        animation: `cardPopIn 0.55s cubic-bezier(0.34,1.56,0.64,1) ${animDelay}ms both`,
      }}
    >
      {children}
    </div>
  );
}

/** Top-left: Medical records (Prescriptions · Lab tests · Allergies) */
function RecordsCard({ animDelay = 0 }) {
  return (
    <GlassOuter style={{ left: '59.99px', top: '72.16px', width: '330.624px' }} animDelay={animDelay}>
      <div className="flex gap-[10.199px] items-start w-full">
        <GlassPanel className="flex flex-1 items-center justify-between p-[11.378px]">
          <div className="flex flex-col gap-[11.378px]">
            <CardTag icon={icoRx} label="Prescriptions" />
            <CardStat>
              <StatNum>15</StatNum>
              <StatUnit>Records</StatUnit>
            </CardStat>
          </div>
        </GlassPanel>
        <GlassPanel className="flex flex-1 items-center justify-between p-[11.378px]">
          <div className="flex flex-col gap-[11.378px]">
            <CardTag icon={icoLab} label="Lab tests" />
            <CardStat>
              <StatNum>9</StatNum>
              <StatUnit>Records</StatUnit>
            </CardStat>
          </div>
        </GlassPanel>
      </div>
      <CardDivider />
      <GlassPanel className="flex items-start justify-between p-[11.378px] w-full">
        <div className="flex flex-col gap-[11.378px]">
          <CardTag icon={icoAllergy} label="Allergies" />
          <CardStat>
            <StatNum>4</StatNum>
            <StatUnit>Records</StatUnit>
          </CardStat>
        </div>
        <div className="font-inter font-medium text-[9.55px] leading-[15.91px] tracking-[0.309px] text-[#4d4d4d] flex gap-[9.547px]">
          <ul className="list-disc ml-[14px]">
            <li>Penicillin</li>
            <li>Plant's oil (urushiol)</li>
          </ul>
          <ul className="list-disc ml-[14px]">
            <li>Cephalosporins</li>
            <li>Aspirin</li>
          </ul>
        </div>
      </GlassPanel>
    </GlassOuter>
  );
}

/** Top-right: Live vitals */
function VitalsCard({ animDelay = 0 }) {
  return (
    <GlassOuter style={{ left: '830.3px', top: '69.55px', width: '347.734px' }} animDelay={animDelay}>
      <div className="flex gap-[10.199px] items-start w-full">
        <GlassPanel className="flex flex-1 items-center justify-between p-[11.378px]">
          <div className="flex flex-col gap-[11.378px]">
            <CardTag icon={icoHeart} label="Heart Rate" />
            <CardStat><StatNum>98</StatNum><StatUnit>BPM</StatUnit></CardStat>
          </div>
          <img src={chartHeart} alt="" aria-hidden className="h-[5.159px] w-[30.711px] object-contain" />
        </GlassPanel>
        <GlassPanel className="flex flex-1 items-center justify-between p-[11.378px]">
          <div className="flex flex-col gap-[11.378px]">
            <CardTag icon={icoGlucose} label="Glucose" />
            <CardStat><StatNum>92</StatNum><StatUnit>mg/dL</StatUnit></CardStat>
          </div>
          <img src={chartLine} alt="" aria-hidden className="h-[5.159px] w-[30.711px] object-contain" />
        </GlassPanel>
      </div>
      <CardDivider />
      <div className="flex gap-[10.199px] items-start w-full">
        <GlassPanel className="flex flex-1 items-center justify-between p-[11.378px]">
          <div className="flex flex-col gap-[11.378px]">
            <CardTag icon={icoPerson} label="Blood pressure" />
            <CardStat><StatNum>98</StatNum><StatUnit>BPM</StatUnit></CardStat>
          </div>
          <img src={chartLine} alt="" aria-hidden className="h-[5.159px] w-[30.711px] object-contain" />
        </GlassPanel>
        <GlassPanel className="flex flex-1 items-center justify-between p-[11.378px]">
          <div className="flex flex-col gap-[11.378px]">
            <CardTag icon={icoSleep} label="Sleep" />
            <CardStat><StatNum>8</StatNum><StatUnit>Hr</StatUnit><StatNum>43</StatNum><StatUnit>Min</StatUnit></CardStat>
          </div>
          <img src={chartLine} alt="" aria-hidden className="h-[5.159px] w-[30.711px] object-contain" />
        </GlassPanel>
      </div>
      <CardDivider />
      <p className="font-inter font-medium text-[8.53px] leading-[14.222px] tracking-[0.276px] text-[#4d4d4d] text-center w-full">
        vitals synced from the devices
      </p>
    </GlassOuter>
  );
}

/** Middle-right: Emergency */
function EmergencyCard({ animDelay = 0 }) {
  return (
    <GlassOuter style={{ left: '905.94px', top: '319.95px', width: '312.895px' }} animDelay={animDelay}>
      <div className="flex gap-[10.199px] items-start w-full">
        <GlassPanel className="flex flex-1 flex-col gap-[11.378px] p-[11.378px]">
          <CardTag icon={icoAmbulance} label="Ambulance" />
          <CardStat><StatNum>30</StatNum><StatUnit>mins to arrive</StatUnit></CardStat>
        </GlassPanel>
        <GlassPanel className="flex flex-1 flex-col gap-[11.378px] p-[11.378px]">
          <CardTag icon={icoConcierge} label="Concierge" />
          <CardStat><StatNum>30</StatNum><StatUnit>mins to arrive</StatUnit></CardStat>
        </GlassPanel>
      </div>
      <CardDivider />
      <GlassPanel className="flex items-end gap-[11.378px] p-[11.378px] w-full">
        <div className="flex flex-col gap-[11.378px] flex-1">
          <CardTag icon={icoContact} label="Emergency Contact" />
          <div className="flex flex-col gap-[11.733px]">
            <span className="font-inter font-medium text-[17.07px] leading-normal tracking-[0.277px] text-black">Aaditya</span>
            <span className="font-inter font-medium text-[8.53px] leading-[14.222px] tracking-[0.276px] text-[#4d4d4d]">Son</span>
          </div>
        </div>
        <button
          type="button"
          className="flex-shrink-0 flex items-center justify-center
                     bg-[#edf9ff] rounded-[11.733px]
                     px-[15.644px] py-[7.822px] h-[39.109px] w-[133.634px]
                     drop-shadow-[0px_1.955px_1.955px_rgba(0,65,114,0.08)]
                     shadow-[inset_0px_0px_1.955px_0px_rgba(0,65,114,0.08)]
                     font-inter font-medium text-[15.64px] leading-normal
                     tracking-[0.253px] text-[#d82525] whitespace-nowrap"
        >
          Call Now
        </button>
      </GlassPanel>
    </GlassOuter>
  );
}

/** Middle-left: Nutrition tracker */
function NutritionCard({ animDelay = 0 }) {
  return (
    <div
      className="absolute opacity-80 flex flex-col gap-[8.084px] items-center
                 drop-shadow-[0px_1.422px_7.111px_rgba(0,65,114,0.08)]"
      style={{
        left: '59.99px', top: '298.21px', width: '256px',
        animation: `cardPopIn 0.55s cubic-bezier(0.34,1.56,0.64,1) ${animDelay}ms both`,
      }}
    >
      <div className="relative flex items-center justify-center h-[30.091px] w-full rounded-[17.067px] drop-shadow-[0px_1.422px_7.111px_rgba(0,65,114,0.08)] shrink-0 overflow-hidden">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[17.067px]" />
        <span className="font-inter font-medium text-[11.38px] leading-[19.911px] tracking-[0.369px] text-[#008eb1] relative">Breakfast</span>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.422px_0px_rgba(0,65,114,0.12)]" />
      </div>
      <CardDivider />
      <div className="relative flex items-center overflow-hidden h-[80.842px] w-full rounded-[17.067px] shadow-[0px_1.422px_14.222px_0px_rgba(0,65,114,0.08)] shrink-0">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[17.067px]" />
        <div className="flex flex-col gap-[11.378px] p-[17.067px] z-10 relative w-[93.642px]">
          <span className="font-inter font-medium text-[11.38px] leading-[19.911px] tracking-[0.369px] text-[#008eb1]">Poha</span>
          <CardStat><StatNum>320</StatNum><StatUnit>KCAL</StatUnit></CardStat>
        </div>
        <div
          className="absolute right-0 h-[157.642px] w-[135.411px] overflow-hidden rounded-bl-[1347.371px] rounded-tl-[1347.371px]"
          style={{ top: 'calc(50% + 4.04px)', transform: 'translateY(-50%)' }}
        >
          <img src={imgFood} alt="Poha" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.422px_0px_rgba(0,65,114,0.12)]" />
      </div>
      <CardDivider />
      <div className="relative flex flex-col gap-[17.067px] p-[17.067px] w-full rounded-[17.067px] drop-shadow-[0px_1.422px_7.111px_rgba(0,65,114,0.08)] shrink-0">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[17.067px]" />
        <span className="font-inter font-medium text-[11.38px] leading-[19.911px] tracking-[0.369px] text-[#008eb1] whitespace-nowrap relative">Low Oil Recommended</span>
        <span className="font-inter font-medium text-[8.53px] leading-[14.222px] tracking-[0.276px] text-[#4d4d4d] whitespace-nowrap relative">Keep peanuts light. Add veggies for fiber.</span>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.422px_0px_rgba(0,65,114,0.12)]" />
      </div>
    </div>
  );
}

/** Bottom-right: Auto Health Sync */
function HealthSyncCard({ animDelay = 0 }) {
  return (
    <div
      className="absolute opacity-80 flex flex-col items-center gap-[17.389px]"
      style={{
        left: '978.98px', top: '544.26px', width: '225.182px',
        animation: `cardPopIn 0.55s cubic-bezier(0.34,1.56,0.64,1) ${animDelay}ms both`,
      }}
    >
      <div className="w-[122.589px] h-[126.067px] rounded-full overflow-hidden flex-shrink-0 shadow-[0px_1.739px_13.911px_0px_rgba(0,65,114,0.08)] shadow-[inset_0px_0px_1.739px_0px_rgba(0,65,114,0.16)]">
        <img src={imgProfile} alt="" aria-hidden className="w-full h-full object-cover" />
      </div>
      <div className="relative w-full flex flex-col items-center gap-[20.866px] p-[20.866px] rounded-[20.866px] bg-[rgba(255,255,255,0.8)] shadow-[0px_1.739px_17.389px_0px_rgba(0,65,114,0.08)] shadow-[inset_0px_0px_1.739px_0px_rgba(0,65,114,0.12)]">
        <span className="font-inter font-medium text-[13.91px] leading-[24.344px] tracking-[0.451px] text-[#008eb1] whitespace-nowrap">Auto Health Sync</span>
        <p className="font-inter font-medium text-[10.43px] leading-[17.389px] tracking-[0.338px] text-[#4d4d4d] text-center">
          Connect Apple / Google Health connect for real-time tracking, no manual input.
        </p>
      </div>
    </div>
  );
}

/** Bottom-left: Health Devices */
function HealthDevicesCard({ animDelay = 0 }) {
  return (
    <div
      className="absolute opacity-80 flex flex-col items-center gap-[17.389px]"
      style={{
        left: '123.46px', top: '564.26px', width: '225.182px',
        animation: `cardPopIn 0.55s cubic-bezier(0.34,1.56,0.64,1) ${animDelay}ms both`,
      }}
    >
      <img src={imgDevices} alt="" aria-hidden className="w-[183.449px] h-[139.978px] object-cover opacity-80" />
      <div className="relative w-full flex flex-col items-center gap-[20.866px] p-[20.866px] rounded-[20.866px] bg-[rgba(255,255,255,0.8)] shadow-[0px_1.739px_17.389px_0px_rgba(0,65,114,0.08)] shadow-[inset_0px_0px_1.739px_0px_rgba(0,65,114,0.12)]">
        <span className="font-inter font-medium text-[13.91px] leading-[24.344px] tracking-[0.451px] text-[#008eb1] whitespace-nowrap">Health Devices</span>
        <p className="font-inter font-medium text-[10.43px] leading-[17.389px] tracking-[0.338px] text-[#4d4d4d] text-center">
          Save more, save care at low cost
        </p>
      </div>
    </div>
  );
}

/** QR code card — desktop xl only */
function QrCard() {
  return (
    <div
      className="hidden xl:flex absolute right-10 top-[245px]
                 flex-col items-center gap-[12.885px] p-[12.885px]
                 rounded-[13.41px]
                 drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]
                 shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]"
      style={{ background: 'radial-gradient(ellipse at center, #e8f1f8 0%, #ffffff 100%)' }}
    >
      <img src={imgQr} alt="QR code to download Total Care app" className="w-[107.372px] h-[101.114px] object-contain" />
      <p className="font-inter font-medium text-[12.885px] leading-[21.474px] tracking-[0.417px] text-[#808080] text-center">
        Scan the QR code<br />to download the app
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE floating card components — Figma frame 606:6436
// All positions are Figma design-px inside a 407 × 580 canvas.
// The parent container uses CSS transform:scale so all values render correctly.
// ─────────────────────────────────────────────────────────────────────────────

/** Small chevron arrow used in mobile record panels */
function ChevronRight({ size = 8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none" aria-hidden>
      <path d="M2.5 1.5L5.5 4L2.5 6.5" stroke="#808080" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * MobileRecordsCard — top-right overlay
 * Figma: left=173, top=42, width=204.408
 * Shows Prescriptions / Lab tests / Allergies counts.
 * animDelay=0 ms — first card to appear.
 */
function MobileRecordsCard() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.4)]
                 flex flex-col gap-[8.274px] items-start
                 p-[8.274px] rounded-[16.549px]"
      style={{
        left: '173px', top: '42px', width: '204.408px',
        animation: 'mobileCardSlideUp 0.5s cubic-bezier(0.34,1.56,0.64,1) 0ms both',
      }}
    >
      {/* Row 1 — Prescriptions + Lab tests */}
      <div className="flex gap-[8.274px] items-start w-full">
        {/* Prescriptions */}
        <div className="flex-1 min-w-0 bg-[rgba(0,0,0,0.04)] rounded-[8.274px] p-[6.206px] flex items-end justify-between">
          <div className="flex flex-col gap-[6.206px]">
            <div className="flex items-center gap-[4.137px]">
              <img src={icoRx} alt="" aria-hidden className="w-[8.274px] h-[8.274px] object-contain flex-shrink-0" />
              <span className="text-[#008eb1] text-[6.206px] font-semibold tracking-[0.124px] leading-[1.5] whitespace-nowrap">
                Prescriptions
              </span>
            </div>
            <div className="flex items-end gap-[4.137px] font-semibold text-black">
              <span className="text-[12.411px] leading-none tracking-[0.201px]">15</span>
              <span className="text-[6.206px] leading-[1.5] tracking-[0.124px]">Records</span>
            </div>
          </div>
          <ChevronRight size={8.274} />
        </div>

        {/* Lab tests */}
        <div className="flex-1 min-w-0 bg-[rgba(0,0,0,0.04)] rounded-[8.274px] p-[6.206px] flex items-end justify-between">
          <div className="flex flex-col gap-[6.206px]">
            <div className="flex items-center gap-[4.137px]">
              <img src={icoLab} alt="" aria-hidden className="w-[8.274px] h-[8.274px] object-contain flex-shrink-0" />
              <span className="text-[#008eb1] text-[6.206px] font-semibold tracking-[0.124px] leading-[1.5] whitespace-nowrap">
                Lab tests
              </span>
            </div>
            <div className="flex items-end gap-[4.137px] font-semibold text-black">
              <span className="text-[12.411px] leading-none tracking-[0.201px]">9</span>
              <span className="text-[6.206px] leading-[1.5] tracking-[0.124px]">Records</span>
            </div>
          </div>
          <ChevronRight size={8.274} />
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[rgba(0,65,114,0.08)]" />

      {/* Allergies */}
      <div className="bg-[rgba(0,0,0,0.04)] rounded-[8.274px] p-[6.206px] flex items-start justify-between w-full">
        <div className="flex flex-col gap-[6.206px] shrink-0">
          <div className="flex items-center gap-[4.137px]">
            <img src={icoAllergy} alt="" aria-hidden className="w-[8.274px] h-[8.274px] object-contain flex-shrink-0" />
            <span className="text-[#008eb1] text-[6.206px] font-semibold tracking-[0.124px] leading-[1.5]">
              Allergies
            </span>
          </div>
          <div className="flex items-end gap-[4.137px] font-semibold text-black">
            <span className="text-[12.411px] leading-none tracking-[0.201px]">4</span>
            <span className="text-[6.206px] leading-[1.5] tracking-[0.124px]">Records</span>
          </div>
        </div>
        <div className="flex gap-[9.309px] font-light text-black text-[6.206px] tracking-[0.124px] leading-[1.5]">
          <ul className="list-disc ml-[9.309px]">
            <li className="mb-0">Penicillin</li>
            <li>Plant's oil (urushiol)</li>
          </ul>
          <ul className="list-disc ml-[9.309px]">
            <li className="mb-0">Cephalosporins</li>
            <li>Aspirin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * MobileNutritionSection — left overlay
 * Figma: meal tabs (left=63.52 top=99), food card (left=24 top=124)
 * Breakfast tab strip + Poha food card with half-moon image crop.
 * animDelay=150 ms — second group to appear.
 */
function MobileNutritionSection() {
  const anim = 'mobileCardSlideUp 0.5s cubic-bezier(0.34,1.56,0.64,1) 150ms both';
  return (
    <>
      {/* Meal tabs pill */}
      <div
        className="absolute opacity-90 overflow-hidden
                   flex items-center gap-[5.358px]
                   px-[10.717px] py-[5.358px] rounded-[10.717px]
                   bg-[rgba(255,255,255,0.6)]
                   text-[#008eb1] font-medium text-[5.358px] tracking-[0.087px]"
        style={{ left: '63.52px', top: '99px', width: '45.547px', height: '14.736px', animation: anim }}
      >
        <span className="whitespace-nowrap shrink-0">Breakfast</span>
        <span className="text-center" style={{ width: '26.123px' }}>Lunch</span>
        <span className="text-center" style={{ width: '26.123px' }}>Dinner</span>
      </div>

      {/* Separator line 1 */}
      <div
        className="absolute opacity-90"
        style={{
          left: '24px', top: '119.09px',
          width: '124.584px', height: '0.659px',
          background: 'rgba(0,65,114,0.15)',
          animation: anim,
        }}
      />

      {/* Breakfast food card */}
      <div
        className="absolute opacity-90 overflow-hidden
                   flex items-center
                   px-[8.038px] py-[5.358px] rounded-[10.717px]
                   bg-[rgba(255,255,255,0.6)]"
        style={{ left: '24px', top: '124.45px', width: '124.584px', height: '40.189px', animation: anim }}
      >
        {/* Text column */}
        <div className="flex flex-col gap-[5.358px] shrink-0 z-10 relative" style={{ width: '58.273px' }}>
          <span className="font-medium text-[5.358px] text-black tracking-[0.087px]">Poha</span>
          <span className="font-semibold text-[#008eb1] text-[8.038px] tracking-[0.130px] whitespace-nowrap leading-normal">
            320 KCAL
          </span>
        </div>

        {/* Food image — half-moon crop on right */}
        <div
          className="absolute right-0 overflow-hidden rounded-bl-[670px] rounded-tl-[670px]"
          style={{
            width: '67.316px',
            height: '78.368px',
            top: 'calc(50% + 2.01px)',
            transform: 'translateY(-50%)',
          }}
        >
          <img
            src={imgFood}
            alt="Poha"
            className="absolute object-cover"
            style={{ width: '106.16%', height: '128.36%', left: '-5.97%', top: '-37.52%' }}
          />
        </div>
      </div>

      {/* Separator line 2 */}
      <div
        className="absolute opacity-90"
        style={{
          left: '24px', top: '170px',
          width: '124.584px', height: '0.659px',
          background: 'rgba(0,65,114,0.15)',
          animation: anim,
        }}
      />
    </>
  );
}

/**
 * MobileHealthSyncCard — bottom-left, Auto Health Sync
 * Figma: left=30, top=197 — profile circular image + widget label
 * Reduced ~20 % from original Figma values for better visibility.
 * animDelay=300 ms — third group to appear.
 */
function MobileHealthSyncCard() {
  return (
    <div
      className="absolute flex flex-col gap-[3px] items-center"
      style={{
        left: '30px', top: '197px',
        animation: 'mobileCardSlideUp 0.5s cubic-bezier(0.34,1.56,0.64,1) 300ms both',
      }}
    >
      {/* Circular profile image — 65 × 67 px (was 80 × 82) */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{ width: '65px', height: '67px' }}
      >
        <img
          src={imgProfile}
          alt=""
          aria-hidden
          className="absolute object-cover"
          style={{ width: '103.6%', height: '104.36%', left: '-1.38%', top: '-1.91%' }}
        />
      </div>

      {/* Widget chip — 84 px wide (was 103) */}
      <div
        className="bg-[rgba(255,255,255,0.6)] flex flex-col items-center
                   overflow-hidden rounded-[7px]"
        style={{ width: '84px', padding: '3.5px 4px' }}
      >
        <span className="font-bold text-[#008eb1] text-[7px] tracking-[0.11px] whitespace-nowrap leading-normal">
          Auto Health Sync
        </span>
      </div>
    </div>
  );
}

/**
 * MobileHealthDevicesCard — bottom-left, Health Devices
 * Figma: left=9, top=343 — device image + widget label + subtitle
 * Reduced ~25 % from original Figma values so the card is fully visible
 * within the 510 px design-height canvas.
 * animDelay=450 ms — last card to appear (bottom-most).
 */
function MobileHealthDevicesCard() {
  return (
    <div
      className="absolute flex flex-col gap-[4px] items-center"
      style={{
        left: '9px', top: '343px',
        animation: 'mobileCardSlideUp 0.5s cubic-bezier(0.34,1.56,0.64,1) 450ms both',
      }}
    >
      {/* Devices image — natural aspect ratio, 88 px wide, full image visible */}
      <img
        src={imgDevices}
        alt=""
        aria-hidden
        className="shrink-0 object-contain"
        style={{ width: '88px', height: 'auto' }}
      />

      {/* Widget chip — 82 px wide (was 104) */}
      <div
        className="bg-[rgba(255,255,255,0.6)] flex flex-col gap-[4px] items-center
                   overflow-hidden rounded-[9px]"
        style={{ width: '82px', padding: '4.5px 5px' }}
      >
        <span className="font-bold text-[#008eb1] text-[7px] tracking-[0.11px] whitespace-nowrap leading-normal">
          Health Devices
        </span>
        <div className="font-semibold text-[#666] text-center text-[6.5px] tracking-[0.13px] leading-[1.5]">
          <p className="mb-0">Save more, same care</p>
          <p>at lower cost.</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main HeroSection
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const wrapperRef = useRef(null);

  const [scale, setScale] = useState(() =>
    typeof window !== 'undefined' ? Math.min(1, window.innerWidth / VISUAL_W) : 1
  );
  const [mobileScale, setMobileScale] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth / MOBILE_VISUAL_W : 1
  );
  const [isMobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.offsetWidth;
      setMobile(w < 768);
      setScale(Math.min(1, w / VISUAL_W));
      setMobileScale(w / MOBILE_VISUAL_W);
    };

    const ro = new ResizeObserver(update);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    update();
    return () => ro.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden font-inter">

      {/* ── Full-bleed background ── */}
      <img
        src={imgBg}
        alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* ── Measurement anchor (always rendered, drives both scale values) ── */}
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ height: isMobile ? 0 : `${VISUAL_H * scale}px` }}
        aria-hidden={isMobile}
      >
        {/* ── Desktop visual: phone + floating cards ── */}
        {!isMobile && (
          <div
            className="absolute top-0"
            style={{
              width: `${VISUAL_W}px`,
              height: `${VISUAL_H}px`,
              flexShrink: 0,
              left: '50%',
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Phone mockup */}
            <img
              src={imgPhone}
              alt="Total Care mobile app"
              className="absolute object-contain object-bottom pointer-events-none"
              style={{ left: '366.9px', top: '69.55px', width: '680.762px', height: '984.192px' }}
            />

            {/* Floating UI cards — staggered pop-in */}
            <RecordsCard       animDelay={0}   />
            <VitalsCard        animDelay={150} />
            <NutritionCard     animDelay={300} />
            <EmergencyCard     animDelay={450} />
            <HealthDevicesCard animDelay={600} />
            <HealthSyncCard    animDelay={750} />
          </div>
        )}
      </div>

      {/* ── Mobile visual: Figma frame 606:6436 ── */}
      {isMobile && (
        <div
          className="relative w-full overflow-hidden"
          style={{ height: `${MOBILE_VISUAL_H * mobileScale}px` }}
          aria-label="CureBay health dashboard preview"
        >
          <div
            className="absolute top-0 left-1/2"
            style={{
              width: `${MOBILE_VISUAL_W}px`,
              height: `${MOBILE_VISUAL_H}px`,
              transform: `translateX(-50%) scale(${mobileScale})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Phone mockup — z-index 1, behind floating cards */}
            <div
              className="absolute overflow-hidden"
              style={{ left: '127px', top: '175px', width: '275px', height: '397px', zIndex: 1 }}
            >
              <img
                src={imgPhone}
                alt="Total Care mobile app"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating overlay cards — z-index 2 */}
            <div className="absolute inset-0" style={{ zIndex: 2 }}>
              <MobileRecordsCard />
              <MobileNutritionSection />
              <MobileHealthSyncCard />
              <MobileHealthDevicesCard />
            </div>
          </div>
        </div>
      )}

      {/* ── Content: gradient fade + heading + CTAs ── */}
      {isMobile ? (

        /* ══════════════════════════════════════════════════════════════════
           MOBILE layout — Figma node 450:5281
           • px-6 (24 px) horizontal padding
           • gap-6 (24 px) between every child
           • "Total Care": 64 px Inter Black (900)
           • Subtitle: 16 px Bold, two lines, 24 px line-height, gradient
           • "View Plans": full-width h-10 solid blue pill
           • "How it works": full-width h-8 ghost text
        ══════════════════════════════════════════════════════════════════ */
        <div
          className="relative z-10 flex flex-col items-center gap-6 px-6 pb-12"
          style={{
            paddingTop: '24px',
            background: 'linear-gradient(to top, #ffffff 55.519%, rgba(255,255,255,0) 93.819%)',
          }}
        >
          {/* Heading group */}
          <div className="flex flex-col items-center gap-6 text-center w-full">

            {/* "Total Care" — Inter Black (900), responsive size, gradient image fill */}
            <h1
              className="font-inter leading-none tracking-[0] text-transparent
                         bg-clip-text bg-cover bg-center bg-no-repeat select-none"
              style={{
                backgroundImage: `url("${imgTitleFill}")`,
                fontSize: 'clamp(46px, 16vw, 64px)',
                fontWeight: 900,
              }}
            >
              Total Care
            </h1>

            {/* Subtitle — two explicit lines, 16 px Bold, 24 px leading, gradient */}
            <div
              className="font-inter font-bold text-transparent bg-clip-text text-center"
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.518px',
                backgroundImage:
                  'linear-gradient(to bottom, rgba(0,2,101,0.6), rgba(80,32,255,0.6))',
              }}
            >
              <p className="mb-0">Health Tracking meets</p>
              <p>Real world Healthcare</p>
            </div>
          </div>

          {/* "View Plans" — full-width, 40 px tall, solid blue */}
          <button
            type="button"
            className="relative w-full flex items-center justify-center
                       h-10 rounded-xl overflow-hidden
                       font-inter font-medium text-base text-white
                       tracking-[0.2592px] leading-none
                       drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                       active:opacity-90 transition-opacity duration-150"
          >
            <span aria-hidden className="absolute inset-0 bg-[#004172] rounded-xl" />
            <span aria-hidden className="absolute inset-0 rounded-xl shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
            <span className="relative">View Plans</span>
          </button>

          {/* "How it works" — full-width, 32 px tall, ghost (text only) */}
          <button
            type="button"
            className="w-full flex items-center justify-center
                       h-8 rounded-xl
                       font-inter font-medium text-base text-[#004172]
                       tracking-[0.2592px] leading-none
                       active:opacity-70 transition-opacity duration-150"
          >
            How it works
          </button>
        </div>

      ) : (

        /* ══════════════════════════════════════════════════════════════════
           DESKTOP layout — unchanged from original
        ══════════════════════════════════════════════════════════════════ */
        <div
          className="relative z-10 flex flex-col items-center gap-12 pb-12"
          style={{
            marginTop: '-220px',
            background: 'linear-gradient(to top, #ffffff 55.519%, rgba(255,255,255,0) 93.819%)',
            paddingTop: '220px',
          }}
        >
          {/* Heading block */}
          <div className="flex flex-col items-center gap-12 text-center px-4">
            <h1
              className="font-inter font-bold leading-none tracking-[0] text-transparent
                         bg-clip-text bg-cover bg-center bg-no-repeat select-none"
              style={{
                backgroundImage: `url("${imgTitleFill}")`,
                fontSize: 'clamp(56px, 9vw, 120px)',
              }}
            >
              Total Care
            </h1>
            <p
              className="font-inter font-bold leading-7 tracking-[0.5825px]
                         text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                backgroundImage:
                  'linear-gradient(to bottom, rgba(0,2,101,0.6), rgba(80,32,255,0.6))',
              }}
            >
              Health Tracking meets Real world Healthcare
            </p>
          </div>

          {/* CTA buttons — side by side */}
          <div className="flex gap-6 items-center flex-wrap justify-center">
            <button
              type="button"
              className="bg-[#004172] text-white font-inter font-medium text-base
                         leading-normal tracking-[0.2592px]
                         px-6 py-3 rounded-xl
                         drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                         shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                         hover:bg-[#00345b] transition-colors duration-150"
            >
              View Plans
            </button>
            <button
              type="button"
              className="text-[#004172] font-inter font-medium text-base
                         leading-normal tracking-[0.2592px]
                         px-4 py-3
                         hover:underline transition-all duration-150"
            >
              How it Works
            </button>
          </div>

          {/* QR code — xl only */}
          <QrCard />
        </div>

      )}
    </section>
  );
}
