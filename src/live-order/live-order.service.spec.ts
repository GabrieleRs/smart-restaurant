import { Test, TestingModule } from '@nestjs/testing';
import { LiveOrderService } from './live-order.service';

describe('LiveOrderService', () => {
  let service: LiveOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveOrderService],
    }).compile();

    service = module.get<LiveOrderService>(LiveOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
