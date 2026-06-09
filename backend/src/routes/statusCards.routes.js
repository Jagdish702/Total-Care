const router = require('express').Router();
const ctrl   = require('../controllers/statusCards.controller');
const async_ = require('../middleware/asyncHandler');

router.get('/',    async_(ctrl.list));
router.get('/:id', async_(ctrl.getOne));

module.exports = router;
