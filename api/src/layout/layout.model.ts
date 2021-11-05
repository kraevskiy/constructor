import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export interface LayoutModel extends Base {
}

export class LayoutModel extends TimeStamps {
	@prop()
	user?: Types.ObjectId;

	@prop()
	title: string;

	@prop()
	slash?: string;

	@prop()
	config: string;

	@prop({type: ()=> [String]})
	files: string[];

	@prop()
	instance: string;

	@prop()
	preview?: string;

	@prop()
	onOrder?: boolean;
}
