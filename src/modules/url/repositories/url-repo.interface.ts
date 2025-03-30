import { Url } from '../domain/url.entity';

export type FindByUniqueUrlModel = { id: string } | { short: string };
export interface IUrlRepository {
  save(url: Url): Promise<Url>;
  findBy(params: FindByUniqueUrlModel): Promise<Url>;
}
