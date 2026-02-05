import { Router } from "express";
import { login, register, refresh, logout, me, updateMe } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validate/authSchema.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh); 
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.patch("/users/me", requireAuth, updateMe);

export default router;