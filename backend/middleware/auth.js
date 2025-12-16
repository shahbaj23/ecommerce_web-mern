import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  let token = req.headers.authorization;

  console.log("Incoming Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    console.log("Decoded Token:", decoded);

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
