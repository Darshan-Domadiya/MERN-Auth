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
      profileImmage: req.body.picture,
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

export { signUpUser, signInUser, logInWithGoogle };
