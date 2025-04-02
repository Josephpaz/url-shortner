import { Test, TestingModule } from '@nestjs/testing';
import { GetUrlAccessLogsController } from './get-url-access-logs.controller';

describe('GetUrlAccessLogsController', () => {
  let controller: GetUrlAccessLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUrlAccessLogsController],
    }).compile();

    controller = module.get<GetUrlAccessLogsController>(
      GetUrlAccessLogsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
