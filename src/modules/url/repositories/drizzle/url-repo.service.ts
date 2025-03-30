import { Inject, Injectable } from '@nestjs/common';
import { Url } from '../../domain/url.entity';
import { IUrlRepository } from '../url-repo.interface';
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

    const urlInserted = await this.drizzleService
      .select()
      .from(schema.url)
      .where(eq(schema.url.id, uuid));

    const record = UrlMapper.toDomain(urlInserted[0]);

    return record;
  }
}
