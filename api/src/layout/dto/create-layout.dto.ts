import { IsOptional, IsString } from 'class-validator';

export class CreateLayoutDto {
	@IsString()
	user: string;

	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	slash?: string;

	@IsString()
	data: string;

	@IsOptional()
	@IsString()
	preview?: string;
}
