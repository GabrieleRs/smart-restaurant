import { Test, TestingModule } from '@nestjs/testing';
import { MealRepository } from './meal.repository';

describe('Meal', () => {
  let provider: MealRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealRepository],
    }).compile();

    provider = module.get<MealRepository>(MealRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
