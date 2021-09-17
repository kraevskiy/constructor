import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PicturesPage } from '../../../../types/page';

export interface PicturesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: PicturesPage;
}
