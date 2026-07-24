function home(req, res) {
  res.send("Hello from Server 1");
}

function dashboard(req, res) {
  res.send("Hello from Server 1");
}

function testRoute(req, res) {
  res.json({ success: true, server: "Server 1", message: "Test route is working" });
}

function test2Route(req, res) {
  res.json({ success: true, server: "Server 1", message: "Test route 2 is working" });
}

module.exports = { home, dashboard, testRoute, test2Route };
