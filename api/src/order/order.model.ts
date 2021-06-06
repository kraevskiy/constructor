import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface OrderModel extends Base {
}

export class OrderModel extends TimeStamps {
	@prop()
	status: 'accepted' | 'new' | 'progress' | 'completed';
	// reference layout

	@prop()
	layout: string;
	//reference user

	@prop()
	user: string;

	@prop()
	date: string;
}
