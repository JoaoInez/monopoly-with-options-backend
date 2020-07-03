import express, { Application } from "express";
import http from "http";
import socketIO, { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { createRoom, checkRoom } from "./controllers/rest";
import { createPlayer } from "./controllers/rest/player";
import { joinRoom } from "./controllers/sockets";
import withSockets from "./utils/withSockets";

const PORT = 3001;
const DB_USER = "mwoAdmin";
const DB_PASSWORD = "uyfT6XfNgG9AHDJ3";
const DB_NAME = "dev";

const app: Application = express();
const server = http.createServer(app);
const io: Server = socketIO(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
io.origins(["http://localhost:3000"]);
app.use(cookieParser());

app.post("/room", createRoom);
app.get("/room/:code", checkRoom);
app.post("/player", createPlayer);

io.on("connection", (socket) => {
  socket.on("join-room", withSockets(io, socket, joinRoom));
  socket.on("disconnect", () => {}); //TODO
});

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@mwo.zhgn9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

server.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
