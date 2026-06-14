const router = require('express').Router();
const svc    = require('../services/demoVitals.service');

router.get('/', async (req, res) => {
  res.json({ success: true, data: await svc.findAll() });
});

module.exports = router;
