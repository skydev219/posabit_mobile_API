import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import StoreService from '@/services/store.service';
import { ERRORS } from '@/enum/error.enum';

const companyStoreAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const logger: Logger = Container.get('logger');

  logger.debug('Company-Store Authentication Middelware');

  const store = res.locals.company.stores.find(s => s.id === req.params.store_id);

  if (store) {
    res.locals.store = store;
    return next();
  } else {
    return res.status(404).json({ code: 404, message: ERRORS.NOT_FOUND });
  }
};

export default companyStoreAuth;
