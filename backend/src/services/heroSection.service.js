const prisma = require('../lib/prisma');

async function findOne() {
  const row = await prisma.heroSectionConfig.findFirst({
    where: { isActive: true },
  });
  if (!row) return null;
  return {
    ...row,
    allergyItems: row.allergyList
      ? row.allergyList.split(',').map(s => s.trim())
      : [],
  };
}

module.exports = { findOne };
