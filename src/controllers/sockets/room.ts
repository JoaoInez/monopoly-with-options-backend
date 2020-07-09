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

    const player: TPlayer = await Player.findById(
      playerId,
      "name icon banker money -_id"
    ).exec();

    const otherPlayers = await mapAsync<OtherPlayer>(
      room.connected.filter((id) => id !== playerId)
    )(async (_playerId) => {
      try {
        const { id, name, banker, icon } = await Player.findById(_playerId);
        return { id, name, banker, icon };
      } catch (error) {
        console.log("error");
      }
    });

    if (!room.players.includes(playerId)) room.players.push(playerId);
    room.connected.push(playerId);

    await room.save();

    socket.join(code);
    io.to(socket.id).emit("game", player, otherPlayers);
    socket.broadcast.to(code).emit("player-join", {
      id: playerId,
      name: player.name,
      banker: player.banker,
    });
  } catch (error) {
    console.log("error");
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
    console.log("error");
  }
};
