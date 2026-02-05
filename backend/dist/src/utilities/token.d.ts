import type { AccessTokenPayload, RefreshTokenPayload } from "../types/jwt.js";
export declare const signAccessToken: (userId: string) => string;
export declare const signRefreshToken: (userId: string) => string;
export declare const verifyAccessToken: (token: string) => AccessTokenPayload;
export declare const verifyRefreshToken: (token: string) => RefreshTokenPayload;
//# sourceMappingURL=token.d.ts.map