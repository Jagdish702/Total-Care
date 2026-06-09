const router = require('express').Router();
const ctrl   = require('../controllers/healthConcerns.controller');
const async_ = require('../middleware/asyncHandler');
const { auth, requireRole } = require('../middleware/auth');

router.get('/',     async_(ctrl.list));
router.get('/:id',  async_(ctrl.getOne));
router.post('/',    async_(auth), requireRole('admin'), async_(ctrl.create));
router.put('/:id',  async_(auth), requireRole('admin'), async_(ctrl.update));

module.exports = router;
