import { Inject, Injectable } from '@nestjs/common';
import { MealService } from 'src/management/meal/meal.service';
import { LiveOrderRepository } from './live-order.repository';
import { CreateLiveOrderDTO } from './model/create-live-order.dto';
import { LiveOrder } from './model/live-order';
import { NotFoundError } from 'src/errors/not-found-error';
import { MealsListDTO } from './model/meals-list.dto';
@Injectable()
export class LiveOrderService {
  constructor(
    @Inject(LiveOrderRepository) private repository: LiveOrderRepository,
    @Inject(MealService) private mealService: MealService,
  ) {}

  listOrders(): Promise<LiveOrder[]> {
    return this.repository.list();
  }

  async createOrder(orderDTO: CreateLiveOrderDTO): Promise<LiveOrder> {
    const mealsMap = await this.getMealsMap();
    const order = new LiveOrder();
    orderDTO.meals.forEach((id) => {
      this.checkMealExists(mealsMap, id);
      const meal = mealsMap.get(id);
      order.addMeal({
        ...meal,
        status: 'pending',
        mealId: meal.id,
        id: null,
      });
    });
    order.notes = orderDTO.notes;
    await this.repository.create(order);
    return order;
  }

  async findOrderById(id: string): Promise<LiveOrder> {
    return this.repository.findById(id);
  }

  async addMealsToOrder(
    id: string,
    addMealsDTO: MealsListDTO,
  ): Promise<LiveOrder> {
    const order = await this.repository.findById(id);
    const mealsMap = await this.getMealsMap();
    addMealsDTO.meals.forEach((id) => {
      this.checkMealExists(mealsMap, id);
      const meal = mealsMap.get(id);
      order.addMeal({
        ...meal,
        status: 'pending',
        mealId: meal.id,
        id: null,
      });
    });
    await this.repository.update(order);
    return order;
  }

  async removeMealsFromOrder(
    id: string,
    mealsListDTO: MealsListDTO,
  ): Promise<LiveOrder> {
    const order = await this.repository.findById(id);
    mealsListDTO.meals.forEach((id) => {
      order.removeMeal(id);
    });
    await this.repository.update(order);
    return order;
  }

  async closeOrder(id: string) {
    const order = await this.repository.findById(id);
    order.close();
    await this.repository.update(order);
  }

  private checkMealExists(mealsMap: Map<string, any>, id: string) {
    if (!mealsMap.has(id)) {
      throw new NotFoundError(`Meal with id ${id} not found`);
    }
  }

  private async getMealsMap() {
    const meals = await this.mealService.listMeals();
    return new Map(meals.map((meal) => [meal.id, meal]));
  }
}
