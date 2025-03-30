import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUrlsByUserService } from './get-urls-by-user.service';
import { UrlMapper } from 'src/modules/url/mappers/url.mapper';

@ApiTags('User')
@Controller('user')
export class GetUrlsByUserController {
  constructor(private readonly getUrlsByUserService: GetUrlsByUserService) {}

  @Get(':id/urls')
  async handle(@Param('id') id: string) {
    const result = await this.getUrlsByUserService.execute({ id });

    return { ...result, data: result.data.map((url) => UrlMapper.toDto(url)) };
  }
}
