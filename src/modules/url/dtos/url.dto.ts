import { UserDto } from 'src/modules/user/dtos/user.dto';

export type UrlDto = {
  id?: string;
  user?: UserDto;
  original: string;
  short: string;
  clicks: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};
