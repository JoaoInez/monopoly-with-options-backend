import { Schema, Document, model } from "mongoose";

export interface IBank extends Document {
  savingsRate: number;
  interestRate: number;
}

const bankSchema = new Schema({
  savingsRate: Number,
  interestRate: Number,
});

export default model<IBank>("Bank", bankSchema);
