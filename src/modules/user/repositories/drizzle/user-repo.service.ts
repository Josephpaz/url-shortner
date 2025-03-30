import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindByUniqueUrlModel, IUserRepository } from '../user-repo.interface';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../../../../db/schema';
import { User } from '../../domain/user.entity';
import { randomUUID } from 'crypto';
import { UserMapper } from '../../mappers';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserRepoService implements IUserRepository {
  constructor(
    @Inject('DrizzleService')
    private drizzleService: MySql2Database<typeof schema>,
  ) {}

  async save(user: User): Promise<User> {
    const uuid = randomUUID();

    await this.drizzleService.insert(schema.user).values({
      id: uuid,
      email: user.email,
      password: user.password,
    });

    return user;
  }

  async findBy(params: FindByUniqueUrlModel): Promise<User> {
    try {
      const [key] = Object.keys(params) as ('id' | 'email')[];

      const column = schema.url[key];
      const value = params[key] as string;

      const [userResult] = await this.drizzleService
        .select()
        .from(schema.user)
        .where(eq(column, value));

      if (!userResult) {
        throw new NotFoundException('NotFoundUserError');
      }

      return UserMapper.toDomain(userResult);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
