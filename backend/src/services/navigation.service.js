const prisma = require('../lib/prisma');

async function findAll(activeOnly = true) {
  // Return flat list; frontend builds the tree if needed
  return prisma.navItem.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: { displayOrder: 'asc' },
  });
}

async function findTree(activeOnly = true) {
  const all = await prisma.navItem.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: { displayOrder: 'asc' },
  });
  const map = {};
  const roots = [];
  for (const item of all) {
    map[item.id] = { ...item, children: [] };
  }
  for (const item of all) {
    if (item.parentId) {
      map[item.parentId]?.children.push(map[item.id]);
    } else {
      roots.push(map[item.id]);
    }
  }
  return roots;
}

module.exports = { findAll, findTree };
