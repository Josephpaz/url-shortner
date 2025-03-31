import { Inject, Injectable } from '@nestjs/common';
import { EditUrlDto } from '../../dtos/edit-url.dto';
import { UseCase } from 'src/shared/core/use-case';
import { IUrlRepository } from '../../repositories/url-repo.interface';
import { Url } from '../../domain/url.entity';
import { nanoid } from 'nanoid';

type Input = EditUrlDto & { id: string; userId?: string };
type Result = {
  type: 'EditUrlSuccess' | 'UrlAlreadyExists';
  data: Url;
};

@Injectable()
export class EditUrlService implements UseCase<Input, Result> {
  constructor(
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    const { id, url, userId } = input;

    const urlEntity = await this.urlRepository.findByOrThrow({ id });

    const urlExists = await this.urlRepository.verifyIfExists({
      original: url,
      userId,
    });

    if (urlExists) return { type: 'UrlAlreadyExists', data: urlExists };

    urlEntity.original = input.url;
    urlEntity.short = nanoid(6);

    const data = await this.urlRepository.update(urlEntity);

    return {
      type: 'EditUrlSuccess',
      data,
    };
  }
}
