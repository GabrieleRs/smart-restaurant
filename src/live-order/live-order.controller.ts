import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { LiveOrderService } from './live-order.service';
import { CreateLiveOrderDTO } from './model/create-live-order.dto';

@Controller('live-order')
export class LiveOrderController {
  constructor(@Inject(LiveOrderService) private service: LiveOrderService) {}

  @Get()
  list() {
    return this.service.listLiveOrders();
  }

  @Post()
  create(@Body() orderDTO: CreateLiveOrderDTO) {
    return this.service.createLiveOrder(orderDTO);
  }
}
