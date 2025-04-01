import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { Order } from 'src/shared/interface/order';

export class GetUrlsByUserQueryParams {
  @ApiPropertyOptional({ type: 'number', default: 1 })
  @IsNumber()
  page = 1;

  @ApiPropertyOptional({ type: 'number', default: 10 })
  @IsNumber()
  pageSize = 10;

  @ApiPropertyOptional()
  short?: string;

  @ApiPropertyOptional({ enum: Order })
  @IsEnum(Order)
  order?: Order; // ASC | DESC
}
