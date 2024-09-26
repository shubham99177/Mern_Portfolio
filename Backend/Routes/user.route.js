import express from "express";
import {
  forgetpassword,
  getUserDetails,
  getuserportfolio,
  login,
  logout,
  registerUser,
  resetpassword,
  updatepassword,
  updateprofile,
} from "../Controllers/user.controller.js";
import { isAuthenticatedUser } from "../Middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticatedUser, logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/update/me").put(isAuthenticatedUser, updateprofile);
router.route("/update/password").put(isAuthenticatedUser, updatepassword);
router.route("/portfolio").get(getuserportfolio);
router.route("/forgetpassword").post(forgetpassword);
router.route("/password/reset/:token").post(resetpassword);

export default router;
