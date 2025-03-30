import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infra/drizzle/drizzle.module';
import { UserRepoService } from './repositories/drizzle/user-repo.service';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { CreateUserController } from './use-cases/create-user/create-user.controller';

@Module({
  imports: [DrizzleModule],
  providers: [
    UserRepoService,
    { provide: 'IUserRepository', useExisting: UserRepoService },
    CreateUserService,
  ],
  controllers: [CreateUserController],
})
export class UserModule {}
