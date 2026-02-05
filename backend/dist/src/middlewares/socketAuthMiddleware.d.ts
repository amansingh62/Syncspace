import { Socket } from "socket.io";
type SocketNext = (err?: Error) => void;
export declare const socketAuth: (socket: Socket, next: SocketNext) => void;
export {};
//# sourceMappingURL=socketAuthMiddleware.d.ts.map