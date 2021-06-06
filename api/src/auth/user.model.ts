import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { IsOptional } from 'class-validator';

class OrderDetails {
	@prop()
	id: string;

	@prop()
	status: 'accepted' | 'new' | 'progress' | 'completed';

	@prop()
	createdAt: Date;
}

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
	@prop({unique: true})
	email: string;

	@prop()
	passwordHash: string;

	@prop()
	role?: 'admin' | 'user' | 'viewer';

	@prop()
	login?: string;

	@prop({type: () => [OrderDetails], _id: false})
	orders?: OrderDetails[];
}


export class EditUserModel {
	@prop({unique: true})
	email?: string;

	@prop()
	password?: string;


	@prop()
	login?: string;
}
