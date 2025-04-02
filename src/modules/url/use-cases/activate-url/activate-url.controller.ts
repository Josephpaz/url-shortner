import { Controller, Param, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivateUrlService } from './activate-url.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Url')
@Controller('urls')
export class ActivateUrlController {
  constructor(private readonly activateUrlService: ActivateUrlService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/activate')
  async activate(
    @Param('id') id: string,
    @Req() req: { user: { id: string } },
  ) {
    const userId = req.user?.id;
    return await this.activateUrlService.execute({ id, userId });
  }
}
