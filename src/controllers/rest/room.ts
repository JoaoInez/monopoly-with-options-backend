import { Request, Response } from "express";
import Room from "../../models/room";
import Player from "../../models/player";
import { mapAsync, genCode } from "../../utils";
import { Icon } from "../../types";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const code = genCode();
    const room = new Room({ code });
    await room.save();
    res.send({ code });
  } catch (error) {
    console.log("error");
  }
};

export const checkRoom = async (req: Request, res: Response) => {
  try {
    const code = req.params?.code;
    const room = await Room.findOne({ code }).exec();

    room && room.players.length <= 8
      ? res.status(201).send()
      : res.status(404).send();
  } catch (error) {
    console.log("error");
  }
};

export const getAvailableIcons = async (req: Request, res: Response) => {
  try {
    const code = req.params?.code;
    const room = await Room.findOne({ code }).exec();
    const icons: Icon[] = [
      "hat",
      "ship",
      "horse",
      "car",
      "shoe",
      "cannon",
      "cart",
      "dog",
    ];

    const playersIcons = await mapAsync<Icon>(room.players)(async (id) => {
      try {
        const { icon } = await Player.findById(id);
        return icon;
      } catch (error) {
        console.log("error");
      }
    });

    const availableIcons = icons.filter((icon) => !playersIcons.includes(icon));

    res.send({ availableIcons });
  } catch (error) {
    console.log("error");
  }
};
