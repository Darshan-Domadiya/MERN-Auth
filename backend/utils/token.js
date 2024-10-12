import jwt from "jsonwebtoken";
const secret = "Darshan@#2025$2028";

function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, secret);
}

export { setUser };
