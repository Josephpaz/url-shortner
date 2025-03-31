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
import { and, eq, isNull } from 'drizzle-orm';
import { Url } from 'src/modules/url/domain/url.entity';
import { UrlMapper } from 'src/modules/url/mappers/url.mapper';

@Injectable()
export class UserRepoService implements IUserRepository {
  constructor(
    @Inject('DrizzleService')
    private drizzleService: MySql2Database<typeof schema>,
  ) {}

  async save(user: User): Promise<User> {
    try {
      const uuid = randomUUID();

      await this.drizzleService.insert(schema.user).values({
        id: uuid,
        email: user.email,
        password: user.password,
      });

      const userInserterd = await this.findByOrThrow({ id: uuid });

      return userInserterd;
    } catch (error) {
      throw new InternalServerErrorException(
        `failed to save the user: ${user.email}`,
        {
          cause: new Error(error),
        },
      );
    }
  }

  async findBy(params: FindByUniqueUrlModel): Promise<User | null> {
    const [key] = Object.keys(params) as ('id' | 'email')[];
    const column = schema.user[key];
    const value = params[key] as string;

    const [userResult] = await this.drizzleService
      .select()
      .from(schema.user)
      .where(eq(column, value));

    return userResult ? UserMapper.toDomain(userResult) : null;
  }

  async findByOrThrow(params: FindByUniqueUrlModel): Promise<User> {
    const user = await this.findBy(params);

    if (!user) {
      throw new NotFoundException('NotFoundUserError');
    }

    return user;
  }

  async findUrls(id: string): Promise<Url[]> {
    const userUrls = await this.drizzleService
      .select()
      .from(schema.user)
      .innerJoin(schema.url, eq(schema.url.userId, schema.user.id))
      .innerJoin(schema.accessLogs, eq(schema.accessLogs.urlId, schema.url.id))
      .where(and(eq(schema.user.id, id), isNull(schema.url.deletedAt)));

    return userUrls.map(({ url, access_logs }) =>
      UrlMapper.toDomain({ ...url, accessLog: access_logs }),
    );
  }
}
