import {
	BadRequestException,
	Body,
	Controller, Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { AuthDto, AuthDtoAutologin } from './dto/auth.dto';
import { EditDto } from './dto/edit.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constans';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserGuard } from '../decorators/user.decorator';
import { isAdmin } from '../order/helpers/checkRoles';
import { ORDER_PERMISSION } from '../order/order.constans';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUserByEmail(dto.email);
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

	@Delete('delete/:id')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async delete(@UserGuard() guard: { _id: string, email: string }) {
		return this.authService.delete(guard);
	}

	@Post('autologin')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	async autoLogin(@Body() dto: AuthDtoAutologin) {
		return this.authService.autoLogin(dto.email);
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
