import { Schema, Document, model } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  money: number;
  banker: boolean;
}

export const playerSchema = new Schema({
  name: String,
  money: { type: Number, default: 800 },
  banker: { type: Boolean, default: false },
});

export default model<IPlayer>("Player", playerSchema);
