import { IsString, IsOptional } from 'class-validator';

export class EditDto {
	@IsOptional()
	@IsString({always: false})
	email: string;

	@IsOptional()
	@IsString()
	password: string;

	@IsOptional()
	@IsString()
	login: string;
}
