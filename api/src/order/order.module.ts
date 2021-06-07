import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

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
	],
	providers: [OrderService]
})
export class OrderModule {
}
