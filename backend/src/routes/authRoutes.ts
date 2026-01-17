import { Router } from "express";
import { login, register, logout } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validate/authSchema.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

export default router;