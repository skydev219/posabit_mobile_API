import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { Joi } from 'celebrate';
import JoiObjectId from 'joi-objectid';
import mongoose from 'mongoose';
import middlewares from '../middlewares';
import ProductService from '@/services/product.service';
import { ISearchProductDto } from '@/dtos/product.dto';
import { ErrorResponse } from '@/errors/error';

const route = Router();
const joiObjectId = JoiObjectId(Joi);

export default (app: Router) => {
  const logger: Logger = Container.get('logger');
  const productService = Container.get(ProductService);

  app.use('/menu', route);

  route.get(
    '/:store_id/product',
    middlewares.companyAuth,
    middlewares.companyStoreAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Get Product endpoint');

      const querySchema = Joi.object({
        id: joiObjectId(),
        sku: Joi.string(),
      }).xor('id', 'sku');
      const validation = querySchema.validate(req.query);

      // Add companyId & storeId to the query
      req.query.company_id = res.locals.company.id;
      req.query.store_id = res.locals.store.id;

      try {
        if (validation.error) {
          throw new ErrorResponse(400, validation.error.message);
        }

        const productService = Container.get(ProductService);
        const product = await productService.get({
          _id: req.query.id ? mongoose.Types.ObjectId(String(req.query.id)) : undefined,
          sku: req.query.sku ? String(req.query.sku) : undefined,
        });

        return res.status(200).json(product);
      } catch (e) {
        logger.error(e);

        if (e.code !== 500) {
          return res.status(e.code).json({ code: e.code, message: e.message });
        }

        return next(e);
      }
    },
  );

  route.get(
    '/:store_id/search',
    middlewares.companyAuth,
    middlewares.companyStoreAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Search Product endpoint');

      const querySchema = Joi.object({
        categoryId: Joi.string(),
        effectId: Joi.string(),
        limit: Joi.number().min(0),
        offset: Joi.number(),
        sort: Joi.string(),
        query: Joi.any(),
      });
      const validation = querySchema.validate(req.query);

      // Add companyId & storeId to the query
      req.query.companyId = res.locals.company.id;
      req.query.storeId = res.locals.store.id;

      try {
        if (validation.error) {
          throw new ErrorResponse(400, validation.error.message);
        }

        const products = await productService.search((req.query as unknown) as ISearchProductDto);

        return res.status(200).json(products);
      } catch (error) {
        logger.error(error);

        return next(error);
      }
    },
  );
};
