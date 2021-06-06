import { Injectable } from '@nestjs/common';
import { LayoutModel } from './layout.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { InjectModel } from 'nestjs-typegoose';
import { FindLayoutsDto } from './dto/find-layouts.dto';
import { Types } from 'mongoose';

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

	async findByUser(id: Types.ObjectId): Promise<DocumentType<LayoutModel>[] | null> {
		return this.layoutModel.find({user: id}).exec();
	}

	async findAll(dto: FindLayoutsDto): Promise<DocumentType<LayoutModel>[] | null> {
		return this.layoutModel.find(dto).exec();
	}

	async edit(id: string): Promise<DocumentType<LayoutModel> | null> {
		return this.layoutModel.findByIdAndUpdate(id).exec();
	}
}
