import { Server as SocketIOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!(res.socket as any).server.io) {
    console.log("Initializing Socket.IO server...");
    const io = new SocketIOServer((res.socket as any).server);
    (res.socket as any).server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");
      
      socket.on("draw", (data) => {
        socket.broadcast.emit("draw", data);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  res.end();
};

export default SocketHandler;
