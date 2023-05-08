import { Model } from 'mongoose';
import { ICompany } from '@/models/company.model';
import { IProduct } from '@/models/product.model';
import { IStore } from '@/models/store.model';
import { IBrand } from '@/models/brand.model';

declare global {
  namespace Express {
    export interface Request {
      currentCompany: ICompany;
    }
  }
  namespace Models {
    export type CompanyModel = Model<ICompany>;
    export type StoreModel = Model<IStore>;
    export type ProductModel = Model<IProduct>;
    export type BrandModel = Model<IBrand>;
  }
}
