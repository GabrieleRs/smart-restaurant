import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('live_orders', (table) => {
    table.uuid('id').primary();
    table.text('notes');
    table.string('status').notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('live_orders');
}
