import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindAllParams, IAccessLogRepository } from '../access-log.interface';
import { AccessLog } from '../../domain/access-log.entity';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../../../../db/schema';
import { randomUUID } from 'crypto';
import { asc, desc, eq } from 'drizzle-orm';
import { AccessLogMapper } from '../../mappers/access-log.mapper';
import { PaginationResult } from 'src/shared/interface/pagination-result.interface';
import { getPageOffsets } from 'src/shared/helpers/get-pages-offset.helper';
import { Order } from 'src/shared/interface/order';

@Injectable()
export class AccessLogRepository implements IAccessLogRepository {
  constructor(
    @Inject('DrizzleService')
    private drizzleService: MySql2Database<typeof schema>,
  ) {}

  async save(accessLog: AccessLog): Promise<AccessLog> {
    try {
      const uuid = randomUUID();

      await this.drizzleService.insert(schema.accessLog).values({
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

  async findAll(params: FindAllParams): Promise<PaginationResult<AccessLog>> {
    const { page, pageSize, order, urlId } = params;
    const { skip, take } = getPageOffsets(page, pageSize);

    const result = await this.drizzleService.query.accessLog.findMany({
      where: (accessLog, { and }) => and(eq(accessLog.urlId, urlId)),
      offset: skip,
      limit: take,
      orderBy: [
        order === Order.ASC
          ? asc(schema.url.createdAt)
          : desc(schema.url.createdAt),
      ],
    });

    return {
      total: result.length,
      data: result.map((alog) => AccessLogMapper.toDomain(alog)),
    };
  }
}
