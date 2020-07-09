import { Request, Response } from "express";
import Player from "../../models/player";

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const name = req.body?.name;
    const icon = req.body?.icon;
    const code = req.body?.code;
    const player = new Player({ name, icon });
    await player.save();

    res
      .status(201)
      .cookie("playerId", player.id)
      .cookie("room", code)
      .send({ playerId: player.id });
  } catch (error) {
    console.log("error");
  }
};
