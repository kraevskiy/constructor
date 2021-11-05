import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { IsOptional } from 'class-validator';

export interface UserModel extends Base {
}

export class UserModel extends TimeStamps {
	@prop({unique: true})
	email: string;

	@prop()
	passwordHash: string;

	@prop()
	role?: string;

	@prop({unique: true})
	@prop()
	login?: string;

	@prop()
	address?: string;

	@prop()
	firstName?: string;

	@prop()
	lastName?: string;

	@prop()
	phone?: string;

	@prop()
	avatar?: string;
}


export class EditUserModel {
	@prop({unique: true})
	email?: string;

	@prop()
	password?: string;

	@prop()
	login?: string;

	@IsOptional()
	@prop()
	passwordHash?: string;

	@prop()
	address?: string;

	@prop()
	firstName?: string;

	@prop()
	lastName?: string;

	@prop()
	phone?: string;

	@prop()
	avatar?: string;
}
