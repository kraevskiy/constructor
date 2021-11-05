import { IsString, IsOptional, IsArray } from 'class-validator';

export class LayoutsUserDto {
	@IsString()
	title: string;

	@IsString()
	_id: string;
}

export class OrderDto {
	@IsOptional()
	@IsString()
	status: 'new' | 'progress' | 'completed';

	@IsArray()
	layouts: LayoutsUserDto[];

	@IsOptional()
	@IsString()
	paymentType: string;

	@IsOptional()
	@IsString()
	price: string;

	@IsOptional()
	@IsString()
	count: string;

	@IsOptional()
	@IsString()
	delivery: string;

	@IsOptional()
	@IsString()
	address: string;

	@IsOptional()
	@IsString()
	firstName: string;

	@IsOptional()
	@IsString()
	lastName: string;

	@IsOptional()
	@IsString()
	phone: string;

	@IsOptional()
	@IsString()
	email: string;

	@IsOptional()
	@IsString()
	comment: string;

	@IsOptional()
	@IsString()
	user: string;

	@IsOptional()
	@IsString()
	paymentIntent?: 'hold' | 'succeeded';
}

export class EditOrderDto {
	@IsOptional()
	@IsString()
	status: 'new' | 'progress' | 'completed';

	@IsOptional()
	@IsArray()
	layouts: LayoutsUserDto[];

	@IsOptional()
	@IsString()
	paymentType: string;

	@IsOptional()
	@IsString()
	price: string;

	@IsOptional()
	@IsString()
	count: string;

	@IsOptional()
	@IsString()
	delivery: string;

	@IsOptional()
	@IsString()
	address: string;

	@IsOptional()
	@IsString()
	firstName: string;

	@IsOptional()
	@IsString()
	lastName: string;

	@IsOptional()
	@IsString()
	phone: string;

	@IsOptional()
	@IsString()
	email: string;

	@IsOptional()
	@IsString()
	comment: string;

	@IsOptional()
	@IsString()
	user: string;

	@IsOptional()
	@IsString()
	paymentIntent?: 'hold' | 'succeeded';
}
