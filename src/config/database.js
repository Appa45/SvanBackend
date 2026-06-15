const mongoose = require("mongoose");
const { env } = require("./env");

const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", true);

    console.log("Connecting to MongoDB...");

    const connection = await mongoose.connect(env.mongoUri);

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );

    return connection;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

module.exports = { connectDatabase };