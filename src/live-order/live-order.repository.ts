import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from 'src/constants';
import { LiveOrder } from './model/live-order';
import { v4 } from 'uuid';
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
      order.meals.map((m) => ({
        id: v4(),
        live_orders_id: order.id,
        meals_id: m.id,
        status: m.status,
      })),
    );
  }
}
