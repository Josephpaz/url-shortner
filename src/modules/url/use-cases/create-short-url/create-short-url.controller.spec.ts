import { Test, TestingModule } from '@nestjs/testing';
import { CreateShortUrlController } from './create-short-url.controller';

describe('CreateShortUrlController', () => {
  let controller: CreateShortUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateShortUrlController],
    }).compile();

    controller = module.get<CreateShortUrlController>(CreateShortUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
