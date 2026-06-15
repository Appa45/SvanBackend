const mongoose = require("mongoose");

const uri =
  "mongodb+srv://swanuser:svan1234@cluster0.zrwm8nl.mongodb.net/swanorganics?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:");
    console.error(err);
    process.exit(1);
  });