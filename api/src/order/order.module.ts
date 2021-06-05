import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrderModel } from './order.model';

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
		])
	]
})
export class OrderModule {
}
