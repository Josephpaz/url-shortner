import { Body, Controller, Post } from '@nestjs/common';
import { CreateShortUrlService } from './create-short-url.service';
import { CreateUrlDto } from '../../dtos/create-url.dto';
import { UrlMapper } from '../../mappers/url.mapper';

@Controller()
export class CreateShortUrlController {
  constructor(private readonly createShortUrlService: CreateShortUrlService) {}

  @Post()
  async handle(@Body() body: CreateUrlDto) {
    const result = await this.createShortUrlService.execute(body);

    return UrlMapper.toDto(result.data);
  }
}
