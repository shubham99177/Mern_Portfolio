import express from "express";
import {
  addnewproject,
  deleteproject,
  updateproject,
  getsingleproject,
  getallproject,
} from "../Controllers/project.controller.js";
import { isAuthenticatedUser } from "../Middlewares/auth.js";

const router = express.Router();

router.route("/add").post(isAuthenticatedUser, addnewproject);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteproject);
router.route("/update/:id").put(isAuthenticatedUser, updateproject);
router.route("/get/:id").get(getsingleproject);
router.route("/getall").get(getallproject);

export default router;
