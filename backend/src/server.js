import app from "./app.js";
import { connectDB } from "./config/db.js";
import http from "http";
import { initNewsSocket } from "./socket/newsSocket.js";
import { initCommentSocket } from "./socket/commentSocket.js";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

initNewsSocket(server);
initCommentSocket(server);

server.requestTimeout = 300000; // 30 seconds
server.headersTimeout = 310000; // 31 seconds
server.keepAliveTimeout = 65000; // 61 seconds

connectDB()
  .catch(err => {
    console.log('DB connect fail:', err);
  })
  .finally(() => {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Accessible externally via Nginx proxy (port 80/443)`);
    });
  });