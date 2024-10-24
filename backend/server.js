import dotenv from "dotenv";
import app from "./utils/app.js";
import connectDB from "./database/user.db.js";

dotenv.config({ path: "./.env" });

const PORT = 2025;



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
