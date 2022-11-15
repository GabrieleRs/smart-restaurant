import { Test, TestingModule } from '@nestjs/testing';
import { LiveOrderRepository } from './live-order.repository';

describe('LiveOrder', () => {
  let provider: LiveOrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveOrderRepository],
    }).compile();

    provider = module.get<LiveOrderRepository>(LiveOrderRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
