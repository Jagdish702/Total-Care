import React, { useState, useEffect, useRef } from 'react';
import { CardDivider } from '../shared/CardPrimitives';

// ── Section background ─────────────────────────────────────────────────────
import bgHighlights from '../../assets/highlights/bg-highlights.png';

// ── Card photos ────────────────────────────────────────────────────────────
import card1 from '../../assets/highlights/card-1.jpg';
import card2 from '../../assets/highlights/card-2.jpg';
import card3 from '../../assets/highlights/card-3.jpg';
import card4 from '../../assets/highlights/card-4.jpg';
import card5 from '../../assets/highlights/card-5.jpg';
import card6 from '../../assets/highlights/card-6.jpg';
import foodPoha from '../../assets/highlights/food-poha.jpg';

// ── Overlay sparklines ─────────────────────────────────────────────────────
import chartWave1 from '../../assets/hero/icons/chart-heart.svg';
import chartWave2 from '../../assets/hero/icons/chart-generic.svg';

// ── New icons ──────────────────────────────────────────────────────────────
import icoRun     from '../../assets/highlights/ico-run.png';
import icoHomeLab from '../../assets/highlights/ico-home-lab.png';
import icoMedDel  from '../../assets/highlights/ico-med-del.png';
import icoCheck   from '../../assets/highlights/ico-check.png';

// ── Reused hero icons ──────────────────────────────────────────────────────
import icoRx       from '../../assets/hero/icons/ico-rx.svg';
import icoLab      from '../../assets/hero/icons/ico-lab.svg';
import icoAlergy   from '../../assets/hero/icons/ico-alergy.svg';
import icoHeart    from '../../assets/hero/icons/ico-heart.svg';
import icoGlucose  from '../../assets/hero/icons/ico-glucose.svg';
import icoPerson   from '../../assets/hero/icons/ico-person.svg';
import icoSleep    from '../../assets/hero/icons/ico-sleep.svg';
import icoAmbulance  from '../../assets/hero/icons/ico-ambulance.svg';
import icoConcierge  from '../../assets/hero/icons/ico-concierge.svg';
import icoContact    from '../../assets/hero/icons/ico-contact.svg';

// ── Scale-specific primitives ──────────────────────────────────────────────
// Card 1 uses a slightly larger scale (s = 1.05×); all others use standard.

function HTag({ icon, label, iconClass = 'w-[9.805px] h-[9.805px]' }) {
  return (
    <div className="flex items-center gap-[3.378px]">
      {icon && (
        <img src={icon} alt="" aria-hidden className={`${iconClass} object-contain flex-shrink-0`} />
      )}
      <span className="font-inter font-medium text-[11.21px] leading-[19.61px] tracking-[0.363px] text-[#008eb1] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function HTagLg({ icon, label }) {
  return (
    <div className="flex items-center gap-[5.282px]">
      {icon && (
        <img src={icon} alt="" aria-hidden className="w-[10.565px] h-[10.565px] object-contain flex-shrink-0" />
      )}
      <span className="font-inter font-medium text-[11.79px] leading-[20.625px] tracking-[0.382px] text-[#008eb1] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function HStat({ num, unit, numClass = 'text-[16.81px] tracking-[0.272px]', unitClass = 'text-[8.4px] leading-[14.007px] tracking-[0.272px]' }) {
  return (
    <div className="flex items-end gap-[3.378px] font-inter font-medium whitespace-nowrap">
      <span className={`leading-normal text-black ${numClass}`}>{num}</span>
      <span className={`text-[#4d4d4d] ${unitClass}`}>{unit}</span>
    </div>
  );
}

function HStatLg({ num, unit }) {
  return (
    <div className="flex items-end gap-[5.282px] font-inter font-medium whitespace-nowrap">
      <span className="text-[17.68px] leading-normal tracking-[0.286px] text-black">{num}</span>
      <span className="text-[8.84px] leading-[14.732px] tracking-[0.286px] text-[#4d4d4d]">{unit}</span>
    </div>
  );
}

function HPanel({ className = '', children, style }) {
  return (
    <div
      className={`relative rounded-[16.809px] drop-shadow-[0px_0.981px_4.905px_rgba(0,65,114,0.08)] ${className}`}
      style={style}
    >
      <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[16.809px]" />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0.981px_0px_rgba(0,65,114,0.12)]" />
      {children}
    </div>
  );
}

function HGradientPanel({ className = '', children }) {
  return (
    <div className={`relative rounded-[16.809px] drop-shadow-[0px_0.981px_4.905px_rgba(0,65,114,0.08)] ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-[16.809px]"
        style={{ background: 'radial-gradient(ellipse at center, #e8f1f8 0%, #ffffff 100%)' }}
      />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0.981px_0px_rgba(0,65,114,0.12)]" />
      {children}
    </div>
  );
}

function HOverlay({ children }) {
  return (
    <div className="relative opacity-80 flex flex-col gap-[8.404px] items-start p-[8.404px] rounded-[22.412px] shrink-0 w-full drop-shadow-[0px_1.401px_7.004px_rgba(0,65,114,0.08)]">
      <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[22.412px]" />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.401px_0px_rgba(0,65,114,0.12)]" />
      {children}
    </div>
  );
}

function PhotoCard({ src, alt, children, innerPadding = 'p-[16px]' }) {
  return (
    <div className="drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)] flex items-center justify-center w-[392px] h-[470px]">
      <div className={`relative flex flex-col items-center justify-end h-[447px] w-[360.269px] rounded-[35.582px] overflow-hidden ${innerPadding}`}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
        {children}
      </div>
    </div>
  );
}

function CardLabel({ children }) {
  return (
    <p className="font-inter font-medium text-[24px] leading-normal tracking-[0.389px] text-black text-center h-[59.671px] flex items-center justify-center">
      {children}
    </p>
  );
}

// ── Card overlay widgets ───────────────────────────────────────────────────

function RecordsOverlay() {
  return (
    <div className="relative opacity-80 flex flex-col gap-[8.839px] items-start p-[8.839px] rounded-[23.572px] shrink-0 w-full drop-shadow-[0px_1.473px_7.366px_rgba(0,65,114,0.08)]">
      <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[23.572px]" />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.473px_0px_rgba(0,65,114,0.12)]" />
      {/* Row 1: Prescriptions + Lab tests */}
      <div className="relative flex gap-[10.565px] items-start w-full">
        <div className="relative rounded-[17.679px] drop-shadow-[0px_1.085px_5.426px_rgba(0,65,114,0.08)] flex flex-1 items-center justify-between min-w-0 p-[11.786px]">
          <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[17.679px]" />
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.085px_0px_rgba(0,65,114,0.12)]" />
          <div className="relative flex flex-col gap-[11.786px] items-start">
            <HTagLg icon={icoRx} label="Prescriptions" />
            <HStatLg num="15" unit="Records" />
          </div>
        </div>
        <div className="relative rounded-[17.679px] drop-shadow-[0px_1.085px_5.426px_rgba(0,65,114,0.08)] flex flex-1 items-center justify-between min-w-0 p-[11.786px]">
          <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[17.679px]" />
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.085px_0px_rgba(0,65,114,0.12)]" />
          <div className="relative flex flex-col gap-[11.786px] items-start flex-1 min-w-0">
            <HTagLg icon={icoLab} label="Lab tests" />
            <HStatLg num="9" unit="Records" />
          </div>
        </div>
      </div>
      <CardDivider />
      {/* Row 2: Allergies */}
      <div className="relative rounded-[17.679px] drop-shadow-[0px_1.085px_5.426px_rgba(0,65,114,0.08)] flex items-end justify-between p-[11.786px] w-full">
        <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[17.679px]" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.085px_0px_rgba(0,65,114,0.12)]" />
        <div className="relative flex flex-col gap-[11.786px] items-start">
          <HTagLg icon={icoAlergy} label="Allergies" />
          <HStatLg num="4" unit="Records" />
        </div>
        <div className="relative font-inter font-medium text-[9.89px] leading-[16.482px] tracking-[0.32px] text-[#4d4d4d] flex gap-0 items-end whitespace-nowrap">
          <ul className="list-disc relative block shrink-0 ml-[14.835px]">
            <li className="mb-0">Penicillin</li>
            <li>Plant's oil (urushiol)</li>
          </ul>
          <ul className="list-disc relative block shrink-0 ml-[14.835px]">
            <li className="mb-0">Cephalosporins</li>
            <li>Aspirin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function VitalsOverlay() {
  return (
    <HOverlay>
      {/* Row 1: Heart Rate + Glucose */}
      <div className="relative flex gap-[10.045px] items-start w-full">
        <HPanel className="flex flex-1 items-center justify-between min-w-0 p-[11.206px]">
          <div className="relative flex flex-col gap-[11.206px] items-start">
            <HTag icon={icoHeart} label="Heart Rate" />
            <HStat num="98" unit="BPM" />
          </div>
          <img src={chartWave1} alt="" aria-hidden className="h-[5.081px] w-[30.247px] object-contain flex-shrink-0 relative" />
        </HPanel>
        <HPanel className="flex flex-1 items-center justify-between min-w-0 p-[11.206px]">
          <div className="relative flex flex-col gap-[11.206px] items-start">
            <HTag icon={icoGlucose} label="Glucose" />
            <HStat num="92" unit="mg/dL" />
          </div>
          <img src={chartWave2} alt="" aria-hidden className="h-[5.081px] w-[30.247px] object-contain flex-shrink-0 relative" />
        </HPanel>
      </div>
      <CardDivider />
      {/* Row 2: Blood pressure + Sleep */}
      <div className="relative flex gap-[10.045px] items-start w-full">
        <HPanel className="flex flex-1 items-center justify-between min-w-0 p-[11.206px]">
          <div className="relative flex flex-col gap-[11.206px] items-start">
            <HTag icon={icoPerson} label="Blood pressure" />
            <HStat num="98" unit="BPM" />
          </div>
          <img src={chartWave2} alt="" aria-hidden className="h-[5.081px] w-[30.247px] object-contain flex-shrink-0 relative" />
        </HPanel>
        <HPanel className="flex flex-1 items-center justify-between min-w-0 p-[11.206px]">
          <div className="relative flex flex-col gap-[11.206px] items-start">
            <HTag icon={icoSleep} label="Sleep" />
            <div className="flex items-end gap-[3.378px] font-inter font-medium whitespace-nowrap">
              <span className="text-[16.81px] leading-normal tracking-[0.272px] text-black">8</span>
              <span className="text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d]">Hr</span>
              <span className="text-[16.81px] leading-normal tracking-[0.272px] text-black">43</span>
              <span className="text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d]">Min</span>
            </div>
          </div>
          <img src={chartWave2} alt="" aria-hidden className="h-[5.081px] w-[30.247px] object-contain flex-shrink-0 relative" />
        </HPanel>
      </div>
      <CardDivider />
      <p className="relative font-inter font-medium text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d] text-center w-full">
        vitals synced from the devices
      </p>
    </HOverlay>
  );
}

function EmergencyOverlay() {
  return (
    <HOverlay>
      {/* Row 1: Ambulance + Concierge */}
      <div className="relative flex gap-[10.216px] items-start w-full">
        <HPanel className="flex flex-1 gap-0 items-start min-w-0 p-[11.206px]">
          <div className="relative flex flex-col gap-[11.206px] items-start">
            <HTag icon={icoAmbulance} label="Ambulance" />
            <HStat num="30" unit="mins to arrive" />
          </div>
        </HPanel>
        <HPanel className="flex flex-1 gap-0 items-start min-w-0 p-[11.206px]">
          <div className="relative flex flex-col gap-[11.206px] items-start">
            <HTag icon={icoConcierge} label="Concierge" iconClass="w-[12.187px] h-[10.216px]" />
            <HStat num="30" unit="mins to arrive" />
          </div>
        </HPanel>
      </div>
      <CardDivider />
      {/* Row 2: Emergency Contact + Call Now */}
      <HPanel className="flex gap-[11.206px] items-end p-[11.206px] w-full">
        <div className="relative flex flex-col gap-[11.206px] items-start">
          <HTag icon={icoContact} label="Emergency Contact" />
          <div className="relative flex flex-col gap-[11.555px] font-inter font-medium">
            <span className="text-[16.81px] leading-normal tracking-[0.272px] text-black">Aaditya</span>
            <span className="text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d]">Son</span>
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center h-[38.518px] min-w-0 px-[15.407px] py-[7.704px] rounded-[11.555px] drop-shadow-[0px_1.926px_1.926px_rgba(0,65,114,0.08)]">
          <div aria-hidden className="absolute bg-[#edf9ff] inset-0 pointer-events-none rounded-[11.555px]" />
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.926px_0px_rgba(0,65,114,0.08)]" />
          <span className="relative font-inter font-medium text-[15.41px] leading-normal tracking-[0.25px] text-[#d82525] whitespace-nowrap">Call Now</span>
        </div>
      </HPanel>
    </HOverlay>
  );
}

function NutritionOverlay() {
  return (
    <div className="relative flex flex-col gap-[7.962px] items-center shrink-0 w-[252.133px] drop-shadow-[0px_1.401px_7.004px_rgba(0,65,114,0.08)]">
      {/* Breakfast tab */}
      <div className="relative flex items-center justify-center h-[29.637px] w-full rounded-[16.809px] drop-shadow-[0px_0.981px_4.905px_rgba(0,65,114,0.08)] shrink-0">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[16.809px]" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0.981px_0px_rgba(0,65,114,0.12),inset_0px_0px_1.401px_0px_rgba(0,65,114,0.12)]" />
        <span className="relative font-inter font-medium text-[11.21px] leading-[19.61px] tracking-[0.363px] text-[#008eb1] whitespace-nowrap">Breakfast</span>
      </div>
      <CardDivider />
      {/* Food item */}
      <div className="relative flex items-center overflow-hidden h-[79.621px] w-full rounded-[16.809px] shadow-[0px_0.981px_9.81px_0px_rgba(0,65,114,0.08)] shrink-0">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[16.809px]" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0.981px_0px_rgba(0,65,114,0.12),inset_0px_0px_1.401px_0px_rgba(0,65,114,0.12)]" />
        <div className="relative flex flex-col gap-[10.616px] p-[16.809px] z-10 w-[92.227px]">
          <span className="font-inter font-medium text-[11.21px] leading-[19.61px] tracking-[0.363px] text-[#008eb1]">Poha</span>
          <HStat num="320" unit="KCAL" />
        </div>
        <div
          className="absolute right-0 h-[155.261px] w-[133.365px] overflow-hidden rounded-bl-[1327.013px] rounded-tl-[1327.013px]"
          style={{ top: 'calc(50% + 3.98px)', transform: 'translateY(-50%)' }}
        >
          <img src={foodPoha} alt="Poha" className="w-full h-full object-cover" />
        </div>
      </div>
      <CardDivider />
      {/* Recommendation */}
      <div className="relative flex flex-col gap-[16.809px] p-[16.809px] w-full rounded-[16.809px] drop-shadow-[0px_0.981px_4.905px_rgba(0,65,114,0.08)] shrink-0">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[16.809px]" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0.981px_0px_rgba(0,65,114,0.12),inset_0px_0px_1.401px_0px_rgba(0,65,114,0.12)]" />
        <span className="relative font-inter font-medium text-[11.21px] leading-[19.61px] tracking-[0.363px] text-[#008eb1] whitespace-nowrap">Low Oil Recommended</span>
        <span className="relative font-inter font-medium text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d] whitespace-nowrap">Keep peanuts light. Add veggies for fiber.</span>
      </div>
    </div>
  );
}

function ExerciseOverlay() {
  return (
    <div className="relative flex flex-col gap-[14.243px] items-start shrink-0 w-full drop-shadow-[0px_1.401px_7.004px_rgba(0,65,114,0.08)]">
      {/* 5km Run panel */}
      <div className="relative flex flex-col gap-[16.809px] items-start p-[16.809px] rounded-[16.809px] shrink-0 w-full drop-shadow-[0px_0.981px_4.905px_rgba(0,65,114,0.08)]">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[16.809px]" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0.981px_0px_rgba(0,65,114,0.12),inset_0px_0px_1.401px_0px_rgba(0,65,114,0.12)]" />
        <div className="relative flex gap-[4.217px] items-center">
          <img src={icoRun} alt="" aria-hidden className="w-[8.435px] h-[8.435px] object-contain flex-shrink-0" />
          <span className="font-inter font-medium text-[11.21px] leading-[19.61px] tracking-[0.363px] text-[#008eb1] whitespace-nowrap">5km Run</span>
        </div>
        <div className="relative flex flex-wrap gap-[2.801px] items-end font-inter font-medium whitespace-nowrap">
          <span className="text-[16.81px] leading-normal tracking-[0.272px] text-black">40%</span>
          <span className="text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d]">remaining today</span>
        </div>
      </div>
      <CardDivider />
      {/* Auto Health Sync panel */}
      <div className="relative flex flex-col gap-[16.809px] items-start overflow-clip p-[16.809px] rounded-[16.809px] shadow-[0px_0.981px_9.81px_0px_rgba(0,65,114,0.08)] shrink-0 w-full">
        <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[16.809px]" />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0.981px_0px_rgba(0,65,114,0.12),inset_0px_0px_1.401px_0px_rgba(0,65,114,0.12)]" />
        <span className="relative font-inter font-medium text-[11.21px] leading-[19.61px] tracking-[0.363px] text-[#008eb1] whitespace-nowrap">Auto Health Sync</span>
        <span className="relative font-inter font-medium text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d]">
          Connect Apple / Google Health connect for real-time tracking, no manual input.
        </span>
      </div>
    </div>
  );
}

function LabOverlay() {
  return (
    <div className="relative opacity-80 flex flex-col gap-[10.045px] items-start p-[10.045px] rounded-[22.412px] shrink-0 w-full drop-shadow-[0px_1.401px_7.004px_rgba(0,65,114,0.08)]">
      <div aria-hidden className="absolute bg-[rgba(255,255,255,0.8)] inset-0 pointer-events-none rounded-[22.412px]" />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_1.401px_0px_rgba(0,65,114,0.12)]" />
      {/* Home sample collection */}
      <HGradientPanel className="flex flex-col gap-[11.206px] items-start p-[11.206px] shrink-0 w-full">
        <div className="relative flex gap-[5.42px] items-center w-full">
          <img src={icoHomeLab} alt="" aria-hidden className="w-[10.84px] h-[10.84px] object-contain flex-shrink-0" />
          <span className="flex-1 min-w-0 font-inter font-medium text-[11.21px] leading-[19.61px] tracking-[0.363px] text-[#008eb1]">
            Home sample collection
          </span>
        </div>
        <div className="relative flex gap-[5.42px] items-end font-inter font-medium whitespace-nowrap">
          <span className="text-[16.81px] leading-normal tracking-[0.272px] text-black">3</span>
          <span className="text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d]">hrs remaining for HbaC test</span>
        </div>
      </HGradientPanel>
      {/* Medicines Delivery */}
      <HGradientPanel className="flex flex-col gap-[11.206px] items-start p-[11.206px] shrink-0 w-full">
        <div className="relative flex gap-[5.42px] items-center">
          <img src={icoMedDel} alt="" aria-hidden className="w-[11.206px] h-[11.206px] object-contain flex-shrink-0" />
          <span className="font-inter font-medium text-[11.21px] leading-[19.61px] tracking-[0.363px] text-[#008eb1] whitespace-nowrap">
            Medicines Delivery in
          </span>
        </div>
        <div className="relative flex gap-[5.42px] items-end font-inter font-medium whitespace-nowrap">
          <span className="text-[16.81px] leading-normal tracking-[0.272px] text-black">2</span>
          <span className="text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d]">hrs</span>
          <span className="text-[16.81px] leading-normal tracking-[0.272px] text-black">58</span>
          <span className="text-[8.4px] leading-[14.007px] tracking-[0.272px] text-[#4d4d4d]">mins</span>
        </div>
      </HGradientPanel>
      <CardDivider />
      {/* Certified Labs */}
      <HGradientPanel className="flex gap-[11.206px] items-center p-[11.206px] shrink-0 w-full">
        <img src={icoCheck} alt="" aria-hidden className="w-[16.261px] h-[16.261px] object-contain flex-shrink-0 relative" />
        <span className="relative font-inter font-medium text-[11.21px] leading-[19.61px] tracking-[0.363px] text-[#008eb1] whitespace-nowrap">
          Certified Labs &amp; safe handling
        </span>
      </HGradientPanel>
    </div>
  );
}

// ── Mobile section — Figma node 1150:12785 ────────────────────────────────
// Strategy: same overlay components as desktop, CSS-transform scaled to fit
// each column width — identical to how HeroSection handles its mobile visual.

// Desktop PhotoCard inner dimensions (source of truth for scale math)
const CARD_INNER_W = 360.269;
const CARD_INNER_H = 447;

// Per-card config — photo, label, padding matches desktop PhotoCard, overlay
const MOBILE_CARD_DATA = [
  { src: card1, alt: 'Doctor consultation',     label: 'Doctor Consultation',             padX: 16,     padY: 16,     Overlay: RecordsOverlay   },
  { src: card2, alt: 'AI health companion',     label: 'AI Health Companion',             padX: 16,     padY: 16,     Overlay: VitalsOverlay    },
  { src: card3, alt: 'Emergency services',      label: 'Concierge &\nEmergency Services', padX: 16,     padY: 16,     Overlay: EmergencyOverlay },
  { src: card4, alt: 'Smart diet plan',         label: 'Smart Diet Plan',                 padX: 17.791, padY: 35.582, Overlay: NutritionOverlay },
  { src: card5, alt: 'Device integrations',     label: 'Device Integrations',             padX: 24,     padY: 24,     Overlay: ExerciseOverlay  },
  { src: card6, alt: 'Medicines and lab tests', label: 'Medicines & Lab Tests',           padX: 24,     padY: 24,     Overlay: LabOverlay       },
];

function MobileHighlightSection() {
  const gridRef = useRef(null);

  // Initial scale estimate: (vw - 2×px-6 - gap-x-3) / 2 / CARD_INNER_W
  const [cardScale, setCardScale] = useState(() => {
    if (typeof window === 'undefined') return 0.47;
    return (window.innerWidth - 60) / 2 / CARD_INNER_W;
  });

  useEffect(() => {
    const update = () => {
      if (!gridRef.current) return;
      // grid is px-6 (48 px total) + gap-x-3 (12 px between cols) → each col = (W-12)/2
      const colW = (gridRef.current.offsetWidth - 12) / 2;
      setCardScale(colW / CARD_INNER_W);
    };
    const ro = new ResizeObserver(update);
    if (gridRef.current) ro.observe(gridRef.current);
    update();
    return () => ro.disconnect();
  }, []);

  const cardH = CARD_INNER_H * cardScale;

  return (
    <section
      className="relative flex flex-col gap-12 items-center px-6 py-12 overflow-hidden font-inter"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #ffffff 0%, #ebf8f3 100%)' }}
    >
      {/* ── Heading group ── */}
      <div className="flex flex-col items-center gap-6 w-full text-center">

        {/* "Highlights of your every health moment." — green, 20 px, medium */}
        <p
          className="font-medium leading-7 whitespace-pre-line"
          style={{ fontSize: '20px', letterSpacing: '0.324px', color: '#00B82E' }}
        >
          {'Highlights of your \nevery health moment.'}
        </p>

        {/* "The Ecosystem" — black, 48 px, bold */}
        <h2
          className="font-bold text-black leading-none"
          style={{ fontSize: '48px' }}
        >
          The Ecosystem
        </h2>
      </div>

      {/* ── 2-column card grid ── */}
      <div ref={gridRef} className="grid grid-cols-2 gap-x-3 gap-y-6 w-full">
        {MOBILE_CARD_DATA.map(({ src, alt, label, padX, padY, Overlay }, idx) => (
          <div key={idx} className="flex flex-col items-center gap-[11px]">

            {/* ── Scaled card frame ──
                Outer: visible size (col width × cardH), overflow-hidden clips inner.
                Inner: full desktop size (CARD_INNER_W × CARD_INNER_H), scaled down.
                Result: identical overlay widgets, just smaller — no re-coding needed. */}
            <div
              className="relative overflow-hidden rounded-[17px] w-full
                         drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]"
              style={{ height: `${cardH}px` }}
            >
              {/* Inner canvas — Figma/desktop pixel dimensions, scaled to column */}
              <div
                className="absolute top-0 left-0 flex flex-col items-center justify-end"
                style={{
                  width:         `${CARD_INNER_W}px`,
                  height:        `${CARD_INNER_H}px`,
                  transform:     `scale(${cardScale})`,
                  transformOrigin: 'top left',
                  paddingTop:    `${padY}px`,
                  paddingBottom: `${padY}px`,
                  paddingLeft:   `${padX}px`,
                  paddingRight:  `${padX}px`,
                }}
              >
                {/* Photo background */}
                <img
                  src={src}
                  alt={alt}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />
                {/* Inset border shadow (matches desktop PhotoCard) */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
                {/* Overlay widget — same component as desktop */}
                <Overlay />
              </div>
            </div>

            {/* Label */}
            <p
              className="font-medium text-black text-center leading-5 whitespace-pre-line"
              style={{ fontSize: '12px', letterSpacing: '0.388px' }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Main section ───────────────────────────────────────────────────────────

export default function HighlightSection() {
  const [isMobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ── Mobile ── */
  if (isMobile) return <MobileHighlightSection />;

  /* ── Desktop ── */
  return (
    <section className="relative flex flex-col gap-[60px] items-center px-[120px] xl:px-[120px] lg:px-16 md:px-8 sm:px-4 py-[120px] lg:py-16 overflow-hidden">
      <img
        src={bgHighlights}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* Heading */}
      <div className="relative flex flex-col gap-[48px] items-center shrink-0 z-10">
        <h2 className="font-inter font-bold text-[88px] lg:text-[64px] md:text-[48px] sm:text-[36px] leading-normal text-black text-center whitespace-pre-line">
          {'Your Wearables, \nOur Ecosystem'}
        </h2>
      </div>

      {/* 3×2 card grid */}
      <div className="relative z-10 grid grid-cols-3 gap-x-[48px] gap-y-[48px] justify-items-center">

        <div className="flex flex-col gap-[24px] items-center">
          <PhotoCard src={card1} alt="Doctor consultation">
            <RecordsOverlay />
          </PhotoCard>
          <CardLabel>Doctor Consultation</CardLabel>
        </div>

        <div className="flex flex-col gap-[24px] items-center">
          <PhotoCard src={card2} alt="AI health companion">
            <VitalsOverlay />
          </PhotoCard>
          <CardLabel>AI Health Companion</CardLabel>
        </div>

        <div className="flex flex-col gap-[24px] items-center">
          <PhotoCard src={card3} alt="Emergency services">
            <EmergencyOverlay />
          </PhotoCard>
          <CardLabel>{'Concierge &\nEmergency Services'}</CardLabel>
        </div>

        <div className="flex flex-col gap-[24px] items-center">
          <PhotoCard src={card4} alt="Smart diet plan" innerPadding="px-[17.791px] py-[35.582px]">
            <NutritionOverlay />
          </PhotoCard>
          <CardLabel>Smart Diet Plan</CardLabel>
        </div>

        <div className="flex flex-col gap-[24px] items-center">
          <PhotoCard src={card5} alt="Exercise plans and tracking" innerPadding="p-[24px]">
            <ExerciseOverlay />
          </PhotoCard>
          <CardLabel>Exercise Plans &amp; Tracking</CardLabel>
        </div>

        <div className="flex flex-col gap-[24px] items-center">
          <PhotoCard src={card6} alt="Medicines and lab tests" innerPadding="p-[24px]">
            <LabOverlay />
          </PhotoCard>
          <CardLabel>Medicines &amp; Lab Tests</CardLabel>
        </div>

      </div>
    </section>
  );
}
