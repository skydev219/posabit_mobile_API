import mongoose from 'mongoose';
import { ProductStatus } from '../enum/product-status.enum';
import { brandSchema, IBrand } from './brand.model';
import { categorySchema, ICategory } from './category.model';
import { effectSchema, IEffect } from './effect.model';
import { IPotency, potencySchema } from './potency.model';
import { IProductOption, productOptionSchema } from './productOption.model';
import { IStrain, strainSchema } from './strain.model';

export interface IProduct extends mongoose.Document {
  storeId: string;
  companyId: string;
  name: string;
  brand: IBrand;
  vendor: string;
  sku: string;
  category: ICategory;
  strain: IStrain;
  potency: IPotency;
  effects: [IEffect];
  description: string;
  thumbnail: string;
  images: string[];
  status: ProductStatus;
  options: [IProductOption];
  isActive: boolean;
}

const productSchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true },
    companyId: { type: String, required: true },
    name: { type: String, required: true, index: true },
    brand: brandSchema,
    vendor: { type: String },
    sku: { type: String, index: true },
    category: categorySchema,
    strain: strainSchema,
    potency: potencySchema,
    effects: [effectSchema],
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String, required: true }],
    status: { type: String },
    options: [productOptionSchema],
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    collection: 'product',
    toObject: {
      transform: (doc, data, options) => {
        const output = {
          storeId: data.store_id,
          companyId: data.company_id,
          name: data.name,
          brand: data.brand,
          vendor: data.vendor,
          sku: data.sku,
          category: data.category,
          strain: data.strain,
          potency: data.potency,
          effects: data.effects,
          description: data.description,
          thumbnail: data.thumbnail,
          images: data.images,
          status: data.status,
          options: data.options,
          isActive: data.is_active,
        };
        return output;
      },
    },
  },
);

productSchema.index({ '$**': 'text' });

const ProductModel = mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;
