import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export class ImageModel extends TimeStamps {
  @prop()
  type: string;

  @prop()
  url: string;
}
