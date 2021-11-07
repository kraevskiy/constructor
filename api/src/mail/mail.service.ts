import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IndexFormDto } from './dto/index-form.dto';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {
	}

	async sendFeedbackLetter(dto: IndexFormDto) {
		const subject = `New message from site Arter`;

		return this.mailerService.sendMail({
			to: dto.email,
			from: subject,
			subject: `New feedback from ${dto.email}`,
			template: './index-form',
			context: dto,
		});
	}
}
