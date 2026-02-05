import type { JwtPayload } from "jsonwebtoken";
export interface AccessTokenPayload extends JwtPayload {
    userId: string;
}
export interface RefreshTokenPayload {
    userId: string;
}
//# sourceMappingURL=jwt.d.ts.map