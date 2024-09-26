import express from "express";
import {
  addnewskill,
  deleteskill,
  getallskill,
} from "../Controllers/skill.controller.js";
import { isAuthenticatedUser } from "../Middlewares/auth.js";

const router = express.Router();

router.route("/add").post(isAuthenticatedUser, addnewskill);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteskill);
router.route("/getall").get(getallskill);

export default router;
