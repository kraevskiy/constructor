import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindOrdersDto {
	@IsOptional()
	@IsString()
	status?:  'new' | 'progress' | 'completed';

	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	limit?: number;

	@IsOptional()
	@IsNumber()
	page?: number;
}
