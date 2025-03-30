import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../domain/user.entity';
import { UseCase } from 'src/shared/core/use-case';
import { IUserRepository } from '../../repositories/user-repo.interface';

type Input = CreateUserDto;
type Result = {
  type: 'CreateUserSuccess';
  data: User;
};

@Injectable()
export class CreateUserService implements UseCase<Input, Result> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateUserDto): Promise<Result> {
    const user = User.create({
      email: input.email,
      password: input.password,
    });

    user.password = input.password;

    const isUserExists = await this.userRepository.findBy({
      email: input.email,
    });

    if (isUserExists) {
      throw new BadRequestException('UserEmailAlreadyExistsError');
    }

    const data = await this.userRepository.save(user);

    return {
      type: 'CreateUserSuccess',
      data,
    };
  }
}
