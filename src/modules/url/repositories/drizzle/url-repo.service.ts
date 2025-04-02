import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Url } from '../../domain/url.entity';
import {
  FindByUniqueUrlModel,
  FindUrlsParams,
  FindWithDeleted,
  IUrlRepository,
  VerifyIfExistsParams,
} from '../url-repo.interface';
import * as schema from '../../../../db/schema';
// import * as url from '../../../../db/schema/url';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { UrlMapper } from '../../mappers/url.mapper';
import { and, asc, desc, eq, isNull } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { PaginationResult } from 'src/shared/interface/pagination-result.interface';
import { getPageOffsets } from 'src/shared/helpers/get-pages-offset.helper';
import { Order } from 'src/shared/interface/order';

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

  async findAll(params: FindUrlsParams): Promise<PaginationResult<Url>> {
    const { page, pageSize, order, short } = params;
    const { skip, take } = getPageOffsets(page, pageSize);

    const result = await this.drizzleService.query.url.findMany({
      offset: skip,
      limit: take,
      where: (url, { and, like, isNull }) =>
        and(
          short ? like(url.short, `%${short}%`) : undefined,
          isNull(url.deletedAt),
        ),
      orderBy: [
        order === Order.ASC
          ? asc(schema.url.createdAt)
          : desc(schema.url.createdAt),
      ],
      with: {
        user: true,
      },
    });

    return {
      total: result.length,
      data: result.map((url) => UrlMapper.toDomain(url)),
    };
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
