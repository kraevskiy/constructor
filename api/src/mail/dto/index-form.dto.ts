import { IsOptional, IsString } from 'class-validator';

export class IndexFormDto {
	@IsString()
	name: string;

	@IsString()
	phone: string;

	@IsString()
	email: string;

	@IsOptional()
	@IsString()
	message: string;
}
