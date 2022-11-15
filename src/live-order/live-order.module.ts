import { Module } from '@nestjs/common';
import { LiveOrderService } from './live-order.service';
import { LiveOrderRepository } from './live-order.repository';
import { LiveOrderController } from './live-order.controller';

@Module({
  providers: [LiveOrderService, LiveOrderRepository],
  controllers: [LiveOrderController]
})
export class LiveOrderModule { }
