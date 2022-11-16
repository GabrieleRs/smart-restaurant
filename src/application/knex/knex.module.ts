import { DynamicModule, Module } from '@nestjs/common';
import knex, { Knex } from 'knex';
import { KNEX } from 'src/constants';

@Module({})
export class KnexModule {
  static forRoot(config: Knex.Config): DynamicModule {
    const connection = knex(config);
    return {
      global: true,
      module: KnexModule,
      providers: [
        {
          provide: KNEX,
          useValue: connection,
        },
      ],
      exports: [KNEX],
    };
  }
}
