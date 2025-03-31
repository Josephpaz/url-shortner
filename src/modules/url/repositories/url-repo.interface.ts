import { Url } from '../domain/url.entity';

export type FindByUniqueUrlModel = { id: string } | { short: string };

export enum FindWithDeleted {
  False,
  True,
}

export type VerifyIfExistsParams = {
  original: string;
  userId?: string;
};

export interface IUrlRepository {
  save(url: Url): Promise<Url>;
  findAll(): Promise<Url[]>;
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
