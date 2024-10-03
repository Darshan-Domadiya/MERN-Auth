import { Router } from "express";
import { signInUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/signin").get(signInUser);

export default router;
