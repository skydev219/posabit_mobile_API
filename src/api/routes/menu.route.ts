import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import MenuService from '@/services/menu.service';

const route = Router();

export default (app: Router) => {
  const logger: Logger = Container.get('logger');
  const menuService = Container.get(MenuService);

  app.use('/menu', route);

  route.get(
    '/:store_id',
    middlewares.companyAuth,
    middlewares.companyStoreAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Get Store Menu endpoint');

      try {
        const menu = await menuService.get(req.params.store_id);

        return res.status(200).json(menu);
      } catch (error) {
        logger.error(error);

        return next(error);
      }
    },
  );
};
