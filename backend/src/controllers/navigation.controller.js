const svc = require('../services/navigation.service');

const ok = (res, data) => res.json({ success: true, data });

const listFlat = async (req, res) => ok(res, await svc.findAll());
const listTree = async (req, res) => ok(res, await svc.findTree());

module.exports = { listFlat, listTree };
