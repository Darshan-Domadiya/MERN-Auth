import connectDB from "./database/user.db.js";
import app from "./utils/app.js";

connectDB();

const PORT = 2025;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
