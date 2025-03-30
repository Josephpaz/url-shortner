import { Inject, Injectable } from '@nestjs/common';
import { Url } from 'src/modules/url/domain/url.entity';
import { UseCase } from 'src/shared/core/use-case';
import { IUserRepository } from '../../repositories/user-repo.interface';

type Input = {
  id: string;
};

type Result = {
  type: 'GetUrlsByUserSuccess';
  data: Url[];
};

@Injectable()
export class GetUrlsByUserService implements UseCase<Input, Result> {
  constructor(
    @Inject('UserRepo')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    await this.userRepository.findByOrThrow({ id: input.id });

    const data = await this.userRepository.findUrls(input.id);

    return {
      type: 'GetUrlsByUserSuccess',
      data,
    };
  }
}
