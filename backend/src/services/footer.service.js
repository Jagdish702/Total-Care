const prisma = require('../lib/prisma');

async function findAll(activeOnly = true) {
  return prisma.footerSection.findMany({
    where: activeOnly ? { isActive: true } : {},
    include: {
      links: {
        where: activeOnly ? { isActive: true } : {},
        orderBy: { displayOrder: 'asc' },
      },
    },
    orderBy: { displayOrder: 'asc' },
  });
}

module.exports = { findAll };
