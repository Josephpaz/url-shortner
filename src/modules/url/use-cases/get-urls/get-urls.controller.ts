import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUrlsService } from './get-urls.service';
import { UrlMapper } from '../../mappers/url.mapper';

@ApiTags('Url')
@Controller('urls')
export class GetUrlsController {
  constructor(private readonly getUrlsService: GetUrlsService) {}

  @Get()
  async handle() {
    const result = await this.getUrlsService.execute();
    return { ...result, data: result.data.map((url) => UrlMapper.toDto(url)) };
  }
}
