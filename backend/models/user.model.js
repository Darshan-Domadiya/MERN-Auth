import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImmage: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5khmUDCAdsuzFFIGr-dX9GU6rf7a-cMgzbgaBFB6unBnQn9cmauHaXfdVHqFj6y_6WR8&usqp=CAU",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (userEnteredPassword) {
  return await bcrypt.compare(userEnteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
