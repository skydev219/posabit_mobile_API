import mongoose from 'mongoose';

export interface IWeight extends mongoose.Document {
  name: string;
  grams: number;
}

const weightSchema = new mongoose.Schema(
  {
    name: { type: String },
    grams: { type: Number },
  },
  {
    timestamps: true,
  },
);

const WeightModel = mongoose.model<IWeight>('Weight', weightSchema);

export default WeightModel;
