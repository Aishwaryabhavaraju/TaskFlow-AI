const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
      retryWrites: true,
      w: "majority",
    });

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(`Error: ${error.message}`);
    console.error(`MONGO_URI: ${process.env.MONGO_URI ? "Set" : "NOT SET"}`);

    // Retry after 5 seconds
    console.log("Retrying in 5 seconds...");
    setTimeout(() => connectDB(), 5000);
  }
};

module.exports = connectDB;