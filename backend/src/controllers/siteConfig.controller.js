const svc = require('../services/siteConfig.service');

const ok  = (res, data)      => res.json({ success: true, data });
const err = (res, msg, code) => res.status(code).json({ success: false, message: msg });

const list = async (req, res) => ok(res, await svc.findAll(req.query.group));

const getOne = async (req, res) => {
  const item = await svc.findByKey(req.params.key);
  if (!item) return err(res, 'Config key not found.', 404);
  ok(res, item);
};

const set = async (req, res) => {
  const { value, group } = req.body;
  if (!value) return err(res, '`value` is required.', 400);
  ok(res, await svc.set(req.params.key, value, group));
};

const setMany = async (req, res) => {
  const { entries } = req.body;
  if (!Array.isArray(entries)) return err(res, '`entries` array is required.', 400);
  ok(res, await svc.setMany(entries));
};

module.exports = { list, getOne, set, setMany };
