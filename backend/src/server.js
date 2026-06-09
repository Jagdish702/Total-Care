const app    = require('./app');
const prisma = require('./lib/prisma');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await prisma.$connect();
    console.log('[DB] SQLite connected via Prisma');
  } catch (err) {
    console.error('[DB] Connection failed:', err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
    console.log(`[Server] API base: http://localhost:${PORT}/api`);
  });
}

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();
