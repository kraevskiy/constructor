import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

class OrderDetails {
	@prop()
	id: string;

	@prop()
	status: 'accepted' | 'new' | 'progress' | 'completed';

	@prop()
	createdAt: Date;
}

export interface AuthModel extends Base {}
export class AuthModel extends TimeStamps {
	@prop({unique: true})
	email: string;

	@prop()
	passwordHash: string;

	@prop({unique: true})
	login: string;

	@prop({type: () => [OrderDetails], _id: false})
	orders: OrderDetails[];
}
