const prisma = require('../lib/prisma');

const planInclude = {
  descriptionLines: { orderBy: { displayOrder: 'asc' } },
  planFeatures: {
    include: { feature: true },
    orderBy: { feature: { displayOrder: 'asc' } },
  },
  priceBreakdowns: { orderBy: { displayOrder: 'asc' } },
  savings:         { orderBy: { displayOrder: 'asc' } },
  billingInfo:     { orderBy: { displayOrder: 'asc' } },
};

function normalize(plan) {
  if (!plan) return null;
  return {
    ...plan,
    features: plan.planFeatures?.map(pf => pf.feature) ?? [],
    planFeatures: undefined,
  };
}

async function findAll(activeOnly = true) {
  const plans = await prisma.subscriptionPlan.findMany({
    where: activeOnly ? { isActive: true } : {},
    include: planInclude,
    orderBy: { displayOrder: 'asc' },
  });
  return plans.map(normalize);
}

async function findById(id) {
  const plan = await prisma.subscriptionPlan.findUnique({ where: { id }, include: planInclude });
  return normalize(plan);
}

async function create(data) {
  const plan = await prisma.subscriptionPlan.create({ data, include: planInclude });
  return normalize(plan);
}

async function update(id, data) {
  const plan = await prisma.subscriptionPlan.update({ where: { id }, data, include: planInclude });
  return normalize(plan);
}

module.exports = { findAll, findById, create, update };
