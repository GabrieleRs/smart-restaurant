import { NotFoundError } from 'src/errors/not-found-error';
import { StatusError } from '../../errors/status-error';
import { OrderMeal } from './order-meal';

/* 
  This is the main class representing an order created by a customer in the restaurant.
  It contains the list of meals ordered, the status of the order and the notes.
  An open order can receive new meals, be cancelled, or be closed.
  Once an order is closed, it cannot be modified an it's ready to be paid.
*/
export type OrderStatus = 'open' | 'closed' | 'paid';
export class LiveOrder {
  private _id?: string;
  private _meals: OrderMeal[];
  private _status: OrderStatus;
  private _createdAt: Date;
  private _updatedAt?: Date;
  notes?: string;

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    if (this._id) {
      throw new Error('Cannot change id');
    }
    this._id = id;
  }

  get meals(): OrderMeal[] {
    return this._meals;
  }

  get totalPrice(): number {
    return this._meals.reduce((total, meal) => total + meal.price, 0);
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

  addMeal(meal: OrderMeal) {
    if (this._status !== 'open') {
      throw new StatusError('Cannot add a meal to a closed order');
    }
    this._meals.push(meal);
  }

  removeMeal(mealId: string) {
    const meal = this._meals.find((meal) => meal.id === mealId);
    if (this._status !== 'open') {
      throw new StatusError('Cannot remove a meal from a closed order');
    }
    if (!meal) {
      throw new NotFoundError('Meal not found');
    }
    if (meal.status != 'pending') {
      throw new StatusError('Cannot remove a meal that is not pending');
    }
    this._meals = this._meals.filter((meal) => meal.id !== mealId);
  }

  updateMealStatus(mealId: string, status: OrderMeal['status']) {
    const meal = this._meals.find((meal) => meal.id === mealId);
    if (!meal) {
      throw new NotFoundError('Meal not found');
    }
    meal.status = status;
  }

  close() {
    if (this._status !== 'open') {
      throw new StatusError('Cannot close an order that is not open');
    }
    this._status = 'closed';
  }

  constructor(
    id?: string,
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
      createdAt: this._createdAt.getTime(),
      updatedAt: this._updatedAt?.getTime(),
      notes: this.notes,
      status: this.status,
    };
  }
}
