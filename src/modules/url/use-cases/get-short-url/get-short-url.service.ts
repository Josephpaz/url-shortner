import { Inject, Injectable } from '@nestjs/common';
import { Url } from '../../domain/url.entity';
import { UseCase } from 'src/shared/core/use-case';
import { IUrlRepository } from '../../repositories/url-repo.interface';
import { IAccessLogRepository } from 'src/modules/access-log/repositories/access-log.interface';
import { Request } from 'express';
import { AccessLog } from 'src/modules/access-log/domain/access-log.entity';

type Input = {
  short: string;
  req: Request;
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
    @Inject('AccessLogRepo')
    private readonly accessLogRepository: IAccessLogRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    const { short } = input;

    const url = await this.urlRepository.findByOrThrow({ short });

    const accessLog = AccessLog.create({
      urlId: url.id!,
      ipAddress: input.req.ip!,
      userAgent: input.req.headers['user-agent']!,
    });

    await this.accessLogRepository.save(accessLog);

    url.clicks += 1;

    await this.urlRepository.update(url);

    return {
      type: 'GetShortUrlSuccess',
      data: url,
    };
  }
}
