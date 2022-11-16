import { Inject, Injectable } from '@nestjs/common';
import { MealService } from 'src/management/meal/meal.service';
import { LiveOrderRepository } from './live-order.repository';
import { CreateLiveOrderDTO } from './model/create-live-order.dto';
import { LiveOrder } from './model/live-order';
import { v4 } from 'uuid';
import { NotFoundError } from 'src/errors/not-found-error';
import { AddMealsDTO } from './model/add-meals.dto';
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
    const order = new LiveOrder(v4());
    orderDTO.meals.forEach((id) => {
      this.checkMealExists(mealsMap, id);
      const meal = mealsMap.get(id);
      order.addMeal({
        ...meal,
        status: 'pending',
      });
    });
    order.notes = orderDTO.notes;
    await this.repository.create(order);
    return order;
  }

  async findOrderById(id: string): Promise<LiveOrder> {
    return this.repository.findById(id);
  }

  async addMealsToLiveOrder(
    id: string,
    addMealsDTO: AddMealsDTO,
  ): Promise<LiveOrder> {
    const order = await this.repository.findById(id);
    const mealsMap = await this.getMealsMap();
    addMealsDTO.meals.forEach((id) => {
      this.checkMealExists(mealsMap, id);
      const meal = mealsMap.get(id);
      order.addMeal({
        ...meal,
        status: 'pending',
      });
    });
    order.updatedAt = new Date();
    await this.repository.update(order);
    return order;
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
