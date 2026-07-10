import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Register
export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required...",
      });
    } else {
      const data = await User.findOne({ email });

      if (data) {
        return res.status(400).json({
          success: false,
          message: "User already exit..",
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);

        const data = await User.create({
          name,
          email,
          password: hashPassword,
        });
        return res.status(200).json({
          success: true,
          message: "User register successfully...",
          user: data,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// User Login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found...",
      });
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "User enter wrong password...",
        });
      } else {
        const token = jwt.sign({ id: user.id }, envConfig.JWT_SECRET, {
          expiresIn: "12h",
        });
        return res.status(200).json({
          success: true,
          message: "User login successfully...",
          user: user,
          token: token,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create New User
export const createUser = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    const data = await User.create(req.body);

    return res.status(200).json({
      success: true,
      message: "User created successfully...",
      User: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All User Data
export const getAllUser = async (req, res) => {
  try {
    const usersData = await User.find({});
    return res.status(200).json({
      success: true,
      message: "All user data featch...",
      User: usersData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get One User Data
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User data featch...",
        User: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User not found...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ success: true, message: "User data updated..." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User deleted...",
        DeletedUser: user,
      });
    } else {
      return res.status(400).json({
        success: true,
        message: "User not found...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
