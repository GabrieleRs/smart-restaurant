// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex';
import { OrderMeal } from './model/order-meal';
import { OrderStatus } from './model/live-order';
declare module 'knex/types/tables' {
  interface LiveOrders {
    id: string;
    notes: string;
    status: OrderStatus;
    created_at: Date;
    updated_at: Date;
  }

  interface Meals {
    id: string;
    name: string;
    description: string;
    price: number;
  }

  interface LiveOrdersMeals {
    id: string;
    live_orders_id: string;
    meals_id: string;
    status: OrderMeal['status'];
  }

  interface Tables {
    live_orders: LiveOrders;
    meals: Meals;
    live_orders_meals: LiveOrdersMeals;
  }
}
