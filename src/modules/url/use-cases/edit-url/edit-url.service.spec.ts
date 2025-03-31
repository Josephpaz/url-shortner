import { Test, TestingModule } from '@nestjs/testing';
import { EditUrlService } from './edit-url.service';

describe('EditUrlService', () => {
  let service: EditUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditUrlService],
    }).compile();

    service = module.get<EditUrlService>(EditUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
