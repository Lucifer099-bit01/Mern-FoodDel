import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Uday:Lucifer0911@cluster0.querr03.mongodb.net/food-del"
  );
  console.log("MongoDB connected successfully");
};

export default connectDB;
