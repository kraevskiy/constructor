import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { OrderModule } from './order/order.module';
import { LayoutModule } from './layout/layout.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { FilesModule } from './files/files.module';
import { MailModule } from './mail/mail.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		AuthModule,
		PageModule,
		OrderModule,
		LayoutModule,
    ImagesModule,
		FilesModule,
		MailModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
