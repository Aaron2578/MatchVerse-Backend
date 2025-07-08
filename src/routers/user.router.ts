import { Router } from "express";
import { createUser, getAllUsers, loginUser } from "@/controllers";

const router = Router();

router.route("/").post(createUser).get(getAllUsers);

router.route("/login").post(loginUser);

export default router;
