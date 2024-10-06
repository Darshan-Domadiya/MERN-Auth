import { User } from "../models/user.model.js";

async function signUpUser(req, res) {
  const { username, email, password } = req.body;
  // console.log(req.body);

  if (!(username && email && password)) {
    res.status(400).json({ error: true, message: "All field are required!" });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    res.status(400).json({
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
    res
      .status(500)
      .json({ error: true, message: "Something went wrong while User Signin" });
  }

  res.status(201).json({ error: false, message: "User created successfully!" });
}

async function signInUser(req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).json({ error: true, message: "All field are required! " });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User does not exists!" });
  

  const isRightPassword = await user.isPasswordCorrect(password);

  if (!isRightPassword) {
    res.status(404).json({ message: "User's credentials are invalid!" });
  }

  return res
    .status(200)
    .json({ error: false, message: "User logged In successfully!" });
}

export { signUpUser, signInUser };
