require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Routers
const AuthRouter = require('./routes/auth');
const googlemap=require('./routes/googlemap');
const userPreferenceRouter = require('./routes/userPreference');
const transport = require('./routes/transport');
const recommendation = require('./routes/recommendation');
const gemini  = require('./routes/gemini');
const gemini2 = require('./routes/gemini2')
const profile = require('./routes/profile');

// Error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authMiddle = require('./middleware/authentication');


// Middlewares
app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));


// Test route
app.get('/', (req, res) => {
  res.send('WanderWise');
});

app.use(express.json());  // Ensure JSON middleware is used early


// Route for authentication
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1',googlemap);
app.use('/api/v1/planpage/cart',authMiddle,userPreferenceRouter);
app.use('/api/v1/planpage/transport',authMiddle,transport);
app.use('/api/v1/planpage/gemini', authMiddle, gemini);
app.use('/api/v1/planpage/recommendation', authMiddle, recommendation);
app.use('/api/v1/planpage/gemini2',authMiddle,gemini2);
app.use('/api/v1/profile',authMiddle,profile);

// Error handling middleware (keep these last)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Proxy requests to the Google Maps API
// app.use('/googleApi', createProxyMiddleware({
//   target: 'https://maps.googleapis.com',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/googleApi': '', // Removes '/api' prefix for Google Maps API
//   },
// }));
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
