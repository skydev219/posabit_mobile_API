import mongoose from 'mongoose';

export interface IBrand extends mongoose.Document {
  _id: string;
  name: string;
  logoUrl: string;
}

export const brandSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    logoUrl: { type: String },
  },
  {
    timestamps: true,
    collection: 'brand',
    toObject: {
      transform: (doc, data, options) => {
        const output = {
          id: data.id,
          name: data.name,
          logoUrl: data.logo_url,
        };
        return output;
      },
    },
  },
);

const BrandModel = mongoose.model<IBrand>('Brand', brandSchema);

export default BrandModel;
