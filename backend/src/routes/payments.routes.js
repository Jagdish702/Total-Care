const router = require('express').Router();
const ctrl   = require('../controllers/payments.controller');
const async_ = require('../middleware/asyncHandler');

router.post('/',                    async_(ctrl.initiate));
router.patch('/:id',                async_(ctrl.updateStatus));
router.get('/:id',                  async_(ctrl.getOne));
router.get('/order/:orderId',       async_(ctrl.getByOrder));

module.exports = router;
