import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { GetShortUrlService } from './get-short-url.service';

@Controller('')
export class GetShortUrlController {
  constructor(private readonly getShortUrlService: GetShortUrlService) {}

  @Get(':short')
  @Redirect()
  async handle(@Param('short') short: string) {
    const result = await this.getShortUrlService.execute({ short });
    return { url: result.data.original };
  }
}
