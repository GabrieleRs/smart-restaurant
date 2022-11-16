// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex';
declare module 'knex/types/tables' {
  interface LiveOrders {
    id: string;
    notes: string;
    status: string;
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
    status: string;
  }

  interface Tables {
    live_orders: LiveOrders;
    meals: Meals;
    live_orders_meals: LiveOrdersMeals;
  }
}
