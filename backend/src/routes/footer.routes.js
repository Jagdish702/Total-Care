const router = require('express').Router();
const ctrl   = require('../controllers/footer.controller');
const async_ = require('../middleware/asyncHandler');

router.get('/', async_(ctrl.list));

module.exports = router;
