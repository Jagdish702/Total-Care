const router = require('express').Router();
const prisma  = require('../lib/prisma');

router.get('/', async (req, res) => {
  const bullets = await prisma.productShowcaseBullet.findMany({
    where:   { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  res.json({ success: true, data: bullets });
});

module.exports = router;
