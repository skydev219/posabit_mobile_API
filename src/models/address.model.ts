import mongoose from 'mongoose';

export interface IAddress extends mongoose.Document {
  lat: number;
  lng: number;
  city: string;
  country: string;
  state: string;
  zipcode: string;
  street: string;
}

const addressSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String },
    state: { type: String },
    zipcode: { type: String },
    street: { type: String },
  },
  {
    timestamps: true,
  },
);

const AddressModel = mongoose.model<IAddress>('Address', addressSchema);

export default AddressModel;
