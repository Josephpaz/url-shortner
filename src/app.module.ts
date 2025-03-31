import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './infra/drizzle/drizzle.module';
import { UrlModule } from './modules/url/url.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccessLogModule } from './modules/access-log/access-log.module';

@Module({
  imports: [DrizzleModule, UrlModule, UserModule, AuthModule, AccessLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
