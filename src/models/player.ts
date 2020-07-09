import { Schema, Document, model } from "mongoose";
import { Icon } from "../types";

export interface IPlayer extends Document {
  name: string;
  money: number;
  banker: boolean;
  icon: Icon;
}

export const playerSchema = new Schema({
  name: String,
  money: { type: Number, default: 800 },
  banker: { type: Boolean, default: false },
  icon: String,
});

export default model<IPlayer>("Player", playerSchema);
