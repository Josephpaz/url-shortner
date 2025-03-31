import { Test, TestingModule } from '@nestjs/testing';
import { RemoveUrlService } from './remove-url.service';

describe('RemoveUrlService', () => {
  let service: RemoveUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveUrlService],
    }).compile();

    service = module.get<RemoveUrlService>(RemoveUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
