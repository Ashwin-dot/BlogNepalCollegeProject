const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/codeBlog" || process.env.MONGO_URI;
const connectDatabase = async () => {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true });

  console.log("MongoDB Connection Successfully");
};

module.exports = connectDatabase;
