import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PicturesPage } from '../../../../types/page';

export interface OthersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: PicturesPage;
	lang: string;
}
