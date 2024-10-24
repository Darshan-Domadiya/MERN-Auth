import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";

async function connectDB() {
  try {
    const URI = `${process.env.DATABASE_URI}${DB_NAME}`;

    await mongoose
      .connect(URI)
      .then(() => console.log("Database is connected!"))
      .catch((err) => console.log("ERROR!", err));
  } catch (error) {
    console.log("Error while connecting to Database", error);
  }
}

export default connectDB;
// "mongodb+srv://darshandomadiya3525:darshan2024@mern.qb3kk.mongodb.net/mernAuth"
