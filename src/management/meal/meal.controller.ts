import { Controller, Get, Inject } from '@nestjs/common';
import { MealRepository } from './meal.repository';

@Controller('meal')
export class MealController {
  constructor(@Inject(MealRepository) private mealRepository: MealRepository) {}

  @Get()
  list() {
    return this.mealRepository.listMeals();
  }
}
