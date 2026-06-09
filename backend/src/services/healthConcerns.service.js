const prisma = require('../lib/prisma');

const concernInclude = {
  descriptionParts: { orderBy: { displayOrder: 'asc' } },
  recommendations: {
    orderBy: { displayOrder: 'asc' },
    include: {
      product: {
        include: { features: { orderBy: { displayOrder: 'asc' } } },
      },
    },
  },
};

async function findAll(activeOnly = true) {
  return prisma.healthConcern.findMany({
    where: activeOnly ? { isActive: true } : {},
    include: concernInclude,
    orderBy: { displayOrder: 'asc' },
  });
}

async function findById(id) {
  return prisma.healthConcern.findUnique({ where: { id }, include: concernInclude });
}

async function create(data) {
  return prisma.healthConcern.create({ data, include: concernInclude });
}

async function update(id, data) {
  return prisma.healthConcern.update({ where: { id }, data, include: concernInclude });
}

module.exports = { findAll, findById, create, update };
