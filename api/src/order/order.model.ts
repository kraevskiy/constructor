import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class LayoutsOrderModel {
	@prop()
	title: string;

	@prop()
	_id: string;
}

export interface OrderModel extends Base {
}

export class OrderModel extends TimeStamps {
	@prop()
	status: string;

	@prop({type: () => [LayoutsOrderModel]})
	layouts: LayoutsOrderModel[];

	@prop()
	user: Types.ObjectId;

	@prop()
	paymentIntent?: string;
}
