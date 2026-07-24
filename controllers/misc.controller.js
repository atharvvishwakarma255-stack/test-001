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

function health(req, res) {
  res.json({ status: "ok" });
}

async function testById(req, res) {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string" || id.trim() === "") {
      return res.status(400).json({
        message: "Validation failed",
      });
    }

    return res.status(200).json(null);
  } catch (error) {
    console.error("Test Route Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { home, dashboard, testRoute, test2Route, health, testById };
