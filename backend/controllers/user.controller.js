import { User } from "../models/user.model.js";
import { setUser } from "../utils/token.js";
import bcrypt from "bcrypt";

async function signUpUser(req, res) {
  const { username, email, password } = req.body;
  // console.log(req.body);

  if (!(username && email && password)) {
    return res
      .status(400)
      .json({ error: true, message: "* All field are required!" });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    return res.status(400).json({
      error: true,
      message: "User with mail ID or username already exists",
    });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong while User Signin" });
  }

  res.status(201).json({ error: false, message: "User created successfully!" });
}

async function signInUser(req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(400)
      .json({ error: true, message: "* All field are required! " });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ error: true, message: "User does not exists!" });
  }

  const isRightPassword = await user.isPasswordCorrect(password);

  if (!isRightPassword) {
    return res
      .status(404)
      .json({ error: true, message: "User's credentials are invalid!" });
  }

  const token = setUser(user);

  const { password: hashedPassword, ...rest } = user._doc;

  res.status(200).cookie("token", token).json({
    error: false,
    message: "User logged In successfully!",
    user: rest,
  });
}

async function logInWithGoogle(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const token = setUser(user);

    const { password: hashedPassword, ...rest } = user._doc;

    res.status(200).cookie("token", token).json({
      error: false,
      message: "User logged in successfully with Google",
      user: rest,
    });
  } else {
    const generatedRandomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedRandomPassword, 10);

    const newUser = await User.create({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString(),
      email: req.body.email,
      profileImage: req.body.picture,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong while logIn with Google!",
      });
    }

    const token = setUser(newUser);

    const { password, ...rest } = newUser._doc;

    res.status(200).cookie("token", token).json({
      error: false,
      message: "User loggedIn successfully with Google!!",
      user: rest,
    });
  }
}

async function updateUser(req, res) {
  if (req.user._id !== req.params.id) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized request to update user profile!",
    });
  }

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          profileImage: req.body.profileImage,
        },
      },
      { new: true }
    );

    if (!updateUser) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error!" });
    }

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      error: false,
      message: "User updated successfully!",
      user: rest,
    });
  } catch (error) {
    console.log("Error while updating user profile!", error);
  }
}

async function deleteUser(req, res) {
  try {
    if (req.user._id !== req.params.id) {
      return res
        .status(401)
        .json({ error: true, message: "Unauthorized request to delete user!" });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong while deleting the user!",
      });
    }

    const { password, ...rest } = deletedUser._doc;

    res.status(200).json({
      error: false,
      message: "User deleted successfully!",
      user: rest,
    });
  } catch (error) {
    console.log("ERROR:", error);
  }
}

async function signOutUser(req, res) {
  res
    .clearCookie("token")
    .status(200)
    .json({ error: false, message: "Successful signout!" });
}

export {
  signUpUser,
  signInUser,
  logInWithGoogle,
  updateUser,
  deleteUser,
  signOutUser,
};
