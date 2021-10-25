import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { SouvenirsPage } from '../../../interfaces/HomePropsInterface';

export interface SouvenirsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: SouvenirsPage;
	lang: string | undefined;
}
