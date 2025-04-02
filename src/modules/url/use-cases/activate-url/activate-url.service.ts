import { Inject, Injectable } from '@nestjs/common';
import { IUrlRepository } from '../../repositories/url-repo.interface';
import { UseCase } from 'src/shared/core/use-case';

type Input = {
  id: string;
};

type Result = {
  type: 'ActivateUrlSuccess';
};

@Injectable()
export class ActivateUrlService implements UseCase<Input, Result> {
  constructor(
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    const url = await this.urlRepository.findByOrThrow({ id: input.id });

    url.activate();

    await this.urlRepository.update(url);

    return {
      type: 'ActivateUrlSuccess',
    };
  }
}
