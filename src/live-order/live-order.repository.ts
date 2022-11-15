import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX } from 'src/constants';

@Injectable()
export class LiveOrderRepository {
    constructor(@Inject(KNEX) private readonly knex: Knex) { }
    save
}
