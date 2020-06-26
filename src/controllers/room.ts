import { SocketObject } from "../types";
import { Request, Response } from "express";

export const createRoom = (req: Request, res: Response): void => {
  res.send("Hello World!");
};

export const joinRoom = (
  { io, socket }: SocketObject,
  { name, room }: { name: string; room: string }
): void => {
  socket.join(room);
  io.to(room).emit("receive-message", `Welcome ${name}!`);
};
