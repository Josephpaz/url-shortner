import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/shared/interface/order';

export class GetUrlsByUserQueryParams {
  @ApiPropertyOptional({ type: 'number', default: 1 })
  @Type(() => Number)
  @IsNumber()
  page = 1;

  @ApiPropertyOptional({ type: 'number', default: 10 })
  @Type(() => Number)
  @IsNumber()
  pageSize = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  short?: string;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  order?: Order; // ASC | DESC
}
