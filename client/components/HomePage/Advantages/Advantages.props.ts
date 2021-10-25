import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { AdvantagesPage } from '../../../interfaces/HomePropsInterface';

export interface AdvantagesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: AdvantagesPage;
	lang: string | undefined;
}
