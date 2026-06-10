const prisma = require('../lib/prisma');

const productInclude = {
  features: { orderBy: { displayOrder: 'asc' } },
  images:   { orderBy: { displayOrder: 'asc' } },
  bundleItems: {
    orderBy: { displayOrder: 'asc' },
    include: {
      component: {
        include: {
          features: { orderBy: { displayOrder: 'asc' } },
          images:   { orderBy: { displayOrder: 'asc' } },
        },
      },
    },
  },
};

function addDiscountPct(product) {
  if (!product) return null;
  return {
    ...product,
    discountPct: product.originalPrice > 0
      ? Math.round((product.originalPrice - product.price) / product.originalPrice * 100)
      : 0,
  };
}

async function findAll({ type, activeOnly = true } = {}) {
  const where = {};
  if (activeOnly) where.isActive = true;
  if (type) where.productType = type;

  const products = await prisma.product.findMany({
    where,
    include: productInclude,
    orderBy: { displayOrder: 'asc' },
  });
  return products.map(addDiscountPct);
}

async function findById(id) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      features:        { orderBy: { displayOrder: 'asc' } },
      images:          { orderBy: { displayOrder: 'asc' } },
      highlights:      { orderBy: { displayOrder: 'asc' } },
      howItWorksSteps: { orderBy: { displayOrder: 'asc' } },
      tips:            { orderBy: { displayOrder: 'asc' } },
      techSpecs:       { orderBy: { displayOrder: 'asc' } },
      bundleItems: {
        orderBy: { displayOrder: 'asc' },
        include: {
          component: {
            include: {
              features:        { orderBy: { displayOrder: 'asc' } },
              images:          { orderBy: { displayOrder: 'asc' } },
              howItWorksSteps: { orderBy: { displayOrder: 'asc' } },
              tips:            { orderBy: { displayOrder: 'asc' } },
              techSpecs:       { orderBy: { displayOrder: 'asc' } },
            },
          },
        },
      },
      detailTabs: {
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
        include: {
          vitals:  { orderBy: { displayOrder: 'asc' } },
          insight: true,
        },
      },
      testimonials: {
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
      },
    },
  });
  return addDiscountPct(product);
}

async function findBundles() {
  return findAll({ type: 'bundle' });
}

async function findIndividuals() {
  return findAll({ type: 'individual' });
}

async function create(data) {
  const product = await prisma.product.create({ data, include: productInclude });
  return addDiscountPct(product);
}

async function update(id, data) {
  const product = await prisma.product.update({ where: { id }, data, include: productInclude });
  return addDiscountPct(product);
}

async function remove(id) {
  return prisma.product.update({ where: { id }, data: { isActive: false } });
}

module.exports = { findAll, findById, findBundles, findIndividuals, create, update, remove };
