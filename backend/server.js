const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route

app.use("/", require("./routes"));

// Start the server
const PORT = 8000; // You can change this port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
