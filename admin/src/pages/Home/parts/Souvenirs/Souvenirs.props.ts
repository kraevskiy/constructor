import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { SouvenirsPage } from '../../../../types/page';

export interface SouvenirsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: SouvenirsPage;
}
