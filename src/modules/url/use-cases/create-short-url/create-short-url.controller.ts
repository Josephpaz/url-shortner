import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateShortUrlService } from './create-short-url.service';
import { CreateUrlDto } from '../../dtos/create-url.dto';
import { UrlMapper } from '../../mappers/url.mapper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Url')
@Controller('url')
export class CreateShortUrlController {
  constructor(private readonly createShortUrlService: CreateShortUrlService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async handle(
    @Body() body: CreateUrlDto,
    @Req() req: { user: { id?: string } },
  ) {
    const userId = req.user?.id;
    const result = await this.createShortUrlService.execute({
      ...body,
      userId,
    });

    return { ...result, data: UrlMapper.toDto(result.data) };
  }
}
