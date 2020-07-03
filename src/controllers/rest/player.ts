import { Request, Response } from "express";
import Room from "../../models/room";
import Player from "../../models/player";

export const createPlayer = async (req: Request, res: Response) => {
  const name = req.body?.name;
  const code = req.body?.code;
  const player = new Player({ name });
  player.save();

  const room = await Room.findOne({ code }).exec();
  room.players.push(player);
  room.save();

  res
    .status(201)
    .cookie("playerId", player.id)
    .cookie("room", code)
    .send({ playerId: player.id });
};
