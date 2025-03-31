import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infra/drizzle/drizzle.module';
import { AccessLogRepository } from './repositories/drizzle/access-log-repo.service';

@Module({
  imports: [DrizzleModule],
  providers: [
    AccessLogRepository,
    {
      provide: 'AccessLogRepository',
      useExisting: AccessLogRepository,
    },
  ],
})
export class AccessLogModule {}
