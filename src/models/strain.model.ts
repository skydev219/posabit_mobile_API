import mongoose from 'mongoose';
import { StrainType } from '../enum/strain-type.enum';

export interface IStrain extends mongoose.Document {
  id: string;
  name: string;
  strainType: StrainType;
}

export const strainSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String },
    strainType: { type: String },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, data, options) => {
        const output = {
          id: data.id,
          name: data.name,
          strainType: data.strain_type,
        };
        return output;
      },
    },
  },
);

const StrainModel = mongoose.model<IStrain>('Strain', strainSchema);

export default StrainModel;
