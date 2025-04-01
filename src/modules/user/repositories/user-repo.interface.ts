import { Url } from 'src/modules/url/domain/url.entity';
import { User } from '../domain/user.entity';
import { GetUrlsByUserQueryParams } from '../use-cases/get-urls-by-user/get-urls-by-user-query.params';
import { PaginationResult } from 'src/shared/interface/pagination-result.interface';

export type FindByUniqueUrlModel = { id: string } | { email: string };
export type FindUrlsParams = GetUrlsByUserQueryParams & {
  id: string;
};

export interface IUserRepository {
  save(user: User): Promise<User>;
  findBy(params: FindByUniqueUrlModel): Promise<User | null>;
  findByOrThrow(params: FindByUniqueUrlModel): Promise<User>;
  findUrls(params: FindUrlsParams): Promise<PaginationResult<Url>>;
}
