import { Types } from 'mongoose';
import { IsString, IsObject, IsOptional, IsArray } from 'class-validator';
import { LayoutsOrderModel } from '../order.model';

export class OrderUserDto {
	@IsString()
	email: string;

	@IsString()
	_id: Types.ObjectId;
}

export class OrderDto {
	@IsArray()
	layouts: LayoutsOrderModel[];

	@IsOptional()
	@IsString()
	status: 'accepted' | 'new' | 'progress' | 'completed';

	@IsOptional()
	@IsObject()
	user: OrderUserDto;
}
