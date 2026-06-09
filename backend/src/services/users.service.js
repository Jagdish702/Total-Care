const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const prisma = require('../lib/prisma');

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

function safeUser(user) {
  if (!user) return null;
  const { passwordHash, ...rest } = user;
  return rest;
}

async function register({ fullName, email, phone, password }) {
  const existing = email ? await prisma.user.findUnique({ where: { email } }) : null;
  if (existing) {
    const err = new Error('Email already registered.'); err.statusCode = 409; throw err;
  }
  const passwordHash = password ? await bcrypt.hash(password, 10) : null;
  const user = await prisma.user.create({ data: { fullName, email, phone, passwordHash, role: 'customer' } });
  return { user: safeUser(user), token: signToken(user.id) };
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    const err = new Error('Invalid credentials.'); err.statusCode = 401; throw err;
  }
  const valid = await bcrypt.compare(password, user.passwordHash ?? '');
  if (!valid) {
    const err = new Error('Invalid credentials.'); err.statusCode = 401; throw err;
  }
  return { user: safeUser(user), token: signToken(user.id) };
}

async function findById(id) {
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  return safeUser(user);
}

async function update(id, data) {
  if (data.password) {
    data.passwordHash = await bcrypt.hash(data.password, 10);
    delete data.password;
  }
  const user = await prisma.user.update({ where: { id: Number(id) }, data });
  return safeUser(user);
}

async function getSubscriptions(userId) {
  return prisma.userSubscription.findMany({
    where: { userId: Number(userId) },
    include: { plan: true },
    orderBy: { createdAt: 'desc' },
  });
}

async function subscribe(userId, planId) {
  const now = new Date();
  const plan = await prisma.subscriptionPlan.findUnique({ where: { id: planId } });
  if (!plan) { const err = new Error('Plan not found.'); err.statusCode = 404; throw err; }

  const endsAt = new Date(now);
  if (plan.pricePeriod === 'month') endsAt.setMonth(endsAt.getMonth() + (plan.planType === 'quarterly' ? 3 : 1));
  else endsAt.setFullYear(endsAt.getFullYear() + 1);

  return prisma.userSubscription.create({
    data: { userId: Number(userId), planId, status: 'active', startsAt: now, endsAt },
    include: { plan: true },
  });
}

module.exports = { register, login, findById, update, getSubscriptions, subscribe };
