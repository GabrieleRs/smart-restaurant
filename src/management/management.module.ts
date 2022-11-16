import { Module } from '@nestjs/common';
import { MealController } from './meal/meal.controller';
import { MealRepository } from './meal/meal.repository';

@Module({
  controllers: [MealController],
  providers: [MealRepository]
})
export class ManagementModule { }
