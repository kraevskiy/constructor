import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { OthersPage } from '../../../interfaces/HomePropsInterface';

export interface OthersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: OthersPage;
	lang: string;
}
