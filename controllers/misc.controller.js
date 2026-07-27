
async function testRoute(req, res) {
  res.json({ success: true, message: "Test route is working", version: 2, environment: "staging" });
}

async function healthCheck(req, res) {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
}

module.exports = { testRoute, healthCheck };
