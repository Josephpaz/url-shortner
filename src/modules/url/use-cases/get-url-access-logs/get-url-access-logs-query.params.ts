import { OmitType } from '@nestjs/swagger';
import { GetUrlsQueryParams } from '../get-urls/get-urls-query.params';

export class GetUrlAccessLogsQueryParams extends OmitType(GetUrlsQueryParams, [
  'short',
]) {}
