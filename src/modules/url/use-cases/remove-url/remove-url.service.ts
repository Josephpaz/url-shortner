import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/core/use-case';
import { IUrlRepository } from '../../repositories/url-repo.interface';

type Input = {
  id: string;
  userId: string;
};

type Result = {
  type: 'RemoveUrlSuccess' | 'NotAllowedToRemoveUrl';
};

@Injectable()
export class RemoveUrlService implements UseCase<Input, Result> {
  constructor(
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    const { id, userId } = input;

    const url = await this.urlRepository.findByOrThrow({ id });

    const urlExists = await this.urlRepository.verifyIfExists({
      original: url.original,
      userId,
    }); // verificar se o usuário é o dono

    if (!urlExists) {
      return { type: 'NotAllowedToRemoveUrl' };
    }

    url.deletedAt = new Date();

    await this.urlRepository.update(url);
    return {
      type: 'RemoveUrlSuccess',
    };
  }
}
