import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.decimal('price').notNullable();
    table.text('description');
    table.text('image');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals');
}
