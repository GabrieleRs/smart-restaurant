import { Test, TestingModule } from '@nestjs/testing';
import { LiveOrderController } from './live-order.controller';

describe('LiveOrderController', () => {
  let controller: LiveOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiveOrderController],
    }).compile();

    controller = module.get<LiveOrderController>(LiveOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
