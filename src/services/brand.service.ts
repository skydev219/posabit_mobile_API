import { Service, Inject } from 'typedi';
import { Logger } from 'winston';
import mongoose, { FilterQuery } from 'mongoose';
import { IBrand } from '@/models/brand.model';
import { ErrorResponse } from '@/errors/error';
import { ERRORS } from '@/enum/error.enum';

@Service()
export default class BrandService {
  constructor(@Inject('brandModel') private brandModel: Models.BrandModel, @Inject('logger') private logger: Logger) {}

  public async list(query: FilterQuery<IBrand>): Promise<IBrand[]> {
    try {
      this.logger.debug('Brand Service | List Brand');

      const brands = await this.brandModel.find(query).sort('name');

      return brands;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async get(id: string): Promise<IBrand> {
    try {
      this.logger.debug('Brand Service | Get Brand');

      const brand = await this.brandModel.findOne({ _id: id });

      if (!brand) {
        throw new ErrorResponse(404, ERRORS.NOT_FOUND);
      }

      return brand;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
