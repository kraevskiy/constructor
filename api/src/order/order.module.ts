import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';
import { LayoutModule } from '../layout/layout.module';
import { LayoutService } from '../layout/layout.service';

@Module({
	controllers: [OrderController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: OrderModel,
				schemaOptions: {
					collection: 'Order'
				}
			}
		]),
		LayoutModule
	],
	providers: [OrderService]
})
export class OrderModule {
}
