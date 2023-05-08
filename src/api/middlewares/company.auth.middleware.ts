import { Container } from 'typedi';
import { Logger } from 'winston';
import CompanyService from '@/services/company.service';
import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '@/enum/error.enum';

const companyAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const logger: Logger = Container.get('logger');

  logger.debug('Company Authentication Middelware');

  const companyService = Container.get(CompanyService);
  const api_key = req.headers.authorization;

  try {
    const company = await companyService.get({ api_key });

    res.locals.company = company;

    return next();
  } catch (e) {
    logger.error(e);

    if (e.code === 404) {
      return res.status(401).json({ code: 401, message: ERRORS.UNAUTHORIZED });
    }

    return next(e);
  }
};

export default companyAuth;
