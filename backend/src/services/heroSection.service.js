const prisma = require('../lib/prisma');

async function findOne() {
  const row = await prisma.heroSectionConfig.findFirst({
    where: { isActive: true },
  });
  if (!row) return null;

  // Fetch the two fields added after client generation via raw SQL
  const [extra] = await prisma.$queryRaw`
    SELECT bg_image_url AS "bgImageUrl", phone_image_url AS "phoneImageUrl"
    FROM hero_section_config
    WHERE id = ${row.id}
  `;

  return {
    ...row,
    bgImageUrl:    extra?.bgImageUrl    ?? null,
    phoneImageUrl: extra?.phoneImageUrl ?? null,
    allergyItems:  row.allergyList
      ? row.allergyList.split(',').map(s => s.trim())
      : [],
  };
}

module.exports = { findOne };
