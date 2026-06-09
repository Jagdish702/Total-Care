import React, { useState, useRef, useEffect } from 'react';
import { CardDivider } from '../shared/CardPrimitives';

// ── Card background photos ─────────────────────────────────────────────────
import careCard1    from '../../assets/care/care-card-1.jpg';
import careCard1b   from '../../assets/care/care-card-1b.jpg';
import careCard2    from '../../assets/care/care-card-2.jpg';
import careCard3    from '../../assets/care/care-card-3.jpg';
import careCard4    from '../../assets/care/care-card-4.jpg';
import careCard5    from '../../assets/care/care-card-5.jpg';
import careCard5Exp from '../../assets/care/care-card-5-exp.jpg';
import careCard6a   from '../../assets/care/care-card-6a.jpg';
import careCard6b   from '../../assets/care/care-card-6b.jpg';
import careCard6Exp from '../../assets/care/care-card-6-exp.jpg';
// Doctor card – expanded state backgrounds + testimonial
import careCard1Ex1    from '../../assets/care/care-card-1-exp1.jpg';
import careCard1Ex2    from '../../assets/care/care-card-1-exp2.jpg';
import careTestimonial from '../../assets/care/care-testimonial.jpg';
// Testimonial photos for new cards
import careTestimonialAjay   from '../../assets/care/care-testimonial-ajay.jpg';
import careTestimonialSunita from '../../assets/care/care-testimonial-sunita.jpg';
import careTestimonialAjay2  from '../../assets/care/care-testimonial-ajay2.jpg';
import careTestimonialVikas  from '../../assets/care/care-testimonial-vikas.jpg';
import careTestimonialRuchi  from '../../assets/care/care-testimonial-ruchi.jpg';
// Diet & device panel assets
import careDietFood      from '../../assets/care/care-diet-food.jpg';
import careDeviceDiagram from '../../assets/care/care-device-diagram.png';
// User-supplied card backgrounds
import card2Exp     from '../../assets/care/2nd card expand.png';
import card4Exp     from '../../assets/care/4th card expand.png';
import card6Default from '../../assets/care/6th card default.png';
import card6Expand  from '../../assets/care/6th card expand.png';

// ── Card chip icons ────────────────────────────────────────────────────────
import icoDoctor    from '../../assets/care/doctor.svg';
import icoAi        from '../../assets/care/ai.svg';
import icoConcierge from '../../assets/care/concierge.svg';
import icoDiet      from '../../assets/care/diet.svg';
import icoDevice    from '../../assets/care/device.svg';
import icoMedicine  from '../../assets/care/medicine.svg';

// ── UI icons ───────────────────────────────────────────────────────────────
import icoPlus       from '../../assets/care/care-ico-plus.svg';
import icoClose      from '../../assets/care/care-ico-close.svg';
import icoArrowLeft  from '../../assets/care/care-ico-arrow-left.svg';
import icoArrowRight from '../../assets/care/care-ico-arrow-right.svg';

// ── Hero icons reused inside expanded panels ───────────────────────────────
import icoRx         from '../../assets/hero/icons/ico-rx.svg';
import icoLab        from '../../assets/hero/icons/ico-lab.svg';
import icoAlergy     from '../../assets/hero/icons/ico-alergy.svg';
import icoHeart      from '../../assets/hero/icons/ico-heart.svg';
import icoGlucose    from '../../assets/hero/icons/ico-glucose.svg';
import icoPerson     from '../../assets/hero/icons/ico-person.svg';
import icoSleep      from '../../assets/hero/icons/ico-sleep.svg';
import icoAmbulance  from '../../assets/hero/icons/ico-ambulance.svg';
import icoHConcierge from '../../assets/hero/icons/ico-concierge.svg';
import icoContact    from '../../assets/hero/icons/ico-contact.svg';
import chartHeart    from '../../assets/hero/icons/chart-heart.svg';
import chartLine     from '../../assets/hero/icons/chart-generic.svg';

// ── Gradient overlays ──────────────────────────────────────────────────────
const GRAD_COLLAPSED = {
  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 41.25%, rgba(0,0,0,0.4) 64.66%, rgba(0,0,0,0.8) 100%)',
};
const GRAD_EXPANDED = {
  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 35.063%, rgba(0,0,0,0.64) 60.94%, rgba(0,0,0,0.8) 100%)',
};

// ── Expanded-panel primitives ──────────────────────────────────────────────

function EGlassOuter({ children }) {
  return (
    <div className="relative w-[460px] rounded-[32px] drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]">
      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px] bg-[rgba(255,255,255,0.8)]" />
      <div className="absolute inset-0 pointer-events-none rounded-[32px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
      <div className="relative p-[8px] flex flex-col gap-[8px]">{children}</div>
    </div>
  );
}

function EStatPanel({ className = '', children }) {
  return (
    <div className={`relative rounded-[24px] drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)] p-[10px] ${className}`}>
      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[24px] bg-white" />
      <div className="absolute inset-0 pointer-events-none rounded-[24px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function ETag({ icon, label }) {
  return (
    <div className="flex items-center gap-[7px]">
      <img src={icon} alt="" aria-hidden className="flex-shrink-0 w-[14px] h-[14px] object-contain" />
      <span className="font-inter font-medium text-[14px] leading-[20px] tracking-[0.45px] text-[#008eb1] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function EStat({ num, unit }) {
  return (
    <div className="flex items-end gap-[6px]">
      <span className="font-inter font-medium text-[20px] leading-normal tracking-[0.32px] text-black whitespace-nowrap">
        {num}
      </span>
      <span className="font-inter font-medium text-[11px] leading-[18px] tracking-[0.35px] text-[#4d4d4d] whitespace-nowrap">
        {unit}
      </span>
    </div>
  );
}

function ESparkline({ src }) {
  return (
    <img src={src} alt="" aria-hidden className="flex-shrink-0 h-[6px] w-[36px] object-contain self-end" />
  );
}

function EChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M5 3L9 7L5 11" stroke="#4d4d4d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Shared testimonial card ────────────────────────────────────────────────

function ETestimonial({ photo, name, badge, quote }) {
  return (
    <div className="relative rounded-[32px] p-[12px] flex gap-[12px] items-start drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)] w-full">
      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px] bg-[rgba(255,255,255,0.8)]" />
      <div className="absolute inset-0 pointer-events-none rounded-[32px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />

      <div className="relative flex flex-col gap-[6px] items-center shrink-0 w-[80px]">
        <div className="relative w-full aspect-square rounded-[12px] overflow-hidden drop-shadow-[0px_2px_4px_rgba(0,65,114,0.08)]">
          <img src={photo} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 pointer-events-none rounded-[12px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
        </div>
        <p className="font-inter font-medium text-[11px] leading-[16px] tracking-[0.35px] text-[#808080] text-center">
          {name}
        </p>
      </div>

      <div className="relative flex flex-1 flex-col gap-[5px] min-w-0">
        <div className="relative self-start rounded-[12px] px-[8px] py-[4px] drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px] bg-[rgba(255,255,255,0.8)]" />
          <div className="absolute inset-0 pointer-events-none rounded-[12px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
          <span className="relative font-inter font-medium text-[11px] leading-[18px] tracking-[0.35px] text-[#d29300] whitespace-nowrap">
            {badge}
          </span>
        </div>
        <span className="font-serif text-[22px] leading-none text-[#d29300] select-none" aria-hidden>&ldquo;</span>
        <p className="font-inter italic text-[12px] leading-snug tracking-[0.38px] text-black">{quote}</p>
        <span className="font-serif text-[22px] leading-none text-[#d29300] select-none self-end rotate-180" aria-hidden>&ldquo;</span>
      </div>
    </div>
  );
}

// ── Shared vitals panel (Doctor + Concierge) ───────────────────────────────

function EVitalsGroup() {
  return (
    <EGlassOuter>
      <div className="flex gap-[8px]">
        <EStatPanel className="flex-1">
          <div className="flex flex-col gap-[8px]">
            <ETag icon={icoHeart} label="Heart Rate" />
            <div className="flex items-end justify-between">
              <EStat num="98" unit="BPM" />
              <ESparkline src={chartHeart} />
            </div>
          </div>
        </EStatPanel>
        <EStatPanel className="flex-1">
          <div className="flex flex-col gap-[8px]">
            <ETag icon={icoGlucose} label="Glucose" />
            <div className="flex items-end justify-between">
              <EStat num="92" unit="mg/dL" />
              <ESparkline src={chartLine} />
            </div>
          </div>
        </EStatPanel>
      </div>

      <CardDivider />

      <div className="flex gap-[8px]">
        <EStatPanel className="flex-1">
          <div className="flex flex-col gap-[8px]">
            <ETag icon={icoPerson} label="Blood pressure" />
            <div className="flex items-end justify-between">
              <EStat num="98" unit="BPM" />
              <ESparkline src={chartLine} />
            </div>
          </div>
        </EStatPanel>
        <EStatPanel className="flex-1">
          <div className="flex flex-col gap-[8px]">
            <ETag icon={icoSleep} label="Sleep" />
            <div className="flex items-end justify-between">
              <div className="flex items-end gap-[3px]">
                <span className="font-inter font-medium text-[20px] leading-normal text-black">8</span>
                <span className="font-inter font-medium text-[11px] leading-[18px] text-[#4d4d4d]">Hr</span>
                <span className="font-inter font-medium text-[20px] leading-normal text-black">43</span>
                <span className="font-inter font-medium text-[11px] leading-[18px] text-[#4d4d4d]">Min</span>
              </div>
              <ESparkline src={chartLine} />
            </div>
          </div>
        </EStatPanel>
      </div>

      <CardDivider />

      <p className="font-inter font-medium text-[11px] leading-[16px] tracking-[0.35px] text-[#4d4d4d] text-center">
        vitals synced from the devices
      </p>
    </EGlassOuter>
  );
}

// ── Doctor expanded panel group ────────────────────────────────────────────

function DoctorExpandedPanels() {
  return (
    <div className="flex flex-col gap-[8px] w-[460px]">

      {/* Testimonial */}
      <div className="relative rounded-[32px] p-[12px] flex gap-[12px] items-start drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]">
        <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[32px] bg-[rgba(255,255,255,0.8)]" />
        <div className="absolute inset-0 pointer-events-none rounded-[32px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />

        <div className="relative flex flex-col gap-[6px] items-center shrink-0">
          <div className="relative size-[80px] rounded-[12px] overflow-hidden drop-shadow-[0px_2px_4px_rgba(0,65,114,0.08)]">
            <img src={careTestimonial} alt="Kartik Varma" className="w-full h-full object-cover" />
            <div className="absolute inset-0 pointer-events-none rounded-[12px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
          </div>
          <p className="font-inter font-medium text-[11px] leading-[16px] tracking-[0.35px] text-[#808080] text-center">
            Kartik Varma
          </p>
        </div>

        <div className="relative flex flex-1 flex-col gap-[5px] min-w-0">
          <div className="relative self-start rounded-[12px] px-[8px] py-[4px] drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]">
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px] bg-[rgba(255,255,255,0.8)]" />
            <div className="absolute inset-0 pointer-events-none rounded-[12px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
            <span className="relative font-inter font-medium text-[11px] leading-[18px] tracking-[0.35px] text-[#d29300] whitespace-nowrap">
              Specialist Consultation
            </span>
          </div>
          <span className="font-serif text-[22px] leading-none text-[#d29300] select-none" aria-hidden>&ldquo;</span>
          <p className="font-inter italic text-[12px] leading-snug tracking-[0.38px] text-black">
            TotalCare and Dr.Neha Joshi came to my life as my god's angles, making my life healthier one click away
          </p>
          <span className="font-serif text-[22px] leading-none text-[#d29300] select-none self-end rotate-180" aria-hidden>&ldquo;</span>
        </div>
      </div>

      {/* Records panel */}
      <EGlassOuter>
        <div className="flex gap-[8px]">
          <EStatPanel className="flex-1">
            <div className="flex flex-col gap-[8px]">
              <ETag icon={icoRx} label="Prescriptions" />
              <div className="flex items-end justify-between">
                <EStat num="15" unit="Records" />
                <EChevron />
              </div>
            </div>
          </EStatPanel>
          <EStatPanel className="flex-1">
            <div className="flex flex-col gap-[8px]">
              <ETag icon={icoLab} label="Lab tests" />
              <div className="flex items-end justify-between">
                <EStat num="9" unit="Records" />
                <EChevron />
              </div>
            </div>
          </EStatPanel>
        </div>

        <CardDivider />

        <EStatPanel>
          <div className="flex items-start justify-between gap-[8px]">
            <div className="flex flex-col gap-[8px] shrink-0">
              <ETag icon={icoAlergy} label="Allergies" />
              <EStat num="4" unit="Records" />
            </div>
            <div className="flex gap-[14px]">
              <ul className="font-inter font-medium text-[11px] leading-[18px] tracking-[0.35px] text-[#4d4d4d] list-disc ml-[14px]">
                <li>Penicillin</li>
                <li>Plant's oil</li>
              </ul>
              <ul className="font-inter font-medium text-[11px] leading-[18px] tracking-[0.35px] text-[#4d4d4d] list-disc ml-[14px]">
                <li>Cephalosporins</li>
                <li>Aspirin</li>
              </ul>
            </div>
          </div>
        </EStatPanel>
      </EGlassOuter>

      {/* Vitals */}
      <EVitalsGroup />
    </div>
  );
}

// ── AI Health Companion expanded panels ────────────────────────────────────

function AiExpandedPanels() {
  return (
    <div className="flex flex-col gap-[8px] w-[460px]">
      <ETestimonial
        photo={careTestimonialAjay}
        name="Ajay Dogra"
        badge="AI powered Health Tracking"
        quote="TotalCare's AI is basically a divine protector for my vitals. It's like having a guardian angel who also happens to be a data scientist."
      />

      <EGlassOuter>
        <div className="flex gap-[8px]">
          {/* 5km Run */}
          <EStatPanel className="flex-1">
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[7px]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="flex-shrink-0 w-[14px] h-[14px]">
                  <circle cx="8.5" cy="1.5" r="1.5" fill="#008eb1" />
                  <path d="M5.5 4.5l2.5-1 .8 2.5-2 1.5-.8 3" stroke="#008eb1" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.5 10.5l.8-2.5 1.7.8" stroke="#008eb1" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-inter font-medium text-[14px] leading-[20px] tracking-[0.45px] text-[#008eb1] whitespace-nowrap">5km Run</span>
              </div>
              <EStat num="40%" unit="remaining today" />
            </div>
          </EStatPanel>
          {/* Exercise Minutes */}
          <EStatPanel className="flex-1">
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[7px]">
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden className="flex-shrink-0 w-[14px] h-[14px]">
                  <path d="M5 1C5 1 1.5 5 1.5 8a3.5 3.5 0 007 0C8.5 6 7 3.5 6 3c0 1.5-.5 2.5-1.5 3C4 5.5 5 2.5 5 1z" fill="#008eb1" />
                </svg>
                <span className="font-inter font-medium text-[14px] leading-[20px] tracking-[0.45px] text-[#008eb1] whitespace-nowrap">Exercise Minutes</span>
              </div>
              <EStat num="29" unit="mins left" />
            </div>
          </EStatPanel>
        </div>

        <CardDivider />

        {/* Water */}
        <EStatPanel>
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[7px]">
              <svg width="10" height="13" viewBox="0 0 10 13" fill="none" aria-hidden className="flex-shrink-0 w-[14px] h-[14px]">
                <path d="M5 0.5L0.5 7a4.5 4.5 0 009 0L5 0.5z" fill="#008eb1" />
              </svg>
              <span className="font-inter font-medium text-[14px] leading-[20px] tracking-[0.45px] text-[#008eb1] whitespace-nowrap">Water</span>
            </div>
            <EStat num="150–250" unit="ml drink now" />
          </div>
        </EStatPanel>
      </EGlassOuter>
    </div>
  );
}

// ── Concierge & Emergency expanded panels ─────────────────────────────────

function ConciergeExpandedPanels() {
  return (
    <div className="flex flex-col gap-[8px] w-[460px]">
      <ETestimonial
        photo={careTestimonialSunita}
        name="Sunita Sharma"
        badge="Ambulance Services"
        quote="As someone who stays on top of their health, TotalCare adds a layer of reassurance I didn't know I needed."
      />

      {/* Emergency dispatch panel */}
      <EGlassOuter>
        <div className="flex gap-[8px]">
          <EStatPanel className="flex-1">
            <div className="flex flex-col gap-[8px]">
              <ETag icon={icoAmbulance} label="Ambulance" />
              <EStat num="30" unit="mins to arrive" />
            </div>
          </EStatPanel>
          <EStatPanel className="flex-1">
            <div className="flex flex-col gap-[8px]">
              <ETag icon={icoHConcierge} label="Concierge" />
              <EStat num="30" unit="mins to arrive" />
            </div>
          </EStatPanel>
        </div>

        <CardDivider />

        <EStatPanel>
          <div className="flex items-end justify-between gap-[8px]">
            <div className="flex flex-col gap-[8px] shrink-0">
              <ETag icon={icoContact} label="Emergency Contact" />
              <div>
                <p className="font-inter font-medium text-[20px] leading-normal text-black">Aaditya</p>
                <p className="font-inter font-medium text-[11px] leading-[18px] text-[#4d4d4d]">Son</p>
              </div>
            </div>
            <div className="relative rounded-[16px] px-[22px] py-[11px] drop-shadow-[0px_2.75px_2.75px_rgba(0,65,114,0.08)] flex-shrink-0">
              <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[16px] bg-[#edf9ff]" />
              <div className="absolute inset-0 pointer-events-none rounded-[16px] shadow-[inset_0px_0px_2.75px_0px_rgba(0,65,114,0.08)]" />
              <span className="relative font-inter font-medium text-[20px] leading-none tracking-[0.356px] text-[#d82525]">Call Now</span>
            </div>
          </div>
        </EStatPanel>
      </EGlassOuter>

      {/* Vitals */}
      <EVitalsGroup />
    </div>
  );
}

// ── Smart Diet Plan expanded panels ───────────────────────────────────────

function DietExpandedPanels() {
  return (
    <div className="flex flex-col gap-[8px] w-[460px] items-center">
      <ETestimonial
        photo={careTestimonialAjay2}
        name="Ajay Dogra"
        badge="Data Backed Diet Plan"
        quote="TotalCare's AI is basically a divine protector for my vitals. It's like having a guardian angel who also happens to be a data scientist."
      />

      {/* Diet panel – 360px wide */}
      <div className="relative w-[360px] rounded-[24px] drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)] flex flex-col overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[24px] bg-white" />
        <div className="absolute inset-0 pointer-events-none rounded-[24px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />

        {/* Breakfast tab */}
        <div className="relative mx-[8px] mt-[8px] rounded-[16px] py-[10px] flex items-center justify-center drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[16px] bg-white" />
          <div className="absolute inset-0 pointer-events-none rounded-[16px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
          <span className="relative font-inter font-medium text-[16px] leading-[28px] tracking-[0.52px] text-[#008eb1]">
            Breakfast
          </span>
        </div>

        <CardDivider />

        {/* Poha item */}
        <div className="relative mx-[8px] h-[100px] rounded-[16px] overflow-hidden flex items-center drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[16px] bg-white" />
          <div className="absolute inset-0 pointer-events-none rounded-[16px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
          <div className="relative p-[16px] flex flex-col gap-[8px] z-10 shrink-0">
            <span className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.52px] text-[#008eb1]">Poha</span>
            <EStat num="320" unit="KCAL" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[200%] w-[55%] rounded-bl-[9999px] rounded-tl-[9999px] overflow-hidden">
            <img src={careDietFood} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        <CardDivider />

        {/* Recommendation */}
        <div className="relative mx-[8px] mb-[8px] rounded-[16px] p-[16px] flex flex-col gap-[8px] drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[16px] bg-white" />
          <div className="absolute inset-0 pointer-events-none rounded-[16px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
          <span className="relative font-inter font-medium text-[16px] leading-[28px] tracking-[0.52px] text-[#008eb1]">
            Low Oil Recommended
          </span>
          <span className="relative font-inter font-medium text-[11px] leading-[18px] tracking-[0.35px] text-[#4d4d4d]">
            Keep peanuts light. Add veggies for fiber.
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Device Integrations expanded panels ───────────────────────────────────

function DeviceExpandedPanels() {
  return (
    <div className="flex flex-col gap-[8px] w-[460px]">
      <ETestimonial
        photo={careTestimonialVikas}
        name="Vikas Basu"
        badge="Activity Tracking"
        quote="TotalCare's AI acts as a vigilant overseer for my health metrics. It's akin to having a watchful guardian who is also an expert in data analysis."
      />

      <div className="flex gap-[12px] items-center">
        <img
          src={careDeviceDiagram}
          alt=""
          aria-hidden
          className="flex-shrink-0 w-[200px] h-[200px] object-contain"
        />
        <div className="relative flex-1 rounded-[24px] p-[16px] flex flex-col gap-[16px] drop-shadow-[0px_2px_20px_rgba(0,65,114,0.08)]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[24px] bg-white" />
          <div className="absolute inset-0 pointer-events-none rounded-[24px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
          <span className="relative font-inter font-medium text-[16px] leading-[28px] tracking-[0.52px] text-[#008eb1]">
            Auto Health Sync
          </span>
          <p className="relative font-inter font-medium text-[11px] leading-[18px] tracking-[0.35px] text-[#4d4d4d]">
            Connect Apple / Google Health connect for real-time tracking, no manual input.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Medicines & Lab Tests expanded panels ─────────────────────────────────

function MedicinesExpandedPanels() {
  return (
    <div className="flex flex-col gap-[8px] w-[460px]">
      <ETestimonial
        photo={careTestimonialRuchi}
        name="Ruchi Mehta"
        badge="At Home Lab Tests"
        quote="TotalCare's AI serves as a diligent monitor for my lab results. It's like having a knowledgeable guardian who specializes in medical data analysis."
      />

      <EGlassOuter>
        <EStatPanel>
          <div className="flex flex-col gap-[8px]">
            <ETag icon={icoAmbulance} label="Home sample collection" />
            <EStat num="3" unit="hrs remaining for HbaC test" />
          </div>
        </EStatPanel>
        <EStatPanel>
          <div className="flex flex-col gap-[8px]">
            <ETag icon={icoAmbulance} label="Medicines Delivery in" />
            <div className="flex items-end gap-[4px]">
              <span className="font-inter font-medium text-[20px] leading-normal text-black">2</span>
              <span className="font-inter font-medium text-[11px] leading-[18px] text-[#4d4d4d]">hrs</span>
              <span className="font-inter font-medium text-[20px] leading-normal text-black">58</span>
              <span className="font-inter font-medium text-[11px] leading-[18px] text-[#4d4d4d]">mins</span>
            </div>
          </div>
        </EStatPanel>

        <CardDivider />

        {['Home sample collection', 'Certified Labs & safe handling', 'Safe shipping'].map((label) => (
          <div key={label} className="relative rounded-[24px] p-[14px] flex gap-[14px] items-center drop-shadow-[0px_2px_10px_rgba(0,65,114,0.08)]">
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[24px] bg-white" />
            <div className="absolute inset-0 pointer-events-none rounded-[24px] shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.12)]" />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="relative flex-shrink-0">
              <circle cx="10" cy="10" r="9" fill="#edf9ff" />
              <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#00b82e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="relative font-inter font-medium text-[14px] leading-[20px] tracking-[0.45px] text-[#008eb1]">
              {label}
            </span>
          </div>
        ))}
      </EGlassOuter>
    </div>
  );
}

// ── Card data ──────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'doctor',
    label: 'Family Doctor Consultation',
    icon: icoDoctor,
    renderBg() {
      return (
        <>
          <img
            src={careCard1}
            alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover max-w-none"
          />
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={careCard1b}
              alt="" aria-hidden
              className="absolute h-full max-w-none top-0"
              style={{ left: '-67.4%', width: '200.16%' }}
            />
          </div>
        </>
      );
    },
    renderExpandedBg() {
      return (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={careCard1Ex1}
              alt="" aria-hidden
              className="absolute max-w-none"
              style={{ height: '107.72%', left: '-17.81%', top: '-7.73%', width: '117.8%' }}
            />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={careCard1Ex2}
              alt="" aria-hidden
              className="absolute max-w-none top-0"
              style={{ height: '100%', left: '-17.5%', width: '125.34%' }}
            />
          </div>
        </>
      );
    },
    headline: 'Every Consultation starts ',
    accent: 'with your data',
    inline: true,
    expandedBullets: [
      'General physician consultation within 6 hours.',
      'Specialist consultation within 48 hours.',
      'Medical history, trends, Synced. Analysed. Ready.',
      'So the doctor focuses on decisions, not data collection.',
    ],
    ExpandedPanels: DoctorExpandedPanels,
    expandedPanelTop: 96,
    expandedBulletsTop: 470,
    expandedBulletsWidth: 'w-[721px]',
  },
  {
    id: 'ai',
    label: 'AI Health Companion',
    icon: icoAi,
    renderBg() {
      return (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={careCard2}
            alt="" aria-hidden
            className="absolute h-full max-w-none"
            style={{ left: '-21.84%', top: '-0.01%', width: '200.16%' }}
          />
        </div>
      );
    },
    renderExpandedBg() {
      return (
        <img
          src={card2Exp}
          alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover max-w-none"
        />
      );
    },
    headline: 'Your health, analysed.',
    accent: "Before it's a problem",
    expandedBullets: [
      'Tracks patterns. Spots risks early.',
      'Nudges you before things go wrong.',
      'Converts abstract health goals into measurable metrics.',
    ],
    ExpandedPanels: AiExpandedPanels,
    expandedPanelTop: 348,
    expandedBulletsTop: 529,
    expandedBulletsWidth: 'w-[709px]',
  },
  {
    id: 'concierge',
    label: 'Concierge & Emergency services',
    icon: icoConcierge,
    renderBg() {
      return (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={careCard3}
            alt="" aria-hidden
            className="absolute h-full max-w-none top-0"
            style={{ left: '-92.45%', width: '234.92%' }}
          />
        </div>
      );
    },
    renderExpandedBg() {
      return (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={careCard3}
            alt="" aria-hidden
            className="absolute h-full max-w-none top-0"
            style={{ left: '-6.95%', width: '106.94%' }}
          />
        </div>
      );
    },
    headline: 'Help arrives,',
    accent: 'Before panic does',
    expandedBullets: [
      'Concierge and Ambulance arrives within 30 minutes.',
      'Help is triggered before you react',
      'Real support. Not just alerts',
    ],
    ExpandedPanels: ConciergeExpandedPanels,
    expandedPanelTop: 105,
    expandedBulletsTop: 502,
    expandedBulletsWidth: 'w-[500px]',
  },
  {
    id: 'diet',
    label: 'Smart Diet Plan',
    icon: icoDiet,
    renderBg() {
      return (
        <img
          src={card4Exp}
          alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover max-w-none"
        />
      );
    },
    renderExpandedBg() {
      return (
        <img
          src={careCard4}
          alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover max-w-none"
        />
      );
    },
    headline: 'Diet that thinks',
    accent: 'Before you eat.',
    expandedBullets: [
      'Builds your health context from daily activity patterns and medical history (medications, allergies).',
      'Dynamic meal planning based on evolving health goals.',
      'No guesswork. No generic plans. Automated, goal-aligned nutritional planning.',
    ],
    ExpandedPanels: DietExpandedPanels,
    expandedPanelTop: 282,
    expandedBulletsTop: 470,
    expandedBulletsWidth: 'w-[704px]',
  },
  {
    id: 'device',
    label: 'Device Integrations',
    icon: icoDevice,
    renderBg() {
      return (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={careCard5}
            alt="" aria-hidden
            className="absolute max-w-none"
            style={{ height: '119.25%', left: '-69.21%', top: '-19.21%', width: '238.5%' }}
          />
        </div>
      );
    },
    renderExpandedBg() {
      return (
        <>
          <img
            src={careCard5Exp}
            alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover max-w-none"
          />
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={careCard5}
              alt="" aria-hidden
              className="absolute max-w-none"
              style={{ height: '123.79%', left: '-12.72%', top: '-23.75%', width: '112.71%' }}
            />
          </div>
        </>
      );
    },
    headline: 'Stop Tracking,',
    accent: 'Start Understanding',
    expandedBullets: [
      'Multiple devices. One system',
      'Signals combined, not scattered',
      'Patterns you can actually act on',
    ],
    ExpandedPanels: DeviceExpandedPanels,
    expandedPanelTop: 286,
    expandedBulletsTop: 528,
    expandedBulletsWidth: 'w-[650px]',
  },
  {
    id: 'medicines',
    label: 'Medicines and Lab tests',
    icon: icoMedicine,
    renderBg() {
      return (
        <img
          src={card6Default}
          alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover max-w-none"
        />
      );
    },
    renderExpandedBg() {
      return (
        <img
          src={card6Expand}
          alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover max-w-none"
        />
      );
    },
    headline: 'Medicines & Lab Tests',
    accent: 'Care Without Delays',
    expandedBullets: [
      'CureBay Guarantee: Medicines delivered within 3 hours.',
      'Home test sample collection.',
      'Without delays. Without confusion.',
    ],
    ExpandedPanels: MedicinesExpandedPanels,
    expandedPanelTop: 148,
    expandedBulletsTop: 510,
    expandedBulletsWidth: 'w-[650px]',
  },
];

// ── Mobile stat widget helpers ────────────────────────────────────────────

function MGlass({ children, style }) {
  return (
    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', width: '100%', ...style }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 2px rgba(0,65,114,0.12)', pointerEvents: 'none', borderRadius: 'inherit' }} />
      <div style={{ position: 'relative', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>
    </div>
  );
}

function MCell({ children, style }) {
  return (
    <div style={{ position: 'relative', borderRadius: '16px', padding: '10px', background: '#fff', boxShadow: '0 2px 2px rgba(0,65,114,0.08)', ...style }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 0 2px rgba(0,65,114,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '6px' }}>{children}</div>
    </div>
  );
}

function MTag({ icon, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {icon && <img src={icon} alt="" aria-hidden style={{ width: '14px', height: '14px', objectFit: 'contain', flexShrink: 0 }} />}
      <span style={{ fontSize: '13px', fontWeight: 500, color: '#008eb1', letterSpacing: '0.42px', whiteSpace: 'nowrap', lineHeight: '20px' }}>{label}</span>
    </div>
  );
}

function MStat({ num, unit }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
      <span style={{ fontSize: '18px', fontWeight: 500, color: '#000', lineHeight: '26px', whiteSpace: 'nowrap' }}>{num}</span>
      <span style={{ fontSize: '11px', fontWeight: 500, color: '#4d4d4d', lineHeight: '19px', whiteSpace: 'nowrap', letterSpacing: '0.35px' }}>{unit}</span>
    </div>
  );
}

function MDivider() {
  return <div style={{ height: '1px', background: 'rgba(0,65,114,0.08)', margin: '0 -8px' }} />;
}

// Mobile testimonial card
function MTestimonial({ photo, name, badge, quote }) {
  return (
    <div style={{ position: 'relative', background: 'rgba(255,255,255,0.8)', borderRadius: '24px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', boxShadow: '0 2px 10px rgba(0,65,114,0.08)' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 0 2px rgba(0,65,114,0.12)', pointerEvents: 'none' }} />
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', width: '72px' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,65,114,0.08)' }}>
          <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 500, color: '#808080', textAlign: 'center', lineHeight: '16px', letterSpacing: '0.35px', wordBreak: 'break-word' }}>{name}</p>
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative' }}>
        <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '10px', padding: '3px 8px', alignSelf: 'flex-start', boxShadow: '0 2px 10px rgba(0,65,114,0.08)' }}>
          <span style={{ fontSize: '11px', fontWeight: 500, color: '#d29300', letterSpacing: '0.35px', lineHeight: '18px', whiteSpace: 'nowrap' }}>{badge}</span>
        </div>
        <span aria-hidden style={{ fontSize: '20px', color: '#d29300', lineHeight: 1, display: 'block', marginTop: '2px' }}>"</span>
        <p style={{ margin: 0, fontSize: '12px', fontStyle: 'italic', color: '#000', lineHeight: 1.6, letterSpacing: '0.38px', wordBreak: 'break-word' }}>{quote}</p>
        <span aria-hidden style={{ fontSize: '20px', color: '#d29300', lineHeight: 1, display: 'block', alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>"</span>
      </div>
    </div>
  );
}

// ── Per-card mobile expanded panels ───────────────────────────────────────

function MDoctorPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <MGlass>
        <div style={{ display: 'flex', gap: '8px' }}>
          <MCell style={{ flex: 1, minWidth: 0 }}>
            <MTag icon={icoRx} label="Prescriptions" />
            <MStat num="15" unit="Records" />
          </MCell>
          <MCell style={{ flex: 1, minWidth: 0 }}>
            <MTag icon={icoLab} label="Lab tests" />
            <MStat num="9" unit="Records" />
          </MCell>
        </div>
        <MDivider />
        <MCell>
          <MTag icon={icoAlergy} label="Allergies" />
          <MStat num="4" unit="Records" />
        </MCell>
      </MGlass>
      <MGlass>
        <div style={{ display: 'flex', gap: '8px' }}>
          <MCell style={{ flex: 1, minWidth: 0 }}>
            <MTag icon={icoHeart} label="Heart Rate" />
            <MStat num="98" unit="BPM" />
          </MCell>
          <MCell style={{ flex: 1, minWidth: 0 }}>
            <MTag icon={icoGlucose} label="Glucose" />
            <MStat num="92" unit="mg/dL" />
          </MCell>
        </div>
        <MDivider />
        <div style={{ display: 'flex', gap: '8px' }}>
          <MCell style={{ flex: 1, minWidth: 0 }}>
            <MTag icon={icoPerson} label="Blood pressure" />
            <MStat num="98" unit="BPM" />
          </MCell>
          <MCell style={{ flex: 1, minWidth: 0 }}>
            <MTag icon={icoSleep} label="Sleep" />
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '18px', fontWeight: 500, color: '#000' }}>8</span>
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#4d4d4d', lineHeight: '19px' }}>Hr</span>
              <span style={{ fontSize: '18px', fontWeight: 500, color: '#000' }}>43</span>
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#4d4d4d', lineHeight: '19px' }}>Min</span>
            </div>
          </MCell>
        </div>
        <MDivider />
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 500, color: '#4d4d4d', textAlign: 'center', letterSpacing: '0.35px' }}>vitals synced from the devices</p>
      </MGlass>
    </div>
  );
}

function MAiPanel() {
  return (
    <MGlass>
      <MCell>
        <MTag label="5km Run" />
        <MStat num="40%" unit="remaining today" />
      </MCell>
      <MDivider />
      <MCell>
        <MTag label="Exercise Minutes" />
        <MStat num="29" unit="mins left" />
      </MCell>
      <MDivider />
      <MCell>
        <MTag label="Water" />
        <MStat num="150–250" unit="ml drink now" />
      </MCell>
    </MGlass>
  );
}

function MConciergePanel() {
  return (
    <MGlass>
      <div style={{ display: 'flex', gap: '8px' }}>
        <MCell style={{ flex: 1, minWidth: 0 }}>
          <MTag icon={icoAmbulance} label="Ambulance" />
          <MStat num="30" unit="mins to arrive" />
        </MCell>
        <MCell style={{ flex: 1, minWidth: 0 }}>
          <MTag icon={icoHConcierge} label="Concierge" />
          <MStat num="30" unit="mins to arrive" />
        </MCell>
      </div>
      <MDivider />
      <MCell>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <MTag icon={icoContact} label="Emergency Contact" />
            <div>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 500, color: '#000', letterSpacing: '0.32px' }}>Aaditya</p>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 500, color: '#4d4d4d' }}>Son</p>
            </div>
          </div>
          <div style={{ background: '#edf9ff', borderRadius: '13px', padding: '9px 18px', flexShrink: 0, boxShadow: '0 2.75px 2.75px rgba(0,65,114,0.08), inset 0 0 2.75px rgba(0,65,114,0.08)' }}>
            <span style={{ fontSize: '16px', fontWeight: 500, color: '#d82525', whiteSpace: 'nowrap' }}>Call Now</span>
          </div>
        </div>
      </MCell>
    </MGlass>
  );
}

function MDietPanel() {
  return (
    <MGlass>
      <MCell>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#008eb1', lineHeight: '24px' }}>Breakfast</span>
        </div>
      </MCell>
      <MDivider />
      <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', height: '80px', overflow: 'hidden', boxShadow: '0 2px 2px rgba(0,65,114,0.08)' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 0 2px rgba(0,65,114,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', padding: '0 12px' }}>
          <div style={{ zIndex: 1 }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#008eb1', lineHeight: '24px' }}>Poha</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginTop: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: 500, color: '#000' }}>320</span>
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#4d4d4d', lineHeight: '19px' }}>KCAL</span>
            </div>
          </div>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', borderRadius: '9999px 0 0 9999px', overflow: 'hidden' }}>
            <img src={careDietFood} alt="" aria-hidden style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
      <MDivider />
      <MCell>
        <span style={{ fontSize: '14px', fontWeight: 500, color: '#008eb1', lineHeight: '24px' }}>Low Oil Recommended</span>
        <span style={{ fontSize: '11px', fontWeight: 500, color: '#4d4d4d', lineHeight: '18px', letterSpacing: '0.35px' }}>Keep peanuts light. Add veggies for fiber.</span>
      </MCell>
    </MGlass>
  );
}

function MDevicePanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
      <img src={careDeviceDiagram} alt="" aria-hidden style={{ width: '180px', height: 'auto', objectFit: 'contain' }} />
      <MGlass>
        <MCell>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#008eb1', textAlign: 'center', lineHeight: '24px' }}>Auto Health Sync</p>
          <p style={{ margin: 0, fontSize: '12px', fontWeight: 500, color: '#4d4d4d', lineHeight: '18px', letterSpacing: '0.35px' }}>
            Connect Apple / Google Health connect for real-time tracking, no manual input.
          </p>
        </MCell>
      </MGlass>
    </div>
  );
}

function MMedicinePanel() {
  const checkItems = ['Home sample collection', 'Certified Labs & safe handling', 'Safe shipping'];
  return (
    <MGlass>
      <MCell>
        <MTag icon={icoAmbulance} label="Home sample collection" />
        <MStat num="3" unit="hrs remaining for HbaC test" />
      </MCell>
      <MCell>
        <MTag icon={icoAmbulance} label="Medicines Delivery in" />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '18px', fontWeight: 500, color: '#000' }}>2</span>
          <span style={{ fontSize: '11px', fontWeight: 500, color: '#4d4d4d', lineHeight: '19px' }}>hrs</span>
          <span style={{ fontSize: '18px', fontWeight: 500, color: '#000' }}>58</span>
          <span style={{ fontSize: '11px', fontWeight: 500, color: '#4d4d4d', lineHeight: '19px' }}>mins</span>
        </div>
      </MCell>
      <MDivider />
      {checkItems.map((item) => (
        <div key={item} style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,65,114,0.08)' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 0 0 2px rgba(0,65,114,0.12)', pointerEvents: 'none' }} />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden style={{ flexShrink: 0, position: 'relative' }}>
            <circle cx="10" cy="10" r="9" fill="#edf9ff" />
            <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#00b82e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ position: 'relative', fontSize: '13px', fontWeight: 500, color: '#008eb1', letterSpacing: '0.42px', lineHeight: '20px' }}>{item}</span>
        </div>
      ))}
    </MGlass>
  );
}

// ── Mobile card data ──────────────────────────────────────────────────────
const MOBILE_CARE_CARDS = [
  {
    id: 'doctor',
    src: careCard1,
    icon: icoDoctor,
    label: 'Family Doctor Consultation',
    headline: 'Every Consultation starts ',
    accent: 'with your data',
    inline: true,
    description: 'Care that shows up when you need it most. Connect with the right doctor, without the wait. With your story already understood, conversations feel easier, decisions feel clearer—and you feel taken care of.',
    testimonialProps: { photo: careTestimonial, name: 'Kartik Varma', badge: 'Specialist Consultation', quote: "TotalCare and Dr.Neha Joshi came to my life as my god's angles, making my life healthier one click away" },
    Panel: MDoctorPanel,
  },
  {
    id: 'ai',
    src: careCard2,
    icon: icoAi,
    label: 'AI Health Companion',
    headline: 'Your health, analysed.',
    accent: "Before it's a problem",
    description: 'Care that stays one step ahead. By spotting patterns early, it turns complexity into clear actions—so you move forward with confidence.',
    testimonialProps: { photo: careTestimonialAjay, name: 'Ajay Dogra', badge: 'AI powered Health Tracking', quote: "TotalCare's AI is basically a divine protector for my vitals. It's like having a guardian angel who also happens to be a data scientist." },
    Panel: MAiPanel,
  },
  {
    id: 'concierge',
    src: careCard3,
    icon: icoConcierge,
    label: 'Concierge & Emergency services',
    headline: 'Help arrives,',
    accent: 'Before panic does',
    description: 'From rapid ambulance support to real-time intervention, help is already on the way—when seconds matter most. No waiting, no uncertainty. Just immediate, reliable care when you need it most.',
    testimonialProps: { photo: careTestimonialSunita, name: 'Sunita Sharma', badge: 'Ambulance Services', quote: "As someone who stays on top of their health, TotalCare adds a layer of reassurance I didn't know I needed." },
    Panel: MConciergePanel,
  },
  {
    id: 'diet',
    src: card4Exp,
    icon: icoDiet,
    label: 'Smart Diet Plan',
    headline: 'Diet that thinks',
    accent: 'Before you eat.',
    description: 'Care that adapts to how you live, eat, and feel. Built around your habits, medical history, and goals, so every meal has a purpose. No rigid charts, no one-size-fits-all plans. Just smart, evolving nutrition that fits your life.',
    testimonialProps: { photo: careTestimonialAjay2, name: 'Ajay Dogra', badge: 'Data Backed Diet Plan', quote: "TotalCare's AI is basically a divine protector for my vitals. It's like having a guardian angel who also happens to be a data scientist." },
    Panel: MDietPanel,
  },
  {
    id: 'device',
    src: careCard5,
    icon: icoDevice,
    label: 'Device Integrations',
    headline: 'Stop Tracking,',
    accent: 'Start Understanding',
    description: 'Care that connects every signal into one clear story. From wearables to health apps, your data flows into a single system—so nothing gets lost. No scattered insights, no manual tracking.',
    testimonialProps: { photo: careTestimonialVikas, name: 'Vikas Basu', badge: 'Activity Tracking', quote: "TotalCare's AI acts as a vigilant overseer for my health metrics. It's akin to having a watchful guardian who is also an expert in data analysis." },
    Panel: MDevicePanel,
  },
  {
    id: 'medicines',
    src: card6Default,
    icon: icoMedicine,
    label: 'Medicines and Lab tests',
    headline: 'Medicines & Lab Tests',
    accent: 'Care Without Delays',
    description: 'Care that moves as fast as your needs. From prescriptions to diagnostics, everything is handled end-to-end—right from your home. No delays, no confusion. Just timely care that shows up when it matters most.',
    testimonialProps: { photo: careTestimonialRuchi, name: 'Ruchi Mehta', badge: 'At Home Lab Tests', quote: "TotalCare's AI serves as a diligent monitor for my lab results. It's like having a knowledgeable guardian who specializes in medical data analysis." },
    Panel: MMedicinePanel,
  },
];

// ── MobileCareCard ─────────────────────────────────────────────────────────
function MobileCareCard({
  src, icon, label, headline, accent, inline,
  description, testimonialProps, Panel,
  isExpanded, onToggle,
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#000',
        ...(isExpanded ? {} : { aspectRatio: '359 / 479' }),
      }}
    >
      {isExpanded ? (
        /* ─── Expanded state ─── */
        <>
          {/* Photo header + gradient fade to black */}
          <div
            aria-hidden
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '220px', pointerEvents: 'none' }}
          >
            <img
              src={src}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 68%, #000 88%)',
              }}
            />
          </div>

          {/* Foreground content */}
          <div style={{ position: 'relative', zIndex: 1, padding: '20px 20px 28px' }}>

            {/* Top row: badge + × close button */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', minHeight: '52px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(0,0,0,0.12)',
                  borderRadius: '40px',
                  padding: '8px 12px',
                  maxWidth: 'calc(100% - 56px)',
                  overflow: 'hidden',
                }}
              >
                <img src={icon} alt="" aria-hidden style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }} />
                <span
                  style={{
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {label}
                </span>
              </div>
              <button
                type="button"
                aria-label={`Close ${label}`}
                onClick={onToggle}
                style={{
                  flexShrink: 0,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.64)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 0 1.92px rgba(0,65,114,0.08)',
                  filter: 'drop-shadow(0px 1.92px 1.92px rgba(0,65,114,0.08))',
                }}
              >
                <img src={icoClose} alt="" aria-hidden style={{ width: '22px', height: '22px' }} />
              </button>
            </div>

            {/* Spacer so headline sits below the photo fade */}
            <div style={{ height: '136px' }} />

            {/* Headline + description */}
            <div style={{ padding: '0 8px 12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {inline ? (
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 500, lineHeight: '32px' }}>
                  <span style={{ color: '#fff' }}>{headline}</span>
                  <span style={{ color: '#33c1e4' }}>{accent}</span>
                </p>
              ) : (
                <div style={{ fontSize: '24px', fontWeight: 500, lineHeight: '32px' }}>
                  <p style={{ margin: 0, color: '#fff' }}>{headline}</p>
                  <p style={{ margin: 0, color: '#33c1e4' }}>{accent}</p>
                </div>
              )}
              {description && (
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#e5e5e5', lineHeight: '24px', letterSpacing: '0.45px' }}>
                  {description}
                </p>
              )}
            </div>

            {/* Testimonial + stats panel */}
            <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {testimonialProps && <MTestimonial {...testimonialProps} />}
              {Panel && <Panel />}
            </div>
          </div>
        </>
      ) : (
        /* ─── Collapsed state ─── */
        <>
          <img
            src={src}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 41.25%, rgba(0,0,0,0.4) 64.662%, rgba(0,0,0,0.8) 100%)',
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: '14.36px' }}>
            {/* Category badge + + button */}
            <div className="flex items-start justify-between gap-2">
              <div
                className="flex items-center"
                style={{ gap: '4px', background: 'rgba(0,0,0,0.16)', borderRadius: '23.933px', padding: '7.18px 9.573px', maxWidth: 'calc(100% - 56px)', overflow: 'hidden' }}
              >
                <img src={icon} alt="" aria-hidden style={{ width: '14.36px', height: '14.36px', objectFit: 'contain', flexShrink: 0 }} />
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 500, lineHeight: '18px', letterSpacing: '0.388px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {label}
                </span>
              </div>
              <button
                type="button"
                aria-label={`Learn more about ${label}`}
                onClick={onToggle}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: '48px', height: '48px', borderRadius: '42.24px', background: 'rgba(255,255,255,0.64)', boxShadow: 'inset 0px 0px 1.92px 0px rgba(0,65,114,0.08)', filter: 'drop-shadow(0px 1.92px 1.92px rgba(0,65,114,0.08))', border: 'none', cursor: 'pointer' }}
              >
                <img src={icoPlus} alt="" aria-hidden style={{ width: '23.04px', height: '23.04px' }} />
              </button>
            </div>
            {/* Two-line caption */}
            <div style={{ padding: '7.18px' }}>
              {inline ? (
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 500, lineHeight: '32px' }}>
                  <span style={{ color: '#fff' }}>{headline}</span>
                  <span style={{ color: '#33c1e4' }}>{accent}</span>
                </p>
              ) : (
                <div style={{ fontSize: '24px', fontWeight: 500, lineHeight: '32px' }}>
                  <p style={{ margin: 0, color: '#fff' }}>{headline}</p>
                  <p style={{ margin: 0, color: '#33c1e4' }}>{accent}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── MobileCareWeOfferSection ───────────────────────────────────────────────
function MobileCareWeOfferSection() {
  const [expandedId, setExpandedId] = useState(null);
  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <section style={{ background: '#fff', display: 'flex', flexDirection: 'column', padding: '48px 24px 64px', fontFamily: 'Inter, sans-serif' }}>
      {/* Section heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
        <p style={{ margin: 0, color: '#00B82E', fontSize: '20px', fontWeight: 500, lineHeight: '28px', letterSpacing: '0.324px' }}>
          Join the Tribe
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '8px' }}>
          <span style={{ color: '#000', fontWeight: 700, fontSize: 'clamp(36px, 11vw, 48px)', lineHeight: 1.05 }}>
            The Care
          </span>
          <span style={{ color: '#808080', fontWeight: 700, fontSize: 'clamp(36px, 11vw, 48px)', lineHeight: 1.05 }}>
            we offer
          </span>
        </div>
      </div>

      {/* Stacked cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {MOBILE_CARE_CARDS.map((card) => (
          <MobileCareCard
            key={card.id}
            {...card}
            isExpanded={expandedId === card.id}
            onToggle={() => toggle(card.id)}
          />
        ))}
      </div>
    </section>
  );
}

// ── OfferingCard ───────────────────────────────────────────────────────────

function OfferingCard({
  label,
  icon,
  renderBg,
  renderExpandedBg,
  headline,
  accent,
  inline,
  expandedBullets,
  ExpandedPanels,
  expanded,
  onToggle,
  expandedPanelTop = 96,
  expandedBulletsTop = 470,
  expandedBulletsWidth = 'w-[721px]',
}) {
  const hasExpandedContent = !!ExpandedPanels;

  return (
    <div
      className={[
        'relative flex-shrink-0 rounded-[40px] overflow-hidden h-[800px]',
        'transition-[width] duration-500 ease-in-out',
        expanded ? 'w-[1318px]' : 'w-[600px]',
      ].join(' ')}
    >
      {/* ── Background layers ──────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[40px]">
        <div className={`absolute inset-0 transition-opacity duration-300 ${expanded ? 'opacity-0' : 'opacity-100'}`}>
          {renderBg()}
        </div>
        {renderExpandedBg && (
          <div className={`absolute inset-0 transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>
            {renderExpandedBg()}
          </div>
        )}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${expanded ? 'opacity-0' : 'opacity-100'}`}
          style={GRAD_COLLAPSED}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}
          style={GRAD_EXPANDED}
        />
      </div>

      {/* ── Top row: chip + toggle button ─────────────────────────────── */}
      <div className="absolute top-[24px] left-[24px] right-[24px] flex items-start justify-between">
        <div className="flex items-center gap-[5.462px] px-[16px] py-[12px] rounded-full bg-[rgba(0,0,0,0.16)] backdrop-blur-sm">
          <div className="flex-shrink-0 size-[24px] flex items-center justify-center overflow-hidden">
            <img src={icon} alt="" aria-hidden className="w-full h-full object-contain" />
          </div>
          <span className="font-inter font-medium text-[16px] leading-[28px] tracking-[0.518px] text-white whitespace-nowrap">
            {label}
          </span>
        </div>
        <button
          type="button"
          aria-label={expanded ? `Close ${label}` : `Learn more about ${label}`}
          onClick={onToggle}
          className="flex-shrink-0 flex items-center justify-center size-[60px] rounded-full
                     bg-[rgba(255,255,255,0.64)] hover:bg-[rgba(255,255,255,0.85)]
                     drop-shadow-[0px_2.4px_2.4px_rgba(0,65,114,0.08)]
                     shadow-[inset_0px_0px_2.4px_0px_rgba(0,65,114,0.08)]
                     transition-all duration-200"
        >
          <img
            src={expanded ? icoClose : icoPlus}
            alt=""
            aria-hidden
            className="w-[28.8px] h-[28.8px] drop-shadow-[0px_2.4px_9.6px_rgba(0,65,114,0.08)]
                       transition-all duration-200"
          />
        </button>
      </div>

      {/* ── Collapsed: bottom headline ─────────────────────────────────── */}
      <div
        className={[
          'absolute bottom-[24px] left-[24px] right-[24px] p-[12px]',
          'transition-all duration-300',
          expanded ? 'opacity-0 pointer-events-none translate-y-3' : 'opacity-100 translate-y-0',
        ].join(' ')}
      >
        {inline ? (
          <p className="font-inter font-medium text-[48px] leading-tight m-0">
            <span className="text-white">{headline}</span>
            <span className="text-[#33c1e4]">{accent}</span>
          </p>
        ) : (
          <div className="font-inter font-medium text-[48px]">
            <p className="text-white leading-tight m-0">{headline}</p>
            <p className="text-[#33c1e4] leading-tight m-0">{accent}</p>
          </div>
        )}
      </div>

      {/* ── Expanded: right-column panels ─────────────────────────────── */}
      {hasExpandedContent && (
        <div
          className={[
            'absolute left-[834px]',
            'transition-all duration-[350ms]',
            expanded
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-[40px] pointer-events-none',
          ].join(' ')}
          style={{ top: expandedPanelTop }}
        >
          <ExpandedPanels />
        </div>
      )}

      {/* ── Expanded: bottom-left headline + bullet list ───────────────── */}
      {expandedBullets && (
        <div
          className={[
            `absolute left-[25px] ${expandedBulletsWidth} p-[12px] flex flex-col gap-[20px]`,
            'transition-all duration-[350ms]',
            expanded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[16px] pointer-events-none',
          ].join(' ')}
          style={{ top: expandedBulletsTop }}
        >
          {inline ? (
            <p className="font-inter font-medium text-[40px] leading-tight m-0">
              <span className="text-white">{headline}</span>
              <span className="text-[#33c1e4]">{accent}</span>
            </p>
          ) : (
            <div className="font-inter font-medium text-[40px]">
              <p className="text-white leading-tight m-0">{headline}</p>
              <p className="text-[#33c1e4] leading-tight m-0">{accent}</p>
            </div>
          )}
          <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
            {expandedBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-[10px]">
                <span
                  aria-hidden
                  className="flex-shrink-0 mt-[8px] size-[5px] rounded-full bg-white block"
                />
                <span className="font-inter font-light text-[18px] leading-[28px] text-white">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export default function CareWeOfferSection() {
  const scrollRef  = useRef(null);
  const [expandedId, setExpandedId] = useState(null);
  const [isMobile, setIsMobile]     = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) return <MobileCareWeOfferSection />;

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 648, behavior: 'smooth' });
  };

  const toggleCard = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const anyExpanded = expandedId !== null;

  return (
    <section
      className="flex flex-col gap-[60px] items-center
                 px-[120px] xl:px-[120px] lg:px-16 md:px-8 sm:px-4
                 py-[120px] lg:py-16 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #e8f1f8 0%, #ffffff 100%)' }}
    >
      {/* ── Header row ──────────────────────────────────────────────────── */}
      <div className="flex items-end justify-between w-full gap-8">
        <div className="flex flex-col gap-[12px] items-start">
          <p className="font-inter font-medium text-[24px] leading-none tracking-[0.389px] text-[#00b82e]">
            Join the Tribe
          </p>
          <div className="flex items-baseline gap-[12px] flex-wrap">
            <h2
              className="font-inter font-bold leading-none text-black m-0"
              style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
            >
              The Care
            </h2>
            <h2
              className="font-inter font-bold leading-none text-[#808080] m-0"
              style={{ fontSize: 'clamp(44px, 6.6vw, 96px)' }}
            >
              we offer
            </h2>
          </div>
        </div>

        <div className="flex gap-[24px] items-center flex-shrink-0">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="flex items-center justify-center size-[60px] rounded-full bg-[rgba(0,0,0,0.16)]
                       hover:bg-[rgba(0,0,0,0.28)] transition-colors duration-150"
          >
            <img src={icoArrowLeft} alt="" aria-hidden className="w-[28.8px] h-[28.8px]" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="flex items-center justify-center size-[60px] rounded-full bg-[rgba(0,52,91,0.1)]
                       hover:bg-[rgba(0,52,91,0.2)] transition-colors duration-150
                       shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]"
          >
            <img src={icoArrowRight} alt="" aria-hidden className="w-[28.8px] h-[28.8px]" />
          </button>
        </div>
      </div>

      {/* ── Scroll container ─────────────────────────────────────────────── */}
      <div
        className="relative w-full transition-all duration-500"
        style={
          anyExpanded
            ? undefined
            : {
                maskImage:
                  'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
              }
        }
      >
        <div
          ref={scrollRef}
          className="flex gap-[48px] items-start overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CARDS.map((card) => (
            <OfferingCard
              key={card.id}
              {...card}
              expanded={expandedId === card.id}
              onToggle={() => toggleCard(card.id)}
            />
          ))}
          <div className="flex-shrink-0 w-[120px]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
