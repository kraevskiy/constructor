import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from '../auth/user.model';
import { LayoutModel } from '../layout/layout.model';
import { OrderDto, OrderUserDto } from './dto/order.dto';

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>,
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		@InjectModel(LayoutModel) private readonly layoutModel: ModelType<LayoutModel>) {
	}

	async createOrder({layouts}: OrderDto, {_id, email}: OrderUserDto): Promise<OrderModel> {
		const correctOrder = {
			status: 'new',
			user: {_id, email},
			layouts
		};
		return this.orderModel.create(correctOrder);
	}

	async delete(id: string): Promise<OrderModel | null> {
		return this.orderModel.findByIdAndRemove(id).exec();
	}

	async edit(id: string, dto: Omit<OrderModel, '_id'>): Promise<OrderModel | null> {
		return this.orderModel.findByIdAndUpdate(id, dto, {new: true}).exec();
	}

	async findById(id: string): Promise<OrderModel | null> {
		return this.orderModel.findById(id).exec();
	}
}
