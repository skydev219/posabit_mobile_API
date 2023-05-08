import mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
  id: string;
  name: string;
  image: string;
  subCategories: mongoose.Types.ObjectId[];
}

export const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, data, options) => {
        const output = {
          id: data.id,
          name: data.name,
          subCategories: data.subcategories,
        };
        return output;
      },
    },
  },
);

const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);

export default CategoryModel;
