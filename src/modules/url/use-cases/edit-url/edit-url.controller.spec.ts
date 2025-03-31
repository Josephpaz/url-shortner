import { Test, TestingModule } from '@nestjs/testing';
import { EditUrlController } from './edit-url.controller';

describe('EditUrlController', () => {
  let controller: EditUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditUrlController],
    }).compile();

    controller = module.get<EditUrlController>(EditUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
