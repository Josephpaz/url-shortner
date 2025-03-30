import { Test, TestingModule } from '@nestjs/testing';
import { GetUrlsByUserController } from './get-urls-by-user.controller';

describe('GetUrlsByUserController', () => {
  let controller: GetUrlsByUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUrlsByUserController],
    }).compile();

    controller = module.get<GetUrlsByUserController>(GetUrlsByUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
