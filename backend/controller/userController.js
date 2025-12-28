import bcrypt from "bcryptjs";
import User from "../Models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are require." });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // if (!validator.isEmail(email)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Please enter a valid email" });
    // }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should not be less than 8",
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: "User register successfully",
      token,
      user: {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: true, message: "All fields are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email doesn't exists" });
    }

    const isMatchPass = await bcrypt.compare(password, user.password);

    if (!isMatchPass) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_TOKEN, {
        expiresIn: "1d",
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { login, register, adminLogin };
