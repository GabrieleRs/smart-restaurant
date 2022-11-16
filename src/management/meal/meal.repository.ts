import { Injectable } from '@nestjs/common';
import { Meal } from './model/meal';

@Injectable()
export class MealRepository {
    getMeals(): <Meal>[] {
        return [
            {
                id: 1,
                name: 'Meal 1'
            },
            {
                id: 2,
                name: 'Meal 2'
            }
        ];
    }
}
