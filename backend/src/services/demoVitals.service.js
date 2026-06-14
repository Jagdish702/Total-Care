const prisma = require('../lib/prisma');

async function findAll() {
  return prisma.demoVital.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
}

module.exports = { findAll };
