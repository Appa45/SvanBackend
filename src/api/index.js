const app = require("../src/app");
const { connectDatabase } = require("../src/config/database");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDatabase();
    isConnected = true;
  }

  return app(req, res);
};