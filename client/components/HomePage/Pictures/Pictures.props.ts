import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PicturesPage } from '../../../interfaces/HomePropsInterface';

export interface PicturesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: PicturesPage;
	lang: string | undefined;
}
