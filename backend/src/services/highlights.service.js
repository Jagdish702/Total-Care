const prisma = require('../lib/prisma');

async function findAll(activeOnly = true) {
  return prisma.highlightCard.findMany({
    where: activeOnly ? { isActive: true } : {},
    include: { service: true },
    orderBy: { displayOrder: 'asc' },
  });
}

async function findShowcaseBullets(activeOnly = true) {
  return prisma.productShowcaseBullet.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: { displayOrder: 'asc' },
  });
}

module.exports = { findAll, findShowcaseBullets };
