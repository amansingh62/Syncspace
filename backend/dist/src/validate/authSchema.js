import { z } from "zod";
const email = z
    .string()
    .email("Invalid email format")
    .toLowerCase();
const password = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number");
export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name is too short"),
        email,
        password
    }),
});
export const loginSchema = z.object({
    body: z.object({
        email,
        password: z.string().min(1, "Password is required")
    }),
});
//# sourceMappingURL=authSchema.js.map