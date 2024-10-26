require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');

//routers
// const jobRouter = require('./routes/jobs')
const AuthRouter = require('./routes/auth')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}));
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('WanderWise');
});
// app.use('/api/v1/',jobRouter);
app.use('/api/v1/auth',AuthRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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

start();
