import { Module } from '@nestjs/common';
import { LayoutController } from './layout.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { LayoutModel } from './layout.model';
import { LayoutService } from './layout.service';

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
	],
	exports:[LayoutService],
	providers: [LayoutService]
})
export class LayoutModule {
}
