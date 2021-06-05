import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { LayoutModel } from './layout.model';
import { FindLayoutsDto } from './dto/find-layouts.dto';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { LayoutService } from './layout.service';
import { REVIEW_NOT_FOUND } from './layout.constans';
import { transliterate } from './helpers/transliter';

@Controller('layout')
export class LayoutController {
	constructor(private readonly layoutService: LayoutService) {
	}

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

	@Get()
	async find(@Body() dto: FindLayoutsDto) {
		return this.layoutService.findAll(dto);
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: LayoutModel) {
		const editLayout = await this.layoutService.edit(id);
		if(!editLayout) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return editLayout;
	}
}
