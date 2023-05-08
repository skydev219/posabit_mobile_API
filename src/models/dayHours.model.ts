import mongoose from 'mongoose';

export interface IDayHours extends mongoose.Document {
  open_at: number;
  closes_at: number;
}

const dayHoursSchema = new mongoose.Schema(
  {
    open_at: { type: Number, required: true },
    closes_at: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const DayHoursModel = mongoose.model<IDayHours>('DayHours', dayHoursSchema);

export default DayHoursModel;
