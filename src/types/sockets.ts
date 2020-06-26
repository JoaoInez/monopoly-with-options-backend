import { Server, Socket } from "socket.io";

export type SocketObject = {
  io: Server;
  socket: Socket;
};

export type WithSocketsFunction = (
  socketObject: SocketObject,
  params: any
) => void;
