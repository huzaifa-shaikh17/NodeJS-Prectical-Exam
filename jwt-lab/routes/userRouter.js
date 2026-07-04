import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  updateUser,
  userLogin,
  userRegister,
} from "../controller/userController.js";

const userRouter = Router();

// new users register
userRouter.post("/", userRegister);

// login for existing users
userRouter.post("/login", userLogin);

// get all users data
userRouter.get("/", getAllUser);

// updata user data
userRouter.patch("/:id", updateUser);

// delete user
userRouter.delete("/:id", deleteUser);

export default userRouter;
