
function dashboard(req, res) {
  res.send("Hello from Server 1");
}

function test2Route(req, res) {
  res.json({ success: true, server: "Server 1", message: "Test route 2 is working" });
}


module.exports = { dashboard, test2Route };
