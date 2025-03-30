import { Url } from '../domain/url.entity';

export interface IUrlRepository {
  save(url: Url): Promise<Url>;
}
