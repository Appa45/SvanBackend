const app = require("../src/app");
const { connectDatabase } = require("../src/config/database");

let isConnected = false;


module.exports = async (req, res) => {
     console.log("Request:", req.url);
  if (!isConnected) {
      console.log("Connecting MongoDB...");
    await connectDatabase();
     console.log("MongoDB Connected");
    isConnected = true;
  }

  return app(req, res);
};