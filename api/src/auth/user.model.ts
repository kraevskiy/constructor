import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {
}

export class UserModel extends TimeStamps {
	@prop({unique: true})
	email: string;

	@prop()
	passwordHash: string;

	@prop()
	role?: string;

	@prop()
	login?: string;
}


export class EditUserModel {
	@prop({unique: true})
	email?: string;

	@prop()
	password?: string;


	@prop()
	login?: string;
}
