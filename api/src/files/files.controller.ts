import { Controller, HttpCode, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';
import { UserGuard } from '../decorators/user.decorator';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {
	}

	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FilesInterceptor('files'))
	async uploadFiles(
		@UploadedFiles() files: Express.Multer.File[],
		@UserGuard() guard: { _id: string }
	): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [];
		for (const file of files) {
			const toArray = await new MFile(file);
			saveArray.push(toArray);
		}

		// if(files[0].mimetype.includes('image')) {
		// 	const buffer = await this.filesService.convertToWebP(files[0].buffer);
		// 	saveArray.push(new MFile({
		// 		originalname: `${files[0].originalname.split('.')[0]}.webp`,
		// 		buffer
		// 	}));
		// }

		return this.filesService.saveFiles(saveArray, guard._id);
	}
}
