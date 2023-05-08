import mongoose from 'mongoose';

export interface IProductOption extends mongoose.Document {
  name: string;
  weight: string;
  price: number;
  salePrice: number;
  image: string;
  inStock: boolean;
  isActive: boolean;
}

export const productOptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    weight: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    image: { type: String },
    inStock: { type: Boolean, required: true },
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, data, options) => {
        const output = {
          id: data.id,
          name: data.name,
          weight: data.weight,
          price: data.price,
          salePrice: data.sale_price,
          image: data.image,
          inStock: data.in_stock,
          isActive: data.is_active,
        };
        return output;
      },
    },
  },
);

const ProductOptionModel = mongoose.model<IProductOption>('ProductOption', productOptionSchema);

export default ProductOptionModel;
