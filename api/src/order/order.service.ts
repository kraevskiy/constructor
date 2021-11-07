import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { OrderDto } from './dto/order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';
import { LayoutService } from '../layout/layout.service';

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>,
		private readonly layoutService: LayoutService,
	) {
	}

	async createOrder(order: OrderDto, _id: string): Promise<DocumentType<OrderModel>> {
		const allOrders = await this.findAll({});
		const correctOrder = {
			...order,
			status: 'new',
			user: _id,
			paymentIntent: 'hold',
			orderID: allOrders?.length
		};
		await this.layoutService.edit(order.layouts[0]._id, {onOrder: true});
		return this.orderModel.create(correctOrder);
	}

	async delete(id: string): Promise<DocumentType<OrderModel> | null> {
		return this.orderModel.findByIdAndRemove(id).exec();
	}

	async edit(id: string, dto: OrderDto): Promise<DocumentType<OrderModel> | null> {
		return this.orderModel.findByIdAndUpdate(id, dto, {new: true}).exec();
	}

	async findById(id: string): Promise<DocumentType<OrderModel> | null> {
		return this.orderModel.findById(id).exec();
	}

	async findAll(dto: FindOrdersDto): Promise<OrderModel[] | null> {
		const limit: number = dto.limit ?? 4;
		const page: number = dto.page ?? 0;

		function generatePage(): number {
			if (page === 0) {
				return 0;
			}
			if (page === 1) {
				return 0;
			}
			return limit * page - 1;
		}

		function generateMatch() {
			const newMatch: { [key: string]: string } = {};
			if (dto.user) {
				newMatch['user'] = dto.user;
			}
			if (dto.status) {
				newMatch['status'] = dto.status;
			}
			return {
				$match: newMatch
			};
		}

		return this.orderModel.aggregate([
			{
				$facet: {
					totalCount: [
						{
							$count: 'totalCount'
						}
					],
					orders: [
						generateMatch(),
						{
							$sort: {
								createdAt: -1
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
		]).exec();
		// return this.orderModel.find().exec();
	}

	async getByUserId(_id: string): Promise<DocumentType<OrderModel>[] | null> {
		return this.orderModel.find({user: _id}).exec();
	}
}
