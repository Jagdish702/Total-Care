const prisma = require('../lib/prisma');

const serviceInclude = {
  features:     { orderBy: { displayOrder: 'asc' } },
  testimonials: {
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  },
};

async function findAll(activeOnly = true) {
  return prisma.careService.findMany({
    where: activeOnly ? { isActive: true } : {},
    include: serviceInclude,
    orderBy: { displayOrder: 'asc' },
  });
}

async function findById(id) {
  return prisma.careService.findUnique({ where: { id }, include: serviceInclude });
}

async function create(data) {
  return prisma.careService.create({ data, include: serviceInclude });
}

async function update(id, data) {
  return prisma.careService.update({ where: { id }, data, include: serviceInclude });
}

module.exports = { findAll, findById, create, update };
