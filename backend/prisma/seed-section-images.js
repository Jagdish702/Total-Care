const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  // ─── 1. "More than a device" banner images ──────────────────────────────────
  // One image slot per product / bundle.
  // Replace each imageUrl (currently '') with your GCS URL and re-run this seed.
  await prisma.productImage.deleteMany({ where: { imageType: 'more_than_device' } });
  await prisma.productImage.createMany({
    data: [
      // ── Bundles ──────────────────────────────────────────────────────────────
      { productId: 'complete-essentials',  imageType: 'more_than_device', imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Bundles%20Assets/BP_%2B_Scale_%2B_Glucometre_Bundle_Assets/More_than_device_img.png', altText: 'Complete Essentials health ecosystem' },
      { productId: 'bp-essentials',        imageType: 'more_than_device', imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Bundles%20Assets/BP_%2B_Scale_Bundle_Assets/More_than_device_img.png', altText: 'BP Essentials health ecosystem' },
      { productId: 'diabetes-essentials',  imageType: 'more_than_device', imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Bundles%20Assets/Glucometre_%2B_Scale_Bundle_Assets/More_than_device_img.png', altText: 'Diabetes Essentials health ecosystem' },
      ],
  });
  console.log('✓ More-than-a-device image slots created');
  console.log('  → Update imageUrl for each product above and re-run to apply your images.');

  // ─── 2. "Built for Progress" lifestyle card image URLs ──────────────────────
  // Update imageUrl for each card with your GCS URL, then re-run this seed.
  // Cards are identified by productId + displayOrder.
  // Captions / positions are managed in seed.js — only imageUrl is set here.
  const lifestyleCards = [
    // ── scale (4 cards) ──────────────────────────────────────────────────────────
    { productId: 'scale', displayOrder: 1, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_1.png' }, // card 1 – track baseline weight
    { productId: 'scale', displayOrder: 2, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_2.png' }, // card 2 – muscle mass & hydration
    { productId: 'scale', displayOrder: 3, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_3.png' }, // card 3 – long-term trends
    { productId: 'scale', displayOrder: 4, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_4.png' }, // card 4 – visceral fat & metabolic age

    // ── bp (4 cards) ──────────────────────────────────────────────────────────
    { productId: 'bp', displayOrder: 1, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/moment%204.png' }, // card 1 – morning check
    { productId: 'bp', displayOrder: 2, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/moment_1.png' }, // card 2 – track after activity
    { productId: 'bp', displayOrder: 3, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/moment_2.png' }, // card 3 – after a long day
    { productId: 'bp', displayOrder: 4, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/moment_3.png' }, // card 4 – before sleep

    // ── glucose (4 cards) ─────────────────────────────────────────────────────
    { productId: 'glucose', displayOrder: 1, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Built_for_monents_4.png' }, // card 1 – start of day
    { productId: 'glucose', displayOrder: 2, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Built_for_monents_3.png' }, // card 2 – after meals
    { productId: 'glucose', displayOrder: 3, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Built_for_monents_2.png' }, // card 3 – around activity
    { productId: 'glucose', displayOrder: 4, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Built_for_monents_1.png' }, // card 4 – before bed

    // ── bp-essentials (4 cards) ───────────────────────────────────────────────
    { productId: 'bp-essentials', displayOrder: 1, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_1.png' }, // card 1 – baseline weight
    { productId: 'bp-essentials', displayOrder: 2, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_3.png' }, // card 2 – long-term trends
    { productId: 'bp-essentials', displayOrder: 3, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/moment_1.png' }, // card 3 – after activity
    { productId: 'bp-essentials', displayOrder: 4, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/moment_2.png'}, // card 4 – after a long day

    // ── diabetes-essentials (4 cards) ─────────────────────────────────────────
    { productId: 'diabetes-essentials', displayOrder: 1, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_1.png' }, // card 1 – baseline weight
    { productId: 'diabetes-essentials', displayOrder: 2, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_3.png'}, // card 2 – long-term trends
    { productId: 'diabetes-essentials', displayOrder: 3, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Built_for_monents_4.png' }, // card 3 – start of day glucose
    { productId: 'diabetes-essentials', displayOrder: 4, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/RGB_GlucoBuddy_Glucometer_assets/Built_for_monents_3.png' }, // card 4 – after meals

    // ── complete-essentials (4 cards) ─────────────────────────────────────────
    { productId: 'complete-essentials', displayOrder: 1, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_1.png' }, // card 1 – baseline weight
    { productId: 'complete-essentials', displayOrder: 2, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Meditive_Body_Composition_Scale_Assets/Build_for_progress_3.png' }, // card 2 – after activity
    { productId: 'complete-essentials', displayOrder: 3, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/moment_1.png
      ' }, // card 3 – start of day glucose
    { productId: 'complete-essentials', displayOrder: 4, imageUrl: 'https://storage.googleapis.com/d2c-ruralos-assets/Total%20Care%20Assets%20Original%20Compressed/Total%20Care%20Assets%20new/Indevidual%20listing%20Assests/Omron_HEM-7140T1-AP_BP_Monitor_assets/moment_2.png' }, // card 4 – around activity
  ];

  for (const { productId, displayOrder, imageUrl } of lifestyleCards) {
    await prisma.productLifestyleCard.updateMany({
      where: { productId, displayOrder },
      data:  { imageUrl },
    });
  }
  console.log('✓ Built-for-Progress lifestyle card image slots ready');
  console.log('  → Update imageUrl for each card above and re-run to apply your images.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
