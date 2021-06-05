import { Body, Controller, Delete, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { OrderModel } from './order.model';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FindOrdersDto } from './dto/find-orders.dto';

@Controller('order')

export class OrderController {
	@Post('create')
	async create(@Body() dto: Omit<OrderModel, '_id'>) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: UpdateStatusDto) {

	}

	@HttpCode(200)
	@Post()
	async get(@Body() dto: FindOrdersDto) {

	}
}
