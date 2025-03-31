import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Url } from '../../domain/url.entity';
import {
  FindByUniqueUrlModel,
  FindWithDeleted,
  IUrlRepository,
  VerifyIfExistsParams,
} from '../url-repo.interface';
import * as schema from '../../../../db/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { UrlMapper } from '../../mappers/url.mapper';
import { and, eq, isNull } from 'drizzle-orm';
import { randomUUID } from 'crypto';

@Injectable()
export class UrlRepoService implements IUrlRepository {
  constructor(
    @Inject('DrizzleService')
    private drizzleService: MySql2Database<typeof schema>,
  ) {}

  async save(url: Url): Promise<Url> {
    try {
      const uuid = randomUUID();

      await this.drizzleService.insert(schema.url).values({
        id: uuid,
        userId: url.user?.id,
        original: url.original,
        short: url.short,
        clicks: url.clicks,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
        deletedAt: url.deletedAt,
      });

      const urlInserted = await this.findByOrThrow({ id: uuid });

      return urlInserted;
    } catch (error) {
      throw new InternalServerErrorException(
        `failed to short the url: ${url.original}`,
        {
          cause: new Error(error),
        },
      );
    }
  }

  async findAll(): Promise<Url[]> {
    const urls = await this.drizzleService
      .select()
      .from(schema.url)
      .leftJoin(schema.user, eq(schema.user.id, schema.url.userId))
      .leftJoin(schema.accessLogs, eq(schema.accessLogs.urlId, schema.url.id))
      .where(isNull(schema.url.deletedAt));

    return urls.map((url) =>
      UrlMapper.toDomain({
        ...url.url,
        user: url.user,
        accessLog: url.access_logs,
      }),
    );
  }

  async findBy(
    params: FindByUniqueUrlModel,
    flag = FindWithDeleted.False,
  ): Promise<Url | null> {
    const [key] = Object.keys(params) as ('id' | 'short')[];

    const column = schema.url[key];
    const value = params[key] as string;

    const [urlResult] = await this.drizzleService
      .select()
      .from(schema.url)
      .leftJoin(schema.user, eq(schema.user.id, schema.url.userId))
      .where(
        and(eq(column, value), flag ? undefined : isNull(schema.url.deletedAt)),
      );

    return urlResult
      ? UrlMapper.toDomain({ ...urlResult.url, user: urlResult.user })
      : null;
  }

  async findByOrThrow(
    params: FindByUniqueUrlModel,
    flag = FindWithDeleted.False,
  ): Promise<Url> {
    const url = await this.findBy(params, flag);

    if (!url) {
      throw new NotFoundException('NotFoundUrlError');
    }

    return url;
  }

  async verifyIfExists(params: VerifyIfExistsParams): Promise<Url | null> {
    const url = await this.drizzleService
      .select()
      .from(schema.url)
      .where(
        and(
          eq(schema.url.original, params.original),
          params.userId ? eq(schema.url.userId, params.userId) : undefined,
          isNull(schema.url.deletedAt),
        ),
      );

    return url.length !== 1 ? null : UrlMapper.toDomain(url[0]);
  }

  async update(url: Url): Promise<Url> {
    await this.drizzleService
      .update(schema.url)
      .set({
        original: url.original,
        short: url.short,
        clicks: url.clicks,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
        deletedAt: url.deletedAt,
      })
      .where(eq(schema.url.id, url.id!));

    const urlUpdated = await this.findByOrThrow(
      { id: url.id! },
      FindWithDeleted.True,
    );

    return urlUpdated;
  }
}
