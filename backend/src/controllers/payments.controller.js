const svc = require('../services/payments.service');

const ok  = (res, data)      => res.json({ success: true, data });
const err = (res, msg, code) => res.status(code).json({ success: false, message: msg });

const initiate = async (req, res) => {
  const { orderId, paymentMethod, amount } = req.body;
  if (!orderId || !paymentMethod || !amount) return err(res, 'orderId, paymentMethod, and amount are required.', 400);
  const payment = await svc.initiate({ orderId, paymentMethod, amount });
  res.status(201).json({ success: true, data: payment });
};

const updateStatus = async (req, res) => {
  const payment = await svc.updateStatus(req.params.id, req.body);
  ok(res, payment);
};

const getOne = async (req, res) => {
  const payment = await svc.findById(req.params.id);
  if (!payment) return err(res, 'Payment not found.', 404);
  ok(res, payment);
};

const getByOrder = async (req, res) => {
  ok(res, await svc.findByOrder(req.params.orderId));
};

module.exports = { initiate, updateStatus, getOne, getByOrder };
