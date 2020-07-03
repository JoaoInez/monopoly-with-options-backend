import { SocketObject } from "../../types";
import Room from "../../models/room";
import Player from "../../models/player";

export const joinRoom = async (
  { io, socket }: SocketObject,
  { code, playerId }: { code: string; playerId: string }
) => {
  const room = await Room.findOne({ code }).exec();
  // const otherPlayers = room.players.map(({ name, banker }) => ({
  //   name,
  //   banker,
  // }));

  type Player = {
    name?: string;
    money?: number;
    banker?: boolean;
  };

  type OtherPlayer = {
    id?: string;
    name?: string;
    banker?: boolean;
  };

  const [player, otherPlayers]: [Player, OtherPlayer[]] = room.players.reduce(
    ([player, otherPlayers], { id, name, banker, money }) =>
      id === playerId
        ? [{ name, money, banker }, otherPlayers]
        : [player, [...otherPlayers, { id, name, banker }]],
    [{}, []]
  );

  socket.join(code);
  io.to(socket.id).emit("game", player, otherPlayers);
  socket.broadcast.to(code).emit("player-join", {
    id: playerId,
    name: player.name,
    banker: player.banker,
  });
};
