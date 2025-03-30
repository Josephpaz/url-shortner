import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infra/drizzle/drizzle.module';
import { UserRepoService } from './repositories/drizzle/user-repo.service';

@Module({
  imports: [DrizzleModule],
  providers: [
    UserRepoService,
    { provide: 'IUserRepository', useExisting: UserRepoService },
  ],
})
export class UserModule {}
