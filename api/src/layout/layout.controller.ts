import {
	Body,
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
	ValidationPipe
} from '@nestjs/common';
import { FindLayoutsDto } from './dto/find-layouts.dto';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { LayoutService } from './layout.service';
import { LAYOUT_NOT_FOUND, LAYOUT_NOT_USER, NOT_ADMIN } from './layout.constans';
import { transliterate } from './helpers/transliter';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserGuard } from '../decorators/user.decorator';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@Controller('layout')
@ApiTags('Layout')
export class LayoutController {
	constructor(private readonly layoutService: LayoutService) {
	}

	@Post('create')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	async create(
		@Body() dto: CreateLayoutDto,
		@UserGuard() guard: { _id: string }) {
		const slash = transliterate(dto.title);
		return this.layoutService.create({...dto, slash, user: guard._id});
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async delete(
		@Param('id', IdValidationPipe) id: string,
		@UserGuard() guard: { _id: string, email: string }) {
		const deletedLayout = await this.layoutService.delete(id);
		if (!deletedLayout) {
			throw new HttpException(LAYOUT_NOT_FOUND, HttpStatus.BAD_REQUEST);
		}
		return deletedLayout;
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async get(
		@Param('id', IdValidationPipe) id: string,
		@UserGuard() guard: { _id: string, email: string }) {
		const findLayout = await this.layoutService.findById(id);
		if (!findLayout) {
			throw new HttpException(LAYOUT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return findLayout;
	}

	@Get('userId/:id')
	@UseGuards(JwtAuthGuard)
	async findByUser(@Param('id', IdValidationPipe) id: string) {
		const findLayouts = await this.layoutService.findByUser(id);
		if (!findLayouts) {
			throw new HttpException(LAYOUT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return findLayouts;
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async findAll(
		@Body() dto: FindLayoutsDto,
		@UserGuard() guard: { email: string, _id: string, role: string }) {
		if (guard.role !== 'admin') {
			throw new HttpException(NOT_ADMIN, HttpStatus.BAD_REQUEST);
		}
		return this.layoutService.findAll(dto);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	async patch(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateLayoutDto,
		@UserGuard() guard: { _id: Types.ObjectId }) {
		const editLayout = await this.layoutService.edit(id, dto);
		if (!editLayout) {
			throw new HttpException(LAYOUT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}

		if (editLayout.user != guard._id) {
			throw new HttpException(LAYOUT_NOT_USER, HttpStatus.BAD_REQUEST);
		}
		return editLayout;
	}
}
