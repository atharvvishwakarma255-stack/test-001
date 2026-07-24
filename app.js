const express = require("express");
const authRoutes = require("./routes/auth.routes");
const documentsRoutes = require("./routes/documents.routes");
const miscRoutes = require("./routes/misc.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(authRoutes);
app.use(documentsRoutes);
app.use(miscRoutes);

app.listen(PORT, () => {
    console.log(`Server 1 is running on http://localhost:${PORT}`);
});
