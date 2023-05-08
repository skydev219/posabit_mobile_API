import { SortType } from '@/enum/sort-type.enum';

export interface ISearchProductDto {
  companyId: string;
  storeId: string;
  categoryId: string;
  effectId: string;
  limit: number;
  offset: number;
  sort: SortType;
  query: string;
}
