import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerConfig } from '../configs/mailer.config';
import { MailController } from './mail.controller';

@Module({
	imports: [
		ConfigModule,
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMailerConfig
		})
	],
	exports: [MailService],
	providers: [MailService],
	controllers: [MailController]
})
export class MailModule {
}
