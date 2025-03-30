import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './infra/drizzle/drizzle.module';
import { UrlModule } from './modules/url/url.module';

@Module({
  imports: [DrizzleModule, UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
