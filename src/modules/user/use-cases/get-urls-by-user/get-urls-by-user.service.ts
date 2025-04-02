import { Inject, Injectable } from '@nestjs/common';
import { Url } from 'src/modules/url/domain/url.entity';
import { UseCase } from 'src/shared/core/use-case';
import { IUserRepository } from '../../repositories/user-repo.interface';
import { GetUrlsByUserQueryParams } from './get-urls-by-user-query.params';
import { PaginationResult } from 'src/shared/interface/pagination-result.interface';

type Input = {
  id: string;
  query: GetUrlsByUserQueryParams;
};

type Result = PaginationResult<Url> & {
  type: 'GetUrlsByUserSuccess';
};

@Injectable()
export class GetUrlsByUserService implements UseCase<Input, Result> {
  constructor(
    @Inject('UserRepo')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    const { id, query } = input;

    await this.userRepository.findByOrThrow({ id });

    const data = await this.userRepository.findUrls({
      ...query,
      id,
    });

    return {
      type: 'GetUrlsByUserSuccess',
      ...data,
    };
  }
}
