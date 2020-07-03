import { Request, Response } from "express";
import Room from "../../models/room";
import genCode from "../../utils/genCode";

export const createRoom = (req: Request, res: Response) => {
  const code = genCode();
  const room = new Room({ code });
  room.save();
  res.send({ code });
};

export const checkRoom = async (req: Request, res: Response) => {
  const code = req.params?.code;
  const room = await Room.findOne({ code }).exec();
  room ? res.status(201).send() : res.status(404).send();
};
