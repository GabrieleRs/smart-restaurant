import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from 'src/constants';
import { LiveOrder } from './model/live-order';
import { v4 } from 'uuid';
import { OrderMeal } from './model/order-meal';
@Injectable()
export class LiveOrderRepository {
  constructor(@Inject(KNEX) private readonly knex: Knex) {}
  async create(order: LiveOrder) {
    await this.knex('live_orders').insert({
      id: order.id,
      created_at: order.createdAt,
      notes: order.notes,
      status: order.status,
    });
    await this.knex('live_orders_meals').insert(
      order.meals.map((m) => this.mapOrderMealToDb(order, m)),
    );
  }

  async update(order: LiveOrder) {
    await this.knex('live_orders').where('id', order.id).update({
      status: order.status,
      notes: order.notes,
      updated_at: order.updatedAt,
    });
    await this.knex('live_orders_meals')
      .where('live_orders_id', order.id)
      .del();
    await this.knex('live_orders_meals').insert(
      order.meals.map((m) => this.mapOrderMealToDb(order, m)),
    );
  }

  async list(): Promise<LiveOrder[]> {
    const orders = await this.knex('live_orders');
    const meals = await this.knex('meals').innerJoin(
      'live_orders_meals',
      'meals.id',
      'live_orders_meals.meals_id',
    );
    return orders.map((order) => {
      return this.mapQueryResultToLiveOrder(meals, order);
    });
  }

  async findById(id: string): Promise<LiveOrder> {
    const order = await this.knex('live_orders').where('id', id).first();
    const meals = await this.knex('meals')
      .innerJoin('live_orders_meals', 'meals.id', 'live_orders_meals.meals_id')
      .where('live_orders_meals.live_orders_id', id);
    return this.mapQueryResultToLiveOrder(meals, order);
  }

  private mapQueryResultToLiveOrder(meals, order) {
    const orderMeals = meals.filter((m) => m.live_orders_id === order.id);
    return new LiveOrder(
      order.id,
      orderMeals.map((m) => ({
        id: m.meals_id,
        name: m.name,
        description: m.description,
        price: m.price,
        status: m.status,
        allergens: [],
      })),
      order.status,
      order.created_at,
      order.updated_at,
      order.notes,
    );
  }

  private mapOrderMealToDb(
    order: LiveOrder,
    m: OrderMeal,
  ): {
    id: any;
    live_orders_id: string;
    meals_id: string;
    status: 'pending' | 'in-progress' | 'served';
  } {
    return {
      id: v4(),
      live_orders_id: order.id,
      meals_id: m.id,
      status: m.status,
    };
  }
}
