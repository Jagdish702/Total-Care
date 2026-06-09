const router   = require('express').Router();
const ctrl     = require('../controllers/products.controller');
const async_   = require('../middleware/asyncHandler');
const { auth, requireRole } = require('../middleware/auth');

// Public
router.get('/',             async_(ctrl.list));
router.get('/bundles',      async_(ctrl.listBundles));
router.get('/individual',   async_(ctrl.listIndividuals));
router.get('/:id',          async_(ctrl.getOne));

// Admin-only mutations
router.post('/',            async_(auth), requireRole('admin'), async_(ctrl.create));
router.put('/:id',          async_(auth), requireRole('admin'), async_(ctrl.update));
router.delete('/:id',       async_(auth), requireRole('admin'), async_(ctrl.remove));

module.exports = router;
