// ── Hero/Explore page images (ProductHeroSection, ProductExplorePage) ──────────
import comboComplete from './product-explore/Glucometer + scale +BP for explore hero page.png';
import comboBpScale  from './product-explore/BP + Scale for explore hero page.png';
import comboDiabetes from './product-explore/Glucometer + scale for explore hero page.png';
import omronHero     from './product-explore/Omron BP for explore hero page.png';
import meditiveHero  from './product-explore/Weight scale for explore hero page.png';
import glucoHero     from './product-explore/RGB GlucoBuddy Glucometer for explore hero page.png';

// ── Listing section card backgrounds (IndividualListingSection) ────────────────
// All card images come from GCP (stored in DB). No local fallbacks needed.

// ── Listing section card icons ─────────────────────────────────────────────────
import iconWeightMachine from './products/icons/weight machine green.svg';
import iconHeart         from './products/icons/heart green.svg';
import iconShieldTick    from './products/icons/shild tick green complete health essential.svg';
import iconWaterDrop     from './products/icons/water drop box.svg';

// ── Bundle component images (BundleSection) ────────────────────────────────────
import glucobuddyImg    from './product-explore/glucobuddy.png';
import omronBpImg       from './product-explore/omron-bp.png';
import meditiveScaleImg from './product-explore/meditive-scale.png';
import totalCareImg     from './product-explore/totalcare-subscription.png';

// ── ProductShowcase concern images ─────────────────────────────────────────────
import productBp     from './product-showcase/products/product-bp.jpg';
import productFamily from './product-showcase/products/product-family.jpg';
import productWeight from './product-showcase/products/product-weight.jpg';
import productPrev   from './product-showcase/products/product-preventive.jpg';
import productSugar  from './product-showcase/products/product-sugar.jpg';
import productPost   from './product-showcase/products/product-post-diag.jpg';

// ── ProductShowcase concern icons ──────────────────────────────────────────────
import iconBp         from './product-showcase/icons/icon-bp.svg';
import iconFamily     from './product-showcase/icons/icon-family.svg';
import iconWeight     from './product-showcase/icons/icon-weight.svg';
import iconPreventive from './product-showcase/icons/icon-preventive.svg';
import iconSugar      from './product-showcase/icons/icon-sugar.svg';
import iconPostDiag   from './product-showcase/icons/icon-post-diag.svg';

/**
 * Maps product ID → explore-page hero image.
 * Used by ProductHeroSection & ProductExplorePage.
 */
export const PRODUCT_HERO_IMAGES = {
  'complete-essentials': comboComplete,
  'bp-essentials':       comboBpScale,
  'diabetes-essentials': comboDiabetes,
  'scale':               meditiveHero,
  'glucose':             glucoHero,
  'bp':                  omronHero,
};

/**
 * Maps product ID → { bgImage, icon } for IndividualListingSection cards.
 */
export const PRODUCT_CARD_ASSETS = {
  'complete-essentials': { bgImage: null,         icon: iconShieldTick    }, // card image → GCP
  'bp-essentials':       { bgImage: null,         icon: iconWeightMachine }, // card image → GCP
  'diabetes-essentials': { bgImage: null,         icon: iconHeart         }, // card image → GCP
  'scale':               { bgImage: null,         icon: iconWeightMachine }, // card image → GCP
  'glucose':             { bgImage: null,         icon: iconWaterDrop     }, // card image → GCP
  'bp':                  { bgImage: null,         icon: iconHeart         }, // card image → GCP
};

/**
 * Maps product component ID → bundle section image.
 */
export const BUNDLE_COMPONENT_IMAGES = {
  'bp':      omronBpImg,
  'glucose': glucobuddyImg,
  'scale':   meditiveScaleImg,
};

export const SUBSCRIPTION_IMAGE = totalCareImg;

/**
 * Maps health concern ID → { icon, productImage }.
 */
export const CONCERN_ASSETS = {
  'bp':         { icon: iconBp,         productImage: productBp },
  'family':     { icon: iconFamily,     productImage: productFamily },
  'weight':     { icon: iconWeight,     productImage: productWeight },
  'preventive': { icon: iconPreventive, productImage: productPrev },
  'sugar':      { icon: iconSugar,      productImage: productSugar },
  'post-diag':  { icon: iconPostDiag,   productImage: productPost },
};
