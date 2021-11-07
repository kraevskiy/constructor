import {
  Body,
  Controller,
  Post,
  UseGuards,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateImageDto } from './dto/create-image.dto';
import { UserGuard } from '../decorators/user.decorator';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { IMAGES_NOT_FOUND, IMAGES_NOT_ADMIN } from './images.constants';
import { FindImagesDto } from './dto/find-images.dto';

@Controller('images')
@ApiTags('Images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() dto: CreateImageDto,
    @UserGuard() guard: { _id: string },
  ) {
    return this.imagesService.create({ ...dto });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', IdValidationPipe) id: string,
    @UserGuard() guard: { _id: string; email: string },
  ) {
    const deletedImage = await this.imagesService.delete(id);
    if (!deletedImage) {
      throw new HttpException(IMAGES_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return deletedImage;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Body() dto: FindImagesDto,
    @UserGuard() guard: { email: string; _id: string; role: string },
  ) {
    return this.imagesService.findAll(dto);
  }
}
