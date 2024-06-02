const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to db`.bgMagenta.bold);
  } catch (error) {
    console.log(`Mongo connection error ${error}`.bgRed.bold);
  }
};

module.exports = connectDB;
