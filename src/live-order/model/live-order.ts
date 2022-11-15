import { OrderMeal } from "./order-meal";

export type OrderStatus = 'pending' | 'in-progress' | 'done' | 'paid';
export class LiveOrder {
    private _id: string;
    private _meals: OrderMeal[];

    get id(): string {
        return this._id;
    }

    get meals(): OrderMeal[] {
        return this._meals;
    }

    get totalPrice(): number {
        return this._meals.reduce((total, meal) => total + meal.price, 0);
    }

    get status(): OrderStatus {
        if (this._meals.every(meal => meal.status === 'done'))
            return 'done';
        if (this._meals.some(meal => meal.status === 'in-progress'))
            return 'in-progress';
        return 'pending';
    }

    removeMeal(mealId: string) {
        this._meals = this._meals.filter(meal => meal.id !== mealId);
    }

    updateMealStatus(mealId: string, status: 'pending' | 'in-progress' | 'done') {
        const meal = this._meals.find(meal => meal.id === mealId);
        if (meal)
            meal.status = status;
    }

    addMeal(meal: OrderMeal) {
        this._meals.push(meal);
    }

    constructor(id: string, meals?: OrderMeal[],) {
        this._id = id;
        this._meals = meals || [];

    }



}