import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateLayoutDto {
	@IsOptional()
	@IsString()
	user?: string;

	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	slash?: string;

	@IsString()
	config: string;

	@IsArray()
	files: string[];

	@IsString()
	instance: string;

	@IsOptional()
	@IsString()
	preview?: string;
}
