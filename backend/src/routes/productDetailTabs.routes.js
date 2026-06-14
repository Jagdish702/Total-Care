const router = require('express').Router();
const prisma  = require('../lib/prisma');

router.get('/', async (req, res) => {
  const tabs = await prisma.productDetailTab.findMany({
    where:   { isActive: true },
    include: {
      vitals:  { orderBy: { displayOrder: 'asc' } },
      insight: true,
      product: {
        select: {
          name:          true,
          description:   true,
          price:         true,
          originalPrice: true,
          images: {
            select: { imageUrl: true, imageType: true, altText: true },
          },
          testimonials: {
            where:   { isActive: true },
            orderBy: { displayOrder: 'asc' },
            take:    1,
            select:  { personName: true, quote: true, photoUrl: true },
          },
        },
      },
    },
    orderBy: { displayOrder: 'asc' },
  });
  res.json({ success: true, data: tabs });
});

module.exports = router;
