import { Types } from 'mongoose';
import { IsString, IsOptional, IsArray } from 'class-validator';

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
	@IsString()
	user: Types.ObjectId;

	@IsOptional()
	@IsString()
	paymentIntent?: 'hold' | 'succeeded';
}
