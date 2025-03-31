import { Test, TestingModule } from '@nestjs/testing';
import { GetUrlsService } from './get-urls.service';

describe('GetUrlsService', () => {
  let service: GetUrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUrlsService],
    }).compile();

    service = module.get<GetUrlsService>(GetUrlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
