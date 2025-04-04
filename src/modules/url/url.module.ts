import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infra/drizzle/drizzle.module';
import { UrlRepoService } from './repositories/drizzle/url-repo.service';
import { CreateShortUrlService } from './use-cases/create-short-url/create-short-url.service';
import { CreateShortUrlController } from './use-cases/create-short-url/create-short-url.controller';
import { GetShortUrlService } from './use-cases/get-short-url/get-short-url.service';
import { GetShortUrlController } from './use-cases/get-short-url/get-short-url.controller';
import { UserRepoService } from '../user/repositories/drizzle/user-repo.service';
import { EditUrlService } from './use-cases/edit-url/edit-url.service';
import { EditUrlController } from './use-cases/edit-url/edit-url.controller';
import { RemoveUrlService } from './use-cases/remove-url/remove-url.service';
import { RemoveUrlController } from './use-cases/remove-url/remove-url.controller';
import { AccessLogRepository } from '../access-log/repositories/drizzle/access-log-repo.service';
import { GetUrlsService } from './use-cases/get-urls/get-urls.service';
import { GetUrlsController } from './use-cases/get-urls/get-urls.controller';
import { ActivateUrlService } from './use-cases/activate-url/activate-url.service';
import { ActivateUrlController } from './use-cases/activate-url/activate-url.controller';
import { GetUrlAccessLogsService } from './use-cases/get-url-access-logs/get-url-access-logs.service';
import { GetUrlAccessLogsController } from './use-cases/get-url-access-logs/get-url-access-logs.controller';

@Module({
  imports: [DrizzleModule],
  providers: [
    UrlRepoService,
    {
      provide: 'UrlRepo',
      useExisting: UrlRepoService,
    },
    UserRepoService,
    {
      provide: 'UserRepo',
      useExisting: UserRepoService,
    },
    AccessLogRepository,
    {
      provide: 'AccessLogRepo',
      useExisting: AccessLogRepository,
    },
    CreateShortUrlService,
    GetShortUrlService,
    EditUrlService,
    RemoveUrlService,
    GetUrlsService,
    ActivateUrlService,
    GetUrlAccessLogsService,
  ],
  controllers: [
    CreateShortUrlController,
    GetShortUrlController,
    EditUrlController,
    RemoveUrlController,
    GetUrlsController,
    ActivateUrlController,
    GetUrlAccessLogsController,
  ],
})
export class UrlModule {}
