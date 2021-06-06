import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class UserOrderModel {
	@prop()
	email: string;

	@prop()
	_id: Types.ObjectId;
}

export class LayoutsOrderModel {
	@prop()
	title: string;

	@prop()
	_id: Types.ObjectId;
}

export interface OrderModel extends Base {
}

export class OrderModel extends TimeStamps {
	@prop()
	status: 'accepted' | 'new' | 'progress' | 'completed';

	@prop({type: () => [LayoutsOrderModel]})
	layouts: LayoutsOrderModel[];

	@prop({type: () => UserOrderModel})
	user: UserOrderModel;
}
