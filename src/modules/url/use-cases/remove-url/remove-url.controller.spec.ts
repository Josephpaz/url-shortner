import { Test, TestingModule } from '@nestjs/testing';
import { RemoveUrlController } from './remove-url.controller';

describe('RemoveUrlController', () => {
  let controller: RemoveUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveUrlController],
    }).compile();

    controller = module.get<RemoveUrlController>(RemoveUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
