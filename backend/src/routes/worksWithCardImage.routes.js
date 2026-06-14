const router = require('express').Router();
const svc    = require('../services/worksWithCardImage.service');

router.get('/', async (req, res) => {
  try {
    const data = await svc.findAll();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
