import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Url } from '../../domain/url.entity';
import { FindByUniqueUrlModel, IUrlRepository } from '../url-repo.interface';
import * as schema from '../../../../db/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { UrlMapper } from '../../mappers/url.mapper';
import { eq } from 'drizzle-orm';
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

  async findBy(params: FindByUniqueUrlModel): Promise<Url | null> {
    const [key] = Object.keys(params) as ('id' | 'short')[];

    const column = schema.url[key];
    const value = params[key] as string;

    const [urlResult] = await this.drizzleService
      .select()
      .from(schema.url)
      .where(eq(column, value));

    return urlResult ? UrlMapper.toDomain(urlResult) : null;
  }

  async findByOrThrow(params: FindByUniqueUrlModel): Promise<Url> {
    const url = await this.findBy(params);

    if (!url) {
      throw new NotFoundException('NotFoundUrlError');
    }

    return url;
  }
}
