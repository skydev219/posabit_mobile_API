import { Service, Inject } from 'typedi';
import { FilterQuery } from 'mongoose';
import { Logger } from 'winston';
import { IStore } from '@/models/store.model';
import { ErrorResponse } from '@/errors/error';
import { ERRORS } from '@/enum/error.enum';

@Service()
export default class StoreService {
  constructor(
    @Inject('storeModel') private storeModel: Models.StoreModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async get(query: FilterQuery<IStore>): Promise<IStore> {
    this.logger.debug('Store Service');

    try {
      const storeRecord = await this.storeModel.findOne(query);

      if (!storeRecord) {
        throw new ErrorResponse(404, ERRORS.NOT_FOUND);
      }

      return storeRecord.toObject<IStore>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
