import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe } from '@nestjs/common';
import { FindOrdersDto } from './dto/find-orders.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { OrderService } from './order.service';
import { UserGuard } from '../decorators/user.decorator';
import { Types } from 'mongoose';
import { OrderDto } from './dto/order.dto';
import { ORDER_NOT_FOUND, ORDER_PERMISSION } from './order.constans';
import { isAdmin } from './helpers/checkRoles';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
	constructor(private readonly orderService: OrderService) {
	}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: OrderDto, @UserGuard() guard: {_id: Types.ObjectId, email: string}) {
		return this.orderService.createOrder(dto, guard._id);
	}

	@Delete(':id')
	async delete(@Param('id') id: Types.ObjectId) {
		const deletedOrder = await this.orderService.findById(id);
		if(!deletedOrder){
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.BAD_REQUEST);
		}
		return this.orderService.delete(id);
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(
		@Param('id') id: Types.ObjectId,
		@Body() dto: Omit<OrderDto, '_id'>,
		@UserGuard() {role, _id}: {role: string, _id: Types.ObjectId}) {
		const editedOrder = await this.orderService.findById(id);
		if(
			editedOrder?.status !== dto.status && !isAdmin(role) ||
			editedOrder?.paymentIntent !== dto.paymentIntent && !isAdmin(role)
		){
			throw new HttpException(ORDER_PERMISSION, HttpStatus.BAD_REQUEST);
		}
		if(id !== _id && !isAdmin(role)) {
			throw new HttpException(ORDER_PERMISSION, HttpStatus.BAD_REQUEST);
		}
		if(!editedOrder){
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.BAD_REQUEST);
		}
		return this.orderService.edit(id, dto);
	}

	@HttpCode(200)
	@Get()
	async getAll(@Body() dto: FindOrdersDto, @UserGuard() {role}: {role: string}) {
		if(!isAdmin(role)) {
			throw new HttpException(ORDER_PERMISSION, HttpStatus.BAD_REQUEST);
		}
		return this.orderService.findAll();
	}

	@Get('userId/:id')
	async getByUserId(@Param('id') id: Types.ObjectId, @UserGuard() {role, _id}: {role: string, _id: Types.ObjectId}) {
		if(id !== _id && isAdmin(role)) {
			throw new HttpException(ORDER_PERMISSION, HttpStatus.BAD_REQUEST);
		}
		return this.orderService.getByUserId(id);
	}

	@Get(':id')
	async getById(@Param('id') id: Types.ObjectId, @UserGuard() {role, _id}: {role: string, _id: Types.ObjectId}) {
		if(id !== _id && isAdmin(role)) {
			throw new HttpException(ORDER_PERMISSION, HttpStatus.BAD_REQUEST);
		}
		return this.orderService.findById(id);
	}
}
