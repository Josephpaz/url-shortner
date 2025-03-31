import { AccessLogDto } from 'src/modules/access-log/dto/access-log.dto';
import { UserDto } from 'src/modules/user/dtos/user.dto';

export type UrlDto = {
  id?: string;
  user?: UserDto;
  accessLog?: AccessLogDto;
  original: string;
  short: string;
  clicks: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};
