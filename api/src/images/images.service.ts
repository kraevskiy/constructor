import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageModel } from './images.model';
import { FindImagesDto } from './dto/find-images.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(ImageModel)
    private readonly imageModel: ModelType<ImageModel>,
  ) {}

  async create(dto: CreateImageDto): Promise<DocumentType<ImageModel>> {
    return this.imageModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ImageModel> | null> {
    return this.imageModel.findByIdAndRemove(id).exec();
  }

  async findAll(
    dto: FindImagesDto,
  ): Promise<DocumentType<ImageModel>[] | null> {
    const limit: number = dto.limit ?? 4;
    const page: number = dto.page ?? 0;
    function generatePage(): number {
      if (page === 0) {
        return 0;
      }
      if (page === 1) {
        return 0;
      }
      return limit * page - 1;
    }

    function generateMatch() {
      const newMatch: { [key: string]: string } = {};
      return {
        $match: newMatch,
      };
    }

    return this.imageModel
      .aggregate([
        {
          $facet: {
            totalCount: [
              {
                $count: 'totalCount',
              },
            ],
            images: [
              generateMatch(),
              {
                $sort: {
                  createdAt: -1,
                },
              },
              {
                $skip: generatePage(),
              },
              {
                $limit: limit,
              },
            ],
          },
        },
      ])
      .exec();
    // return this.layoutModel.find(dto).exec();
  }
}
