import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserRepoService } from '../user/repositories/drizzle/user-repo.service';
import { LocalStrategy } from './strategies/local.strategy.local';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    UserRepoService,
    LocalStrategy,
    {
      provide: 'IUserRepository',
      useExisting: UserRepoService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
