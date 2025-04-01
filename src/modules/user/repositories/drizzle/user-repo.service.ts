import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  FindByUniqueUrlModel,
  FindUrlsParams,
  IUserRepository,
} from '../user-repo.interface';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../../../../db/schema';
import { User } from '../../domain/user.entity';
import { randomUUID } from 'crypto';
import { UserMapper } from '../../mappers';
import { and, asc, desc, eq, isNull, like } from 'drizzle-orm';
import { Url } from 'src/modules/url/domain/url.entity';
import { UrlMapper } from 'src/modules/url/mappers/url.mapper';
import { PaginationResult } from 'src/shared/interface/pagination-result.interface';
import { getPageOffsets } from 'src/shared/helpers/get-pages-offset.helper';
import { Order } from 'src/shared/interface/order';

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

  async findUrls(params: FindUrlsParams): Promise<PaginationResult<Url>> {
    const { id, page, pageSize, order, short } = params;
    const { skip, take } = getPageOffsets(page, pageSize);

    const result = await this.drizzleService
      .select()
      .from(schema.url)
      .where(
        and(
          eq(schema.url.userId, id),
          short ? like(schema.url.short, `%${short}%`) : undefined,
          isNull(schema.url.deletedAt),
        ),
      )
      .orderBy(
        order === Order.ASC
          ? asc(schema.url.createdAt)
          : desc(schema.url.createdAt),
      )
      .offset(skip)
      .limit(take);

    return {
      total: result.length,
      data: result.map((r) => UrlMapper.toDomain(r)),
    };
  }
}
