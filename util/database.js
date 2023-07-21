import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  try {
    await mongoose.connect(
      "mongodb+srv://stan:Yanwenyao!123@test.3t6vwhs.mongodb.net/NutritionDashboard?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Error connecting to MongoDB");
  }
};
