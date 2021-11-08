import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImageModel } from './images.model';
import { ImagesService } from './images.service';

@Module({
  controllers: [ImagesController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ImageModel,
        schemaOptions: {
          collection: 'Images',
        },
      },
    ]),
  ],
  exports: [ImagesService],
  providers: [ImagesService],
})
export class ImagesModule {}
