import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('meals').del();

  // Inserts seed entries
  await knex('meals').insert([
    {
      id: '7eb523c5-c6a5-42cb-98e2-73821132af28',
      name: 'Lasagne alla Bolognese',
      description: 'Piatto tipico della domenica',
      price: 9.2,
    },
    {
      id: '1362f7da-b7dc-44d1-b2b2-85f78d6bc4fd',
      name: 'Riso basmati con pollo al curry',
      description: 'Classico etnico',
      price: 7,
    },
    {
      id: 'f9cf1e85-61a2-47e7-85c1-18127bd40248',
      name: 'Cotoletta alla milanese con patate fritte',
      description: 'Per i piú piccoli',
      price: 8.5,
    },
    {
      id: 'de1a0f43-4093-4209-8f30-cb57fa1d4c28',
      name: 'Salmone grigliato con verdure',
      description: 'Leggero e saporito',
      price: 10,
    },
  ]);
}
