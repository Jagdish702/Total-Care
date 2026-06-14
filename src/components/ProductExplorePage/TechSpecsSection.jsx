import { useState } from 'react';
import techSpecsScaleImg  from '../../assets/product-explore/tech-specs-scale.png';
import techSpecsOmronImg  from '../../assets/product-explore/omron bp tech spec.png';
import techSpecsGlucoImg  from '../../assets/product-explore/rgb glucobody tech spec.png';

/* ─── DB helpers ─────────────────────────────────────────────────────────────── */

const SPEC_IMAGES = {
  'scale':   techSpecsScaleImg,
  'bp':      techSpecsOmronImg,
  'glucose': techSpecsGlucoImg,
};

const SPEC_TAB_LABELS = {
  'scale':   'Meditive Body Composition Scale',
  'bp':      'Omron BP Monitor',
  'glucose': 'GlucoBuddy CGM',
};

function groupSpecs(techSpecs) {
  const grouped = {};
  const order = [];
  techSpecs.forEach(spec => {
    if (!grouped[spec.specGroup]) {
      grouped[spec.specGroup] = [];
      order.push(spec.specGroup);
    }
    grouped[spec.specGroup].push([spec.specLabel, spec.specValue]);
  });
  return order.map(group => ({ title: group, rows: grouped[group] }));
}

function buildSpecTabsFromProduct(product) {
  if (!product) return { tabs: [], images: [], allSpecs: [] };

  // Individual product with DB specs
  if ((product.techSpecs ?? []).length > 0) {
    const dbImg = (product.images ?? []).find(img => img.imageType === 'tech_specs')?.imageUrl ?? null;
    return {
      tabs:     [SPEC_TAB_LABELS[product.id] || product.name],
      images:   [dbImg || SPEC_IMAGES[product.id] || techSpecsScaleImg],
      allSpecs: [groupSpecs(product.techSpecs)],
    };
  }

  // Bundle: tab per component
  if ((product.bundleItems ?? []).length > 0) {
    const components = product.bundleItems.filter(bi => (bi.component.techSpecs ?? []).length > 0);
    if (components.length > 0) {
      return {
        tabs:     components.map(bi => SPEC_TAB_LABELS[bi.component.id] || bi.component.name),
        images:   components.map(bi => {
          const dbImg = (bi.component.images ?? []).find(img => img.imageType === 'tech_specs')?.imageUrl ?? null;
          return dbImg || SPEC_IMAGES[bi.component.id] || techSpecsScaleImg;
        }),
        allSpecs: components.map(bi => groupSpecs(bi.component.techSpecs)),
      };
    }
  }

  return { tabs: [], images: [], allSpecs: [] };
}

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
export default function TechSpecsSection({ product }) {
  const [activeTab, setActiveTab] = useState(0);

  const { tabs: dynamicTabs, images: dynamicImages, allSpecs: dynamicSpecs } = buildSpecTabsFromProduct(product);
  const specs = dynamicSpecs[activeTab] || dynamicSpecs[0] || [];

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
        <div className="flex items-stretch w-full max-w-[1077px] overflow-x-auto">
          {dynamicTabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex flex-1 items-center justify-center whitespace-nowrap
                          px-5 py-[14px] font-inter text-center
                          leading-normal tracking-[0.3888px]
                          text-[13px] sm:text-[15px] md:text-[17px] lg:text-[20px]
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
            src={dynamicImages[activeTab]}
            alt={dynamicTabs[activeTab]}
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
