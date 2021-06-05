import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { EditDto } from './dto/edit.dto';

@Controller('auth')
export class AuthController {

	@Post('register')
	async register(@Body() dto: AuthDto) {

	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {

	}

	@HttpCode(200)
	@Post('edit')
	async edit(@Body() dto: EditDto) {

	}
}
