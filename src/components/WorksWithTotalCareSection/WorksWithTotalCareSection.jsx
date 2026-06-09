import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Figma asset URLs (node 1165:17820) ─────────────────────────────────────── */
const imgBpCard        = 'https://www.figma.com/api/mcp/asset/72696a29-93e3-48b7-91df-0a838e5491a0';
const imgFeatureBadges = 'https://www.figma.com/api/mcp/asset/86697e88-6812-46ba-ad9a-8ab1533182ff';
const imgDoctor        = 'https://www.figma.com/api/mcp/asset/6e1d38cb-fa7b-4e7e-bc4a-7f19e94deed7';
const imgRohit         = 'https://www.figma.com/api/mcp/asset/e28040ff-7cb8-41dd-96bb-42087921609c';
const imgHeartSmall    = 'https://www.figma.com/api/mcp/asset/5fe8ffb2-7713-47cc-b38f-759ca059c099';
const imgHeartLarge    = 'https://www.figma.com/api/mcp/asset/e0839092-1efa-4a27-9789-a6646f427b9c';
const imgChartUp       = 'https://www.figma.com/api/mcp/asset/765f9b3b-7384-4a6e-8273-dc5582925c31';
const imgChartFlat     = 'https://www.figma.com/api/mcp/asset/f1df07c6-189e-4f52-861a-79265d80fed7';

/* ─── Product tab data ───────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id:          'bp',
    tab:         'Omron BP Monitor - HEM-7140-AP',
    routeId:     'bp',
    name:        'Omron BP Monitor – HEM-7140-AP',
    description: 'A clinically validated digital BP monitor that tracks blood pressure and pulse with reliable, at-home accuracy.',
    cardImage:   imgBpCard,
    doctorLabel: 'OMRON BP MONITOR – HEM-7141',
    testimonial: {
      name:   'Rohit Sharma',
      photo:  imgRohit,
      text:   'I stopped guessing and began understanding my blood pressure trends. With insights from my monitor and the Total Care app, I can make sense of my readings.',
    },
    metrics: [
      { label: 'Systolic BP',  value: '128', unit: 'mmHg', chart: imgChartUp },
      { label: 'Diastolic BP', value: '84',  unit: 'mmHg', chart: imgChartFlat },
      { label: 'Pulse Rate',   value: '76',  unit: 'bpm',  chart: imgChartFlat },
    ],
    statusInsights: ['Hypertension Alert', 'Slightly Elevated'],
    aiInsight: 'Your BP is slightly elevated today. Consider resting and hydrating.',
  },
  {
    id:          'scale',
    tab:         'Meditive Body Composition Scale',
    routeId:     'scale',
    name:        'Meditive Body Composition Scale',
    description: 'A smart scale that measures weight, BMI, body fat, muscle mass and more — synced directly to the Total Care app.',
    cardImage:   imgBpCard,
    doctorLabel: 'MEDITIVE BODY COMPOSITION SCALE',
    testimonial: {
      name:   'Priya Mehta',
      photo:  imgRohit,
      text:   'Tracking my body composition daily has transformed my fitness journey. The Total Care app gives me clear trends so I know exactly what\'s working.',
    },
    metrics: [
      { label: 'Body Weight', value: '72.4', unit: 'kg',  chart: imgChartFlat },
      { label: 'Body Fat',    value: '24.1', unit: '%',   chart: imgChartUp },
      { label: 'BMI',         value: '23.6', unit: 'kg/m²', chart: imgChartFlat },
    ],
    statusInsights: ['Healthy Range', 'BMI Normal'],
    aiInsight: 'Your body fat percentage is within healthy range. Keep up your routine for best results.',
  },
  {
    id:          'glucose',
    tab:         'RGB GlucoBuddy Glucometer',
    routeId:     'glucose',
    name:        'RGB GlucoBuddy BLE Glucometer',
    description: 'Fast, accurate blood glucose readings in 5 seconds — wirelessly synced to the Total Care app for intelligent diabetes management.',
    cardImage:   imgBpCard,
    doctorLabel: 'RGB GLUCOBUDDY BLE GLUCOMETER',
    testimonial: {
      name:   'Anil Kumar',
      photo:  imgRohit,
      text:   'Managing diabetes is now so much simpler. I can see my before and after meal readings in one place and my doctor can track my progress too.',
    },
    metrics: [
      { label: 'Fasting Sugar',    value: '108', unit: 'mg/dL', chart: imgChartFlat },
      { label: 'Post-Meal Sugar',  value: '142', unit: 'mg/dL', chart: imgChartUp },
      { label: 'Avg (7 day)',      value: '124', unit: 'mg/dL', chart: imgChartFlat },
    ],
    statusInsights: ['Pre-Diabetic Range', 'Monitor Closely'],
    aiInsight: 'Your post-meal reading is slightly high. Consider a lighter meal and a short walk after eating.',
  },
];

const BULLET_POINTS = [
  'Simple setup. Smarter monitoring.',
  'Native Total Care integration',
  'No third-party health hub dependency',
  'Clinically validated branded devices',
  'Accurate, real-time health tracking',
  'Simple setup. No ecosystem lock-in.',
];

/* ─── CartIcon ───────────────────────────────────────────────────────────────── */
function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
      className="shrink-0">
      <path d="M1.5 1.5H4L5.76 10.39C5.82 10.7 5.99 10.98 6.24 11.17C6.49 11.36 6.8 11.46 7.12 11.45H13.5C13.82 11.46 14.13 11.36 14.38 11.17C14.63 10.98 14.8 10.7 14.86 10.39L16 4.5H4.17"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7"   cy="15" r="1" fill="white"/>
      <circle cx="13.5" cy="15" r="1" fill="white"/>
    </svg>
  );
}

/* ─── Product detail panel ───────────────────────────────────────────────────── */
function ProductPanel({ product }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. Main product card ── */}
      <div className="bg-white rounded-[48px] p-4
                      shadow-[0px_0px_12px_rgba(0,124,31,0.08)]
                      flex flex-col gap-8">

        {/* Product app screenshot */}
        <div className="relative w-full rounded-[32px] overflow-hidden
                        shadow-[inset_0px_0px_6px_0px_rgba(0,65,114,0.24)]"
             style={{ aspectRatio: '428 / 444' }}>
          <img
            src={product.cardImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-8 px-3 pb-3">
          <h3 className="font-inter font-bold text-[32px] leading-none text-black">
            {product.name}
          </h3>
          <p className="font-inter font-light text-[16px] leading-7
                        tracking-[0.5184px] text-black">
            {product.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-6 w-full">
            {/* Explore — ghost */}
            <button
              onClick={() => navigate(`/product/${product.routeId}`)}
              className="w-full h-12 flex items-center justify-center
                         px-4 rounded-[12px]
                         font-inter font-medium text-[16px] text-[#004172]
                         tracking-[0.2592px]
                         drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                         shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]"
            >
              Explore
            </button>

            {/* Add to Cart — navy filled */}
            <button
              className="relative w-full h-12 flex items-center justify-center gap-2
                         px-6 rounded-[12px]
                         font-inter font-medium text-[16px] text-white
                         tracking-[0.2592px]
                         drop-shadow-[0px_2px_2px_rgba(0,65,114,0.08)]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                         hover:brightness-110 transition-all duration-150"
            >
              <div className="absolute inset-0 bg-[#004172] rounded-[12px] pointer-events-none" />
              <div className="absolute inset-0 rounded-[12px] pointer-events-none
                              shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.08)]" />
              <span className="relative z-10">Add to Cart</span>
              <span className="relative z-10"><CartIcon /></span>
            </button>
          </div>
        </div>

        {/* Feature badges strip */}
        <div className="relative w-full rounded-[32px] overflow-hidden"
             style={{ aspectRatio: '428 / 121' }}>
          <img
            src={imgFeatureBadges}
            alt="Clinically validated, Accurate readings, Trusted by millions"
            className="absolute inset-0 w-full h-full object-cover rounded-[32px]"
          />
          <div className="absolute inset-0 rounded-[32px] bg-[rgba(0,184,46,0.04)]" />
        </div>
      </div>

      {/* ── 2. Doctor consultation card ── */}
      <div className="relative w-full rounded-[24px] overflow-hidden"
           style={{ aspectRatio: '359 / 535' }}>
        <img
          src={imgDoctor}
          alt="Doctor consultation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-6 left-6">
          <span className="bg-[rgba(0,0,0,0.16)] text-white font-inter font-medium
                           text-[16px] uppercase tracking-[0.5184px] leading-normal
                           px-4 py-3 rounded-[40px]">
            {product.doctorLabel}
          </span>
        </div>
      </div>

      {/* ── 3. Testimonial card ── */}
      <div className="relative rounded-[48px] p-4 flex gap-3 items-start
                      shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]
                      drop-shadow-[0px_4px_6px_rgba(0,65,114,0.08)]"
           style={{
             background: 'radial-gradient(ellipse 100% 50% at 50% 50%, #FFF8E9 0%, #FFFFFF 100%)',
           }}>

        {/* Avatar + name */}
        <div className="flex flex-col gap-3 items-center shrink-0">
          <div className="w-[130px] h-[130px] rounded-[32px] overflow-hidden shrink-0">
            <img
              src={product.testimonial.photo}
              alt={product.testimonial.name}
              className="w-full h-full object-cover object-bottom"
            />
          </div>
          <p className="font-inter font-medium text-[16px] text-black text-center
                        tracking-[0.5184px] leading-7 whitespace-nowrap">
            {product.testimonial.name}
          </p>
        </div>

        {/* Quote content */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {/* Verified badge */}
          <div className="self-start bg-[#FFF5DF] px-3 py-2 rounded-[16px]">
            <span className="font-inter font-medium text-[12px] text-[#D29300]
                             tracking-[0.3883px] leading-[20px] whitespace-nowrap">
              Verified User
            </span>
          </div>

          {/* Quote text */}
          <div className="flex flex-col gap-3 px-3">
            <p className="text-[#D29300] text-[40px] leading-none"
               style={{ fontFamily: 'Katibeh, serif' }}>"</p>
            <p className="font-inter italic font-normal text-[16px] text-[#4D4D4D]
                          leading-6 tracking-[0.5184px]">
              {product.testimonial.text}
            </p>
            <div className="flex justify-end">
              <p className="text-[#D29300] text-[40px] leading-none rotate-180"
                 style={{ fontFamily: 'Katibeh, serif' }}>"</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none rounded-[48px]
                        shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]" />
      </div>

      {/* ── 4. Data insights card ── */}
      <div className="relative rounded-[32px] overflow-hidden p-6 flex flex-col gap-6
                      shadow-[0px_4px_12px_0px_rgba(0,65,114,0.08)]
                      shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]"
           style={{
             background: 'radial-gradient(ellipse 100% 50% at 50% 50%, #F2FBFD 0%, #FFFFFF 100%)',
           }}>

        {/* Title */}
        <div className="flex items-center justify-center py-3">
          <p className="font-inter font-medium text-[24px] tracking-[0.3888px]
                        leading-none whitespace-pre-wrap text-center"
             style={{
               background: 'linear-gradient(180deg, #0185DE 0%, #013253 100%)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               backgroundClip: 'text',
             }}>
            {'Your data,\ntranslated into clarity.'}
          </p>
        </div>

        <div className="w-full h-px bg-[#D7EAF9]" />

        {/* Metrics */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <p className="font-inter font-medium text-[12px] text-[#4D4D4D]
                          tracking-[0.3883px] leading-[20px]">Latest Reading</p>
            <p className="font-inter font-medium text-[12px] text-[#999]
                          tracking-[0.3883px] leading-[20px]">(Today, 8:30 AM)</p>
          </div>

          <div className="flex flex-wrap gap-6">
            {product.metrics.map((m, i) => (
              <div key={i} className="flex items-center justify-between w-[150px]">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-[3px] items-center">
                    <img src={imgHeartSmall} alt="" className="w-[11px] h-[11px] shrink-0" />
                    <p className="font-inter font-medium text-[12px] text-[#008EB1]
                                  tracking-[0.3883px] leading-[20px] whitespace-nowrap">
                      {m.label}
                    </p>
                  </div>
                  <div className="flex gap-1 items-end">
                    <p className="font-inter font-medium text-[24px] text-black
                                  tracking-[0.3888px] leading-none">
                      {m.value}
                    </p>
                    <p className="font-inter font-medium text-[12px] text-[#666]
                                  tracking-[0.3883px] leading-[20px]">
                      {m.unit}
                    </p>
                  </div>
                </div>
                <img src={m.chart} alt="" className="w-[44px] h-[8px] shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#D7EAF9]" />

        {/* Status insights */}
        <div className="flex flex-col gap-4">
          <p className="font-inter font-medium text-[12px] text-[#4D4D4D]
                        tracking-[0.3883px] leading-[20px]">Status Insights</p>
          <div className="flex gap-1 flex-wrap">
            {product.statusInsights.map((s, i) => (
              <span key={i} className="font-inter font-medium text-[12px] text-[#999]
                                       tracking-[0.3883px] leading-[20px]">
                {s}{i < product.statusInsights.length - 1 ? ' •' : ''}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#D7EAF9]" />

        <p className="font-inter font-semibold text-[12px] text-[#808080]
                      tracking-[0.1944px] text-center leading-none">
          Auto-synced. No manual logging.
        </p>

        <div className="absolute inset-0 pointer-events-none rounded-[32px]
                        shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]" />
      </div>

      {/* ── 5. AI insight card ── */}
      <div className="relative rounded-[32px] p-6 flex flex-col gap-6
                      drop-shadow-[0px_4px_6px_rgba(0,65,114,0.08)]
                      shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]"
           style={{
             background: 'radial-gradient(ellipse 100% 50% at 50% 50%, #F2FBFD 0%, #FFFFFF 100%)',
           }}>

        <div className="flex gap-2 items-center">
          <img src={imgHeartLarge} alt="" className="w-6 h-6 shrink-0" />
          <p className="font-inter font-medium text-[18px] text-[#008EB1]
                        tracking-[0.5825px] leading-7 whitespace-nowrap">
            Blood Pressure
          </p>
        </div>

        <p className="font-inter font-medium text-[16px] text-[#4D4D4D]
                      tracking-[0.5184px] leading-7">
          {product.aiInsight}
        </p>

        <div className="absolute inset-0 pointer-events-none rounded-[32px]
                        shadow-[inset_0px_0px_2px_0px_rgba(0,65,114,0.16)]" />
      </div>

    </div>
  );
}

/* ─── WorksWithTotalCareSection ──────────────────────────────────────────────── */
export default function WorksWithTotalCareSection() {
  const [activeTab, setActiveTab] = useState(0);
  const product = PRODUCTS[activeTab];

  return (
    <section className="bg-white w-full">
      <div
        className="flex flex-col lg:flex-row gap-12 lg:gap-[80px] xl:gap-[120px]
                   items-start
                   px-4 md:px-8 lg:px-16 xl:px-[120px]
                   py-[80px] md:py-[100px] lg:py-[120px]"
      >

        {/* ── LEFT: Heading + bullets + tabs ── */}
        <div className="flex flex-col gap-8 lg:gap-10 w-full lg:w-[420px] xl:w-[480px]
                        shrink-0 lg:sticky lg:top-[120px]">

          {/* Heading */}
          <div className="flex flex-col gap-6">
            <h2 className="font-inter font-bold leading-none text-black
                           text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px]
                           whitespace-pre-wrap">
              {'Works directly\nwith Total Care'}
            </h2>

            <ul className="list-disc pl-5 flex flex-col gap-1">
              {BULLET_POINTS.map((point, i) => (
                <li key={i}
                    className="font-inter font-light text-[14px] leading-6
                               tracking-[0.4536px] text-black">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Product tabs */}
          <div className="flex flex-col w-full">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(i)}
                className={`w-full text-left px-5 py-[14px] text-[16px]
                            font-inter tracking-[0.5184px] leading-7
                            transition-colors duration-150
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004172]
                            ${i === activeTab
                              ? 'font-bold text-[#004172] border-b-2 border-[#004172]'
                              : 'font-medium text-[#808080] border-b border-[#E5E5E5] hover:text-[#004172]'
                            }`}
              >
                {p.tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Product detail panel ── */}
        <div className="flex-1 min-w-0 w-full">
          <ProductPanel key={activeTab} product={product} />
        </div>

      </div>
    </section>
  );
}
