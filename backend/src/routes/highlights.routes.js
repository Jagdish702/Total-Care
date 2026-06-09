const router = require('express').Router();
const ctrl   = require('../controllers/highlights.controller');
const async_ = require('../middleware/asyncHandler');

router.get('/',              async_(ctrl.list));
router.get('/showcase-bullets', async_(ctrl.showcaseBullets));

module.exports = router;
