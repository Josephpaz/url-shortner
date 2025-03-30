import { Test, TestingModule } from '@nestjs/testing';
import { GetShortUrlService } from './get-short-url.service';

describe('GetShortUrlService', () => {
  let service: GetShortUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetShortUrlService],
    }).compile();

    service = module.get<GetShortUrlService>(GetShortUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
