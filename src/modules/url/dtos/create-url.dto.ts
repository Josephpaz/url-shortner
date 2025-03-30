import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty()
  @IsDataURI()
  url: string;
}
