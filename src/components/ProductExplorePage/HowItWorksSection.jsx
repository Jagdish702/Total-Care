import { useState, useRef, useCallback } from 'react';

/* ─── Step images ─────────────────────────────────────────────────────────────
   Scale (Meditive Body Composition Scale) — 4 steps
   BP    (Omron BP Monitor)                — 5 steps
   Glucose (GlucoBuddy)                   — 5 steps
────────────────────────────────────────────────────────────────────────────── */

// Scale
import scaleStep1Img from '../../assets/product-explore/scale step 1 img.png';
import scaleStep2Img from '../../assets/product-explore/how-it-works-scale-step2.png';
import scaleStep3Img from '../../assets/product-explore/how-it-works-scale-step3.png';
import scaleStep4Img from '../../assets/product-explore/how-it-works-scale-step4.png';

// BP (Omron)
import bpStep1Img from '../../assets/product-explore/how-it-works-bp-step1.png';
import bpStep2Img from '../../assets/product-explore/how-it-works-bp-step2.png';
import bpStep3Img from '../../assets/product-explore/how-it-works-bp-step3.png';
import bpStep4Img from '../../assets/product-explore/how-it-works-bp-step4.png';
import bpStep5Img from '../../assets/product-explore/how-it-works-bp-step5.png';

// Glucose (GlucoBuddy) — exact images from Figma node 615:6847
import glucoStep1Img from '../../assets/product-explore/how-it-works-gluco-step1.png';
import glucoStep2Img from '../../assets/product-explore/how-it-works-gluco-step2.png';
import glucoStep3Img from '../../assets/product-explore/how-it-works-gluco-step3.png';
import glucoStep4Img from '../../assets/product-explore/how-it-works-gluco-step4.png';
import glucoStep5Img from '../../assets/product-explore/how-it-works-gluco-step5.png';

/* ─── Step data ────────────────────────────────────────────────────────────── */

const SCALE_STEPS = [
  {
    number: '1',
    title: 'Step On',
    description:
      'Place the scale on a hard, flat surface. Step on with bare feet to ensure the electrodes can accurately measure impedance.',
    image: scaleStep1Img,
    objectPosition: 'center',
  },
  {
    number: '2',
    title: 'Sync',
    description:
      'Open the Total Care app on your smartphone. The scale connects automatically via Bluetooth to transmit your data in real-time.',
    image: scaleStep2Img,
    objectPosition: 'center',
  },
  {
    number: '3',
    title: 'Analyze',
    description:
      'Wait a few seconds for the scale to process. Your weight and other body metrics will appear instantly on the app dashboard.',
    image: scaleStep3Img,
    objectPosition: 'center',
  },
  {
    number: '4',
    title: 'Track',
    description:
      'Save your results to visualize long-term trends. Compare your daily, weekly, or monthly progress to stay on top of your fitness goals.',
    image: scaleStep4Img,
    objectPosition: 'center',
  },
];

const BP_STEPS = [
  {
    number: '1',
    title: 'Wear',
    description: 'Wrap the cuff around your arm and sit comfortably.',
    image: bpStep1Img,
    objectPosition: 'center',
  },
  {
    number: '2',
    title: 'Measure',
    description: 'Press start. The device captures accurate readings in seconds.',
    image: bpStep2Img,
    objectPosition: 'center',
  },
  {
    number: '3',
    title: 'Sync',
    description: 'Your data automatically syncs with the app.',
    image: bpStep3Img,
    objectPosition: 'center',
  },
  {
    number: '4',
    title: 'Understand',
    description: 'View trends, insights, and alerts in one place.',
    image: bpStep4Img,
    objectPosition: 'center',
  },
  {
    number: '5',
    title: 'Act',
    description: 'Get nudges to improve your daily habits.',
    image: bpStep5Img,
    objectPosition: 'center',
  },
];

const GLUCOSE_STEPS = [
  {
    number: '1',
    title: 'Prepare',
    description: 'Wash and dry your hands and the lancing site.',
    image: glucoStep1Img,
    objectPosition: 'center',
  },
  {
    number: '2',
    title: 'Insert',
    description: 'Insert a test strip into the meter. It turns on automatically.',
    image: glucoStep2Img,
    objectPosition: 'center',
  },
  {
    number: '3',
    title: 'Lance',
    description: 'Use the lancing device to obtain a small blood droplet.',
    image: glucoStep3Img,
    objectPosition: 'center',
  },
  {
    number: '4',
    title: 'Test',
    description: 'Gently apply the blood drop to the edge of the test strip.',
    image: glucoStep4Img,
    objectPosition: 'center',
  },
  {
    number: '5',
    title: 'Read',
    description: 'View your results on the large, backlit display in 5 seconds.',
    image: glucoStep5Img,
    objectPosition: 'center',
  },
];

/* ─── Product → tab config (hardcoded fallback) ─────────────────────────────── */

const PRODUCT_TABS = {
  'complete-essentials': [
    { label: 'Meditive Body Composition Scale', steps: SCALE_STEPS },
    { label: 'Omron BP Monitor',               steps: BP_STEPS    },
    { label: 'GlucoBuddy CGM',                 steps: GLUCOSE_STEPS },
  ],
  'bp-essentials': [
    { label: 'Meditive Body Composition Scale', steps: SCALE_STEPS },
    { label: 'Omron BP Monitor',               steps: BP_STEPS    },
  ],
  'diabetes-essentials': [
    { label: 'Meditive Body Composition Scale', steps: SCALE_STEPS  },
    { label: 'GlucoBuddy CGM',                 steps: GLUCOSE_STEPS },
  ],
  'scale': [
    { label: 'Meditive Body Composition Scale', steps: SCALE_STEPS },
  ],
  'glucose': [
    { label: 'GlucoBuddy CGM', steps: GLUCOSE_STEPS },
  ],
  'bp': [
    { label: 'Omron BP Monitor', steps: BP_STEPS },
  ],
};

const DEFAULT_TABS = [
  { label: 'Meditive Body Composition Scale', steps: SCALE_STEPS },
  { label: 'Omron BP Monitor',               steps: BP_STEPS    },
];

/* ─── Dynamic DB helpers ────────────────────────────────────────────────────── */

// Maps product id → ordered step images (stays hardcoded)
const STEP_IMAGES = {
  'scale':   [scaleStep1Img, scaleStep2Img, scaleStep3Img, scaleStep4Img],
  'bp':      [bpStep1Img, bpStep2Img, bpStep3Img, bpStep4Img, bpStep5Img],
  'glucose': [glucoStep1Img, glucoStep2Img, glucoStep3Img, glucoStep4Img, glucoStep5Img],
};

// Maps product id → display label for the tab
const PRODUCT_TAB_LABEL = {
  'scale':   'Meditive Body Composition Scale',
  'bp':      'Omron BP Monitor',
  'glucose': 'GlucoBuddy CGM',
  'complete-essentials': 'Complete Essentials',
  'bp-essentials':       'BP Essentials',
  'diabetes-essentials': 'Diabetes Essentials',
};

function buildStepsFromDB(dbSteps, productId) {
  const imgs = STEP_IMAGES[productId] || [];
  return dbSteps.map((s, i) => ({
    number: String(s.stepNumber ?? i + 1),
    title: s.title,
    description: s.description,
    image: imgs[i] || null,
    objectPosition: 'center',
  }));
}

function buildTabsFromProduct(product) {
  if (!product) return DEFAULT_TABS;

  // Individual product with DB steps
  if ((product.howItWorksSteps ?? []).length > 0) {
    return [{
      label: PRODUCT_TAB_LABEL[product.id] || product.name,
      steps: buildStepsFromDB(product.howItWorksSteps, product.id),
    }];
  }

  // Bundle: derive tabs from each component's steps
  if ((product.bundleItems ?? []).length > 0) {
    const tabs = product.bundleItems
      .filter(bi => (bi.component.howItWorksSteps ?? []).length > 0)
      .map(bi => ({
        label: PRODUCT_TAB_LABEL[bi.component.id] || bi.component.name,
        steps: buildStepsFromDB(bi.component.howItWorksSteps, bi.component.id),
      }));
    if (tabs.length > 0) return tabs;
  }

  // Hardcoded fallback
  return PRODUCT_TABS[product.id] || DEFAULT_TABS;
}

/* ─── HowItWorksSection ─────────────────────────────────────────────────────── */

export default function HowItWorksSection({ product }) {
  const tabs  = buildTabsFromProduct(product);

  const [activeTab,  setActiveTab]  = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Touch swipe support
  const touchStartY  = useRef(null);
  // Mouse drag support (desktop swipe)
  const mouseStartX  = useRef(null);
  const isDragging   = useRef(false);

  const steps       = tabs[activeTab].steps;
  const currentStep = steps[activeStep];

  /* navigation */
  const navigate = useCallback((dir) => {
    setActiveStep((s) => {
      const next = s + dir;
      if (next < 0 || next >= steps.length) return s;
      return next;
    });
  }, [steps.length]);

  const handleTabChange = (idx) => {
    if (idx === activeTab) return;
    setActiveTab(idx);
    setActiveStep(0);
  };

  /* ── Touch swipe handlers (mobile) ── */
  const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd   = (e) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 40) navigate(diff > 0 ? 1 : -1);
    touchStartY.current = null;
  };

  /* ── Mouse drag handlers (desktop swipe) ── */
  const onMouseDown  = (e) => { mouseStartX.current = e.clientX; isDragging.current = false; };
  const onMouseMove  = (e) => { if (mouseStartX.current !== null && Math.abs(e.clientX - mouseStartX.current) > 5) isDragging.current = true; };
  const onMouseUp    = (e) => {
    if (mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1); // drag left → next, drag right → prev
    mouseStartX.current = null;
    isDragging.current  = false;
  };

  /* ── Keyboard navigation ── */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   navigate(-1);
  };

  return (
    <section id="how-it-works" className="w-full bg-white overflow-hidden">
      <div
        className="flex flex-col gap-[48px] lg:gap-[60px] items-center
                   px-4 md:px-8 lg:px-16 xl:px-[120px]
                   pt-[60px] md:pt-[80px] lg:pt-[100px]
                   pb-[60px] md:pb-[80px] lg:pb-[120px]"
      >

        {/* ── Heading — Figma: 96px bold, gradient green→black ── */}
        <h2
          className="font-inter font-bold text-center leading-none
                     text-[48px] md:text-[64px] lg:text-[96px]
                     bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(90deg, #3CBA84 17.42%, #000000 100%)',
          }}
        >
          How It Works
        </h2>

        {/* ── Tab navigation — Figma node 573:6331, w-[1077px] ── */}
        {tabs.length > 1 && (
          <div className="flex w-full max-w-[1077px] overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleTabChange(i)}
                className={`flex-1 px-4 py-[14px] text-center whitespace-nowrap
                            font-inter tracking-[0.3888px]
                            text-[13px] sm:text-[15px] md:text-[17px] lg:text-[20px]
                            transition-colors duration-200
                            ${activeTab === i
                              ? 'border-b-2 border-[#004172] text-[#004172] font-medium'
                              : 'border-b border-[#E5E5E5] text-[#808080] font-light hover:text-[#004172]'
                            }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Step content row — swipeable ── */}
        <div
          className="flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] items-center
                     w-full max-w-[1077px] select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => { mouseStartX.current = null; isDragging.current = false; }}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label="How it works steps. Swipe or use arrow keys to navigate."
          style={{ cursor: 'grab' }}
        >

          {/* Left: image + step dots */}
          <div className="flex flex-col items-center gap-5 w-full lg:w-auto shrink-0">

            {/* Image — Figma: 500×600 rounded-[40px] */}
            <div
              className="relative overflow-hidden rounded-[40px]
                         w-full max-w-[380px] sm:max-w-[420px] lg:w-[500px]"
              style={{ aspectRatio: '500 / 600' }}
            >
              <img
                key={`${activeTab}-${activeStep}`}
                src={currentStep.image}
                alt={`Step ${currentStep.number}: ${currentStep.title}`}
                className="absolute inset-0 w-full h-full object-cover
                           transition-opacity duration-300"
                style={{ objectPosition: currentStep.objectPosition || 'center' }}
                draggable={false}
              />
            </div>

            {/* Step indicator dots + left/right arrows */}
            <div className="flex gap-[12px] items-center">

              {/* ← Left arrow */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={activeStep === 0}
                aria-label="Previous step"
                className={`group w-10 h-10 rounded-full border-2 flex items-center justify-center
                            transition-all duration-200 focus:outline-none
                            focus-visible:ring-2 focus-visible:ring-[#004172] focus-visible:ring-offset-2
                            ${activeStep === 0
                              ? 'border-[#D4D4D4] text-[#D4D4D4] cursor-not-allowed'
                              : 'border-[#AAAAAA] text-[#AAAAAA] hover:border-[#004172] hover:text-[#004172] hover:bg-[#EDF5FF] active:bg-[#D6E9FF] cursor-pointer'
                            }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-[8px] items-center" role="tablist" aria-label="Step indicators">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === activeStep}
                    aria-label={`Step ${i + 1}`}
                    onClick={() => setActiveStep(i)}
                    className={`rounded-full transition-all duration-300 focus:outline-none
                      focus-visible:ring-2 focus-visible:ring-[#3CBA84] focus-visible:ring-offset-1
                      ${i === activeStep
                        ? 'w-8 h-[10px] bg-[#3CBA84]'
                        : 'w-[10px] h-[10px] bg-[#E5E5E5] hover:bg-[#004172]/30'
                      }`}
                  />
                ))}
              </div>

              {/* → Right arrow */}
              <button
                type="button"
                onClick={() => navigate(1)}
                disabled={activeStep === steps.length - 1}
                aria-label="Next step"
                className={`group w-10 h-10 rounded-full border-2 flex items-center justify-center
                            transition-all duration-200 focus:outline-none
                            focus-visible:ring-2 focus-visible:ring-[#004172] focus-visible:ring-offset-2
                            ${activeStep === steps.length - 1
                              ? 'border-[#D4D4D4] text-[#D4D4D4] cursor-not-allowed'
                              : 'border-[#AAAAAA] text-[#AAAAAA] hover:border-[#004172] hover:text-[#004172] hover:bg-[#EDF5FF] active:bg-[#D6E9FF] cursor-pointer'
                            }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

            </div>
          </div>

          {/* Right: number, title, description — Figma: left-[1005px], w-[370px] */}
          <div className="flex flex-col gap-[30px] lg:gap-[60px] flex-1 lg:max-w-[370px]">

            {/* Step number — Figma: 120px bold, #3CBA84 */}
            <p
              className="font-inter font-bold leading-none text-[#3CBA84]
                         text-[72px] md:text-[96px] lg:text-[120px]"
            >
              {currentStep.number}
            </p>

            {/* Title — Figma: 48px bold, #000000 */}
            <p
              className="font-inter font-bold leading-none text-black
                         text-[28px] md:text-[36px] lg:text-[48px]"
            >
              {currentStep.title}
            </p>

            {/* Description — Figma: 24px light, tracking-[0.3888px], #000000 */}
            <p
              className="font-inter font-light text-black leading-normal
                         tracking-[0.3888px]
                         text-[15px] md:text-[18px] lg:text-[24px]"
            >
              {currentStep.description}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
