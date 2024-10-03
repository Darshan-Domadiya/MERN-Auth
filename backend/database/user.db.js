import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://darshandomadiya3525:darshan2024@mern.qb3kk.mongodb.net/mernAuth"
      )
      .then(() => console.log("Database is connected!"))
      .catch((err) => console.log("ERROR!", err));
  } catch (error) {
    console.log("Error while connecting to Database", error);
  }
}

export default connectDB;
