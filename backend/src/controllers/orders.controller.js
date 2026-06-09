const svc = require('../services/orders.service');

const ok  = (res, data)      => res.json({ success: true, data });
const err = (res, msg, code) => res.status(code).json({ success: false, message: msg });

const create = async (req, res) => {
  const { items, shippingAddress, discountAmount } = req.body;
  if (!Array.isArray(items) || !items.length) return err(res, 'At least one item is required.', 400);
  const userId = req.user?.id ?? null;
  const order = await svc.create({ userId, items, shippingAddress, discountAmount });
  res.status(201).json({ success: true, data: order });
};

const getOne = async (req, res) => {
  const order = await svc.findById(req.params.id);
  if (!order) return err(res, 'Order not found.', 404);
  ok(res, order);
};

const getByNumber = async (req, res) => {
  const order = await svc.findByNumber(req.params.number);
  if (!order) return err(res, 'Order not found.', 404);
  ok(res, order);
};

const myOrders = async (req, res) => {
  if (!req.user) return err(res, 'Authentication required.', 401);
  ok(res, await svc.findByUser(req.user.id));
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  if (!status) return err(res, '`status` is required.', 400);
  ok(res, await svc.updateStatus(req.params.id, status));
};

module.exports = { create, getOne, getByNumber, myOrders, updateStatus };
