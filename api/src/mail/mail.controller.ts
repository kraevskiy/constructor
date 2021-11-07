import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MailService } from './mail.service';
import { IndexFormDto } from './dto/index-form.dto';

@Controller('mail')
export class MailController {
	constructor(private readonly mailService: MailService) {
	}

	@Post('feedback')
	@UsePipes(new ValidationPipe())
	async feedback(
		@Body() dto: IndexFormDto
	) {
		return this.mailService.sendFeedbackLetter(dto);
	}
}
