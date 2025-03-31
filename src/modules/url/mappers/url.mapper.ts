import { InferSelectModel } from 'drizzle-orm';
import { accessLogs, url, user } from '../../../db/schema';
import { Url } from '../domain/url.entity';
import { UrlDto } from '../dtos/url.dto';
import { UserMapper } from 'src/modules/user/mappers';
import { AccessLogMapper } from 'src/modules/access-log/mappers/access-log.mapper';

export class UrlMapper {
  static toDomain(
    raw: InferSelectModel<typeof url> & {
      user?: InferSelectModel<typeof user> | null;
      accessLog?: InferSelectModel<typeof accessLogs> | null;
    },
  ): Url {
    return Url.create(
      {
        original: raw.original,
        user: raw?.user ? UserMapper.toDomain(raw.user) : undefined,
        accessLog: raw?.accessLog
          ? AccessLogMapper.toDomain(raw.accessLog)
          : undefined,
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
      accessLog: entity?.accessLog && AccessLogMapper.toDto(entity.accessLog),
      original: entity.original,
      short: entity.short,
      clicks: entity.clicks,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
