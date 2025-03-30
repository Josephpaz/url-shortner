import { Test, TestingModule } from '@nestjs/testing';
import { GetShortUrlController } from './get-short-url.controller';

describe('GetShortUrlController', () => {
  let controller: GetShortUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetShortUrlController],
    }).compile();

    controller = module.get<GetShortUrlController>(GetShortUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
