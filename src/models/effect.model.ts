import mongoose from 'mongoose';

export interface IEffect extends mongoose.Document {
  id: string;
  name: string;
}

export const effectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const EffectModel = mongoose.model<IEffect>('Effect', effectSchema);

export default EffectModel;
