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
	status: 'accepted' | 'new' | 'progress' | 'completed';

	@IsArray()
	layouts: LayoutsUserDto[];

	@IsOptional()
	@IsString()
	user: string;

	@IsOptional()
	@IsString()
	paymentIntent?: 'hold' | 'succeeded';
}
