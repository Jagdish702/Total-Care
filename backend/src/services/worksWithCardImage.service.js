const prisma = require('../lib/prisma');

async function findAll() {
  return prisma.worksWithCardImage.findMany({ orderBy: { id: 'asc' } });
}

module.exports = { findAll };
