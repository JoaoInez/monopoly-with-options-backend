import { Schema, Document, model } from "mongoose";
import { Icon } from "../types";

export interface IPlayer extends Document {
  icon: Icon;
  name: string;
  money: number;
  savings: number;
  loan: number;
  installment: number;
  socketId: string;
}

export const playerSchema = new Schema({
  icon: String,
  name: String,
  money: { type: Number, default: 800 },
  savings: { type: Number, default: 0 },
  loan: { type: Number, default: 0 },
  installment: { type: Number, default: 0 },
  socketId: String,
});

export default model<IPlayer>("Player", playerSchema);
