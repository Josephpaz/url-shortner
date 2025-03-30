import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
