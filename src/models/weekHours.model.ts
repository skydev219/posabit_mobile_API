import mongoose from 'mongoose';

export interface IWeekHours extends mongoose.Document {
  monday: mongoose.Types.ObjectId;
  tuesday: mongoose.Types.ObjectId;
  wednsday: mongoose.Types.ObjectId;
  thursday: mongoose.Types.ObjectId;
  friday: mongoose.Types.ObjectId;
  saturday: mongoose.Types.ObjectId;
  sunday: mongoose.Types.ObjectId;
}

const weekHoursSchema = new mongoose.Schema(
  {
    monday: { type: mongoose.Schema.Types.ObjectId, ref: 'DayHours' },
    tuesday: { type: mongoose.Schema.Types.ObjectId, ref: 'DayHours' },
    wednsday: { type: mongoose.Schema.Types.ObjectId, ref: 'DayHours' },
    thursday: { type: mongoose.Schema.Types.ObjectId, ref: 'DayHours' },
    friday: { type: mongoose.Schema.Types.ObjectId, ref: 'DayHours' },
    saturday: { type: mongoose.Schema.Types.ObjectId, ref: 'DayHours' },
    sunday: { type: mongoose.Schema.Types.ObjectId, ref: 'DayHours' },
  },
  {
    timestamps: true,
  },
);

const WeekHoursModel = mongoose.model<IWeekHours>('WeekHours', weekHoursSchema);

export default WeekHoursModel;
