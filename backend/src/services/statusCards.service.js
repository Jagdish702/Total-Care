const prisma = require('../lib/prisma');

const cardInclude = {
  linkedProduct: true,
  linkedService: true,
  levels:  { orderBy: { displayOrder: 'asc' } },
  metrics: { orderBy: { displayOrder: 'asc' } },
};

async function findAll({ cardType, activeOnly = true } = {}) {
  const where = {};
  if (activeOnly) where.isActive = true;
  if (cardType)   where.cardType = cardType;

  return prisma.statusCard.findMany({
    where,
    include: cardInclude,
    orderBy: { displayOrder: 'asc' },
  });
}

async function findById(id) {
  return prisma.statusCard.findUnique({ where: { id }, include: cardInclude });
}

module.exports = { findAll, findById };
