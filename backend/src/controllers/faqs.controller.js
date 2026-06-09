const svc = require('../services/faqs.service');

const ok  = (res, data)      => res.json({ success: true, data });
const err = (res, msg, code) => res.status(code).json({ success: false, message: msg });

const list = async (req, res) => {
  const { category } = req.query;
  ok(res, await svc.findAll({ categorySlug: category }));
};
const listCategories = async (req, res) => ok(res, await svc.findCategories());
const getOne = async (req, res) => {
  const item = await svc.findById(req.params.id);
  if (!item) return err(res, 'FAQ not found.', 404);
  ok(res, item);
};
const create = async (req, res) => res.status(201).json({ success: true, data: await svc.create(req.body) });
const update = async (req, res) => ok(res, await svc.update(req.params.id, req.body));

module.exports = { list, listCategories, getOne, create, update };
