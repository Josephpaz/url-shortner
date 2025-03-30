import { User } from '../domain/user.entity';

export type FindByUniqueUrlModel = { id: string } | { email: string };

export interface IUserRepository {
  save(user: User): Promise<User>;
  findBy(params: FindByUniqueUrlModel): Promise<User>;
}
