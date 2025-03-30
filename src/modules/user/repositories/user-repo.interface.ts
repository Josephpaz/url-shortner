import { Url } from 'src/modules/url/domain/url.entity';
import { User } from '../domain/user.entity';

export type FindByUniqueUrlModel = { id: string } | { email: string };

export interface IUserRepository {
  save(user: User): Promise<User>;
  findBy(params: FindByUniqueUrlModel): Promise<User | null>;
  findByOrThrow(params: FindByUniqueUrlModel): Promise<User>;
  findUrls(id: string): Promise<Url[]>;
}
