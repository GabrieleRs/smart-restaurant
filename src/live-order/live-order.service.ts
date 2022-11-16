import { Inject, Injectable } from '@nestjs/common';
import { MealService } from 'src/management/meal/meal.service';
import { LiveOrderRepository } from './live-order.repository';
import { CreateLiveOrderDTO } from './model/create-live-order.dto';
import { LiveOrder } from './model/live-order';
import { v4 } from 'uuid';
@Injectable()
export class LiveOrderService {
  constructor(
    @Inject(LiveOrderRepository) private repository: LiveOrderRepository,
    @Inject(MealService) private mealService: MealService,
  ) {}

  listLiveOrders(): Promise<LiveOrder[]> {
    return Promise.resolve([]);
  }

  async createLiveOrder(orderDTO: CreateLiveOrderDTO): Promise<LiveOrder> {
    const meals = await this.mealService.listMeals();
    const mealsMap = new Map(meals.map((meal) => [meal.id, meal]));
    for (const meal of orderDTO.meals) {
      if (!mealsMap.has(meal)) {
        throw new Error(`Meal with id ${meal} does not exist`);
      }
    }
    const order = new LiveOrder(
      v4(),
      orderDTO.meals.map((id) => {
        const meal = mealsMap.get(id);
        return {
          ...meal,
          status: 'pending',
        };
      }),
    );
    order.notes = orderDTO.notes;
    await this.repository.create(order);
    return order;
  }
}
