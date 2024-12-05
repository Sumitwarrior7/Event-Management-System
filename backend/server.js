const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to the Express Server!');
});


// Start the server
const PORT = 8000; // You can change this port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
