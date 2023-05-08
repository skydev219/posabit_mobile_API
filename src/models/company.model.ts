import mongoose from 'mongoose';
import StoreModel, { IStore, storeSchema } from './store.model';

export interface ICompany extends mongoose.Document {
  id: string;
  name: string;
  apiKey: string;
  stores: [IStore];
}

const companySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    apiKey: { type: String, required: true },
    stores: [storeSchema],
  },
  {
    timestamps: true,
    collection: 'company',
    toObject: {
      transform: (doc, data, options) => {
        const output = {
          id: data.id,
          name: data.name,
          apiKey: data.api_key,
          stores: data.stores,
        };
        return output;
      },
    },
  },
);

const CompanyModel = mongoose.model<ICompany>('Company', companySchema);

export default CompanyModel;
