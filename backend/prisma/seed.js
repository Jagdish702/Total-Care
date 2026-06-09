const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ─── Products ───────────────────────────────
  await prisma.product.upsert({ where: { id: 'bp' },      update: {}, create: { id: 'bp',      name: 'Blood Pressure Monitor',         subtitle: 'Omron HEM-7140T1-AP',  description: 'Clinically validated BP monitoring with IntelliSense™ technology, Bluetooth connectivity, and one-touch simplicity for daily use.', price: 2000, originalPrice: 2560, rating: 4.8, reviewCount: 1087, featuresTitle: 'Captures cardiovascular vital parameters:',       productType: 'individual', displayOrder: 1 } });
  await prisma.product.upsert({ where: { id: 'glucose' }, update: {}, create: { id: 'glucose', name: 'Glucose Monitor',                  subtitle: 'RGB GlucoBuddy',       description: 'Fast, accurate blood glucose tracking with Bluetooth, 900-test memory, and meal-time logging for smarter diabetes care.',          price: 1000, originalPrice: 1600, rating: 4.6, reviewCount: 489,  featuresTitle: 'Captures diabetes monitoring parameters:',       productType: 'individual', displayOrder: 2 } });
  await prisma.product.upsert({ where: { id: 'scale' },   update: {}, create: { id: 'scale',   name: 'Body Composition Scale',          subtitle: 'MEDITIVE',             description: 'Go beyond weight. Track BMI, body fat, muscle mass, metabolism, and hydration with an app-connected precision scale.',            price: 1000, originalPrice: 2999, rating: 4.5, reviewCount: 312,  featuresTitle: 'Captures multiple body composition parameters:', productType: 'individual', displayOrder: 3 } });
  await prisma.product.upsert({ where: { id: 'complete-essentials' }, update: {}, create: { id: 'complete-essentials', name: 'Complete health essentials',     subtitle: 'powered by Total Care', description: 'Comprehensive health monitoring for the whole family — blood pressure, blood sugar, and body composition, all connected to Total Care.', price: 3899, originalPrice: 7159, rating: 4.8, reviewCount: 1240, featuresTitle: 'Tracks all essential everyday health indicators:',          productType: 'bundle', displayOrder: 4 } });
  await prisma.product.upsert({ where: { id: 'bp-essentials' },       update: {}, create: { id: 'bp-essentials',       name: 'Blood pressure care essentials', subtitle: 'powered by Total Care', description: 'Monitor blood pressure and body composition together for a complete cardiovascular health picture, every single day.',                  price: 2899, originalPrice: 5559, rating: 4.7, reviewCount: 892,  featuresTitle: 'Tracks key cardiovascular and body health indicators:',    productType: 'bundle', displayOrder: 5 } });
  await prisma.product.upsert({ where: { id: 'diabetes-essentials' }, update: {}, create: { id: 'diabetes-essentials', name: 'Diabetes care essentials',        subtitle: 'powered by Total Care', description: 'Track blood glucose and body composition with Bluetooth-connected devices designed for confident daily diabetes management.',           price: 1999, originalPrice: 4599, rating: 4.6, reviewCount: 643,  featuresTitle: 'Tracks key diabetes and body health indicators:',          productType: 'bundle', displayOrder: 6 } });

  console.log('  ✓ Products');

  // ─── Product Features ───────────────────────
  const features = [
    { productId: 'bp', featureText: 'Bluetooth Connectivity',                         displayOrder: 1 },
    { productId: 'bp', featureText: 'IntelliSense™ Technology',                       displayOrder: 2 },
    { productId: 'bp', featureText: 'Cuff Wrapping Guide',                            displayOrder: 3 },
    { productId: 'bp', featureText: 'Hypertension Indicator',                         displayOrder: 4 },
    { productId: 'bp', featureText: 'Irregular Heartbeat Detection',                  displayOrder: 5 },
    { productId: 'bp', featureText: 'Pulse Monitoring',                               displayOrder: 6 },
    { productId: 'bp', featureText: 'One-touch Operation',                            displayOrder: 7 },
    { productId: 'bp', featureText: '14 Reading Memory',                              displayOrder: 8 },
    { productId: 'bp', featureText: 'Clinically Validated Accuracy',                  displayOrder: 9 },
    { productId: 'glucose', featureText: 'Auto Coding',                               displayOrder: 1 },
    { productId: 'glucose', featureText: 'Automatic Strip Ejection',                  displayOrder: 2 },
    { productId: 'glucose', featureText: 'FAD-GDH Enzyme Technology',                 displayOrder: 3 },
    { productId: 'glucose', featureText: 'Fast Results in 5 Seconds',                 displayOrder: 4 },
    { productId: 'glucose', featureText: '900 Test Memory',                           displayOrder: 5 },
    { productId: 'glucose', featureText: 'Memory Recall Function',                    displayOrder: 6 },
    { productId: 'glucose', featureText: 'Before & After Meal Tracking',              displayOrder: 7 },
    { productId: 'glucose', featureText: 'Compact & Portable Design',                 displayOrder: 8 },
    { productId: 'glucose', featureText: 'Small Blood Sample Requirement',            displayOrder: 9 },
    { productId: 'scale', featureText: 'Track weight and body fat together',          displayOrder: 1 },
    { productId: 'scale', featureText: 'Understand fitness progress beyond weight',   displayOrder: 2 },
    { productId: 'scale', featureText: 'Monitor muscle and metabolism changes',       displayOrder: 3 },
    { productId: 'scale', featureText: 'Sync health data to your phone',              displayOrder: 4 },
    { productId: 'scale', featureText: 'Track progress for the whole family',         displayOrder: 5 },
    { productId: 'scale', featureText: 'Accurate readings with automatic tracking',   displayOrder: 6 },
    { productId: 'complete-essentials', featureText: 'Blood sugar, BP & pulse monitoring',                 displayOrder: 1 },
    { productId: 'complete-essentials', featureText: 'Before & after meal sugar tracking',                 displayOrder: 2 },
    { productId: 'complete-essentials', featureText: 'Irregular heartbeat & hypertension alerts',          displayOrder: 3 },
    { productId: 'complete-essentials', featureText: 'Fast glucose results in 5 seconds',                  displayOrder: 4 },
    { productId: 'complete-essentials', featureText: 'Weight, BMI & body fat tracking',                    displayOrder: 5 },
    { productId: 'complete-essentials', featureText: 'Muscle mass, metabolism & hydration insights',       displayOrder: 6 },
    { productId: 'complete-essentials', featureText: 'Bluetooth-connected health tracking',                displayOrder: 7 },
    { productId: 'complete-essentials', featureText: 'Multi-device monitoring for the whole family',       displayOrder: 8 },
    { productId: 'bp-essentials', featureText: 'Blood pressure & pulse monitoring',         displayOrder: 1 },
    { productId: 'bp-essentials', featureText: 'Irregular heartbeat detection',              displayOrder: 2 },
    { productId: 'bp-essentials', featureText: 'Hypertension indication alerts',             displayOrder: 3 },
    { productId: 'bp-essentials', featureText: 'Clinically validated accuracy',              displayOrder: 4 },
    { productId: 'bp-essentials', featureText: 'Bluetooth app connectivity',                 displayOrder: 5 },
    { productId: 'bp-essentials', featureText: 'One-touch easy operation',                   displayOrder: 6 },
    { productId: 'bp-essentials', featureText: 'Weight, BMI & body fat tracking',            displayOrder: 7 },
    { productId: 'bp-essentials', featureText: 'Muscle mass, metabolism & hydration insights', displayOrder: 8 },
    { productId: 'diabetes-essentials', featureText: 'Fast blood sugar results in 5 seconds',       displayOrder: 1 },
    { productId: 'diabetes-essentials', featureText: 'Before & after meal sugar tracking',           displayOrder: 2 },
    { productId: 'diabetes-essentials', featureText: '900 test memory with recall',                  displayOrder: 3 },
    { productId: 'diabetes-essentials', featureText: 'Auto coding & strip ejection',                 displayOrder: 4 },
    { productId: 'diabetes-essentials', featureText: 'Weight, BMI & body fat tracking',              displayOrder: 5 },
    { productId: 'diabetes-essentials', featureText: 'Muscle mass, metabolism & hydration insights', displayOrder: 6 },
    { productId: 'diabetes-essentials', featureText: 'Bluetooth health data sync',                   displayOrder: 7 },
    { productId: 'diabetes-essentials', featureText: 'Compact daily-use monitoring setup',           displayOrder: 8 },
  ];

  // Delete existing and re-insert (idempotent seed)
  await prisma.productFeature.deleteMany({});
  await prisma.productFeature.createMany({ data: features });
  console.log('  ✓ Product features');

  // ─── Product Bundle Items ────────────────────
  await prisma.productBundleItem.deleteMany({});
  await prisma.productBundleItem.createMany({
    data: [
      { bundleId: 'complete-essentials', componentId: 'bp',      displayOrder: 1 },
      { bundleId: 'complete-essentials', componentId: 'glucose', displayOrder: 2 },
      { bundleId: 'complete-essentials', componentId: 'scale',   displayOrder: 3 },
      { bundleId: 'bp-essentials',       componentId: 'bp',      displayOrder: 1 },
      { bundleId: 'bp-essentials',       componentId: 'scale',   displayOrder: 2 },
      { bundleId: 'diabetes-essentials', componentId: 'glucose', displayOrder: 1 },
      { bundleId: 'diabetes-essentials', componentId: 'scale',   displayOrder: 2 },
    ],
  });
  console.log('  ✓ Bundle items');

  // ─── Health Concerns ────────────────────────
  const concerns = [
    { id: 'bp',         label: 'High Blood Pressure',               displayOrder: 1 },
    { id: 'family',     label: 'Family Health Monitoring',           displayOrder: 2 },
    { id: 'weight',     label: 'Weight Gain / Loss Tracking',        displayOrder: 3 },
    { id: 'preventive', label: 'Preventive Health Check',            displayOrder: 4 },
    { id: 'sugar',      label: 'Mild / Occasional Sugar Monitoring', displayOrder: 5 },
    { id: 'post-diag',  label: 'Post-Diagnosis Care',                displayOrder: 6 },
  ];
  for (const c of concerns) {
    await prisma.healthConcern.upsert({ where: { id: c.id }, update: {}, create: c });
  }

  await prisma.concernRecommendation.deleteMany({});
  await prisma.concernRecommendation.createMany({
    data: [
      { concernId: 'bp',         productId: 'bp',                  displayOrder: 1 },
      { concernId: 'family',     productId: 'complete-essentials', displayOrder: 1 },
      { concernId: 'weight',     productId: 'scale',               displayOrder: 1 },
      { concernId: 'preventive', productId: 'bp-essentials',       displayOrder: 1 },
      { concernId: 'sugar',      productId: 'glucose',             displayOrder: 1 },
      { concernId: 'post-diag',  productId: 'diabetes-essentials', displayOrder: 1 },
    ],
  });

  await prisma.concernDescriptionPart.deleteMany({});
  await prisma.concernDescriptionPart.createMany({
    data: [
      { concernId: 'bp',    partText: 'You need to keep a close eye on your blood pressure every day.',                                      isHighlighted: true,  displayOrder: 1 },
      { concernId: 'bp',    partText: 'Regular tracking helps you catch changes early and stay in control before it turns serious.',           isHighlighted: false, displayOrder: 2 },
      { concernId: 'sugar', partText: 'Occasional sugar spikes deserve attention.',                                                           isHighlighted: true,  displayOrder: 1 },
      { concernId: 'sugar', partText: 'A glucometer helps you monitor levels without making it your whole day.',                              isHighlighted: false, displayOrder: 2 },
    ],
  });
  console.log('  ✓ Health concerns');

  // ─── Subscription Plans ──────────────────────
  await prisma.subscriptionPlan.upsert({
    where: { id: 'quarterly' }, update: {},
    create: { id: 'quarterly', title: 'Quarterly Plan', planType: 'quarterly', originalPrice: 199, discountedPrice: 99, pricePeriod: 'month', subtitle: 'Flexible monthly continuation', titleColor: '#d29300', ctaText: 'Get Started at ₹297', displayOrder: 1, isFeatured: false },
  });
  await prisma.subscriptionPlan.upsert({
    where: { id: 'yearly' }, update: {},
    create: { id: 'yearly', title: 'Yearly plan', planType: 'yearly', originalPrice: 1999, discountedPrice: 999, pricePeriod: 'year', subtitle: 'Best value for long-term care', titleColor: '#00b2dd', ctaText: 'Get Started at ₹999', displayOrder: 2, isFeatured: true },
  });

  await prisma.subscriptionDescriptionLine.deleteMany({});
  await prisma.subscriptionDescriptionLine.createMany({
    data: [
      { planId: 'quarterly', lineText: 'First 3 months billed at ₹297, then ₹99/month.', displayOrder: 1 },
      { planId: 'quarterly', lineText: 'Save upto ₹300 on your dedicated care',           displayOrder: 2 },
      { planId: 'yearly',    lineText: 'Billed yearly.',                                   displayOrder: 1 },
      { planId: 'yearly',    lineText: 'Save upto ₹1,000 on your dedicated care.',         displayOrder: 2 },
    ],
  });

  await prisma.subscriptionFeature.deleteMany({});
  const subFeatures = await prisma.subscriptionFeature.createManyAndReturn({
    data: [
      { featureText: 'Ambulance within 30 minutes',                iconName: 'ambulanceIcon',  displayOrder: 1 },
      { featureText: 'Specialist consultation within 48 hours',     iconName: 'specialistIcon', displayOrder: 2 },
      { featureText: 'Medical Concierge within 30 minutes',         iconName: 'conciergeIcon',  displayOrder: 3 },
      { featureText: 'Family doctor call back within 6 hours',      iconName: 'specialistIcon', displayOrder: 4 },
      { featureText: 'Medicine delivery within 3 hours',            iconName: 'medicineIcon',   displayOrder: 5 },
    ],
  });

  await prisma.subscriptionPlanFeature.deleteMany({});
  const planFeatureData = [];
  for (const f of subFeatures) {
    planFeatureData.push({ planId: 'quarterly', featureId: f.id });
    planFeatureData.push({ planId: 'yearly',    featureId: f.id });
  }
  await prisma.subscriptionPlanFeature.createMany({ data: planFeatureData });

  await prisma.subscriptionPriceBreakdown.deleteMany({});
  await prisma.subscriptionPriceBreakdown.createMany({
    data: [
      { planId: 'quarterly', label: 'First 3 months',  originalDisplay: '₹597',   discountedDisplay: '₹297/month', displayOrder: 1 },
      { planId: 'quarterly', label: 'After 3 months',  originalDisplay: '₹199',   discountedDisplay: '₹99/month',  displayOrder: 2 },
      { planId: 'yearly',    label: '12 months access', originalDisplay: '₹1,999', discountedDisplay: '₹999/year',  displayOrder: 1 },
    ],
  });

  await prisma.subscriptionSaving.deleteMany({});
  await prisma.subscriptionSaving.createMany({
    data: [
      { planId: 'quarterly', label: '₹100/month × 3 months', valueText: '₹300 saved',       displayOrder: 1 },
      { planId: 'quarterly', label: 'After 3 months',         valueText: '₹100/month Saved', displayOrder: 2 },
      { planId: 'yearly',    label: '₹1000/year',             valueText: '₹1,000 saved',     displayOrder: 1 },
    ],
  });

  await prisma.subscriptionBillingInfo.deleteMany({});
  await prisma.subscriptionBillingInfo.createMany({
    data: [
      { planId: 'quarterly', infoText: 'Billed ₹297 today',                  displayOrder: 1 },
      { planId: 'quarterly', infoText: 'Auto-renews monthly at ₹99',         displayOrder: 2 },
      { planId: 'quarterly', infoText: 'Cancel anytime before next billing', displayOrder: 3 },
      { planId: 'yearly',    infoText: 'Billed ₹999 today',                  displayOrder: 1 },
      { planId: 'yearly',    infoText: 'Renews yearly',                      displayOrder: 2 },
      { planId: 'yearly',    infoText: 'Cancel anytime before renewal',      displayOrder: 3 },
    ],
  });
  console.log('  ✓ Subscription plans');

  // ─── Care Services ───────────────────────────
  const services = [
    { id: 'doctor',    label: 'Family Doctor Consultation',     headline: 'Every Consultation starts', accentText: 'with your data',         expandedPanelTop: 96,  expandedBulletsTop: 470, displayOrder: 1 },
    { id: 'ai',        label: 'AI Health Companion',            headline: 'Your health, analysed.',    accentText: "Before it's a problem",  expandedPanelTop: 348, expandedBulletsTop: 529, displayOrder: 2 },
    { id: 'concierge', label: 'Concierge & Emergency services', headline: 'Help arrives,',             accentText: 'Before panic does',      expandedPanelTop: 105, expandedBulletsTop: 502, displayOrder: 3 },
    { id: 'diet',      label: 'Smart Diet Plan',                headline: 'Diet that thinks',          accentText: 'Before you eat.',        expandedPanelTop: 282, expandedBulletsTop: 470, displayOrder: 4 },
    { id: 'device',    label: 'Device Integrations',            headline: 'Stop Tracking,',            accentText: 'Start Understanding',    expandedPanelTop: 286, expandedBulletsTop: 528, displayOrder: 5 },
    { id: 'medicines', label: 'Medicines and Lab tests',        headline: 'Medicines & Lab Tests',     accentText: 'Care Without Delays',    expandedPanelTop: 148, expandedBulletsTop: 510, displayOrder: 6 },
  ];
  for (const s of services) {
    await prisma.careService.upsert({ where: { id: s.id }, update: {}, create: s });
  }

  await prisma.serviceFeature.deleteMany({});
  await prisma.serviceFeature.createMany({
    data: [
      { serviceId: 'doctor',    featureText: 'General physician consultation within 6 hours.',                                              displayOrder: 1 },
      { serviceId: 'doctor',    featureText: 'Specialist consultation within 48 hours.',                                                    displayOrder: 2 },
      { serviceId: 'doctor',    featureText: 'Medical history, trends, Synced. Analysed. Ready.',                                          displayOrder: 3 },
      { serviceId: 'doctor',    featureText: 'So the doctor focuses on decisions, not data collection.',                                    displayOrder: 4 },
      { serviceId: 'ai',        featureText: 'Tracks patterns. Spots risks early.',                                                         displayOrder: 1 },
      { serviceId: 'ai',        featureText: 'Nudges you before things go wrong.',                                                          displayOrder: 2 },
      { serviceId: 'ai',        featureText: 'Converts abstract health goals into measurable metrics.',                                     displayOrder: 3 },
      { serviceId: 'concierge', featureText: 'Concierge and Ambulance arrives within 30 minutes.',                                         displayOrder: 1 },
      { serviceId: 'concierge', featureText: 'Help is triggered before you react',                                                          displayOrder: 2 },
      { serviceId: 'concierge', featureText: 'Real support. Not just alerts',                                                               displayOrder: 3 },
      { serviceId: 'diet',      featureText: 'Builds your health context from daily activity patterns and medical history.',                 displayOrder: 1 },
      { serviceId: 'diet',      featureText: 'Dynamic meal planning based on evolving health goals.',                                       displayOrder: 2 },
      { serviceId: 'diet',      featureText: 'No guesswork. No generic plans. Automated, goal-aligned nutritional planning.',               displayOrder: 3 },
      { serviceId: 'device',    featureText: 'Multiple devices. One system',                                                                displayOrder: 1 },
      { serviceId: 'device',    featureText: 'Signals combined, not scattered',                                                             displayOrder: 2 },
      { serviceId: 'device',    featureText: 'Patterns you can actually act on',                                                            displayOrder: 3 },
      { serviceId: 'medicines', featureText: 'CureBay Guarantee: Medicines delivered within 3 hours.',                                     displayOrder: 1 },
      { serviceId: 'medicines', featureText: 'Home test sample collection.',                                                                displayOrder: 2 },
      { serviceId: 'medicines', featureText: 'Without delays. Without confusion.',                                                          displayOrder: 3 },
    ],
  });
  console.log('  ✓ Care services');

  // ─── Testimonials ────────────────────────────
  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({
    data: [
      { personName: 'Kartik Varma',  badgeText: 'Specialist Consultation',    quote: "TotalCare and Dr.Neha Joshi came to my life as my god's angels, making my life healthier one click away",                                          serviceId: 'doctor',    context: 'service', displayOrder: 1 },
      { personName: 'Ajay Dogra',    badgeText: 'AI powered Health Tracking', quote: "TotalCare's AI is basically a divine protector for my vitals. It's like having a guardian angel who also happens to be a data scientist.",          serviceId: 'ai',        context: 'service', displayOrder: 2 },
      { personName: 'Sunita Sharma', badgeText: 'Ambulance Services',         quote: 'As someone who stays on top of their health, TotalCare adds a layer of reassurance I didn\'t know I needed.',                                       serviceId: 'concierge', context: 'service', displayOrder: 3 },
      { personName: 'Ajay Dogra',    badgeText: 'Data Backed Diet Plan',      quote: "TotalCare's AI is basically a divine protector for my vitals. It's like having a guardian angel who also happens to be a data scientist.",          serviceId: 'diet',      context: 'service', displayOrder: 4 },
      { personName: 'Vikas Basu',    badgeText: 'Activity Tracking',          quote: "TotalCare's AI acts as a vigilant overseer for my health metrics. It's akin to having a watchful guardian who is also an expert in data analysis.", serviceId: 'device',    context: 'service', displayOrder: 5 },
      { personName: 'Ruchi Mehta',   badgeText: 'At Home Lab Tests',          quote: "TotalCare's AI serves as a diligent monitor for my lab results. It's like having a knowledgeable guardian who specializes in medical data analysis.", serviceId: 'medicines', context: 'service', displayOrder: 6 },
      { personName: 'Rohit Sharma',  quote: 'I stopped guessing and began understanding my blood pressure trends. With insights from my monitor and the Total Care app, I can make sense of my readings.',                                     productId: 'bp',      context: 'product', displayOrder: 1 },
      { personName: 'Ayush Mehta',   quote: 'Weight was merely a number in the past, but now I truly understand the changes happening within my body and how they affect my overall health and energy levels.',                               productId: 'scale',   context: 'product', displayOrder: 2 },
      { personName: 'Neha Kulkarni', quote: "I used to check my sugar levels but never really understood them fully. Now I can clearly see patterns — what affects my levels, what doesn't, and how to manage them better.",                  productId: 'glucose', context: 'product', displayOrder: 3 },
    ],
  });
  console.log('  ✓ Testimonials');

  // ─── FAQ Categories ──────────────────────────
  await prisma.faqCategory.deleteMany({});
  const faqCats = await prisma.faqCategory.createManyAndReturn({
    data: [
      { name: 'General',          slug: 'general',  displayOrder: 1 },
      { name: 'Devices & Setup',  slug: 'devices',  displayOrder: 2 },
      { name: 'Services & Plans', slug: 'services', displayOrder: 3 },
    ],
  });
  const catMap = Object.fromEntries(faqCats.map(c => [c.slug, c.id]));

  // ─── FAQs ────────────────────────────────────
  await prisma.faqListItem.deleteMany({});
  await prisma.faqStepItem.deleteMany({});
  await prisma.faqStep.deleteMany({});
  await prisma.faq.deleteMany({});

  const faq1  = await prisma.faq.create({ data: { question: 'What is CureBay TotalCare?',                                            answerType: 'text',  answerText: 'CureBay TotalCare is a smart healthcare service platform that combines connected health devices, AI-powered health insights, doctor consultations, and emergency services into one integrated care plan.', categoryId: catMap['general'],  displayOrder: 1 } });
  const faq2  = await prisma.faq.create({ data: { question: 'What services are included in CureBay TotalCare?',                      answerType: 'list',  categoryId: catMap['general'],  displayOrder: 2 } });
  const faq3  = await prisma.faq.create({ data: { question: 'Which smart devices can be connected with the TotalCare app?',          answerType: 'list',  categoryId: catMap['devices'],  displayOrder: 3 } });
  const faq4  = await prisma.faq.create({ data: { question: 'How do I connect a device after purchasing it?',                        answerType: 'steps', categoryId: catMap['devices'],  displayOrder: 4 } });
  const faq5  = await prisma.faq.create({ data: { question: 'Is there a subscription required to use TotalCare?',                    answerType: 'text',  answerText: 'Yes. Choose a Quarterly plan at ₹99/month (billed ₹297 for first 3 months) or a Yearly plan at ₹999/year. Both plans include the full suite of services.', categoryId: catMap['services'], displayOrder: 5 } });
  const faq6  = await prisma.faq.create({ data: { question: 'How quickly can I get a doctor consultation?',                          answerType: 'text',  answerText: 'A general physician callback is guaranteed within 6 hours. Specialist consultations are available within 48 hours.', categoryId: catMap['services'], displayOrder: 6 } });
  const faq7  = await prisma.faq.create({ data: { question: 'What happens in a medical emergency?',                                  answerType: 'text',  answerText: 'TotalCare dispatches a Medical Concierge and Ambulance within 30 minutes. Your emergency contacts are notified automatically.', categoryId: catMap['services'], displayOrder: 7 } });
  const faq8  = await prisma.faq.create({ data: { question: 'Are the devices compatible with Apple Health and Google Health Connect?', answerType: 'list',  categoryId: catMap['devices'],  displayOrder: 8 } });
  const faq9  = await prisma.faq.create({ data: { question: 'How are medicines delivered?',                                           answerType: 'text',  answerText: 'CureBay guarantees medicine delivery within 3 hours through its pharmacy network. Lab test sample collection is done at home.', categoryId: catMap['services'], displayOrder: 9 } });

  await prisma.faqListItem.createMany({
    data: [
      { faqId: faq2.id, itemText: 'Smart health monitoring through connected devices',                       displayOrder: 1 },
      { faqId: faq2.id, itemText: 'Online doctor consultation and eClinic support',                          displayOrder: 2 },
      { faqId: faq2.id, itemText: 'Diagnostics and lab test booking',                                        displayOrder: 3 },
      { faqId: faq2.id, itemText: 'Medicine ordering support',                                               displayOrder: 4 },
      { faqId: faq2.id, itemText: 'AI-supported health insights',                                            displayOrder: 5 },
      { faqId: faq2.id, itemText: 'Chronic care management — Diabetes, Weight, Blood Pressure',             displayOrder: 6 },
      { faqId: faq3.id, itemText: 'Smart Glucometer (RGB GlucoBuddy BLE)',                                   displayOrder: 1 },
      { faqId: faq3.id, itemText: 'Blood Pressure (BP) Monitor (Omron HEM-7140T1-AP)',                       displayOrder: 2 },
      { faqId: faq3.id, itemText: 'Smart Body Composition Scale (MEDITIVE)',                                 displayOrder: 3 },
      { faqId: faq3.id, itemText: 'Other Bluetooth-enabled health devices',                                  displayOrder: 4 },
      { faqId: faq8.id, itemText: 'Yes — the TotalCare app supports Apple Health integration on iOS devices.', displayOrder: 1 },
      { faqId: faq8.id, itemText: 'Google Health Connect is supported on Android devices.',                   displayOrder: 2 },
      { faqId: faq8.id, itemText: 'Once connected, readings sync automatically with no manual entry.',        displayOrder: 3 },
    ],
  });

  const step1 = await prisma.faqStep.create({ data: { faqId: faq4.id, stepTitle: 'Step 1: Install the TotalCare App',      displayOrder: 1 } });
  const step2 = await prisma.faqStep.create({ data: { faqId: faq4.id, stepTitle: 'Step 2: Create / Login to Your Account', displayOrder: 2 } });
  const step3 = await prisma.faqStep.create({ data: { faqId: faq4.id, stepTitle: 'Step 3: Turn ON Bluetooth',              displayOrder: 3 } });
  const step4 = await prisma.faqStep.create({ data: { faqId: faq4.id, stepTitle: 'Step 4: Add the Device',                 displayOrder: 4 } });
  const step5 = await prisma.faqStep.create({ data: { faqId: faq4.id, stepTitle: 'Step 5: Start Using the Device',         displayOrder: 5 } });

  await prisma.faqStepItem.createMany({
    data: [
      { stepId: step1.id, itemText: 'Download the app from Android Play Store or iOS App Store',               displayOrder: 1 },
      { stepId: step2.id, itemText: 'Register using your mobile number and OTP',                               displayOrder: 1 },
      { stepId: step2.id, itemText: 'Create your health profile',                                              displayOrder: 2 },
      { stepId: step3.id, itemText: 'Enable Bluetooth on your mobile phone before pairing the device',         displayOrder: 1 },
      { stepId: step4.id, itemText: 'Open the TotalCare app',                                                  displayOrder: 1 },
      { stepId: step4.id, itemText: 'Go to Devices or Smart Devices',                                          displayOrder: 2 },
      { stepId: step4.id, itemText: 'Select your device model',                                                displayOrder: 3 },
      { stepId: step4.id, itemText: 'Pair the device using Bluetooth',                                         displayOrder: 4 },
      { stepId: step5.id, itemText: 'Once paired successfully, readings will automatically sync to the app',   displayOrder: 1 },
    ],
  });
  console.log('  ✓ FAQs');

  // ─── Highlight Cards ─────────────────────────
  await prisma.highlightCard.deleteMany({});
  await prisma.highlightCard.createMany({
    data: [
      { label: 'Doctor Consultation',            serviceId: 'doctor',    overlayType: 'records',   displayOrder: 1 },
      { label: 'AI Health Companion',            serviceId: 'ai',        overlayType: 'vitals',    displayOrder: 2 },
      { label: 'Concierge & Emergency Services', serviceId: 'concierge', overlayType: 'emergency', displayOrder: 3 },
      { label: 'Smart Diet Plan',                serviceId: 'diet',      overlayType: 'nutrition', displayOrder: 4 },
      { label: 'Exercise Plans & Tracking',      serviceId: 'device',    overlayType: 'exercise',  displayOrder: 5 },
      { label: 'Medicines & Lab Tests',          serviceId: 'medicines', overlayType: 'lab',       displayOrder: 6 },
    ],
  });
  console.log('  ✓ Highlight cards');

  // ─── Health 360 Frames ───────────────────────
  await prisma.health360FrameBullet.deleteMany({});
  await prisma.health360Frame.deleteMany({});
  const f1 = await prisma.health360Frame.create({ data: { titleLines: '["Your Health.", "Connected. Understood."]',  bodyText: 'All your devices, insights, and care, synced into one continuous health journey.', displayOrder: 0 } });
  const f2 = await prisma.health360Frame.create({ data: { titleLines: '["Unified Device Ecosystem"]',               bodyText: 'We bring your metrics together. Gain an accurate, consolidated baseline of your vital signs from the devices you already trust.', displayOrder: 1 } });
  const f3 = await prisma.health360Frame.create({ data: { titleLines: '["Precision Insights with CureBay"]',        bodyText: 'Your raw device data is normalized and transformed into a powerful daily health narrative.', displayOrder: 2 } });
  const f4 = await prisma.health360Frame.create({ data: { titleLines: '["Data-Driven Medical Consultation"]',       bodyText: "Your insights don't stop with you. Your assigned Family Health Doctor and AI Companion turn analysis into action.", displayOrder: 3 } });

  await prisma.health360FrameBullet.createMany({
    data: [
      { frameId: f2.id, bulletText: 'Clinical Accuracy',           displayOrder: 1 },
      { frameId: f2.id, bulletText: 'Ambient Monitoring',          displayOrder: 2 },
      { frameId: f2.id, bulletText: 'Seamless Integration',        displayOrder: 3 },
      { frameId: f3.id, bulletText: 'Holistic Wellness Score',     displayOrder: 1 },
      { frameId: f3.id, bulletText: 'Deep Trends',                 displayOrder: 2 },
      { frameId: f3.id, bulletText: 'Targeted Alerts',             displayOrder: 3 },
      { frameId: f4.id, bulletText: 'Informed Decisions',          displayOrder: 1 },
      { frameId: f4.id, bulletText: 'Precision Treatment',         displayOrder: 2 },
      { frameId: f4.id, bulletText: 'AI-Orchestrated Action Plan', displayOrder: 3 },
    ],
  });
  console.log('  ✓ Health360 frames');

  // ─── Product Detail Tabs ─────────────────────
  await prisma.productDetailInsight.deleteMany({});
  await prisma.productDetailVital.deleteMany({});
  await prisma.productDetailTab.deleteMany({});

  await prisma.productDetailTab.upsert({ where: { id: 'omron' },      update: {}, create: { id: 'omron',      productId: 'bp',      tabLabel: 'Omron BP Monitor – HEM-7140-AP',  vitalsLayout: 'grid', displayOrder: 1 } });
  await prisma.productDetailTab.upsert({ where: { id: 'meditive' },   update: {}, create: { id: 'meditive',   productId: 'scale',   tabLabel: 'Meditive Body Composition Scale', vitalsLayout: 'list', latestReadingLabel: 'Today, 8:30 AM', displayOrder: 2 } });
  await prisma.productDetailTab.upsert({ where: { id: 'glucobuddy' }, update: {}, create: { id: 'glucobuddy', productId: 'glucose', tabLabel: 'RGB GlucoBuddy Glucometer',       vitalsLayout: 'list', latestReadingLabel: 'Today, 8:30 AM', displayOrder: 3 } });

  await prisma.productDetailVital.createMany({
    data: [
      { tabId: 'omron',      iconName: 'iconHeartFill',    label: 'Heart Rate',      value: '98',  unit: 'BPM',   displayOrder: 1 },
      { tabId: 'omron',      iconName: 'iconGlucoseStat',  label: 'Glucose',         value: '92',  unit: 'mg/dL', displayOrder: 2 },
      { tabId: 'omron',      iconName: 'iconPerson',       label: 'Blood pressure',  value: '98',  unit: 'BPM',   displayOrder: 3 },
      { tabId: 'omron',      iconName: 'iconSleep',        label: 'Sleep',           value: '8',   unit: 'Hr',    value2: '43', unit2: 'Min', displayOrder: 4 },
      { tabId: 'meditive',   iconName: 'iconScaleMetric',  label: 'Body Weight',     value: '72.4',unit: 'kg',    displayOrder: 1 },
      { tabId: 'meditive',   iconName: 'iconScaleMetric',  label: 'Body Fat',        value: '21.8',unit: '%',     displayOrder: 2 },
      { tabId: 'meditive',   iconName: 'iconScaleMetric',  label: 'BMI',             value: '21.8',unit: '%',     displayOrder: 3 },
      { tabId: 'glucobuddy', iconName: 'iconGlucoseMetric',label: 'Glucose',         value: '142', unit: 'mg/dl', displayOrder: 1 },
      { tabId: 'glucobuddy', iconName: 'iconGlucoseMetric',label: 'Post-Meal Level', value: '168', unit: 'mg/dl', displayOrder: 2 },
      { tabId: 'glucobuddy', iconName: 'iconGlucoseMetric',label: 'Daily Average',   value: '136', unit: 'mg/dl', displayOrder: 3 },
    ],
  });

  await prisma.productDetailInsight.createMany({
    data: [
      { tabId: 'omron',      iconName: 'iconBpMetric',      label: 'Blood Pressure',    insightType: 'paragraph', insightText: 'Your BP is slightly elevated today. Consider resting and hydrating.' },
      { tabId: 'meditive',   iconName: 'iconScaleMetric',   label: 'BMI',               insightType: 'metric',    insightText: 'improvement. Stay consistent with workouts and hydration', highlightValue: '40%' },
      { tabId: 'glucobuddy', iconName: 'iconGlucoseMetric', label: 'Track Glucose Now', insightType: 'metric',    insightText: 'Time to check your glucose level.',                        highlightValue: '2:30 PM' },
    ],
  });
  console.log('  ✓ Product detail tabs');

  // ─── Product Showcase Bullets ────────────────
  await prisma.productShowcaseBullet.deleteMany({});
  await prisma.productShowcaseBullet.createMany({
    data: [
      { bulletText: 'Simple setup. Smarter monitoring.',    displayOrder: 1 },
      { bulletText: 'Native Total Care integration',        displayOrder: 2 },
      { bulletText: 'No third-party health hub dependency', displayOrder: 3 },
      { bulletText: 'Clinically validated branded devices', displayOrder: 4 },
      { bulletText: 'Accurate, real-time health tracking',  displayOrder: 5 },
      { bulletText: 'Simple setup. No ecosystem lock-in.',  displayOrder: 6 },
    ],
  });

  // ─── Footer ──────────────────────────────────
  await prisma.footerLink.deleteMany({});
  await prisma.footerSection.deleteMany({});
  const footerSections = await prisma.footerSection.createManyAndReturn({
    data: [
      { heading: 'Company',  displayOrder: 1 },
      { heading: 'Services', displayOrder: 2 },
      { heading: 'Products', displayOrder: 3 },
      { heading: 'Legal',    displayOrder: 4 },
      { heading: 'Support',  displayOrder: 5 },
    ],
  });
  const fsMap = Object.fromEntries(footerSections.map(s => [s.heading, s.id]));
  await prisma.footerLink.createMany({
    data: [
      { sectionId: fsMap['Company'],  label: 'About Us',         url: '/about',              displayOrder: 1 },
      { sectionId: fsMap['Company'],  label: 'Careers',          url: '/careers',            displayOrder: 2 },
      { sectionId: fsMap['Company'],  label: 'Blog',             url: '/blog',               displayOrder: 3 },
      { sectionId: fsMap['Company'],  label: 'Press',            url: '/press',              displayOrder: 4 },
      { sectionId: fsMap['Services'], label: 'Doctor Consult',   url: '/services/doctor',    displayOrder: 1 },
      { sectionId: fsMap['Services'], label: 'AI Companion',     url: '/services/ai',        displayOrder: 2 },
      { sectionId: fsMap['Services'], label: 'Emergency Care',   url: '/services/emergency', displayOrder: 3 },
      { sectionId: fsMap['Services'], label: 'Diet Planning',    url: '/services/diet',      displayOrder: 4 },
      { sectionId: fsMap['Services'], label: 'Lab Tests',        url: '/services/labs',      displayOrder: 5 },
      { sectionId: fsMap['Products'], label: 'BP Monitor',       url: '/products/bp',        displayOrder: 1 },
      { sectionId: fsMap['Products'], label: 'Glucose Monitor',  url: '/products/glucose',   displayOrder: 2 },
      { sectionId: fsMap['Products'], label: 'Body Scale',       url: '/products/scale',     displayOrder: 3 },
      { sectionId: fsMap['Products'], label: 'Health Bundles',   url: '/products',           displayOrder: 4 },
      { sectionId: fsMap['Legal'],    label: 'Privacy Policy',   url: '/privacy',            displayOrder: 1 },
      { sectionId: fsMap['Legal'],    label: 'Terms of Service', url: '/terms',              displayOrder: 2 },
      { sectionId: fsMap['Legal'],    label: 'Refund Policy',    url: '/refunds',            displayOrder: 3 },
      { sectionId: fsMap['Support'],  label: 'Contact Us',       url: '/contact',            displayOrder: 1 },
      { sectionId: fsMap['Support'],  label: 'Help Center',      url: '/help',               displayOrder: 2 },
      { sectionId: fsMap['Support'],  label: 'FAQs',             url: '/faqs',               displayOrder: 3 },
    ],
  });
  console.log('  ✓ Footer');

  // ─── Navigation ──────────────────────────────
  await prisma.navItem.deleteMany({});
  await prisma.navItem.createMany({
    data: [
      { label: 'Home',     url: '/',        displayOrder: 1 },
      { label: 'Services', url: '/services',displayOrder: 2 },
      { label: 'Products', url: '/products',displayOrder: 3 },
      { label: 'Plans',    url: '/plans',   displayOrder: 4 },
      { label: 'About',    url: '/about',   displayOrder: 5 },
      { label: 'Contact',  url: '/contact', displayOrder: 6 },
    ],
  });
  console.log('  ✓ Navigation');

  // ─── Site Config ─────────────────────────────
  const configs = [
    { configKey: 'hero_headline',           configValue: 'Your Health. Understood.',                                                                       configGroup: 'hero' },
    { configKey: 'hero_subheadline',        configValue: 'One platform. Every aspect of care.',                                                            configGroup: 'hero' },
    { configKey: 'hero_cta_primary',        configValue: 'Get Started',                                                                                    configGroup: 'hero' },
    { configKey: 'hero_cta_secondary',      configValue: 'View Plans',                                                                                     configGroup: 'hero' },
    { configKey: 'doctor_name',             configValue: 'Dr. Neha Joshi',                                                                                 configGroup: 'doctor_banner' },
    { configKey: 'doctor_title',            configValue: 'Family Health Physician',                                                                         configGroup: 'doctor_banner' },
    { configKey: 'doctor_quote',            configValue: "Your data is your doctor's most powerful tool.",                                                  configGroup: 'doctor_banner' },
    { configKey: 'doctor_badge',            configValue: 'MBBS, MD — 12 years experience',                                                                 configGroup: 'doctor_banner' },
    { configKey: 'brand_name',              configValue: 'CureBay TotalCare',                                                                              configGroup: 'brand' },
    { configKey: 'brand_phone',             configValue: '+91-1800-XXX-XXXX',                                                                              configGroup: 'brand' },
    { configKey: 'brand_email',             configValue: 'support@curebay.com',                                                                             configGroup: 'brand' },
    { configKey: 'brand_address',           configValue: 'Bhubaneswar, Odisha, India',                                                                     configGroup: 'brand' },
    { configKey: 'social_instagram',        configValue: 'https://instagram.com/curebay',                                                                  configGroup: 'social' },
    { configKey: 'social_twitter',          configValue: 'https://twitter.com/curebay',                                                                    configGroup: 'social' },
    { configKey: 'social_linkedin',         configValue: 'https://linkedin.com/company/curebay',                                                           configGroup: 'social' },
    { configKey: 'social_youtube',          configValue: 'https://youtube.com/@curebay',                                                                   configGroup: 'social' },
    { configKey: 'meta_title',              configValue: 'CureBay TotalCare — Smart Health, Complete Care',                                                configGroup: 'seo' },
    { configKey: 'meta_description',        configValue: 'Connected devices, AI insights, doctor consults, and emergency care — all in one subscription.', configGroup: 'seo' },
    { configKey: 'showcase_section_title',  configValue: 'Find what you need.',                                                                            configGroup: 'product_showcase' },
    { configKey: 'showcase_section_subtitle', configValue: 'Smart devices matched to your health concern.',                                               configGroup: 'product_showcase' },
  ];
  for (const c of configs) {
    await prisma.siteConfig.upsert({ where: { configKey: c.configKey }, update: { configValue: c.configValue }, create: c });
  }
  console.log('  ✓ Site config');

  console.log('\n✅ Database seeded successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
