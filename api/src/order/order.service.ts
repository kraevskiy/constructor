import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { OrderDto } from './dto/order.dto';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>) {
	}

	async createOrder({layouts}: OrderDto, _id: Types.ObjectId): Promise<DocumentType<OrderModel>> {
		const correctOrder = {
			status: 'new',
			user: _id,
			paymentIntent: 'hold',
			layouts
		};
		return this.orderModel.create(correctOrder);
	}

	async delete(id: Types.ObjectId): Promise<DocumentType<OrderModel> | null> {
		return this.orderModel.findByIdAndRemove(id).exec();
	}

	async edit(id: Types.ObjectId, dto: Omit<OrderModel, '_id'>): Promise<DocumentType<OrderModel> | null> {
		return this.orderModel.findByIdAndUpdate(id, dto, {new: true}).exec();
	}

	async findById(id: Types.ObjectId): Promise<DocumentType<OrderModel> | null> {
		return this.orderModel.findById(id).exec();
	}

	async findAll(): Promise<OrderModel[] | null> {
		return this.orderModel.find().exec();
	}

	async getByUserId(_id: Types.ObjectId): Promise<DocumentType<OrderModel>[] | null> {
		return this.orderModel.find({user: _id}).exec();
	}
}
