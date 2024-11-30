import express from "express";
import {
  addnewskill,
  deleteskill,
  getallskill,
  updateSkill,
} from "../Controllers/skill.controller.js";
import { isAuthenticatedUser } from "../Middlewares/auth.js";

const router = express.Router();

router.route("/add").post(isAuthenticatedUser, addnewskill);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteskill);
router.route("/getall").get(getallskill);
router.put("/update/:id", isAuthenticatedUser, updateSkill);

export default router;
