
async function testRoute(req, res) {
  res.json({ success: true, message: "Test route is working", version: 2, environment: "staging" });
}

module.exports = { testRoute };
