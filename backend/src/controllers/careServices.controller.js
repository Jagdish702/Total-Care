const svc = require('../services/careServices.service');

const ok  = (res, data)      => res.json({ success: true, data });
const err = (res, msg, code) => res.status(code).json({ success: false, message: msg });

const list   = async (req, res) => ok(res, await svc.findAll());
const getOne = async (req, res) => {
  const item = await svc.findById(req.params.id);
  if (!item) return err(res, 'Care service not found.', 404);
  ok(res, item);
};
const create = async (req, res) => res.status(201).json({ success: true, data: await svc.create(req.body) });
const update = async (req, res) => ok(res, await svc.update(req.params.id, req.body));

module.exports = { list, getOne, create, update };
