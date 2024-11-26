import mongoose from "mongoose";

mongoose.set("debug", function (collectionName, method, query, doc) {
  console.log(`Mongoose: ${collectionName}.${method}`, query, doc);
});

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/node_blog_dev", {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
