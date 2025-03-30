import { InferSelectModel } from 'drizzle-orm';
import { url } from '../../../db/schema';
import { Url } from '../domain/url.entity';
import { UrlDto } from '../dtos/url.dto';

export class UrlMapper {
  static toDomain(raw: InferSelectModel<typeof url>): Url {
    return Url.create(
      {
        original: raw.original,
        short: raw.short,
        clicks: raw.clicks,
      },
      {
        id: raw.id,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw?.deletedAt,
      },
    );
  }

  static toDto(entity: Url): UrlDto {
    return {
      id: entity.id,
      original: entity.original,
      short: entity.short,
      clicks: entity.clicks,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
