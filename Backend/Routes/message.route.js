import express from "express";
import {
  getMessages,
  sendMessage,
  deleteMessage,
} from "../Controllers/message.controller.js";
import { isAuthenticatedUser } from "../Middlewares/auth.js"; // Assuming you have an auth middleware

const router = express.Router();

// Define routes
router.route("/send").post(sendMessage);
router.route("/getall").get(getMessages);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteMessage);
export default router;
