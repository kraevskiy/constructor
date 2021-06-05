import { Module } from '@nestjs/common';
import { LayoutController } from './layout.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { LayoutModel } from './layout.model';

@Module({
	controllers: [LayoutController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: LayoutModel,
				schemaOptions: {
					collection: 'Layout'
				}
			}
		])
	]
})
export class LayoutModule {
}
