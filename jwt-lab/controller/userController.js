import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const userRegister = async (req, res) => {
  try {
    const error = validationResult(req);

    if (error.array().length != 0) {
      return res.json(error.array());
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) return res.json({ message: "User Already exist." });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    req.body.password = hashPassword;

    const data = await User.create(req.body);
    return res
      .status(201)
      .json({ message: "User Register Successfully.", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ message: "User Not Exist." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials." });

    return res.status(200).json({ message: "Login Successfully.", data: user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const data = await User.find({});
    return res
      .status(200)
      .json({ message: "All User Data Fetch Successfully", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findOneAndReplace(id);

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      userId: data.id,
    });
  } catch (error) {
    return res.status(500).json();
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User Delete Successfully",
      userId: data.id,
    });
  } catch (error) {
    return res.status(500).json();
  }
};
