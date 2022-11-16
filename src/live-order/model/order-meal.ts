import { Meal } from 'src/management/meal/model/meal';

/*
  This is the OrderMeal interface. It is used to represent a meal in an order.
  A meal in an order has a status that shows its current preparation status.
 */
export interface OrderMeal extends Meal {
  mealId: string;
  status: 'pending' | 'in-progress' | 'served';
}
