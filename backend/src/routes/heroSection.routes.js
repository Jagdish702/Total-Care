const router = require('express').Router();
const svc    = require('../services/heroSection.service');

router.get('/', async (req, res) => {
  const data = await svc.findOne();
  res.json({ success: true, data });
});

module.exports = router;
