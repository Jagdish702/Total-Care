import { useState } from 'react';
import techSpecsScaleImg  from '../../assets/product-explore/tech-specs-scale.png';
import techSpecsOmronImg  from '../../assets/product-explore/omron bp tech spec.png';
import techSpecsGlucoImg  from '../../assets/product-explore/rgb glucobody tech spec.png';

const TAB_IMAGES = [techSpecsScaleImg, techSpecsOmronImg, techSpecsGlucoImg];
const TAB_ALTS  = [
  'Meditive Body Composition Scale — technical diagram',
  'Omron BP Monitor — technical diagram',
  'Glucobuddy — technical diagram',
];

/* ─── Spec data ─────────────────────────────────────────────────────────────── */
const MEDITIVE_SPECS = [
  {
    title: 'Overview',
    rows: [
      ['Model',        'Meditive BCM-202'],
      ['Display',      'Hidden LED (high-contrast)'],
      ['Connectivity', 'Bluetooth 4.0 / 5.0'],
    ],
  },
  {
    title: 'Dimensions & Weight',
    rows: [
      ['Dimensions', '280 x 280 x 24 mm'],
      ['Weight',     '1.2 kg'],
    ],
  },
  {
    title: 'Power & Build',
    rows: [
      ['Power Source', '3 x 1.5V AAA Batteries'],
      ['Material',     '6mm Tempered Safety Glass / ABS Plastic'],
      ['Capacity',     '180 kg (400 lbs)'],
      ['Graduation',   '0.05 kg'],
    ],
  },
  {
    title: 'Identification',
    rows: [
      ['Sensors',           '4 x High-Precision G-Sensors'],
      ['App Compatibility', 'iOS 8.0+ / Android 4.3+'],
      ['Certifications',    'CE, RoHS, FCC'],
    ],
  },
  {
    title: 'Warranty',
    rows: [
      ['Standard Warranty', '1 Year'],
    ],
  },
];

const OMRON_SPECS = [
  {
    title: 'Overview',
    rows: [
      ['Model',        'Omron HEM-7140T1-AP'],
      ['Display',      'Digital LCD'],
      ['Connectivity', 'Bluetooth 4.2'],
    ],
  },
  {
    title: 'Dimensions & Weight',
    rows: [
      ['Dimensions', '148 x 98 x 50 mm'],
      ['Weight',     '230 g (without batteries)'],
    ],
  },
  {
    title: 'Power & Build',
    rows: [
      ['Power Source', '4 x 1.5V AA Batteries'],
      ['Material',     'ABS Plastic'],
      ['Cuff Size',    'Medium (22–32 cm)'],
    ],
  },
  {
    title: 'Identification',
    rows: [
      ['App Compatibility', 'iOS 10.0+ / Android 5.0+'],
      ['Certifications',    'CE, FDA, MHRA'],
    ],
  },
  {
    title: 'Warranty',
    rows: [
      ['Standard Warranty', '2 Years'],
    ],
  },
];

const GLUCOBUDDY_SPECS = [
  {
    title: 'Overview',
    rows: [
      ['Model',        'GlucoBuddy CGM Sensor'],
      ['Display',      'Via Smartphone App (NFC / Bluetooth)'],
      ['Connectivity', 'NFC + Bluetooth 5.0'],
    ],
  },
  {
    title: 'Sensor & Accuracy',
    rows: [
      ['Measurement Range', '40–400 mg/dL'],
      ['Wear Duration',     'Up to 14 Days'],
      ['MARD Accuracy',     '< 9%'],
      ['Warm-Up Time',      '60 Minutes after application'],
    ],
  },
  {
    title: 'Power & Build',
    rows: [
      ['Power Source', 'Built-in Battery (sensor)'],
      ['Water Resistance', 'IP28 — up to 1m for 30 min'],
      ['Sensor Size',  '35 mm × 35 mm × 5 mm'],
    ],
  },
  {
    title: 'Identification',
    rows: [
      ['App Compatibility', 'iOS 14.0+ / Android 8.0+'],
      ['Certifications',    'CE, ISO 15197'],
    ],
  },
  {
    title: 'Warranty',
    rows: [
      ['Standard Warranty', '6 Months'],
    ],
  },
];

const ALL_SPECS = [MEDITIVE_SPECS, OMRON_SPECS, GLUCOBUDDY_SPECS];

const TABS = ['Meditive Body Composition Scale', 'Omron BP Monitor', 'GlucoBuddy CGM'];

/* ─── SpecGroup ──────────────────────────────────────────────────────────────── */
function SpecGroup({ title, rows }) {
  return (
    <div className="flex flex-col gap-[48px] items-start w-full">
      {/* Category heading — 48px bold white */}
      <p className="font-inter font-bold text-white leading-none
                    text-[32px] md:text-[40px] lg:text-[48px]">
        {title}
      </p>

      {/* Rows with a 1px divider after each one, gap-[24px] between all */}
      <div className="flex flex-col gap-[24px] w-full">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-[24px]">
            {/* Row: label left, value right — justify-between */}
            <div
              className="flex items-start justify-between w-full
                         font-inter font-medium tracking-[0.3888px] leading-normal
                         text-[#b2b2b2] text-[14px] md:text-[20px] lg:text-[24px]"
            >
              <p className="shrink-0">{label}</p>
              <p className="text-right">{value}</p>
            </div>
            {/* Thin horizontal divider */}
            <div className="w-full h-px bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── TechSpecsSection ───────────────────────────────────────────────────────── */
export default function TechSpecsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const specs = ALL_SPECS[activeTab];

  return (
    <section className="w-full bg-black">
      <div
        className="flex flex-col gap-[60px] items-center
                   px-4 md:px-8 lg:px-16 xl:px-[120px]
                   py-[60px] md:py-[100px] lg:py-[120px]"
      >
        {/* ── Heading ── */}
        <p className="font-inter font-bold text-white leading-none text-center
                      text-[48px] md:text-[64px] lg:text-[88px]">
          Technical Specifications
        </p>

        {/* ── Tabs: max-w matches Figma's 1077px ── */}
        <div className="flex items-stretch w-full max-w-[1077px]">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex flex-1 items-center justify-center
                          px-5 py-[14px] font-inter text-center
                          leading-normal tracking-[0.3888px]
                          text-[14px] md:text-[20px] lg:text-[24px]
                          transition-colors duration-200
                          ${activeTab === i
                            ? 'border-b border-[#33c1e4] text-[#33c1e4] font-medium'
                            : 'border-b border-[#666666] text-[#b2b2b2] font-light'
                          }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Product image — switches with active tab, luminosity blend ── */}
        <div className="w-full max-w-[1000px]" style={{ aspectRatio: '1000/632.8' }}>
          <img
            key={activeTab}
            src={TAB_IMAGES[activeTab]}
            alt={TAB_ALTS[activeTab]}
            className="w-full h-full object-contain transition-opacity duration-300"
            style={{ mixBlendMode: 'luminosity' }}
          />
        </div>

        {/* ── All spec groups ── */}
        <div className="flex flex-col gap-[60px] w-full">
          {specs.map((group) => (
            <SpecGroup key={group.title} title={group.title} rows={group.rows} />
          ))}
        </div>
      </div>
    </section>
  );
}
