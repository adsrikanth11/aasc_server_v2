const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(cors()); // Enable CORS for all routes

// Serve static files
app.use('/public', express.static('public'));

// Home Route
app.get('/', (req, res) => {
   res.send('Welcome to AASC Server Application');
});

// 404 handler
app.use((req, res, next) => {
   const message = `404 - Not Found - ${req.originalUrl} - ${req.method} - ${req.ip}`;
   console.error(message); // Log 404
   res.status(404).json({
      message: 'The requested route is not found on this server.',
   });
});

// Global Error handler
module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(`${statusCode} - ${err.message}`);
  console.error(err.stack);

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
  });
};

module.exports = app;