import { InferSelectModel } from 'drizzle-orm';
import { url, user } from '../../../db/schema';
import { Url } from '../domain/url.entity';
import { UrlDto } from '../dtos/url.dto';
import { UserMapper } from 'src/modules/user/mappers';

export class UrlMapper {
  static toDomain(
    raw: InferSelectModel<typeof url> & {
      user?: InferSelectModel<typeof user> | null;
    },
  ): Url {
    return Url.create(
      {
        original: raw.original,
        user: raw?.user ? UserMapper.toDomain(raw.user) : undefined,
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
      user: entity?.user && UserMapper.toDto(entity.user),
      original: entity.original,
      short: entity.short,
      clicks: entity.clicks,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
