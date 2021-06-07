import { IsNumber, IsOptional } from 'class-validator';

export class FindPagesDto {
	@IsOptional()
	@IsNumber()
	limit?: number;
}
