require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Routers
const AuthRouter = require('./routes/auth');

// Error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());  // Ensure JSON middleware is used early

// Proxy requests to the Google Maps API
app.use('/api', createProxyMiddleware({
  target: 'https://maps.googleapis.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Removes '/api' prefix for Google Maps API
  },
}));

// Test route
app.get('/', (req, res) => {
  res.send('WanderWise');
});

// Route for authentication
app.use('/api/v1/auth', AuthRouter);

// Error handling middleware (keep these last)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Database connection and server start
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to DB');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
