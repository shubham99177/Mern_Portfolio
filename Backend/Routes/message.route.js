import express from "express";
import { getMessages, sendMessage } from "../Controllers/message.controller.js";


const router = express.Router();

router.route("/send").post(sendMessage);
router.route("/getall").get(getMessages);

export default router;