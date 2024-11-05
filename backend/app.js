require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const { createProxyMiddleware } = require('http-proxy-middleware');

//routers
// const jobRouter = require('./routes/jobs')
const AuthRouter = require('./routes/auth')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}));
// extra packages



const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('connected to db');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

// Proxy requests to the Google Maps API
app.use('/api', createProxyMiddleware({
  target: 'https://maps.googleapis.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // whenevr we send a request to google map api there will be an extra \api which should be removed so this does that work
  },
}));

start();
