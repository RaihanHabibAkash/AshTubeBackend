import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDbUri = process.env.MONGODB_URI;
const dbName = "AshTube";

export const connectedDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${mongoDbUri}/${dbName}`
    );
    console.log(
      `\n MongoDB is connected! Cennection host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error while Connecting MongoDB: ", error);
    process.exit(1);
  }
};
