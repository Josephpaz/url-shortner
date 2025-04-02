import { Test, TestingModule } from '@nestjs/testing';
import { ActivateUrlController } from './activate-url.controller';

describe('ActivateUrlController', () => {
  let controller: ActivateUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivateUrlController],
    }).compile();

    controller = module.get<ActivateUrlController>(ActivateUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
