import { Socket } from "socket.io";
import cookie from "cookie";
import { verifyAccessToken } from "../utilities/token.js";
export const socketAuth = (socket, next) => {
    console.log("SOCKET COOKIES:", socket.handshake.headers.cookie);
    const cookies = cookie.parse(socket.handshake.headers.cookie ?? "");
    const token = cookies.accessToken;
    if (!token)
        return next(new Error("Unauthorized"));
    try {
        const payload = verifyAccessToken(token);
        socket.data.userId = payload.userId;
        socket.data.userName = payload.name;
        next();
    }
    catch {
        next(new Error("Invalid Token"));
    }
};
//# sourceMappingURL=socketAuthMiddleware.js.map