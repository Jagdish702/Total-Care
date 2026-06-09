const router = require('express').Router();
const ctrl   = require('../controllers/siteConfig.controller');
const async_ = require('../middleware/asyncHandler');
const { auth, requireRole } = require('../middleware/auth');

router.get('/',         async_(ctrl.list));
router.get('/:key',     async_(ctrl.getOne));
router.put('/bulk',     async_(auth), requireRole('admin'), async_(ctrl.setMany));
router.put('/:key',     async_(auth), requireRole('admin'), async_(ctrl.set));

module.exports = router;
