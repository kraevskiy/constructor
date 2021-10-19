import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { path } from 'app-root-path';

@Module({
	imports: [],
	controllers: [FilesController],
	providers: [FilesService]
})
export class FilesModule {
}
