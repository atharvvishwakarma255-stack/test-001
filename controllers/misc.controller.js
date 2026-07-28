
async function testRoute(req, res) {
  res.json({ success: true, message: "Test route is working", version: 2, environment: "staging" });
}

async function healthCheck(req, res) {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
}

async function usersList(req, res) {
  res.json({ users: ["user1", "user2", "user3"] });
}

async function sendEmail(req, res) {
  res.json({ success: true, message: "Email sent successfully" });
}

async function syncDocs(req, res) {
  res.json({ success: true, message: "Shubham !!!!!!" });
}

// async function testSync(req, res) {
//   res.json({ success: true, message: "Shubham test sync completed" });
// }


module.exports = { testRoute, healthCheck, usersList, sendEmail, syncDocs };
