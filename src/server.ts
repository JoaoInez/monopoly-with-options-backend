import express, { Application } from "express";
import http from "http";
import socketIO, { Server } from "socket.io";
import cors from "cors";
import { createRoom, joinRoom } from "./controllers/room";
import withSockets from "./utils/withSockets";

const PORT = 3001;
const app: Application = express();
const server = http.createServer(app);
const io: Server = socketIO(server);

app.use(cors({ origin: "http://localhost:3000" }));
io.origins(["http://localhost:3000"]);

app.post("/room", createRoom);

io.on("connection", (socket) => {
  socket.on("join-room", withSockets(io, socket, joinRoom));
});

server.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
