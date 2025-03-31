import { Controller, Get, Param, Redirect, Req } from '@nestjs/common';
import { GetShortUrlService } from './get-short-url.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Url')
@Controller('urls')
export class GetShortUrlController {
  constructor(private readonly getShortUrlService: GetShortUrlService) {}

  @Get(':short')
  @Redirect()
  async handle(@Param('short') short: string, @Req() req: Request) {
    const result = await this.getShortUrlService.execute({ short, req });
    return { url: result.data.original };
  }
}
