import { Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe } from '@nestjs/common';
import { FindPagesDto } from './dto/find-pages.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { PageDto } from './dto/page.dto';
import { UserGuard } from '../decorators/user.decorator';
import { isAdmin } from '../order/helpers/checkRoles';
import { PAGE_NOT_FOUND, PAGE_PERMISSION } from './page.constans';
import { PageService } from './page.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('page')
@ApiTags('Page')
export class PageController {
	constructor(private readonly pageService: PageService) {
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(
		@Body() dto: PageDto,
		@UserGuard() {role}: {role: string}) {
		if(!isAdmin(role)){
			throw new HttpException(PAGE_PERMISSION, HttpStatus.BAD_REQUEST);
		}
		return this.pageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.pageService.getById(id);
	}

	@Get('/slag/:slag')
	async getBySlug(@Param('slag') slag: string) {
		return this.pageService.getBySlug(slag);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(
		@Param('id', IdValidationPipe) id: string,
		@UserGuard() {role}: {role: string}) {
		if(!isAdmin(role)){
			throw new HttpException(PAGE_PERMISSION, HttpStatus.BAD_REQUEST);
		}
		const deletedPage = await this.pageService.getById(id);
		if(!deletedPage) {
			throw new HttpException(PAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return this.pageService.deleteById(id);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: PageDto,
		@UserGuard() {role}: {role: string}) {
		if(!isAdmin(role)){
			throw new HttpException(PAGE_PERMISSION, HttpStatus.BAD_REQUEST);
		}
		const updatedPage = await this.pageService.getById(id);
		if(!updatedPage) {
			throw new HttpException(PAGE_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return this.pageService.edit(id, dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindPagesDto) {
		return this.pageService.findAll(dto);
	}
}
