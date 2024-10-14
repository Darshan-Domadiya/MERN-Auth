import jwt from "jsonwebtoken";
const secret = "Darshan@#2025$2028";

function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, secret);
}

async function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "User need to login!" });
  }

  try {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(403)
          .json({ error: true, message: "Token is not valid!" });
      }

      // console.log("token req.user ", decodedToken);

      req.user = decodedToken;
      next();
    });
  } catch (error) {
    console.log("ERROR:", error);
  }
}

export { setUser, verifyToken };
