import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { LiveOrderService } from './live-order.service';
import { AddMealsDTO } from './model/add-meals.dto';
import { CreateLiveOrderDTO } from './model/create-live-order.dto';

@Controller('live-order')
export class LiveOrderController {
  constructor(@Inject(LiveOrderService) private service: LiveOrderService) {}

  @Get()
  list() {
    return this.service.listOrders();
  }

  @Post()
  create(@Body() orderDTO: CreateLiveOrderDTO) {
    return this.service.createOrder(orderDTO);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findOrderById(id);
  }

  @Post(':id/meals')
  addMeal(@Param('id') id: string, @Body() addMealsDTO: AddMealsDTO) {
    {
      return this.service.addMealsToLiveOrder(id, addMealsDTO);
    }
  }
}
