import Room from "../../models/room";
import Player from "../../models/player";
import { getCookies, mapAsync } from "../../utils";
import { SocketObject, Player as TPlayer, OtherPlayer } from "../../types";

export const joinRoom = async (
  { io, socket }: SocketObject,
  { code, playerId }: { code: string; playerId: string }
) => {
  try {
    const room = await Room.findOne({ code }).exec();

    const player = await Player.findById(playerId).exec();

    player.socketId = socket.id;

    await player.save();

    const otherPlayers = await mapAsync<OtherPlayer>(
      room.connected.filter((id) => id !== playerId)
    )(async (_playerId) => {
      try {
        const { id, name, icon } = await Player.findById(_playerId);
        return { id, name, icon };
      } catch (error) {
        console.log("joinRoom find other players error");
      }
    });

    if (!room.players.includes(playerId)) room.players.push(playerId);
    room.connected.push(playerId);

    await room.save();

    socket.join(code);
    io.to(socket.id).emit(
      "game",
      { icon: player.icon, name: player.name, money: player.money },
      otherPlayers
    );
    socket.broadcast.to(code).emit("player-join", {
      id: playerId,
      name: player.name,
      icon: player.icon,
    });
  } catch (error) {
    console.log("joinRoom error");
  }
};

export const leaveRoom = async ({ io, socket }: SocketObject) => {
  try {
    const code = getCookies(socket.request.headers.cookie)("room");
    const playerId = getCookies(socket.request.headers.cookie)("playerId");

    const room = await Room.findOne({ code }).exec();
    room.connected = room.connected.filter((id) => id !== playerId);
    await room.save();
    socket.broadcast.to(code).emit("player-leave", playerId);
  } catch (error) {
    console.log("leaveRoom error");
  }
};
