import { Types } from 'mongoose';
import { IsString, IsObject, IsOptional, IsArray } from 'class-validator';

export class LayoutsUserDto {
	@IsString()
	title: string;

	@IsString()
	_id: Types.ObjectId;
}

export class OrderDto {
	@IsArray()
	layouts: LayoutsUserDto[];

	@IsOptional()
	@IsString()
	status: 'accepted' | 'new' | 'progress' | 'completed';

	@IsOptional()
	@IsObject()
	user: Types.ObjectId;

	@IsOptional()
	@IsString()
	paymentIntent?: 'hold' | 'succeeded';
}
