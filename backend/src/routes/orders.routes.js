const router = require('express').Router();
const ctrl   = require('../controllers/orders.controller');
const async_ = require('../middleware/asyncHandler');
const { auth, requireRole } = require('../middleware/auth');

router.post('/',                         async_(ctrl.create));
router.get('/my',        async_(auth),   async_(ctrl.myOrders));
router.get('/number/:number',            async_(ctrl.getByNumber));
router.get('/:id',                       async_(ctrl.getOne));
router.patch('/:id/status', async_(auth), requireRole('admin'), async_(ctrl.updateStatus));

module.exports = router;
