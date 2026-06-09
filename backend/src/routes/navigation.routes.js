const router = require('express').Router();
const ctrl   = require('../controllers/navigation.controller');
const async_ = require('../middleware/asyncHandler');

router.get('/',      async_(ctrl.listFlat));
router.get('/tree',  async_(ctrl.listTree));

module.exports = router;
