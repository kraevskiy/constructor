import { Injectable } from '@nestjs/common';
import { LayoutModel } from './layout.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreateLayoutDto, EditLayoutDto } from './dto/create-layout.dto';
import { InjectModel } from 'nestjs-typegoose';
import { FindLayoutsDto } from './dto/find-layouts.dto';

@Injectable()
export class LayoutService {
	constructor(@InjectModel(LayoutModel) private readonly layoutModel: ModelType<LayoutModel>) {
	}

	async create(dto: CreateLayoutDto): Promise<DocumentType<LayoutModel>> {
		return this.layoutModel.create(dto);
	}

	async delete(id: string): Promise<DocumentType<LayoutModel> | null> {
		return this.layoutModel.findByIdAndRemove(id).exec();
	}

	async findById(id: string): Promise<DocumentType<LayoutModel> | null> {
		return this.layoutModel.findById(id).exec();
	}

	async findByUser(id: string): Promise<DocumentType<LayoutModel>[] | null> {
		return this.layoutModel.find({user: id}).sort({createdAt: -1}).exec();
	}

	async findAll(dto: FindLayoutsDto): Promise<DocumentType<LayoutModel>[] | null> {
		const limit: number = dto.limit ?? 4;
		const page: number = dto.page ?? 0;
		function generatePage (): number {
			if (page===0) { return 0; }
			if (page===1) { return 0; }
			return limit * page - 1;
		}

		function generateMatch(){
			const newMatch: {[key: string] : string} = {};
			if(dto.user) { newMatch['user'] = dto.user; }
			return {
				$match: newMatch
			};
		}

		return this.layoutModel.aggregate([
			{
				$facet: {
					totalCount: [
						{
							$count: 'totalCount'
						}
					],
					layouts: [
						generateMatch(),
						{
							$sort: {
								createdAt: -1
							}
						},
						{
							$skip: generatePage()
						},
						{
							$limit: limit
						}
					]
				}
			}
		]).exec();
		// return this.layoutModel.find(dto).exec();
	}

	async edit(id: string, dto: EditLayoutDto): Promise<DocumentType<LayoutModel> | null> {
		return this.layoutModel.findByIdAndUpdate(id, dto, {new: true}).exec();
	}
}
