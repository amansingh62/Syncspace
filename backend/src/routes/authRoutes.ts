import { Router } from "express";
import { login, register, logout, logoutAll, me } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validate/authSchema.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.post("/logout-all", requireAuth, logoutAll);
router.get("/me", requireAuth, me);

export default router;