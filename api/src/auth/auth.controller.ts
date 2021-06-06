import { BadRequestException, Body, Controller, HttpCode, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { EditDto } from './dto/edit.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constans';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserGuard } from '../decorators/user.decorator';
import { Types } from 'mongoose';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.email);
		if(oldUser.length){
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() {email, password}: AuthDto) {
		const user = await this.authService.validateUser(email, password);
		return this.authService.login(user);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('edit')
	async edit(@Body() dto: EditDto, @UserGuard() guard: {_id: Types.ObjectId, email: string}) {
		return this.authService.editUser(dto, guard._id);
	}
}
