import bcrypt from "bcrypt";
import { generateToken } from "../utils/util.js";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required!" });
    }
    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "Password must be at least 6 characters long!" });
    }
    email = email.toLowerCase().trim();
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "User already registered!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      await newUser.save();
      generateToken(newUser.id, res);
      const userResponse = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };
      return res
        .status(201)
        .json({ message: "User created successfully.", userResponse });
    } else {
      return res.status(400).json({ message: "Invalid user data!" });
    }
  } catch (error) {
    console.error("Error while register user:", error.message);

    return res.status(401).json({ message: "Error while register user." });
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    email = email.toLowerCase().trim();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    generateToken(user._id, res);
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    return res.status(200).json({ message: "Login successful.", userResponse });
  } catch (error) {
    console.error("Error while logging user:", error.message);
    return res.status(500).json({ message: "Login failed!" });
  }
};

export const getMe = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed." });
  }
};
