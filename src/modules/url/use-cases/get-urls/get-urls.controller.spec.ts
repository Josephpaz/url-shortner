import { Test, TestingModule } from '@nestjs/testing';
import { GetUrlsController } from './get-urls.controller';

describe('GetUrlsController', () => {
  let controller: GetUrlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUrlsController],
    }).compile();

    controller = module.get<GetUrlsController>(GetUrlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
