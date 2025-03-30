import { Inject, Injectable } from '@nestjs/common';
import { Url } from '../../domain/url.entity';
import { UseCase } from 'src/shared/core/use-case';
import { IUrlRepository } from '../../repositories/url-repo.interface';

type Input = {
  short: string;
};

type Result = {
  type: 'GetShortUrlSuccess';
  data: Url;
};

@Injectable()
export class GetShortUrlService implements UseCase<Input, Result> {
  constructor(
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    const { short } = input;

    const url = await this.urlRepository.findByOrThrow({ short });

    return {
      type: 'GetShortUrlSuccess',
      data: url,
    };
  }
}
