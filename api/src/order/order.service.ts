import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { OrderDto } from './dto/order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>) {
	}

	async createOrder({layouts}: OrderDto, _id: string): Promise<DocumentType<OrderModel>> {
		const correctOrder = {
			status: 'new',
			user: _id,
			paymentIntent: 'hold',
			layouts
		};
		return this.orderModel.create(correctOrder);
	}

	async delete(id: string): Promise<DocumentType<OrderModel> | null> {
		return this.orderModel.findByIdAndRemove(id).exec();
	}

	async edit(id: string, dto: Omit<OrderModel, '_id'>): Promise<DocumentType<OrderModel> | null> {
		return this.orderModel.findByIdAndUpdate(id, dto, {new: true}).exec();
	}

	async findById(id: string): Promise<DocumentType<OrderModel> | null> {
		return this.orderModel.findById(id).exec();
	}

	async findAll(dto: FindOrdersDto): Promise<OrderModel[] | null> {
		const limit: number = dto.limit ?? 4;
		const page: number = dto.page ?? 0;
		function generatePage (): number {
			if (page===0) { return 0; }
			if (page===1) { return 0; }
			return limit * page - 1;
		}
		function generateMatch(){
			const newMatch: {[key: string] : string} = {};
			if(dto.user) { newMatch['user'] = dto.user; }
			if(dto.status) { newMatch['status'] = dto.status; }
			return {
				$match: newMatch
			};
		}
		this.orderModel.aggregate([
			{
				$facet: {
					count: [
						{
							$count: 'totalCount'
						}
					],
					orders: [
						generateMatch(),
						{
							$sort: {
								_id: 1
							}
						},
						{
							$skip: generatePage()
						},
						{
							$limit: limit
						}
					]
				}
			}
		]).exec()
		return this.orderModel.find().exec();
	}

	async getByUserId(_id: string): Promise<DocumentType<OrderModel>[] | null> {
		return this.orderModel.find({user: _id}).exec();
	}
}
