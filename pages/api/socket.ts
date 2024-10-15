import { Server as SocketIOServer } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

interface SocketServer extends HTTPServer {
  io?: SocketIOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new SocketIOServer(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('A user connected', socket.id);

      socket.on('draw', (data) => {
        console.log('Received draw event from', socket.id, data);
        socket.broadcast.emit('draw', data);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
      });
    });
  }
  res.end();
};

export default SocketHandler;
