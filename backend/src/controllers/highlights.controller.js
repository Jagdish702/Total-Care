const svc = require('../services/highlights.service');

const ok = (res, data) => res.json({ success: true, data });

const list         = async (req, res) => ok(res, await svc.findAll());
const showcaseBullets = async (req, res) => ok(res, await svc.findShowcaseBullets());

module.exports = { list, showcaseBullets };
