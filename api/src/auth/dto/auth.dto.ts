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

export class AuthDtoAutologin {
	@IsString()
	email: string;

	@IsString()
	token: string;
}
