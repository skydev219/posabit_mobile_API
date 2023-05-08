import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import CompanyService from '@/services/company.service';
import { ERRORS } from '@/enum/error.enum';
import { ErrorResponse } from '@/errors/error';

const route = Router();

export default (app: Router) => {
  app.use('/company', route);

  route.get(
    '',
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const logger: Logger = Container.get('logger');
      logger.debug('Get Company endpoint');

      const api_key = req.headers.authorization;
      const companyService = Container.get(CompanyService);

      try {
        if (!api_key) {
          throw new ErrorResponse(401, ERRORS.UNAUTHORIZED);
        }

        const company = await companyService.get({ api_key });

        return res.status(200).json(company);
      } catch (e) {
        logger.error(e);

        if (e.code !== 500) {
          return res.status(401).json({ code: 401, message: ERRORS.UNAUTHORIZED });
        }

        return next(e);
      }
    },
  );
};
