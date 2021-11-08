import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindImagesDto {
	@IsOptional()
	@IsNumber()
	limit?: number;

	@IsOptional()
	@IsNumber()
	page?: number;

}
