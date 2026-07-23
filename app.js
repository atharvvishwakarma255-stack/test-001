const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello from Server 1");
});

app.get("/dashboard", (req, res) => {
    res.send("Hello from Server 1");
});


app.get("/test", (req, res) => {
    res.json({
        success: true,
        server: "Server 1",
        message: "Test route is working"
    });
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server 1 is running on http://localhost:${PORT}`);
});