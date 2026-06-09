const prisma = require('../lib/prisma');

async function findAll({ context, serviceId, productId, featuredOnly, activeOnly = true } = {}) {
  const where = {};
  if (activeOnly)  where.isActive   = true;
  if (context)     where.context    = context;
  if (serviceId)   where.serviceId  = serviceId;
  if (productId)   where.productId  = productId;
  if (featuredOnly) where.isFeatured = true;

  return prisma.testimonial.findMany({
    where,
    orderBy: { displayOrder: 'asc' },
  });
}

async function findById(id) {
  return prisma.testimonial.findUnique({ where: { id: Number(id) } });
}

async function create(data) {
  return prisma.testimonial.create({ data });
}

async function update(id, data) {
  return prisma.testimonial.update({ where: { id: Number(id) }, data });
}

module.exports = { findAll, findById, create, update };
