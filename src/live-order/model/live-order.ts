import { OrderMeal } from './order-meal';
export type OrderStatus = 'open' | 'closed' | 'paid';
export class LiveOrder {
  private _id: string;
  private _meals: OrderMeal[];
  private _status: OrderStatus;
  private _createdAt: Date;
  private _updatedAt?: Date;
  notes?: string;

  get id(): string {
    return this._id;
  }

  get meals(): OrderMeal[] {
    return this._meals;
  }

  get totalPrice(): number {
    return this._meals.reduce((total, meal) => total + meal.price, 0);
  }

  get cookingStatus(): OrderMeal['status'] {
    if (this._meals.every((meal) => meal.status === 'done')) return 'done';
    if (this._meals.some((meal) => meal.status === 'in-progress'))
      return 'in-progress';
    return 'pending';
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  get status(): OrderStatus {
    return this._status;
  }

  removeMeal(mealId: string) {
    this._meals = this._meals.filter((meal) => meal.id !== mealId);
  }

  updateMealStatus(mealId: string, status: 'pending' | 'in-progress' | 'done') {
    const meal = this._meals.find((meal) => meal.id === mealId);
    if (meal) meal.status = status;
  }

  addMeal(meal: OrderMeal) {
    this._meals.push(meal);
  }

  constructor(
    id: string,
    meals?: OrderMeal[],
    status?: OrderStatus,
    createdAt?: Date,
    updatedAt?: Date,
    notes?: string,
  ) {
    this._id = id;
    this._meals = meals || [];
    this._status = status || 'open';
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt;
    this.notes = notes;
  }

  toJSON() {
    return {
      id: this._id,
      meals: this._meals,
      totalPrice: this.totalPrice,
      cookingStatus: this.cookingStatus,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      notes: this.notes,
    };
  }
}
