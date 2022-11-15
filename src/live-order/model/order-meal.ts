import { Meal } from "src/management/model/meal";

export interface OrderMeal extends Meal {
    status: 'pending' | 'in-progress' | 'done';
}