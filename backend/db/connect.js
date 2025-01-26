const mongoose = require("mongoose");

const connectDB = (url) => {
  // Optional: Configure strictQuery globally to handle related warnings
  mongoose.set("strictQuery", false);

  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
