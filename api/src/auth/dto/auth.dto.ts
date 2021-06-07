import { IsOptional, IsString } from 'class-validator';

export class AuthDto {
	@IsString()
	email: string;

	@IsString()
	password: string;

	@IsOptional()
	@IsString()
	role?: string;

	@IsOptional()
	@IsString()
	login?: string;
}
