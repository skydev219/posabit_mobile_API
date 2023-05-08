import { Service, Inject } from 'typedi';
import { FilterQuery } from 'mongoose';
import { Logger } from 'winston';
import { IProduct } from '@/models/product.model';
import { ErrorResponse } from '@/errors/error';
import { ERRORS } from '@/enum/error.enum';
import { ISearchProductDto } from '@/dtos/product.dto';
import { SortType } from '@/enum/sort-type.enum';

@Service()
export default class ProductService {
  constructor(
    @Inject('productModel') private productModel: Models.ProductModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async get(query: FilterQuery<IProduct>): Promise<IProduct> {
    try {
      this.logger.debug('Product Service | Get Product');

      const productRecord = await this.productModel.findOne(query);

      if (!productRecord) {
        throw new ErrorResponse(404, ERRORS.NOT_FOUND);
      }

      return productRecord;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async search(search: ISearchProductDto): Promise<IProduct[]> {
    this.logger.debug('Product Service | Search products');

    const filters: any[] = [
      {
        text: {
          query: search.storeId,
          path: 'store_id',
        },
      },
    ];

    /**
     * Parse query inputs
     */
    const effects = search.effectId ? search.effectId.split(',') : [];
    const categories: string[] = [];
    const subCategories: string[] = [];

    search.categoryId &&
      search.categoryId.split(',').forEach(e => {
        const category = e.split('/')[0];
        const subCategory = e.split('/')[1];

        categories.push(category);
        subCategory && subCategories.push(subCategory);
      });

    /**
     * Parse query
     */
    const effectFilter =
      effects &&
      effects.map(ef => {
        return { text: { query: ef, path: 'effects.id' } };
      });

    if (effectFilter.length)
      filters.push({
        compound: {
          should: effectFilter,
          minimumShouldMatch: 1,
        },
      });

    const categoryFilter =
      categories &&
      categories.map(ctg => {
        return { text: { query: ctg, path: 'category.id' } };
      });

    if (categoryFilter.length)
      filters.push({
        compound: {
          should: categoryFilter,
          minimumShouldMatch: 1,
        },
      });

    const subCategoryFilter =
      subCategories &&
      subCategories.map(subCtg => {
        return { text: { query: subCtg, path: 'category.subcategory.id' } };
      });

    if (subCategoryFilter.length)
      filters.push({
        compound: {
          should: subCategoryFilter,
          minimumShouldMatch: 1,
        },
      });

    const compound: any = {
      filter: filters,
    };

    /**
     * Include search query if it's defined
     */
    if (search.query)
      compound.must = {
        text: {
          query: search.query,
          path: ['name', 'description', 'strain.name'],
        },
      };

    /**
     * Input query
     */
    const query = [
      {
        $search: {
          index: 'product-search',
          compound,
        },
      },
    ];

    try {
      const products = await this.productModel
        .aggregate(query)
        .limit(search.limit || 25)
        .skip(search.offset || 0)
        .sort(search.sort || SortType.popular);

      return products;
    } catch (error) {
      this.logger.error(error);

      throw error;
    }
  }
}
