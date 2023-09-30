const mongoose = require("mongoose");

const Connection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("💻 MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = Connection;
