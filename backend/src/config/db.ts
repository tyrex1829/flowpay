import mongoose from "mongoose";

const connectDB = async (MONGO_URL: string) => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

export default connectDB;
