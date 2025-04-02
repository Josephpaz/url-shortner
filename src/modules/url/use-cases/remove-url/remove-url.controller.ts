import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RemoveUrlService } from './remove-url.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Url')
@Controller('urls')
export class RemoveUrlController {
  constructor(private readonly removeUrlService: RemoveUrlService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/deactivate')
  async remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    const userId = req.user?.id;
    return await this.removeUrlService.execute({ id, userId });
  }
}
