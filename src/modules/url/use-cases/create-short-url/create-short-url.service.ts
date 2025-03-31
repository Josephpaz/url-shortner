import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/core/use-case';
import { CreateUrlDto } from '../../dtos/create-url.dto';
import { Url } from '../../domain/url.entity';
import { IUrlRepository } from '../../repositories/url-repo.interface';
import { nanoid } from 'nanoid';
import 'dotenv/config';
import { IUserRepository } from 'src/modules/user/repositories/user-repo.interface';
import { User } from 'src/modules/user/domain/user.entity';

type Input = CreateUrlDto & { userId?: string };
type Result = {
  type: 'CreateShortUrlSuccess' | 'UrlAlreadyExists';
  data: Url;
};

@Injectable()
export class CreateShortUrlService implements UseCase<Input, Result> {
  constructor(
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
    @Inject('UserRepo')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(input: Input): Promise<Result> {
    const { url, userId } = input;
    const shortUrl = nanoid(6);

    let user: User | undefined = undefined;
    if (userId) user = await this.userRepository.findByOrThrow({ id: userId });

    const urlExists = await this.urlRepository.verifyIfExists({
      original: url,
      userId: user?.id,
    });

    if (urlExists) return { type: 'UrlAlreadyExists', data: urlExists };

    const urlEntity = Url.create({
      user: user,
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
