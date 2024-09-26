import express from "express";
import {
  postTimeline,
  deleteTimeline,
  getallTimeline,
} from "../Controllers/timeline.controller.js";
import { isAuthenticatedUser } from "../Middlewares/auth.js";

const router = express.Router();

router.route("/add").post(isAuthenticatedUser, postTimeline);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteTimeline);
router.route("/getall").get(getallTimeline);

export default router;
