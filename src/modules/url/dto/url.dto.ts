export type UrlDto = {
  id: string;
  original: string;
  short: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
