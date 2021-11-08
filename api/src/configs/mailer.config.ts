import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {path} from 'app-root-path';

export const getMailerConfig = async (configService: ConfigService): Promise<MailerOptions> => {
	return {
		transport: {
			host: configService.get('MAIL_HOST'),
			port: configService.get('MAIL_PORT'),
			auth: {
				user: configService.get('MAIL_AUTH_USER'),
				pass: configService.get('MAIL_AUTH_PASS')
			}
		},
		defaults: {
			from: '"No Reply" <noreply@example.com>',
		},
		template: {
			dir: path + '/src/mail/templates/',
			adapter: new HandlebarsAdapter(),
			options: {
				strict: true,
			},
		},
	};
};
