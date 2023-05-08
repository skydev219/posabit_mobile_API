import mongoose from 'mongoose';
import { IAddress } from './address.model';
import { IDayHours } from './dayHours.model';

export interface IStore extends mongoose.Document {
  id: string;
  name: string;
  websiteUrl: string;
  phone: string;
  email: string;
  hours: IDayHours;
  address: IAddress;
}

export const storeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    websiteUrl: { type: String },
    hours: { type: mongoose.Schema.Types.ObjectId, ref: 'WeekHours' },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, data, options) => {
        const output = {
          id: data.id,
          name: data.name,
          websiteUrl: data.website_url,
          phone: data.phone,
          email: data.email,
          hours: data.hours,
          address: data.address,
        };
        return output;
      },
    },
  },
);

const StoreModel = mongoose.model<IStore>('Store', storeSchema);

export default StoreModel;
