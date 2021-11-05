import { IsNumber, IsOptional, IsString } from 'class-validator';

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

	@IsOptional()
	@IsString()
	address?: string;

	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsOptional()
	@IsString()
	phone?: string;

	@IsOptional()
	@IsString()
	avatar?: string;
}

export class AuthDtoAutologin {
	@IsString()
	email: string;

	@IsString()
	token: string;
}
