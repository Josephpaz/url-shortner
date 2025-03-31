import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IAccessLogRepository } from '../access-log.interface';
import { AccessLog } from '../../domain/access-log.entity';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../../../../db/schema';
import { randomUUID } from 'crypto';

@Injectable()
export class AccessLogRepository implements IAccessLogRepository {
  constructor(
    @Inject('DrizzleService')
    private drizzleService: MySql2Database<typeof schema>,
  ) {}

  async save(accessLog: AccessLog): Promise<AccessLog> {
    try {
      const uuid = randomUUID();

      await this.drizzleService.insert(schema.accessLogs).values({
        id: uuid,
        urlId: accessLog.urlId,
        ipAddress: accessLog.ipAddress,
        userAgent: accessLog.userAgent,
      });

      return accessLog;
    } catch (error) {
      throw new InternalServerErrorException(
        `failed to access log: ${accessLog.urlId}`,
        {
          cause: new Error(error),
        },
      );
    }
  }
}
