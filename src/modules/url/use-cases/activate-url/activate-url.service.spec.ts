import { Test, TestingModule } from '@nestjs/testing';
import { ActivateUrlService } from './activate-url.service';

describe('ActivateUrlService', () => {
  let service: ActivateUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivateUrlService],
    }).compile();

    service = module.get<ActivateUrlService>(ActivateUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
