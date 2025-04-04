import { Body, Controller, Param, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EditUrlService } from './edit-url.service';
import { EditUrlDto } from '../../dtos/edit-url.dto';
import { UrlMapper } from '../../mappers/url.mapper';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Url')
@Controller('urls')
export class EditUrlController {
  constructor(private readonly editUrlService: EditUrlService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async handle(
    @Param('id') id: string,
    @Body() body: EditUrlDto,
    @Req() req: { user: { id?: string } },
  ) {
    const userId = req.user?.id;
    const result = await this.editUrlService.execute({
      id,
      ...body,
      userId,
    });
    return { ...result, data: UrlMapper.toDto(result.data) };
  }
}
