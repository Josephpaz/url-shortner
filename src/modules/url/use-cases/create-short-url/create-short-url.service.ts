import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/core/use-case';
import { CreateUrlDto } from '../../dtos/create-url.dto';
import { Url } from '../../domain/url.entity';
import { IUrlRepository } from '../../repositories/url-repo.interface';
import { nanoid } from 'nanoid';
import 'dotenv/config';

type Input = CreateUrlDto;
type Result = {
  type: 'CreateShortUrlSuccess';
  data: Url;
};

@Injectable()
export class CreateShortUrlService implements UseCase<Input, Result> {
  constructor(
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
  ) {}
  async execute(input: Input): Promise<Result> {
    const { url } = input;
    const shortUrl = nanoid(6);

    const urlEntity = Url.create({
      original: url,
      short: shortUrl,
      clicks: 0,
    });

    const data = await this.urlRepository.save(urlEntity);

    return {
      type: 'CreateShortUrlSuccess',
      data,
    };
  }
}
