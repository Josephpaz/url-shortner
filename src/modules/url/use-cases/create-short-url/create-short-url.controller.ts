import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateShortUrlService } from './create-short-url.service';
import { CreateUrlDto } from '../../dtos/create-url.dto';
import { UrlMapper } from '../../mappers/url.mapper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Url')
@Controller('url')
export class CreateShortUrlController {
  constructor(private readonly createShortUrlService: CreateShortUrlService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async handle(@Body() body: CreateUrlDto, @Req() req: Request) {
    console.log(req.user);
    const result = await this.createShortUrlService.execute(body);

    return UrlMapper.toDto(result.data);
  }
}
