import { Service, Inject } from 'typedi';
import { Logger } from 'winston';
import { IMenu } from '@/models/menu.model';
import { IWeight } from '@/models/weight.model';
import { distinctByKey } from '@/helpers/transformer.helper';
import _, { flatten } from 'lodash';

@Service()
export default class MenuService {
  constructor(
    @Inject('productModel') private productModel: Models.ProductModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async get(storeId: string): Promise<any> {
    this.logger.debug('Menu Service | Get Store Menu');

    try {
      const products = await this.productModel.aggregate([
        {
          $match: { store_id: storeId },
        },
        { $project: { _id: 0, effects: 1, category: 1, options: 1 } },
      ]);
      const effects = _.sortBy(distinctByKey(flatten(products.map(p => p.effects)), 'id'), 'name');
      const categories = distinctByKey(
        products.map(p => p.category),
        'id',
      );
      const weights = _.sortBy(
        distinctByKey(
          flatten(products.map(p => p.options)).map(o => o.weight),
          'id',
        ),
        'grams',
      );

      return {
        effects,
        categories,
        weights,
      };
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
