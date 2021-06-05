import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { LayoutModel } from './layout.model';
import { FindLayoutsDto } from './dto/find-layouts.dto';

@Controller('layout')
export class LayoutController {

	@Post('create')
	async create(@Body() dto: Omit<LayoutModel, '_id'>) {

	}

	@Get(':id')
	async get(@Param('id') id: string) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: LayoutModel) {

	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindLayoutsDto) {

	}
}
