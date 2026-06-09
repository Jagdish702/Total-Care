const prisma = require('../lib/prisma');

const faqInclude = {
  category: true,
  listItems: { orderBy: { displayOrder: 'asc' } },
  steps: {
    orderBy: { displayOrder: 'asc' },
    include: { items: { orderBy: { displayOrder: 'asc' } } },
  },
};

async function findAll({ categorySlug, activeOnly = true } = {}) {
  const where = {};
  if (activeOnly) where.isActive = true;
  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  return prisma.faq.findMany({
    where,
    include: faqInclude,
    orderBy: { displayOrder: 'asc' },
  });
}

async function findById(id) {
  return prisma.faq.findUnique({ where: { id: Number(id) }, include: faqInclude });
}

async function findCategories() {
  return prisma.faqCategory.findMany({
    orderBy: { displayOrder: 'asc' },
    include: {
      faqs: {
        where: { isActive: true },
        include: faqInclude,
        orderBy: { displayOrder: 'asc' },
      },
    },
  });
}

async function create(data) {
  return prisma.faq.create({ data, include: faqInclude });
}

async function update(id, data) {
  return prisma.faq.update({ where: { id: Number(id) }, data, include: faqInclude });
}

module.exports = { findAll, findById, findCategories, create, update };
