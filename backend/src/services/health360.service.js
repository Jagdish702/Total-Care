const prisma = require('../lib/prisma');

function parseFrame(frame) {
  return {
    ...frame,
    titleLines: JSON.parse(frame.titleLines),
  };
}

async function findAll(activeOnly = true) {
  const frames = await prisma.health360Frame.findMany({
    where: activeOnly ? { isActive: true } : {},
    include: { bullets: { orderBy: { displayOrder: 'asc' } } },
    orderBy: { displayOrder: 'asc' },
  });
  return frames.map(parseFrame);
}

async function findById(id) {
  const frame = await prisma.health360Frame.findUnique({
    where: { id: Number(id) },
    include: { bullets: { orderBy: { displayOrder: 'asc' } } },
  });
  return frame ? parseFrame(frame) : null;
}

async function create(data) {
  const frame = await prisma.health360Frame.create({
    data: { ...data, titleLines: JSON.stringify(data.titleLines) },
    include: { bullets: { orderBy: { displayOrder: 'asc' } } },
  });
  return parseFrame(frame);
}

module.exports = { findAll, findById, create };
