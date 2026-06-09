const svc = require('../services/footer.service');

const ok = (res, data) => res.json({ success: true, data });

const list = async (req, res) => ok(res, await svc.findAll());

module.exports = { list };
