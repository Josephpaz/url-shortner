import { AccessLog } from '../domain/access-log.entity';

export interface IAccessLogRepository {
  save(accessLog: AccessLog): Promise<AccessLog>;
}
