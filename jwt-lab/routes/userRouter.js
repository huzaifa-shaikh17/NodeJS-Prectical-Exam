import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
  userLogin,
  userRegister,
} from "../controller/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRouter = Router();

// Create User
userRouter.post("/", createUser);

// new users register
userRouter.post("/register", userRegister);

// login for existing users
userRouter.post("/login", userLogin);

// get all users data
userRouter.get("/", userAuth, getAllUser);

// get One users data
userRouter.get("/:id", userAuth, getOneUser);

// updata user data
userRouter.patch("/:id", userAuth, updateUser);

// delete user
userRouter.delete("/:id", userAuth, deleteUser);

export default userRouter;
