import { Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe } from '@nestjs/common';
import { FindLayoutsDto } from './dto/find-layouts.dto';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { LayoutService } from './layout.service';
import { REVIEW_NOT_FOUND } from './layout.constans';
import { transliterate } from './helpers/transliter';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserGuard } from '../decorators/user.decorator';

@Controller('layout')
export class LayoutController {
	constructor(private readonly layoutService: LayoutService) {
	}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateLayoutDto) {
		const slash = transliterate(dto.title);
		return this.layoutService.create({...dto, slash});
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedLayout = await this.layoutService.delete(id);
		if(!deletedLayout) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const findLayout = await this.layoutService.findById(id);
		if(!findLayout) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return findLayout;
	}

	@Get('user/:id')
	async findByUser(@Body() id: string) {
		const findLayouts = await this.layoutService.findByUser(id);
		if(!findLayouts) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return findLayouts;
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async find(@Body() dto: FindLayoutsDto, @UserGuard() guard: {email: string, _id: string, role: string}) {
		return this.layoutService.findAll(dto);
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateLayoutDto) {
		const editLayout = await this.layoutService.edit(id);
		if(!editLayout) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return editLayout;
	}
}
