import { Test, TestingModule } from '@nestjs/testing';
import { GetUrlAccessLogsService } from './get-url-access-logs.service';

describe('GetUrlAccessLogsService', () => {
  let service: GetUrlAccessLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUrlAccessLogsService],
    }).compile();

    service = module.get<GetUrlAccessLogsService>(GetUrlAccessLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
