import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from 'src/constants';
import { LiveOrder } from './model/live-order';
import { v4 } from 'uuid';
import { OrderMeal } from './model/order-meal';
import { LiveOrdersMeals, Meals } from 'knex/types/tables';
@Injectable()
export class LiveOrderRepository {
  constructor(@Inject(KNEX) private readonly knex: Knex) {}
  async create(order: LiveOrder) {
    order.id = v4();
    await this.knex('live_orders').insert({
      id: order.id,
      created_at: order.createdAt,
      notes: order.notes,
      status: order.status,
    });
    order.meals.forEach((m) => {
      m.id = v4();
    });
    await this.knex('live_orders_meals').insert(
      order.meals.map((m) => this.mapOrderMealToDb(order, m)),
    );
  }

  async update(order: LiveOrder) {
    const newMeals = order.meals.filter((m) => !m.id);
    newMeals.forEach((m) => {
      m.id = v4();
    });
    order.updatedAt = new Date();
    const operations = [
      this.knex('live_orders').where('id', order.id).update({
        status: order.status,
        notes: order.notes,
        updated_at: order.updatedAt,
      }),
      order.meals.map((m) =>
        this.knex('order_meals').where('id', m.id).update({
          status: m.status,
        }),
      ),
      this.knex('live_orders_meals')
        .whereNotIn(
          'id',
          order.meals.map((m) => m.id),
        )
        .del(),
    ];
    if (newMeals.length > 0) {
      operations.push(
        this.knex('live_orders_meals').insert(
          newMeals.map((m) => this.mapOrderMealToDb(order, m)),
        ),
      );
    }
    await Promise.all(operations);
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

  private mapQueryResultToLiveOrder(meals: (Meals & LiveOrdersMeals)[], order) {
    const orderMeals = meals.filter((m) => m.live_orders_id === order.id);
    return new LiveOrder(
      order.id,
      orderMeals.map((m) => ({
        id: m.id,
        mealId: m.meals_id,
        name: m.name,
        description: m.description,
        price: m.price,
        status: m.status,
        allergens: [],
      })),
      order.status,
      new Date(order.created_at),
      order.updated_at ? new Date(order.updated_at) : null,
      order.notes,
    );
  }

  private mapOrderMealToDb(
    order: LiveOrder,
    m: OrderMeal,
  ): {
    id: string;
    live_orders_id: string;
    meals_id: string;
    status: 'pending' | 'in-progress' | 'served';
  } {
    return {
      id: m.id,
      live_orders_id: order.id,
      meals_id: m.mealId,
      status: m.status,
    };
  }
}
