import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';
import { UserModel } from '../auth/user.model';
import { LayoutModel } from '../layout/layout.model';

@Module({
	controllers: [OrderController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: OrderModel,
				schemaOptions: {
					collection: 'Order'
				}
			},
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User'
				}
			},
			{
				typegooseClass: LayoutModel,
				schemaOptions: {
					collection: 'Layout'
				}
			},
		])
	],
	providers: [OrderService]
})
export class OrderModule {
}
