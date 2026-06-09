const prisma = require('../lib/prisma');

async function initiate({ orderId, paymentMethod, amount }) {
  return prisma.payment.create({
    data: {
      orderId:       Number(orderId),
      paymentMethod,
      amount,
      status:        'pending',
    },
  });
}

async function updateStatus(id, { status, transactionId, gatewayRef, failureReason, completedAt }) {
  const data = { status };
  if (transactionId)  data.transactionId  = transactionId;
  if (gatewayRef)     data.gatewayRef     = gatewayRef;
  if (failureReason)  data.failureReason  = failureReason;
  if (completedAt)    data.completedAt    = new Date(completedAt);

  const payment = await prisma.payment.update({ where: { id: Number(id) }, data });

  // Mirror status onto parent order
  if (['successful', 'failed', 'cancelled', 'refunded'].includes(status)) {
    const orderStatus = status === 'successful' ? 'confirmed' : status === 'refunded' ? 'refunded' : 'pending';
    await prisma.order.update({ where: { id: payment.orderId }, data: { status: orderStatus } });
  }

  return payment;
}

async function findById(id) {
  return prisma.payment.findUnique({ where: { id: Number(id) } });
}

async function findByOrder(orderId) {
  return prisma.payment.findMany({
    where: { orderId: Number(orderId) },
    orderBy: { createdAt: 'desc' },
  });
}

module.exports = { initiate, updateStatus, findById, findByOrder };
