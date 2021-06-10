import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { EditDto } from './dto/edit.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constans';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserGuard } from '../decorators/user.decorator';
import { isAdmin } from '../order/helpers/checkRoles';
import { ORDER_PERMISSION } from '../order/order.constans';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.email);
		if (oldUser.length) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return this.authService.createUser(dto);
	}

	@Post('login')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async login(@Body() {email, password}: AuthDto) {
		const user = await this.authService.validateUser(email, password);
		return this.authService.login(user);
	}

	@Post('edit')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	async edit(
		@Body() dto: EditDto,
		@UserGuard() guard: { _id: string, email: string }) {
		return this.authService.editUser(dto, guard._id);
	}

	@Get('users')
	@UseGuards(JwtAuthGuard)
	async fetAll(@UserGuard() {role}: { role: string }) {
		if (!isAdmin(role)) {
			throw new HttpException(ORDER_PERMISSION, HttpStatus.BAD_REQUEST);
		}
		return this.authService.getAll();
	}
}
