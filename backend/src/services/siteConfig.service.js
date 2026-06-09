const prisma = require('../lib/prisma');

async function findAll(group) {
  const where = group ? { configGroup: group } : {};
  const rows = await prisma.siteConfig.findMany({ where, orderBy: { configGroup: 'asc' } });
  // Return as flat key→value map
  return Object.fromEntries(rows.map(r => [r.configKey, r.configValue]));
}

async function findByKey(key) {
  return prisma.siteConfig.findUnique({ where: { configKey: key } });
}

async function set(key, value, group = 'general') {
  return prisma.siteConfig.upsert({
    where:  { configKey: key },
    update: { configValue: value },
    create: { configKey: key, configValue: value, configGroup: group },
  });
}

async function setMany(entries) {
  return Promise.all(entries.map(({ key, value, group }) => set(key, value, group)));
}

module.exports = { findAll, findByKey, set, setMany };
