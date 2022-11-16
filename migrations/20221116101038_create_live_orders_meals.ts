import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('live_orders_meals', (table) => {
    table.uuid('id').primary();
    table
      .uuid('live_orders_id')
      .notNullable()
      .references('id')
      .inTable('live_orders');
    table.uuid('meals_id').notNullable().references('id').inTable('meals');
    table.string('status').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('live_orders_meals');
}
