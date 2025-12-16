import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const authHeader  = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied: Not an admin" });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authAdmin
