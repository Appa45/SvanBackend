const mongoose = require("mongoose");
const { env } = require("./env");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(env.mongoUri);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = { connectDatabase };