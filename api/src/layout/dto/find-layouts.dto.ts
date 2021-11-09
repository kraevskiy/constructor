import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindLayoutsDto {
	@IsOptional()
	@IsNumber()
	limit?: number;

	@IsOptional()
	@IsNumber()
	page?: number;

	@IsOptional()
	@IsString()
	user?: string;

  @IsOptional()
	@IsBoolean()
	public?: boolean;
}
