import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FaqPage } from '../../../../types/page';

export interface FaqsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: FaqPage;
	lang: string;
}
