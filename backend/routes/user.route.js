import { Router } from "express";
import {
  logInWithGoogle,
  signInUser,
  signUpUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/google").post(logInWithGoogle);

export default router;
