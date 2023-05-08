import mongoose from 'mongoose';

export interface IPotency extends mongoose.Document {
  thc: number;
  thca: number;
  cbd: number;
  cbda: number;
}

export const potencySchema = new mongoose.Schema(
  {
    thc: { type: Number },
    thca: { type: Number },
    cbd: { type: Number },
    cbda: { type: Number },
  },
  {
    timestamps: true,
  },
);

const PotencyModel = mongoose.model<IPotency>('Potency', potencySchema);

export default PotencyModel;
