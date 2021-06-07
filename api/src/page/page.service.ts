import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PageModel } from './page.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { PageDto } from './dto/page.dto';
import { PAGE_EXIST } from './page.constans';
import { Types } from 'mongoose';
import { FindPagesDto } from './dto/find-pages.dto';

@Injectable()
export class PageService {
	constructor(@InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>) {
	}

	async getByFiler(filter: { [key: string]: string }): Promise<DocumentType<PageModel>[] | []> {
		return this.pageModel.find(filter).exec();
	}

	async getById(id: string): Promise<DocumentType<PageModel> | null> {
		return this.pageModel.findById(id).exec();
	}

	async create(dto: PageDto) {
		const isExistPage = await this.getByFiler({slag: dto.slag});
		if (isExistPage.length) {
			throw new HttpException(PAGE_EXIST, HttpStatus.CONFLICT);
		}
		return this.pageModel.create(dto);
	}

	async deleteById(id: string): Promise<DocumentType<PageModel> | null> {
		return this.pageModel.findByIdAndRemove(id).exec();
	}

	async edit(id: string, dto: PageDto): Promise<PageModel | null> {
		return this.pageModel.findByIdAndUpdate(id, dto, {new: true}).exec();
	}

	async findAll(dto: FindPagesDto): Promise<DocumentType<PageModel>[] | []> {
		const limit = dto.limit ?? 20;
		return this.pageModel.aggregate([
			{
				$sort: {
					_id: 1
				}
			},
			{
				$limit: limit
			}
		]).exec();
	}
}
