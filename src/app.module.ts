import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from './application/knex/knex.module';
import { LiveOrderModule } from './live-order/live-order.module';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [KnexModule.forRoot({
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    }
  }), LiveOrderModule, ManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
