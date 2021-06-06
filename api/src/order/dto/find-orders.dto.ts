import { IsOptional, IsString } from 'class-validator';

export class FindOrdersDto {
	@IsOptional()
	@IsString()
	status?:  'accepted' | 'new' | 'progress' | 'completed';

	@IsOptional()
	@IsString()
	user?: string;

	@IsOptional()
	@IsString()
	limit?: number;
}
