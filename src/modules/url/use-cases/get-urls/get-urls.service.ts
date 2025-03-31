import { Inject, Injectable } from '@nestjs/common';
import { Url } from '../../domain/url.entity';
import { UseCase } from 'src/shared/core/use-case';
import { IUrlRepository } from '../../repositories/url-repo.interface';

type Result = {
  type: 'GetUrlsSuccess';
  data: Url[];
};

@Injectable()
export class GetUrlsService implements UseCase<never, Result> {
  constructor(
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
  ) {}

  async execute(): Promise<Result> {
    const data = await this.urlRepository.findAll();

    return {
      type: 'GetUrlsSuccess',
      data,
    };
  }
}
