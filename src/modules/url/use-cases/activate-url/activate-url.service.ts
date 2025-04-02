import { Inject, Injectable } from '@nestjs/common';
import {
  FindWithDeleted,
  IUrlRepository,
} from '../../repositories/url-repo.interface';
import { UseCase } from 'src/shared/core/use-case';
import { IUserRepository } from 'src/modules/user/repositories/user-repo.interface';

type Input = {
  id: string;
  userId: string;
};

type Result = {
  type: 'ActivateUrlSuccess' | 'NotAllowedToActivateUrl';
};

@Injectable()
export class ActivateUrlService implements UseCase<Input, Result> {
  constructor(
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
    @Inject('UserRepo')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    const { id, userId } = input;

    const url = await this.urlRepository.findByOrThrow(
      { id },
      FindWithDeleted.True,
    );

    const urlExists = await this.urlRepository.verifyIfExists({
      original: url.original,
      userId,
    }); // verificar se o usuário é o dono

    if (!urlExists) {
      return { type: 'NotAllowedToActivateUrl' };
    }

    url.activate();

    await this.urlRepository.update(url);

    return {
      type: 'ActivateUrlSuccess',
    };
  }
}
