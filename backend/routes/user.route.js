import { Router } from "express";
import {
  deleteUser,
  logInWithGoogle,
  signInUser,
  signOutUser,
  signUpUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/token.js";

const router = Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/google").post(logInWithGoogle);
router.route("/update/:id").post(verifyToken, updateUser);
router.route("/delete/:id").post(verifyToken, deleteUser);
router.route("/signout").get(signOutUser);

export default router;
