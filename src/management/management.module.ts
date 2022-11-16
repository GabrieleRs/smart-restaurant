import { Module } from '@nestjs/common';
import { MealController } from './meal/meal.controller';
import { MealRepository } from './meal/meal.repository';
import { MealService } from './meal/meal.service';

@Module({
  controllers: [MealController],
  providers: [MealRepository, MealService],
  exports: [MealService],
})
export class ManagementModule {}
