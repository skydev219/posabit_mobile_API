import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { Joi } from 'celebrate';
import middlewares from '../middlewares';
import BrandService from '@/services/brand.service';
import { ErrorResponse } from '@/errors/error';

const route = Router();

export default (app: Router) => {
  const logger: Logger = Container.get('logger');
  const brandService = Container.get(BrandService);

  app.use('/menu', route);

  route.get(
    '/:store_id/brand',
    middlewares.companyAuth,
    middlewares.companyStoreAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('List Brands endpoint');

      try {
        const brands = await brandService.list({ store_id: req.params.store_id });

        return res.status(200).json(brands);
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
    '/:store_id/brand/:id',
    middlewares.companyAuth,
    middlewares.companyStoreAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Get Brand endpoint');

      // Input Validation
      const querySchema = Joi.object({
        store_id: Joi.string().required(),
        id: Joi.string().required(),
      });
      const validation = querySchema.validate(req.params);

      try {
        if (validation.error) {
          throw new ErrorResponse(400, validation.error.message);
        }

        const brands = await brandService.get(req.params.id);

        return res.status(200).json(brands);
      } catch (e) {
        logger.error(e);

        if (e.code !== 500) {
          return res.status(e.code).json({ code: e.code, message: e.message });
        }

        return next(e);
      }
    },
  );
};
