import app from "./app.js";
import { env } from "./config/env.js";
import http from "http";
import { initSocket } from "./socket/index.js";
const server = http.createServer(app);
initSocket(server);
server.listen(env.port, () => {
    console.log(`HTTP + Socket.IO running on port ${env.port}`);
});
//# sourceMappingURL=server.js.map