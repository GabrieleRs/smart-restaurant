import { Meal } from "src/management/meal/model/meal";

export interface OrderMeal extends Meal {
    status: 'pending' | 'in-progress' | 'done';
}