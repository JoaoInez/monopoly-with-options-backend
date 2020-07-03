import { Schema, Document, model } from "mongoose";
import { playerSchema, IPlayer } from "./player";

export interface IRoom extends Document {
  code: string;
  players: IPlayer[];
}

const roomSchema = new Schema({
  code: String,
  players: [playerSchema],
});

export default model<IRoom>("Room", roomSchema);
