import { PaginationResult } from 'src/shared/interface/pagination-result.interface';
import { Url } from '../domain/url.entity';
import { GetUrlsQueryParams } from '../use-cases/get-urls/get-urls-query.params';

export type FindByUniqueUrlModel = { id: string } | { short: string };

export enum FindWithDeleted {
  False,
  True,
}

export type VerifyIfExistsParams = {
  original: string;
  userId?: string;
};

export type FindUrlsParams = GetUrlsQueryParams;

export interface IUrlRepository {
  save(url: Url): Promise<Url>;
  findAll(params: FindUrlsParams): Promise<PaginationResult<Url>>;
  findBy(params: FindByUniqueUrlModel): Promise<Url | null>;
  findByOrThrow(
    params: FindByUniqueUrlModel,
    flag?: FindWithDeleted,
  ): Promise<Url>;
  verifyIfExists(
    params: VerifyIfExistsParams,
    flag?: FindWithDeleted,
  ): Promise<Url | null>;
  update(url: Url): Promise<Url>;
}
