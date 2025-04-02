import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUrlAccessLogsService } from './get-url-access-logs.service';
import { GetUrlAccessLogsQueryParams } from './get-url-access-logs-query.params';
import { AccessLogMapper } from 'src/modules/access-log/mappers/access-log.mapper';

@ApiTags('Url')
@Controller('urls')
export class GetUrlAccessLogsController {
  constructor(
    private readonly getUrlAccessLogsService: GetUrlAccessLogsService,
  ) {}

  @Get(':short/access-logs')
  async execute(
    @Param('short') short: string,
    @Query() query: GetUrlAccessLogsQueryParams,
  ) {
    const result = await this.getUrlAccessLogsService.execute({
      short,
      ...query,
    });
    return {
      ...result,
      data: result.data.map((alog) => AccessLogMapper.toDto(alog)),
    };
  }
}
