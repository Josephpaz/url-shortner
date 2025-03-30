import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infra/drizzle/drizzle.module';
import { UrlRepoService } from './repositories/drizzle/url-repo.service';
import { CreateShortUrlService } from './use-cases/create-short-url/create-short-url.service';
import { CreateShortUrlController } from './use-cases/create-short-url/create-short-url.controller';

@Module({
  imports: [DrizzleModule],
  providers: [
    UrlRepoService,
    {
      provide: 'UrlRepo',
      useExisting: UrlRepoService,
    },
    CreateShortUrlService,
  ],
  controllers: [CreateShortUrlController],
})
export class UrlModule {}
