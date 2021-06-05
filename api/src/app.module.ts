import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { OrderModule } from './order/order.module';
import { LayoutModule } from './layout/layout.module';

@Module({
	imports: [AuthModule, PageModule, OrderModule, LayoutModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
