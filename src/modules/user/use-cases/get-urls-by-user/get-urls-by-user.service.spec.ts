import { Test, TestingModule } from '@nestjs/testing';
import { GetUrlsByUserService } from './get-urls-by-user.service';

describe('GetUrlsByUserService', () => {
  let service: GetUrlsByUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUrlsByUserService],
    }).compile();

    service = module.get<GetUrlsByUserService>(GetUrlsByUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
