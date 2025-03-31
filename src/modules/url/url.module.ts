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
    CreateShortUrlService,
    GetShortUrlService,
    EditUrlService,
    RemoveUrlService,
  ],
  controllers: [
    CreateShortUrlController,
    GetShortUrlController,
    EditUrlController,
    RemoveUrlController,
  ],
})
export class UrlModule {}
