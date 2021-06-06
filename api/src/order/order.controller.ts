import { Body, Controller, Delete, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FindOrdersDto } from './dto/find-orders.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { OrderService } from './order.service';
import { UserGuard } from '../decorators/user.decorator';
import { Types } from 'mongoose';
import { OrderDto } from './dto/order.dto';
import { ORDER_NOT_FOUND } from './order.constans';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
	constructor(private readonly orderService: OrderService) {
	}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: OrderDto, @UserGuard() guard: {_id: Types.ObjectId, email: string}) {
		return this.orderService.createOrder(dto, guard);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedOrder = await this.orderService.findById(id);
		if(!deletedOrder){
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.BAD_REQUEST);
		}
		return this.orderService.delete(id);
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: Omit<OrderDto, '_id'>) {
		return this.orderService.edit(id, dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async getAll(@Body() dto: FindOrdersDto) {

	}
}
