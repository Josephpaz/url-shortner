import { Inject, Injectable } from '@nestjs/common';
import { Url } from '../../domain/url.entity';
import { UseCase } from 'src/shared/core/use-case';
import { IUrlRepository } from '../../repositories/url-repo.interface';
import { GetUrlsQueryParams } from './get-urls-query.params';
import { PaginationResult } from 'src/shared/interface/pagination-result.interface';

type Input = GetUrlsQueryParams;

type Result = PaginationResult<Url> & {
  type: 'GetUrlsSuccess';
};

@Injectable()
export class GetUrlsService implements UseCase<Input, Result> {
  constructor(
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    const data = await this.urlRepository.findAll(input);

    return {
      type: 'GetUrlsSuccess',
      ...data,
    };
  }
}
