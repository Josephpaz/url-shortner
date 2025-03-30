import { InferSelectModel } from 'drizzle-orm';
import { user } from '../../../db/schema';
import { User } from '../domain/user.entity';
import { UserDto } from '../dtos/user.dto';

export class UserMapper {
  static toDomain(raw: InferSelectModel<typeof user>): User {
    return User.create(
      {
        email: raw.email,
        password: raw.password,
      },
      {
        id: raw.id,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
    );
  }

  static toDto(entity: User): UserDto {
    return {
      id: entity.id,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
