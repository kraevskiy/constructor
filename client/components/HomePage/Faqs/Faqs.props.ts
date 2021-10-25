import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FaqPage } from '../../../interfaces/HomePropsInterface';

export interface FaqsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: FaqPage;
	lang: string | undefined;
}
