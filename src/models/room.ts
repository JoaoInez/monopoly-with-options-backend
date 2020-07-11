import { Schema, Document, model } from "mongoose";

export interface IRoom extends Document {
  code: string;
  players: string[];
  connected: string[];
  bank: string;
}

const roomSchema = new Schema({
  code: String,
  players: [String],
  connected: [String],
  bank: String,
});

export default model<IRoom>("Room", roomSchema);
