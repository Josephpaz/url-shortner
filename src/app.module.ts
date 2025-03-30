import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './infra/drizzle/drizzle.module';
import { UrlModule } from './modules/url/url.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DrizzleModule, UrlModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
