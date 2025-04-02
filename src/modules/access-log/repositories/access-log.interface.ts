import { PaginationResult } from 'src/shared/interface/pagination-result.interface';
import { AccessLog } from '../domain/access-log.entity';
import { GetUrlAccessLogsQueryParams } from 'src/modules/url/use-cases/get-url-access-logs/get-url-access-logs-query.params';

export type FindAllParams = GetUrlAccessLogsQueryParams & {
  urlId: string;
};

export interface IAccessLogRepository {
  save(accessLog: AccessLog): Promise<AccessLog>;
  findAll(params: FindAllParams): Promise<PaginationResult<AccessLog>>;
}
