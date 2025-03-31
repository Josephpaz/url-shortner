import { Url } from '../domain/url.entity';

export type FindByUniqueUrlModel = { id: string } | { short: string };

export type VerifyIfExistsParams = {
  original: string;
  userId?: string;
};

export interface IUrlRepository {
  save(url: Url): Promise<Url>;
  findBy(params: FindByUniqueUrlModel): Promise<Url | null>;
  findByOrThrow(params: FindByUniqueUrlModel): Promise<Url>;
  verifyIfExists(params: VerifyIfExistsParams): Promise<Url | null>;
  update(url: Url): Promise<Url>;
}
