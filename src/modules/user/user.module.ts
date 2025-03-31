import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infra/drizzle/drizzle.module';
import { UserRepoService } from './repositories/drizzle/user-repo.service';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { GetUrlsByUserService } from './use-cases/get-urls-by-user/get-urls-by-user.service';
import { GetUrlsByUserController } from './use-cases/get-urls-by-user/get-urls-by-user.controller';

@Module({
  imports: [DrizzleModule],
  providers: [
    UserRepoService,
    { provide: 'UserRepo', useExisting: UserRepoService },
    CreateUserService,
    GetUrlsByUserService,
  ],
  controllers: [CreateUserController, GetUrlsByUserController],
})
export class UserModule {}
