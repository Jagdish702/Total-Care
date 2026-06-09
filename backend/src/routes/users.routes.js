const router = require('express').Router();
const ctrl   = require('../controllers/users.controller');
const async_ = require('../middleware/asyncHandler');
const { auth, requireRole } = require('../middleware/auth');

router.post('/register',           async_(ctrl.register));
router.post('/login',              async_(ctrl.login));
router.get('/me',     async_(auth), async_(ctrl.me));
router.put('/me',     async_(auth), async_(ctrl.update));
router.get('/me/subscriptions', async_(auth), async_(ctrl.getSubscriptions));
router.post('/me/subscribe',    async_(auth), async_(ctrl.subscribe));
router.get('/:id',    async_(auth), requireRole('admin'), async_(ctrl.getOne));

module.exports = router;
