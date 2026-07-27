
async function testRoute(req, res) {
  res.json({ success: true, message: "Test route is working" });
}

module.exports = { testRoute };
