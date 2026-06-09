const prisma = require('../lib/prisma');

function generateOrderNumber() {
  const ts    = Date.now().toString(36).toUpperCase();
  const rand  = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `TCO-${ts}-${rand}`;
}

const orderInclude = {
  items: {
    include: {
      product: true,
      plan:    true,
    },
  },
  payments: { orderBy: { createdAt: 'desc' } },
};

function addComputedFields(order) {
  if (!order) return null;
  return {
    ...order,
    items: order.items.map(item => ({
      ...item,
      totalPrice: item.quantity * item.unitPrice,
    })),
  };
}

async function create({ userId, items, shippingAddress, discountAmount = 0 }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * (i.quantity ?? 1), 0);
  const total    = Math.max(0, subtotal - discountAmount);

  const order = await prisma.order.create({
    data: {
      userId,
      orderNumber:     generateOrderNumber(),
      subtotal,
      discount:        discountAmount,
      totalAmount:     total,
      shippingAddress: shippingAddress ? JSON.stringify(shippingAddress) : null,
      status:          'pending',
      items: {
        create: items.map(item => ({
          itemType:  item.type,    // 'product' | 'subscription'
          productId: item.type === 'product'      ? item.id : null,
          planId:    item.type === 'subscription' ? item.id : null,
          quantity:  item.quantity ?? 1,
          unitPrice: item.price,
        })),
      },
    },
    include: orderInclude,
  });
  return addComputedFields(order);
}

async function findById(id) {
  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: orderInclude,
  });
  return addComputedFields(order);
}

async function findByNumber(orderNumber) {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: orderInclude,
  });
  return addComputedFields(order);
}

async function findByUser(userId) {
  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
    include: orderInclude,
    orderBy: { createdAt: 'desc' },
  });
  return orders.map(addComputedFields);
}

async function updateStatus(id, status) {
  return prisma.order.update({ where: { id: Number(id) }, data: { status } });
}

module.exports = { create, findById, findByNumber, findByUser, updateStatus };
