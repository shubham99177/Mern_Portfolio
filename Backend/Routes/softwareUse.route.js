import express from "express";
import {
  addnewuseapplication,
  deleteuseapplication,
  getalluseapplication,
} from "../Controllers/softwareuse.controller.js";
import { isAuthenticatedUser } from "../Middlewares/auth.js";

const router = express.Router();

router.route("/add").post(isAuthenticatedUser, addnewuseapplication);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteuseapplication);
router.route("/getall").get(getalluseapplication);

export default router;
