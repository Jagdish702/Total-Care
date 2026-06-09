const svc = require('../services/users.service');

const ok  = (res, data)      => res.json({ success: true, data });
const err = (res, msg, code) => res.status(code).json({ success: false, message: msg });

const register = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  if (!fullName) return err(res, 'fullName is required.', 400);
  const result = await svc.register({ fullName, email, phone, password });
  res.status(201).json({ success: true, data: result });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return err(res, 'email and password are required.', 400);
  ok(res, await svc.login({ email, password }));
};

const me = async (req, res) => ok(res, req.user);

const getOne = async (req, res) => {
  const user = await svc.findById(req.params.id);
  if (!user) return err(res, 'User not found.', 404);
  ok(res, user);
};

const update = async (req, res) => ok(res, await svc.update(req.user.id, req.body));

const getSubscriptions = async (req, res) => {
  ok(res, await svc.getSubscriptions(req.user.id));
};

const subscribe = async (req, res) => {
  const { planId } = req.body;
  if (!planId) return err(res, 'planId is required.', 400);
  res.status(201).json({ success: true, data: await svc.subscribe(req.user.id, planId) });
};

module.exports = { register, login, me, getOne, update, getSubscriptions, subscribe };
