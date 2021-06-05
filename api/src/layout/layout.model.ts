import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export interface LayoutModel extends Base {
}

export class LayoutModel extends TimeStamps {
	@prop()
	user: string;

	@prop()
	title: string;

	@prop()
	slash: string;

	@prop()
	data: string;

	@prop()
	preview?: string;
}
