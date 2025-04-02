import { Inject, Injectable } from '@nestjs/common';
import { AccessLog } from 'src/modules/access-log/domain/access-log.entity';
import { IAccessLogRepository } from 'src/modules/access-log/repositories/access-log.interface';
import { UseCase } from 'src/shared/core/use-case';
import { PaginationResult } from 'src/shared/interface/pagination-result.interface';
import { IUrlRepository } from '../../repositories/url-repo.interface';
import { GetUrlAccessLogsQueryParams } from './get-url-access-logs-query.params';

type Input = GetUrlAccessLogsQueryParams & {
  short: string;
};

type Result = PaginationResult<AccessLog> & {
  type: 'GetUrlAccessLogsSuccess';
};

@Injectable()
export class GetUrlAccessLogsService implements UseCase<Input, Result> {
  constructor(
    @Inject('AccessLogRepo')
    private readonly accessLogRepository: IAccessLogRepository,
    @Inject('UrlRepo')
    private readonly urlRepository: IUrlRepository,
  ) {}

  async execute(input: Input): Promise<Result> {
    const { short } = input;

    const url = await this.urlRepository.findByOrThrow({ short });

    const data = await this.accessLogRepository.findAll({
      urlId: url.id!,
      ...input,
    });

    return {
      type: 'GetUrlAccessLogsSuccess',
      ...data,
    };
  }
}
