import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUrlsByUserService } from './get-urls-by-user.service';
import { UrlMapper } from 'src/modules/url/mappers/url.mapper';
import { GetUrlsByUserQueryParams } from './get-urls-by-user-query.params';

@ApiTags('User')
@Controller('users')
export class GetUrlsByUserController {
  constructor(private readonly getUrlsByUserService: GetUrlsByUserService) {}

  @Get(':id/urls')
  async handle(
    @Param('id') id: string,
    @Query() query: GetUrlsByUserQueryParams,
  ) {
    const result = await this.getUrlsByUserService.execute({ id, query });

    return { ...result, data: result.data.map((url) => UrlMapper.toDto(url)) };
  }
}
