import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);

export default router;
