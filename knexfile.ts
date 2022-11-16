// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  local: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
  },
};
