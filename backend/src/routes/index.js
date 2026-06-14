const router = require('express').Router();

router.use('/products',           require('./products.routes'));
router.use('/health-concerns',    require('./healthConcerns.routes'));
router.use('/subscription-plans', require('./subscriptionPlans.routes'));
router.use('/care-services',      require('./careServices.routes'));
router.use('/faqs',               require('./faqs.routes'));
router.use('/site-config',        require('./siteConfig.routes'));
router.use('/health360',          require('./health360.routes'));
router.use('/testimonials',       require('./testimonials.routes'));
router.use('/nav',                require('./navigation.routes'));
router.use('/footer',             require('./footer.routes'));
router.use('/highlights',         require('./highlights.routes'));
router.use('/orders',             require('./orders.routes'));
router.use('/payments',           require('./payments.routes'));
router.use('/users',              require('./users.routes'));
router.use('/status-cards',        require('./statusCards.routes'));
router.use('/demo-vitals',         require('./demoVitals.routes'));
router.use('/product-detail-tabs',      require('./productDetailTabs.routes'));
router.use('/product-showcase-bullets', require('./productShowcaseBullets.routes'));
router.use('/hero-section',             require('./heroSection.routes'));
router.use('/works-with-images',        require('./worksWithCardImage.routes'));

module.exports = router;
