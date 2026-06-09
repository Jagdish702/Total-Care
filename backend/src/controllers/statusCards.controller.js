const svc = require('../services/statusCards.service');

const ok  = (res, data)      => res.json({ success: true, data });
const err = (res, msg, code) => res.status(code).json({ success: false, message: msg });

const list = async (req, res) => {
  const { type } = req.query;
  ok(res, await svc.findAll({ cardType: type }));
};

const getOne = async (req, res) => {
  const card = await svc.findById(req.params.id);
  if (!card) return err(res, 'Status card not found.', 404);
  ok(res, card);
};

module.exports = { list, getOne };
