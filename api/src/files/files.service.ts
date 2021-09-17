import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {

	async saveFiles(files: MFile[], id: string): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyy-MM-dd');
		const uploadFolder = `${path}/uploads/${id}/${dateFolder}`;
		await ensureDir(uploadFolder);
		const res: FileElementResponse[] = [];
		for(const file of files) {
			const name = file.originalname
				.replace(/ /g,'_')
				.replace(/[{()}]/g,'_');
			await writeFile(`${uploadFolder}/${name}`, file.buffer);
			res.push({url: `/uploads/${id}/${dateFolder}/${name}`, name: name});
		}
		return res;
	}

	convertToWebP(file: Buffer): Promise<Buffer>{
		return sharp(file)
			.webp()
			.toBuffer();
	}
}
