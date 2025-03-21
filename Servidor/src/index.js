const express = require("express");
const app = express();
const path = require("path");

// Serve static files from uploads/
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});