import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from 'src/constants';
import { Meal } from './model/meal';

@Injectable()
export class MealRepository {
  constructor(@Inject(KNEX) private knex: Knex) {}
  async listMeals(): Promise<Meal[]> {
    return await this.knex<Meal>('meals').select('*').orderBy('name');
  }
  async findMeal(id: string): Promise<Meal> {
    return await this.knex<Meal>('meals').where('id', id).first();
  }
}
