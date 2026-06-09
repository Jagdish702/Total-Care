const { validationResult } = require('express-validator');
const svc = require('../services/products.service');

const ok  = (res, data)       => res.json({ success: true, data });
const err = (res, msg, code)  => res.status(code).json({ success: false, message: msg });

const list = async (req, res) => {
  const { type } = req.query;
  const data = await svc.findAll({ type });
  ok(res, data);
};

const listBundles = async (req, res) => {
  ok(res, await svc.findBundles());
};

const listIndividuals = async (req, res) => {
  ok(res, await svc.findIndividuals());
};

const getOne = async (req, res) => {
  const product = await svc.findById(req.params.id);
  if (!product) return err(res, 'Product not found.', 404);
  ok(res, product);
};

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ success: false, errors: errors.array() });
  const product = await svc.create(req.body);
  res.status(201).json({ success: true, data: product });
};

const update = async (req, res) => {
  const product = await svc.update(req.params.id, req.body);
  ok(res, product);
};

const remove = async (req, res) => {
  await svc.remove(req.params.id);
  res.json({ success: true, message: 'Product deactivated.' });
};

module.exports = { list, listBundles, listIndividuals, getOne, create, update, remove };
