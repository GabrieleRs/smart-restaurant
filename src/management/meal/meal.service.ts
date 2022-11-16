import { Inject, Injectable } from '@nestjs/common';
import { MealRepository } from './meal.repository';
import { Meal } from './model/meal';

@Injectable()
export class MealService {
  constructor(@Inject(MealRepository) private repository: MealRepository) {}
  listMeals(): Promise<Meal[]> {
    return this.repository.listMeals();
  }
}
