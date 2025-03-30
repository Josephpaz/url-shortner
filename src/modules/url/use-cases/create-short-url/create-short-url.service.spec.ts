import { Test, TestingModule } from '@nestjs/testing';
import { CreateShortUrlService } from './create-short-url.service';

describe('CreateShortUrlService', () => {
  let service: CreateShortUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateShortUrlService],
    }).compile();

    service = module.get<CreateShortUrlService>(CreateShortUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
