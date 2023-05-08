import { Service, Inject } from 'typedi';
import { FilterQuery } from 'mongoose';
import { Logger } from 'winston';
import { ICompany } from '@/models/company.model';
import { ErrorResponse } from '@/errors/error';
import { ERRORS } from '@/enum/error.enum';

@Service()
export default class CompanyService {
  constructor(
    @Inject('companyModel') private companyModel: Models.CompanyModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async get(query: FilterQuery<ICompany>): Promise<ICompany> {
    this.logger.debug('Company Service');

    try {
      const companyRecord = await this.companyModel.findOne(query).populate('stores');

      if (!companyRecord) {
        throw new ErrorResponse(404, ERRORS.NOT_FOUND);
      }

      return companyRecord.toObject<ICompany>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
