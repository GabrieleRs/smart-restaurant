import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { LiveOrderService } from './live-order.service';
import { MealsListDTO } from './model/meals-list.dto';
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
  findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOrderById(id);
  }

  @Post(':id/meals')
  addMeal(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() mealsListDTO: MealsListDTO,
  ) {
    {
      return this.service.addMealsToOrder(id, mealsListDTO);
    }
  }

  @Delete(':id/meals')
  removeMeal(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() mealsListDTO: MealsListDTO,
  ) {
    {
      return this.service.removeMealsFromOrder(id, mealsListDTO);
    }
  }

  @Post(':id/close')
  closeOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.closeOrder(id);
  }
}
