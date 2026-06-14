/**
 * Seed image URLs for all content images.
 * Replace the placeholder GCS URLs below with your actual Google Cloud Storage URLs.
 * Format: https://storage.googleapis.com/totalcare-assets/<category>/<filename>
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GCS = 'https://console.cloud.google.com/storage/browser/d2c-ruralos-assets';

async function main() {
  // ── Care Service card backgrounds ──────────────────────────────────────────
  const careImages = [
    {
      id: 'doctor',
      imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_1_default.jpg`,
      expandedImageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_1.jpg`,
    },
    {
      id: 'ai',
      imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_2_default.jpg`,
      expandedImageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_2.jpg`,
    },
    {
      id: 'concierge',
      imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_3_default.jpg`,
      expandedImageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_3.jpg`,
    },
    {
      id: 'diet',
      imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_4_default.jpg`,
      expandedImageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_4.jpg`,
    },
    {
      id: 'device',
      imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_5_default.jpg`,
      expandedImageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_5.jpg`,
    },
    {
      id: 'medicines',
      imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_6_default.jpg`,
      expandedImageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Offerings_6.jpg`,
    },
  ];

  for (const c of careImages) {
    await prisma.careService.update({
      where: { id: c.id },
      data: { imageUrl: c.imageUrl, expandedImageUrl: c.expandedImageUrl },
    });
  }
  console.log('✓ Care service image URLs seeded');

  // ── Testimonial photo URLs ──────────────────────────────────────────────────
  const testimonialPhotos = [
    { serviceId: 'doctor',    photoUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Testimonial_2.png` },
    { serviceId: 'ai',        photoUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Testimonial_3.png` },
    { serviceId: 'concierge', photoUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Testimonial_4.png` },
    { serviceId: 'diet',      photoUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Testimonial_5.png` },
    { serviceId: 'device',    photoUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Testimonial_6.png` },
    { serviceId: 'medicines', photoUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Offerings_section/Testimonial_7.png` },
  ];

  for (const t of testimonialPhotos) {
    await prisma.testimonial.updateMany({
      where: { serviceId: t.serviceId },
      data: { photoUrl: t.photoUrl },
    });
  }

  // Product testimonial photos
  const productTestimonialPhotos = [
    { productId: 'bp',          photoUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Testimonials_section/Testimonial_1.png` },
    { productId: 'scale',       photoUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Testimonials_section/Testimonial_2.png` },
    { productId: 'glucose',     photoUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Testimonials_section/Testimonial_3.png` },
  ];
  for (const t of productTestimonialPhotos) {
    await prisma.testimonial.updateMany({
      where: { productId: t.productId },
      data: { photoUrl: t.photoUrl },
    });
  }
  console.log('✓ Testimonial photo URLs seeded');

  // ── Product images (card, hero, product_detail, trust_banner, tech_specs, whats_in_box, tips) ──
  const productImages = [
    // Omron BP Monitor
    { productId: 'bp', imageType: 'card',          imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Product_listings/BP.png`,           altText: 'Omron BP Monitor card' },
    { productId: 'bp', imageType: 'hero',           imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/Hero_img_1.png`,           altText: 'Omron BP Monitor hero' },
    { productId: 'bp', imageType: 'product_detail', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Product_listings/WDWTC%20BP.png`, altText: 'Omron BP Monitor product' },
    { productId: 'bp', imageType: 'trust_banner',   imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Testimonials_section/trust_banner.png`,   altText: 'Omron trust banner' },
    { productId: 'bp', imageType: 'tech_specs',     imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/Omron_BP_Monitor_technical_specification_img.png`,     altText: 'Omron tech specs' },
    { productId: 'bp', imageType: 'whats_in_box',   imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/whats_in_box.png`,   altText: 'Omron box contents' },
    { productId: 'bp', imageType: 'tips',           imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Tips_2%20BP%20(1).png`,           altText: 'Omron usage tips' },
    { productId: 'bp', imageType: 'bundle_component', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/Omron_BP_Monitor-HEM-7140-AP_bill_img.png`, altText: 'Omron bundle' },

    // Meditive Scale
    { productId: 'scale', imageType: 'card',          imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Product_listings/Scale.png`,           altText: 'Meditive Scale card' },
    { productId: 'scale', imageType: 'hero',           imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Hero_img.png`,           altText: 'Meditive Scale hero' },
    { productId: 'scale', imageType: 'product_detail', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Product_listings/WDWTC%20SCALE.png`, altText: 'Meditive Scale product' },
    { productId: 'scale', imageType: 'trust_banner',   imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Testimonials_section/trust_banner.png`,      altText: 'Meditive Scale trust banner' },
    { productId: 'scale', imageType: 'tech_specs',     imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/technical_specifications_scale.png`,     altText: 'Scale tech specs' },
    { productId: 'scale', imageType: 'whats_in_box',   imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Whats_in_box.png`,   altText: 'Scale box contents' },
    { productId: 'scale', imageType: 'tips',           imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/tips%20scale%20(1).png`,           altText: 'Scale usage tips' },
    { productId: 'scale', imageType: 'bundle_component', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Meditive_Body_Composition_Scale_bill_img.png`, altText: 'Scale bundle' },

    // GlucoBuddy
    { productId: 'glucose', imageType: 'card',          imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Product_listings/Glucometer.png`,           altText: 'GlucoBuddy card' },
    { productId: 'glucose', imageType: 'hero',           imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Hero_img_1.png`,           altText: 'GlucoBuddy hero' },
    { productId: 'glucose', imageType: 'product_detail', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Product_listings/WDWTC%20RGB.png`, altText: 'GlucoBuddy product' },
    { productId: 'glucose', imageType: 'trust_banner',   imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Testimonials_section/trust_banner.png`,        altText: 'GlucoBuddy trust banner' },
    { productId: 'glucose', imageType: 'tech_specs',     imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Technical_Specifications.png`,     altText: 'GlucoBuddy tech specs' },
    { productId: 'glucose', imageType: 'whats_in_box',   imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Whats_in_box_1.png`,   altText: 'GlucoBuddy box contents' },
    { productId: 'glucose', imageType: 'tips',           imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/tips_1%20rgb%20(1).png`,           altText: 'GlucoBuddy usage tips' },
    { productId: 'glucose', imageType: 'bundle_component', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/RGB_Glucometer_bill_img.png`, altText: 'GlucoBuddy bundle' },

    // Bundle products
    { productId: 'bp-essentials',       imageType: 'card', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Product_listings/BP_%2B_Scale.png`,       altText: 'BP Essentials bundle' },
    { productId: 'bp-essentials',       imageType: 'hero', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Bundles%20Assets/BP_%2B_Scale_Bundle_Assets/Hero_img_1.png`,       altText: 'BP Essentials hero' },
    { productId: 'diabetes-essentials', imageType: 'card', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Product_listings/BP_%2B_Glucometer.png`, altText: 'Diabetes Essentials bundle' },
    { productId: 'diabetes-essentials', imageType: 'hero', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Bundles%20Assets/Glucometre_%2B_Scale_Bundle_Assets/Hero_img_1.jpg`, altText: 'Diabetes Essentials hero' },
    { productId: 'complete-essentials', imageType: 'card', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Product_listings/BP_%2B_Scale_%2B_Glucometer_Bundle.png`, altText: 'Complete Essentials bundle' },
    { productId: 'complete-essentials', imageType: 'hero', imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Bundles%20Assets/BP_%2B_Scale_%2B_Glucometre_Bundle_Assets/Hero_img_1.png`, altText: 'Complete Essentials hero' },
  ];

  for (const img of productImages) {
    // Upsert by productId + imageType (avoid duplicates on re-run)
    const existing = await prisma.productImage.findFirst({
      where: { productId: img.productId, imageType: img.imageType },
    });
    if (existing) {
      await prisma.productImage.update({
        where: { id: existing.id },
        data: { imageUrl: img.imageUrl, altText: img.altText },
      });
    } else {
      await prisma.productImage.create({ data: img });
    }
  }
  console.log('✓ Product image URLs seeded');

  // ── How It Works step images ────────────────────────────────────────────────
  const howItWorksImages = [
    // BP steps (step numbers 1-5)
    { productId: 'bp', stepNumber: 1, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_1.png` },
    { productId: 'bp', stepNumber: 2, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_2.png` },
    { productId: 'bp', stepNumber: 3, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_3.png` },
    { productId: 'bp', stepNumber: 4, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_4.png` },
    { productId: 'bp', stepNumber: 5, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_5.png` },
    // Scale steps
    { productId: 'scale', stepNumber: 1, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/How_it_works_1.png` },
    { productId: 'scale', stepNumber: 2, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/How_it_works_2.png` },
    { productId: 'scale', stepNumber: 3, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/How_it_works_3.png` },
    { productId: 'scale', stepNumber: 4, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/How_it_works_4.png` },
    // Glucose steps
    { productId: 'glucose', stepNumber: 1, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_1.png` },
    { productId: 'glucose', stepNumber: 2, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_2.png` },
    { productId: 'glucose', stepNumber: 3, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_3.png` },
    { productId: 'glucose', stepNumber: 4, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_4.png` },
    { productId: 'glucose', stepNumber: 5, imageUrl: `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/How_it_works_5.png` },
  ];

  for (const s of howItWorksImages) {
    await prisma.productHowItWorksStep.updateMany({
      where: { productId: s.productId, stepNumber: s.stepNumber },
      data: { imageUrl: s.imageUrl },
    });
  }
  console.log('✓ How-it-works step image URLs seeded');

  // ── Highlight card images ───────────────────────────────────────────────────
  const highlightCards = await prisma.highlightCard.findMany({ orderBy: { displayOrder: 'asc' } });
  const highlightImageUrls = [
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Highlight_section/Highlight_1.png`,
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Highlight_section/Highlight_3.png`,
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Highlight_section/Highlight_5.png`,
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Highlight_section/Highlight_2.png`,
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Highlight_section/Highlight_5.png`,
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Highlight_section/Highlight_4.png`,
  ];
  for (let i = 0; i < highlightCards.length; i++) {
    await prisma.highlightCard.update({
      where: { id: highlightCards[i].id },
      data: { imageUrl: highlightImageUrls[i] ?? `${GCS}/highlights/card-${i + 1}.jpg` },
    });
  }
  console.log('✓ Highlight card image URLs seeded');

  // ── Health360 frame images ──────────────────────────────────────────────────
  const health360Frames = await prisma.health360Frame.findMany({ orderBy: { displayOrder: 'asc' } });
  const health360ImageUrls = [
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Health_simplified_360/1.jpg`,
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Health_simplified_360/2.jpg`,
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Health_simplified_360/3.jpg`,
    `https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/HomePage_Assets/Health_simplified_360/4.jpg`,
  ];
  for (let i = 0; i < health360Frames.length; i++) {
    await prisma.health360Frame.update({
      where: { id: health360Frames[i].id },
      data: { imageUrl: health360ImageUrls[i] ?? `${GCS}/health360/h360-${i}.jpg` },
    });
  }
  console.log('✓ Health360 frame image URLs seeded');



  console.log('\n✅ All image URLs seeded successfully.');
  console.log('Replace placeholder GCS URLs with real URLs when available.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
