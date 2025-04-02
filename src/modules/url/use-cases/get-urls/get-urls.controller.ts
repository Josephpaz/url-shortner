import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUrlsService } from './get-urls.service';
import { UrlMapper } from '../../mappers/url.mapper';
import { GetUrlsQueryParams } from './get-urls-query.params';

@ApiTags('Url')
@Controller('urls')
export class GetUrlsController {
  constructor(private readonly getUrlsService: GetUrlsService) {}

  @Get()
  async handle(@Query() query: GetUrlsQueryParams) {
    const result = await this.getUrlsService.execute(query);
    return { ...result, data: result.data.map((url) => UrlMapper.toDto(url)) };
  }
}
