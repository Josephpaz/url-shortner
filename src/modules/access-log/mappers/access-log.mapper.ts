import { InferSelectModel } from 'drizzle-orm';
import { accessLog } from 'src/db/schema';
import { AccessLog } from '../domain/access-log.entity';
import { AccessLogDto } from '../dto/access-log.dto';

export class AccessLogMapper {
  static toDomain(raw: InferSelectModel<typeof accessLog>): AccessLog {
    return AccessLog.create(
      {
        urlId: raw.urlId,
        ipAddress: raw.ipAddress!,
        userAgent: raw.userAgent!,
      },
      {
        id: raw.id,
        createdAt: raw.createdAt,
        updatedAt: raw.createdAt,
      },
    );
  }

  static toDto(entity: AccessLog): AccessLogDto {
    return {
      id: entity.id,
      ipAddress: entity.ipAddress,
      userAgent: entity.userAgent,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
