import { Socket } from "socket.io";
import  cookie  from "cookie";
import { verifyAccessToken } from "../utilities/token.js";

type SocketNext = (err?: Error) => void;

export const socketAuth = (socket: Socket, next: SocketNext) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie ?? "");
    const token = cookies.accessToken;

    if(!token) return next(new Error("Unauthorized"));

    try {
        const payload = verifyAccessToken(token);
        socket.data.userId = payload.userId;
        next();
    } catch {
        next(new Error("Invalid Token"));
    }
};